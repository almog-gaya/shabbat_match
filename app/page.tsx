import { Button } from '@/components/ui/button';
import { Heart, Users, MessageCircle } from 'lucide-react';
import Link from 'next/link';

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-secondary">
      <div className="container mx-auto px-4 py-16">
        <nav className="flex justify-between items-center mb-16">
          <div className="flex items-center space-x-2">
            <Heart className="h-6 w-6 text-primary" />
            <span className="text-xl font-bold">Shabbat Connect</span>
          </div>
          <div className="space-x-4">
            <Button variant="ghost" asChild>
              <Link href="/login">Login</Link>
            </Button>
            <Button asChild>
              <Link href="/signup">Sign Up</Link>
            </Button>
          </div>
        </nav>

        <main className="flex flex-col items-center text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            Find Meaningful Connections
          </h1>
          <p className="text-xl text-muted-foreground mb-12 max-w-2xl">
            Inspired by the warmth and community of Shabbat dinners, we help you
            find authentic connections with like-minded individuals.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12 w-full max-w-4xl">
            <div className="bg-card p-6 rounded-lg shadow-lg">
              <Users className="h-12 w-12 text-primary mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">Smart Matching</h3>
              <p className="text-muted-foreground">
                Our algorithm finds compatible matches based on your values and preferences
              </p>
            </div>
            <div className="bg-card p-6 rounded-lg shadow-lg">
              <Heart className="h-12 w-12 text-primary mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">Meaningful Connections</h3>
              <p className="text-muted-foreground">
                Focus on what matters - creating genuine relationships
              </p>
            </div>
            <div className="bg-card p-6 rounded-lg shadow-lg">
              <MessageCircle className="h-12 w-12 text-primary mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">Real Conversations</h3>
              <p className="text-muted-foreground">
                Connect through meaningful dialogue in a safe environment
              </p>
            </div>
          </div>

          <Button size="lg" className="text-lg" asChild>
            <Link href="/signup">Start Your Journey</Link>
          </Button>
        </main>
      </div>
    </div>
  );
}