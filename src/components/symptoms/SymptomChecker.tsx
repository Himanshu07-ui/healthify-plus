import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Stethoscope, ChevronRight, ChevronLeft, AlertCircle, CheckCircle, Clock, Thermometer } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';

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
  ageRelevance?: { min?: number; max?: number };
  durationRelevance?: string[];
}

const symptoms: Symptom[] = [
  // General/Systemic
  { id: 'fever', name: 'Fever', category: 'General', severity: 2 },
  { id: 'high-fever', name: 'High Fever (>102°F/39°C)', category: 'General', severity: 4 },
  { id: 'fatigue', name: 'Fatigue/Tiredness', category: 'General', severity: 1 },
  { id: 'severe-fatigue', name: 'Severe Fatigue/Exhaustion', category: 'General', severity: 3 },
  { id: 'chills', name: 'Chills/Shivering', category: 'General', severity: 2 },
  { id: 'night-sweats', name: 'Night Sweats', category: 'General', severity: 2 },
  { id: 'weight-loss', name: 'Unexplained Weight Loss', category: 'General', severity: 3 },
  { id: 'weight-gain', name: 'Unexplained Weight Gain', category: 'General', severity: 2 },
  { id: 'loss-appetite', name: 'Loss of Appetite', category: 'General', severity: 2 },
  { id: 'increased-appetite', name: 'Increased Appetite', category: 'General', severity: 1 },
  { id: 'dehydration', name: 'Signs of Dehydration', category: 'General', severity: 3 },
  { id: 'swollen-lymph', name: 'Swollen Lymph Nodes', category: 'General', severity: 2 },

  // Head & Neurological
  { id: 'headache', name: 'Headache', category: 'Head & Neurological', severity: 2 },
  { id: 'severe-headache', name: 'Severe/Sudden Headache', category: 'Head & Neurological', severity: 4 },
  { id: 'migraine', name: 'Throbbing/Pulsing Headache', category: 'Head & Neurological', severity: 3 },
  { id: 'dizziness', name: 'Dizziness/Lightheadedness', category: 'Head & Neurological', severity: 2 },
  { id: 'vertigo', name: 'Vertigo (Spinning Sensation)', category: 'Head & Neurological', severity: 3 },
  { id: 'fainting', name: 'Fainting/Near Fainting', category: 'Head & Neurological', severity: 4 },
  { id: 'confusion', name: 'Confusion/Disorientation', category: 'Head & Neurological', severity: 4 },
  { id: 'memory-issues', name: 'Memory Problems', category: 'Head & Neurological', severity: 2 },
  { id: 'concentration', name: 'Difficulty Concentrating', category: 'Head & Neurological', severity: 1 },
  { id: 'numbness', name: 'Numbness/Tingling', category: 'Head & Neurological', severity: 3 },
  { id: 'tremors', name: 'Tremors/Shaking', category: 'Head & Neurological', severity: 3 },
  { id: 'seizure', name: 'Seizure/Convulsions', category: 'Head & Neurological', severity: 5 },

  // Eyes
  { id: 'blurred-vision', name: 'Blurred Vision', category: 'Eyes', severity: 2 },
  { id: 'double-vision', name: 'Double Vision', category: 'Eyes', severity: 3 },
  { id: 'eye-pain', name: 'Eye Pain', category: 'Eyes', severity: 2 },
  { id: 'red-eyes', name: 'Red/Irritated Eyes', category: 'Eyes', severity: 1 },
  { id: 'watery-eyes', name: 'Watery/Itchy Eyes', category: 'Eyes', severity: 1 },
  { id: 'light-sensitivity', name: 'Light Sensitivity', category: 'Eyes', severity: 2 },
  { id: 'vision-loss', name: 'Sudden Vision Loss', category: 'Eyes', severity: 5 },

  // Ears, Nose, Throat
  { id: 'ear-pain', name: 'Ear Pain', category: 'Ear, Nose, Throat', severity: 2 },
  { id: 'hearing-loss', name: 'Hearing Loss', category: 'Ear, Nose, Throat', severity: 3 },
  { id: 'ringing-ears', name: 'Ringing in Ears (Tinnitus)', category: 'Ear, Nose, Throat', severity: 2 },
  { id: 'runny-nose', name: 'Runny/Stuffy Nose', category: 'Ear, Nose, Throat', severity: 1 },
  { id: 'sneezing', name: 'Sneezing', category: 'Ear, Nose, Throat', severity: 1 },
  { id: 'sinus-pressure', name: 'Sinus Pressure/Pain', category: 'Ear, Nose, Throat', severity: 2 },
  { id: 'post-nasal', name: 'Post-Nasal Drip', category: 'Ear, Nose, Throat', severity: 1 },
  { id: 'sore-throat', name: 'Sore Throat', category: 'Ear, Nose, Throat', severity: 2 },
  { id: 'difficulty-swallowing', name: 'Difficulty Swallowing', category: 'Ear, Nose, Throat', severity: 3 },
  { id: 'hoarse-voice', name: 'Hoarse Voice', category: 'Ear, Nose, Throat', severity: 1 },
  { id: 'loss-taste', name: 'Loss of Taste', category: 'Ear, Nose, Throat', severity: 2 },
  { id: 'loss-smell', name: 'Loss of Smell', category: 'Ear, Nose, Throat', severity: 2 },

  // Respiratory
  { id: 'cough', name: 'Cough (Dry)', category: 'Respiratory', severity: 1 },
  { id: 'wet-cough', name: 'Cough (With Phlegm)', category: 'Respiratory', severity: 2 },
  { id: 'persistent-cough', name: 'Persistent Cough (>2 weeks)', category: 'Respiratory', severity: 3 },
  { id: 'blood-cough', name: 'Coughing Blood', category: 'Respiratory', severity: 5 },
  { id: 'shortness-breath', name: 'Shortness of Breath', category: 'Respiratory', severity: 3 },
  { id: 'severe-breathing', name: 'Severe Difficulty Breathing', category: 'Respiratory', severity: 5 },
  { id: 'wheezing', name: 'Wheezing', category: 'Respiratory', severity: 3 },
  { id: 'chest-tightness', name: 'Chest Tightness', category: 'Respiratory', severity: 3 },
  { id: 'rapid-breathing', name: 'Rapid Breathing', category: 'Respiratory', severity: 3 },

  // Cardiovascular
  { id: 'chest-pain', name: 'Chest Pain', category: 'Cardiovascular', severity: 4 },
  { id: 'chest-pressure', name: 'Chest Pressure/Squeezing', category: 'Cardiovascular', severity: 5 },
  { id: 'palpitations', name: 'Heart Palpitations', category: 'Cardiovascular', severity: 3 },
  { id: 'rapid-heartbeat', name: 'Rapid Heartbeat', category: 'Cardiovascular', severity: 3 },
  { id: 'slow-heartbeat', name: 'Slow Heartbeat', category: 'Cardiovascular', severity: 3 },
  { id: 'irregular-heartbeat', name: 'Irregular Heartbeat', category: 'Cardiovascular', severity: 3 },
  { id: 'leg-swelling', name: 'Leg/Ankle Swelling', category: 'Cardiovascular', severity: 2 },
  { id: 'cold-extremities', name: 'Cold Hands/Feet', category: 'Cardiovascular', severity: 1 },

  // Digestive
  { id: 'nausea', name: 'Nausea', category: 'Digestive', severity: 2 },
  { id: 'vomiting', name: 'Vomiting', category: 'Digestive', severity: 2 },
  { id: 'blood-vomit', name: 'Vomiting Blood', category: 'Digestive', severity: 5 },
  { id: 'diarrhea', name: 'Diarrhea', category: 'Digestive', severity: 2 },
  { id: 'bloody-stool', name: 'Blood in Stool', category: 'Digestive', severity: 4 },
  { id: 'black-stool', name: 'Black/Tarry Stool', category: 'Digestive', severity: 4 },
  { id: 'constipation', name: 'Constipation', category: 'Digestive', severity: 1 },
  { id: 'abdominal-pain', name: 'Abdominal Pain', category: 'Digestive', severity: 2 },
  { id: 'severe-abdominal', name: 'Severe Abdominal Pain', category: 'Digestive', severity: 4 },
  { id: 'bloating', name: 'Bloating/Gas', category: 'Digestive', severity: 1 },
  { id: 'heartburn', name: 'Heartburn/Acid Reflux', category: 'Digestive', severity: 2 },
  { id: 'indigestion', name: 'Indigestion', category: 'Digestive', severity: 1 },
  { id: 'jaundice', name: 'Yellowing of Skin/Eyes', category: 'Digestive', severity: 4 },

  // Urinary
  { id: 'frequent-urination', name: 'Frequent Urination', category: 'Urinary', severity: 2 },
  { id: 'painful-urination', name: 'Painful/Burning Urination', category: 'Urinary', severity: 2 },
  { id: 'blood-urine', name: 'Blood in Urine', category: 'Urinary', severity: 4 },
  { id: 'dark-urine', name: 'Dark Urine', category: 'Urinary', severity: 2 },
  { id: 'urinary-urgency', name: 'Urgent Need to Urinate', category: 'Urinary', severity: 2 },
  { id: 'incontinence', name: 'Urinary Incontinence', category: 'Urinary', severity: 2 },

  // Musculoskeletal
  { id: 'body-aches', name: 'Body Aches', category: 'Musculoskeletal', severity: 2 },
  { id: 'muscle-pain', name: 'Muscle Pain', category: 'Musculoskeletal', severity: 2 },
  { id: 'severe-muscle-pain', name: 'Severe Muscle Pain', category: 'Musculoskeletal', severity: 3 },
  { id: 'joint-pain', name: 'Joint Pain', category: 'Musculoskeletal', severity: 2 },
  { id: 'joint-swelling', name: 'Joint Swelling', category: 'Musculoskeletal', severity: 3 },
  { id: 'joint-stiffness', name: 'Joint Stiffness', category: 'Musculoskeletal', severity: 2 },
  { id: 'back-pain', name: 'Back Pain', category: 'Musculoskeletal', severity: 2 },
  { id: 'severe-back-pain', name: 'Severe Back Pain', category: 'Musculoskeletal', severity: 3 },
  { id: 'neck-pain', name: 'Neck Pain/Stiffness', category: 'Musculoskeletal', severity: 2 },
  { id: 'muscle-weakness', name: 'Muscle Weakness', category: 'Musculoskeletal', severity: 3 },
  { id: 'muscle-cramps', name: 'Muscle Cramps', category: 'Musculoskeletal', severity: 1 },

  // Skin
  { id: 'rash', name: 'Skin Rash', category: 'Skin', severity: 2 },
  { id: 'itching', name: 'Itching', category: 'Skin', severity: 1 },
  { id: 'hives', name: 'Hives', category: 'Skin', severity: 2 },
  { id: 'bruising', name: 'Easy Bruising', category: 'Skin', severity: 2 },
  { id: 'pale-skin', name: 'Pale Skin', category: 'Skin', severity: 2 },
  { id: 'dry-skin', name: 'Dry Skin', category: 'Skin', severity: 1 },
  { id: 'excessive-sweating', name: 'Excessive Sweating', category: 'Skin', severity: 2 },
  { id: 'skin-discoloration', name: 'Skin Discoloration', category: 'Skin', severity: 2 },

  // Mental/Emotional
  { id: 'anxiety', name: 'Anxiety/Nervousness', category: 'Mental/Emotional', severity: 2 },
  { id: 'depression', name: 'Depression/Low Mood', category: 'Mental/Emotional', severity: 3 },
  { id: 'irritability', name: 'Irritability', category: 'Mental/Emotional', severity: 1 },
  { id: 'mood-swings', name: 'Mood Swings', category: 'Mental/Emotional', severity: 2 },
  { id: 'insomnia', name: 'Insomnia/Sleep Problems', category: 'Mental/Emotional', severity: 2 },
  { id: 'excessive-sleep', name: 'Excessive Sleepiness', category: 'Mental/Emotional', severity: 2 },

  // Metabolic/Endocrine
  { id: 'excessive-thirst', name: 'Excessive Thirst', category: 'Metabolic', severity: 2 },
  { id: 'heat-intolerance', name: 'Heat Intolerance', category: 'Metabolic', severity: 2 },
  { id: 'cold-intolerance', name: 'Cold Intolerance', category: 'Metabolic', severity: 2 },
  { id: 'hair-loss', name: 'Hair Loss', category: 'Metabolic', severity: 2 },
  { id: 'brittle-nails', name: 'Brittle Nails', category: 'Metabolic', severity: 1 },
];

const conditionRules: ConditionRule[] = [
  // EMERGENCY CONDITIONS
  {
    condition: 'Heart Attack',
    description: 'A serious medical emergency where blood flow to the heart is blocked.',
    requiredSymptoms: ['chest-pressure'],
    optionalSymptoms: ['chest-pain', 'shortness-breath', 'cold-extremities', 'excessive-sweating', 'nausea', 'dizziness', 'pain-arm', 'jaw-pain', 'fatigue'],
    minRequired: 1,
    recommendations: [
      '🚨 CALL EMERGENCY SERVICES (911/112) IMMEDIATELY',
      'Chew an aspirin (325mg) if not allergic',
      'Sit or lie down in a comfortable position',
      'Loosen any tight clothing',
      'Do NOT drive yourself to the hospital',
    ],
    urgency: 'emergency',
  },
  {
    condition: 'Stroke',
    description: 'A medical emergency where blood supply to part of the brain is interrupted.',
    requiredSymptoms: ['confusion', 'numbness'],
    optionalSymptoms: ['severe-headache', 'blurred-vision', 'difficulty-swallowing', 'dizziness', 'muscle-weakness', 'vision-loss'],
    minRequired: 2,
    recommendations: [
      '🚨 CALL EMERGENCY SERVICES IMMEDIATELY',
      'Note the time symptoms started',
      'Do not give food or water',
      'Lay person flat with head slightly elevated',
      'Remember FAST: Face drooping, Arm weakness, Speech difficulty, Time to call',
    ],
    urgency: 'emergency',
  },
  {
    condition: 'Severe Allergic Reaction (Anaphylaxis)',
    description: 'A severe, potentially life-threatening allergic reaction.',
    requiredSymptoms: ['severe-breathing'],
    optionalSymptoms: ['hives', 'rash', 'itching', 'dizziness', 'nausea', 'vomiting', 'rapid-heartbeat', 'fainting'],
    minRequired: 1,
    recommendations: [
      '🚨 CALL EMERGENCY SERVICES IMMEDIATELY',
      'Use epinephrine auto-injector (EpiPen) if available',
      'Lay person flat with legs elevated',
      'Loosen tight clothing',
      'Be prepared to perform CPR if needed',
    ],
    urgency: 'emergency',
  },
  {
    condition: 'Meningitis',
    description: 'A serious infection causing inflammation of the membranes surrounding the brain.',
    requiredSymptoms: ['high-fever', 'severe-headache', 'neck-pain'],
    optionalSymptoms: ['confusion', 'light-sensitivity', 'nausea', 'vomiting', 'rash'],
    minRequired: 3,
    recommendations: [
      '🚨 SEEK EMERGENCY MEDICAL CARE IMMEDIATELY',
      'Do not delay - meningitis can progress rapidly',
      'Avoid bright lights',
      'Keep hydrated if possible',
    ],
    urgency: 'emergency',
  },
  {
    condition: 'Appendicitis',
    description: 'Inflammation of the appendix requiring immediate medical attention.',
    requiredSymptoms: ['severe-abdominal', 'nausea'],
    optionalSymptoms: ['fever', 'vomiting', 'loss-appetite', 'abdominal-pain'],
    minRequired: 2,
    recommendations: [
      '🚨 SEEK EMERGENCY MEDICAL CARE',
      'Do not eat or drink anything',
      'Do not take pain medications until diagnosed',
      'Avoid applying heat to the abdomen',
    ],
    urgency: 'emergency',
  },

  // URGENT CONDITIONS
  {
    condition: 'Influenza (Flu)',
    description: 'A contagious respiratory illness caused by influenza viruses.',
    requiredSymptoms: ['fever', 'body-aches'],
    optionalSymptoms: ['fatigue', 'severe-fatigue', 'chills', 'cough', 'sore-throat', 'headache', 'runny-nose', 'muscle-pain'],
    minRequired: 2,
    recommendations: [
      'Rest and stay home to prevent spreading',
      'Drink plenty of fluids',
      'Take fever reducers (acetaminophen/ibuprofen)',
      'Consider antiviral medication if within 48 hours (consult doctor)',
      'Seek medical care if symptoms worsen',
    ],
    urgency: 'urgent',
  },
  {
    condition: 'COVID-19',
    description: 'A respiratory illness caused by the SARS-CoV-2 virus.',
    requiredSymptoms: ['fever', 'cough'],
    optionalSymptoms: ['loss-taste', 'loss-smell', 'fatigue', 'body-aches', 'sore-throat', 'shortness-breath', 'headache', 'diarrhea'],
    minRequired: 2,
    recommendations: [
      'Get tested for COVID-19',
      'Isolate from others',
      'Monitor oxygen levels if possible',
      'Stay hydrated and rest',
      'Seek emergency care if breathing becomes difficult',
    ],
    urgency: 'urgent',
  },
  {
    condition: 'Pneumonia',
    description: 'An infection that inflames the air sacs in one or both lungs.',
    requiredSymptoms: ['wet-cough', 'fever'],
    optionalSymptoms: ['shortness-breath', 'chest-pain', 'chills', 'fatigue', 'high-fever', 'rapid-breathing'],
    minRequired: 2,
    recommendations: [
      'Seek medical evaluation promptly',
      'Complete prescribed antibiotics if bacterial',
      'Rest and stay hydrated',
      'Use a humidifier',
      'Monitor for worsening breathing',
    ],
    urgency: 'urgent',
  },
  {
    condition: 'Urinary Tract Infection (UTI)',
    description: 'An infection in any part of the urinary system.',
    requiredSymptoms: ['painful-urination'],
    optionalSymptoms: ['frequent-urination', 'urinary-urgency', 'blood-urine', 'fever', 'abdominal-pain', 'back-pain'],
    minRequired: 1,
    recommendations: [
      'See a doctor for antibiotics',
      'Drink plenty of water',
      'Urinate frequently',
      'Avoid caffeine and alcohol',
      'Seek immediate care if fever develops',
    ],
    urgency: 'urgent',
  },
  {
    condition: 'Kidney Infection',
    description: 'A serious infection requiring prompt medical treatment.',
    requiredSymptoms: ['fever', 'severe-back-pain', 'painful-urination'],
    optionalSymptoms: ['nausea', 'vomiting', 'blood-urine', 'frequent-urination', 'chills'],
    minRequired: 3,
    recommendations: [
      'Seek medical care immediately',
      'Antibiotics are typically required',
      'Stay well hydrated',
      'Take prescribed pain medication',
    ],
    urgency: 'urgent',
  },
  {
    condition: 'Asthma Attack',
    description: 'A sudden worsening of asthma symptoms caused by airway tightening.',
    requiredSymptoms: ['wheezing', 'shortness-breath'],
    optionalSymptoms: ['chest-tightness', 'cough', 'rapid-breathing', 'anxiety'],
    minRequired: 2,
    recommendations: [
      'Use rescue inhaler immediately',
      'Sit upright and stay calm',
      'Remove yourself from triggers',
      'Seek emergency care if no improvement after inhaler',
    ],
    urgency: 'urgent',
  },
  {
    condition: 'Hyperthyroidism',
    description: 'A condition where the thyroid gland produces too much hormone.',
    requiredSymptoms: ['weight-loss', 'rapid-heartbeat'],
    optionalSymptoms: ['increased-appetite', 'anxiety', 'tremors', 'heat-intolerance', 'excessive-sweating', 'insomnia', 'irregular-heartbeat', 'fatigue', 'muscle-weakness'],
    minRequired: 2,
    recommendations: [
      'Schedule appointment with endocrinologist',
      'Get thyroid function tests (TSH, T3, T4)',
      'Avoid caffeine and stimulants',
      'Monitor heart rate regularly',
    ],
    urgency: 'urgent',
  },
  {
    condition: 'Hypothyroidism',
    description: 'A condition where the thyroid gland does not produce enough hormone.',
    requiredSymptoms: ['fatigue', 'weight-gain'],
    optionalSymptoms: ['cold-intolerance', 'dry-skin', 'hair-loss', 'constipation', 'depression', 'muscle-weakness', 'joint-pain', 'slow-heartbeat', 'memory-issues'],
    minRequired: 2,
    recommendations: [
      'See a doctor for thyroid function tests',
      'Thyroid hormone replacement may be needed',
      'Maintain regular sleep schedule',
      'Exercise regularly',
    ],
    urgency: 'urgent',
  },

  // ROUTINE CONDITIONS
  {
    condition: 'Common Cold',
    description: 'A viral infection of the upper respiratory tract.',
    requiredSymptoms: ['runny-nose'],
    optionalSymptoms: ['sneezing', 'sore-throat', 'cough', 'headache', 'fatigue', 'post-nasal'],
    minRequired: 1,
    recommendations: [
      'Rest and stay hydrated',
      'Use over-the-counter cold medicine',
      'Gargle with warm salt water',
      'Use a humidifier',
      'Symptoms usually resolve in 7-10 days',
    ],
    urgency: 'self-care',
  },
  {
    condition: 'Sinusitis',
    description: 'Inflammation or swelling of the tissue lining the sinuses.',
    requiredSymptoms: ['sinus-pressure'],
    optionalSymptoms: ['runny-nose', 'post-nasal', 'headache', 'fever', 'cough', 'fatigue', 'loss-smell'],
    minRequired: 1,
    recommendations: [
      'Use saline nasal spray',
      'Apply warm compress to face',
      'Stay hydrated',
      'Use decongestants as needed',
      'See doctor if symptoms persist >10 days',
    ],
    urgency: 'routine',
  },
  {
    condition: 'Migraine',
    description: 'A neurological condition causing intense, debilitating headaches.',
    requiredSymptoms: ['migraine'],
    optionalSymptoms: ['nausea', 'vomiting', 'light-sensitivity', 'blurred-vision', 'dizziness'],
    minRequired: 1,
    recommendations: [
      'Rest in a dark, quiet room',
      'Apply cold compress to forehead',
      'Take prescribed migraine medication',
      'Stay hydrated',
      'Identify and avoid triggers',
    ],
    urgency: 'routine',
  },
  {
    condition: 'Tension Headache',
    description: 'The most common type of headache, often caused by stress.',
    requiredSymptoms: ['headache'],
    optionalSymptoms: ['neck-pain', 'fatigue', 'concentration', 'irritability'],
    minRequired: 1,
    recommendations: [
      'Take over-the-counter pain relievers',
      'Apply heat or ice to neck/shoulders',
      'Practice relaxation techniques',
      'Get adequate sleep',
      'Reduce screen time',
    ],
    urgency: 'self-care',
  },
  {
    condition: 'Gastroenteritis (Stomach Flu)',
    description: 'An intestinal infection marked by diarrhea, cramps, nausea, and vomiting.',
    requiredSymptoms: ['diarrhea', 'vomiting'],
    optionalSymptoms: ['nausea', 'abdominal-pain', 'fever', 'chills', 'body-aches', 'loss-appetite'],
    minRequired: 2,
    recommendations: [
      'Stay hydrated with clear fluids',
      'Try BRAT diet (bananas, rice, applesauce, toast)',
      'Rest your stomach before eating',
      'Avoid dairy, caffeine, and fatty foods',
      'Seek care if symptoms persist >48 hours',
    ],
    urgency: 'routine',
  },
  {
    condition: 'Food Poisoning',
    description: 'Illness caused by consuming contaminated food or water.',
    requiredSymptoms: ['nausea', 'vomiting', 'abdominal-pain'],
    optionalSymptoms: ['diarrhea', 'fever', 'chills', 'loss-appetite'],
    minRequired: 3,
    recommendations: [
      'Stay hydrated with clear fluids',
      'Avoid solid foods initially',
      'Rest your stomach',
      'Seek medical help if symptoms persist >24 hours',
      'Watch for signs of dehydration',
    ],
    urgency: 'routine',
  },
  {
    condition: 'GERD/Acid Reflux',
    description: 'A digestive disorder where stomach acid frequently flows back into the esophagus.',
    requiredSymptoms: ['heartburn'],
    optionalSymptoms: ['nausea', 'difficulty-swallowing', 'cough', 'chest-pain', 'hoarse-voice'],
    minRequired: 1,
    recommendations: [
      'Avoid trigger foods (spicy, fatty, acidic)',
      'Eat smaller meals',
      'Do not lie down after eating',
      'Elevate head while sleeping',
      'Consider antacid medications',
    ],
    urgency: 'self-care',
  },
  {
    condition: 'Irritable Bowel Syndrome (IBS)',
    description: 'A common disorder affecting the large intestine.',
    requiredSymptoms: ['abdominal-pain', 'bloating'],
    optionalSymptoms: ['diarrhea', 'constipation', 'nausea', 'loss-appetite'],
    minRequired: 2,
    recommendations: [
      'Identify and avoid trigger foods',
      'Eat regular, balanced meals',
      'Exercise regularly',
      'Manage stress',
      'Consider probiotics',
    ],
    urgency: 'routine',
  },
  {
    condition: 'Type 2 Diabetes Symptoms',
    description: 'Signs that may indicate elevated blood sugar levels.',
    requiredSymptoms: ['excessive-thirst', 'frequent-urination'],
    optionalSymptoms: ['fatigue', 'blurred-vision', 'weight-loss', 'increased-appetite', 'slow-healing'],
    minRequired: 2,
    recommendations: [
      'Get blood glucose testing done',
      'Schedule appointment with doctor',
      'Monitor diet and carbohydrate intake',
      'Exercise regularly',
      'Maintain healthy weight',
    ],
    urgency: 'urgent',
  },
  {
    condition: 'Hypertension (High Blood Pressure)',
    description: 'A condition where blood pressure is consistently elevated.',
    requiredSymptoms: ['headache', 'dizziness'],
    optionalSymptoms: ['blurred-vision', 'shortness-breath', 'chest-pain', 'nausea', 'fatigue'],
    minRequired: 2,
    recommendations: [
      'Get blood pressure checked regularly',
      'Reduce sodium intake',
      'Exercise regularly',
      'Maintain healthy weight',
      'Limit alcohol and quit smoking',
    ],
    urgency: 'urgent',
  },
  {
    condition: 'Arthritis',
    description: 'Inflammation of one or more joints, causing pain and stiffness.',
    requiredSymptoms: ['joint-pain', 'joint-stiffness'],
    optionalSymptoms: ['joint-swelling', 'muscle-weakness', 'fatigue', 'rash'],
    minRequired: 2,
    recommendations: [
      'Consult a rheumatologist',
      'Apply hot or cold therapy',
      'Do gentle range-of-motion exercises',
      'Consider anti-inflammatory medications',
      'Maintain healthy weight',
    ],
    urgency: 'routine',
  },
  {
    condition: 'Fibromyalgia',
    description: 'A disorder characterized by widespread musculoskeletal pain.',
    requiredSymptoms: ['body-aches', 'fatigue'],
    optionalSymptoms: ['insomnia', 'memory-issues', 'headache', 'depression', 'anxiety', 'muscle-pain'],
    minRequired: 2,
    recommendations: [
      'See a doctor for proper diagnosis',
      'Exercise regularly (low-impact)',
      'Practice good sleep hygiene',
      'Manage stress',
      'Consider physical therapy',
    ],
    urgency: 'routine',
  },
  {
    condition: 'Anemia',
    description: 'A condition where you lack enough healthy red blood cells.',
    requiredSymptoms: ['fatigue', 'pale-skin'],
    optionalSymptoms: ['dizziness', 'shortness-breath', 'cold-extremities', 'headache', 'brittle-nails', 'palpitations'],
    minRequired: 2,
    recommendations: [
      'Get blood tests to confirm',
      'Increase iron-rich foods',
      'Consider iron supplements',
      'Address underlying causes',
      'Follow up with doctor',
    ],
    urgency: 'routine',
  },
  {
    condition: 'Allergic Rhinitis (Hay Fever)',
    description: 'An allergic response causing cold-like symptoms.',
    requiredSymptoms: ['sneezing', 'runny-nose'],
    optionalSymptoms: ['watery-eyes', 'itching', 'sinus-pressure', 'fatigue', 'post-nasal'],
    minRequired: 2,
    recommendations: [
      'Avoid known allergens',
      'Use antihistamines',
      'Try nasal corticosteroid sprays',
      'Keep windows closed during high pollen',
      'Consider allergy testing',
    ],
    urgency: 'self-care',
  },
  {
    condition: 'Ear Infection (Otitis Media)',
    description: 'An infection of the middle ear.',
    requiredSymptoms: ['ear-pain', 'fever'],
    optionalSymptoms: ['hearing-loss', 'headache', 'loss-appetite', 'irritability'],
    minRequired: 2,
    recommendations: [
      'See a doctor for evaluation',
      'Apply warm compress to ear',
      'Take pain relievers as directed',
      'Antibiotics may be prescribed',
    ],
    urgency: 'routine',
  },
  {
    condition: 'Strep Throat',
    description: 'A bacterial infection causing a sore, scratchy throat.',
    requiredSymptoms: ['sore-throat', 'fever'],
    optionalSymptoms: ['difficulty-swallowing', 'swollen-lymph', 'headache', 'loss-appetite', 'rash'],
    minRequired: 2,
    recommendations: [
      'See a doctor for strep test',
      'Complete full course of antibiotics if prescribed',
      'Rest and stay hydrated',
      'Gargle with warm salt water',
    ],
    urgency: 'urgent',
  },
  {
    condition: 'Bronchitis',
    description: 'Inflammation of the bronchial tubes.',
    requiredSymptoms: ['wet-cough'],
    optionalSymptoms: ['fatigue', 'shortness-breath', 'chest-tightness', 'fever', 'chills', 'body-aches'],
    minRequired: 1,
    recommendations: [
      'Rest and drink plenty of fluids',
      'Use a humidifier',
      'Avoid irritants like smoke',
      'Consider cough suppressants at night',
      'See doctor if symptoms persist >3 weeks',
    ],
    urgency: 'routine',
  },
  {
    condition: 'Vertigo (BPPV)',
    description: 'A disorder that causes sudden spinning sensations.',
    requiredSymptoms: ['vertigo'],
    optionalSymptoms: ['nausea', 'vomiting', 'dizziness', 'ringing-ears'],
    minRequired: 1,
    recommendations: [
      'See a doctor for evaluation',
      'Learn Epley maneuver from professional',
      'Move slowly when changing positions',
      'Avoid sudden head movements',
    ],
    urgency: 'routine',
  },
  {
    condition: 'Anxiety Disorder',
    description: 'A mental health condition characterized by excessive worry.',
    requiredSymptoms: ['anxiety'],
    optionalSymptoms: ['rapid-heartbeat', 'palpitations', 'shortness-breath', 'insomnia', 'fatigue', 'concentration', 'tremors', 'excessive-sweating'],
    minRequired: 1,
    recommendations: [
      'Consider speaking with a mental health professional',
      'Practice deep breathing exercises',
      'Regular physical exercise',
      'Limit caffeine and alcohol',
      'Maintain regular sleep schedule',
    ],
    urgency: 'routine',
  },
  {
    condition: 'Depression',
    description: 'A mood disorder causing persistent feelings of sadness.',
    requiredSymptoms: ['depression'],
    optionalSymptoms: ['fatigue', 'insomnia', 'excessive-sleep', 'loss-appetite', 'concentration', 'weight-gain', 'weight-loss'],
    minRequired: 1,
    recommendations: [
      'Seek help from a mental health professional',
      'Stay connected with supportive people',
      'Exercise regularly',
      'Maintain routine and structure',
      'Consider therapy and/or medication',
    ],
    urgency: 'routine',
  },
  {
    condition: 'High Cholesterol Symptoms',
    description: 'Signs that may indicate elevated cholesterol levels.',
    requiredSymptoms: ['fatigue', 'chest-pain'],
    optionalSymptoms: ['shortness-breath', 'numbness', 'cold-extremities'],
    minRequired: 2,
    recommendations: [
      'Get a lipid panel blood test',
      'Reduce saturated fat intake',
      'Exercise regularly',
      'Maintain healthy weight',
      'Consider medication if prescribed',
    ],
    urgency: 'routine',
  },
];

const diagnose = (selectedSymptoms: string[], duration: string, age: string): DiagnosisResult[] => {
  const results: DiagnosisResult[] = [];
  const ageNum = parseInt(age) || 30;

  for (const rule of conditionRules) {
    // Check age relevance
    if (rule.ageRelevance) {
      if (rule.ageRelevance.min && ageNum < rule.ageRelevance.min) continue;
      if (rule.ageRelevance.max && ageNum > rule.ageRelevance.max) continue;
    }

    // Count matched required symptoms
    const matchedRequired = rule.requiredSymptoms.filter(s => selectedSymptoms.includes(s));
    const matchedOptional = rule.optionalSymptoms.filter(s => selectedSymptoms.includes(s));
    const allMatched = [...matchedRequired, ...matchedOptional];

    // Must match minimum required symptoms
    if (matchedRequired.length < rule.minRequired && matchedRequired.length < rule.requiredSymptoms.length) {
      continue;
    }

    // Calculate score
    const requiredScore = matchedRequired.length * 3;
    const optionalScore = matchedOptional.length * 1;
    const totalPossible = (rule.requiredSymptoms.length * 3) + (rule.optionalSymptoms.length * 1);
    const score = ((requiredScore + optionalScore) / totalPossible) * 100;

    // Add severity bonus
    const severityBonus = allMatched.reduce((acc, symId) => {
      const sym = symptoms.find(s => s.id === symId);
      return acc + ((sym?.severity || 1) * 2);
    }, 0);

    const finalScore = Math.min(100, score + severityBonus);

    // Determine probability
    let probability: 'High' | 'Medium' | 'Low';
    if (finalScore >= 60) {
      probability = 'High';
    } else if (finalScore >= 35) {
      probability = 'Medium';
    } else {
      probability = 'Low';
    }

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

  // Sort by urgency then score
  return results.sort((a, b) => {
    const urgencyOrder = { emergency: 0, urgent: 1, routine: 2, 'self-care': 3 };
    if (urgencyOrder[a.urgency] !== urgencyOrder[b.urgency]) {
      return urgencyOrder[a.urgency] - urgencyOrder[b.urgency];
    }
    return b.score - a.score;
  });
};

export const SymptomChecker = () => {
  const [step, setStep] = useState(1);
  const [selectedSymptoms, setSelectedSymptoms] = useState<string[]>([]);
  const [results, setResults] = useState<DiagnosisResult[]>([]);
  const [duration, setDuration] = useState('less-than-day');
  const [age, setAge] = useState('');
  const [searchTerm, setSearchTerm] = useState('');

  const categories = [...new Set(symptoms.map(s => s.category))];

  const filteredSymptoms = symptoms.filter(s =>
    s.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    s.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const toggleSymptom = (symptomId: string) => {
    setSelectedSymptoms(prev =>
      prev.includes(symptomId)
        ? prev.filter(s => s !== symptomId)
        : [...prev, symptomId]
    );
  };

  const handleAnalyze = () => {
    const diagnosisResults = diagnose(selectedSymptoms, duration, age);
    setResults(diagnosisResults);
    setStep(4);
  };

  const reset = () => {
    setStep(1);
    setSelectedSymptoms([]);
    setResults([]);
    setDuration('less-than-day');
    setAge('');
    setSearchTerm('');
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

        <div className="max-w-4xl mx-auto">
          {/* Progress Steps */}
          <div className="flex items-center justify-center gap-2 mb-8">
            {[1, 2, 3, 4].map((s) => (
              <div key={s} className="flex items-center">
                <div className={cn(
                  "w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium transition-colors",
                  step >= s 
                    ? "bg-primary text-primary-foreground" 
                    : "bg-muted text-muted-foreground"
                )}>
                  {s}
                </div>
                {s < 4 && (
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
                  <h3 className="text-lg font-heading font-semibold mb-4 flex items-center gap-2">
                    <Thermometer className="w-5 h-5 text-primary" />
                    Basic Information
                  </h3>
                  
                  <div className="space-y-4 mb-6">
                    <div>
                      <Label htmlFor="age">Your Age</Label>
                      <Input
                        id="age"
                        type="number"
                        placeholder="Enter your age"
                        value={age}
                        onChange={(e) => setAge(e.target.value)}
                        className="mt-1"
                      />
                    </div>
                    
                    <div>
                      <Label>How long have you had symptoms?</Label>
                      <RadioGroup value={duration} onValueChange={setDuration} className="mt-2">
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="less-than-day" id="less-than-day" />
                          <Label htmlFor="less-than-day">Less than a day</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="1-3-days" id="1-3-days" />
                          <Label htmlFor="1-3-days">1-3 days</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="4-7-days" id="4-7-days" />
                          <Label htmlFor="4-7-days">4-7 days</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="1-2-weeks" id="1-2-weeks" />
                          <Label htmlFor="1-2-weeks">1-2 weeks</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="more-than-2-weeks" id="more-than-2-weeks" />
                          <Label htmlFor="more-than-2-weeks">More than 2 weeks</Label>
                        </div>
                      </RadioGroup>
                    </div>
                  </div>

                  <div className="flex justify-end">
                    <Button
                      variant="hero"
                      onClick={() => setStep(2)}
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
                    Select Your Symptoms
                  </h3>
                  
                  <div className="mb-4">
                    <Input
                      placeholder="Search symptoms..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="mb-4"
                    />
                    <p className="text-sm text-muted-foreground">
                      Selected: {selectedSymptoms.length} symptom(s)
                    </p>
                  </div>
                  
                  <div className="max-h-[400px] overflow-y-auto pr-2 space-y-6">
                    {categories.map(category => {
                      const categorySymptoms = filteredSymptoms.filter(s => s.category === category);
                      if (categorySymptoms.length === 0) return null;
                      
                      return (
                        <div key={category}>
                          <h4 className="text-sm font-medium text-muted-foreground mb-3 sticky top-0 bg-card py-1">
                            {category}
                          </h4>
                          <div className="flex flex-wrap gap-2">
                            {categorySymptoms.map(symptom => (
                              <button
                                key={symptom.id}
                                onClick={() => toggleSymptom(symptom.id)}
                                className={cn(
                                  "px-3 py-1.5 rounded-full text-sm font-medium transition-all",
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
                      );
                    })}
                  </div>

                  <div className="flex justify-between mt-6">
                    <Button variant="outline" onClick={() => setStep(1)} className="gap-2">
                      <ChevronLeft className="w-4 h-4" /> Back
                    </Button>
                    <Button
                      variant="hero"
                      onClick={() => setStep(3)}
                      disabled={selectedSymptoms.length === 0}
                      className="gap-2"
                    >
                      Continue <ChevronRight className="w-4 h-4" />
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
              >
                <Card className="p-6">
                  <h3 className="text-lg font-heading font-semibold mb-4">
                    Review Your Symptoms
                  </h3>
                  
                  <div className="grid gap-4 mb-6">
                    {age && (
                      <div className="flex items-center gap-2 text-sm">
                        <span className="text-muted-foreground">Age:</span>
                        <span className="font-medium">{age} years</span>
                      </div>
                    )}
                    <div className="flex items-center gap-2 text-sm">
                      <Clock className="w-4 h-4 text-muted-foreground" />
                      <span className="text-muted-foreground">Duration:</span>
                      <span className="font-medium">{duration.replace(/-/g, ' ')}</span>
                    </div>
                  </div>

                  <p className="text-muted-foreground mb-4">
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
                    <Button variant="outline" onClick={() => setStep(2)} className="gap-2">
                      <ChevronLeft className="w-4 h-4" /> Back
                    </Button>
                    <Button variant="hero" onClick={handleAnalyze} className="gap-2">
                      Analyze Symptoms
                    </Button>
                  </div>
                </Card>
              </motion.div>
            )}

            {step === 4 && (
              <motion.div
                key="step4"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-4"
              >
                {results.length === 0 ? (
                  <Card className="p-6 text-center">
                    <p className="text-muted-foreground mb-4">
                      We couldn't match your symptoms to specific conditions. Please consult a healthcare provider.
                    </p>
                    <Button variant="outline" onClick={reset}>
                      Start Over
                    </Button>
                  </Card>
                ) : (
                  <>
                    <div className="text-center mb-6">
                      <p className="text-muted-foreground">
                        Found {results.length} possible condition(s) based on your symptoms
                      </p>
                    </div>

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
                            <div className="flex items-center gap-2 mb-1 flex-wrap">
                              <h3 className="font-heading font-semibold text-lg">
                                {result.condition}
                              </h3>
                              <span className={cn(
                                "px-2 py-0.5 rounded-full text-xs font-medium",
                                result.probability === 'High' && "bg-primary/10 text-primary",
                                result.probability === 'Medium' && "bg-warning/10 text-warning",
                                result.probability === 'Low' && "bg-muted text-muted-foreground"
                              )}>
                                {result.probability} match
                              </span>
                              <span className={cn(
                                "px-2 py-0.5 rounded-full text-xs font-medium uppercase",
                                result.urgency === 'emergency' && "bg-destructive/10 text-destructive",
                                result.urgency === 'urgent' && "bg-warning/10 text-warning",
                                result.urgency === 'routine' && "bg-muted text-muted-foreground",
                                result.urgency === 'self-care' && "bg-success/10 text-success"
                              )}>
                                {result.urgency}
                              </span>
                            </div>
                            <p className="text-muted-foreground text-sm mb-3">
                              {result.description}
                            </p>
                            
                            <div className="mb-3">
                              <h4 className="text-xs font-medium text-muted-foreground mb-1">Matched symptoms:</h4>
                              <div className="flex flex-wrap gap-1">
                                {result.matchedSymptoms.map(symId => {
                                  const sym = symptoms.find(s => s.id === symId);
                                  return (
                                    <span key={symId} className="px-2 py-0.5 bg-primary/10 text-primary text-xs rounded-full">
                                      {sym?.name}
                                    </span>
                                  );
                                })}
                              </div>
                            </div>

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
                  </>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
};
