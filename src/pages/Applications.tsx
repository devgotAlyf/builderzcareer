import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { MapPin, Calendar, Edit3, FileText } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/hooks/useAuth';
import { useToast } from '@/hooks/use-toast';

interface JobApplication {
  id: string;
  job_id: string;
  job_title: string;
  company: string;
  status: 'applied' | 'interview' | 'offer' | 'rejected' | 'withdrawn';
  applied_at: string;
  notes?: string;
}

const statusOptions = [
  { value: 'applied', label: 'Applied', color: 'bg-blue-500' },
  { value: 'interview', label: 'Interview', color: 'bg-yellow-500' },
  { value: 'offer', label: 'Offer', color: 'bg-green-500' },
  { value: 'rejected', label: 'Rejected', color: 'bg-red-500' },
  { value: 'withdrawn', label: 'Withdrawn', color: 'bg-gray-500' },
];

export default function Applications() {
  const navigate = useNavigate();
  const [applications, setApplications] = useState<JobApplication[]>([]);
  const [loading, setLoading] = useState(true);
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [editingApp, setEditingApp] = useState<JobApplication | null>(null);
  const [notes, setNotes] = useState('');
  const { user, loading: authLoading } = useAuth();
  const { toast } = useToast();

  useEffect(() => {
    if (!authLoading) {
      if (!user) {
        toast({
          title: "Authentication Required",
          description: "Please sign in to view your applications.",
          variant: "destructive",
        });
        navigate('/auth');
        return;
      }
      loadApplications();
    }
  }, [user, authLoading]);

  const loadApplications = async () => {
    if (!user) return;

    try {
      const { data, error } = await supabase
        .from('job_applications')
        .select('*')
        .eq('user_id', user.id)
        .order('applied_at', { ascending: false });

      if (error) throw error;
      setApplications((data || []) as JobApplication[]);
    } catch (error) {
      console.error('Error loading applications:', error);
      toast({
        title: "Error",
        description: "Failed to load applications.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const updateApplicationStatus = async (appId: string, newStatus: string) => {
    try {
      const { error } = await supabase
        .from('job_applications')
        .update({ status: newStatus })
        .eq('id', appId);

      if (error) throw error;

      setApplications(prev => 
        prev.map(app => 
          app.id === appId ? { ...app, status: newStatus as any } : app
        )
      );

      toast({
        title: "Status updated",
        description: "Application status has been updated.",
      });
    } catch (error) {
      console.error('Error updating status:', error);
      toast({
        title: "Error",
        description: "Failed to update status.",
        variant: "destructive",
      });
    }
  };

  const updateNotes = async (appId: string, newNotes: string) => {
    try {
      const { error } = await supabase
        .from('job_applications')
        .update({ notes: newNotes })
        .eq('id', appId);

      if (error) throw error;

      setApplications(prev => 
        prev.map(app => 
          app.id === appId ? { ...app, notes: newNotes } : app
        )
      );

      toast({
        title: "Notes updated",
        description: "Application notes have been updated.",
      });
      setEditingApp(null);
    } catch (error) {
      console.error('Error updating notes:', error);
      toast({
        title: "Error",
        description: "Failed to update notes.",
        variant: "destructive",
      });
    }
  };

  const filteredApplications = applications.filter(app => 
    filterStatus === 'all' || app.status === filterStatus
  );

  const getStatusBadge = (status: string) => {
    const statusConfig = statusOptions.find(s => s.value === status);
    return statusConfig || statusOptions[0];
  };

  if (loading) {
    return (
      <div className="min-h-screen">
        <Header />
        <main className="container mx-auto px-4 py-8">
          <div className="text-center">Loading your applications...</div>
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
          <h1 className="text-3xl font-bold mb-2">Job Applications</h1>
          <p className="text-muted-foreground">
            Track your job applications and their status
          </p>
        </div>

        <div className="mb-6">
          <Select value={filterStatus} onValueChange={setFilterStatus}>
            <SelectTrigger className="w-48">
              <SelectValue placeholder="Filter by status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Applications</SelectItem>
              {statusOptions.map(status => (
                <SelectItem key={status.value} value={status.value}>
                  {status.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {filteredApplications.length === 0 ? (
          <div className="text-center py-12">
            <FileText className="h-16 w-16 mx-auto text-muted-foreground mb-4" />
            <h2 className="text-2xl font-semibold mb-2">
              {filterStatus === 'all' ? 'No applications yet' : `No ${filterStatus} applications`}
            </h2>
            <p className="text-muted-foreground mb-4">
              {filterStatus === 'all' 
                ? 'Start applying to jobs to track them here.' 
                : `You don't have any ${filterStatus} applications.`}
            </p>
            {filterStatus === 'all' && (
              <Button asChild>
                <a href="/#job-finder">Browse Jobs</a>
              </Button>
            )}
          </div>
        ) : (
          <div className="grid gap-6">
            {filteredApplications.map((app) => (
              <Card key={app.id} className="hover:shadow-lg transition-shadow">
                <CardHeader className="pb-4">
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <CardTitle className="text-xl mb-2">{app.job_title}</CardTitle>
                      <div className="flex items-center gap-4 text-muted-foreground mb-3">
                        <span className="font-medium">{app.company}</span>
                        <div className="flex items-center gap-1">
                          <Calendar className="h-4 w-4" />
                          Applied {new Date(app.applied_at).toLocaleDateString()}
                        </div>
                      </div>
                      <div className="flex gap-2 items-center">
                        <div className="flex items-center gap-2">
                          <div className={`w-3 h-3 rounded-full ${getStatusBadge(app.status).color}`} />
                          <span className="font-medium">{getStatusBadge(app.status).label}</span>
                        </div>
                        <Select 
                          value={app.status} 
                          onValueChange={(value) => updateApplicationStatus(app.id, value)}
                        >
                          <SelectTrigger className="w-32 h-8">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            {statusOptions.map(status => (
                              <SelectItem key={status.value} value={status.value}>
                                {status.label}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => {
                            setEditingApp(app);
                            setNotes(app.notes || '');
                          }}
                        >
                          <Edit3 className="h-4 w-4" />
                        </Button>
                      </DialogTrigger>
                      <DialogContent>
                        <DialogHeader>
                          <DialogTitle>Update Notes</DialogTitle>
                        </DialogHeader>
                        <div className="space-y-4">
                          <div>
                            <h3 className="font-medium">{app.job_title}</h3>
                            <p className="text-sm text-muted-foreground">{app.company}</p>
                          </div>
                          <Textarea
                            placeholder="Add notes about this application..."
                            value={notes}
                            onChange={(e) => setNotes(e.target.value)}
                            rows={4}
                          />
                          <div className="flex gap-2">
                            <Button 
                              onClick={() => updateNotes(app.id, notes)}
                              className="flex-1"
                            >
                              Save Notes
                            </Button>
                            <Button 
                              variant="outline" 
                              onClick={() => setEditingApp(null)}
                            >
                              Cancel
                            </Button>
                          </div>
                        </div>
                      </DialogContent>
                    </Dialog>
                  </div>
                </CardHeader>
                {app.notes && (
                  <CardContent>
                    <div className="bg-muted/50 p-3 rounded-lg">
                      <h4 className="font-medium mb-1">Notes:</h4>
                      <p className="text-sm text-muted-foreground">{app.notes}</p>
                    </div>
                  </CardContent>
                )}
              </Card>
            ))}
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
}