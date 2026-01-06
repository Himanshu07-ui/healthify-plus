export interface MedicineInfo {
  name: string;
  genericName: string;
  category: string;
  usage: string;
  dosage: string;
  sideEffects: string[];
  warnings: string[];
  interactions?: string[];
  storage?: string;
}

export const medicineDatabase: Record<string, MedicineInfo> = {
  // Pain Relievers & Fever Reducers
  'paracetamol': {
    name: 'Paracetamol',
    genericName: 'Acetaminophen',
    category: 'Analgesic / Antipyretic',
    usage: 'Pain relief and fever reduction. Effective for headaches, muscle aches, arthritis, backache, toothaches, colds, and fevers.',
    dosage: '500-1000mg every 4-6 hours as needed. Maximum 4g (4000mg) per day for adults.',
    sideEffects: ['Nausea', 'Allergic skin reactions (rare)', 'Liver damage (overdose)', 'Blood disorders (rare)'],
    warnings: ['Do not exceed recommended dose', 'Avoid alcohol consumption', 'Consult doctor if symptoms persist beyond 3 days', 'Check other medications for acetaminophen content'],
    interactions: ['Warfarin', 'Isoniazid', 'Carbamazepine'],
    storage: 'Store below 25°C in a dry place'
  },
  'dolo 650': {
    name: 'Dolo 650',
    genericName: 'Paracetamol 650mg',
    category: 'Analgesic / Antipyretic',
    usage: 'Relief of mild to moderate pain and fever. Commonly used for headache, body ache, and fever associated with common cold and flu.',
    dosage: '1 tablet every 4-6 hours as needed. Maximum 4 tablets per day.',
    sideEffects: ['Nausea', 'Allergic reactions', 'Liver toxicity (overdose)'],
    warnings: ['Do not exceed 4 tablets in 24 hours', 'Avoid in severe liver disease', 'Do not use with other paracetamol products'],
    storage: 'Store in cool, dry place away from light'
  },
  'crocin': {
    name: 'Crocin',
    genericName: 'Paracetamol 500mg',
    category: 'Analgesic / Antipyretic',
    usage: 'Fever and pain relief including headache, toothache, body aches, and cold symptoms.',
    dosage: '1-2 tablets every 4-6 hours. Maximum 8 tablets in 24 hours.',
    sideEffects: ['Nausea', 'Skin rash', 'Liver damage with overdose'],
    warnings: ['Avoid alcohol', 'Do not exceed recommended dose', 'Consult doctor if pregnant or breastfeeding'],
    storage: 'Store below 30°C'
  },
  'ibuprofen': {
    name: 'Ibuprofen',
    genericName: 'Ibuprofen',
    category: 'NSAID (Non-Steroidal Anti-Inflammatory Drug)',
    usage: 'Anti-inflammatory, pain relief, and fever reduction. Used for arthritis, menstrual cramps, headaches, dental pain, muscle aches.',
    dosage: '200-400mg every 4-6 hours as needed. Maximum 1200mg per day for OTC use.',
    sideEffects: ['Stomach upset', 'Nausea', 'Dizziness', 'Headache', 'GI bleeding (long-term)'],
    warnings: ['Take with food or milk', 'Avoid if you have stomach ulcers or bleeding disorders', 'Not recommended for long-term use', 'Avoid in last trimester of pregnancy'],
    interactions: ['Aspirin', 'Blood thinners', 'ACE inhibitors', 'Lithium'],
    storage: 'Store at room temperature'
  },
  'brufen': {
    name: 'Brufen',
    genericName: 'Ibuprofen 400mg',
    category: 'NSAID',
    usage: 'Pain and inflammation relief for arthritis, sprains, strains, dental pain, and menstrual cramps.',
    dosage: '1 tablet 3 times daily with food. Maximum 3 tablets per day.',
    sideEffects: ['Stomach pain', 'Heartburn', 'Nausea', 'Dizziness'],
    warnings: ['Take after meals', 'Avoid in peptic ulcer', 'Not for use in children under 12'],
    storage: 'Store below 25°C'
  },
  'combiflam': {
    name: 'Combiflam',
    genericName: 'Ibuprofen 400mg + Paracetamol 325mg',
    category: 'Analgesic / NSAID Combination',
    usage: 'Dual action pain relief and fever reduction. Effective for headaches, body aches, toothache, and fever.',
    dosage: '1 tablet 2-3 times daily after food. Do not exceed 3 tablets in 24 hours.',
    sideEffects: ['Stomach upset', 'Nausea', 'Dizziness', 'Heartburn'],
    warnings: ['Take after meals', 'Avoid on empty stomach', 'Not for children under 12', 'Avoid if allergic to NSAIDs'],
    storage: 'Store in a cool, dry place'
  },
  'aspirin': {
    name: 'Aspirin',
    genericName: 'Acetylsalicylic Acid',
    category: 'NSAID / Antiplatelet',
    usage: 'Pain relief, fever reduction, anti-inflammatory, and blood thinning for cardiovascular protection.',
    dosage: 'Pain/Fever: 325-650mg every 4-6 hours. Cardiac: 75-100mg daily as prescribed.',
    sideEffects: ['Stomach irritation', 'Nausea', 'Bleeding risk', 'Tinnitus (high doses)'],
    warnings: ['Not for children under 16 (risk of Reye\'s syndrome)', 'Avoid before surgery', 'Take with food', 'Avoid in bleeding disorders'],
    interactions: ['Blood thinners', 'Methotrexate', 'Other NSAIDs'],
    storage: 'Store in a dry place away from moisture'
  },
  'disprin': {
    name: 'Disprin',
    genericName: 'Aspirin 350mg (Dispersible)',
    category: 'NSAID',
    usage: 'Fast-acting pain relief for headaches, toothaches, and minor aches. Fever reduction.',
    dosage: 'Dissolve 1-2 tablets in water every 4 hours. Maximum 8 tablets daily.',
    sideEffects: ['Stomach upset', 'Nausea', 'Risk of bleeding'],
    warnings: ['Not for children', 'Avoid if you have asthma or ulcers', 'Take with or after food'],
    storage: 'Store in a cool, dry place'
  },
  'diclofenac': {
    name: 'Diclofenac',
    genericName: 'Diclofenac Sodium',
    category: 'NSAID',
    usage: 'Relief of pain and inflammation in arthritis, sprains, strains, and other musculoskeletal conditions.',
    dosage: '50mg 2-3 times daily with food. Maximum 150mg per day.',
    sideEffects: ['Stomach pain', 'Nausea', 'Headache', 'Dizziness', 'Elevated liver enzymes'],
    warnings: ['Take with food', 'Avoid in heart disease', 'Not for long-term use without supervision', 'Avoid in pregnancy'],
    interactions: ['Lithium', 'Digoxin', 'Anticoagulants', 'Methotrexate'],
    storage: 'Store below 30°C'
  },
  'voveran': {
    name: 'Voveran',
    genericName: 'Diclofenac Sodium 50mg',
    category: 'NSAID',
    usage: 'Pain and inflammation relief for arthritis, post-operative pain, and musculoskeletal disorders.',
    dosage: '1 tablet 2-3 times daily after meals.',
    sideEffects: ['Gastric irritation', 'Nausea', 'Diarrhea', 'Headache'],
    warnings: ['Always take after food', 'Avoid in kidney disease', 'Monitor blood pressure'],
    storage: 'Store in a cool, dry place'
  },
  'naproxen': {
    name: 'Naproxen',
    genericName: 'Naproxen Sodium',
    category: 'NSAID',
    usage: 'Long-lasting pain relief for arthritis, menstrual cramps, gout, tendinitis, and bursitis.',
    dosage: '220-550mg twice daily with food. Maximum 1100mg per day.',
    sideEffects: ['Stomach upset', 'Drowsiness', 'Headache', 'Dizziness'],
    warnings: ['Take with food or milk', 'Avoid in heart disease or stroke history', 'Not for children under 12'],
    interactions: ['Blood thinners', 'Lithium', 'Blood pressure medications'],
    storage: 'Store at room temperature'
  },

  // Antibiotics
  'amoxicillin': {
    name: 'Amoxicillin',
    genericName: 'Amoxicillin Trihydrate',
    category: 'Antibiotic (Penicillin)',
    usage: 'Treatment of bacterial infections including ear infections, throat infections, urinary tract infections, skin infections, and pneumonia.',
    dosage: '250-500mg every 8 hours or 500-875mg every 12 hours for 7-10 days.',
    sideEffects: ['Diarrhea', 'Nausea', 'Skin rash', 'Vomiting'],
    warnings: ['Complete the full course', 'Inform doctor of penicillin allergy', 'May reduce oral contraceptive effectiveness', 'Take at regular intervals'],
    interactions: ['Warfarin', 'Methotrexate', 'Probenecid'],
    storage: 'Store below 25°C. Keep dry.'
  },
  'mox': {
    name: 'Mox',
    genericName: 'Amoxicillin 500mg',
    category: 'Antibiotic',
    usage: 'Bacterial infections of ear, nose, throat, respiratory tract, and urinary tract.',
    dosage: '1 capsule every 8 hours for 5-7 days.',
    sideEffects: ['Diarrhea', 'Stomach upset', 'Rash'],
    warnings: ['Complete full course', 'Report any allergic reactions immediately', 'Take with or without food'],
    storage: 'Store in a cool, dry place'
  },
  'augmentin': {
    name: 'Augmentin',
    genericName: 'Amoxicillin + Clavulanic Acid',
    category: 'Antibiotic (Penicillin + Beta-lactamase inhibitor)',
    usage: 'Broader spectrum antibiotic for resistant bacterial infections including sinusitis, bronchitis, UTIs, and skin infections.',
    dosage: '625mg (500/125mg) every 8 hours or 1g (875/125mg) every 12 hours with food.',
    sideEffects: ['Diarrhea', 'Nausea', 'Vomiting', 'Yeast infections', 'Liver enzyme changes'],
    warnings: ['Take at start of meal to reduce GI effects', 'Report jaundice immediately', 'Complete full course', 'Store suspension in refrigerator'],
    interactions: ['Warfarin', 'Allopurinol', 'Oral contraceptives'],
    storage: 'Tablets: below 25°C. Suspension: refrigerate after reconstitution'
  },
  'azithromycin': {
    name: 'Azithromycin',
    genericName: 'Azithromycin',
    category: 'Antibiotic (Macrolide)',
    usage: 'Respiratory infections, skin infections, ear infections, and sexually transmitted infections.',
    dosage: '500mg on day 1, then 250mg daily for 4 days. Or 500mg daily for 3 days (Z-pack).',
    sideEffects: ['Diarrhea', 'Nausea', 'Abdominal pain', 'Headache'],
    warnings: ['Can be taken with or without food', 'Complete full course', 'May cause QT prolongation in heart patients', 'Report hearing changes'],
    interactions: ['Antacids (take 2 hours apart)', 'Warfarin', 'Digoxin'],
    storage: 'Store at room temperature'
  },
  'zithromax': {
    name: 'Zithromax',
    genericName: 'Azithromycin 500mg',
    category: 'Antibiotic (Macrolide)',
    usage: 'Upper and lower respiratory tract infections, skin infections, and STIs.',
    dosage: '500mg once daily for 3 days.',
    sideEffects: ['Nausea', 'Diarrhea', 'Stomach pain', 'Vomiting'],
    warnings: ['Take 1 hour before or 2 hours after meals', 'Complete the course', 'Avoid antacids'],
    storage: 'Store below 30°C'
  },
  'ciprofloxacin': {
    name: 'Ciprofloxacin',
    genericName: 'Ciprofloxacin Hydrochloride',
    category: 'Antibiotic (Fluoroquinolone)',
    usage: 'Urinary tract infections, respiratory infections, bone and joint infections, skin infections, and typhoid fever.',
    dosage: '250-750mg every 12 hours for 7-14 days depending on infection.',
    sideEffects: ['Nausea', 'Diarrhea', 'Dizziness', 'Tendon problems', 'Photosensitivity'],
    warnings: ['Stay hydrated', 'Avoid sunlight exposure', 'Not for children or pregnant women', 'May affect tendons - stop if pain occurs'],
    interactions: ['Antacids', 'Caffeine', 'Theophylline', 'Warfarin'],
    storage: 'Store at room temperature away from light'
  },
  'ciplox': {
    name: 'Ciplox',
    genericName: 'Ciprofloxacin 500mg',
    category: 'Antibiotic (Fluoroquinolone)',
    usage: 'UTIs, respiratory infections, GI infections, and typhoid.',
    dosage: '1 tablet twice daily for 7-14 days.',
    sideEffects: ['Nausea', 'Headache', 'Dizziness', 'Tendon damage'],
    warnings: ['Drink plenty of fluids', 'Avoid dairy products close to dosing', 'Report tendon pain immediately'],
    storage: 'Store below 30°C'
  },
  'metronidazole': {
    name: 'Metronidazole',
    genericName: 'Metronidazole',
    category: 'Antibiotic / Antiprotozoal',
    usage: 'Bacterial and parasitic infections including dental infections, stomach infections, skin infections, and trichomoniasis.',
    dosage: '400mg every 8 hours for 7-10 days or as prescribed.',
    sideEffects: ['Metallic taste', 'Nausea', 'Headache', 'Dark urine', 'Dizziness'],
    warnings: ['AVOID ALCOHOL completely during and 48 hours after treatment', 'May cause dizziness - avoid driving', 'Take with food'],
    interactions: ['Alcohol (severe reaction)', 'Warfarin', 'Lithium', 'Phenytoin'],
    storage: 'Store away from light'
  },
  'flagyl': {
    name: 'Flagyl',
    genericName: 'Metronidazole 400mg',
    category: 'Antibiotic / Antiprotozoal',
    usage: 'Amoebic dysentery, giardiasis, bacterial vaginosis, and anaerobic bacterial infections.',
    dosage: '1 tablet 3 times daily for 7-10 days.',
    sideEffects: ['Nausea', 'Metallic taste', 'Loss of appetite', 'Dark urine'],
    warnings: ['NO ALCOHOL during treatment', 'Complete full course', 'Take with meals'],
    storage: 'Store in a cool, dark place'
  },
  'doxycycline': {
    name: 'Doxycycline',
    genericName: 'Doxycycline Hyclate',
    category: 'Antibiotic (Tetracycline)',
    usage: 'Acne, respiratory infections, urinary infections, malaria prevention, and Lyme disease.',
    dosage: '100mg once or twice daily. For malaria prevention: 100mg daily starting 1-2 days before travel.',
    sideEffects: ['Sun sensitivity', 'Nausea', 'Diarrhea', 'Esophageal irritation'],
    warnings: ['Take with plenty of water', 'Avoid lying down for 30 min after', 'Use sunscreen', 'Not for children under 8 or pregnant women'],
    interactions: ['Antacids', 'Iron supplements', 'Dairy products', 'Oral contraceptives'],
    storage: 'Store at room temperature away from moisture'
  },
  'cephalexin': {
    name: 'Cephalexin',
    genericName: 'Cephalexin',
    category: 'Antibiotic (Cephalosporin)',
    usage: 'Skin infections, respiratory tract infections, bone infections, and urinary tract infections.',
    dosage: '250-500mg every 6 hours for 7-14 days.',
    sideEffects: ['Diarrhea', 'Nausea', 'Stomach upset', 'Rash'],
    warnings: ['Complete full course', 'Inform doctor of penicillin allergy', 'May be taken with or without food'],
    interactions: ['Probenecid', 'Metformin'],
    storage: 'Store at room temperature'
  },

  // Antihistamines & Allergy
  'cetirizine': {
    name: 'Cetirizine',
    genericName: 'Cetirizine Hydrochloride',
    category: 'Antihistamine',
    usage: 'Allergy relief including hay fever, allergic rhinitis, urticaria (hives), and itchy skin conditions.',
    dosage: '10mg once daily for adults. 5mg for children 6-12 years.',
    sideEffects: ['Drowsiness', 'Dry mouth', 'Fatigue', 'Headache'],
    warnings: ['May cause drowsiness - use caution while driving', 'Avoid alcohol', 'Safe for most adults when used as directed'],
    interactions: ['Alcohol', 'Sedatives', 'Theophylline'],
    storage: 'Store at room temperature'
  },
  'zyrtec': {
    name: 'Zyrtec',
    genericName: 'Cetirizine 10mg',
    category: 'Antihistamine',
    usage: 'Seasonal allergies, perennial allergies, and chronic hives.',
    dosage: '1 tablet once daily.',
    sideEffects: ['Drowsiness', 'Dry mouth', 'Tiredness'],
    warnings: ['May cause drowsiness', 'Can be taken with or without food'],
    storage: 'Store below 25°C'
  },
  'allegra': {
    name: 'Allegra',
    genericName: 'Fexofenadine 120mg/180mg',
    category: 'Antihistamine (Non-sedating)',
    usage: 'Seasonal allergic rhinitis, chronic urticaria, and allergic skin conditions.',
    dosage: '120mg once daily or 180mg once daily for urticaria.',
    sideEffects: ['Headache', 'Nausea', 'Dizziness', 'Fatigue'],
    warnings: ['Non-drowsy formula', 'Avoid fruit juices within 4 hours of dose', 'Safe for daytime use'],
    interactions: ['Antacids', 'Fruit juices (reduce absorption)'],
    storage: 'Store at room temperature'
  },
  'loratadine': {
    name: 'Loratadine',
    genericName: 'Loratadine',
    category: 'Antihistamine (Non-sedating)',
    usage: 'Allergic rhinitis, hay fever, and chronic urticaria without significant drowsiness.',
    dosage: '10mg once daily for adults and children over 12.',
    sideEffects: ['Headache', 'Dry mouth', 'Fatigue', 'Nervousness'],
    warnings: ['Usually non-drowsy', 'Take on empty stomach for faster action', 'Safe for most patients'],
    interactions: ['Erythromycin', 'Ketoconazole', 'Cimetidine'],
    storage: 'Store at room temperature'
  },
  'claritin': {
    name: 'Claritin',
    genericName: 'Loratadine 10mg',
    category: 'Antihistamine',
    usage: 'Non-drowsy relief from allergies, sneezing, runny nose, and itchy eyes.',
    dosage: '1 tablet once daily.',
    sideEffects: ['Headache', 'Drowsiness (rare)', 'Dry mouth'],
    warnings: ['Non-drowsy for most people', 'Do not exceed recommended dose'],
    storage: 'Store at room temperature'
  },
  'benadryl': {
    name: 'Benadryl',
    genericName: 'Diphenhydramine',
    category: 'Antihistamine (Sedating)',
    usage: 'Allergy relief, cold symptoms, and as a sleep aid.',
    dosage: '25-50mg every 4-6 hours. Maximum 300mg per day.',
    sideEffects: ['Drowsiness', 'Dry mouth', 'Dizziness', 'Constipation'],
    warnings: ['Causes significant drowsiness', 'Do not drive after taking', 'Not for children under 6', 'Avoid with alcohol'],
    interactions: ['Alcohol', 'Sedatives', 'MAO inhibitors'],
    storage: 'Store at room temperature'
  },
  'chlorpheniramine': {
    name: 'Chlorpheniramine',
    genericName: 'Chlorpheniramine Maleate',
    category: 'Antihistamine',
    usage: 'Allergic rhinitis, common cold symptoms, and allergic reactions.',
    dosage: '4mg every 4-6 hours. Maximum 24mg per day.',
    sideEffects: ['Drowsiness', 'Dry mouth', 'Blurred vision', 'Urinary retention'],
    warnings: ['Causes drowsiness', 'Avoid driving', 'Not for glaucoma patients', 'Caution in elderly'],
    storage: 'Store at room temperature'
  },
  'montelukast': {
    name: 'Montelukast',
    genericName: 'Montelukast Sodium',
    category: 'Leukotriene Receptor Antagonist',
    usage: 'Prevention and long-term treatment of asthma. Also for allergic rhinitis.',
    dosage: '10mg once daily in the evening for adults.',
    sideEffects: ['Headache', 'Abdominal pain', 'Behavioral changes', 'Upper respiratory infection'],
    warnings: ['Not for acute asthma attacks', 'Take in evening', 'Report mood changes immediately'],
    storage: 'Store at room temperature protected from light'
  },

  // Gastrointestinal
  'omeprazole': {
    name: 'Omeprazole',
    genericName: 'Omeprazole',
    category: 'Proton Pump Inhibitor (PPI)',
    usage: 'Acid reflux (GERD), peptic ulcers, heartburn, and H. pylori infection treatment.',
    dosage: '20-40mg once daily before breakfast for 4-8 weeks.',
    sideEffects: ['Headache', 'Nausea', 'Diarrhea', 'Abdominal pain', 'B12 deficiency (long-term)'],
    warnings: ['Take 30-60 minutes before first meal', 'Long-term use may affect bone health and magnesium levels', 'Consult doctor for use beyond 14 days'],
    interactions: ['Clopidogrel', 'Methotrexate', 'Tacrolimus'],
    storage: 'Store in a dry place away from heat'
  },
  'prilosec': {
    name: 'Prilosec',
    genericName: 'Omeprazole 20mg',
    category: 'PPI',
    usage: 'Heartburn, acid reflux, and stomach ulcers.',
    dosage: '1 capsule daily before breakfast for up to 14 days.',
    sideEffects: ['Headache', 'Stomach pain', 'Diarrhea'],
    warnings: ['Do not crush or chew', 'Take before eating', 'Not for immediate heartburn relief'],
    storage: 'Store at room temperature'
  },
  'pantoprazole': {
    name: 'Pantoprazole',
    genericName: 'Pantoprazole Sodium',
    category: 'Proton Pump Inhibitor',
    usage: 'GERD, erosive esophagitis, Zollinger-Ellison syndrome, and peptic ulcer disease.',
    dosage: '40mg once daily before breakfast for 4-8 weeks.',
    sideEffects: ['Headache', 'Diarrhea', 'Nausea', 'Abdominal pain'],
    warnings: ['Take before meals', 'Swallow whole - do not crush', 'Long-term use needs monitoring'],
    interactions: ['Methotrexate', 'Warfarin'],
    storage: 'Store at room temperature'
  },
  'pan 40': {
    name: 'Pan 40',
    genericName: 'Pantoprazole 40mg',
    category: 'PPI',
    usage: 'Gastric and duodenal ulcers, GERD, and acid-related disorders.',
    dosage: '1 tablet daily before breakfast.',
    sideEffects: ['Headache', 'Diarrhea', 'Flatulence'],
    warnings: ['Take on empty stomach', 'Do not crush tablet', 'Complete prescribed course'],
    storage: 'Store below 25°C'
  },
  'ranitidine': {
    name: 'Ranitidine',
    genericName: 'Ranitidine Hydrochloride',
    category: 'H2 Receptor Antagonist',
    usage: 'Heartburn, acid indigestion, peptic ulcers, and GERD.',
    dosage: '150mg twice daily or 300mg at bedtime.',
    sideEffects: ['Headache', 'Dizziness', 'Constipation', 'Diarrhea'],
    warnings: ['May take 1 hour to work', 'Inform doctor of kidney problems'],
    storage: 'Store at room temperature protected from light'
  },
  'antacid': {
    name: 'Antacid',
    genericName: 'Aluminum/Magnesium Hydroxide',
    category: 'Antacid',
    usage: 'Quick relief from heartburn, indigestion, and upset stomach.',
    dosage: '1-2 tablets or 10-20ml liquid as needed after meals and at bedtime.',
    sideEffects: ['Constipation (aluminum)', 'Diarrhea (magnesium)', 'Chalky taste'],
    warnings: ['Do not use for more than 2 weeks', 'Take 2 hours apart from other medications', 'Not for kidney patients'],
    storage: 'Store at room temperature'
  },
  'gelusil': {
    name: 'Gelusil',
    genericName: 'Aluminium Hydroxide + Magnesium Hydroxide + Simethicone',
    category: 'Antacid + Antiflatulent',
    usage: 'Acidity, heartburn, gas, and bloating.',
    dosage: '1-2 tablets to be chewed after meals or as needed.',
    sideEffects: ['Constipation', 'Diarrhea', 'Nausea'],
    warnings: ['Chew thoroughly before swallowing', 'Not for prolonged use'],
    storage: 'Store in a cool, dry place'
  },
  'eno': {
    name: 'Eno',
    genericName: 'Sodium Bicarbonate + Citric Acid',
    category: 'Antacid',
    usage: 'Quick relief from acidity, heartburn, and indigestion.',
    dosage: 'Dissolve 1 sachet (5g) in water and drink when symptoms occur.',
    sideEffects: ['Bloating', 'Gas', 'Electrolyte imbalance (overuse)'],
    warnings: ['Not for regular use', 'High sodium content - avoid in heart/kidney disease', 'Do not exceed 6 sachets daily'],
    storage: 'Store in a dry place'
  },
  'domperidone': {
    name: 'Domperidone',
    genericName: 'Domperidone',
    category: 'Antiemetic / Prokinetic',
    usage: 'Nausea, vomiting, bloating, and gastroparesis. Helps stomach emptying.',
    dosage: '10mg three times daily before meals.',
    sideEffects: ['Headache', 'Dry mouth', 'Drowsiness', 'Cardiac effects (rare)'],
    warnings: ['Not for prolonged use', 'Use lowest effective dose', 'Caution in heart conditions'],
    storage: 'Store at room temperature'
  },
  'domstal': {
    name: 'Domstal',
    genericName: 'Domperidone 10mg',
    category: 'Antiemetic',
    usage: 'Nausea, vomiting, and bloating.',
    dosage: '1 tablet 3 times daily before meals.',
    sideEffects: ['Dry mouth', 'Headache', 'Diarrhea'],
    warnings: ['Take before food', 'Not for long-term use'],
    storage: 'Store below 30°C'
  },
  'ondansetron': {
    name: 'Ondansetron',
    genericName: 'Ondansetron Hydrochloride',
    category: 'Antiemetic',
    usage: 'Prevention and treatment of nausea and vomiting from chemotherapy, radiation, and surgery.',
    dosage: '4-8mg every 8 hours as needed.',
    sideEffects: ['Headache', 'Constipation', 'Dizziness', 'Fatigue'],
    warnings: ['May cause QT prolongation', 'Use caution in liver disease'],
    storage: 'Store at room temperature'
  },
  'loperamide': {
    name: 'Loperamide',
    genericName: 'Loperamide Hydrochloride',
    category: 'Antidiarrheal',
    usage: 'Treatment of acute and chronic diarrhea.',
    dosage: '4mg initially, then 2mg after each loose stool. Maximum 16mg/day.',
    sideEffects: ['Constipation', 'Abdominal cramps', 'Dizziness', 'Nausea'],
    warnings: ['Not for bloody diarrhea or fever', 'Stay hydrated', 'Not for children under 12 without prescription'],
    storage: 'Store at room temperature'
  },
  'imodium': {
    name: 'Imodium',
    genericName: 'Loperamide 2mg',
    category: 'Antidiarrheal',
    usage: 'Acute diarrhea and traveler\'s diarrhea.',
    dosage: '2 capsules initially, then 1 after each loose stool. Max 8 capsules/day.',
    sideEffects: ['Constipation', 'Bloating', 'Nausea'],
    warnings: ['Drink plenty of fluids', 'See doctor if symptoms persist beyond 2 days'],
    storage: 'Store below 30°C'
  },
  'ors': {
    name: 'ORS',
    genericName: 'Oral Rehydration Salts',
    category: 'Rehydration Solution',
    usage: 'Prevention and treatment of dehydration due to diarrhea or vomiting.',
    dosage: 'Dissolve 1 sachet in 1 liter of clean water. Sip frequently.',
    sideEffects: ['Nausea (if consumed too fast)', 'Vomiting'],
    warnings: ['Use only clean water', 'Discard after 24 hours', 'Do not add sugar or salt'],
    storage: 'Store in a dry place. Use reconstituted solution within 24 hours.'
  },
  'lactulose': {
    name: 'Lactulose',
    genericName: 'Lactulose',
    category: 'Osmotic Laxative',
    usage: 'Chronic constipation and hepatic encephalopathy.',
    dosage: '15-30ml once or twice daily for constipation.',
    sideEffects: ['Bloating', 'Flatulence', 'Abdominal cramps', 'Diarrhea'],
    warnings: ['May take 24-48 hours to work', 'Diabetics should use with caution'],
    storage: 'Store at room temperature'
  },
  'dulcolax': {
    name: 'Dulcolax',
    genericName: 'Bisacodyl 5mg',
    category: 'Stimulant Laxative',
    usage: 'Occasional constipation and bowel preparation before procedures.',
    dosage: '1-2 tablets at bedtime or 1 suppository when needed.',
    sideEffects: ['Abdominal cramps', 'Diarrhea', 'Nausea'],
    warnings: ['Do not crush tablets', 'Avoid milk/antacids within 1 hour', 'Not for daily use'],
    storage: 'Store at room temperature'
  },

  // Cold & Cough
  'cough syrup': {
    name: 'Cough Syrup',
    genericName: 'Dextromethorphan / Guaifenesin',
    category: 'Antitussive / Expectorant',
    usage: 'Relief of cough due to cold, flu, or allergies. Helps loosen mucus.',
    dosage: '10-20ml every 4-6 hours as needed. Follow label directions.',
    sideEffects: ['Drowsiness', 'Dizziness', 'Nausea', 'Stomach upset'],
    warnings: ['Do not exceed recommended dose', 'Avoid with MAO inhibitors', 'May cause drowsiness'],
    storage: 'Store at room temperature'
  },
  'benadryl cough': {
    name: 'Benadryl Cough Syrup',
    genericName: 'Diphenhydramine + Ammonium Chloride',
    category: 'Antihistamine + Expectorant',
    usage: 'Dry and wet cough, allergic cough, and throat irritation.',
    dosage: '5-10ml every 4-6 hours.',
    sideEffects: ['Drowsiness', 'Dry mouth', 'Dizziness'],
    warnings: ['Causes drowsiness', 'Avoid driving', 'Not for children under 6'],
    storage: 'Store below 25°C'
  },
  'vicks vaporub': {
    name: 'Vicks VapoRub',
    genericName: 'Camphor + Menthol + Eucalyptus Oil',
    category: 'Topical Decongestant',
    usage: 'Relief of cough and nasal congestion. Apply externally.',
    dosage: 'Apply to chest and throat up to 3 times daily.',
    sideEffects: ['Skin irritation', 'Burning sensation'],
    warnings: ['External use only', 'Do not apply to broken skin', 'Keep away from eyes and mouth', 'Not for children under 2'],
    storage: 'Store at room temperature'
  },
  'sinarest': {
    name: 'Sinarest',
    genericName: 'Paracetamol + Phenylephrine + Chlorpheniramine + Caffeine',
    category: 'Cold & Flu Combination',
    usage: 'Relief of cold and flu symptoms including congestion, runny nose, headache, and fever.',
    dosage: '1 tablet every 4-6 hours. Maximum 4 tablets daily.',
    sideEffects: ['Drowsiness', 'Dry mouth', 'Dizziness', 'Increased heart rate'],
    warnings: ['May cause drowsiness', 'Avoid in high blood pressure', 'Do not exceed dose'],
    storage: 'Store below 25°C'
  },
  'mucinex': {
    name: 'Mucinex',
    genericName: 'Guaifenesin',
    category: 'Expectorant',
    usage: 'Loosens and thins mucus in chest congestion.',
    dosage: '600-1200mg every 12 hours. Drink plenty of water.',
    sideEffects: ['Nausea', 'Vomiting', 'Stomach upset', 'Dizziness'],
    warnings: ['Drink plenty of fluids', 'Do not crush extended-release tablets'],
    storage: 'Store at room temperature'
  },
  'otrivin': {
    name: 'Otrivin',
    genericName: 'Xylometazoline Nasal Drops',
    category: 'Nasal Decongestant',
    usage: 'Relief of nasal congestion due to colds, sinusitis, and allergies.',
    dosage: '2-3 drops in each nostril 2-3 times daily. Do not use for more than 7 days.',
    sideEffects: ['Nasal burning', 'Sneezing', 'Rebound congestion (prolonged use)'],
    warnings: ['Do not use for more than 7 days', 'May cause rebound congestion', 'Not for children under 6'],
    storage: 'Store below 25°C'
  },

  // Diabetes
  'metformin': {
    name: 'Metformin',
    genericName: 'Metformin Hydrochloride',
    category: 'Antidiabetic (Biguanide)',
    usage: 'Type 2 diabetes management. Helps control blood sugar levels.',
    dosage: '500-1000mg twice daily with meals. Maximum 2550mg/day.',
    sideEffects: ['Nausea', 'Diarrhea', 'Stomach upset', 'Metallic taste', 'B12 deficiency (long-term)'],
    warnings: ['Take with food to reduce GI effects', 'Stay hydrated', 'Stop before contrast dye procedures', 'Monitor kidney function'],
    interactions: ['Alcohol', 'Contrast dyes', 'Diuretics'],
    storage: 'Store at room temperature'
  },
  'glucophage': {
    name: 'Glucophage',
    genericName: 'Metformin 500mg/850mg/1000mg',
    category: 'Antidiabetic',
    usage: 'Type 2 diabetes mellitus management.',
    dosage: 'Start with 500mg twice daily, increase gradually.',
    sideEffects: ['GI upset', 'Nausea', 'Diarrhea', 'Metallic taste'],
    warnings: ['Take with meals', 'Monitor blood sugar', 'Avoid excessive alcohol'],
    storage: 'Store below 30°C'
  },
  'glimepiride': {
    name: 'Glimepiride',
    genericName: 'Glimepiride',
    category: 'Antidiabetic (Sulfonylurea)',
    usage: 'Type 2 diabetes management. Stimulates insulin release.',
    dosage: '1-4mg once daily with breakfast.',
    sideEffects: ['Hypoglycemia', 'Weight gain', 'Nausea', 'Dizziness'],
    warnings: ['Take with breakfast', 'Monitor blood sugar', 'Carry glucose tablets for low blood sugar'],
    storage: 'Store at room temperature'
  },
  'amaryl': {
    name: 'Amaryl',
    genericName: 'Glimepiride 1mg/2mg/4mg',
    category: 'Antidiabetic (Sulfonylurea)',
    usage: 'Type 2 diabetes blood sugar control.',
    dosage: '1-4mg with first main meal of the day.',
    sideEffects: ['Low blood sugar', 'Weight gain', 'Nausea'],
    warnings: ['Never skip meals', 'Monitor blood sugar regularly', 'Know hypoglycemia symptoms'],
    storage: 'Store below 30°C'
  },

  // Cardiovascular
  'amlodipine': {
    name: 'Amlodipine',
    genericName: 'Amlodipine Besylate',
    category: 'Calcium Channel Blocker',
    usage: 'High blood pressure and angina (chest pain).',
    dosage: '5-10mg once daily.',
    sideEffects: ['Swelling of ankles', 'Headache', 'Flushing', 'Dizziness', 'Fatigue'],
    warnings: ['May cause ankle swelling', 'Take at same time daily', 'Do not stop abruptly'],
    interactions: ['Simvastatin (limit dose)', 'Cyclosporine', 'Grapefruit juice'],
    storage: 'Store at room temperature'
  },
  'atenolol': {
    name: 'Atenolol',
    genericName: 'Atenolol',
    category: 'Beta Blocker',
    usage: 'High blood pressure, angina, and irregular heartbeat.',
    dosage: '25-100mg once daily.',
    sideEffects: ['Fatigue', 'Cold hands/feet', 'Slow heartbeat', 'Dizziness'],
    warnings: ['Do not stop suddenly', 'May mask hypoglycemia symptoms in diabetics', 'Avoid in asthma'],
    interactions: ['Calcium channel blockers', 'Digoxin', 'Insulin'],
    storage: 'Store at room temperature protected from light'
  },
  'losartan': {
    name: 'Losartan',
    genericName: 'Losartan Potassium',
    category: 'ARB (Angiotensin Receptor Blocker)',
    usage: 'High blood pressure, diabetic kidney disease, and heart failure.',
    dosage: '25-100mg once or twice daily.',
    sideEffects: ['Dizziness', 'High potassium', 'Fatigue', 'Cough (less than ACE inhibitors)'],
    warnings: ['Monitor potassium levels', 'Not for pregnancy', 'May cause dizziness - rise slowly'],
    interactions: ['Potassium supplements', 'NSAIDs', 'Lithium'],
    storage: 'Store at room temperature'
  },
  'enalapril': {
    name: 'Enalapril',
    genericName: 'Enalapril Maleate',
    category: 'ACE Inhibitor',
    usage: 'High blood pressure, heart failure, and prevention of kidney damage in diabetes.',
    dosage: '5-20mg once or twice daily.',
    sideEffects: ['Dry cough', 'Dizziness', 'Headache', 'High potassium'],
    warnings: ['May cause persistent dry cough', 'Not for pregnancy', 'Monitor kidney function and potassium'],
    interactions: ['Potassium supplements', 'NSAIDs', 'Lithium'],
    storage: 'Store at room temperature'
  },
  'hydrochlorothiazide': {
    name: 'Hydrochlorothiazide',
    genericName: 'Hydrochlorothiazide',
    category: 'Thiazide Diuretic',
    usage: 'High blood pressure and fluid retention (edema).',
    dosage: '12.5-50mg once daily in the morning.',
    sideEffects: ['Increased urination', 'Low potassium', 'Dizziness', 'Increased blood sugar'],
    warnings: ['Take in morning to avoid nighttime urination', 'Monitor potassium levels', 'Stay hydrated'],
    storage: 'Store at room temperature'
  },
  'atorvastatin': {
    name: 'Atorvastatin',
    genericName: 'Atorvastatin Calcium',
    category: 'Statin (Cholesterol Lowering)',
    usage: 'High cholesterol and prevention of cardiovascular disease.',
    dosage: '10-80mg once daily, usually at bedtime.',
    sideEffects: ['Muscle pain', 'Headache', 'Nausea', 'Liver enzyme elevation'],
    warnings: ['Report unexplained muscle pain immediately', 'Avoid grapefruit', 'Regular liver function tests needed'],
    interactions: ['Grapefruit juice', 'Cyclosporine', 'Fibrates', 'Niacin'],
    storage: 'Store at room temperature'
  },
  'clopidogrel': {
    name: 'Clopidogrel',
    genericName: 'Clopidogrel Bisulfate',
    category: 'Antiplatelet',
    usage: 'Prevention of heart attack and stroke in patients with cardiovascular disease.',
    dosage: '75mg once daily.',
    sideEffects: ['Bleeding', 'Bruising', 'Stomach upset', 'Diarrhea'],
    warnings: ['Increased bleeding risk', 'Inform doctor before any surgery', 'Do not stop without doctor advice'],
    interactions: ['Omeprazole', 'Aspirin', 'NSAIDs', 'Warfarin'],
    storage: 'Store at room temperature'
  },
  'ecosprin': {
    name: 'Ecosprin',
    genericName: 'Aspirin 75mg/150mg (Enteric Coated)',
    category: 'Antiplatelet',
    usage: 'Prevention of heart attack and stroke.',
    dosage: '75-150mg once daily.',
    sideEffects: ['Bleeding', 'Stomach upset', 'Bruising'],
    warnings: ['Take after food', 'Do not crush tablet', 'Inform doctor of bleeding disorders'],
    storage: 'Store below 25°C'
  },

  // Vitamins & Supplements
  'vitamin c': {
    name: 'Vitamin C',
    genericName: 'Ascorbic Acid',
    category: 'Vitamin Supplement',
    usage: 'Immune support, antioxidant, and collagen synthesis. Prevention and treatment of vitamin C deficiency.',
    dosage: '500-1000mg daily. Higher doses for deficiency as directed.',
    sideEffects: ['Stomach upset', 'Diarrhea (high doses)', 'Kidney stones (very high doses)'],
    warnings: ['High doses may cause digestive upset', 'May affect blood sugar readings', 'Take with food if stomach upset occurs'],
    storage: 'Store in a cool, dry place away from light'
  },
  'limcee': {
    name: 'Limcee',
    genericName: 'Vitamin C 500mg (Chewable)',
    category: 'Vitamin Supplement',
    usage: 'Vitamin C supplementation and immune support.',
    dosage: '1-2 tablets daily.',
    sideEffects: ['Stomach upset with excess use'],
    warnings: ['Chew before swallowing', 'Do not exceed recommended dose'],
    storage: 'Store below 25°C'
  },
  'vitamin d': {
    name: 'Vitamin D',
    genericName: 'Cholecalciferol (Vitamin D3)',
    category: 'Vitamin Supplement',
    usage: 'Bone health, calcium absorption, immune function, and vitamin D deficiency.',
    dosage: '1000-4000 IU daily for maintenance. Higher doses for deficiency as prescribed.',
    sideEffects: ['Nausea', 'Vomiting', 'Weakness (toxicity)', 'Kidney problems (toxicity)'],
    warnings: ['Do not exceed 4000 IU daily without medical supervision', 'Take with fatty food for better absorption'],
    storage: 'Store at room temperature away from light'
  },
  'calcium': {
    name: 'Calcium',
    genericName: 'Calcium Carbonate / Calcium Citrate',
    category: 'Mineral Supplement',
    usage: 'Bone health, prevention of osteoporosis, and calcium deficiency.',
    dosage: '500-1000mg daily in divided doses with food.',
    sideEffects: ['Constipation', 'Gas', 'Bloating', 'Kidney stones (excess)'],
    warnings: ['Take with food for better absorption', 'Do not take with iron supplements', 'Split doses for better absorption'],
    interactions: ['Thyroid medications', 'Antibiotics', 'Iron supplements'],
    storage: 'Store at room temperature'
  },
  'shelcal': {
    name: 'Shelcal',
    genericName: 'Calcium Carbonate + Vitamin D3',
    category: 'Calcium + Vitamin D Supplement',
    usage: 'Calcium and vitamin D supplementation for bone health.',
    dosage: '1 tablet twice daily after meals.',
    sideEffects: ['Constipation', 'Bloating'],
    warnings: ['Take after food', 'Do not take with other mineral supplements'],
    storage: 'Store in a cool, dry place'
  },
  'iron': {
    name: 'Iron Supplement',
    genericName: 'Ferrous Sulfate / Ferrous Fumarate',
    category: 'Mineral Supplement',
    usage: 'Iron deficiency anemia and iron supplementation.',
    dosage: '325mg (65mg elemental iron) 1-3 times daily as prescribed.',
    sideEffects: ['Constipation', 'Nausea', 'Dark stools', 'Stomach upset'],
    warnings: ['Take on empty stomach if tolerated, otherwise with food', 'Vitamin C enhances absorption', 'Keep away from children'],
    interactions: ['Antacids', 'Calcium', 'Tetracyclines', 'Thyroid medications'],
    storage: 'Store at room temperature'
  },
  'b-complex': {
    name: 'B-Complex',
    genericName: 'Vitamin B Complex',
    category: 'Vitamin Supplement',
    usage: 'B vitamin supplementation for energy, nerve function, and overall health.',
    dosage: '1 tablet daily with food.',
    sideEffects: ['Bright yellow urine', 'Nausea', 'Stomach upset'],
    warnings: ['May cause bright yellow urine (harmless)', 'Take with food'],
    storage: 'Store in a cool, dry place'
  },
  'neurobion': {
    name: 'Neurobion',
    genericName: 'Vitamin B1 + B6 + B12',
    category: 'Vitamin B Supplement',
    usage: 'Nerve health, neuropathy, and vitamin B deficiency.',
    dosage: '1 tablet daily or as prescribed.',
    sideEffects: ['Nausea', 'Diarrhea', 'Headache'],
    warnings: ['Take with meals for better absorption'],
    storage: 'Store below 25°C'
  },
  'multivitamin': {
    name: 'Multivitamin',
    genericName: 'Multiple Vitamins and Minerals',
    category: 'Vitamin/Mineral Supplement',
    usage: 'Daily nutritional supplementation to fill dietary gaps.',
    dosage: '1 tablet daily with food.',
    sideEffects: ['Nausea', 'Stomach upset', 'Constipation'],
    warnings: ['Do not exceed recommended dose', 'Take with food', 'Keep away from children'],
    storage: 'Store in a cool, dry place'
  },
  'omega 3': {
    name: 'Omega 3',
    genericName: 'Fish Oil (EPA + DHA)',
    category: 'Fatty Acid Supplement',
    usage: 'Heart health, brain function, and reducing triglycerides.',
    dosage: '1-2 capsules daily with food.',
    sideEffects: ['Fishy aftertaste', 'Burping', 'Nausea', 'Loose stools'],
    warnings: ['Take with food to reduce fishy burps', 'May increase bleeding risk', 'Inform doctor before surgery'],
    interactions: ['Blood thinners', 'Blood pressure medications'],
    storage: 'Store in refrigerator to prevent rancidity'
  },
  'zinc': {
    name: 'Zinc',
    genericName: 'Zinc Sulfate / Zinc Gluconate',
    category: 'Mineral Supplement',
    usage: 'Immune support, wound healing, and zinc deficiency.',
    dosage: '15-30mg daily with food.',
    sideEffects: ['Nausea', 'Vomiting', 'Metallic taste', 'Stomach cramps'],
    warnings: ['Take with food to reduce stomach upset', 'Do not exceed 40mg daily', 'May interfere with copper absorption'],
    interactions: ['Antibiotics (take 2 hours apart)', 'Penicillamine'],
    storage: 'Store at room temperature'
  },

  // Skin & Topical
  'betadine': {
    name: 'Betadine',
    genericName: 'Povidone-Iodine',
    category: 'Antiseptic',
    usage: 'Wound disinfection, minor cuts, burns, and skin infections.',
    dosage: 'Apply to affected area 1-3 times daily.',
    sideEffects: ['Skin irritation', 'Allergic reaction', 'Staining'],
    warnings: ['External use only', 'Not for deep wounds', 'May stain skin and clothing', 'Avoid in thyroid disorders'],
    storage: 'Store at room temperature away from light'
  },
  'soframycin': {
    name: 'Soframycin',
    genericName: 'Framycetin Sulfate',
    category: 'Topical Antibiotic',
    usage: 'Minor skin infections, cuts, wounds, and burns.',
    dosage: 'Apply thin layer 2-3 times daily to affected area.',
    sideEffects: ['Skin irritation', 'Allergic reaction'],
    warnings: ['External use only', 'Do not use on large areas', 'Stop if irritation occurs'],
    storage: 'Store below 25°C'
  },
  'neosporin': {
    name: 'Neosporin',
    genericName: 'Bacitracin + Neomycin + Polymyxin B',
    category: 'Topical Antibiotic',
    usage: 'Prevention of infection in minor cuts, scrapes, and burns.',
    dosage: 'Apply to affected area 1-3 times daily. Cover with bandage if needed.',
    sideEffects: ['Skin irritation', 'Allergic reaction', 'Rash'],
    warnings: ['External use only', 'Do not use on large wounds', 'Stop if rash develops'],
    storage: 'Store at room temperature'
  },
  'clotrimazole': {
    name: 'Clotrimazole',
    genericName: 'Clotrimazole',
    category: 'Antifungal',
    usage: 'Fungal skin infections including athlete\'s foot, ringworm, and yeast infections.',
    dosage: 'Apply thin layer to affected area twice daily for 2-4 weeks.',
    sideEffects: ['Burning', 'Stinging', 'Redness', 'Itching'],
    warnings: ['External use only', 'Complete full course even if symptoms improve', 'Keep area clean and dry'],
    storage: 'Store at room temperature'
  },
  'candid': {
    name: 'Candid',
    genericName: 'Clotrimazole 1%',
    category: 'Antifungal',
    usage: 'Fungal infections of skin including ringworm, athlete\'s foot, and jock itch.',
    dosage: 'Apply twice daily for 2-4 weeks.',
    sideEffects: ['Mild burning', 'Irritation'],
    warnings: ['For external use only', 'Keep affected area clean and dry'],
    storage: 'Store below 30°C'
  },
  'terbinafine': {
    name: 'Terbinafine',
    genericName: 'Terbinafine Hydrochloride',
    category: 'Antifungal',
    usage: 'Fungal infections of skin and nails.',
    dosage: 'Cream: Apply once or twice daily for 1-2 weeks. Tablets: 250mg daily for 6-12 weeks for nail infections.',
    sideEffects: ['Cream: Irritation, redness. Tablets: Taste disturbance, headache, liver effects'],
    warnings: ['Tablets may affect liver - monitoring required', 'Complete full course'],
    storage: 'Store at room temperature'
  },
  'hydrocortisone': {
    name: 'Hydrocortisone',
    genericName: 'Hydrocortisone Acetate',
    category: 'Topical Corticosteroid',
    usage: 'Eczema, dermatitis, insect bites, and minor skin irritations.',
    dosage: 'Apply thin layer to affected area 1-2 times daily for up to 7 days.',
    sideEffects: ['Skin thinning (prolonged use)', 'Burning', 'Itching'],
    warnings: ['Do not use on face for long periods', 'Not for fungal or viral infections', 'Short-term use only'],
    storage: 'Store at room temperature'
  },
  'calamine': {
    name: 'Calamine Lotion',
    genericName: 'Calamine + Zinc Oxide',
    category: 'Skin Protectant / Anti-itch',
    usage: 'Relief of itching from insect bites, poison ivy, chickenpox, and minor skin irritations.',
    dosage: 'Apply to affected area as needed.',
    sideEffects: ['Rare skin irritation'],
    warnings: ['External use only', 'Shake well before use', 'Avoid contact with eyes'],
    storage: 'Store at room temperature'
  },

  // Eye Care
  'eye drops': {
    name: 'Eye Drops (Lubricant)',
    genericName: 'Carboxymethylcellulose / Hydroxypropyl Methylcellulose',
    category: 'Artificial Tears',
    usage: 'Dry eye relief and lubrication.',
    dosage: '1-2 drops in affected eye(s) as needed.',
    sideEffects: ['Temporary blurred vision', 'Mild stinging'],
    warnings: ['Do not touch dropper to eye', 'Remove contact lenses before use', 'Discard 4 weeks after opening'],
    storage: 'Store at room temperature'
  },
  'refresh tears': {
    name: 'Refresh Tears',
    genericName: 'Carboxymethylcellulose Sodium 0.5%',
    category: 'Artificial Tears',
    usage: 'Relief from dry, irritated eyes.',
    dosage: '1-2 drops as needed.',
    sideEffects: ['Temporary blurring', 'Mild burning'],
    warnings: ['Do not use if solution changes color', 'Wait 15 minutes before using other eye drops'],
    storage: 'Store below 25°C'
  },

  // Thyroid
  'levothyroxine': {
    name: 'Levothyroxine',
    genericName: 'Levothyroxine Sodium',
    category: 'Thyroid Hormone',
    usage: 'Hypothyroidism (underactive thyroid) replacement therapy.',
    dosage: 'Individualized: typically 25-200mcg daily on empty stomach.',
    sideEffects: ['Heart palpitations (overdose)', 'Weight loss (overdose)', 'Anxiety', 'Tremors'],
    warnings: ['Take on empty stomach 30-60 min before breakfast', 'Take at same time daily', 'Regular thyroid tests needed'],
    interactions: ['Calcium', 'Iron', 'Antacids', 'Coffee (take 4 hours apart)'],
    storage: 'Store at room temperature away from moisture'
  },
  'thyronorm': {
    name: 'Thyronorm',
    genericName: 'Levothyroxine Sodium',
    category: 'Thyroid Hormone',
    usage: 'Treatment of hypothyroidism.',
    dosage: 'As prescribed by doctor, usually once daily on empty stomach.',
    sideEffects: ['Palpitations', 'Weight changes', 'Sweating'],
    warnings: ['Take 30 minutes before food', 'Do not stop without doctor advice', 'Regular monitoring required'],
    storage: 'Store below 25°C'
  },

  // Mental Health
  'alprazolam': {
    name: 'Alprazolam',
    genericName: 'Alprazolam',
    category: 'Benzodiazepine (Anxiolytic)',
    usage: 'Anxiety disorders and panic disorder. Short-term use only.',
    dosage: '0.25-0.5mg three times daily. Maximum varies by condition.',
    sideEffects: ['Drowsiness', 'Dizziness', 'Memory problems', 'Dependence'],
    warnings: ['CONTROLLED SUBSTANCE - high addiction potential', 'Do not stop suddenly', 'Avoid alcohol', 'Do not drive'],
    interactions: ['Alcohol', 'Opioids', 'Other sedatives'],
    storage: 'Store at room temperature. Keep secure.'
  },
  'escitalopram': {
    name: 'Escitalopram',
    genericName: 'Escitalopram Oxalate',
    category: 'SSRI Antidepressant',
    usage: 'Depression, generalized anxiety disorder, and panic disorder.',
    dosage: '10-20mg once daily.',
    sideEffects: ['Nausea', 'Insomnia', 'Drowsiness', 'Sexual dysfunction', 'Weight changes'],
    warnings: ['May take 2-4 weeks for full effect', 'Do not stop suddenly', 'Monitor for suicidal thoughts initially', 'Avoid alcohol'],
    interactions: ['MAO inhibitors', 'Tramadol', 'Other antidepressants', 'Blood thinners'],
    storage: 'Store at room temperature'
  },
  'sertraline': {
    name: 'Sertraline',
    genericName: 'Sertraline Hydrochloride',
    category: 'SSRI Antidepressant',
    usage: 'Depression, OCD, panic disorder, PTSD, and social anxiety.',
    dosage: '50-200mg once daily.',
    sideEffects: ['Nausea', 'Diarrhea', 'Insomnia', 'Sexual dysfunction', 'Dizziness'],
    warnings: ['Takes 2-4 weeks for effect', 'Do not stop abruptly', 'Watch for mood changes'],
    storage: 'Store at room temperature'
  },
  'amitriptyline': {
    name: 'Amitriptyline',
    genericName: 'Amitriptyline Hydrochloride',
    category: 'Tricyclic Antidepressant',
    usage: 'Depression, chronic pain, migraine prevention, and insomnia.',
    dosage: '25-150mg daily, usually at bedtime.',
    sideEffects: ['Drowsiness', 'Dry mouth', 'Constipation', 'Weight gain', 'Blurred vision'],
    warnings: ['May cause drowsiness', 'Do not stop suddenly', 'Avoid alcohol', 'Caution in heart disease'],
    interactions: ['MAO inhibitors', 'SSRIs', 'Alcohol', 'Antihistamines'],
    storage: 'Store at room temperature protected from light'
  },

  // Muscle Relaxants
  'muscle relaxant': {
    name: 'Muscle Relaxant',
    genericName: 'Cyclobenzaprine / Methocarbamol',
    category: 'Skeletal Muscle Relaxant',
    usage: 'Relief of muscle spasms and associated pain.',
    dosage: 'Cyclobenzaprine: 5-10mg three times daily. Methocarbamol: 1500mg four times daily initially.',
    sideEffects: ['Drowsiness', 'Dizziness', 'Dry mouth', 'Fatigue'],
    warnings: ['May cause significant drowsiness', 'Do not drive', 'Short-term use only (2-3 weeks)'],
    storage: 'Store at room temperature'
  },
  'thiocolchicoside': {
    name: 'Thiocolchicoside',
    genericName: 'Thiocolchicoside',
    category: 'Muscle Relaxant',
    usage: 'Muscle spasms and stiffness, particularly in back and neck.',
    dosage: '4-8mg twice daily for up to 7 days.',
    sideEffects: ['Drowsiness', 'Diarrhea', 'Nausea', 'Allergic reactions'],
    warnings: ['Short-term use only', 'Not for chronic use', 'Avoid in pregnancy'],
    storage: 'Store below 25°C'
  },

  // Respiratory
  'salbutamol': {
    name: 'Salbutamol',
    genericName: 'Salbutamol / Albuterol',
    category: 'Bronchodilator (Beta-2 Agonist)',
    usage: 'Asthma and COPD. Quick relief of bronchospasm.',
    dosage: 'Inhaler: 1-2 puffs every 4-6 hours as needed. Nebulizer: 2.5-5mg.',
    sideEffects: ['Tremor', 'Palpitations', 'Headache', 'Nervousness'],
    warnings: ['Shake inhaler before use', 'Rinse mouth after use', 'Seek help if symptoms worsen', 'Do not exceed 8 puffs in 24 hours'],
    storage: 'Store at room temperature. Protect from freezing.'
  },
  'asthalin': {
    name: 'Asthalin',
    genericName: 'Salbutamol 100mcg Inhaler',
    category: 'Bronchodilator',
    usage: 'Quick relief of asthma symptoms and bronchospasm.',
    dosage: '1-2 puffs when needed. Maximum 8 puffs in 24 hours.',
    sideEffects: ['Trembling', 'Headache', 'Fast heartbeat'],
    warnings: ['Prime before first use', 'Shake well before each use', 'Rinse mouth after'],
    storage: 'Store below 30°C'
  },
  'budesonide': {
    name: 'Budesonide',
    genericName: 'Budesonide',
    category: 'Inhaled Corticosteroid',
    usage: 'Long-term asthma control and prevention of symptoms.',
    dosage: '200-400mcg twice daily. Adjust based on response.',
    sideEffects: ['Oral thrush', 'Hoarseness', 'Throat irritation', 'Cough'],
    warnings: ['Rinse mouth after each use', 'Not for acute attacks', 'Regular use required for benefit'],
    storage: 'Store at room temperature'
  },

  // Miscellaneous Common Medicines
  'saridon': {
    name: 'Saridon',
    genericName: 'Paracetamol + Propyphenazone + Caffeine',
    category: 'Analgesic Combination',
    usage: 'Headache, migraine, toothache, and body pain.',
    dosage: '1 tablet as needed. Maximum 3 tablets daily.',
    sideEffects: ['Nausea', 'Stomach upset', 'Dizziness'],
    warnings: ['Do not exceed recommended dose', 'Avoid with other paracetamol products', 'Contains caffeine'],
    storage: 'Store below 25°C'
  },
  'zincovit': {
    name: 'Zincovit',
    genericName: 'Multivitamins + Zinc + Grape Seed Extract',
    category: 'Multivitamin Supplement',
    usage: 'Nutritional supplementation and immune support.',
    dosage: '1 tablet daily with food.',
    sideEffects: ['Nausea', 'Stomach upset'],
    warnings: ['Take with food', 'Do not exceed recommended dose'],
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
  }
};

// Helper function to search medicines
export const searchMedicine = (query: string): MedicineInfo | null => {
  const normalizedQuery = query.toLowerCase().trim().replace(/[^a-z0-9\s]/g, '');
  
  // Direct match
  if (medicineDatabase[normalizedQuery]) {
    return medicineDatabase[normalizedQuery];
  }
  
  // Search in names and generic names
  for (const [key, medicine] of Object.entries(medicineDatabase)) {
    const name = medicine.name.toLowerCase();
    const genericName = medicine.genericName.toLowerCase();
    
    if (name.includes(normalizedQuery) || 
        genericName.includes(normalizedQuery) ||
        normalizedQuery.includes(name) ||
        normalizedQuery.includes(key)) {
      return medicine;
    }
  }
  
  // Fuzzy match - check if query contains medicine name or vice versa
  for (const [key, medicine] of Object.entries(medicineDatabase)) {
    const words = normalizedQuery.split(' ');
    for (const word of words) {
      if (word.length > 3 && (key.includes(word) || medicine.name.toLowerCase().includes(word))) {
        return medicine;
      }
    }
  }
  
  return null;
};

// Get all medicine names for autocomplete
export const getAllMedicineNames = (): string[] => {
  return Object.values(medicineDatabase).map(m => m.name);
};

// Get medicines by category
export const getMedicinesByCategory = (category: string): MedicineInfo[] => {
  return Object.values(medicineDatabase).filter(m => 
    m.category.toLowerCase().includes(category.toLowerCase())
  );
};
