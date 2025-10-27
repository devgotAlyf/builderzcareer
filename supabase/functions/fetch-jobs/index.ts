import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

interface JobSearchRequest {
  query?: string;
  location?: string;
  page?: number;
  employment_types?: string;
}

const handler = async (req: Request): Promise<Response> => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const rapidApiKey = Deno.env.get('RAPIDAPI_KEY');
    if (!rapidApiKey) {
      throw new Error('RAPIDAPI_KEY is not configured');
    }

    const { query = 'software developer', location = 'India', page = 1, employment_types = 'FULLTIME' }: JobSearchRequest = await req.json();

    // Enhance location with India if not already specified
    let searchLocation = location && location.trim() ? location : 'India';
    if (searchLocation && !searchLocation.toLowerCase().includes('india') && searchLocation.toLowerCase() !== 'remote') {
      searchLocation = `${searchLocation}, India`;
    }

    console.log('Searching jobs:', { query, location: searchLocation, page });

    const searchParams = new URLSearchParams({
      query,
      page: page.toString(),
      num_pages: '1',
      employment_types,
      date_posted: 'all',
      job_requirements: 'no_experience,under_3_years_experience,more_than_3_years_experience',
    });

    if (searchLocation) {
      searchParams.append('location', searchLocation);
    }

    const apiUrl = `https://jsearch.p.rapidapi.com/search?${searchParams}`;

    const response = await fetch(apiUrl, {
      method: 'GET',
      headers: {
        'X-RapidAPI-Key': rapidApiKey,
        'X-RapidAPI-Host': 'jsearch.p.rapidapi.com'
      }
    });

    if (!response.ok) {
      throw new Error(`API request failed: ${response.status} ${response.statusText}`);
    }

    const data = await response.json();
    
    console.log('API response received:', { 
      status: data.status, 
      totalJobs: data.data?.length || 0 
    });

    // Transform the data to match our Job interface
    const transformedJobs = data.data?.map((job: any) => ({
      id: job.job_id || `${job.employer_name}-${Date.now()}-${Math.random()}`,
      title: job.job_title || 'Unknown Title',
      company: job.employer_name || 'Unknown Company',
      location: job.job_city && job.job_state ? `${job.job_city}, ${job.job_state}` : job.job_country || 'Remote',
      salary: job.job_salary_range || job.job_salary || 'Salary not specified',
      type: job.job_employment_type || 'Full-time',
      description: job.job_description || 'No description available',
      requirements: job.job_highlights?.Qualifications || job.job_required_skills || [],
      posted: job.job_posted_at_datetime_utc ? new Date(job.job_posted_at_datetime_utc).toLocaleDateString() : 'Recently posted',
      job_url: job.job_apply_link || job.job_google_link || '',
      employer_logo: job.employer_logo || '',
      job_benefits: job.job_highlights?.Benefits || [],
      job_responsibilities: job.job_highlights?.Responsibilities || []
    })) || [];

    return new Response(JSON.stringify({
      jobs: transformedJobs,
      total: data.data?.length || 0,
      page: page
    }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });

  } catch (error) {
    console.error('Error in fetch-jobs function:', error);
    return new Response(JSON.stringify({ 
      error: error.message || 'Failed to fetch jobs',
      jobs: [],
      total: 0 
    }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
};

serve(handler);