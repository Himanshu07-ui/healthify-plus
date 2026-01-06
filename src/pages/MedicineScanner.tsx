import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { Camera, Upload, Pill, AlertTriangle, CheckCircle, Loader2, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

interface MedicineInfo {
  name: string;
  genericName: string;
  usage: string;
  dosage: string;
  sideEffects: string[];
  warnings: string[];
}

const MedicineScanner = () => {
  const [isScanning, setIsScanning] = useState(false);
  const [scannedText, setScannedText] = useState<string | null>(null);
  const [medicineInfo, setMedicineInfo] = useState<MedicineInfo | null>(null);
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Mock medicine database
  const medicineDatabase: Record<string, MedicineInfo> = {
    'paracetamol': {
      name: 'Paracetamol',
      genericName: 'Acetaminophen',
      usage: 'Pain relief and fever reduction',
      dosage: '500-1000mg every 4-6 hours, max 4g/day',
      sideEffects: ['Nausea', 'Allergic reactions (rare)', 'Liver damage (overdose)'],
      warnings: ['Do not exceed recommended dose', 'Avoid alcohol', 'Consult doctor if symptoms persist']
    },
    'ibuprofen': {
      name: 'Ibuprofen',
      genericName: 'Ibuprofen',
      usage: 'Anti-inflammatory, pain relief, fever reduction',
      dosage: '200-400mg every 4-6 hours, max 1.2g/day',
      sideEffects: ['Stomach upset', 'Dizziness', 'Headache'],
      warnings: ['Take with food', 'Avoid if you have stomach ulcers', 'Not for long-term use']
    },
    'amoxicillin': {
      name: 'Amoxicillin',
      genericName: 'Amoxicillin',
      usage: 'Bacterial infections treatment',
      dosage: '250-500mg every 8 hours as prescribed',
      sideEffects: ['Diarrhea', 'Nausea', 'Skin rash'],
      warnings: ['Complete full course', 'Inform doctor of allergies', 'May reduce contraceptive effectiveness']
    },
    'cetirizine': {
      name: 'Cetirizine',
      genericName: 'Cetirizine Hydrochloride',
      usage: 'Allergy relief, antihistamine',
      dosage: '10mg once daily',
      sideEffects: ['Drowsiness', 'Dry mouth', 'Fatigue'],
      warnings: ['May cause drowsiness', 'Avoid alcohol', 'Use caution while driving']
    },
    'omeprazole': {
      name: 'Omeprazole',
      genericName: 'Omeprazole',
      usage: 'Acid reflux, GERD, stomach ulcers',
      dosage: '20-40mg once daily before breakfast',
      sideEffects: ['Headache', 'Nausea', 'Diarrhea'],
      warnings: ['Long-term use may affect bone health', 'Take before meals', 'Consult doctor for prolonged use']
    }
  };

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setIsScanning(true);
    setError(null);
    setMedicineInfo(null);

    // Simulate OCR processing
    await new Promise(resolve => setTimeout(resolve, 2000));

    // For demo purposes, randomly select a medicine
    const medicines = Object.keys(medicineDatabase);
    const randomMedicine = medicines[Math.floor(Math.random() * medicines.length)];
    
    setScannedText(`Detected: ${medicineDatabase[randomMedicine].name}`);
    setMedicineInfo(medicineDatabase[randomMedicine]);
    setIsScanning(false);
  };

  const handleDemoScan = async (medicineName: string) => {
    setIsScanning(true);
    setError(null);
    setMedicineInfo(null);

    await new Promise(resolve => setTimeout(resolve, 1500));

    const medicine = medicineDatabase[medicineName.toLowerCase()];
    if (medicine) {
      setScannedText(`Detected: ${medicine.name}`);
      setMedicineInfo(medicine);
    } else {
      setError('Medicine not found in database');
    }
    setIsScanning(false);
  };

  const clearResults = () => {
    setScannedText(null);
    setMedicineInfo(null);
    setError(null);
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <section className="py-16 bg-muted/30">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary mb-4"
              >
                <Pill className="w-4 h-4" />
                <span className="text-sm font-medium">Medicine Scanner</span>
              </motion.div>
              <h1 className="text-3xl md:text-4xl font-heading font-bold mb-4">
                Scan Your <span className="text-gradient">Medicine</span>
              </h1>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Upload an image of your medicine packaging to get detailed information about usage, dosage, and warnings.
              </p>
            </div>

            <div className="max-w-4xl mx-auto">
              <div className="grid md:grid-cols-2 gap-8">
                {/* Upload Section */}
                <Card className="border-2 border-dashed border-border hover:border-primary/50 transition-colors">
                  <CardContent className="p-8">
                    <div className="text-center">
                      <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                        <Camera className="w-8 h-8 text-primary" />
                      </div>
                      <h3 className="font-semibold mb-2">Upload Medicine Image</h3>
                      <p className="text-sm text-muted-foreground mb-6">
                        Take a photo or upload an image of your medicine
                      </p>
                      <input
                        ref={fileInputRef}
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={handleFileUpload}
                      />
                      <Button
                        variant="hero"
                        onClick={() => fileInputRef.current?.click()}
                        disabled={isScanning}
                        className="w-full"
                      >
                        {isScanning ? (
                          <>
                            <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                            Scanning...
                          </>
                        ) : (
                          <>
                            <Upload className="w-4 h-4 mr-2" />
                            Upload Image
                          </>
                        )}
                      </Button>
                    </div>
                  </CardContent>
                </Card>

                {/* Demo Quick Scan */}
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Quick Demo</CardTitle>
                    <CardDescription>
                      Try scanning these common medicines
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-2">
                    {Object.keys(medicineDatabase).map((medicine) => (
                      <Button
                        key={medicine}
                        variant="outline"
                        className="w-full justify-start"
                        onClick={() => handleDemoScan(medicine)}
                        disabled={isScanning}
                      >
                        <Pill className="w-4 h-4 mr-2 text-primary" />
                        {medicineDatabase[medicine].name}
                      </Button>
                    ))}
                  </CardContent>
                </Card>
              </div>

              {/* Results Section */}
              {(scannedText || error) && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-8"
                >
                  <Card>
                    <CardHeader className="flex flex-row items-center justify-between">
                      <div>
                        <CardTitle className="flex items-center gap-2">
                          {error ? (
                            <AlertTriangle className="w-5 h-5 text-destructive" />
                          ) : (
                            <CheckCircle className="w-5 h-5 text-success" />
                          )}
                          Scan Results
                        </CardTitle>
                        {scannedText && (
                          <CardDescription>{scannedText}</CardDescription>
                        )}
                      </div>
                      <Button variant="ghost" size="icon" onClick={clearResults}>
                        <X className="w-4 h-4" />
                      </Button>
                    </CardHeader>
                    {medicineInfo && (
                      <CardContent className="space-y-6">
                        <div className="grid md:grid-cols-2 gap-6">
                          <div>
                            <h4 className="font-semibold text-sm text-muted-foreground mb-2">Generic Name</h4>
                            <p className="font-medium">{medicineInfo.genericName}</p>
                          </div>
                          <div>
                            <h4 className="font-semibold text-sm text-muted-foreground mb-2">Usage</h4>
                            <p>{medicineInfo.usage}</p>
                          </div>
                          <div className="md:col-span-2">
                            <h4 className="font-semibold text-sm text-muted-foreground mb-2">Recommended Dosage</h4>
                            <p className="bg-primary/10 text-primary px-4 py-2 rounded-lg inline-block">
                              {medicineInfo.dosage}
                            </p>
                          </div>
                        </div>

                        <div>
                          <h4 className="font-semibold text-sm text-muted-foreground mb-3">Possible Side Effects</h4>
                          <div className="flex flex-wrap gap-2">
                            {medicineInfo.sideEffects.map((effect, index) => (
                              <span
                                key={index}
                                className="px-3 py-1 bg-warning/10 text-warning rounded-full text-sm"
                              >
                                {effect}
                              </span>
                            ))}
                          </div>
                        </div>

                        <div className="bg-destructive/10 border border-destructive/20 rounded-lg p-4">
                          <h4 className="font-semibold text-destructive flex items-center gap-2 mb-3">
                            <AlertTriangle className="w-4 h-4" />
                            Important Warnings
                          </h4>
                          <ul className="space-y-2">
                            {medicineInfo.warnings.map((warning, index) => (
                              <li key={index} className="text-sm text-muted-foreground flex items-start gap-2">
                                <span className="w-1.5 h-1.5 rounded-full bg-destructive mt-2 flex-shrink-0" />
                                {warning}
                              </li>
                            ))}
                          </ul>
                        </div>

                        <p className="text-xs text-muted-foreground italic">
                          Disclaimer: This information is for educational purposes only. Always consult a healthcare professional before taking any medication.
                        </p>
                      </CardContent>
                    )}
                    {error && (
                      <CardContent>
                        <p className="text-destructive">{error}</p>
                      </CardContent>
                    )}
                  </Card>
                </motion.div>
              )}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default MedicineScanner;
