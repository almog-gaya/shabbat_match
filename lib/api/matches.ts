'use client';

import { createClient } from '@/lib/supabase/client';
import { Match } from '@/lib/types/profile';

export const matches = {
  createMatch: async (user1Id: string, user2Id: string) => {
    const supabase = createClient();
    const { data, error } = await supabase
      .from('matches')
      .insert({
        user1_id: user1Id,
        user2_id: user2Id,
        status: 'pending'
      })
      .select()
      .single();
    
    if (error) throw error;
    return data as Match;
  },

  updateMatchStatus: async (matchId: string, status: 'matched' | 'rejected') => {
    const supabase = createClient();
    const { data, error } = await supabase
      .from('matches')
      .update({ status })
      .eq('id', matchId)
      .select()
      .single();
    
    if (error) throw error;
    return data as Match;
  },

  getUserMatches: async (userId: string) => {
    const supabase = createClient();
    const { data, error } = await supabase
      .from('matches')
      .select('*, profiles!matches_user2_id_fkey(*)')
      .or(`user1_id.eq.${userId},user2_id.eq.${userId}`)
      .eq('status', 'matched');
    
    if (error) throw error;
    return data as (Match & { profiles: Profile })[];
  }
};