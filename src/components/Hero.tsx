import { Button } from '@/components/ui/button';
import { ArrowRight, FileText, Search, Star } from 'lucide-react';
import heroImage from '@/assets/hero-image.jpg';
export const Hero = () => {
  return <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background with gradient overlay */}
      <div className="absolute inset-0">
        <img src={heroImage} alt="Professional workspace" className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-hero opacity-90" />
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 py-20 text-center">
        <div className="max-w-4xl mx-auto">
          {/* Badge */}
          <div className="inline-flex items-center px-4 py-2 rounded-full bg-background/20 backdrop-blur-sm border border-background/30 text-primary-foreground mb-8">
            <Star className="h-4 w-4 mr-2" />
            <span className="text-sm font-medium">#1 Resume Builder & Job Finder</span>
          </div>

          {/* Main heading */}
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-primary-foreground mb-6 leading-tight">
            Build Your Perfect Resume &{' '}
            <span className="bg-gradient-to-r from-primary-glow to-accent bg-clip-text text-zinc-800">
              Find Your Dream Job
            </span>
          </h1>

          {/* Subtitle */}
          <p className="text-xl md:text-2xl text-primary-foreground/80 mb-12 max-w-3xl mx-auto leading-relaxed">
            Create professional resumes with our AI-powered builder and discover thousands of job opportunities tailored to your skills.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
            <Button 
              size="lg" 
              className="bg-background text-foreground hover:bg-background/90 shadow-elegant text-lg px-8 py-4 h-auto"
              onClick={() => {
                const resumeSection = document.getElementById('resume-builder');
                resumeSection?.scrollIntoView({ behavior: 'smooth' });
              }}
            >
              <FileText className="h-5 w-5 mr-2" />
              Create Resume
              <ArrowRight className="h-5 w-5 ml-2" />
            </Button>
            <Button 
              size="lg" 
              variant="outline" 
              className="border-background/30 hover:bg-background/10 text-lg px-8 py-4 h-auto text-zinc-900"
              onClick={() => {
                const jobSection = document.getElementById('job-finder');
                jobSection?.scrollIntoView({ behavior: 'smooth' });
              }}
            >
              <Search className="h-5 w-5 mr-2" />
              Browse Jobs
            </Button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-2xl mx-auto">
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-primary-foreground mb-2">50K+</div>
              <div className="text-primary-foreground/80">Resumes Created</div>
            </div>
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-primary-foreground mb-2">10K+</div>
              <div className="text-primary-foreground/80">Jobs Posted Daily</div>
            </div>
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-primary-foreground mb-2">95%</div>
              <div className="text-primary-foreground/80">Success Rate</div>
            </div>
          </div>
        </div>
      </div>

      {/* Decorative elements */}
      <div className="absolute top-1/4 left-10 w-20 h-20 bg-primary-glow/20 rounded-full blur-xl animate-pulse" />
      <div className="absolute bottom-1/4 right-10 w-32 h-32 bg-accent/20 rounded-full blur-xl animate-pulse delay-1000" />
    </section>;
};