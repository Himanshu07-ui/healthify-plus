import { Header, Footer } from '@/components/Layout';
import { useAuth } from '@/hooks/useAuth';
import { supabase } from '@/integrations/supabase/client';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';
import { useToast } from '@/hooks/use-toast';
import { UserRound, Pill, Clock, Plus, Trash2, Bell, CheckCircle } from 'lucide-react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const ElderlyCare = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [showForm, setShowForm] = useState(false);
  const [medicineName, setMedicineName] = useState('');
  const [dosage, setDosage] = useState('');
  const [frequency, setFrequency] = useState('daily');
  const [times, setTimes] = useState<string[]>(['08:00']);
  const [notes, setNotes] = useState('');

  const { data: reminders = [], isLoading } = useQuery({
    queryKey: ['medication-reminders', user?.id],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('medication_reminders')
        .select('*')
        .order('created_at', { ascending: false });
      if (error) throw error;
      return data;
    },
    enabled: !!user,
  });

  const addReminder = useMutation({
    mutationFn: async () => {
      const { error } = await supabase.from('medication_reminders').insert({
        user_id: user!.id,
        medicine_name: medicineName,
        dosage,
        frequency,
        times,
        notes: notes || null,
      });
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['medication-reminders'] });
      toast({ title: 'Reminder Added', description: `${medicineName} has been added to your schedule.` });
      setShowForm(false);
      setMedicineName('');
      setDosage('');
      setFrequency('daily');
      setTimes(['08:00']);
      setNotes('');
    },
    onError: () => toast({ title: 'Error', description: 'Failed to add reminder.', variant: 'destructive' }),
  });

  const toggleActive = useMutation({
    mutationFn: async ({ id, is_active }: { id: string; is_active: boolean }) => {
      const { error } = await supabase.from('medication_reminders').update({ is_active: !is_active }).eq('id', id);
      if (error) throw error;
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['medication-reminders'] }),
  });

  const deleteReminder = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase.from('medication_reminders').delete().eq('id', id);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['medication-reminders'] });
      toast({ title: 'Removed' });
    },
  });

  const addTime = () => setTimes(prev => [...prev, '12:00']);
  const removeTime = (i: number) => setTimes(prev => prev.filter((_, idx) => idx !== i));
  const updateTime = (i: number, val: string) => setTimes(prev => prev.map((t, idx) => idx === i ? val : t));

  if (!user) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <main className="container mx-auto px-4 py-16 text-center">
          <h1 className="text-3xl font-bold mb-4">Elderly Care</h1>
          <p className="text-muted-foreground mb-6">Please sign in to manage medication reminders.</p>
          <Button onClick={() => navigate('/auth')}>Sign In</Button>
        </main>
        <Footer />
      </div>
    );
  }

  const activeReminders = reminders.filter(r => r.is_active);
  const inactiveReminders = reminders.filter(r => !r.is_active);

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-heading font-bold text-foreground flex items-center gap-2">
              <UserRound className="w-8 h-8 text-primary" /> Elderly Care
            </h1>
            <p className="text-muted-foreground">Medication reminders & health monitoring</p>
          </div>
          <Button onClick={() => setShowForm(!showForm)}>
            <Plus className="w-4 h-4 mr-2" /> Add Reminder
          </Button>
        </div>

        {showForm && (
          <Card className="mb-8">
            <CardHeader><CardTitle>New Medication Reminder</CardTitle></CardHeader>
            <CardContent className="space-y-4">
              <div className="grid md:grid-cols-3 gap-4">
                <div>
                  <label className="text-sm font-medium text-foreground mb-1 block">Medicine Name</label>
                  <Input value={medicineName} onChange={e => setMedicineName(e.target.value)} placeholder="e.g., Metformin" />
                </div>
                <div>
                  <label className="text-sm font-medium text-foreground mb-1 block">Dosage</label>
                  <Input value={dosage} onChange={e => setDosage(e.target.value)} placeholder="e.g., 500mg" />
                </div>
                <div>
                  <label className="text-sm font-medium text-foreground mb-1 block">Frequency</label>
                  <Select value={frequency} onValueChange={setFrequency}>
                    <SelectTrigger><SelectValue /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="daily">Daily</SelectItem>
                      <SelectItem value="twice_daily">Twice Daily</SelectItem>
                      <SelectItem value="weekly">Weekly</SelectItem>
                      <SelectItem value="as_needed">As Needed</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div>
                <label className="text-sm font-medium text-foreground mb-2 block">Reminder Times</label>
                <div className="flex flex-wrap gap-2 items-center">
                  {times.map((t, i) => (
                    <div key={i} className="flex items-center gap-1">
                      <Input type="time" value={t} onChange={e => updateTime(i, e.target.value)} className="w-32" />
                      {times.length > 1 && <Button variant="ghost" size="sm" onClick={() => removeTime(i)}>×</Button>}
                    </div>
                  ))}
                  <Button variant="outline" size="sm" onClick={addTime}><Plus className="w-3 h-3 mr-1" /> Add Time</Button>
                </div>
              </div>
              <Textarea value={notes} onChange={e => setNotes(e.target.value)} placeholder="Additional notes..." />
              <Button onClick={() => addReminder.mutate()} disabled={!medicineName || !dosage || addReminder.isPending}>
                {addReminder.isPending ? 'Adding...' : 'Save Reminder'}
              </Button>
            </CardContent>
          </Card>
        )}

        {/* Today's Schedule */}
        <Card className="mb-8 border-primary/20">
          <CardHeader>
            <CardTitle className="flex items-center gap-2"><Bell className="w-5 h-5 text-primary" /> Today's Medication Schedule</CardTitle>
          </CardHeader>
          <CardContent>
            {activeReminders.length === 0 ? (
              <p className="text-muted-foreground">No active medication reminders.</p>
            ) : (
              <div className="space-y-3">
                {activeReminders.map(r => (
                  <div key={r.id} className="flex items-center justify-between p-3 rounded-lg bg-muted/50 border border-border">
                    <div className="flex items-center gap-3">
                      <Pill className="w-5 h-5 text-primary" />
                      <div>
                        <p className="font-bold text-foreground">{r.medicine_name} <span className="font-normal text-muted-foreground">({r.dosage})</span></p>
                        <div className="flex gap-2 mt-1">
                          {r.times.map((t: string, i: number) => (
                            <Badge key={i} variant="outline" className="text-xs"><Clock className="w-3 h-3 mr-1" />{t}</Badge>
                          ))}
                          <Badge variant="secondary" className="text-xs capitalize">{r.frequency.replace('_', ' ')}</Badge>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Switch checked={r.is_active} onCheckedChange={() => toggleActive.mutate({ id: r.id, is_active: r.is_active })} />
                      <Button variant="ghost" size="sm" onClick={() => deleteReminder.mutate(r.id)}><Trash2 className="w-4 h-4 text-destructive" /></Button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>

        {inactiveReminders.length > 0 && (
          <>
            <h2 className="text-lg font-bold text-foreground mb-3">Inactive Reminders</h2>
            <div className="space-y-2">
              {inactiveReminders.map(r => (
                <Card key={r.id} className="opacity-60">
                  <CardContent className="p-3 flex items-center justify-between">
                    <span className="text-foreground">{r.medicine_name} ({r.dosage})</span>
                    <div className="flex items-center gap-2">
                      <Switch checked={r.is_active} onCheckedChange={() => toggleActive.mutate({ id: r.id, is_active: r.is_active })} />
                      <Button variant="ghost" size="sm" onClick={() => deleteReminder.mutate(r.id)}><Trash2 className="w-4 h-4 text-destructive" /></Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </>
        )}
      </main>
      <Footer />
    </div>
  );
};

export default ElderlyCare;
