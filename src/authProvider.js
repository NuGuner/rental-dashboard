import { supabase } from './supabaseClient';

// อีเมลที่ได้รับอนุญาตให้เข้าใช้งาน พร้อมสิทธิ์
const allowedUsers = {
  'panutorn@gmail.com': 'admin',      // ผู้ดูแลระบบ
  'magic_oil@hotmail.com': 'admin',   // ผู้ดูแลระบบ
  // เพิ่มผู้ใช้ใหม่ที่นี่ - 'email@example.com': 'viewer'
};

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
        if (error.message.includes('Email not confirmed')) {
          throw new Error('กรุณายืนยันอีเมลก่อนเข้าสู่ระบบ');
        }
        throw new Error(error.message);
      }

      // Check if user is in allowed list
      if (!allowedUsers[username]) {
        await supabase.auth.signOut();
        throw new Error('บัญชีนี้ไม่ได้รับอนุญาตให้เข้าใช้งาน กรุณาติดต่อผู้ดูแลระบบ');
      }

      // Set user role from allowed users
      const userRole = allowedUsers[username];
      currentUser = {
        ...data?.user,
        role: userRole
      };

      // Update user metadata in Supabase
      await supabase.auth.updateUser({
        data: { role: userRole }
      });

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
    if (userEmail && !allowedUsers[userEmail]) {
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

  getPermissions: async () => {
    if (currentUser?.role) {
      return Promise.resolve(currentUser.role);
    }

    const { data } = await supabase.auth.getUser();
    if (data?.user?.email) {
      const role = allowedUsers[data.user.email] || 'viewer';
      return Promise.resolve(role);
    }
    
    return Promise.resolve('viewer'); // Default to viewer
  },

  getIdentity: async () => {
    if (currentUser) {
      return Promise.resolve({
        id: currentUser.id,
        fullName: currentUser.email?.split('@')[0] || 'ผู้ดูแลระบบ',
        email: currentUser.email,
        role: currentUser.role || 'viewer',
        avatar: `https://ui-avatars.com/api/?name=${encodeURIComponent(currentUser.email?.split('@')[0] || 'User')}&background=1976d2&color=fff`
      });
    }

    const { data, error } = await supabase.auth.getUser();
    if (error || !data?.user) return null;
    
    const userRole = allowedUsers[data.user.email] || 'viewer';
    currentUser = {
      ...data.user,
      role: userRole
    };
    
    return {
      id: data.user.id,
      fullName: data.user.email?.split('@')[0] || 'ผู้ดูแลระบบ',
      email: data.user.email,
      role: userRole,
      avatar: `https://ui-avatars.com/api/?name=${encodeURIComponent(data.user.email?.split('@')[0] || 'User')}&background=1976d2&color=fff`
    };
  },

  // Custom method to check if user has specific permission
  hasPermission: async (action) => {
    const permissions = await authProvider.getPermissions();
    
    const rolePermissions = {
      admin: ['create', 'read', 'update', 'delete', 'manage_users', 'view_reports'],
      viewer: ['read']
    };

    return rolePermissions[permissions]?.includes(action) || false;
  },

  // Custom method to get user role
  getUserRole: () => {
    return currentUser?.role || 'viewer';
  }
};

export default authProvider;
