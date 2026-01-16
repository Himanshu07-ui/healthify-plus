import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Stethoscope, AlertCircle, CheckCircle, ArrowRight, RotateCcw, Clock, Thermometer, Activity, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import { Badge } from '@/components/ui/badge';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Progress } from '@/components/ui/progress';

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

interface MCQQuestion {
  id: string;
  question: string;
  options: { label: string; symptomIds: string[] }[];
}

// Base questions asked for all concerns
const baseQuestions: MCQQuestion[] = [
  {
    id: 'main-concern',
    question: 'What is your main concern today?',
    options: [
      { label: 'Fever or feeling unwell', symptomIds: ['fever', 'fatigue'] },
      { label: 'Pain or discomfort', symptomIds: ['body-aches'] },
      { label: 'Breathing or respiratory issues', symptomIds: ['cough'] },
      { label: 'Digestive problems', symptomIds: ['nausea', 'abdominal-pain'] },
      { label: 'Head / neurological issues', symptomIds: ['headache'] },
      { label: 'Heart / chest concerns', symptomIds: ['chest-pain'] },
    ],
  },
  {
    id: 'duration',
    question: 'How long have you had these symptoms?',
    options: [
      { label: 'Just started today', symptomIds: [] },
      { label: '1-3 days', symptomIds: [] },
      { label: '4-7 days', symptomIds: [] },
      { label: 'More than a week', symptomIds: [] },
    ],
  },
  {
    id: 'severity',
    question: 'How severe are your symptoms overall?',
    options: [
      { label: 'Mild - Noticeable but manageable', symptomIds: [] },
      { label: 'Moderate - Affecting daily activities', symptomIds: [] },
      { label: 'Severe - Significantly limiting activities', symptomIds: [] },
      { label: 'Very severe - Unable to function normally', symptomIds: [] },
    ],
  },
];

// Follow-up questions based on main concern
const concernSpecificQuestions: Record<string, MCQQuestion[]> = {
  'Fever or feeling unwell': [
    {
      id: 'fever-temp',
      question: 'What is your approximate temperature?',
      options: [
        { label: 'Slightly elevated (99-100°F / 37.2-37.8°C)', symptomIds: ['fever'] },
        { label: 'Moderate fever (100-102°F / 37.8-38.9°C)', symptomIds: ['fever', 'chills'] },
        { label: 'High fever (102-104°F / 38.9-40°C)', symptomIds: ['high-fever', 'chills'] },
        { label: 'Very high (>104°F / >40°C)', symptomIds: ['high-fever', 'chills'] },
      ],
    },
    {
      id: 'fever-pattern',
      question: 'How does your fever behave?',
      options: [
        { label: 'Constant - stays elevated', symptomIds: [] },
        { label: 'Comes and goes throughout the day', symptomIds: [] },
        { label: 'Worse at night with sweating', symptomIds: ['excessive-sweating', 'chills'] },
        { label: 'Only noticed after physical activity', symptomIds: [] },
      ],
    },
    {
      id: 'fever-accompanying',
      question: 'What else are you experiencing with the fever?',
      options: [
        { label: 'Sore throat and runny nose', symptomIds: ['sore-throat', 'runny-nose'] },
        { label: 'Body aches and chills', symptomIds: ['body-aches', 'chills'] },
        { label: 'Skin rash', symptomIds: ['rash'] },
        { label: 'No other major symptoms', symptomIds: [] },
      ],
    },
    {
      id: 'fever-medication',
      question: 'Have you taken any fever-reducing medications?',
      options: [
        { label: 'No, not yet', symptomIds: [] },
        { label: 'Yes, and it helps temporarily', symptomIds: [] },
        { label: 'Yes, but no improvement at all', symptomIds: [] },
        { label: 'Yes, but fever returns quickly', symptomIds: [] },
      ],
    },
  ],
  'Pain or discomfort': [
    {
      id: 'pain-location',
      question: 'Where is your pain located?',
      options: [
        { label: 'Head or neck area', symptomIds: ['headache', 'neck-pain'] },
        { label: 'Back (upper or lower)', symptomIds: ['back-pain'] },
        { label: 'Muscles throughout body', symptomIds: ['muscle-pain', 'body-aches'] },
        { label: 'Joints (knees, hips, etc.)', symptomIds: ['joint-pain'] },
      ],
    },
    {
      id: 'pain-type',
      question: 'How would you describe the pain?',
      options: [
        { label: 'Sharp or stabbing', symptomIds: [] },
        { label: 'Dull and constant ache', symptomIds: [] },
        { label: 'Throbbing or pulsating', symptomIds: [] },
        { label: 'Burning sensation', symptomIds: [] },
      ],
    },
    {
      id: 'pain-movement',
      question: 'How does movement affect your pain?',
      options: [
        { label: 'Improves with movement', symptomIds: [] },
        { label: 'Worsens with movement', symptomIds: [] },
        { label: 'Stiff in morning, better later', symptomIds: [] },
        { label: 'No change with movement', symptomIds: [] },
      ],
    },
    {
      id: 'pain-swelling',
      question: 'Is there any visible swelling or redness?',
      options: [
        { label: 'No visible changes', symptomIds: [] },
        { label: 'Mild swelling present', symptomIds: [] },
        { label: 'Significant swelling with redness', symptomIds: [] },
        { label: 'Warm to touch and very swollen', symptomIds: [] },
      ],
    },
  ],
  'Breathing or respiratory issues': [
    {
      id: 'resp-main',
      question: 'What is your main respiratory symptom?',
      options: [
        { label: 'Dry cough (no mucus)', symptomIds: ['cough'] },
        { label: 'Productive cough (with mucus)', symptomIds: ['wet-cough'] },
        { label: 'Shortness of breath', symptomIds: ['shortness-breath'] },
        { label: 'Wheezing or whistling sound', symptomIds: ['wheezing'] },
      ],
    },
    {
      id: 'resp-mucus',
      question: 'If you have mucus/phlegm, what color is it?',
      options: [
        { label: 'No mucus or clear/white', symptomIds: [] },
        { label: 'Yellow colored', symptomIds: ['wet-cough'] },
        { label: 'Green colored', symptomIds: ['wet-cough', 'fever'] },
        { label: 'Brown or blood-tinged', symptomIds: [] },
      ],
    },
    {
      id: 'resp-trigger',
      question: 'What triggers or worsens your symptoms?',
      options: [
        { label: 'Physical activity or exertion', symptomIds: ['shortness-breath'] },
        { label: 'Lying down at night', symptomIds: [] },
        { label: 'Cold air, dust, or allergens', symptomIds: ['sneezing', 'runny-nose'] },
        { label: 'Constant, no specific trigger', symptomIds: [] },
      ],
    },
    {
      id: 'resp-chest',
      question: 'Any chest symptoms?',
      options: [
        { label: 'No chest symptoms', symptomIds: [] },
        { label: 'Mild chest tightness', symptomIds: ['chest-tightness'] },
        { label: 'Chest pain when breathing', symptomIds: ['chest-pain'] },
        { label: 'Rapid or irregular heartbeat', symptomIds: ['rapid-heartbeat', 'palpitations'] },
      ],
    },
  ],
  'Digestive problems': [
    {
      id: 'digest-type',
      question: 'What type of digestive issue are you having?',
      options: [
        { label: 'Nausea or vomiting', symptomIds: ['nausea', 'vomiting'] },
        { label: 'Diarrhea', symptomIds: ['diarrhea'] },
        { label: 'Constipation', symptomIds: ['constipation'] },
        { label: 'Stomach pain or cramps', symptomIds: ['abdominal-pain'] },
      ],
    },
    {
      id: 'digest-location',
      question: 'Where is the discomfort located?',
      options: [
        { label: 'Upper abdomen (stomach area)', symptomIds: ['abdominal-pain', 'heartburn'] },
        { label: 'Lower abdomen', symptomIds: ['abdominal-pain'] },
        { label: 'Around the navel', symptomIds: ['abdominal-pain'] },
        { label: 'All over the abdomen', symptomIds: ['severe-abdominal'] },
      ],
    },
    {
      id: 'digest-eating',
      question: 'How does eating affect your symptoms?',
      options: [
        { label: 'Symptoms worsen after eating', symptomIds: ['heartburn', 'bloating'] },
        { label: 'Symptoms improve after eating', symptomIds: [] },
        { label: 'No change with eating', symptomIds: [] },
        { label: 'Unable to eat due to symptoms', symptomIds: ['loss-appetite', 'nausea'] },
      ],
    },
    {
      id: 'digest-other',
      question: 'Any other accompanying symptoms?',
      options: [
        { label: 'Fever and chills', symptomIds: ['fever', 'chills'] },
        { label: 'Bloating and gas', symptomIds: ['bloating'] },
        { label: 'Heartburn or acid reflux', symptomIds: ['heartburn'] },
        { label: 'None of the above', symptomIds: [] },
      ],
    },
  ],
  'Head / neurological issues': [
    {
      id: 'head-type',
      question: 'How would you describe your headache?',
      options: [
        { label: 'Throbbing or pulsating', symptomIds: ['severe-headache'] },
        { label: 'Tight band around the head', symptomIds: ['headache'] },
        { label: 'Sharp, stabbing pain', symptomIds: ['severe-headache'] },
        { label: 'Dull, constant ache', symptomIds: ['headache'] },
      ],
    },
    {
      id: 'head-location',
      question: 'Where is the headache located?',
      options: [
        { label: 'One side of the head', symptomIds: ['severe-headache'] },
        { label: 'Both sides equally', symptomIds: ['headache'] },
        { label: 'Behind the eyes', symptomIds: ['headache', 'eye-pain'] },
        { label: 'Back of head/neck', symptomIds: ['headache', 'neck-pain'] },
      ],
    },
    {
      id: 'head-symptoms',
      question: 'Do you have any accompanying symptoms?',
      options: [
        { label: 'Sensitivity to light or sound', symptomIds: ['light-sensitivity'] },
        { label: 'Nausea or vomiting', symptomIds: ['nausea', 'vomiting'] },
        { label: 'Visual disturbances (aura, spots)', symptomIds: ['blurred-vision'] },
        { label: 'Stiff neck', symptomIds: ['neck-pain'] },
      ],
    },
    {
      id: 'head-neuro',
      question: 'Have you noticed any neurological changes?',
      options: [
        { label: 'No changes', symptomIds: [] },
        { label: 'Confusion or difficulty thinking', symptomIds: ['confusion'] },
        { label: 'Weakness or numbness', symptomIds: ['numbness', 'muscle-weakness'] },
        { label: 'Dizziness or balance issues', symptomIds: ['dizziness'] },
      ],
    },
  ],
  'Heart / chest concerns': [
    {
      id: 'heart-type',
      question: 'What type of chest symptom are you experiencing?',
      options: [
        { label: 'Sharp, stabbing pain', symptomIds: ['chest-pain'] },
        { label: 'Pressure or squeezing sensation', symptomIds: ['chest-pressure'] },
        { label: 'Racing or irregular heartbeat', symptomIds: ['palpitations', 'rapid-heartbeat'] },
        { label: 'Burning sensation (like heartburn)', symptomIds: ['heartburn', 'chest-pain'] },
      ],
    },
    {
      id: 'heart-radiation',
      question: 'Does the pain spread to other areas?',
      options: [
        { label: 'No, stays in chest only', symptomIds: [] },
        { label: 'To left arm or shoulder', symptomIds: ['chest-pressure'] },
        { label: 'To jaw, neck, or back', symptomIds: ['chest-pressure', 'neck-pain'] },
        { label: 'To right side or abdomen', symptomIds: ['chest-pain'] },
      ],
    },
    {
      id: 'heart-trigger',
      question: 'What triggers or worsens your symptoms?',
      options: [
        { label: 'Physical exertion', symptomIds: ['shortness-breath'] },
        { label: 'Eating or lying down', symptomIds: ['heartburn'] },
        { label: 'Emotional stress or anxiety', symptomIds: ['anxiety', 'palpitations'] },
        { label: 'Occurs at rest without trigger', symptomIds: ['chest-pressure'] },
      ],
    },
    {
      id: 'heart-other',
      question: 'Any other symptoms present?',
      options: [
        { label: 'Sweating with chest pain', symptomIds: ['excessive-sweating', 'chest-pressure'] },
        { label: 'Shortness of breath', symptomIds: ['shortness-breath'] },
        { label: 'Dizziness or lightheadedness', symptomIds: ['dizziness'] },
        { label: 'None of these', symptomIds: [] },
      ],
    },
  ],
};

// Closing question
const closingQuestion: MCQQuestion = {
  id: 'additional',
  question: 'Any additional symptoms we should know about?',
  options: [
    { label: 'Fatigue or weakness', symptomIds: ['fatigue', 'muscle-weakness'] },
    { label: 'Sleep problems or insomnia', symptomIds: ['insomnia'] },
    { label: 'Anxiety or stress', symptomIds: ['anxiety'] },
    { label: 'None of the above', symptomIds: [] },
  ],
};

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
  { id: 'dizziness', name: 'Dizziness', category: 'Head', severity: 2 },
  { id: 'chest-pain', name: 'Chest Pain', category: 'Heart', severity: 4 },
  { id: 'shortness-breath', name: 'Shortness of Breath', category: 'Respiratory', severity: 3 },
  { id: 'abdominal-pain', name: 'Abdominal Pain', category: 'Digestive', severity: 2 },
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
    recommendations: ['Avoid trigger foods', "Don't lie down after eating", 'Elevate head while sleeping', 'Try antacids'],
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
  const [mode, setMode] = useState<'select' | 'mcq' | 'quick'>('select');
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [mcqAnswers, setMcqAnswers] = useState<Record<string, number>>({});
  const [selectedSymptoms, setSelectedSymptoms] = useState<string[]>([]);
  const [results, setResults] = useState<DiagnosisResult[] | null>(null);

  // Get the selected main concern label
  const getSelectedConcern = (): string | null => {
    const mainConcernAnswer = mcqAnswers['main-concern'];
    if (mainConcernAnswer !== undefined) {
      return baseQuestions[0].options[mainConcernAnswer]?.label || null;
    }
    return null;
  };

  // Build dynamic questions based on selected main concern
  const getMcqQuestions = (): MCQQuestion[] => {
    const selectedConcern = getSelectedConcern();
    const concernQuestions = selectedConcern ? concernSpecificQuestions[selectedConcern] || [] : [];
    
    // Structure: Base questions (main-concern, duration, severity) -> Concern-specific questions -> Closing question
    return [...baseQuestions, ...concernQuestions, closingQuestion];
  };

  const mcqQuestions = getMcqQuestions();

  const toggleSymptom = (symptomId: string) => {
    setSelectedSymptoms(prev =>
      prev.includes(symptomId)
        ? prev.filter(s => s !== symptomId)
        : [...prev, symptomId]
    );
  };

  const handleMCQAnswer = (questionId: string, optionIndex: number) => {
    setMcqAnswers(prev => {
      const newAnswers = { ...prev, [questionId]: optionIndex };
      
      // If answering main-concern, reset follow-up questions
      if (questionId === 'main-concern') {
        // Keep only base question answers
        const baseIds = baseQuestions.map(q => q.id);
        const filtered: Record<string, number> = {};
        Object.entries(newAnswers).forEach(([key, val]) => {
          if (baseIds.includes(key)) {
            filtered[key] = val;
          }
        });
        return filtered;
      }
      
      return newAnswers;
    });
  };

  const nextQuestion = () => {
    if (currentQuestion < mcqQuestions.length - 1) {
      setCurrentQuestion(prev => prev + 1);
    }
  };

  const prevQuestion = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(prev => prev - 1);
    }
  };

  const handleAnalyze = () => {
    let symptomsToAnalyze = [...selectedSymptoms];

    // Add symptoms from MCQ answers
    if (mode === 'mcq') {
      Object.entries(mcqAnswers).forEach(([questionId, optionIndex]) => {
        const question = mcqQuestions.find(q => q.id === questionId);
        if (question && question.options[optionIndex]) {
          symptomsToAnalyze = [...symptomsToAnalyze, ...question.options[optionIndex].symptomIds];
        }
      });
    }

    // Remove duplicates
    symptomsToAnalyze = [...new Set(symptomsToAnalyze)];
    
    const diagnosisResults = diagnose(symptomsToAnalyze);
    setResults(diagnosisResults);
  };

  const reset = () => {
    setMode('select');
    setCurrentQuestion(0);
    setMcqAnswers({});
    setSelectedSymptoms([]);
    setResults(null);
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

  const totalQuestions = mcqQuestions.length;
  const progress = ((currentQuestion + 1) / totalQuestions) * 100;
  const currentQ = mcqQuestions[currentQuestion];
  const canProceedMCQ = mcqAnswers[currentQ?.id] !== undefined;

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
            Answer a few questions to get personalized health insights
          </p>
        </motion.div>

        <div className="max-w-2xl mx-auto">
          <AnimatePresence mode="wait">
            {!results ? (
              <>
                {/* Mode Selection */}
                {mode === 'select' && (
                  <motion.div
                    key="select"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                  >
                    <Card className="p-6">
                      <h2 className="text-lg font-semibold text-foreground mb-4 text-center">
                        How would you like to check your symptoms?
                      </h2>
                      <div className="grid gap-4">
                        <button
                          onClick={() => setMode('mcq')}
                          className="flex items-center gap-4 p-4 rounded-xl border-2 border-muted hover:border-primary/50 hover:bg-primary/5 transition-all text-left group"
                        >
                          <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                            <Activity className="w-6 h-6 text-primary" />
                          </div>
                          <div className="flex-1">
                            <h3 className="font-semibold text-foreground mb-1">Guided Questions</h3>
                            <p className="text-sm text-muted-foreground">
                              Answer 7 simple questions about how you're feeling
                            </p>
                          </div>
                          <ChevronRight className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors" />
                        </button>

                        <button
                          onClick={() => setMode('quick')}
                          className="flex items-center gap-4 p-4 rounded-xl border-2 border-muted hover:border-primary/50 hover:bg-primary/5 transition-all text-left group"
                        >
                          <div className="w-12 h-12 rounded-xl bg-secondary/50 flex items-center justify-center shrink-0">
                            <Thermometer className="w-6 h-6 text-foreground" />
                          </div>
                          <div className="flex-1">
                            <h3 className="font-semibold text-foreground mb-1">Quick Select</h3>
                            <p className="text-sm text-muted-foreground">
                              Select symptoms directly from a list
                            </p>
                          </div>
                          <ChevronRight className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors" />
                        </button>
                      </div>
                    </Card>
                  </motion.div>
                )}

                {/* MCQ Mode */}
                {mode === 'mcq' && (
                  <motion.div
                    key="mcq"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                  >
                    <Card className="p-6">
                      {/* Progress */}
                      <div className="mb-6">
                        <div className="flex items-center justify-between text-sm mb-2">
                          <span className="text-muted-foreground">Question {currentQuestion + 1} of {mcqQuestions.length}</span>
                          <span className="text-primary font-medium">{Math.round(progress)}%</span>
                        </div>
                        <Progress value={progress} className="h-2" />
                      </div>

                      {/* Question */}
                      <AnimatePresence mode="wait">
                        <motion.div
                          key={currentQ.id}
                          initial={{ opacity: 0, x: 20 }}
                          animate={{ opacity: 1, x: 0 }}
                          exit={{ opacity: 0, x: -20 }}
                          transition={{ duration: 0.2 }}
                        >
                          <h3 className="text-lg font-semibold text-foreground mb-4">
                            {currentQ.question}
                          </h3>

                          <RadioGroup
                            value={mcqAnswers[currentQ.id]?.toString()}
                            onValueChange={(value) => handleMCQAnswer(currentQ.id, parseInt(value))}
                            className="space-y-3"
                          >
                            {currentQ.options.map((option, index) => (
                              <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.05 }}
                              >
                                <Label
                                  htmlFor={`${currentQ.id}-${index}`}
                                  className={cn(
                                    "flex items-center gap-3 p-4 rounded-xl border-2 cursor-pointer transition-all",
                                    mcqAnswers[currentQ.id] === index
                                      ? "border-primary bg-primary/5"
                                      : "border-muted hover:border-primary/30 hover:bg-muted/50"
                                  )}
                                >
                                  <RadioGroupItem
                                    value={index.toString()}
                                    id={`${currentQ.id}-${index}`}
                                    className="shrink-0"
                                  />
                                  <span className="text-sm font-medium">{option.label}</span>
                                </Label>
                              </motion.div>
                            ))}
                          </RadioGroup>
                        </motion.div>
                      </AnimatePresence>

                      {/* Navigation */}
                      <div className="flex items-center justify-between mt-6 pt-4 border-t">
                        <Button
                          variant="ghost"
                          onClick={currentQuestion === 0 ? () => setMode('select') : prevQuestion}
                          className="gap-2"
                        >
                          <RotateCcw className="w-4 h-4" />
                          {currentQuestion === 0 ? 'Back' : 'Previous'}
                        </Button>

                        {currentQuestion < mcqQuestions.length - 1 ? (
                          <Button
                            onClick={nextQuestion}
                            disabled={!canProceedMCQ}
                            className="gap-2"
                          >
                            Next
                            <ArrowRight className="w-4 h-4" />
                          </Button>
                        ) : (
                          <Button
                            onClick={handleAnalyze}
                            disabled={!canProceedMCQ}
                            className="gap-2 bg-primary"
                          >
                            Get Results
                            <ArrowRight className="w-4 h-4" />
                          </Button>
                        )}
                      </div>
                    </Card>
                  </motion.div>
                )}

                {/* Quick Select Mode */}
                {mode === 'quick' && (
                  <motion.div
                    key="quick"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                  >
                    <Card className="p-6">
                      <div className="flex items-center justify-between mb-4">
                        <h3 className="font-semibold text-foreground">Select your symptoms</h3>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => setMode('select')}
                          className="text-muted-foreground"
                        >
                          ← Back
                        </Button>
                      </div>

                      {/* Selected count */}
                      {selectedSymptoms.length > 0 && (
                        <div className="flex items-center justify-between mb-4 p-3 rounded-lg bg-primary/5 border border-primary/20">
                          <span className="text-sm font-medium text-primary">
                            {selectedSymptoms.length} symptom{selectedSymptoms.length > 1 ? 's' : ''} selected
                          </span>
                          <button
                            onClick={() => setSelectedSymptoms([])}
                            className="text-xs text-muted-foreground hover:text-foreground"
                          >
                            Clear all
                          </button>
                        </div>
                      )}

                      {/* Symptom Grid */}
                      <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 mb-6">
                        {commonSymptoms.map((symptom) => (
                          <button
                            key={symptom.id}
                            onClick={() => toggleSymptom(symptom.id)}
                            className={cn(
                              "p-3 rounded-lg border-2 text-sm font-medium transition-all text-left",
                              selectedSymptoms.includes(symptom.id)
                                ? "border-primary bg-primary/10 text-primary"
                                : "border-muted hover:border-primary/30 hover:bg-muted/50"
                            )}
                          >
                            <div className="flex items-center gap-2">
                              {selectedSymptoms.includes(symptom.id) && (
                                <CheckCircle className="w-4 h-4 shrink-0" />
                              )}
                              <span className="truncate">{symptom.name}</span>
                            </div>
                          </button>
                        ))}
                      </div>

                      <Button
                        onClick={handleAnalyze}
                        disabled={selectedSymptoms.length === 0}
                        className="w-full gap-2"
                        size="lg"
                      >
                        Analyze Symptoms
                        <ArrowRight className="w-4 h-4" />
                      </Button>
                    </Card>
                  </motion.div>
                )}
              </>
            ) : (
              /* Results */
              <motion.div
                key="results"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
              >
                <Card className="p-6">
                  <div className="flex items-center justify-between mb-6">
                    <h2 className="text-xl font-bold text-foreground">Your Results</h2>
                    <Button variant="outline" size="sm" onClick={reset} className="gap-2">
                      <RotateCcw className="w-4 h-4" />
                      Start Over
                    </Button>
                  </div>

                  {results.length === 0 ? (
                    <div className="text-center py-8">
                      <div className="w-16 h-16 rounded-full bg-green-500/10 flex items-center justify-center mx-auto mb-4">
                        <CheckCircle className="w-8 h-8 text-green-500" />
                      </div>
                      <h3 className="text-lg font-semibold text-foreground mb-2">
                        Looking Good!
                      </h3>
                      <p className="text-muted-foreground text-sm max-w-sm mx-auto">
                        Based on your symptoms, no immediate concerns were identified. 
                        If symptoms persist, please consult a healthcare provider.
                      </p>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {results.map((result, index) => (
                        <motion.div
                          key={result.condition}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: index * 0.1 }}
                          className={cn(
                            "p-4 rounded-xl border-2",
                            getUrgencyStyles(result.urgency)
                          )}
                        >
                          <div className="flex items-start justify-between gap-3 mb-3">
                            <div>
                              <h3 className="font-semibold text-foreground">{result.condition}</h3>
                              <p className="text-sm text-muted-foreground mt-1">
                                {result.description}
                              </p>
                            </div>
                            {getUrgencyBadge(result.urgency)}
                          </div>

                          <div className="space-y-3">
                            <div>
                              <span className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
                                Matched Symptoms
                              </span>
                              <div className="flex flex-wrap gap-1.5 mt-1.5">
                                {result.matchedSymptoms.map(symId => {
                                  const sym = allSymptoms.find(s => s.id === symId);
                                  return (
                                    <Badge key={symId} variant="secondary" className="text-xs">
                                      {sym?.name || symId}
                                    </Badge>
                                  );
                                })}
                              </div>
                            </div>

                            <div>
                              <span className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
                                Recommendations
                              </span>
                              <ul className="mt-1.5 space-y-1">
                                {result.recommendations.map((rec, i) => (
                                  <li key={i} className="text-sm text-foreground flex items-start gap-2">
                                    <span className="text-primary mt-0.5">•</span>
                                    {rec}
                                  </li>
                                ))}
                              </ul>
                            </div>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  )}

                  {/* Disclaimer */}
                  <div className="mt-6 p-4 rounded-lg bg-muted/50 border">
                    <div className="flex gap-3">
                      <AlertCircle className="w-5 h-5 text-muted-foreground shrink-0 mt-0.5" />
                      <div className="text-xs text-muted-foreground">
                        <p className="font-medium mb-1">Medical Disclaimer</p>
                        <p>
                          This tool provides general health information only and is not a substitute 
                          for professional medical advice. Always consult a healthcare provider for 
                          diagnosis and treatment.
                        </p>
                      </div>
                    </div>
                  </div>
                </Card>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
};
