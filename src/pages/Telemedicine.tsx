import { Header, Footer } from '@/components/Layout';
import { useAuth } from '@/hooks/useAuth';
import { supabase } from '@/integrations/supabase/client';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';
import { Video, Phone, Calendar, Clock, Plus, Trash2 } from 'lucide-react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { format } from 'date-fns';

const specialties = ['General Medicine', 'Cardiology', 'Dermatology', 'Orthopedics', 'Pediatrics', 'Psychiatry', 'ENT', 'Gynecology'];
const doctors: Record<string, string[]> = {
  'General Medicine': ['Dr. Sharma', 'Dr. Gupta'],
  'Cardiology': ['Dr. Patel', 'Dr. Reddy'],
  'Dermatology': ['Dr. Iyer', 'Dr. Mehta'],
  'Orthopedics': ['Dr. Singh', 'Dr. Kumar'],
  'Pediatrics': ['Dr. Verma', 'Dr. Das'],
  'Psychiatry': ['Dr. Nair', 'Dr. Joshi'],
  'ENT': ['Dr. Rao', 'Dr. Mishra'],
  'Gynecology': ['Dr. Desai', 'Dr. Kapoor'],
};

const Telemedicine = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [showForm, setShowForm] = useState(false);
  const [specialty, setSpecialty] = useState('');
  const [doctorName, setDoctorName] = useState('');
  const [sessionType, setSessionType] = useState('video');
  const [scheduledAt, setScheduledAt] = useState('');
  const [notes, setNotes] = useState('');

  const { data: sessions = [], isLoading } = useQuery({
    queryKey: ['telemedicine-sessions', user?.id],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('telemedicine_sessions')
        .select('*')
        .order('scheduled_at', { ascending: false });
      if (error) throw error;
      return data;
    },
    enabled: !!user,
  });

  const createSession = useMutation({
    mutationFn: async () => {
      const { error } = await supabase.from('telemedicine_sessions').insert({
        user_id: user!.id,
        doctor_name: doctorName,
        specialty,
        session_type: sessionType,
        scheduled_at: scheduledAt,
        notes,
      });
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['telemedicine-sessions'] });
      toast({ title: 'Session Scheduled', description: 'Your telemedicine session has been booked.' });
      setShowForm(false);
      setSpecialty('');
      setDoctorName('');
      setNotes('');
      setScheduledAt('');
    },
    onError: () => toast({ title: 'Error', description: 'Failed to schedule session.', variant: 'destructive' }),
  });

  const deleteSession = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase.from('telemedicine_sessions').delete().eq('id', id);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['telemedicine-sessions'] });
      toast({ title: 'Deleted', description: 'Session removed.' });
    },
  });

  if (!user) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <main className="container mx-auto px-4 py-16 text-center">
          <h1 className="text-3xl font-bold mb-4">Telemedicine</h1>
          <p className="text-muted-foreground mb-6">Please sign in to access telemedicine consultations.</p>
          <Button onClick={() => navigate('/auth')}>Sign In</Button>
        </main>
        <Footer />
      </div>
    );
  }

  const statusColor = (s: string) => {
    switch (s) {
      case 'scheduled': return 'bg-warning/10 text-warning';
      case 'completed': return 'bg-success/10 text-success';
      case 'cancelled': return 'bg-destructive/10 text-destructive';
      default: return 'bg-muted text-muted-foreground';
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-heading font-bold text-foreground">Telemedicine</h1>
            <p className="text-muted-foreground">Schedule and manage remote consultations</p>
          </div>
          <Button onClick={() => setShowForm(!showForm)}>
            <Plus className="w-4 h-4 mr-2" /> New Session
          </Button>
        </div>

        {showForm && (
          <Card className="mb-8">
            <CardHeader>
              <CardTitle>Schedule a Consultation</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium text-foreground mb-1 block">Specialty</label>
                  <Select value={specialty} onValueChange={(v) => { setSpecialty(v); setDoctorName(''); }}>
                    <SelectTrigger><SelectValue placeholder="Select specialty" /></SelectTrigger>
                    <SelectContent>
                      {specialties.map(s => <SelectItem key={s} value={s}>{s}</SelectItem>)}
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <label className="text-sm font-medium text-foreground mb-1 block">Doctor</label>
                  <Select value={doctorName} onValueChange={setDoctorName} disabled={!specialty}>
                    <SelectTrigger><SelectValue placeholder="Select doctor" /></SelectTrigger>
                    <SelectContent>
                      {(doctors[specialty] || []).map(d => <SelectItem key={d} value={d}>{d}</SelectItem>)}
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <label className="text-sm font-medium text-foreground mb-1 block">Session Type</label>
                  <Select value={sessionType} onValueChange={setSessionType}>
                    <SelectTrigger><SelectValue /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="video">Video Call</SelectItem>
                      <SelectItem value="audio">Audio Call</SelectItem>
                      <SelectItem value="chat">Chat</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <label className="text-sm font-medium text-foreground mb-1 block">Schedule Date & Time</label>
                  <Input type="datetime-local" value={scheduledAt} onChange={e => setScheduledAt(e.target.value)} />
                </div>
              </div>
              <div>
                <label className="text-sm font-medium text-foreground mb-1 block">Notes (optional)</label>
                <Textarea value={notes} onChange={e => setNotes(e.target.value)} placeholder="Describe your symptoms or concerns..." />
              </div>
              <Button onClick={() => createSession.mutate()} disabled={!doctorName || !scheduledAt || createSession.isPending}>
                {createSession.isPending ? 'Scheduling...' : 'Schedule Session'}
              </Button>
            </CardContent>
          </Card>
        )}

        {isLoading ? (
          <p className="text-muted-foreground">Loading sessions...</p>
        ) : sessions.length === 0 ? (
          <Card className="text-center py-12">
            <CardContent>
              <Video className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
              <p className="text-muted-foreground">No sessions yet. Schedule your first consultation!</p>
            </CardContent>
          </Card>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {sessions.map(session => (
              <Card key={session.id}>
                <CardContent className="p-6">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center gap-2">
                      {session.session_type === 'video' ? <Video className="w-5 h-5 text-primary" /> : <Phone className="w-5 h-5 text-primary" />}
                      <span className="font-bold text-foreground">{session.doctor_name}</span>
                    </div>
                    <Badge className={statusColor(session.status)}>{session.status}</Badge>
                  </div>
                  <p className="text-sm text-muted-foreground mb-1">{session.specialty}</p>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground mb-1">
                    <Calendar className="w-4 h-4" />
                    {format(new Date(session.scheduled_at), 'PPp')}
                  </div>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground mb-3">
                    <Clock className="w-4 h-4" />
                    {session.duration_minutes} min
                  </div>
                  {session.notes && <p className="text-sm text-muted-foreground border-t pt-2">{session.notes}</p>}
                  <Button variant="ghost" size="sm" className="mt-2 text-destructive" onClick={() => deleteSession.mutate(session.id)}>
                    <Trash2 className="w-4 h-4 mr-1" /> Remove
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
};

export default Telemedicine;
