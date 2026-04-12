import { Header, Footer } from '@/components/Layout';
import { useAuth } from '@/hooks/useAuth';
import { supabase } from '@/integrations/supabase/client';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { ShieldCheck, ClipboardList, AlertTriangle, CheckCircle } from 'lucide-react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { format } from 'date-fns';

const assessments = [
  {
    type: 'cardiovascular',
    title: 'Cardiovascular Risk',
    description: 'Evaluate your heart health risk factors',
    questions: [
      { q: 'Do you smoke or use tobacco?', options: ['No', 'Occasionally', 'Regularly'] },
      { q: 'How often do you exercise per week?', options: ['4+ times', '1-3 times', 'Rarely'] },
      { q: 'Do you have a family history of heart disease?', options: ['No', 'Unsure', 'Yes'] },
      { q: 'How would you rate your stress level?', options: ['Low', 'Moderate', 'High'] },
      { q: 'Do you have high blood pressure?', options: ['No', 'Borderline', 'Yes'] },
    ],
  },
  {
    type: 'diabetes',
    title: 'Diabetes Risk',
    description: 'Screen for type 2 diabetes risk factors',
    questions: [
      { q: 'What is your BMI range?', options: ['Under 25', '25-30', 'Over 30'] },
      { q: 'Do you have a family history of diabetes?', options: ['No', 'Unsure', 'Yes'] },
      { q: 'How often do you eat sugary foods?', options: ['Rarely', 'Sometimes', 'Daily'] },
      { q: 'Are you physically active?', options: ['Very active', 'Moderate', 'Sedentary'] },
      { q: 'Do you experience frequent thirst or urination?', options: ['No', 'Sometimes', 'Often'] },
    ],
  },
  {
    type: 'mental_health',
    title: 'Mental Health Screening',
    description: 'Quick check on your mental wellness indicators',
    questions: [
      { q: 'How often do you feel anxious or worried?', options: ['Rarely', 'Sometimes', 'Often'] },
      { q: 'How is your sleep quality?', options: ['Good', 'Fair', 'Poor'] },
      { q: 'Do you feel socially connected?', options: ['Yes', 'Somewhat', 'No'] },
      { q: 'How often do you feel overwhelmed?', options: ['Rarely', 'Sometimes', 'Frequently'] },
      { q: 'Do you enjoy activities you used to?', options: ['Yes', 'Sometimes', 'Rarely'] },
    ],
  },
];

const PreventiveCare = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [activeAssessment, setActiveAssessment] = useState<string | null>(null);
  const [answers, setAnswers] = useState<Record<number, string>>({});

  const { data: history = [], isLoading } = useQuery({
    queryKey: ['health-assessments', user?.id],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('health_assessments')
        .select('*')
        .order('created_at', { ascending: false });
      if (error) throw error;
      return data;
    },
    enabled: !!user,
  });

  const submitAssessment = useMutation({
    mutationFn: async () => {
      const assessment = assessments.find(a => a.type === activeAssessment)!;
      // Score: 0 for first option, 1 for second, 2 for third
      let totalScore = 0;
      assessment.questions.forEach((_, i) => {
        const ans = answers[i];
        const idx = assessment.questions[i].options.indexOf(ans);
        totalScore += idx >= 0 ? idx : 0;
      });
      const maxScore = assessment.questions.length * 2;
      const pct = totalScore / maxScore;
      const riskLevel = pct < 0.33 ? 'low' : pct < 0.66 ? 'moderate' : 'high';
      const recommendations = [];
      if (riskLevel === 'high') recommendations.push('Consult a doctor soon', 'Make lifestyle changes immediately');
      else if (riskLevel === 'moderate') recommendations.push('Monitor regularly', 'Consider lifestyle improvements');
      else recommendations.push('Keep up the good work', 'Continue regular check-ups');

      const { error } = await supabase.from('health_assessments').insert({
        user_id: user!.id,
        assessment_type: activeAssessment!,
        risk_level: riskLevel,
        score: Math.round(pct * 100),
        answers: answers as any,
        recommendations,
      });
      if (error) throw error;
      return riskLevel;
    },
    onSuccess: (riskLevel) => {
      queryClient.invalidateQueries({ queryKey: ['health-assessments'] });
      toast({ title: 'Assessment Complete', description: `Your risk level: ${riskLevel}` });
      setActiveAssessment(null);
      setAnswers({});
    },
    onError: () => toast({ title: 'Error', description: 'Failed to save assessment.', variant: 'destructive' }),
  });

  if (!user) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <main className="container mx-auto px-4 py-16 text-center">
          <h1 className="text-3xl font-bold mb-4">Preventive Healthcare</h1>
          <p className="text-muted-foreground mb-6">Please sign in to access health assessments.</p>
          <Button onClick={() => navigate('/auth')}>Sign In</Button>
        </main>
        <Footer />
      </div>
    );
  }

  const currentAssessment = assessments.find(a => a.type === activeAssessment);
  const allAnswered = currentAssessment ? currentAssessment.questions.every((_, i) => answers[i]) : false;

  const riskBadge = (level: string) => {
    switch (level) {
      case 'low': return <Badge className="bg-success/10 text-success">Low Risk</Badge>;
      case 'moderate': return <Badge className="bg-warning/10 text-warning">Moderate Risk</Badge>;
      case 'high': return <Badge className="bg-destructive/10 text-destructive">High Risk</Badge>;
      default: return <Badge variant="outline">{level}</Badge>;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-heading font-bold text-foreground">Preventive Healthcare</h1>
          <p className="text-muted-foreground">Early detection through health risk assessments</p>
        </div>

        {!activeAssessment ? (
          <>
            <div className="grid md:grid-cols-3 gap-6 mb-8">
              {assessments.map(a => (
                <Card key={a.type} className="hover:border-primary/30 transition-colors cursor-pointer" onClick={() => setActiveAssessment(a.type)}>
                  <CardHeader>
                    <ShieldCheck className="w-10 h-10 text-primary mb-2" />
                    <CardTitle>{a.title}</CardTitle>
                    <CardDescription>{a.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Button variant="outline" className="w-full">Take Assessment</Button>
                  </CardContent>
                </Card>
              ))}
            </div>

            <h2 className="text-xl font-bold text-foreground mb-4">Assessment History</h2>
            {isLoading ? <p className="text-muted-foreground">Loading...</p> : history.length === 0 ? (
              <Card className="text-center py-12"><CardContent><p className="text-muted-foreground">No assessments yet. Take one above!</p></CardContent></Card>
            ) : (
              <div className="space-y-3">
                {history.map(h => (
                  <Card key={h.id}>
                    <CardContent className="p-4 flex items-center justify-between">
                      <div>
                        <span className="font-bold text-foreground capitalize">{h.assessment_type.replace('_', ' ')}</span>
                        <span className="text-sm text-muted-foreground ml-2">{format(new Date(h.created_at), 'PPp')}</span>
                        {h.recommendations && (
                          <div className="flex gap-1 mt-1">{(h.recommendations as string[]).map((r, i) => <Badge key={i} variant="secondary" className="text-xs">{r}</Badge>)}</div>
                        )}
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-sm text-muted-foreground">Score: {h.score}%</span>
                        {riskBadge(h.risk_level)}
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </>
        ) : (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2"><ClipboardList className="w-5 h-5 text-primary" /> {currentAssessment?.title}</CardTitle>
              <CardDescription>{currentAssessment?.description}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {currentAssessment?.questions.map((q, i) => (
                <div key={i}>
                  <p className="font-medium text-foreground mb-2">{i + 1}. {q.q}</p>
                  <RadioGroup value={answers[i] || ''} onValueChange={v => setAnswers(prev => ({ ...prev, [i]: v }))}>
                    {q.options.map(opt => (
                      <div key={opt} className="flex items-center space-x-2">
                        <RadioGroupItem value={opt} id={`q${i}-${opt}`} />
                        <Label htmlFor={`q${i}-${opt}`}>{opt}</Label>
                      </div>
                    ))}
                  </RadioGroup>
                </div>
              ))}
              <div className="flex gap-3">
                <Button variant="outline" onClick={() => { setActiveAssessment(null); setAnswers({}); }}>Cancel</Button>
                <Button onClick={() => submitAssessment.mutate()} disabled={!allAnswered || submitAssessment.isPending}>
                  {submitAssessment.isPending ? 'Submitting...' : 'Submit Assessment'}
                </Button>
              </div>
            </CardContent>
          </Card>
        )}
      </main>
      <Footer />
    </div>
  );
};

export default PreventiveCare;
