// authProvider.js
import { supabase } from './supabaseClient';

const authProvider = {
  login: async ({ username, password }) => {
    const { error } = await supabase.auth.signInWithPassword({
      email: username,
      password,
    });
    if (error) throw new Error(error.message);
  },

  logout: async () => {
    await supabase.auth.signOut();
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
    const { data, error } = await supabase.auth.getUser();
    if (error || !data?.user) return null;
    return {
      id: data.user.id,
      fullName: data.user.email,
    };
  },
};

export default authProvider;
