import { supabase } from './supabaseClient';

const allowedUsers = ['admin@example.com', 'manager@example.com'];

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
    if (data.session) return Promise.resolve();
    return Promise.reject();
  },

  checkError: () => Promise.resolve(),

  getPermissions: () => Promise.resolve(),

  getIdentity: async () => {
    if (currentUser) {
      return Promise.resolve({
        id: currentUser.id,
        fullName: currentUser.email,
      });
    }

    const { data } = await supabase.auth.getUser();
    if (data?.user) {
      return Promise.resolve({
        id: data.user.id,
        fullName: data.user.email,
      });
    }

    return Promise.resolve(undefined);
  },
};

export default authProvider;
