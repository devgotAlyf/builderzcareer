import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Search, MapPin, DollarSign, Clock, Building, Heart, Loader2 } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/hooks/useAuth';
import { useToast } from '@/hooks/use-toast';

interface Job {
  id: string;
  title: string;
  company: string;
  location: string;
  salary: string;
  type: string;
  description: string;
  requirements: string[];
  posted: string;
  url?: string;
}

const mockJobs: Job[] = [
  {
    id: '1',
    title: 'Senior Frontend Developer',
    company: 'TechFlow Inc.',
    location: 'San Francisco, CA',
    salary: '$120k - $160k',
    type: 'Full-time',
    description: 'We are looking for a talented Frontend Developer to join our dynamic team. You will be responsible for building the next generation of web applications using modern technologies.',
    requirements: ['React', 'TypeScript', 'Tailwind CSS', '5+ years experience'],
    posted: '2 days ago'
  },
  {
    id: '2',
    title: 'UX/UI Designer',
    company: 'Creative Solutions',
    location: 'Remote',
    salary: '$80k - $110k',
    type: 'Full-time',
    description: 'Join our design team to create beautiful and intuitive user experiences. You will work closely with developers and product managers to deliver exceptional products.',
    requirements: ['Figma', 'Adobe Creative Suite', 'User Research', 'Prototyping'],
    posted: '1 day ago'
  },
  {
    id: '3',
    title: 'Product Manager',
    company: 'StartupXYZ',
    location: 'New York, NY',
    salary: '$100k - $140k',
    type: 'Full-time',
    description: 'Lead product strategy and development for our growing SaaS platform. Work with cross-functional teams to deliver features that delight our customers.',
    requirements: ['Product Strategy', 'Analytics', 'Agile', 'Leadership'],
    posted: '3 days ago'
  },
  {
    id: '4',
    title: 'Full Stack Developer',
    company: 'WebCorp',
    location: 'Austin, TX',
    salary: '$90k - $130k',
    type: 'Contract',
    description: 'Build and maintain web applications using modern full-stack technologies. Great opportunity for someone looking to work on diverse projects.',
    requirements: ['Node.js', 'React', 'PostgreSQL', 'AWS'],
    posted: '4 days ago'
  },
  {
    id: '5',
    title: 'Data Scientist',
    company: 'DataMind AI',
    location: 'Seattle, WA',
    salary: '$130k - $170k',
    type: 'Full-time',
    description: 'Apply machine learning and statistical analysis to solve complex business problems. Work with large datasets to derive actionable insights.',
    requirements: ['Python', 'Machine Learning', 'SQL', 'Statistics'],
    posted: '1 week ago'
  },
  {
    id: '6',
    title: 'DevOps Engineer',
    company: 'CloudTech',
    location: 'Remote',
    salary: '$110k - $150k',
    type: 'Full-time',
    description: 'Manage and optimize our cloud infrastructure. Implement CI/CD pipelines and ensure system reliability and scalability.',
    requirements: ['AWS/GCP', 'Docker', 'Kubernetes', 'CI/CD'],
    posted: '5 days ago'
  }
];

export const JobFinder = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [locationFilter, setLocationFilter] = useState('India');
  const [savedJobs, setSavedJobs] = useState<string[]>([]);
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);
  const { user } = useAuth();
  const { toast } = useToast();

  // Load saved jobs from database
  useEffect(() => {
    const loadSavedJobs = async () => {
      if (!user) return;
      
      const { data, error } = await supabase
        .from('saved_jobs')
        .select('job_id')
        .eq('user_id', user.id);

      if (error) {
        console.error('Error loading saved jobs:', error);
      } else {
        setSavedJobs(data.map(item => item.job_id));
      }
    };

    loadSavedJobs();
  }, [user]);

  const searchJobs = async () => {
    if (!searchQuery.trim()) {
      toast({
        title: "Search Required",
        description: "Please enter a job title or keyword to search.",
        variant: "destructive",
      });
      return;
    }

    setLoading(true);
    setHasSearched(true);
    
    try {
      const { data, error } = await supabase.functions.invoke('fetch-jobs', {
        body: {
          query: searchQuery,
          location: locationFilter || 'India',
          page: 1,
          employment_types: 'FULLTIME,PARTTIME,CONTRACTOR,INTERN'
        }
      });

      if (error) throw error;

      const transformedJobs: Job[] = data.jobs.map((job: any, index: number) => ({
        id: job.job_id || `job-${index}`,
        title: job.job_title || 'No Title',
        company: job.employer_name || 'Company Name Not Available',
        location: job.job_city ? `${job.job_city}, ${job.job_state || job.job_country}` : locationFilter,
        salary: job.job_salary || 'Salary not disclosed',
        type: job.job_employment_type || 'Not specified',
        description: job.job_description || 'No description available',
        requirements: job.job_required_skills || [],
        posted: job.job_posted_at_pretty || 'Recently posted',
        url: job.job_apply_link
      }));

      setJobs(transformedJobs);
      
      if (transformedJobs.length === 0) {
        toast({
          title: "No Results",
          description: "No jobs found for your search. Try different keywords or location.",
        });
      }
    } catch (error) {
      console.error('Error fetching jobs:', error);
      toast({
        title: "Search Error",
        description: "Failed to fetch jobs. Please try again.",
        variant: "destructive",
      });
      // Fallback to showing some mock India-focused jobs
      setJobs(mockJobs.map(job => ({
        ...job,
        location: job.location.includes('Remote') ? 'Remote (India)' : 'Mumbai, India'
      })));
    } finally {
      setLoading(false);
    }
  };

  const filteredJobs = hasSearched ? jobs : [];

  const toggleSaveJob = async (jobId: string) => {
    if (!user) {
      toast({
        title: "Authentication Required",
        description: "Please sign in to save jobs.",
        variant: "destructive",
      });
      return;
    }

    const job = jobs.find(j => j.id === jobId);
    if (!job) return;

    const isCurrentlySaved = savedJobs.includes(jobId);

    try {
      if (isCurrentlySaved) {
        // Remove from saved jobs
        const { error } = await supabase
          .from('saved_jobs')
          .delete()
          .eq('user_id', user.id)
          .eq('job_id', jobId);

        if (error) throw error;

        setSavedJobs(prev => prev.filter(id => id !== jobId));
        toast({
          title: "Job removed",
          description: "Job removed from your saved list.",
        });
      } else {
        // Add to saved jobs
        const { error } = await supabase
          .from('saved_jobs')
          .insert({
            user_id: user.id,
            job_id: jobId,
            job_title: job.title,
            company: job.company,
            location: job.location,
            salary: job.salary,
            job_type: job.type,
            description: job.description,
            requirements: job.requirements,
            posted_date: job.posted,
            job_url: job.url
          });

        if (error) throw error;

        setSavedJobs(prev => [...prev, jobId]);
        toast({
          title: "Job saved",
          description: "Job added to your saved list.",
        });
      }
    } catch (error) {
      console.error('Error toggling saved job:', error);
      toast({
        title: "Error",
        description: "Failed to update saved job. Please try again.",
        variant: "destructive",
      });
    }
  };

  return (
    <section id="job-finder" className="py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Find Your{' '}
            <span className="bg-gradient-primary bg-clip-text text-transparent">
              Dream Job
            </span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Discover thousands of job opportunities from top companies across various industries
          </p>
        </div>

        {/* Search Section */}
        <div className="max-w-4xl mx-auto mb-12">
          <Card className="shadow-card">
            <CardContent className="p-6">
              <div className="grid md:grid-cols-3 gap-4">
                <div className="md:col-span-2">
                  <div className="relative">
                    <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input
                      placeholder="Search jobs, companies, or skills..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      onKeyDown={(e) => e.key === 'Enter' && searchJobs()}
                      className="pl-10"
                    />
                  </div>
                </div>
                <div className="relative">
                  <MapPin className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Location (default: India)"
                    value={locationFilter}
                    onChange={(e) => setLocationFilter(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && searchJobs()}
                    className="pl-10"
                  />
                </div>
              </div>
              <div className="mt-4 flex justify-center">
                <Button 
                  onClick={searchJobs} 
                  disabled={loading}
                  className="bg-gradient-primary hover:opacity-90 px-8"
                >
                  {loading ? (
                    <>
                      <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                      Searching...
                    </>
                  ) : (
                    <>
                      <Search className="h-4 w-4 mr-2" />
                      Search Jobs
                    </>
                  )}
                </Button>
              </div>
              <div className="mt-6 flex flex-wrap gap-2">
                <Badge 
                  variant="secondary" 
                  className="cursor-pointer hover:bg-primary hover:text-primary-foreground"
                  onClick={() => {setSearchQuery('software engineer'); setLocationFilter('Bangalore, India');}}
                >
                  Software Engineer
                </Badge>
                <Badge 
                  variant="secondary" 
                  className="cursor-pointer hover:bg-primary hover:text-primary-foreground"
                  onClick={() => {setSearchQuery('data scientist'); setLocationFilter('Mumbai, India');}}
                >
                  Data Scientist
                </Badge>
                <Badge 
                  variant="secondary" 
                  className="cursor-pointer hover:bg-primary hover:text-primary-foreground"
                  onClick={() => {setSearchQuery('frontend developer'); setLocationFilter('Delhi, India');}}
                >
                  Frontend Developer
                </Badge>
                <Badge 
                  variant="secondary" 
                  className="cursor-pointer hover:bg-primary hover:text-primary-foreground"
                  onClick={() => {setSearchQuery('product manager'); setLocationFilter('Hyderabad, India');}}
                >
                  Product Manager
                </Badge>
                <Badge 
                  variant="secondary" 
                  className="cursor-pointer hover:bg-primary hover:text-primary-foreground"
                  onClick={() => {setSearchQuery('ui ux designer'); setLocationFilter('Pune, India');}}
                >
                  UI/UX Designer
                </Badge>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Results */}
        <div className="max-w-6xl mx-auto">
          {hasSearched && (
            <div className="mb-6">
              <p className="text-muted-foreground">
                Found {filteredJobs.length} job{filteredJobs.length !== 1 ? 's' : ''} for "{searchQuery}" in {locationFilter}
              </p>
            </div>
          )}

          <div className="grid gap-6">
            {filteredJobs.map((job) => (
              <Card key={job.id} className="shadow-card hover:shadow-elegant transition-all duration-300 cursor-pointer">
                <CardContent className="p-6">
                  <div className="flex justify-between items-start mb-4">
                    <div className="flex-1">
                      <h3 className="text-xl font-semibold mb-2">{job.title}</h3>
                      <div className="flex items-center gap-4 text-muted-foreground mb-3">
                        <div className="flex items-center gap-1">
                          <Building className="h-4 w-4" />
                          <span>{job.company}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <MapPin className="h-4 w-4" />
                          <span>{job.location}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <DollarSign className="h-4 w-4" />
                          <span>{job.salary}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Clock className="h-4 w-4" />
                          <span>{job.posted}</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge variant={job.type === 'Full-time' ? 'default' : 'secondary'}>
                        {job.type}
                      </Badge>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => toggleSaveJob(job.id)}
                        className={savedJobs.includes(job.id) ? 'text-red-500' : ''}
                      >
                        <Heart className={`h-4 w-4 ${savedJobs.includes(job.id) ? 'fill-current' : ''}`} />
                      </Button>
                    </div>
                  </div>

                  <p className="text-muted-foreground mb-4 line-clamp-2">
                    {job.description}
                  </p>

                  <div className="flex flex-wrap gap-2 mb-4">
                    {job.requirements.map((req) => (
                      <Badge key={req} variant="outline" className="text-xs">
                        {req}
                      </Badge>
                    ))}
                  </div>

                  <div className="flex gap-3">
                    <Button 
                      className="bg-gradient-primary hover:opacity-90"
                      onClick={() => job.url ? window.open(job.url, '_blank') : toast({ title: "Apply Now", description: "Application link not available" })}
                    >
                      Apply Now
                    </Button>
                    <Button variant="outline">
                      View Details
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {hasSearched && filteredJobs.length === 0 && !loading && (
            <div className="text-center py-16">
              <div className="text-6xl mb-4">🔍</div>
              <h3 className="text-2xl font-semibold mb-2">No jobs found</h3>
              <p className="text-muted-foreground">
                Try adjusting your search criteria or explore different keywords for jobs in India
              </p>
            </div>
          )}
          
          {!hasSearched && (
            <div className="text-center py-16">
              <div className="text-6xl mb-4">💼</div>
              <h3 className="text-2xl font-semibold mb-2">Ready to find your next opportunity?</h3>
              <p className="text-muted-foreground">
                Enter a job title or keyword above to search for jobs across India
              </p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};