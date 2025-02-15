import Link from 'next/link';
import { ThemeToggle } from '@/components/theme-toggle';
import { Button } from '@/components/ui/button';
import { BackgroundBeams } from '@/components/ui/background-beams';
import { TextGenerateEffect } from '@/components/ui/text-generate-effect';

export default function Home() {
  const words = "Welcome to Taskly, your ultimate task management solution. Stay organized, boost productivity, and achieve your goals with our intuitive platform.";

  return (
    <div className="min-h-screen bg-background relative flex flex-col">
      <nav className="w-full px-6 py-4 flex justify-between items-center z-10">
        <h1 className="text-2xl font-bold">Taskly</h1>
        <ThemeToggle />
      </nav>

      <main className="flex-1 flex flex-col items-center justify-center text-center px-4 relative">
        <div className="max-w-4xl mx-auto relative z-10">
          <h1 className="text-6xl font-bold mb-8 bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/50">
            Manage Tasks with Ease
          </h1>
          
          <div className="mb-12">
            <TextGenerateEffect words={words} />
          </div>

          <Link href="/auth">
            <Button size="lg" className="text-lg px-8 py-6">
              Get Started
            </Button>
          </Link>
        </div>

        <div className="w-full h-full absolute inset-0 z-0">
          <BackgroundBeams />
        </div>
      </main>

      <footer className="w-full px-6 py-4 text-center z-10">
        <p className="text-sm text-muted-foreground">
          © 2024 TaskMaster. All rights reserved.
        </p>
      </footer>
    </div>
  );
}