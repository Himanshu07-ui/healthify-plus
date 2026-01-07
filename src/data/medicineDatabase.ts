export interface Medicine {
  name: string;
  genericName: string;
  category: string;
  usage: string;
  dosage: string;
  sideEffects: string[];
  warnings: string[];
  interactions?: string[];
  storage: string;
}

export const medicineDatabase: Record<string, Medicine> = {
  // Pain & Fever
  'paracetamol': {
    name: 'Paracetamol (Acetaminophen)',
    genericName: 'Paracetamol',
    category: 'Analgesic / Antipyretic',
    usage: 'Used to treat mild to moderate pain and fever. Common for headaches, muscle aches, arthritis, backaches, toothaches, colds, and fevers.',
    dosage: 'Adults: 500-1000mg every 4-6 hours. Maximum 4g per day.',
    sideEffects: ['Rare at normal doses', 'Liver damage at high doses', 'Allergic reactions (rare)'],
    warnings: ['Do not exceed 4g daily', 'Avoid with alcohol', 'Caution in liver disease'],
    interactions: ['Warfarin', 'Alcohol', 'Other paracetamol-containing products'],
    storage: 'Store below 25°C in a dry place'
  },
  'dolo 650': {
    name: 'Dolo 650',
    genericName: 'Paracetamol 650mg',
    category: 'Analgesic / Antipyretic',
    usage: 'Relief of mild to moderate pain and fever.',
    dosage: '1 tablet every 4-6 hours. Maximum 4 tablets per day.',
    sideEffects: ['Nausea', 'Allergic reactions (rare)'],
    warnings: ['Do not exceed recommended dose', 'Avoid alcohol'],
    storage: 'Store below 30°C'
  },
  'calpol': {
    name: 'Calpol',
    genericName: 'Paracetamol (Pediatric)',
    category: 'Analgesic / Antipyretic',
    usage: 'Fever and pain relief in children.',
    dosage: 'According to age and weight. Follow package instructions.',
    sideEffects: ['Rare at correct doses'],
    warnings: ['Use correct measuring device', 'Do not exceed dose for age'],
    storage: 'Store below 25°C'
  },
  'crocin': {
    name: 'Crocin',
    genericName: 'Paracetamol 500mg/650mg',
    category: 'Analgesic / Antipyretic',
    usage: 'Pain and fever relief.',
    dosage: '1-2 tablets every 4-6 hours as needed.',
    sideEffects: ['Nausea', 'Allergic skin reactions (rare)'],
    warnings: ['Maximum 8 tablets daily', 'Avoid in liver disease'],
    storage: 'Store in a cool, dry place'
  },
  'ibuprofen': {
    name: 'Ibuprofen',
    genericName: 'Ibuprofen',
    category: 'NSAID',
    usage: 'Pain relief, fever reduction, and anti-inflammatory. Used for headaches, dental pain, menstrual cramps, muscle aches, and arthritis.',
    dosage: 'Adults: 200-400mg every 4-6 hours. Maximum 1200mg per day without prescription.',
    sideEffects: ['Stomach upset', 'Nausea', 'Dizziness', 'Stomach ulcers (with prolonged use)'],
    warnings: ['Take with food', 'Avoid in kidney disease', 'Not for patients with aspirin allergy'],
    interactions: ['Aspirin', 'Blood thinners', 'ACE inhibitors', 'Lithium'],
    storage: 'Store at room temperature'
  },
  'brufen': {
    name: 'Brufen',
    genericName: 'Ibuprofen 400mg',
    category: 'NSAID',
    usage: 'Pain, fever, and inflammation.',
    dosage: '1 tablet 3 times daily after food.',
    sideEffects: ['Stomach upset', 'Heartburn', 'Nausea'],
    warnings: ['Take after meals', 'Not for stomach ulcer patients'],
    storage: 'Store below 25°C'
  },
  'combiflam': {
    name: 'Combiflam',
    genericName: 'Ibuprofen 400mg + Paracetamol 325mg',
    category: 'NSAID + Analgesic',
    usage: 'Combination pain relief for headaches, toothaches, body aches, and fever.',
    dosage: '1 tablet 3 times daily after food.',
    sideEffects: ['Stomach upset', 'Nausea', 'Dizziness'],
    warnings: ['Take after meals', 'Not for prolonged use', 'Avoid in peptic ulcer'],
    interactions: ['Blood thinners', 'Other NSAIDs'],
    storage: 'Store in a cool, dry place'
  },
  'aspirin': {
    name: 'Aspirin',
    genericName: 'Acetylsalicylic Acid',
    category: 'NSAID / Antiplatelet',
    usage: 'Pain relief, fever reduction, anti-inflammatory, and prevention of blood clots.',
    dosage: 'Pain: 300-600mg every 4-6 hours. Heart protection: 75-150mg daily.',
    sideEffects: ['Stomach irritation', 'Bleeding', 'Tinnitus at high doses'],
    warnings: ['Not for children under 16', 'Avoid in bleeding disorders', 'Take with food'],
    interactions: ['Blood thinners', 'Methotrexate', 'Other NSAIDs'],
    storage: 'Store in a dry place below 25°C'
  },
  'ecosprin': {
    name: 'Ecosprin',
    genericName: 'Aspirin 75mg/150mg',
    category: 'Antiplatelet',
    usage: 'Prevention of heart attacks and strokes.',
    dosage: '75-150mg once daily.',
    sideEffects: ['Stomach upset', 'Bleeding risk'],
    warnings: ['Take with food', 'Not for children'],
    storage: 'Store in a cool, dry place'
  },
  'disprin': {
    name: 'Disprin',
    genericName: 'Aspirin 350mg',
    category: 'NSAID',
    usage: 'Pain and fever relief.',
    dosage: '1-2 tablets dissolved in water, every 4-6 hours.',
    sideEffects: ['Stomach irritation', 'Nausea'],
    warnings: ['Not for children', 'Avoid on empty stomach'],
    storage: 'Store in a dry place'
  },
  'diclofenac': {
    name: 'Diclofenac',
    genericName: 'Diclofenac Sodium',
    category: 'NSAID',
    usage: 'Relief of pain, swelling, and joint stiffness caused by arthritis. Also for muscle pain, dental pain, and menstrual cramps.',
    dosage: 'Tablets: 50mg 2-3 times daily. Gel: Apply 3-4 times daily.',
    sideEffects: ['Stomach pain', 'Nausea', 'Headache', 'Diarrhea', 'Skin irritation (gel)'],
    warnings: ['Take with food', 'Avoid in heart disease', 'Not for prolonged use'],
    interactions: ['Blood thinners', 'Lithium', 'Methotrexate'],
    storage: 'Store below 30°C'
  },
  'voveran': {
    name: 'Voveran',
    genericName: 'Diclofenac Sodium 50mg',
    category: 'NSAID',
    usage: 'Arthritis, muscle pain, and inflammation.',
    dosage: '1 tablet 2-3 times daily after food.',
    sideEffects: ['Stomach pain', 'Nausea', 'Dizziness'],
    warnings: ['Take after meals', 'Avoid in heart/kidney disease'],
    storage: 'Store below 25°C'
  },
  'naproxen': {
    name: 'Naproxen',
    genericName: 'Naproxen',
    category: 'NSAID',
    usage: 'Pain, inflammation, and stiffness from arthritis and other conditions.',
    dosage: '250-500mg twice daily with food.',
    sideEffects: ['Stomach upset', 'Heartburn', 'Dizziness', 'Headache'],
    warnings: ['Take with food or milk', 'Avoid in cardiovascular disease'],
    storage: 'Store at room temperature'
  },
  'naprosyn': {
    name: 'Naprosyn',
    genericName: 'Naproxen 250mg/500mg',
    category: 'NSAID',
    usage: 'Arthritis, menstrual pain, and inflammation.',
    dosage: '1 tablet twice daily.',
    sideEffects: ['GI discomfort', 'Headache', 'Dizziness'],
    warnings: ['Take with food', 'Not for long-term use without supervision'],
    storage: 'Store below 30°C'
  },
  'mefenamic acid': {
    name: 'Mefenamic Acid',
    genericName: 'Mefenamic Acid',
    category: 'NSAID',
    usage: 'Menstrual pain, mild to moderate pain, and primary dysmenorrhea.',
    dosage: '500mg initially, then 250mg every 6 hours.',
    sideEffects: ['Stomach upset', 'Diarrhea', 'Nausea', 'Drowsiness'],
    warnings: ['Take with food', 'Use for short periods only'],
    storage: 'Store below 25°C'
  },
  'ponstan': {
    name: 'Ponstan',
    genericName: 'Mefenamic Acid 500mg',
    category: 'NSAID',
    usage: 'Menstrual cramps and pain.',
    dosage: '1 tablet 3 times daily.',
    sideEffects: ['Stomach pain', 'Diarrhea', 'Drowsiness'],
    warnings: ['Short-term use only', 'Take with food'],
    storage: 'Store in a cool, dry place'
  },
  'meftal spas': {
    name: 'Meftal Spas',
    genericName: 'Mefenamic Acid + Dicyclomine',
    category: 'NSAID + Antispasmodic',
    usage: 'Menstrual pain and abdominal cramps.',
    dosage: '1 tablet 2-3 times daily.',
    sideEffects: ['Dry mouth', 'Drowsiness', 'Dizziness'],
    warnings: ['May cause drowsiness', 'Take with food'],
    storage: 'Store below 25°C'
  },
  'zerodol sp': {
    name: 'Zerodol SP',
    genericName: 'Aceclofenac + Paracetamol + Serratiopeptidase',
    category: 'NSAID + Enzyme',
    usage: 'Pain, inflammation, and swelling.',
    dosage: '1 tablet twice daily.',
    sideEffects: ['GI upset', 'Nausea', 'Rash'],
    warnings: ['Take after food', 'Not in peptic ulcer'],
    storage: 'Store in a cool place'
  },
  'ultracet': {
    name: 'Ultracet',
    genericName: 'Tramadol 37.5mg + Paracetamol 325mg',
    category: 'Opioid Analgesic Combination',
    usage: 'Moderate to severe pain.',
    dosage: '1-2 tablets every 4-6 hours. Maximum 8 tablets daily.',
    sideEffects: ['Nausea', 'Dizziness', 'Drowsiness', 'Constipation'],
    warnings: ['May cause dependence', 'Do not drive', 'Avoid alcohol'],
    storage: 'Store at room temperature'
  },
  'flexon': {
    name: 'Flexon',
    genericName: 'Ibuprofen 400mg + Paracetamol 325mg',
    category: 'NSAID + Analgesic',
    usage: 'Pain, fever, and inflammation.',
    dosage: '1 tablet 3 times daily after food.',
    sideEffects: ['Stomach upset', 'Nausea', 'Drowsiness'],
    warnings: ['Take after meals', 'Avoid on empty stomach'],
    storage: 'Store below 25°C'
  },
  'saridon': {
    name: 'Saridon',
    genericName: 'Paracetamol + Propyphenazone + Caffeine',
    category: 'Analgesic Combination',
    usage: 'Headache, toothache, and body aches.',
    dosage: '1 tablet as needed. Maximum 3 tablets daily.',
    sideEffects: ['Nausea', 'Stomach upset', 'Nervousness'],
    warnings: ['Contains caffeine', 'Not for regular use'],
    storage: 'Store in a cool, dry place'
  },
  'dart': {
    name: 'Dart',
    genericName: 'Paracetamol + Caffeine',
    category: 'Analgesic',
    usage: 'Headache and mild pain.',
    dosage: '1-2 tablets every 4-6 hours.',
    sideEffects: ['Nervousness', 'Insomnia'],
    warnings: ['Contains caffeine', 'Limit other caffeine intake'],
    storage: 'Store in a cool place'
  },

  // Allergies & Antihistamines
  'cetirizine': {
    name: 'Cetirizine',
    genericName: 'Cetirizine Hydrochloride',
    category: 'Antihistamine',
    usage: 'Relief of allergy symptoms such as sneezing, runny nose, watery eyes, and itching. Also for hives and chronic urticaria.',
    dosage: 'Adults: 10mg once daily. Children 6-12: 5mg twice daily or 10mg once daily.',
    sideEffects: ['Drowsiness', 'Dry mouth', 'Fatigue', 'Headache'],
    warnings: ['May cause drowsiness', 'Avoid alcohol'],
    interactions: ['Alcohol', 'CNS depressants'],
    storage: 'Store at room temperature'
  },
  'zyrtec': {
    name: 'Zyrtec',
    genericName: 'Cetirizine 10mg',
    category: 'Antihistamine',
    usage: 'Allergic rhinitis and urticaria.',
    dosage: '1 tablet once daily.',
    sideEffects: ['Drowsiness', 'Dry mouth'],
    warnings: ['May cause drowsiness', 'Take at bedtime if drowsy'],
    storage: 'Store below 25°C'
  },
  'okacet': {
    name: 'Okacet',
    genericName: 'Cetirizine 10mg',
    category: 'Antihistamine',
    usage: 'Allergies, hay fever, and skin allergies.',
    dosage: '1 tablet once daily.',
    sideEffects: ['Mild drowsiness', 'Dry mouth'],
    warnings: ['Avoid driving if drowsy'],
    storage: 'Store in a cool, dry place'
  },
  'loratadine': {
    name: 'Loratadine',
    genericName: 'Loratadine',
    category: 'Antihistamine (Non-sedating)',
    usage: 'Allergy symptoms including sneezing, runny nose, and itchy eyes. Less likely to cause drowsiness.',
    dosage: '10mg once daily.',
    sideEffects: ['Headache', 'Dry mouth', 'Fatigue', 'Stomach upset'],
    warnings: ['Avoid in severe liver impairment'],
    storage: 'Store at room temperature'
  },
  'claritin': {
    name: 'Claritin',
    genericName: 'Loratadine 10mg',
    category: 'Antihistamine',
    usage: 'Non-drowsy allergy relief.',
    dosage: '1 tablet once daily.',
    sideEffects: ['Headache', 'Dry mouth'],
    warnings: ['Non-drowsy formula', 'Safe for daytime use'],
    storage: 'Store at room temperature'
  },
  'fexofenadine': {
    name: 'Fexofenadine',
    genericName: 'Fexofenadine Hydrochloride',
    category: 'Antihistamine (Non-sedating)',
    usage: 'Seasonal allergic rhinitis and chronic urticaria.',
    dosage: '120mg or 180mg once daily.',
    sideEffects: ['Headache', 'Nausea', 'Dizziness'],
    warnings: ['Take without fruit juice', 'Does not typically cause drowsiness'],
    storage: 'Store below 25°C'
  },
  'allegra': {
    name: 'Allegra',
    genericName: 'Fexofenadine 120mg/180mg',
    category: 'Antihistamine',
    usage: 'Seasonal allergies and chronic hives.',
    dosage: '1 tablet once daily.',
    sideEffects: ['Headache', 'Nausea'],
    warnings: ['Avoid fruit juices within 4 hours', 'Non-drowsy'],
    storage: 'Store at room temperature'
  },
  'diphenhydramine': {
    name: 'Diphenhydramine',
    genericName: 'Diphenhydramine Hydrochloride',
    category: 'Antihistamine / Sleep Aid',
    usage: 'Allergy symptoms, sleep aid, and motion sickness.',
    dosage: 'Allergy: 25-50mg every 4-6 hours. Sleep: 50mg at bedtime.',
    sideEffects: ['Significant drowsiness', 'Dry mouth', 'Dizziness', 'Constipation'],
    warnings: ['Causes drowsiness', 'Do not drive', 'Not for elderly'],
    storage: 'Store at room temperature'
  },
  'benadryl': {
    name: 'Benadryl',
    genericName: 'Diphenhydramine 25mg',
    category: 'Antihistamine',
    usage: 'Allergies, itching, and sleep aid.',
    dosage: '1-2 tablets every 4-6 hours.',
    sideEffects: ['Drowsiness', 'Dry mouth', 'Dizziness'],
    warnings: ['Causes significant drowsiness', 'Avoid driving'],
    storage: 'Store below 25°C'
  },
  'chlorpheniramine': {
    name: 'Chlorpheniramine',
    genericName: 'Chlorpheniramine Maleate',
    category: 'Antihistamine',
    usage: 'Allergies, hay fever, and common cold symptoms.',
    dosage: '4mg every 4-6 hours. Maximum 24mg daily.',
    sideEffects: ['Drowsiness', 'Dry mouth', 'Blurred vision'],
    warnings: ['May cause drowsiness', 'Avoid alcohol'],
    storage: 'Store in a cool, dry place'
  },
  'piriton': {
    name: 'Piriton',
    genericName: 'Chlorpheniramine 4mg',
    category: 'Antihistamine',
    usage: 'Allergies and itching.',
    dosage: '1 tablet every 4-6 hours.',
    sideEffects: ['Drowsiness', 'Dry mouth'],
    warnings: ['Causes drowsiness', 'Take at bedtime if possible'],
    storage: 'Store in a dry place'
  },
  'levocet': {
    name: 'Levocet',
    genericName: 'Levocetirizine 5mg',
    category: 'Antihistamine',
    usage: 'Allergic rhinitis and urticaria.',
    dosage: '1 tablet once daily in the evening.',
    sideEffects: ['Drowsiness', 'Dry mouth', 'Fatigue'],
    warnings: ['May cause drowsiness', 'Take in evening'],
    storage: 'Store below 25°C'
  },
  'montair lc': {
    name: 'Montair LC',
    genericName: 'Montelukast 10mg + Levocetirizine 5mg',
    category: 'Antihistamine + Leukotriene Receptor Antagonist',
    usage: 'Allergic rhinitis, asthma, and chronic urticaria.',
    dosage: '1 tablet once daily in the evening.',
    sideEffects: ['Headache', 'Drowsiness', 'Abdominal pain'],
    warnings: ['Take in evening', 'Report mood changes'],
    storage: 'Store in a cool, dry place'
  },
  'avil': {
    name: 'Avil',
    genericName: 'Pheniramine Maleate',
    category: 'Antihistamine',
    usage: 'Allergies, itching, and allergic reactions.',
    dosage: '1 tablet 2-3 times daily.',
    sideEffects: ['Drowsiness', 'Dry mouth', 'Blurred vision'],
    warnings: ['Causes drowsiness', 'Avoid driving'],
    storage: 'Store in a cool, dry place'
  },

  // Gastrointestinal
  'omeprazole': {
    name: 'Omeprazole',
    genericName: 'Omeprazole',
    category: 'Proton Pump Inhibitor (PPI)',
    usage: 'Reduces stomach acid. Used for GERD, ulcers, and heartburn.',
    dosage: '20-40mg once daily before breakfast.',
    sideEffects: ['Headache', 'Stomach pain', 'Nausea', 'Diarrhea'],
    warnings: ['Take before meals', 'Long-term use may affect B12 absorption'],
    interactions: ['Clopidogrel', 'Methotrexate'],
    storage: 'Store in a dry place below 25°C'
  },
  'omez': {
    name: 'Omez',
    genericName: 'Omeprazole 20mg',
    category: 'PPI',
    usage: 'Acidity, GERD, and peptic ulcers.',
    dosage: '1 capsule before breakfast.',
    sideEffects: ['Headache', 'Nausea', 'Abdominal pain'],
    warnings: ['Take on empty stomach', 'Before breakfast'],
    storage: 'Store below 25°C'
  },
  'pantoprazole': {
    name: 'Pantoprazole',
    genericName: 'Pantoprazole Sodium',
    category: 'Proton Pump Inhibitor (PPI)',
    usage: 'GERD, erosive esophagitis, and Zollinger-Ellison syndrome.',
    dosage: '40mg once daily before breakfast.',
    sideEffects: ['Headache', 'Diarrhea', 'Nausea', 'Abdominal pain'],
    warnings: ['Take 30-60 minutes before food', 'Swallow whole'],
    storage: 'Store at room temperature'
  },
  'pan d': {
    name: 'Pan D',
    genericName: 'Pantoprazole 40mg + Domperidone 10mg',
    category: 'PPI + Prokinetic',
    usage: 'Acidity with bloating and nausea.',
    dosage: '1 capsule before breakfast.',
    sideEffects: ['Headache', 'Dry mouth', 'Diarrhea'],
    warnings: ['Take before meals', 'Not for prolonged use'],
    storage: 'Store below 25°C'
  },
  'rabeprazole': {
    name: 'Rabeprazole',
    genericName: 'Rabeprazole Sodium',
    category: 'Proton Pump Inhibitor (PPI)',
    usage: 'Acid reflux, GERD, and ulcers.',
    dosage: '20mg once daily before breakfast.',
    sideEffects: ['Headache', 'Diarrhea', 'Abdominal pain'],
    warnings: ['Take before meals on empty stomach'],
    storage: 'Store below 25°C'
  },
  'razo': {
    name: 'Razo',
    genericName: 'Rabeprazole 20mg',
    category: 'PPI',
    usage: 'GERD and peptic ulcers.',
    dosage: '1 tablet before breakfast.',
    sideEffects: ['Headache', 'Nausea'],
    warnings: ['Empty stomach in morning'],
    storage: 'Store in a cool, dry place'
  },
  'esomeprazole': {
    name: 'Esomeprazole',
    genericName: 'Esomeprazole Magnesium',
    category: 'Proton Pump Inhibitor (PPI)',
    usage: 'GERD, erosive esophagitis, and H. pylori infection.',
    dosage: '20-40mg once daily.',
    sideEffects: ['Headache', 'Nausea', 'Diarrhea', 'Flatulence'],
    warnings: ['Take at least 1 hour before meals'],
    storage: 'Store at room temperature'
  },
  'neksium': {
    name: 'Neksium',
    genericName: 'Esomeprazole 40mg',
    category: 'PPI',
    usage: 'Severe GERD and erosive esophagitis.',
    dosage: '1 tablet daily before food.',
    sideEffects: ['Headache', 'Abdominal pain'],
    warnings: ['Take 1 hour before meals'],
    storage: 'Store below 30°C'
  },
  'domperidone': {
    name: 'Domperidone',
    genericName: 'Domperidone',
    category: 'Prokinetic / Antiemetic',
    usage: 'Nausea, vomiting, and bloating. Speeds up stomach emptying.',
    dosage: '10mg 3 times daily before meals.',
    sideEffects: ['Dry mouth', 'Headache', 'Abdominal cramps'],
    warnings: ['Take 15-30 minutes before meals', 'Avoid in heart problems'],
    storage: 'Store below 25°C'
  },
  'domstal': {
    name: 'Domstal',
    genericName: 'Domperidone 10mg',
    category: 'Antiemetic',
    usage: 'Nausea and vomiting.',
    dosage: '1 tablet before meals, 3 times daily.',
    sideEffects: ['Dry mouth', 'Headache'],
    warnings: ['Take before food', 'Avoid in cardiac conditions'],
    storage: 'Store below 25°C'
  },
  'ondansetron': {
    name: 'Ondansetron',
    genericName: 'Ondansetron',
    category: 'Antiemetic',
    usage: 'Prevention and treatment of nausea and vomiting, especially from chemotherapy or surgery.',
    dosage: '4-8mg every 8 hours as needed.',
    sideEffects: ['Headache', 'Constipation', 'Dizziness'],
    warnings: ['May cause QT prolongation', 'Caution in liver disease'],
    storage: 'Store at room temperature'
  },
  'emeset': {
    name: 'Emeset',
    genericName: 'Ondansetron 4mg/8mg',
    category: 'Antiemetic',
    usage: 'Nausea and vomiting.',
    dosage: '1 tablet every 8 hours as needed.',
    sideEffects: ['Headache', 'Constipation'],
    warnings: ['Dissolve ODT on tongue', 'Do not swallow whole'],
    storage: 'Store below 30°C'
  },
  'antacid': {
    name: 'Antacid (General)',
    genericName: 'Aluminium/Magnesium Hydroxide',
    category: 'Antacid',
    usage: 'Quick relief from heartburn, indigestion, and sour stomach.',
    dosage: 'As directed on package, usually after meals.',
    sideEffects: ['Constipation (aluminum)', 'Diarrhea (magnesium)'],
    warnings: ['May interfere with other medications', 'Take 2 hours apart from other drugs'],
    storage: 'Store at room temperature'
  },
  'gelusil': {
    name: 'Gelusil',
    genericName: 'Aluminium Hydroxide + Magnesium Hydroxide + Simethicone',
    category: 'Antacid + Antiflatulent',
    usage: 'Acidity, heartburn, and gas.',
    dosage: '1-2 tablets after meals or as needed.',
    sideEffects: ['Constipation', 'Diarrhea'],
    warnings: ['Chew tablets before swallowing'],
    storage: 'Store in a cool, dry place'
  },
  'mucaine gel': {
    name: 'Mucaine Gel',
    genericName: 'Aluminium Hydroxide + Magnesium Hydroxide + Oxetacaine',
    category: 'Antacid + Local Anesthetic',
    usage: 'Acidity with pain, heartburn, and peptic ulcer pain.',
    dosage: '10-15ml 3-4 times daily.',
    sideEffects: ['Constipation', 'Nausea'],
    warnings: ['Shake well before use', 'Take between meals'],
    storage: 'Store below 25°C'
  },
  'eno': {
    name: 'Eno',
    genericName: 'Sodium Bicarbonate + Citric Acid',
    category: 'Antacid',
    usage: 'Quick relief from acidity and indigestion.',
    dosage: '1 sachet or 1 tsp in water as needed.',
    sideEffects: ['Bloating', 'Gas'],
    warnings: ['Not for regular use', 'High sodium content'],
    storage: 'Store in a dry place'
  },
  'digene': {
    name: 'Digene',
    genericName: 'Aluminium Hydroxide + Magnesium Hydroxide + Simethicone',
    category: 'Antacid + Antiflatulent',
    usage: 'Acidity, heartburn, gas, and bloating.',
    dosage: '1-2 tablets after meals or 10-20ml liquid.',
    sideEffects: ['Constipation', 'Diarrhea'],
    warnings: ['Chew tablets thoroughly', 'Take after meals'],
    storage: 'Store below 30°C'
  },
  'pudin hara': {
    name: 'Pudin Hara',
    genericName: 'Mentha Oil (Peppermint)',
    category: 'Digestive Aid (Herbal)',
    usage: 'Indigestion, stomach pain, gas, and nausea.',
    dosage: '1-2 pearls or 2-3 drops in water as needed.',
    sideEffects: ['Heartburn (in some)', 'Allergic reaction (rare)'],
    warnings: ['Not for infants', 'Avoid in GERD'],
    storage: 'Store in a cool place'
  },
  'hajmola': {
    name: 'Hajmola',
    genericName: 'Digestive Herbs + Black Salt',
    category: 'Digestive Aid (Ayurvedic)',
    usage: 'Indigestion and appetite stimulation.',
    dosage: '1-2 tablets after meals.',
    sideEffects: ['High sodium intake'],
    warnings: ['Contains salt - use with caution in hypertension'],
    storage: 'Store in a dry place'
  },
  'loperamide': {
    name: 'Loperamide',
    genericName: 'Loperamide Hydrochloride',
    category: 'Antidiarrheal',
    usage: 'Acute and chronic diarrhea.',
    dosage: '4mg initially, then 2mg after each loose stool. Maximum 16mg daily.',
    sideEffects: ['Constipation', 'Abdominal cramps', 'Nausea'],
    warnings: ['Not for bacterial diarrhea', 'Stop if no improvement in 48 hours'],
    storage: 'Store at room temperature'
  },
  'imodium': {
    name: 'Imodium',
    genericName: 'Loperamide 2mg',
    category: 'Antidiarrheal',
    usage: 'Diarrhea control.',
    dosage: '2 capsules initially, then 1 after each loose stool.',
    sideEffects: ['Constipation', 'Bloating'],
    warnings: ['Not for bloody diarrhea', 'Stay hydrated'],
    storage: 'Store below 25°C'
  },
  'eldoper': {
    name: 'Eldoper',
    genericName: 'Loperamide 2mg',
    category: 'Antidiarrheal',
    usage: 'Acute diarrhea.',
    dosage: '2 capsules initially, then 1 after each loose motion.',
    sideEffects: ['Constipation', 'Abdominal pain'],
    warnings: ['Not for children under 6', 'Not for dysentery'],
    storage: 'Store in a cool, dry place'
  },
  'ors': {
    name: 'ORS (Oral Rehydration Salts)',
    genericName: 'Sodium Chloride + Potassium Chloride + Glucose',
    category: 'Rehydration Solution',
    usage: 'Dehydration from diarrhea, vomiting, or excessive sweating.',
    dosage: 'Dissolve 1 packet in 1 liter of water. Sip frequently.',
    sideEffects: ['Vomiting if consumed too quickly'],
    warnings: ['Use clean water', 'Discard after 24 hours', 'Do not add sugar'],
    storage: 'Store in a cool, dry place'
  },
  'electral': {
    name: 'Electral',
    genericName: 'ORS (Oral Rehydration Salts)',
    category: 'Rehydration Solution',
    usage: 'Dehydration from diarrhea and vomiting.',
    dosage: 'Mix with 1 liter water. Drink as needed.',
    sideEffects: ['Nausea if taken too fast'],
    warnings: ['Prepare fresh', 'Use within 24 hours'],
    storage: 'Store in a dry place'
  },

  // Antibiotics
  'amoxicillin': {
    name: 'Amoxicillin',
    genericName: 'Amoxicillin',
    category: 'Antibiotic (Penicillin)',
    usage: 'Bacterial infections including respiratory, ear, throat, urinary, and skin infections.',
    dosage: '250-500mg every 8 hours for 7-10 days.',
    sideEffects: ['Diarrhea', 'Nausea', 'Skin rash', 'Allergic reactions'],
    warnings: ['Complete full course', 'Check for penicillin allergy', 'Take with or without food'],
    interactions: ['Methotrexate', 'Warfarin'],
    storage: 'Store below 25°C'
  },
  'mox': {
    name: 'Mox',
    genericName: 'Amoxicillin 250mg/500mg',
    category: 'Antibiotic',
    usage: 'Respiratory and urinary tract infections.',
    dosage: '1 capsule 3 times daily.',
    sideEffects: ['Diarrhea', 'Rash', 'Nausea'],
    warnings: ['Complete full course', 'Check penicillin allergy'],
    storage: 'Store below 25°C'
  },
  'augmentin': {
    name: 'Augmentin',
    genericName: 'Amoxicillin + Clavulanate',
    category: 'Antibiotic (Penicillin + Beta-lactamase inhibitor)',
    usage: 'Bacterial infections resistant to amoxicillin alone.',
    dosage: '625mg every 8 hours with food.',
    sideEffects: ['Diarrhea', 'Nausea', 'Skin rash', 'Vomiting'],
    warnings: ['Take with food', 'Complete full course', 'Monitor for allergic reactions'],
    storage: 'Store below 25°C'
  },
  'azithromycin': {
    name: 'Azithromycin',
    genericName: 'Azithromycin',
    category: 'Antibiotic (Macrolide)',
    usage: 'Respiratory infections, skin infections, ear infections, and STIs.',
    dosage: '500mg day 1, then 250mg days 2-5. Or 500mg daily for 3 days.',
    sideEffects: ['Nausea', 'Diarrhea', 'Abdominal pain', 'Headache'],
    warnings: ['Complete full course', 'May cause QT prolongation'],
    interactions: ['Antacids', 'Warfarin'],
    storage: 'Store at room temperature'
  },
  'azithral': {
    name: 'Azithral',
    genericName: 'Azithromycin 500mg',
    category: 'Antibiotic (Macrolide)',
    usage: 'Bacterial infections.',
    dosage: '1 tablet daily for 3 days.',
    sideEffects: ['Stomach upset', 'Diarrhea'],
    warnings: ['Complete course even if better', 'Take 1 hour before food'],
    storage: 'Store in a cool, dry place'
  },
  'ciprofloxacin': {
    name: 'Ciprofloxacin',
    genericName: 'Ciprofloxacin',
    category: 'Antibiotic (Fluoroquinolone)',
    usage: 'Urinary tract infections, respiratory infections, and gastrointestinal infections.',
    dosage: '250-500mg every 12 hours for 7-14 days.',
    sideEffects: ['Nausea', 'Diarrhea', 'Dizziness', 'Tendon problems'],
    warnings: ['Avoid with dairy products', 'Stay hydrated', 'Avoid sun exposure'],
    interactions: ['Antacids', 'Theophylline', 'Warfarin'],
    storage: 'Store at room temperature'
  },
  'ciplox': {
    name: 'Ciplox',
    genericName: 'Ciprofloxacin 500mg',
    category: 'Antibiotic (Fluoroquinolone)',
    usage: 'UTI, respiratory, and GI infections.',
    dosage: '1 tablet twice daily.',
    sideEffects: ['Nausea', 'Headache', 'Tendon pain'],
    warnings: ['Avoid antacids', 'Complete full course'],
    storage: 'Store below 25°C'
  },
  'ofloxacin': {
    name: 'Ofloxacin',
    genericName: 'Ofloxacin',
    category: 'Antibiotic (Fluoroquinolone)',
    usage: 'Respiratory, urinary, and skin infections.',
    dosage: '200-400mg every 12 hours.',
    sideEffects: ['Nausea', 'Headache', 'Dizziness', 'Tendon issues'],
    warnings: ['Avoid excessive sun', 'Complete full course'],
    storage: 'Store at room temperature'
  },
  'norfloxacin': {
    name: 'Norfloxacin',
    genericName: 'Norfloxacin',
    category: 'Antibiotic (Fluoroquinolone)',
    usage: 'Urinary tract infections and diarrhea.',
    dosage: '400mg every 12 hours for 3-10 days.',
    sideEffects: ['Nausea', 'Headache', 'Dizziness'],
    warnings: ['Take on empty stomach', 'Drink plenty of fluids'],
    storage: 'Store below 25°C'
  },
  'norflox': {
    name: 'Norflox',
    genericName: 'Norfloxacin 400mg',
    category: 'Antibiotic',
    usage: 'UTI and gastrointestinal infections.',
    dosage: '1 tablet twice daily.',
    sideEffects: ['Nausea', 'Dizziness'],
    warnings: ['Take 1 hour before or 2 hours after meals'],
    storage: 'Store in a dry place'
  },
  'cephalexin': {
    name: 'Cephalexin',
    genericName: 'Cephalexin',
    category: 'Antibiotic (Cephalosporin)',
    usage: 'Skin, respiratory, and urinary tract infections.',
    dosage: '250-500mg every 6 hours.',
    sideEffects: ['Diarrhea', 'Nausea', 'Allergic reactions'],
    warnings: ['Complete full course', 'Cross-reactivity with penicillin allergy possible'],
    storage: 'Store at room temperature'
  },
  'sporidex': {
    name: 'Sporidex',
    genericName: 'Cephalexin 500mg',
    category: 'Antibiotic (Cephalosporin)',
    usage: 'Bacterial infections.',
    dosage: '1 capsule every 6-8 hours.',
    sideEffects: ['Diarrhea', 'Stomach upset'],
    warnings: ['Take with or without food', 'Complete course'],
    storage: 'Store below 25°C'
  },
  'cefixime': {
    name: 'Cefixime',
    genericName: 'Cefixime',
    category: 'Antibiotic (Cephalosporin)',
    usage: 'Respiratory infections, UTI, and ear infections.',
    dosage: '400mg once daily or 200mg twice daily.',
    sideEffects: ['Diarrhea', 'Stomach pain', 'Nausea'],
    warnings: ['Complete prescribed course'],
    storage: 'Store below 25°C'
  },
  'taxim o': {
    name: 'Taxim O',
    genericName: 'Cefixime 200mg',
    category: 'Antibiotic',
    usage: 'Respiratory and urinary tract infections.',
    dosage: '1 tablet twice daily.',
    sideEffects: ['Diarrhea', 'Nausea'],
    warnings: ['Complete full course'],
    storage: 'Store in a cool, dry place'
  },
  'metronidazole': {
    name: 'Metronidazole',
    genericName: 'Metronidazole',
    category: 'Antibiotic / Antiprotozoal',
    usage: 'Bacterial and parasitic infections, including dental and GI infections.',
    dosage: '400mg 3 times daily for 7 days.',
    sideEffects: ['Nausea', 'Metallic taste', 'Headache', 'Dark urine'],
    warnings: ['Avoid alcohol completely', 'Complete full course'],
    interactions: ['Alcohol', 'Warfarin', 'Lithium'],
    storage: 'Store in a dark place'
  },
  'flagyl': {
    name: 'Flagyl',
    genericName: 'Metronidazole 400mg',
    category: 'Antibiotic',
    usage: 'Parasitic and bacterial infections.',
    dosage: '1 tablet 3 times daily.',
    sideEffects: ['Metallic taste', 'Nausea', 'Headache'],
    warnings: ['No alcohol during treatment and 48 hours after'],
    storage: 'Store away from light'
  },
  'doxycycline': {
    name: 'Doxycycline',
    genericName: 'Doxycycline',
    category: 'Antibiotic (Tetracycline)',
    usage: 'Respiratory infections, acne, malaria prevention, and tick-borne diseases.',
    dosage: '100mg once or twice daily.',
    sideEffects: ['Photosensitivity', 'Nausea', 'Esophageal irritation'],
    warnings: ['Take with plenty of water', 'Avoid sun exposure', 'Not for children under 8'],
    interactions: ['Antacids', 'Iron supplements', 'Dairy products'],
    storage: 'Store at room temperature'
  },

  // Cold & Cough Medicines
  'cheston cold': {
    name: 'Cheston Cold',
    genericName: 'Cetirizine 5mg + Phenylephrine 10mg + Paracetamol 325mg',
    category: 'Cold & Flu Combination',
    usage: 'Relief from common cold symptoms including runny nose, sneezing, nasal congestion, headache, and body aches.',
    dosage: '1 tablet every 4-6 hours as needed. Maximum 4 tablets per day.',
    sideEffects: ['Drowsiness', 'Dry mouth', 'Dizziness', 'Nausea', 'Palpitations'],
    warnings: ['May cause drowsiness - avoid driving', 'Not for children under 12', 'Avoid in hypertension', 'Do not use with other paracetamol products'],
    interactions: ['MAO inhibitors', 'Other antihistamines', 'Alcohol', 'Sedatives'],
    storage: 'Store below 25°C in a dry place'
  },
  'sinarest': {
    name: 'Sinarest',
    genericName: 'Paracetamol + Phenylephrine + Chlorpheniramine',
    category: 'Cold & Flu Combination',
    usage: 'Cold, flu, sinusitis, and nasal congestion relief.',
    dosage: '1 tablet 3-4 times daily.',
    sideEffects: ['Drowsiness', 'Dry mouth', 'Dizziness'],
    warnings: ['Causes drowsiness', 'Avoid in hypertension', 'Not for prolonged use'],
    storage: 'Store in a cool, dry place'
  },
  'vicks action 500': {
    name: 'Vicks Action 500',
    genericName: 'Paracetamol + Phenylephrine + Caffeine',
    category: 'Cold & Flu Combination',
    usage: 'Headache, body ache, cold, and congestion.',
    dosage: '1-2 tablets every 4-6 hours. Maximum 8 tablets daily.',
    sideEffects: ['Nervousness', 'Insomnia', 'Nausea'],
    warnings: ['Contains caffeine', 'Avoid late evening doses', 'Not for children under 12'],
    storage: 'Store below 30°C'
  },
  'benadryl cough syrup': {
    name: 'Benadryl Cough Syrup',
    genericName: 'Diphenhydramine + Ammonium Chloride',
    category: 'Cough Suppressant',
    usage: 'Dry cough, allergic cough, and cold symptoms.',
    dosage: '10ml every 4-6 hours. Maximum 4 doses daily.',
    sideEffects: ['Drowsiness', 'Dry mouth', 'Dizziness'],
    warnings: ['Causes significant drowsiness', 'Do not drive', 'Avoid alcohol'],
    storage: 'Store below 25°C'
  },
  'grilinctus': {
    name: 'Grilinctus',
    genericName: 'Dextromethorphan + Phenylephrine + Chlorpheniramine',
    category: 'Cough & Cold',
    usage: 'Cough, cold, and nasal congestion.',
    dosage: '10ml 3-4 times daily.',
    sideEffects: ['Drowsiness', 'Nausea', 'Dizziness'],
    warnings: ['Causes drowsiness', 'Not for children under 6'],
    storage: 'Store in a cool place'
  },
  'alex': {
    name: 'Alex Cough Syrup',
    genericName: 'Phenylephrine + Chlorpheniramine + Dextromethorphan',
    category: 'Cough Suppressant',
    usage: 'Dry cough, allergic cough, nasal congestion.',
    dosage: '5-10ml 3-4 times daily.',
    sideEffects: ['Drowsiness', 'Dry mouth', 'Constipation'],
    warnings: ['May cause drowsiness', 'Avoid in glaucoma'],
    storage: 'Store below 25°C'
  },
  'honitus': {
    name: 'Honitus',
    genericName: 'Honey + Tulsi + Mulethi (Herbal)',
    category: 'Cough Syrup (Ayurvedic)',
    usage: 'Cough, sore throat, and respiratory relief.',
    dosage: '10-15ml 3 times daily.',
    sideEffects: ['Rare allergic reactions'],
    warnings: ['Natural product - results may vary', 'Consult doctor if symptoms persist'],
    storage: 'Store in a cool, dry place'
  },
  'koflet': {
    name: 'Koflet',
    genericName: 'Herbal Cough Lozenge',
    category: 'Cough Relief (Ayurvedic)',
    usage: 'Sore throat and cough relief.',
    dosage: '1-2 lozenges as needed.',
    sideEffects: ['Rare allergic reactions'],
    warnings: ['Not for children under 5'],
    storage: 'Store in a cool, dry place'
  },
  'strepsils': {
    name: 'Strepsils',
    genericName: 'Amylmetacresol + Dichlorobenzyl Alcohol',
    category: 'Throat Lozenge',
    usage: 'Sore throat relief.',
    dosage: '1 lozenge every 2-3 hours. Maximum 12 daily.',
    sideEffects: ['Mouth irritation (rare)'],
    warnings: ['Dissolve slowly in mouth', 'Not for children under 6'],
    storage: 'Store at room temperature'
  },

  // Blood Pressure Medicines
  'amlodipine': {
    name: 'Amlodipine',
    genericName: 'Amlodipine Besylate',
    category: 'Calcium Channel Blocker (Antihypertensive)',
    usage: 'High blood pressure (hypertension) and chest pain (angina).',
    dosage: '5-10mg once daily. Start with 5mg.',
    sideEffects: ['Swelling in ankles/feet', 'Dizziness', 'Flushing', 'Headache', 'Fatigue'],
    warnings: ['Do not stop suddenly', 'Monitor blood pressure regularly', 'Report severe dizziness', 'Avoid grapefruit'],
    interactions: ['Simvastatin', 'Cyclosporine', 'Other BP medications'],
    storage: 'Store at room temperature'
  },
  'amlokind': {
    name: 'Amlokind',
    genericName: 'Amlodipine 5mg',
    category: 'Calcium Channel Blocker',
    usage: 'Hypertension and angina.',
    dosage: '1 tablet once daily.',
    sideEffects: ['Ankle swelling', 'Headache', 'Flushing'],
    warnings: ['Take at same time daily', 'Do not stop abruptly'],
    storage: 'Store below 30°C'
  },
  'telma': {
    name: 'Telma',
    genericName: 'Telmisartan 40mg',
    category: 'ARB (Angiotensin Receptor Blocker)',
    usage: 'High blood pressure and cardiovascular protection.',
    dosage: '40-80mg once daily.',
    sideEffects: ['Dizziness', 'Back pain', 'Diarrhea', 'Upper respiratory infection'],
    warnings: ['Not for pregnant women', 'Monitor kidney function', 'May cause hyperkalemia'],
    interactions: ['NSAIDs', 'Potassium supplements', 'Lithium'],
    storage: 'Store below 30°C'
  },
  'telma h': {
    name: 'Telma H',
    genericName: 'Telmisartan 40mg + Hydrochlorothiazide 12.5mg',
    category: 'ARB + Diuretic',
    usage: 'High blood pressure when single drug is not sufficient.',
    dosage: '1 tablet once daily.',
    sideEffects: ['Dizziness', 'Dehydration', 'Electrolyte imbalance'],
    warnings: ['Stay hydrated', 'Monitor electrolytes', 'Not in pregnancy'],
    storage: 'Store in a dry place'
  },
  'atenolol': {
    name: 'Atenolol',
    genericName: 'Atenolol',
    category: 'Beta Blocker',
    usage: 'High blood pressure, angina, and heart rhythm disorders.',
    dosage: '25-100mg once daily.',
    sideEffects: ['Fatigue', 'Cold hands/feet', 'Dizziness', 'Slow heartbeat'],
    warnings: ['Do not stop suddenly', 'May mask low blood sugar symptoms', 'Avoid in asthma'],
    interactions: ['Calcium channel blockers', 'Digoxin', 'Clonidine'],
    storage: 'Store at room temperature'
  },
  'metoprolol': {
    name: 'Metoprolol',
    genericName: 'Metoprolol Tartrate/Succinate',
    category: 'Beta Blocker',
    usage: 'Hypertension, angina, heart failure, and after heart attack.',
    dosage: '25-200mg daily in divided doses.',
    sideEffects: ['Fatigue', 'Dizziness', 'Slow heart rate', 'Depression'],
    warnings: ['Do not discontinue abruptly', 'Avoid in severe asthma'],
    interactions: ['Verapamil', 'Diltiazem', 'Antidiabetic drugs'],
    storage: 'Store below 25°C'
  },
  'losartan': {
    name: 'Losartan',
    genericName: 'Losartan Potassium',
    category: 'ARB (Angiotensin Receptor Blocker)',
    usage: 'High blood pressure and kidney protection in diabetes.',
    dosage: '50-100mg once daily.',
    sideEffects: ['Dizziness', 'Fatigue', 'Hyperkalemia', 'Cough (rare)'],
    warnings: ['Avoid in pregnancy', 'Monitor potassium levels', 'Stay hydrated'],
    interactions: ['Potassium supplements', 'NSAIDs', 'Lithium'],
    storage: 'Store at room temperature'
  },
  'ramipril': {
    name: 'Ramipril',
    genericName: 'Ramipril',
    category: 'ACE Inhibitor',
    usage: 'High blood pressure, heart failure, and post-heart attack care.',
    dosage: '2.5-10mg once daily.',
    sideEffects: ['Dry cough', 'Dizziness', 'Hyperkalemia', 'Angioedema (rare)'],
    warnings: ['Not for pregnant women', 'Report persistent cough', 'Monitor kidney function'],
    interactions: ['NSAIDs', 'Potassium-sparing diuretics', 'Lithium'],
    storage: 'Store below 25°C'
  },
  'enalapril': {
    name: 'Enalapril',
    genericName: 'Enalapril Maleate',
    category: 'ACE Inhibitor',
    usage: 'Hypertension and heart failure.',
    dosage: '5-40mg daily in 1-2 doses.',
    sideEffects: ['Dry cough', 'Dizziness', 'Headache', 'Fatigue'],
    warnings: ['Avoid in pregnancy', 'Monitor kidney function'],
    storage: 'Store at room temperature'
  },
  'olmesartan': {
    name: 'Olmesartan',
    genericName: 'Olmesartan Medoxomil',
    category: 'ARB',
    usage: 'High blood pressure.',
    dosage: '20-40mg once daily.',
    sideEffects: ['Dizziness', 'Diarrhea', 'Upper respiratory infection'],
    warnings: ['Not in pregnancy', 'May cause sprue-like enteropathy'],
    storage: 'Store below 30°C'
  },
  'lisinopril': {
    name: 'Lisinopril',
    genericName: 'Lisinopril',
    category: 'ACE Inhibitor',
    usage: 'High blood pressure and heart failure.',
    dosage: '10-40mg once daily.',
    sideEffects: ['Dry cough', 'Dizziness', 'Headache'],
    warnings: ['Not in pregnancy', 'Monitor kidney function'],
    storage: 'Store at room temperature'
  },
  'telmikind': {
    name: 'Telmikind',
    genericName: 'Telmisartan 40mg',
    category: 'ARB',
    usage: 'Hypertension.',
    dosage: '1 tablet once daily.',
    sideEffects: ['Dizziness', 'Back pain'],
    warnings: ['Take at same time daily'],
    storage: 'Store below 30°C'
  },
  'cardace': {
    name: 'Cardace',
    genericName: 'Ramipril 2.5mg/5mg',
    category: 'ACE Inhibitor',
    usage: 'Hypertension and heart protection.',
    dosage: '1 tablet once daily.',
    sideEffects: ['Dry cough', 'Dizziness'],
    warnings: ['Not in pregnancy', 'Report swelling'],
    storage: 'Store below 25°C'
  },

  // Diabetes Medicines
  'metformin': {
    name: 'Metformin',
    genericName: 'Metformin Hydrochloride',
    category: 'Biguanide (Antidiabetic)',
    usage: 'Type 2 diabetes mellitus. First-line treatment for blood sugar control.',
    dosage: '500-1000mg twice daily with meals.',
    sideEffects: ['Nausea', 'Diarrhea', 'Stomach upset', 'Metallic taste'],
    warnings: ['Take with food', 'Monitor kidney function', 'Stop before contrast procedures'],
    interactions: ['Alcohol', 'Iodinated contrast', 'Cimetidine'],
    storage: 'Store below 30°C'
  },
  'glycomet': {
    name: 'Glycomet',
    genericName: 'Metformin 500mg',
    category: 'Antidiabetic',
    usage: 'Type 2 diabetes management.',
    dosage: '500mg-1000mg twice daily with meals.',
    sideEffects: ['Nausea', 'Diarrhea', 'Abdominal discomfort'],
    warnings: ['Take with meals', 'Avoid in kidney disease', 'Monitor blood sugar'],
    storage: 'Store below 30°C'
  },
  'glucophage': {
    name: 'Glucophage',
    genericName: 'Metformin 500mg/850mg',
    category: 'Antidiabetic',
    usage: 'Type 2 diabetes.',
    dosage: '1 tablet with meals, 2-3 times daily.',
    sideEffects: ['GI upset', 'Diarrhea', 'Metallic taste'],
    warnings: ['Take with food', 'Avoid excess alcohol'],
    storage: 'Store at room temperature'
  },
  'glimepiride': {
    name: 'Glimepiride',
    genericName: 'Glimepiride',
    category: 'Sulfonylurea (Antidiabetic)',
    usage: 'Type 2 diabetes. Stimulates insulin release.',
    dosage: '1-4mg once daily with breakfast.',
    sideEffects: ['Hypoglycemia', 'Weight gain', 'Dizziness'],
    warnings: ['Take with breakfast', 'Monitor blood sugar', 'Eat regular meals'],
    interactions: ['Alcohol', 'Beta-blockers', 'NSAIDs'],
    storage: 'Store at room temperature'
  },
  'amaryl': {
    name: 'Amaryl',
    genericName: 'Glimepiride 1mg/2mg',
    category: 'Sulfonylurea',
    usage: 'Type 2 diabetes.',
    dosage: '1 tablet with breakfast.',
    sideEffects: ['Low blood sugar', 'Weight gain'],
    warnings: ['Never skip meals', 'Carry glucose tablets'],
    storage: 'Store below 25°C'
  },
  'gliclazide': {
    name: 'Gliclazide',
    genericName: 'Gliclazide',
    category: 'Sulfonylurea',
    usage: 'Type 2 diabetes.',
    dosage: '40-320mg daily with meals.',
    sideEffects: ['Hypoglycemia', 'Weight gain', 'GI upset'],
    warnings: ['Take with meals', 'Monitor blood sugar regularly'],
    storage: 'Store at room temperature'
  },
  'sitagliptin': {
    name: 'Sitagliptin',
    genericName: 'Sitagliptin Phosphate',
    category: 'DPP-4 Inhibitor',
    usage: 'Type 2 diabetes, often with metformin.',
    dosage: '100mg once daily.',
    sideEffects: ['Upper respiratory infection', 'Headache', 'Pancreatitis (rare)'],
    warnings: ['Report severe abdominal pain', 'Adjust dose in kidney impairment'],
    storage: 'Store at room temperature'
  },
  'januvia': {
    name: 'Januvia',
    genericName: 'Sitagliptin 100mg',
    category: 'DPP-4 Inhibitor',
    usage: 'Type 2 diabetes management.',
    dosage: '1 tablet once daily.',
    sideEffects: ['Cold symptoms', 'Headache', 'Stomach upset'],
    warnings: ['Can be taken with or without food', 'Monitor for signs of pancreatitis'],
    storage: 'Store below 30°C'
  },
  'dapagliflozin': {
    name: 'Dapagliflozin',
    genericName: 'Dapagliflozin',
    category: 'SGLT2 Inhibitor',
    usage: 'Type 2 diabetes and heart failure.',
    dosage: '10mg once daily in the morning.',
    sideEffects: ['Urinary tract infections', 'Genital yeast infections', 'Dehydration'],
    warnings: ['Stay well hydrated', 'Monitor for UTI symptoms'],
    storage: 'Store below 30°C'
  },
  'empagliflozin': {
    name: 'Empagliflozin',
    genericName: 'Empagliflozin',
    category: 'SGLT2 Inhibitor',
    usage: 'Type 2 diabetes and cardiovascular protection.',
    dosage: '10-25mg once daily.',
    sideEffects: ['Genital infections', 'UTI', 'Increased urination'],
    warnings: ['Maintain hydration', 'Watch for ketoacidosis symptoms'],
    storage: 'Store at room temperature'
  },
  'jardiance': {
    name: 'Jardiance',
    genericName: 'Empagliflozin 10mg/25mg',
    category: 'SGLT2 Inhibitor',
    usage: 'Type 2 diabetes with cardiovascular benefits.',
    dosage: '1 tablet once daily in morning.',
    sideEffects: ['UTI', 'Genital infections', 'Thirst'],
    warnings: ['Stay hydrated', 'Report signs of ketoacidosis'],
    storage: 'Store below 30°C'
  },
  'vildagliptin': {
    name: 'Vildagliptin',
    genericName: 'Vildagliptin',
    category: 'DPP-4 Inhibitor',
    usage: 'Type 2 diabetes.',
    dosage: '50mg twice daily.',
    sideEffects: ['Headache', 'Dizziness', 'Tremor'],
    warnings: ['Monitor liver function'],
    storage: 'Store at room temperature'
  },
  'galvus': {
    name: 'Galvus',
    genericName: 'Vildagliptin 50mg',
    category: 'DPP-4 Inhibitor',
    usage: 'Type 2 diabetes.',
    dosage: '1 tablet twice daily.',
    sideEffects: ['Headache', 'Nasopharyngitis'],
    warnings: ['Regular liver tests recommended'],
    storage: 'Store below 30°C'
  },
  'pioglitazone': {
    name: 'Pioglitazone',
    genericName: 'Pioglitazone',
    category: 'Thiazolidinedione',
    usage: 'Type 2 diabetes.',
    dosage: '15-45mg once daily.',
    sideEffects: ['Weight gain', 'Edema', 'Bone fractures'],
    warnings: ['Not in heart failure', 'Monitor for bladder cancer signs'],
    storage: 'Store at room temperature'
  },

  // Cholesterol Medicines
  'atorvastatin': {
    name: 'Atorvastatin',
    genericName: 'Atorvastatin Calcium',
    category: 'Statin',
    usage: 'High cholesterol and cardiovascular protection.',
    dosage: '10-80mg once daily, usually in the evening.',
    sideEffects: ['Muscle pain', 'Headache', 'Digestive issues', 'Liver enzyme elevation'],
    warnings: ['Report unexplained muscle pain', 'Regular liver tests', 'Avoid grapefruit'],
    interactions: ['Grapefruit juice', 'Fibrates', 'Certain antibiotics'],
    storage: 'Store at room temperature'
  },
  'atorva': {
    name: 'Atorva',
    genericName: 'Atorvastatin 10mg/20mg',
    category: 'Statin',
    usage: 'Cholesterol management.',
    dosage: '1 tablet daily in the evening.',
    sideEffects: ['Muscle aches', 'Headache'],
    warnings: ['Report muscle pain', 'Avoid grapefruit'],
    storage: 'Store in a cool, dry place'
  },
  'lipitor': {
    name: 'Lipitor',
    genericName: 'Atorvastatin',
    category: 'Statin',
    usage: 'High cholesterol and heart disease prevention.',
    dosage: '10-80mg once daily.',
    sideEffects: ['Muscle pain', 'Digestive upset'],
    warnings: ['Report muscle symptoms', 'Regular blood tests'],
    storage: 'Store at room temperature'
  },
  'rosuvastatin': {
    name: 'Rosuvastatin',
    genericName: 'Rosuvastatin Calcium',
    category: 'Statin',
    usage: 'High cholesterol and triglycerides.',
    dosage: '5-40mg once daily.',
    sideEffects: ['Muscle pain', 'Headache', 'Abdominal pain'],
    warnings: ['Start with low dose', 'Monitor liver enzymes'],
    storage: 'Store at room temperature'
  },
  'crestor': {
    name: 'Crestor',
    genericName: 'Rosuvastatin 10mg/20mg',
    category: 'Statin',
    usage: 'Cholesterol management.',
    dosage: '5-20mg once daily.',
    sideEffects: ['Muscle pain', 'Constipation', 'Nausea'],
    warnings: ['Can be taken any time of day', 'Regular blood tests needed'],
    storage: 'Store below 30°C'
  },
  'simvastatin': {
    name: 'Simvastatin',
    genericName: 'Simvastatin',
    category: 'Statin',
    usage: 'High cholesterol.',
    dosage: '10-40mg once daily in the evening.',
    sideEffects: ['Muscle pain', 'Constipation', 'Headache'],
    warnings: ['Take in evening', 'Avoid grapefruit', 'Report muscle pain'],
    storage: 'Store at room temperature'
  },
  'zocor': {
    name: 'Zocor',
    genericName: 'Simvastatin',
    category: 'Statin',
    usage: 'Cholesterol management.',
    dosage: '10-40mg in the evening.',
    sideEffects: ['Muscle aches', 'GI upset'],
    warnings: ['Evening dosing recommended'],
    storage: 'Store below 25°C'
  },
  'fenofibrate': {
    name: 'Fenofibrate',
    genericName: 'Fenofibrate',
    category: 'Fibrate',
    usage: 'High triglycerides and mixed dyslipidemia.',
    dosage: '145-200mg once daily with food.',
    sideEffects: ['Stomach upset', 'Muscle pain', 'Headache'],
    warnings: ['Take with food', 'Monitor liver and kidney function'],
    storage: 'Store at room temperature'
  },
  'ezetimibe': {
    name: 'Ezetimibe',
    genericName: 'Ezetimibe',
    category: 'Cholesterol Absorption Inhibitor',
    usage: 'High cholesterol, often with statins.',
    dosage: '10mg once daily.',
    sideEffects: ['Diarrhea', 'Fatigue', 'Muscle pain'],
    warnings: ['Can be taken any time', 'Monitor liver function with statins'],
    storage: 'Store at room temperature'
  },

  // Thyroid Medicines
  'levothyroxine': {
    name: 'Levothyroxine',
    genericName: 'Levothyroxine Sodium',
    category: 'Thyroid Hormone',
    usage: 'Hypothyroidism (underactive thyroid) and goiter.',
    dosage: '25-200mcg once daily on empty stomach.',
    sideEffects: ['Palpitations (if overdosed)', 'Weight loss', 'Anxiety', 'Tremor'],
    warnings: ['Take 30-60 minutes before breakfast', 'Do not change brands without consulting doctor'],
    interactions: ['Calcium supplements', 'Iron supplements', 'Antacids'],
    storage: 'Store at room temperature away from moisture'
  },
  'thyronorm': {
    name: 'Thyronorm',
    genericName: 'Levothyroxine Sodium',
    category: 'Thyroid Hormone',
    usage: 'Hypothyroidism and goiter.',
    dosage: '25-150mcg once daily before breakfast.',
    sideEffects: ['Rapid heartbeat', 'Tremor', 'Weight loss'],
    warnings: ['Take 30-60 min before food', 'Regular monitoring'],
    storage: 'Store below 25°C'
  },
  'eltroxin': {
    name: 'Eltroxin',
    genericName: 'Levothyroxine 25mcg/50mcg/100mcg',
    category: 'Thyroid Hormone',
    usage: 'Hypothyroidism treatment.',
    dosage: 'As prescribed, usually 25-100mcg daily.',
    sideEffects: ['Palpitations', 'Nervousness', 'Weight changes'],
    warnings: ['Empty stomach in morning', 'Separate from other medications by 4 hours'],
    storage: 'Store in a cool, dry place'
  },
  'thyrox': {
    name: 'Thyrox',
    genericName: 'Levothyroxine',
    category: 'Thyroid Hormone',
    usage: 'Hypothyroidism.',
    dosage: 'As prescribed, once daily before breakfast.',
    sideEffects: ['Palpitations', 'Heat intolerance', 'Anxiety'],
    warnings: ['Consistent timing important', 'Avoid with calcium/iron'],
    storage: 'Store at room temperature'
  },
  'carbimazole': {
    name: 'Carbimazole',
    genericName: 'Carbimazole',
    category: 'Antithyroid',
    usage: 'Hyperthyroidism (overactive thyroid).',
    dosage: '15-40mg daily initially, then maintenance 5-15mg.',
    sideEffects: ['Skin rash', 'Nausea', 'Headache', 'Joint pain'],
    warnings: ['Regular blood tests for WBC count', 'Report sore throat or fever immediately'],
    storage: 'Store at room temperature'
  },
  'methimazole': {
    name: 'Methimazole',
    genericName: 'Methimazole',
    category: 'Antithyroid',
    usage: 'Hyperthyroidism.',
    dosage: '5-30mg daily in divided doses.',
    sideEffects: ['Skin rash', 'Nausea', 'Agranulocytosis (rare)'],
    warnings: ['Report fever or sore throat', 'Regular blood tests'],
    storage: 'Store at room temperature'
  },
  'propylthiouracil': {
    name: 'Propylthiouracil (PTU)',
    genericName: 'Propylthiouracil',
    category: 'Antithyroid',
    usage: 'Hyperthyroidism, especially in pregnancy.',
    dosage: '100-400mg daily in divided doses.',
    sideEffects: ['Rash', 'Liver toxicity', 'Joint pain'],
    warnings: ['Monitor liver function', 'Report jaundice immediately'],
    storage: 'Store at room temperature'
  },

  // Vitamins & Supplements
  'vitamin c': {
    name: 'Vitamin C',
    genericName: 'Ascorbic Acid',
    category: 'Vitamin',
    usage: 'Immune support, antioxidant, and treating vitamin C deficiency.',
    dosage: '65-90mg daily. Up to 1000mg for immune support.',
    sideEffects: ['Stomach upset at high doses', 'Diarrhea'],
    warnings: ['High doses may cause kidney stones in susceptible individuals'],
    storage: 'Store in a cool, dry place'
  },
  'limcee': {
    name: 'Limcee',
    genericName: 'Vitamin C 500mg',
    category: 'Vitamin',
    usage: 'Vitamin C supplementation and immunity.',
    dosage: '1 tablet daily.',
    sideEffects: ['Stomach upset (high doses)'],
    warnings: ['Take with food if stomach upset occurs'],
    storage: 'Store below 25°C'
  },
  'celin': {
    name: 'Celin',
    genericName: 'Vitamin C 500mg',
    category: 'Vitamin',
    usage: 'Immunity and skin health.',
    dosage: '1 tablet daily.',
    sideEffects: ['Rare at normal doses'],
    warnings: ['Chew or dissolve in water'],
    storage: 'Store in a cool, dry place'
  },
  'vitamin d': {
    name: 'Vitamin D',
    genericName: 'Cholecalciferol (Vitamin D3)',
    category: 'Vitamin',
    usage: 'Bone health, calcium absorption, and vitamin D deficiency.',
    dosage: '600-2000 IU daily or as prescribed.',
    sideEffects: ['Rare at normal doses', 'Hypercalcemia at high doses'],
    warnings: ['Take with fatty food for better absorption'],
    storage: 'Store away from heat and light'
  },
  'calcirol': {
    name: 'Calcirol',
    genericName: 'Cholecalciferol 60000 IU',
    category: 'Vitamin D Supplement',
    usage: 'Vitamin D deficiency.',
    dosage: 'Usually 1 sachet weekly for 8 weeks, then monthly maintenance.',
    sideEffects: ['Nausea', 'Constipation', 'Weakness at toxic levels'],
    warnings: ['Take only as prescribed', 'Monitor calcium levels'],
    storage: 'Store in a cool, dry place'
  },
  'd rise': {
    name: 'D-Rise',
    genericName: 'Cholecalciferol 60000 IU',
    category: 'Vitamin D',
    usage: 'Vitamin D deficiency.',
    dosage: 'Once weekly as prescribed.',
    sideEffects: ['Rare at correct doses'],
    warnings: ['Follow doctor\'s dosing schedule'],
    storage: 'Store at room temperature'
  },
  'calcium': {
    name: 'Calcium',
    genericName: 'Calcium Carbonate/Citrate',
    category: 'Mineral Supplement',
    usage: 'Bone health and calcium deficiency.',
    dosage: '500-1000mg daily with vitamin D.',
    sideEffects: ['Constipation', 'Bloating', 'Gas'],
    warnings: ['Take with food', 'Space from other medications'],
    storage: 'Store in a cool, dry place'
  },
  'shelcal': {
    name: 'Shelcal',
    genericName: 'Calcium Carbonate 500mg + Vitamin D3 250 IU',
    category: 'Calcium + Vitamin D',
    usage: 'Calcium and vitamin D supplementation.',
    dosage: '1 tablet twice daily.',
    sideEffects: ['Constipation', 'Gas'],
    warnings: ['Take after meals', 'Separate from iron supplements'],
    storage: 'Store in a dry place'
  },
  'supracal': {
    name: 'Supracal',
    genericName: 'Calcium + Vitamin D',
    category: 'Calcium Supplement',
    usage: 'Bone health.',
    dosage: '1-2 tablets daily.',
    sideEffects: ['Constipation'],
    warnings: ['Take with meals'],
    storage: 'Store at room temperature'
  },
  'b complex': {
    name: 'B Complex',
    genericName: 'Vitamin B Complex',
    category: 'Vitamin Supplement',
    usage: 'Energy metabolism, nervous system support, and B vitamin deficiency.',
    dosage: '1 tablet daily with food.',
    sideEffects: ['Bright yellow urine', 'Mild nausea'],
    warnings: ['Take with food for better absorption'],
    storage: 'Store in a cool, dry place'
  },
  'becosules': {
    name: 'Becosules',
    genericName: 'B-Complex + Vitamin C',
    category: 'Vitamin Supplement',
    usage: 'Vitamin B and C supplementation, energy, and immunity.',
    dosage: '1 capsule daily.',
    sideEffects: ['Bright yellow urine', 'Mild nausea'],
    warnings: ['Take with food for better absorption'],
    storage: 'Store below 25°C'
  },
  'neurobion forte': {
    name: 'Neurobion Forte',
    genericName: 'Vitamin B1 + B6 + B12',
    category: 'Vitamin B Supplement',
    usage: 'Nerve health, tingling, numbness, and neuropathy.',
    dosage: '1 tablet daily after food.',
    sideEffects: ['Nausea', 'Diarrhea (rare)'],
    warnings: ['Take after meals', 'May color urine bright yellow'],
    storage: 'Store in a cool, dry place'
  },
  'folic acid': {
    name: 'Folic Acid',
    genericName: 'Folic Acid (Vitamin B9)',
    category: 'Vitamin',
    usage: 'Pregnancy, anemia, and folic acid deficiency.',
    dosage: '400mcg-5mg daily.',
    sideEffects: ['Rare at normal doses'],
    warnings: ['Essential before and during pregnancy'],
    storage: 'Store at room temperature'
  },
  'iron supplement': {
    name: 'Iron Supplement',
    genericName: 'Ferrous Sulfate/Fumarate',
    category: 'Mineral Supplement',
    usage: 'Iron deficiency anemia.',
    dosage: '65-200mg elemental iron daily.',
    sideEffects: ['Constipation', 'Nausea', 'Dark stools', 'Stomach upset'],
    warnings: ['Take on empty stomach if tolerated', 'Avoid with tea/coffee', 'Take with vitamin C'],
    storage: 'Store in a dry place'
  },
  'livogen': {
    name: 'Livogen',
    genericName: 'Ferrous Fumarate + Folic Acid',
    category: 'Iron + Folic Acid',
    usage: 'Anemia prevention and treatment.',
    dosage: '1 tablet daily.',
    sideEffects: ['Constipation', 'Dark stools'],
    warnings: ['Take with orange juice', 'Avoid with tea'],
    storage: 'Store in a dry place'
  },
  'multivitamin': {
    name: 'Multivitamin',
    genericName: 'Multivitamin and Multimineral',
    category: 'Vitamin Supplement',
    usage: 'Nutritional supplementation and immune support.',
    dosage: '1 tablet daily with food.',
    sideEffects: ['Nausea', 'Stomach upset'],
    warnings: ['Take with food', 'Do not exceed recommended dose'],
    storage: 'Store in a cool, dry place'
  },
  'omega 3': {
    name: 'Omega-3 Fish Oil',
    genericName: 'Omega-3 Fatty Acids (EPA + DHA)',
    category: 'Dietary Supplement',
    usage: 'Heart health, brain function, and inflammation.',
    dosage: '1-2 capsules daily with food.',
    sideEffects: ['Fishy aftertaste', 'Burping', 'Loose stools'],
    warnings: ['Take with meals', 'May increase bleeding risk'],
    storage: 'Store in refrigerator after opening'
  },
  'zinc': {
    name: 'Zinc',
    genericName: 'Zinc Sulfate/Gluconate',
    category: 'Mineral Supplement',
    usage: 'Immune support and zinc deficiency.',
    dosage: '8-11mg daily for adults.',
    sideEffects: ['Nausea', 'Metallic taste', 'Stomach upset'],
    warnings: ['Take with food', 'High doses can cause copper deficiency'],
    storage: 'Store in a cool, dry place'
  },
  'zincovit': {
    name: 'Zincovit',
    genericName: 'Zinc + Multivitamins',
    category: 'Multivitamin',
    usage: 'Immunity and nutritional support.',
    dosage: '1 tablet daily.',
    sideEffects: ['Nausea (rare)'],
    warnings: ['Take after meals'],
    storage: 'Store in a cool, dry place'
  },
  'revital': {
    name: 'Revital',
    genericName: 'Multivitamin + Ginseng',
    category: 'Multivitamin',
    usage: 'Energy, stamina, and overall health.',
    dosage: '1 capsule daily with breakfast.',
    sideEffects: ['Insomnia', 'Restlessness'],
    warnings: ['Take in morning', 'Not for children'],
    storage: 'Store below 25°C'
  },
  'supradyn': {
    name: 'Supradyn',
    genericName: 'Multivitamin + Minerals',
    category: 'Multivitamin',
    usage: 'Daily nutritional supplement.',
    dosage: '1 tablet daily.',
    sideEffects: ['Bright urine', 'Mild nausea'],
    warnings: ['Take with food'],
    storage: 'Store in a cool, dry place'
  },

  // Muscle Relaxants
  'thiocolchicoside': {
    name: 'Thiocolchicoside',
    genericName: 'Thiocolchicoside',
    category: 'Muscle Relaxant',
    usage: 'Muscle spasms, back pain, and stiff neck.',
    dosage: '4-8mg twice daily.',
    sideEffects: ['Drowsiness', 'Diarrhea', 'Nausea'],
    warnings: ['May cause drowsiness', 'Short-term use only'],
    storage: 'Store at room temperature'
  },
  'myospaz': {
    name: 'Myospaz',
    genericName: 'Thiocolchicoside 4mg',
    category: 'Muscle Relaxant',
    usage: 'Muscle spasms and back pain.',
    dosage: '1 tablet twice daily.',
    sideEffects: ['Drowsiness', 'GI upset'],
    warnings: ['Limit to 7 days use', 'Avoid driving'],
    storage: 'Store below 25°C'
  },
  'chlorzoxazone': {
    name: 'Chlorzoxazone',
    genericName: 'Chlorzoxazone',
    category: 'Muscle Relaxant',
    usage: 'Muscle pain and spasms.',
    dosage: '250-750mg 3-4 times daily.',
    sideEffects: ['Drowsiness', 'Dizziness', 'Nausea', 'Orange urine'],
    warnings: ['May cause drowsiness', 'Avoid alcohol'],
    storage: 'Store at room temperature'
  },
  'myoril': {
    name: 'Myoril',
    genericName: 'Thiocolchicoside 8mg',
    category: 'Muscle Relaxant',
    usage: 'Severe muscle spasms.',
    dosage: '1 tablet once or twice daily.',
    sideEffects: ['Drowsiness', 'Nausea'],
    warnings: ['Short-term use only'],
    storage: 'Store at room temperature'
  },
  'tizanidine': {
    name: 'Tizanidine',
    genericName: 'Tizanidine',
    category: 'Muscle Relaxant',
    usage: 'Muscle spasticity and spasms.',
    dosage: '2-4mg up to 3 times daily.',
    sideEffects: ['Drowsiness', 'Dry mouth', 'Weakness', 'Low blood pressure'],
    warnings: ['Causes significant drowsiness', 'Do not stop suddenly'],
    storage: 'Store at room temperature'
  },

  // Skin & Topical
  'betadine': {
    name: 'Betadine',
    genericName: 'Povidone-Iodine',
    category: 'Antiseptic',
    usage: 'Wound cleaning, minor cuts, burns, and skin infections.',
    dosage: 'Apply to affected area 1-3 times daily.',
    sideEffects: ['Skin irritation', 'Allergic reactions (rare)'],
    warnings: ['For external use only', 'Avoid in iodine allergy', 'May stain skin and clothing'],
    storage: 'Store at room temperature'
  },
  'soframycin': {
    name: 'Soframycin',
    genericName: 'Framycetin Sulfate',
    category: 'Topical Antibiotic',
    usage: 'Minor skin infections, cuts, and burns.',
    dosage: 'Apply thin layer 1-3 times daily.',
    sideEffects: ['Skin irritation', 'Allergic reaction'],
    warnings: ['External use only', 'Clean wound before applying'],
    storage: 'Store below 25°C'
  },
  'neosporin': {
    name: 'Neosporin',
    genericName: 'Neomycin + Polymyxin B + Bacitracin',
    category: 'Topical Antibiotic',
    usage: 'Prevention and treatment of minor skin infections.',
    dosage: 'Apply 1-3 times daily to cleaned area.',
    sideEffects: ['Allergic reaction', 'Skin irritation'],
    warnings: ['For external use only', 'Stop if rash develops'],
    storage: 'Store at room temperature'
  },
  'clotrimazole': {
    name: 'Clotrimazole',
    genericName: 'Clotrimazole',
    category: 'Antifungal',
    usage: 'Fungal skin infections, athlete\'s foot, ringworm, and yeast infections.',
    dosage: 'Apply to affected area twice daily for 2-4 weeks.',
    sideEffects: ['Burning', 'Stinging', 'Redness', 'Peeling'],
    warnings: ['Complete full course', 'Keep area dry'],
    storage: 'Store below 25°C'
  },
  'candid': {
    name: 'Candid Cream',
    genericName: 'Clotrimazole 1%',
    category: 'Antifungal',
    usage: 'Fungal infections of skin.',
    dosage: 'Apply twice daily for 2-4 weeks.',
    sideEffects: ['Mild burning', 'Itching'],
    warnings: ['Keep area clean and dry', 'Complete course'],
    storage: 'Store below 25°C'
  },
  'miconazole': {
    name: 'Miconazole',
    genericName: 'Miconazole Nitrate',
    category: 'Antifungal',
    usage: 'Athlete\'s foot, jock itch, ringworm.',
    dosage: 'Apply twice daily for 2-4 weeks.',
    sideEffects: ['Burning', 'Irritation'],
    warnings: ['External use only', 'Complete full treatment'],
    storage: 'Store at room temperature'
  },
  'terbinafine': {
    name: 'Terbinafine',
    genericName: 'Terbinafine',
    category: 'Antifungal',
    usage: 'Fungal infections of skin and nails.',
    dosage: 'Cream: Apply once or twice daily. Tablets: 250mg daily.',
    sideEffects: ['Skin irritation (topical)', 'Headache', 'GI upset (oral)'],
    warnings: ['Complete full course', 'Monitor liver function for oral use'],
    storage: 'Store at room temperature'
  },
  'hydrocortisone': {
    name: 'Hydrocortisone',
    genericName: 'Hydrocortisone',
    category: 'Topical Corticosteroid',
    usage: 'Itching, redness, swelling, and minor skin irritations.',
    dosage: 'Apply thin layer to affected area 2-3 times daily.',
    sideEffects: ['Skin thinning', 'Burning', 'Itching'],
    warnings: ['Do not use on face for prolonged periods', 'Not for open wounds', 'Short-term use only'],
    storage: 'Store at room temperature'
  },
  'fourderm': {
    name: 'Fourderm Cream',
    genericName: 'Clobetasol + Neomycin + Miconazole + Chlorhexidine',
    category: 'Topical Combination',
    usage: 'Mixed skin infections with inflammation.',
    dosage: 'Apply twice daily.',
    sideEffects: ['Skin thinning', 'Burning'],
    warnings: ['Short-term use only', 'Not for face'],
    storage: 'Store below 25°C'
  },
  'mupirocin': {
    name: 'Mupirocin',
    genericName: 'Mupirocin',
    category: 'Topical Antibiotic',
    usage: 'Impetigo and skin bacterial infections.',
    dosage: 'Apply 3 times daily for 5-10 days.',
    sideEffects: ['Burning', 'Stinging', 'Itching'],
    warnings: ['For external use only', 'Complete course'],
    storage: 'Store at room temperature'
  },
  't bact': {
    name: 'T-Bact',
    genericName: 'Mupirocin 2%',
    category: 'Topical Antibiotic',
    usage: 'Bacterial skin infections.',
    dosage: 'Apply 3 times daily.',
    sideEffects: ['Mild burning', 'Itching'],
    warnings: ['External use only'],
    storage: 'Store below 25°C'
  },

  // Eye Drops
  'tobramycin': {
    name: 'Tobramycin Eye Drops',
    genericName: 'Tobramycin',
    category: 'Antibiotic Eye Drops',
    usage: 'Bacterial eye infections.',
    dosage: '1-2 drops every 4-6 hours.',
    sideEffects: ['Temporary stinging', 'Blurred vision'],
    warnings: ['Do not touch dropper tip', 'Complete prescribed course'],
    storage: 'Store at room temperature'
  },
  'moxifloxacin eye drops': {
    name: 'Moxifloxacin Eye Drops',
    genericName: 'Moxifloxacin 0.5%',
    category: 'Antibiotic Eye Drops',
    usage: 'Bacterial conjunctivitis.',
    dosage: '1 drop 3 times daily for 7 days.',
    sideEffects: ['Temporary discomfort', 'Dry eyes'],
    warnings: ['Remove contact lenses before use'],
    storage: 'Store at room temperature'
  },
  'artificial tears': {
    name: 'Artificial Tears',
    genericName: 'Carboxymethylcellulose/Hydroxypropyl Methylcellulose',
    category: 'Lubricating Eye Drops',
    usage: 'Dry eyes and eye irritation.',
    dosage: '1-2 drops as needed.',
    sideEffects: ['Temporary blurring'],
    warnings: ['Safe for frequent use', 'Discard if contaminated'],
    storage: 'Store at room temperature'
  },
  'refresh tears': {
    name: 'Refresh Tears',
    genericName: 'Carboxymethylcellulose Sodium',
    category: 'Lubricating Eye Drops',
    usage: 'Dry eye relief.',
    dosage: '1-2 drops as needed.',
    sideEffects: ['Mild blurring'],
    warnings: ['Remove contact lenses before use'],
    storage: 'Store at room temperature'
  },

  // Respiratory
  'salbutamol': {
    name: 'Salbutamol',
    genericName: 'Salbutamol (Albuterol)',
    category: 'Bronchodilator',
    usage: 'Asthma, wheezing, and bronchospasm.',
    dosage: 'Inhaler: 1-2 puffs every 4-6 hours. Tablet: 2-4mg 3-4 times daily.',
    sideEffects: ['Tremor', 'Palpitations', 'Headache', 'Muscle cramps'],
    warnings: ['Shake inhaler before use', 'Do not exceed recommended dose'],
    storage: 'Store at room temperature'
  },
  'asthalin': {
    name: 'Asthalin',
    genericName: 'Salbutamol 100mcg/puff',
    category: 'Bronchodilator (Inhaler)',
    usage: 'Asthma and breathing difficulty.',
    dosage: '1-2 puffs when needed.',
    sideEffects: ['Tremor', 'Palpitations'],
    warnings: ['Rinse mouth after use', 'Shake before use'],
    storage: 'Store at room temperature'
  },
  'budesonide': {
    name: 'Budesonide',
    genericName: 'Budesonide',
    category: 'Inhaled Corticosteroid',
    usage: 'Asthma prevention and control.',
    dosage: '200-400mcg twice daily.',
    sideEffects: ['Oral thrush', 'Hoarseness', 'Sore throat'],
    warnings: ['Rinse mouth after use', 'Use regularly as prescribed'],
    storage: 'Store at room temperature'
  },
  'budecort': {
    name: 'Budecort',
    genericName: 'Budesonide Inhaler',
    category: 'Corticosteroid Inhaler',
    usage: 'Asthma prevention.',
    dosage: '1-2 puffs twice daily.',
    sideEffects: ['Hoarse voice', 'Oral thrush'],
    warnings: ['Use spacer', 'Rinse mouth after'],
    storage: 'Store at room temperature'
  },
  'montelukast': {
    name: 'Montelukast',
    genericName: 'Montelukast Sodium',
    category: 'Leukotriene Receptor Antagonist',
    usage: 'Asthma and allergic rhinitis.',
    dosage: '10mg once daily in the evening.',
    sideEffects: ['Headache', 'Abdominal pain', 'Mood changes'],
    warnings: ['Take in evening', 'Report mood/behavior changes'],
    storage: 'Store at room temperature'
  },
  'montair': {
    name: 'Montair',
    genericName: 'Montelukast 10mg',
    category: 'Leukotriene Antagonist',
    usage: 'Asthma and allergies.',
    dosage: '1 tablet in the evening.',
    sideEffects: ['Headache', 'Mood changes'],
    warnings: ['Take at same time daily'],
    storage: 'Store in a dry place'
  },
  'theophylline': {
    name: 'Theophylline',
    genericName: 'Theophylline',
    category: 'Bronchodilator',
    usage: 'Asthma and COPD.',
    dosage: '300-600mg daily in divided doses.',
    sideEffects: ['Nausea', 'Palpitations', 'Insomnia', 'Tremor'],
    warnings: ['Take with food', 'Many drug interactions'],
    storage: 'Store at room temperature'
  },

  // Antidepressants & Anxiety
  'escitalopram': {
    name: 'Escitalopram',
    genericName: 'Escitalopram Oxalate',
    category: 'SSRI Antidepressant',
    usage: 'Depression and anxiety disorders.',
    dosage: '10-20mg once daily.',
    sideEffects: ['Nausea', 'Headache', 'Sexual dysfunction', 'Insomnia'],
    warnings: ['Takes 2-4 weeks for full effect', 'Do not stop suddenly', 'Monitor for suicidal thoughts initially'],
    storage: 'Store at room temperature'
  },
  'nexito': {
    name: 'Nexito',
    genericName: 'Escitalopram 10mg',
    category: 'Antidepressant',
    usage: 'Depression and anxiety.',
    dosage: '1 tablet daily.',
    sideEffects: ['Nausea', 'Sleep disturbance'],
    warnings: ['Gradual dose reduction when stopping'],
    storage: 'Store at room temperature'
  },
  'sertraline': {
    name: 'Sertraline',
    genericName: 'Sertraline',
    category: 'SSRI Antidepressant',
    usage: 'Depression, OCD, panic disorder, and PTSD.',
    dosage: '50-200mg once daily.',
    sideEffects: ['Nausea', 'Diarrhea', 'Insomnia', 'Sexual dysfunction'],
    warnings: ['Takes weeks for full effect', 'Taper when discontinuing'],
    storage: 'Store at room temperature'
  },
  'duzela': {
    name: 'Duzela',
    genericName: 'Duloxetine',
    category: 'SNRI Antidepressant',
    usage: 'Depression, anxiety, diabetic neuropathy, and fibromyalgia.',
    dosage: '30-60mg once daily.',
    sideEffects: ['Nausea', 'Dry mouth', 'Drowsiness', 'Constipation'],
    warnings: ['Do not stop suddenly', 'May increase blood pressure'],
    storage: 'Store at room temperature'
  },
  'alprazolam': {
    name: 'Alprazolam',
    genericName: 'Alprazolam',
    category: 'Benzodiazepine',
    usage: 'Anxiety and panic disorders.',
    dosage: '0.25-0.5mg 2-3 times daily.',
    sideEffects: ['Drowsiness', 'Dizziness', 'Memory problems', 'Dependence'],
    warnings: ['Habit-forming', 'Do not stop suddenly', 'Avoid alcohol'],
    storage: 'Store at room temperature'
  },
  'clonazepam': {
    name: 'Clonazepam',
    genericName: 'Clonazepam',
    category: 'Benzodiazepine',
    usage: 'Seizures and panic disorder.',
    dosage: '0.5-2mg 2-3 times daily.',
    sideEffects: ['Drowsiness', 'Dizziness', 'Coordination problems'],
    warnings: ['Habit-forming', 'Taper dose when stopping'],
    storage: 'Store at room temperature'
  },

  // Sleep & Sedatives
  'zolpidem': {
    name: 'Zolpidem',
    genericName: 'Zolpidem Tartrate',
    category: 'Sedative-Hypnotic',
    usage: 'Short-term treatment of insomnia.',
    dosage: '5-10mg at bedtime.',
    sideEffects: ['Drowsiness', 'Dizziness', 'Headache', 'Sleep behaviors'],
    warnings: ['Take immediately before bed', 'Allow 7-8 hours for sleep', 'Short-term use only'],
    storage: 'Store at room temperature'
  },
  'melatonin': {
    name: 'Melatonin',
    genericName: 'Melatonin',
    category: 'Sleep Aid (Natural)',
    usage: 'Sleep disorders and jet lag.',
    dosage: '1-5mg 30 minutes before bedtime.',
    sideEffects: ['Drowsiness', 'Headache', 'Dizziness'],
    warnings: ['Start with low dose', 'Avoid driving after taking'],
    storage: 'Store in a cool, dark place'
  },

  // Migraine
  'sumatriptan': {
    name: 'Sumatriptan',
    genericName: 'Sumatriptan Succinate',
    category: 'Triptan (Antimigraine)',
    usage: 'Acute migraine attacks.',
    dosage: '50-100mg at onset of migraine. May repeat after 2 hours.',
    sideEffects: ['Tingling', 'Flushing', 'Chest tightness', 'Drowsiness'],
    warnings: ['Not for prevention', 'Avoid in heart disease', 'Maximum 200mg per day'],
    storage: 'Store at room temperature'
  },
  'suminat': {
    name: 'Suminat',
    genericName: 'Sumatriptan 50mg',
    category: 'Antimigraine',
    usage: 'Migraine relief.',
    dosage: '1 tablet at onset of migraine.',
    sideEffects: ['Tingling', 'Chest pressure'],
    warnings: ['Not for prevention', 'Avoid in heart conditions'],
    storage: 'Store at room temperature'
  },
  'propranolol': {
    name: 'Propranolol',
    genericName: 'Propranolol',
    category: 'Beta Blocker',
    usage: 'Migraine prevention, anxiety, and blood pressure.',
    dosage: 'Migraine prevention: 40-160mg daily in divided doses.',
    sideEffects: ['Fatigue', 'Cold extremities', 'Dizziness'],
    warnings: ['Do not stop abruptly', 'Avoid in asthma'],
    storage: 'Store at room temperature'
  }
};

export const searchMedicine = (query: string): Medicine | null => {
  const normalizedQuery = query.toLowerCase().trim();
  
  // Direct match
  if (medicineDatabase[normalizedQuery]) {
    return medicineDatabase[normalizedQuery];
  }
  
  // Partial match
  for (const [key, medicine] of Object.entries(medicineDatabase)) {
    if (key.includes(normalizedQuery) || 
        medicine.name.toLowerCase().includes(normalizedQuery) ||
        medicine.genericName.toLowerCase().includes(normalizedQuery)) {
      return medicine;
    }
  }
  
  return null;
};

export const getAllMedicines = (): Medicine[] => {
  return Object.values(medicineDatabase);
};
