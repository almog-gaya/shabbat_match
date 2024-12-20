'use client';

import { useEffect, useState } from 'react';
import { useAuth } from '@/components/auth/auth-provider';
import { profiles } from '@/lib/api/profiles';
import { matches } from '@/lib/api/matches';
import { Profile } from '@/lib/types/profile';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Heart, X } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { useRouter } from 'next/navigation';

export default function DashboardPage() {
  const { user } = useAuth();
  const [potentialMatches, setPotentialMatches] = useState<Profile[]>([]);
  const { toast } = useToast();
  const router = useRouter();

  useEffect(() => {
    if (!user) {
      router.push('/login');
      return;
    }
    loadPotentialMatches();
  }, [user, router]);

  const loadPotentialMatches = async () => {
    if (!user) return;
    try {
      const matches = await profiles.getPotentialMatches(user.id);
      setPotentialMatches(matches);
    } catch (error) {
      console.error('Error loading matches:', error);
    }
  };

  const handleLike = async (profile: Profile) => {
    if (!user) return;
    try {
      await matches.createMatch(user.id, profile.id);
      setPotentialMatches(current => 
        current.filter(p => p.id !== profile.id)
      );
      toast({
        title: 'Like sent!',
        description: 'If they like you back, it\'s a match!',
      });
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to like profile. Please try again.',
        variant: 'destructive',
      });
    }
  };

  const handlePass = (profile: Profile) => {
    setPotentialMatches(current => 
      current.filter(p => p.id !== profile.id)
    );
  };

  if (!user) {
    return null;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Find Your Match</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {potentialMatches.map((profile) => (
          <Card key={profile.id}>
            <CardHeader>
              <CardTitle>{profile.full_name}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground mb-4">{profile.bio}</p>
              <div className="flex justify-between gap-4">
                <Button
                  variant="outline"
                  className="w-full"
                  onClick={() => handlePass(profile)}
                >
                  <X className="w-4 h-4 mr-2" />
                  Pass
                </Button>
                <Button
                  className="w-full"
                  onClick={() => handleLike(profile)}
                >
                  <Heart className="w-4 h-4 mr-2" />
                  Like
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}