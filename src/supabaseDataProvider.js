// supabaseDataProvider.js
import { supabase } from './supabaseClient';

const supabaseDataProvider = {
  getList: async (resource, params) => {
    const { page, perPage } = params.pagination;
    const { field, order } = params.sort;
    const { filter } = params;

    const from = (page - 1) * perPage;
    const to = from + perPage - 1;

    let query = supabase
      .from(resource)
      .select('*', { count: 'exact' })
      .order(field, { ascending: order === 'ASC' })
      .range(from, to);

    if (filter) {
      Object.entries(filter).forEach(([key, value]) => {
        query = query.ilike(key, `%${value}%`);
      });
    }

    const { data, error, count } = await query;
    if (error) throw new Error(error.message);

    return {
      data: data.map(item => ({ ...item, id: item.id })),
      total: count,
    };
  },

  getOne: async (resource, params) => {
    const { data, error } = await supabase
      .from(resource)
      .select('*')
      .eq('id', params.id)
      .single();
    if (error) throw new Error(error.message);
    return { data };
  },

  create: async (resource, params) => {
    const { data, error } = await supabase
      .from(resource)
      .insert(params.data)
      .select()
      .single();
    if (error) throw new Error(error.message);
    return { data };
  },

  update: async (resource, params) => {
    const { data, error } = await supabase
      .from(resource)
      .update(params.data)
      .eq('id', params.id)
      .select()
      .single();
    if (error) throw new Error(error.message);
    return { data };
  },

  delete: async (resource, params) => {
    const { data, error } = await supabase
      .from(resource)
      .delete()
      .eq('id', params.id)
      .select()
      .single();
    if (error) throw new Error(error.message);
    return { data };
  },
};

export default supabaseDataProvider;
