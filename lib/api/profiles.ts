'use client';

import { createClient } from '@/lib/supabase/client';
import { Profile } from '@/lib/types/profile';

export const profiles = {
  getProfile: async (userId: string) => {
    const supabase = createClient();
    const { data, error } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', userId)
      .single();
    
    if (error) throw error;
    return data as Profile;
  },

  getPotentialMatches: async (userId: string) => {
    const supabase = createClient();
    const { data, error } = await supabase
      .from('profiles')
      .select('*')
      .neq('id', userId)
      .limit(10);
    
    if (error) throw error;
    return data as Profile[];
  }
};