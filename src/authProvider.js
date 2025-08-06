import { supabase } from './supabaseClient';

const allowedUsers = ['panutorn.gmail.com', 'magic_oil@hotmail.com'];

let currentUser = null; // เก็บข้อมูลผู้ใช้ไว้ใน memory

const authProvider = {
  login: async ({ username, password }) => {
    const { data, error } = await supabase.auth.signInWithPassword({
      email: username,
      password,
    });

    if (error) throw new Error(error.message);

    if (!allowedUsers.includes(username)) {
      await supabase.auth.signOut();
      throw new Error('บัญชีนี้ไม่ได้รับอนุญาตให้เข้าใช้งาน');
    }

    currentUser = data?.user || null; // เก็บข้อมูลผู้ใช้
    return Promise.resolve();
  },

  logout: async () => {
    await supabase.auth.signOut();
    currentUser = null;
    return Promise.resolve();
  },

  checkAuth: async () => {
    const { data } = await supabase.auth.getSession();
    if (!data.session) throw new Error('Not authenticated');
    return Promise.resolve();
  },

  checkError: (error) => {
    if (error.status === 401 || error.status === 403) {
      return Promise.reject();
    }
    return Promise.resolve();
  },

  getPermissions: () => Promise.resolve(),

  getIdentity: async () => {
    if (currentUser) {
      return Promise.resolve({
        id: currentUser.id,
        fullName: currentUser.email,
      });
    }

    const { data, error } = await supabase.auth.getUser();
    if (error || !data?.user) return null;
    
    return {
      id: data.user.id,
      fullName: data.user.email,
    };
  },
};

export default authProvider;
