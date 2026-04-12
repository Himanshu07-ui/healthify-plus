import { Header, Footer } from '@/components/Layout';
import { useAuth } from '@/hooks/useAuth';
import { supabase } from '@/integrations/supabase/client';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';
import { Brain, Smile, Meh, Frown, Heart, TrendingUp, Trash2 } from 'lucide-react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { format } from 'date-fns';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const moodOptions = [
  { score: 1, label: 'Very Low', emoji: '😞', color: 'bg-destructive/10 text-destructive' },
  { score: 3, label: 'Low', emoji: '😔', color: 'bg-warning/10 text-warning' },
  { score: 5, label: 'Neutral', emoji: '😐', color: 'bg-muted text-muted-foreground' },
  { score: 7, label: 'Good', emoji: '😊', color: 'bg-primary/10 text-primary' },
  { score: 9, label: 'Great', emoji: '😄', color: 'bg-success/10 text-success' },
  { score: 10, label: 'Amazing', emoji: '🤩', color: 'bg-success/10 text-success' },
];

const activityOptions = ['Exercise', 'Meditation', 'Reading', 'Socializing', 'Work', 'Sleep', 'Outdoors', 'Music', 'Cooking', 'Gaming'];

const MentalWellness = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [selectedMood, setSelectedMood] = useState<number | null>(null);
  const [notes, setNotes] = useState('');
  const [selectedActivities, setSelectedActivities] = useState<string[]>([]);

  const { data: entries = [], isLoading } = useQuery({
    queryKey: ['mood-entries', user?.id],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('mood_entries')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(50);
      if (error) throw error;
      return data;
    },
    enabled: !!user,
  });

  const addEntry = useMutation({
    mutationFn: async () => {
      const mood = moodOptions.find(m => m.score === selectedMood);
      const { error } = await supabase.from('mood_entries').insert({
        user_id: user!.id,
        mood_score: selectedMood!,
        mood_label: mood?.label || 'neutral',
        notes: notes || null,
        activities: selectedActivities.length > 0 ? selectedActivities : null,
      });
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['mood-entries'] });
      toast({ title: 'Mood Logged', description: 'Your mood has been recorded.' });
      setSelectedMood(null);
      setNotes('');
      setSelectedActivities([]);
    },
    onError: () => toast({ title: 'Error', description: 'Failed to log mood.', variant: 'destructive' }),
  });

  const deleteEntry = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase.from('mood_entries').delete().eq('id', id);
      if (error) throw error;
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['mood-entries'] }),
  });

  const toggleActivity = (a: string) => {
    setSelectedActivities(prev => prev.includes(a) ? prev.filter(x => x !== a) : [...prev, a]);
  };

  if (!user) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <main className="container mx-auto px-4 py-16 text-center">
          <h1 className="text-3xl font-bold mb-4">Mental Wellness</h1>
          <p className="text-muted-foreground mb-6">Please sign in to track your mental wellness.</p>
          <Button onClick={() => navigate('/auth')}>Sign In</Button>
        </main>
        <Footer />
      </div>
    );
  }

  const chartData = [...entries].reverse().slice(-14).map(e => ({
    date: format(new Date(e.created_at), 'MM/dd'),
    score: e.mood_score,
  }));

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-heading font-bold text-foreground">Mental Wellness</h1>
          <p className="text-muted-foreground">Track your mood and emotional well-being</p>
        </div>

        {/* Mood Logger */}
        <Card className="mb-8">
          <CardHeader><CardTitle className="flex items-center gap-2"><Brain className="w-5 h-5 text-primary" /> How are you feeling?</CardTitle></CardHeader>
          <CardContent className="space-y-4">
            <div className="flex flex-wrap gap-3">
              {moodOptions.map(m => (
                <button
                  key={m.score}
                  onClick={() => setSelectedMood(m.score)}
                  className={`flex flex-col items-center p-3 rounded-xl border-2 transition-all ${selectedMood === m.score ? 'border-primary bg-primary/5 scale-105' : 'border-border hover:border-primary/30'}`}
                >
                  <span className="text-2xl mb-1">{m.emoji}</span>
                  <span className="text-xs font-medium text-foreground">{m.label}</span>
                </button>
              ))}
            </div>

            <div>
              <label className="text-sm font-medium text-foreground mb-2 block">Activities today</label>
              <div className="flex flex-wrap gap-2">
                {activityOptions.map(a => (
                  <Badge
                    key={a}
                    variant={selectedActivities.includes(a) ? 'default' : 'outline'}
                    className="cursor-pointer"
                    onClick={() => toggleActivity(a)}
                  >{a}</Badge>
                ))}
              </div>
            </div>

            <Textarea value={notes} onChange={e => setNotes(e.target.value)} placeholder="Any thoughts or reflections..." />
            <Button onClick={() => addEntry.mutate()} disabled={!selectedMood || addEntry.isPending}>
              {addEntry.isPending ? 'Saving...' : 'Log Mood'}
            </Button>
          </CardContent>
        </Card>

        {/* Mood Trend Chart */}
        {chartData.length > 1 && (
          <Card className="mb-8">
            <CardHeader><CardTitle className="flex items-center gap-2"><TrendingUp className="w-5 h-5 text-success" /> Mood Trend (Last 14 entries)</CardTitle></CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={250}>
                <LineChart data={chartData}>
                  <CartesianGrid strokeDasharray="3 3" className="stroke-border" />
                  <XAxis dataKey="date" className="text-muted-foreground" tick={{ fontSize: 12 }} />
                  <YAxis domain={[0, 10]} className="text-muted-foreground" tick={{ fontSize: 12 }} />
                  <Tooltip />
                  <Line type="monotone" dataKey="score" stroke="hsl(var(--primary))" strokeWidth={2} dot={{ fill: 'hsl(var(--primary))' }} />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        )}

        {/* History */}
        <h2 className="text-xl font-bold text-foreground mb-4">Recent Entries</h2>
        {isLoading ? <p className="text-muted-foreground">Loading...</p> : entries.length === 0 ? (
          <Card className="text-center py-12"><CardContent><p className="text-muted-foreground">No entries yet. Log your first mood above!</p></CardContent></Card>
        ) : (
          <div className="space-y-3">
            {entries.slice(0, 10).map(entry => {
              const mood = moodOptions.find(m => m.score === entry.mood_score) || moodOptions[2];
              return (
                <Card key={entry.id}>
                  <CardContent className="p-4 flex items-center gap-4">
                    <span className="text-2xl">{mood.emoji}</span>
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-foreground">{mood.label}</span>
                        <Badge variant="outline" className={mood.color}>{entry.mood_score}/10</Badge>
                        <span className="text-xs text-muted-foreground">{format(new Date(entry.created_at), 'PPp')}</span>
                      </div>
                      {entry.activities && entry.activities.length > 0 && (
                        <div className="flex gap-1 mt-1">{entry.activities.map((a: string) => <Badge key={a} variant="secondary" className="text-xs">{a}</Badge>)}</div>
                      )}
                      {entry.notes && <p className="text-sm text-muted-foreground mt-1">{entry.notes}</p>}
                    </div>
                    <Button variant="ghost" size="sm" onClick={() => deleteEntry.mutate(entry.id)}><Trash2 className="w-4 h-4 text-destructive" /></Button>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
};

export default MentalWellness;
