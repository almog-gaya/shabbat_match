export interface Profile {
  id: string;
  full_name: string;
  birth_date: Date;
  gender: string;
  bio: string;
  location: string;
  interests: string[];
  photos: string[];
  created_at: string;
  updated_at: string;
}

export interface Match {
  id: string;
  user1_id: string;
  user2_id: string;
  status: 'pending' | 'matched' | 'rejected';
  created_at: string;
  updated_at: string;
}