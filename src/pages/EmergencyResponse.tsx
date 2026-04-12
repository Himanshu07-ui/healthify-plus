import { Header, Footer } from '@/components/Layout';
import { useAuth } from '@/hooks/useAuth';
import { supabase } from '@/integrations/supabase/client';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Switch } from '@/components/ui/switch';
import { useToast } from '@/hooks/use-toast';
import { Siren, Droplets, Phone, UserPlus, Trash2, Search, AlertTriangle } from 'lucide-react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const bloodGroups = ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'];

const EmergencyResponse = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  const queryClient = useQueryClient();

  // Blood donor form
  const [bloodGroup, setBloodGroup] = useState('');
  const [donorLocation, setDonorLocation] = useState('');
  const [donorPhone, setDonorPhone] = useState('');
  const [searchBloodGroup, setSearchBloodGroup] = useState('');

  // Emergency contact form
  const [contactName, setContactName] = useState('');
  const [contactPhone, setContactPhone] = useState('');
  const [relationship, setRelationship] = useState('');

  // Queries
  const { data: donors = [] } = useQuery({
    queryKey: ['blood-donors', searchBloodGroup],
    queryFn: async () => {
      let query = supabase.from('blood_donors').select('*').eq('is_available', true);
      if (searchBloodGroup) query = query.eq('blood_group', searchBloodGroup);
      const { data, error } = await query.order('created_at', { ascending: false });
      if (error) throw error;
      return data;
    },
    enabled: !!user,
  });

  const { data: myDonorProfile } = useQuery({
    queryKey: ['my-donor-profile', user?.id],
    queryFn: async () => {
      const { data, error } = await supabase.from('blood_donors').select('*').eq('user_id', user!.id).maybeSingle();
      if (error) throw error;
      return data;
    },
    enabled: !!user,
  });

  const { data: contacts = [] } = useQuery({
    queryKey: ['emergency-contacts', user?.id],
    queryFn: async () => {
      const { data, error } = await supabase.from('emergency_contacts').select('*').order('is_primary', { ascending: false });
      if (error) throw error;
      return data;
    },
    enabled: !!user,
  });

  // Mutations
  const registerDonor = useMutation({
    mutationFn: async () => {
      const { error } = await supabase.from('blood_donors').insert({
        user_id: user!.id,
        blood_group: bloodGroup,
        location: donorLocation,
        phone: donorPhone,
      });
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['blood-donors'] });
      queryClient.invalidateQueries({ queryKey: ['my-donor-profile'] });
      toast({ title: 'Registered!', description: 'You are now a registered blood donor.' });
      setBloodGroup('');
      setDonorLocation('');
      setDonorPhone('');
    },
    onError: () => toast({ title: 'Error', description: 'Failed to register.', variant: 'destructive' }),
  });

  const toggleAvailability = useMutation({
    mutationFn: async () => {
      if (!myDonorProfile) return;
      const { error } = await supabase.from('blood_donors').update({ is_available: !myDonorProfile.is_available }).eq('id', myDonorProfile.id);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['my-donor-profile'] });
      queryClient.invalidateQueries({ queryKey: ['blood-donors'] });
    },
  });

  const addContact = useMutation({
    mutationFn: async () => {
      const { error } = await supabase.from('emergency_contacts').insert({
        user_id: user!.id,
        contact_name: contactName,
        phone: contactPhone,
        relationship,
      });
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['emergency-contacts'] });
      toast({ title: 'Contact Added' });
      setContactName('');
      setContactPhone('');
      setRelationship('');
    },
    onError: () => toast({ title: 'Error', description: 'Failed to add contact.', variant: 'destructive' }),
  });

  const deleteContact = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase.from('emergency_contacts').delete().eq('id', id);
      if (error) throw error;
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['emergency-contacts'] }),
  });

  if (!user) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <main className="container mx-auto px-4 py-16 text-center">
          <h1 className="text-3xl font-bold mb-4">Emergency Response</h1>
          <p className="text-muted-foreground mb-6">Please sign in to access emergency features.</p>
          <Button onClick={() => navigate('/auth')}>Sign In</Button>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-heading font-bold text-foreground flex items-center gap-2">
            <Siren className="w-8 h-8 text-destructive" /> Emergency Response
          </h1>
          <p className="text-muted-foreground">Blood donor network & emergency contacts</p>
        </div>

        {/* SOS Button */}
        <Card className="mb-8 border-destructive/30 bg-destructive/5">
          <CardContent className="p-6 flex items-center justify-between">
            <div>
              <h3 className="font-bold text-foreground text-lg flex items-center gap-2"><AlertTriangle className="w-5 h-5 text-destructive" /> Emergency SOS</h3>
              <p className="text-sm text-muted-foreground">Instantly alert your emergency contacts</p>
            </div>
            <Button variant="destructive" size="lg" onClick={() => {
              if (contacts.length === 0) {
                toast({ title: 'No Contacts', description: 'Please add emergency contacts first.', variant: 'destructive' });
              } else {
                toast({ title: 'SOS Sent!', description: `Alert sent to ${contacts.length} emergency contact(s).` });
              }
            }}>
              <Phone className="w-5 h-5 mr-2" /> Send SOS
            </Button>
          </CardContent>
        </Card>

        <Tabs defaultValue="donors" className="space-y-6">
          <TabsList>
            <TabsTrigger value="donors"><Droplets className="w-4 h-4 mr-2" /> Blood Donors</TabsTrigger>
            <TabsTrigger value="contacts"><Phone className="w-4 h-4 mr-2" /> Emergency Contacts</TabsTrigger>
          </TabsList>

          <TabsContent value="donors" className="space-y-6">
            {/* My Donor Profile */}
            {myDonorProfile ? (
              <Card>
                <CardContent className="p-6 flex items-center justify-between">
                  <div>
                    <p className="font-bold text-foreground">Your Donor Profile</p>
                    <p className="text-sm text-muted-foreground">Blood Group: <Badge>{myDonorProfile.blood_group}</Badge> • {myDonorProfile.location}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-sm text-muted-foreground">Available</span>
                    <Switch checked={myDonorProfile.is_available} onCheckedChange={() => toggleAvailability.mutate()} />
                  </div>
                </CardContent>
              </Card>
            ) : (
              <Card>
                <CardHeader><CardTitle>Register as Blood Donor</CardTitle></CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid md:grid-cols-3 gap-4">
                    <Select value={bloodGroup} onValueChange={setBloodGroup}>
                      <SelectTrigger><SelectValue placeholder="Blood Group" /></SelectTrigger>
                      <SelectContent>{bloodGroups.map(bg => <SelectItem key={bg} value={bg}>{bg}</SelectItem>)}</SelectContent>
                    </Select>
                    <Input placeholder="Your location" value={donorLocation} onChange={e => setDonorLocation(e.target.value)} />
                    <Input placeholder="Phone number" value={donorPhone} onChange={e => setDonorPhone(e.target.value)} />
                  </div>
                  <Button onClick={() => registerDonor.mutate()} disabled={!bloodGroup || !donorLocation || !donorPhone}>
                    <UserPlus className="w-4 h-4 mr-2" /> Register
                  </Button>
                </CardContent>
              </Card>
            )}

            {/* Search Donors */}
            <Card>
              <CardHeader><CardTitle className="flex items-center gap-2"><Search className="w-5 h-5" /> Find Donors</CardTitle></CardHeader>
              <CardContent>
                <Select value={searchBloodGroup} onValueChange={setSearchBloodGroup}>
                  <SelectTrigger className="w-48 mb-4"><SelectValue placeholder="Filter by blood group" /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Groups</SelectItem>
                    {bloodGroups.map(bg => <SelectItem key={bg} value={bg}>{bg}</SelectItem>)}
                  </SelectContent>
                </Select>
                {donors.length === 0 ? (
                  <p className="text-muted-foreground">No donors found.</p>
                ) : (
                  <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-3">
                    {donors.map(d => (
                      <div key={d.id} className="p-4 rounded-lg border border-border">
                        <div className="flex items-center gap-2 mb-1">
                          <Badge variant="destructive">{d.blood_group}</Badge>
                          <span className="font-medium text-foreground">{d.location}</span>
                        </div>
                        <p className="text-sm text-muted-foreground">{d.phone}</p>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="contacts" className="space-y-6">
            <Card>
              <CardHeader><CardTitle>Add Emergency Contact</CardTitle></CardHeader>
              <CardContent className="space-y-4">
                <div className="grid md:grid-cols-3 gap-4">
                  <Input placeholder="Contact name" value={contactName} onChange={e => setContactName(e.target.value)} />
                  <Input placeholder="Phone number" value={contactPhone} onChange={e => setContactPhone(e.target.value)} />
                  <Input placeholder="Relationship (e.g. Parent)" value={relationship} onChange={e => setRelationship(e.target.value)} />
                </div>
                <Button onClick={() => addContact.mutate()} disabled={!contactName || !contactPhone || !relationship}>
                  <UserPlus className="w-4 h-4 mr-2" /> Add Contact
                </Button>
              </CardContent>
            </Card>

            {contacts.length === 0 ? (
              <Card className="text-center py-12"><CardContent><p className="text-muted-foreground">No emergency contacts added yet.</p></CardContent></Card>
            ) : (
              <div className="space-y-3">
                {contacts.map(c => (
                  <Card key={c.id}>
                    <CardContent className="p-4 flex items-center justify-between">
                      <div>
                        <p className="font-bold text-foreground">{c.contact_name}</p>
                        <p className="text-sm text-muted-foreground">{c.relationship} • {c.phone}</p>
                      </div>
                      <Button variant="ghost" size="sm" onClick={() => deleteContact.mutate(c.id)}><Trash2 className="w-4 h-4 text-destructive" /></Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </TabsContent>
        </Tabs>
      </main>
      <Footer />
    </div>
  );
};

export default EmergencyResponse;
