import { supabase } from './supabaseClient';

// อีเมลที่ได้รับอนุญาตให้เข้าใช้งาน
const allowedUsers = ['panutorn@gmail.com', 'magic_oil@hotmail.com'];

let currentUser = null; // เก็บข้อมูลผู้ใช้ไว้ใน memory

const authProvider = {
  login: async ({ username, password }) => {
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email: username,
        password,
      });

      if (error) {
        // Provide more user-friendly error messages
        if (error.message.includes('Invalid login credentials')) {
          throw new Error('อีเมลหรือรหัสผ่านไม่ถูกต้อง');
        }
        throw new Error(error.message);
      }

      // Check if user is in allowed list
      if (!allowedUsers.includes(username)) {
        await supabase.auth.signOut();
        throw new Error('บัญชีนี้ไม่ได้รับอนุญาตให้เข้าใช้งาน กรุณาติดต่อผู้ดูแลระบบ');
      }

      currentUser = data?.user || null; // เก็บข้อมูลผู้ใช้
      return Promise.resolve();
    } catch (error) {
      throw error;
    }
  },

  logout: async () => {
    await supabase.auth.signOut();
    currentUser = null;
    return Promise.resolve();
  },

  checkAuth: async () => {
    const { data } = await supabase.auth.getSession();
    if (!data.session) throw new Error('ไม่ได้รับการยืนยันตัวตน');
    
    // Double-check if user is still allowed
    const userEmail = data.session.user?.email;
    if (userEmail && !allowedUsers.includes(userEmail)) {
      await supabase.auth.signOut();
      throw new Error('บัญชีไม่ได้รับอนุญาต');
    }
    
    return Promise.resolve();
  },

  checkError: (error) => {
    if (error.status === 401 || error.status === 403) {
      return Promise.reject();
    }
    return Promise.resolve();
  },

  getPermissions: () => Promise.resolve('admin'), // You can implement roles later

  getIdentity: async () => {
    if (currentUser) {
      return Promise.resolve({
        id: currentUser.id,
        fullName: currentUser.email?.split('@')[0] || 'ผู้ดูแลระบบ',
        email: currentUser.email,
      });
    }

    const { data, error } = await supabase.auth.getUser();
    if (error || !data?.user) return null;
    
    currentUser = data.user; // Update currentUser
    
    return {
      id: data.user.id,
      fullName: data.user.email?.split('@')[0] || 'ผู้ดูแลระบบ',
      email: data.user.email,
    };
  },
};

export default authProvider;
