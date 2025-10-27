import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Heart, ExternalLink, MapPin, DollarSign, Trash2 } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/hooks/useAuth';
import { useToast } from '@/hooks/use-toast';

interface SavedJob {
  id: string;
  job_id: string;
  job_title: string;
  company: string;
  location: string;
  salary: string;
  job_type: string;
  description: string;
  requirements: string[];
  posted_date: string;
  job_url?: string;
  saved_at: string;
}

export default function SavedJobs() {
  const navigate = useNavigate();
  const [savedJobs, setSavedJobs] = useState<SavedJob[]>([]);
  const [loading, setLoading] = useState(true);
  const { user, loading: authLoading } = useAuth();
  const { toast } = useToast();

  useEffect(() => {
    if (!authLoading) {
      if (!user) {
        toast({
          title: "Authentication Required",
          description: "Please sign in to view your saved jobs.",
          variant: "destructive",
        });
        navigate('/auth');
        return;
      }
      loadSavedJobs();
    }
  }, [user, authLoading]);

  const loadSavedJobs = async () => {
    if (!user) return;

    try {
      const { data, error } = await supabase
        .from('saved_jobs')
        .select('*')
        .eq('user_id', user.id)
        .order('saved_at', { ascending: false });

      if (error) throw error;
      setSavedJobs(data || []);
    } catch (error) {
      console.error('Error loading saved jobs:', error);
      toast({
        title: "Error",
        description: "Failed to load saved jobs.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const removeSavedJob = async (jobId: string) => {
    if (!user) return;

    try {
      const { error } = await supabase
        .from('saved_jobs')
        .delete()
        .eq('user_id', user.id)
        .eq('job_id', jobId);

      if (error) throw error;

      setSavedJobs(prev => prev.filter(job => job.job_id !== jobId));
      toast({
        title: "Job removed",
        description: "Job removed from your saved list.",
      });
    } catch (error) {
      console.error('Error removing saved job:', error);
      toast({
        title: "Error",
        description: "Failed to remove job.",
        variant: "destructive",
      });
    }
  };

  const applyToJob = async (job: SavedJob) => {
    if (!user) return;

    try {
      // Check if already applied
      const { data: existingApplication } = await supabase
        .from('job_applications')
        .select('id')
        .eq('user_id', user.id)
        .eq('job_id', job.job_id)
        .single();

      if (existingApplication) {
        toast({
          title: "Already applied",
          description: "You have already applied to this job.",
          variant: "destructive",
        });
        return;
      }

      // Add to applications
      const { error } = await supabase
        .from('job_applications')
        .insert({
          user_id: user.id,
          job_id: job.job_id,
          job_title: job.job_title,
          company: job.company,
          status: 'applied'
        });

      if (error) throw error;

      toast({
        title: "Application submitted",
        description: "Your application has been recorded.",
      });

      // Open job URL if available
      if (job.job_url) {
        window.open(job.job_url, '_blank');
      }
    } catch (error) {
      console.error('Error applying to job:', error);
      toast({
        title: "Error",
        description: "Failed to submit application.",
        variant: "destructive",
      });
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen">
        <Header />
        <main className="container mx-auto px-4 py-8">
          <div className="text-center">Loading your saved jobs...</div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <Header />
      <main className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Saved Jobs</h1>
          <p className="text-muted-foreground">
            {savedJobs.length} job{savedJobs.length !== 1 ? 's' : ''} in your saved list
          </p>
        </div>

        {savedJobs.length === 0 ? (
          <div className="text-center py-12">
            <Heart className="h-16 w-16 mx-auto text-muted-foreground mb-4" />
            <h2 className="text-2xl font-semibold mb-2">No saved jobs yet</h2>
            <p className="text-muted-foreground mb-4">
              Start saving jobs you're interested in to see them here.
            </p>
            <Button asChild>
              <a href="/#job-finder">Browse Jobs</a>
            </Button>
          </div>
        ) : (
          <div className="grid gap-6">
            {savedJobs.map((job) => (
              <Card key={job.id} className="hover:shadow-lg transition-shadow">
                <CardHeader className="pb-4">
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <CardTitle className="text-xl mb-2">{job.job_title}</CardTitle>
                      <div className="flex items-center gap-4 text-muted-foreground mb-2">
                        <span className="font-medium">{job.company}</span>
                        <div className="flex items-center gap-1">
                          <MapPin className="h-4 w-4" />
                          {job.location}
                        </div>
                        <div className="flex items-center gap-1">
                          <DollarSign className="h-4 w-4" />
                          {job.salary}
                        </div>
                      </div>
                      <div className="flex gap-2 mb-3">
                        <Badge variant="outline">{job.job_type}</Badge>
                        <Badge variant="secondary">
                          Saved {new Date(job.saved_at).toLocaleDateString()}
                        </Badge>
                      </div>
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => removeSavedJob(job.job_id)}
                      className="text-muted-foreground hover:text-destructive"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground mb-4 line-clamp-3">
                    {job.description}
                  </p>
                  {job.requirements.length > 0 && (
                    <div className="mb-4">
                      <h4 className="font-medium mb-2">Requirements:</h4>
                      <div className="flex flex-wrap gap-2">
                        {job.requirements.slice(0, 5).map((req, index) => (
                          <Badge key={index} variant="outline" className="text-xs">
                            {req}
                          </Badge>
                        ))}
                        {job.requirements.length > 5 && (
                          <Badge variant="outline" className="text-xs">
                            +{job.requirements.length - 5} more
                          </Badge>
                        )}
                      </div>
                    </div>
                  )}
                  <div className="flex gap-2">
                    <Button onClick={() => applyToJob(job)} className="flex-1">
                      Apply Now
                    </Button>
                    {job.job_url && (
                      <Button variant="outline" asChild>
                        <a href={job.job_url} target="_blank" rel="noopener noreferrer">
                          <ExternalLink className="h-4 w-4" />
                        </a>
                      </Button>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
}