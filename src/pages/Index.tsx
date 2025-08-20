import { Header } from '@/components/Header';
import { Hero } from '@/components/Hero';
import { ResumeBuilder } from '@/components/ResumeBuilder';
import { JobFinder } from '@/components/JobFinder';
import { Footer } from '@/components/Footer';
import { Auth } from '@/components/Auth';
import { useAuth } from '@/hooks/useAuth';

const Index = () => {
  const { loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-lg">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <Header />
      <main>
        <Hero />
        <ResumeBuilder />
        <JobFinder />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
