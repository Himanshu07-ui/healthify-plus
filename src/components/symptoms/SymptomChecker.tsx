import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Stethoscope, AlertCircle, CheckCircle, Search, X, Sparkles, ArrowRight, RotateCcw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';

interface Symptom {
  id: string;
  name: string;
  category: string;
  severity?: number;
}

interface DiagnosisResult {
  condition: string;
  probability: 'High' | 'Medium' | 'Low';
  description: string;
  recommendations: string[];
  urgency: 'emergency' | 'urgent' | 'routine' | 'self-care';
  matchedSymptoms: string[];
  score: number;
}

interface ConditionRule {
  condition: string;
  description: string;
  requiredSymptoms: string[];
  optionalSymptoms: string[];
  minRequired: number;
  recommendations: string[];
  urgency: 'emergency' | 'urgent' | 'routine' | 'self-care';
}

// Common symptoms for quick selection
const commonSymptoms: Symptom[] = [
  { id: 'fever', name: 'Fever', category: 'General', severity: 2 },
  { id: 'headache', name: 'Headache', category: 'Head', severity: 2 },
  { id: 'cough', name: 'Cough', category: 'Respiratory', severity: 1 },
  { id: 'fatigue', name: 'Fatigue', category: 'General', severity: 1 },
  { id: 'sore-throat', name: 'Sore Throat', category: 'Throat', severity: 2 },
  { id: 'body-aches', name: 'Body Aches', category: 'General', severity: 2 },
  { id: 'nausea', name: 'Nausea', category: 'Digestive', severity: 2 },
  { id: 'runny-nose', name: 'Runny Nose', category: 'Throat', severity: 1 },
];

const allSymptoms: Symptom[] = [
  // General
  { id: 'fever', name: 'Fever', category: 'General', severity: 2 },
  { id: 'high-fever', name: 'High Fever (>102°F)', category: 'General', severity: 4 },
  { id: 'fatigue', name: 'Fatigue', category: 'General', severity: 1 },
  { id: 'chills', name: 'Chills', category: 'General', severity: 2 },
  { id: 'weight-loss', name: 'Weight Loss', category: 'General', severity: 3 },
  { id: 'loss-appetite', name: 'Loss of Appetite', category: 'General', severity: 2 },
  { id: 'body-aches', name: 'Body Aches', category: 'General', severity: 2 },
  
  // Head & Neuro
  { id: 'headache', name: 'Headache', category: 'Head', severity: 2 },
  { id: 'severe-headache', name: 'Severe Headache', category: 'Head', severity: 4 },
  { id: 'dizziness', name: 'Dizziness', category: 'Head', severity: 2 },
  { id: 'confusion', name: 'Confusion', category: 'Head', severity: 4 },
  { id: 'numbness', name: 'Numbness/Tingling', category: 'Head', severity: 3 },
  
  // Eyes
  { id: 'blurred-vision', name: 'Blurred Vision', category: 'Eyes', severity: 2 },
  { id: 'eye-pain', name: 'Eye Pain', category: 'Eyes', severity: 2 },
  { id: 'red-eyes', name: 'Red Eyes', category: 'Eyes', severity: 1 },
  { id: 'light-sensitivity', name: 'Light Sensitivity', category: 'Eyes', severity: 2 },
  
  // Throat
  { id: 'sore-throat', name: 'Sore Throat', category: 'Throat', severity: 2 },
  { id: 'runny-nose', name: 'Runny Nose', category: 'Throat', severity: 1 },
  { id: 'sneezing', name: 'Sneezing', category: 'Throat', severity: 1 },
  { id: 'ear-pain', name: 'Ear Pain', category: 'Throat', severity: 2 },
  { id: 'loss-taste', name: 'Loss of Taste', category: 'Throat', severity: 2 },
  { id: 'loss-smell', name: 'Loss of Smell', category: 'Throat', severity: 2 },
  { id: 'difficulty-swallowing', name: 'Difficulty Swallowing', category: 'Throat', severity: 3 },
  
  // Respiratory
  { id: 'cough', name: 'Cough (Dry)', category: 'Respiratory', severity: 1 },
  { id: 'wet-cough', name: 'Cough (With Phlegm)', category: 'Respiratory', severity: 2 },
  { id: 'shortness-breath', name: 'Shortness of Breath', category: 'Respiratory', severity: 3 },
  { id: 'wheezing', name: 'Wheezing', category: 'Respiratory', severity: 3 },
  { id: 'chest-tightness', name: 'Chest Tightness', category: 'Respiratory', severity: 3 },
  
  // Heart
  { id: 'chest-pain', name: 'Chest Pain', category: 'Heart', severity: 4 },
  { id: 'chest-pressure', name: 'Chest Pressure', category: 'Heart', severity: 5 },
  { id: 'palpitations', name: 'Heart Palpitations', category: 'Heart', severity: 3 },
  { id: 'rapid-heartbeat', name: 'Rapid Heartbeat', category: 'Heart', severity: 3 },
  
  // Digestive
  { id: 'nausea', name: 'Nausea', category: 'Digestive', severity: 2 },
  { id: 'vomiting', name: 'Vomiting', category: 'Digestive', severity: 2 },
  { id: 'diarrhea', name: 'Diarrhea', category: 'Digestive', severity: 2 },
  { id: 'constipation', name: 'Constipation', category: 'Digestive', severity: 1 },
  { id: 'abdominal-pain', name: 'Abdominal Pain', category: 'Digestive', severity: 2 },
  { id: 'severe-abdominal', name: 'Severe Abdominal Pain', category: 'Digestive', severity: 4 },
  { id: 'bloating', name: 'Bloating', category: 'Digestive', severity: 1 },
  { id: 'heartburn', name: 'Heartburn', category: 'Digestive', severity: 2 },
  
  // Urinary
  { id: 'frequent-urination', name: 'Frequent Urination', category: 'Urinary', severity: 2 },
  { id: 'painful-urination', name: 'Painful Urination', category: 'Urinary', severity: 2 },
  { id: 'blood-urine', name: 'Blood in Urine', category: 'Urinary', severity: 4 },
  
  // Musculoskeletal
  { id: 'muscle-pain', name: 'Muscle Pain', category: 'Muscles', severity: 2 },
  { id: 'joint-pain', name: 'Joint Pain', category: 'Muscles', severity: 2 },
  { id: 'back-pain', name: 'Back Pain', category: 'Muscles', severity: 2 },
  { id: 'neck-pain', name: 'Neck Pain/Stiffness', category: 'Muscles', severity: 2 },
  { id: 'muscle-weakness', name: 'Muscle Weakness', category: 'Muscles', severity: 3 },
  
  // Skin
  { id: 'rash', name: 'Skin Rash', category: 'Skin', severity: 2 },
  { id: 'itching', name: 'Itching', category: 'Skin', severity: 1 },
  { id: 'hives', name: 'Hives', category: 'Skin', severity: 2 },
  { id: 'excessive-sweating', name: 'Excessive Sweating', category: 'Skin', severity: 2 },
  
  // Mental
  { id: 'anxiety', name: 'Anxiety', category: 'Mental', severity: 2 },
  { id: 'depression', name: 'Depression', category: 'Mental', severity: 3 },
  { id: 'insomnia', name: 'Sleep Problems', category: 'Mental', severity: 2 },
];

const conditionRules: ConditionRule[] = [
  // Emergency
  {
    condition: 'Heart Attack',
    description: 'A serious emergency where blood flow to the heart is blocked.',
    requiredSymptoms: ['chest-pressure'],
    optionalSymptoms: ['chest-pain', 'shortness-breath', 'nausea', 'excessive-sweating', 'dizziness'],
    minRequired: 1,
    recommendations: ['🚨 Call emergency services immediately', 'Chew aspirin if not allergic', 'Do NOT drive yourself'],
    urgency: 'emergency',
  },
  {
    condition: 'Stroke',
    description: 'Emergency where blood supply to the brain is interrupted.',
    requiredSymptoms: ['confusion', 'numbness'],
    optionalSymptoms: ['severe-headache', 'blurred-vision', 'muscle-weakness', 'dizziness'],
    minRequired: 2,
    recommendations: ['🚨 Call emergency services immediately', 'Note time symptoms started', 'Remember FAST: Face, Arm, Speech, Time'],
    urgency: 'emergency',
  },
  {
    condition: 'Severe Allergic Reaction',
    description: 'Potentially life-threatening allergic reaction.',
    requiredSymptoms: ['shortness-breath'],
    optionalSymptoms: ['hives', 'rash', 'itching', 'dizziness', 'rapid-heartbeat'],
    minRequired: 1,
    recommendations: ['🚨 Call emergency services immediately', 'Use EpiPen if available', 'Lay flat with legs elevated'],
    urgency: 'emergency',
  },
  // Urgent
  {
    condition: 'Influenza (Flu)',
    description: 'Contagious respiratory illness caused by flu viruses.',
    requiredSymptoms: ['fever', 'body-aches'],
    optionalSymptoms: ['fatigue', 'chills', 'cough', 'sore-throat', 'headache', 'runny-nose'],
    minRequired: 2,
    recommendations: ['Rest at home', 'Drink plenty of fluids', 'Take fever reducers', 'See doctor if worsening'],
    urgency: 'urgent',
  },
  {
    condition: 'COVID-19',
    description: 'Respiratory illness caused by SARS-CoV-2 virus.',
    requiredSymptoms: ['fever', 'cough'],
    optionalSymptoms: ['loss-taste', 'loss-smell', 'fatigue', 'body-aches', 'sore-throat', 'shortness-breath'],
    minRequired: 2,
    recommendations: ['Get tested', 'Isolate from others', 'Monitor breathing', 'Stay hydrated'],
    urgency: 'urgent',
  },
  {
    condition: 'Pneumonia',
    description: 'Infection causing inflammation in lung air sacs.',
    requiredSymptoms: ['wet-cough', 'fever'],
    optionalSymptoms: ['shortness-breath', 'chest-pain', 'chills', 'fatigue'],
    minRequired: 2,
    recommendations: ['See a doctor promptly', 'Rest and stay hydrated', 'Monitor breathing'],
    urgency: 'urgent',
  },
  {
    condition: 'Urinary Tract Infection',
    description: 'Infection in the urinary system.',
    requiredSymptoms: ['painful-urination'],
    optionalSymptoms: ['frequent-urination', 'blood-urine', 'fever', 'abdominal-pain'],
    minRequired: 1,
    recommendations: ['See a doctor for antibiotics', 'Drink plenty of water', 'Avoid caffeine'],
    urgency: 'urgent',
  },
  {
    condition: 'Asthma Attack',
    description: 'Sudden worsening of asthma symptoms.',
    requiredSymptoms: ['wheezing', 'shortness-breath'],
    optionalSymptoms: ['chest-tightness', 'cough', 'anxiety'],
    minRequired: 2,
    recommendations: ['Use rescue inhaler', 'Sit upright and stay calm', 'Seek emergency care if no improvement'],
    urgency: 'urgent',
  },
  {
    condition: 'Migraine',
    description: 'Severe headache often with other symptoms.',
    requiredSymptoms: ['severe-headache'],
    optionalSymptoms: ['nausea', 'light-sensitivity', 'blurred-vision', 'dizziness'],
    minRequired: 1,
    recommendations: ['Rest in a dark, quiet room', 'Take pain medication early', 'Stay hydrated'],
    urgency: 'routine',
  },
  // Routine
  {
    condition: 'Common Cold',
    description: 'Mild viral infection of nose and throat.',
    requiredSymptoms: ['runny-nose'],
    optionalSymptoms: ['sore-throat', 'sneezing', 'cough', 'headache', 'fatigue'],
    minRequired: 1,
    recommendations: ['Rest well', 'Stay hydrated', 'Use saline spray', 'OTC medications for symptoms'],
    urgency: 'self-care',
  },
  {
    condition: 'Allergies',
    description: 'Immune response to environmental triggers.',
    requiredSymptoms: ['sneezing', 'runny-nose'],
    optionalSymptoms: ['itching', 'red-eyes', 'sore-throat'],
    minRequired: 2,
    recommendations: ['Take antihistamines', 'Avoid triggers', 'Use air purifier', 'Consult allergist if persistent'],
    urgency: 'self-care',
  },
  {
    condition: 'Gastritis',
    description: 'Inflammation of stomach lining.',
    requiredSymptoms: ['abdominal-pain', 'nausea'],
    optionalSymptoms: ['bloating', 'vomiting', 'loss-appetite', 'heartburn'],
    minRequired: 2,
    recommendations: ['Eat small meals', 'Avoid spicy/acidic foods', 'Try antacids', 'See doctor if persistent'],
    urgency: 'routine',
  },
  {
    condition: 'Tension Headache',
    description: 'Common headache with mild to moderate pain.',
    requiredSymptoms: ['headache'],
    optionalSymptoms: ['neck-pain', 'fatigue', 'insomnia'],
    minRequired: 1,
    recommendations: ['OTC pain relievers', 'Rest and relax', 'Apply cold/warm compress', 'Manage stress'],
    urgency: 'self-care',
  },
  {
    condition: 'Acid Reflux (GERD)',
    description: 'Stomach acid flows back into the esophagus.',
    requiredSymptoms: ['heartburn'],
    optionalSymptoms: ['chest-pain', 'difficulty-swallowing', 'sore-throat', 'nausea'],
    minRequired: 1,
    recommendations: ['Avoid trigger foods', 'Don\'t lie down after eating', 'Elevate head while sleeping', 'Try antacids'],
    urgency: 'self-care',
  },
  {
    condition: 'Anxiety Disorder',
    description: 'Excessive worry affecting daily life.',
    requiredSymptoms: ['anxiety'],
    optionalSymptoms: ['palpitations', 'insomnia', 'fatigue', 'muscle-pain', 'dizziness'],
    minRequired: 1,
    recommendations: ['Practice deep breathing', 'Regular exercise', 'Limit caffeine', 'Consider therapy'],
    urgency: 'routine',
  },
];

const diagnose = (selectedSymptoms: string[]): DiagnosisResult[] => {
  const results: DiagnosisResult[] = [];

  for (const rule of conditionRules) {
    const matchedRequired = rule.requiredSymptoms.filter(s => selectedSymptoms.includes(s));
    const matchedOptional = rule.optionalSymptoms.filter(s => selectedSymptoms.includes(s));
    const allMatched = [...new Set([...matchedRequired, ...matchedOptional])];

    if (matchedRequired.length < rule.minRequired && matchedRequired.length < rule.requiredSymptoms.length) {
      continue;
    }

    const requiredScore = matchedRequired.length * 3;
    const optionalScore = matchedOptional.length * 1;
    const totalPossible = (rule.requiredSymptoms.length * 3) + (rule.optionalSymptoms.length * 1);
    const score = ((requiredScore + optionalScore) / totalPossible) * 100;

    const severityBonus = allMatched.reduce((acc, symId) => {
      const sym = allSymptoms.find(s => s.id === symId);
      return acc + ((sym?.severity || 1) * 2);
    }, 0);

    const finalScore = Math.min(100, score + severityBonus);

    let probability: 'High' | 'Medium' | 'Low';
    if (finalScore >= 60) probability = 'High';
    else if (finalScore >= 35) probability = 'Medium';
    else probability = 'Low';

    if (allMatched.length >= 2 || (rule.urgency === 'emergency' && allMatched.length >= 1)) {
      results.push({
        condition: rule.condition,
        probability,
        description: rule.description,
        recommendations: rule.recommendations,
        urgency: rule.urgency,
        matchedSymptoms: allMatched,
        score: finalScore,
      });
    }
  }

  return results.sort((a, b) => {
    const urgencyOrder = { emergency: 0, urgent: 1, routine: 2, 'self-care': 3 };
    if (urgencyOrder[a.urgency] !== urgencyOrder[b.urgency]) {
      return urgencyOrder[a.urgency] - urgencyOrder[b.urgency];
    }
    return b.score - a.score;
  });
};

export const SymptomChecker = () => {
  const [selectedSymptoms, setSelectedSymptoms] = useState<string[]>([]);
  const [results, setResults] = useState<DiagnosisResult[] | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [showAllSymptoms, setShowAllSymptoms] = useState(false);

  const filteredSymptoms = allSymptoms.filter(s =>
    s.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const toggleSymptom = (symptomId: string) => {
    setSelectedSymptoms(prev =>
      prev.includes(symptomId)
        ? prev.filter(s => s !== symptomId)
        : [...prev, symptomId]
    );
  };

  const handleAnalyze = () => {
    const diagnosisResults = diagnose(selectedSymptoms);
    setResults(diagnosisResults);
  };

  const reset = () => {
    setSelectedSymptoms([]);
    setResults(null);
    setSearchTerm('');
    setShowAllSymptoms(false);
  };

  const getUrgencyStyles = (urgency: string) => {
    switch (urgency) {
      case 'emergency':
        return 'border-destructive/50 bg-destructive/5';
      case 'urgent':
        return 'border-orange-500/50 bg-orange-500/5';
      case 'routine':
        return 'border-primary/30 bg-primary/5';
      default:
        return 'border-green-500/30 bg-green-500/5';
    }
  };

  const getUrgencyBadge = (urgency: string) => {
    switch (urgency) {
      case 'emergency':
        return <Badge variant="destructive">Emergency</Badge>;
      case 'urgent':
        return <Badge className="bg-orange-500 hover:bg-orange-600">Urgent</Badge>;
      case 'routine':
        return <Badge variant="secondary">Routine</Badge>;
      default:
        return <Badge className="bg-green-500 hover:bg-green-600">Self-Care</Badge>;
    }
  };

  return (
    <section className="py-12 md:py-16">
      <div className="container mx-auto px-4">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-primary/10 mb-4">
            <Stethoscope className="w-7 h-7 text-primary" />
          </div>
          <h1 className="text-2xl md:text-3xl font-heading font-bold text-foreground mb-2">
            Symptom Checker
          </h1>
          <p className="text-muted-foreground text-sm md:text-base max-w-md mx-auto">
            Select your symptoms to get instant health insights
          </p>
        </motion.div>

        <div className="max-w-2xl mx-auto">
          <AnimatePresence mode="wait">
            {!results ? (
              <motion.div
                key="input"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
              >
                <Card className="p-5 md:p-6">
                  {/* Selected Symptoms */}
                  {selectedSymptoms.length > 0 && (
                    <div className="mb-5">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm font-medium text-foreground">
                          Selected ({selectedSymptoms.length})
                        </span>
                        <button
                          onClick={() => setSelectedSymptoms([])}
                          className="text-xs text-muted-foreground hover:text-foreground"
                        >
                          Clear all
                        </button>
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {selectedSymptoms.map(id => {
                          const symptom = allSymptoms.find(s => s.id === id);
                          return (
                            <Badge
                              key={id}
                              variant="default"
                              className="gap-1 cursor-pointer hover:bg-primary/80"
                              onClick={() => toggleSymptom(id)}
                            >
                              {symptom?.name}
                              <X className="w-3 h-3" />
                            </Badge>
                          );
                        })}
                      </div>
                    </div>
                  )}

                  {/* Quick Pick */}
                  {!showAllSymptoms && (
                    <div className="mb-5">
                      <span className="text-sm font-medium text-muted-foreground mb-3 block">
                        Common symptoms
                      </span>
                      <div className="flex flex-wrap gap-2">
                        {commonSymptoms.map(symptom => (
                          <button
                            key={symptom.id}
                            onClick={() => toggleSymptom(symptom.id)}
                            className={cn(
                              "px-3 py-1.5 rounded-full text-sm transition-all border",
                              selectedSymptoms.includes(symptom.id)
                                ? "bg-primary text-primary-foreground border-primary"
                                : "bg-secondary/50 text-secondary-foreground border-transparent hover:border-primary/30"
                            )}
                          >
                            {symptom.name}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Search & All Symptoms */}
                  <div className="mb-5">
                    <div className="relative mb-3">
                      <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                      <Input
                        placeholder="Search symptoms..."
                        value={searchTerm}
                        onChange={(e) => {
                          setSearchTerm(e.target.value);
                          if (e.target.value) setShowAllSymptoms(true);
                        }}
                        onFocus={() => setShowAllSymptoms(true)}
                        className="pl-9"
                      />
                    </div>

                    {showAllSymptoms && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        className="max-h-60 overflow-y-auto rounded-lg border bg-card p-3"
                      >
                        <div className="flex flex-wrap gap-1.5">
                          {filteredSymptoms.map(symptom => (
                            <button
                              key={symptom.id}
                              onClick={() => toggleSymptom(symptom.id)}
                              className={cn(
                                "px-2.5 py-1 rounded-full text-xs transition-all",
                                selectedSymptoms.includes(symptom.id)
                                  ? "bg-primary text-primary-foreground"
                                  : "bg-muted text-muted-foreground hover:bg-muted/80"
                              )}
                            >
                              {symptom.name}
                            </button>
                          ))}
                        </div>
                        {filteredSymptoms.length === 0 && (
                          <p className="text-sm text-muted-foreground text-center py-4">
                            No symptoms found
                          </p>
                        )}
                      </motion.div>
                    )}

                    {!showAllSymptoms && (
                      <button
                        onClick={() => setShowAllSymptoms(true)}
                        className="text-sm text-primary hover:underline"
                      >
                        Show all symptoms →
                      </button>
                    )}
                  </div>

                  {/* Analyze Button */}
                  <Button
                    variant="hero"
                    onClick={handleAnalyze}
                    disabled={selectedSymptoms.length === 0}
                    className="w-full gap-2"
                    size="lg"
                  >
                    <Sparkles className="w-4 h-4" />
                    Analyze Symptoms
                    <ArrowRight className="w-4 h-4" />
                  </Button>

                  <p className="text-xs text-muted-foreground text-center mt-3">
                    Not a substitute for professional medical advice
                  </p>
                </Card>
              </motion.div>
            ) : (
              <motion.div
                key="results"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="space-y-4"
              >
                {/* Results Header */}
                <div className="flex items-center justify-between">
                  <h2 className="font-heading font-semibold text-lg">
                    {results.length > 0 ? `${results.length} Possible Condition${results.length > 1 ? 's' : ''}` : 'No Matches'}
                  </h2>
                  <Button variant="ghost" size="sm" onClick={reset} className="gap-1">
                    <RotateCcw className="w-4 h-4" />
                    Start Over
                  </Button>
                </div>

                {results.length === 0 ? (
                  <Card className="p-6 text-center">
                    <p className="text-muted-foreground">
                      We couldn't match your symptoms. Please consult a healthcare provider.
                    </p>
                  </Card>
                ) : (
                  results.map((result, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                    >
                      <Card className={cn("p-4 md:p-5 border-2", getUrgencyStyles(result.urgency))}>
                        <div className="flex items-start gap-3">
                          <div className={cn(
                            "w-9 h-9 rounded-full flex items-center justify-center flex-shrink-0",
                            result.urgency === 'emergency' && "bg-destructive text-destructive-foreground",
                            result.urgency === 'urgent' && "bg-orange-500 text-white",
                            result.urgency === 'routine' && "bg-primary text-primary-foreground",
                            result.urgency === 'self-care' && "bg-green-500 text-white"
                          )}>
                            {result.urgency === 'emergency' || result.urgency === 'urgent'
                              ? <AlertCircle className="w-4 h-4" />
                              : <CheckCircle className="w-4 h-4" />
                            }
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2 flex-wrap mb-1">
                              <h3 className="font-heading font-semibold">
                                {result.condition}
                              </h3>
                              {getUrgencyBadge(result.urgency)}
                              <Badge variant="outline" className="text-xs">
                                {result.probability} match
                              </Badge>
                            </div>
                            <p className="text-sm text-muted-foreground mb-3">
                              {result.description}
                            </p>
                            
                            <div className="space-y-2">
                              <h4 className="text-xs font-medium text-muted-foreground">Recommendations:</h4>
                              <ul className="space-y-1">
                                {result.recommendations.slice(0, 3).map((rec, i) => (
                                  <li key={i} className="text-sm flex items-start gap-2">
                                    <span className="text-primary mt-0.5">•</span>
                                    {rec}
                                  </li>
                                ))}
                              </ul>
                            </div>
                          </div>
                        </div>
                      </Card>
                    </motion.div>
                  ))
                )}

                {/* Disclaimer */}
                <Card className="p-4 bg-muted/30">
                  <p className="text-xs text-muted-foreground text-center">
                    <strong>Disclaimer:</strong> This is for informational purposes only. Always consult a qualified healthcare professional for diagnosis and treatment.
                  </p>
                </Card>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
};
