import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Stethoscope, ChevronRight, ChevronLeft, AlertCircle, CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { cn } from '@/lib/utils';

interface Symptom {
  id: string;
  name: string;
  category: string;
}

interface DiagnosisResult {
  condition: string;
  probability: 'High' | 'Medium' | 'Low';
  description: string;
  recommendations: string[];
  urgency: 'emergency' | 'urgent' | 'routine' | 'self-care';
}

const symptoms: Symptom[] = [
  // General
  { id: 'fever', name: 'Fever', category: 'General' },
  { id: 'fatigue', name: 'Fatigue', category: 'General' },
  { id: 'chills', name: 'Chills', category: 'General' },
  { id: 'weight-loss', name: 'Unexplained Weight Loss', category: 'General' },
  
  // Head
  { id: 'headache', name: 'Headache', category: 'Head' },
  { id: 'dizziness', name: 'Dizziness', category: 'Head' },
  { id: 'blurred-vision', name: 'Blurred Vision', category: 'Head' },
  
  // Respiratory
  { id: 'cough', name: 'Cough', category: 'Respiratory' },
  { id: 'sore-throat', name: 'Sore Throat', category: 'Respiratory' },
  { id: 'runny-nose', name: 'Runny Nose', category: 'Respiratory' },
  { id: 'shortness-breath', name: 'Shortness of Breath', category: 'Respiratory' },
  { id: 'chest-pain', name: 'Chest Pain', category: 'Respiratory' },
  
  // Digestive
  { id: 'nausea', name: 'Nausea', category: 'Digestive' },
  { id: 'vomiting', name: 'Vomiting', category: 'Digestive' },
  { id: 'diarrhea', name: 'Diarrhea', category: 'Digestive' },
  { id: 'abdominal-pain', name: 'Abdominal Pain', category: 'Digestive' },
  { id: 'loss-appetite', name: 'Loss of Appetite', category: 'Digestive' },
  
  // Musculoskeletal
  { id: 'body-aches', name: 'Body Aches', category: 'Musculoskeletal' },
  { id: 'joint-pain', name: 'Joint Pain', category: 'Musculoskeletal' },
  { id: 'muscle-weakness', name: 'Muscle Weakness', category: 'Musculoskeletal' },
];

const diagnose = (selectedSymptoms: string[]): DiagnosisResult[] => {
  const results: DiagnosisResult[] = [];
  
  // Common Cold
  if (
    (selectedSymptoms.includes('runny-nose') || selectedSymptoms.includes('sore-throat')) &&
    (selectedSymptoms.includes('cough') || selectedSymptoms.includes('fever'))
  ) {
    results.push({
      condition: 'Common Cold',
      probability: selectedSymptoms.length >= 3 ? 'High' : 'Medium',
      description: 'A viral infection of the upper respiratory tract.',
      recommendations: [
        'Rest and stay hydrated',
        'Use over-the-counter cold medicine',
        'Gargle with warm salt water',
        'Use a humidifier',
      ],
      urgency: 'self-care',
    });
  }
  
  // Flu
  if (
    selectedSymptoms.includes('fever') &&
    selectedSymptoms.includes('body-aches') &&
    (selectedSymptoms.includes('fatigue') || selectedSymptoms.includes('chills'))
  ) {
    results.push({
      condition: 'Influenza (Flu)',
      probability: 'High',
      description: 'A contagious respiratory illness caused by influenza viruses.',
      recommendations: [
        'Rest and drink plenty of fluids',
        'Consider antiviral medications (consult doctor within 48 hours)',
        'Take fever reducers as needed',
        'Stay home to avoid spreading',
      ],
      urgency: 'urgent',
    });
  }
  
  // Migraine
  if (
    selectedSymptoms.includes('headache') &&
    (selectedSymptoms.includes('nausea') || selectedSymptoms.includes('blurred-vision'))
  ) {
    results.push({
      condition: 'Migraine',
      probability: 'Medium',
      description: 'A neurological condition causing intense headaches.',
      recommendations: [
        'Rest in a dark, quiet room',
        'Apply cold compress to forehead',
        'Take prescribed migraine medication',
        'Stay hydrated',
      ],
      urgency: 'routine',
    });
  }
  
  // Food Poisoning
  if (
    selectedSymptoms.includes('nausea') &&
    (selectedSymptoms.includes('vomiting') || selectedSymptoms.includes('diarrhea')) &&
    selectedSymptoms.includes('abdominal-pain')
  ) {
    results.push({
      condition: 'Food Poisoning',
      probability: 'High',
      description: 'Illness caused by consuming contaminated food or water.',
      recommendations: [
        'Stay hydrated with clear fluids',
        'Avoid solid foods initially',
        'Rest your stomach',
        'Seek medical help if symptoms persist >24 hours',
      ],
      urgency: 'routine',
    });
  }
  
  // Emergency: Heart-related
  if (
    selectedSymptoms.includes('chest-pain') &&
    (selectedSymptoms.includes('shortness-breath') || selectedSymptoms.includes('dizziness'))
  ) {
    results.push({
      condition: 'Possible Cardiac Event',
      probability: 'High',
      description: 'These symptoms may indicate a serious heart condition.',
      recommendations: [
        '🚨 CALL EMERGENCY SERVICES IMMEDIATELY',
        'Chew an aspirin if available',
        'Stay calm and sit/lie down',
        'Do not drive yourself to hospital',
      ],
      urgency: 'emergency',
    });
  }
  
  if (results.length === 0 && selectedSymptoms.length > 0) {
    results.push({
      condition: 'General Symptoms',
      probability: 'Low',
      description: 'Your symptoms may indicate various conditions.',
      recommendations: [
        'Monitor your symptoms',
        'Rest and stay hydrated',
        'Consult a healthcare provider if symptoms persist',
        'Keep a symptom diary',
      ],
      urgency: 'routine',
    });
  }
  
  return results.sort((a, b) => {
    const urgencyOrder = { emergency: 0, urgent: 1, routine: 2, 'self-care': 3 };
    return urgencyOrder[a.urgency] - urgencyOrder[b.urgency];
  });
};

export const SymptomChecker = () => {
  const [step, setStep] = useState(1);
  const [selectedSymptoms, setSelectedSymptoms] = useState<string[]>([]);
  const [results, setResults] = useState<DiagnosisResult[]>([]);

  const categories = [...new Set(symptoms.map(s => s.category))];

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
    setStep(3);
  };

  const reset = () => {
    setStep(1);
    setSelectedSymptoms([]);
    setResults([]);
  };

  return (
    <section id="symptoms" className="py-16">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl gradient-primary mb-4">
            <Stethoscope className="w-8 h-8 text-primary-foreground" />
          </div>
          <h2 className="text-3xl font-heading font-bold text-foreground mb-2">
            Symptom Checker
          </h2>
          <p className="text-muted-foreground max-w-lg mx-auto">
            Select your symptoms and get preliminary insights. Always consult a healthcare professional for accurate diagnosis.
          </p>
        </motion.div>

        <div className="max-w-3xl mx-auto">
          {/* Progress Steps */}
          <div className="flex items-center justify-center gap-2 mb-8">
            {[1, 2, 3].map((s) => (
              <div key={s} className="flex items-center">
                <div className={cn(
                  "w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium transition-colors",
                  step >= s 
                    ? "bg-primary text-primary-foreground" 
                    : "bg-muted text-muted-foreground"
                )}>
                  {s}
                </div>
                {s < 3 && (
                  <div className={cn(
                    "w-12 h-1 mx-1 rounded-full transition-colors",
                    step > s ? "bg-primary" : "bg-muted"
                  )} />
                )}
              </div>
            ))}
          </div>

          <AnimatePresence mode="wait">
            {step === 1 && (
              <motion.div
                key="step1"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
              >
                <Card className="p-6">
                  <h3 className="text-lg font-heading font-semibold mb-4">
                    How are you feeling?
                  </h3>
                  <p className="text-muted-foreground mb-6">
                    Select all symptoms you're currently experiencing.
                  </p>
                  
                  {categories.map(category => (
                    <div key={category} className="mb-6">
                      <h4 className="text-sm font-medium text-muted-foreground mb-3">
                        {category}
                      </h4>
                      <div className="flex flex-wrap gap-2">
                        {symptoms
                          .filter(s => s.category === category)
                          .map(symptom => (
                            <button
                              key={symptom.id}
                              onClick={() => toggleSymptom(symptom.id)}
                              className={cn(
                                "px-4 py-2 rounded-full text-sm font-medium transition-all",
                                selectedSymptoms.includes(symptom.id)
                                  ? "bg-primary text-primary-foreground shadow-md"
                                  : "bg-secondary text-secondary-foreground hover:bg-secondary/80"
                              )}
                            >
                              {symptom.name}
                            </button>
                          ))}
                      </div>
                    </div>
                  ))}

                  <div className="flex justify-end mt-6">
                    <Button
                      variant="hero"
                      onClick={() => setStep(2)}
                      disabled={selectedSymptoms.length === 0}
                      className="gap-2"
                    >
                      Continue <ChevronRight className="w-4 h-4" />
                    </Button>
                  </div>
                </Card>
              </motion.div>
            )}

            {step === 2 && (
              <motion.div
                key="step2"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
              >
                <Card className="p-6">
                  <h3 className="text-lg font-heading font-semibold mb-4">
                    Review Your Symptoms
                  </h3>
                  <p className="text-muted-foreground mb-6">
                    You've selected {selectedSymptoms.length} symptom(s):
                  </p>
                  
                  <div className="flex flex-wrap gap-2 mb-6">
                    {selectedSymptoms.map(id => {
                      const symptom = symptoms.find(s => s.id === id);
                      return (
                        <span
                          key={id}
                          className="px-3 py-1 bg-primary/10 text-primary rounded-full text-sm"
                        >
                          {symptom?.name}
                        </span>
                      );
                    })}
                  </div>

                  <div className="bg-muted/50 p-4 rounded-lg mb-6">
                    <p className="text-sm text-muted-foreground">
                      <strong>Disclaimer:</strong> This symptom checker is for informational purposes only and does not constitute medical advice. Always consult a qualified healthcare professional for diagnosis and treatment.
                    </p>
                  </div>

                  <div className="flex justify-between">
                    <Button variant="outline" onClick={() => setStep(1)} className="gap-2">
                      <ChevronLeft className="w-4 h-4" /> Back
                    </Button>
                    <Button variant="hero" onClick={handleAnalyze} className="gap-2">
                      Analyze Symptoms
                    </Button>
                  </div>
                </Card>
              </motion.div>
            )}

            {step === 3 && (
              <motion.div
                key="step3"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-4"
              >
                {results.map((result, index) => (
                  <Card
                    key={index}
                    className={cn(
                      "p-6 border-2",
                      result.urgency === 'emergency' && "border-destructive bg-destructive/5",
                      result.urgency === 'urgent' && "border-warning bg-warning/5",
                      result.urgency === 'routine' && "border-primary/20",
                      result.urgency === 'self-care' && "border-success/20 bg-success/5"
                    )}
                  >
                    <div className="flex items-start gap-4">
                      <div className={cn(
                        "w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0",
                        result.urgency === 'emergency' && "bg-destructive text-destructive-foreground",
                        result.urgency === 'urgent' && "bg-warning text-warning-foreground",
                        result.urgency === 'routine' && "bg-primary text-primary-foreground",
                        result.urgency === 'self-care' && "bg-success text-success-foreground"
                      )}>
                        {result.urgency === 'emergency' || result.urgency === 'urgent' 
                          ? <AlertCircle className="w-5 h-5" />
                          : <CheckCircle className="w-5 h-5" />
                        }
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <h3 className="font-heading font-semibold text-lg">
                            {result.condition}
                          </h3>
                          <span className={cn(
                            "px-2 py-0.5 rounded-full text-xs font-medium",
                            result.probability === 'High' && "bg-primary/10 text-primary",
                            result.probability === 'Medium' && "bg-warning/10 text-warning",
                            result.probability === 'Low' && "bg-muted text-muted-foreground"
                          )}>
                            {result.probability} probability
                          </span>
                        </div>
                        <p className="text-muted-foreground text-sm mb-4">
                          {result.description}
                        </p>
                        <h4 className="text-sm font-medium mb-2">Recommendations:</h4>
                        <ul className="space-y-1">
                          {result.recommendations.map((rec, i) => (
                            <li key={i} className="text-sm text-muted-foreground flex items-start gap-2">
                              <span className="text-primary">•</span>
                              {rec}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </Card>
                ))}

                <Button variant="outline" onClick={reset} className="w-full">
                  Start Over
                </Button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
};
