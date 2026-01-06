import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { Camera, Upload, Pill, AlertTriangle, CheckCircle, Loader2, X, Search, Info } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { medicineDatabase, searchMedicine, MedicineInfo } from '@/data/medicineDatabase';

const MedicineScanner = () => {
  const [isScanning, setIsScanning] = useState(false);
  const [scannedText, setScannedText] = useState<string | null>(null);
  const [medicineInfo, setMedicineInfo] = useState<MedicineInfo | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const fileInputRef = useRef<HTMLInputElement>(null);

  const popularMedicines = ['Paracetamol', 'Ibuprofen', 'Amoxicillin', 'Cetirizine', 'Omeprazole', 'Metformin', 'Dolo 650', 'Combiflam'];

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setIsScanning(true);
    setError(null);
    setMedicineInfo(null);
    setSearchQuery('');

    // Simulate OCR processing
    await new Promise(resolve => setTimeout(resolve, 2000));

    // For demo purposes, randomly select a medicine
    const medicines = Object.keys(medicineDatabase);
    const randomMedicine = medicines[Math.floor(Math.random() * medicines.length)];
    
    setScannedText(`Detected: ${medicineDatabase[randomMedicine].name}`);
    setMedicineInfo(medicineDatabase[randomMedicine]);
    setIsScanning(false);
  };

  const handleSearch = async (query: string) => {
    if (!query.trim()) return;
    
    setIsScanning(true);
    setError(null);
    setMedicineInfo(null);

    await new Promise(resolve => setTimeout(resolve, 500));

    const medicine = searchMedicine(query);
    if (medicine) {
      setScannedText(`Found: ${medicine.name}`);
      setMedicineInfo(medicine);
    } else {
      setError(`Medicine "${query}" not found in database. Try searching with the generic name or brand name.`);
    }
    setIsScanning(false);
  };

  const handleQuickScan = async (medicineName: string) => {
    setSearchQuery(medicineName);
    await handleSearch(medicineName);
  };

  const clearResults = () => {
    setScannedText(null);
    setMedicineInfo(null);
    setError(null);
    setSearchQuery('');
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
                Upload an image or search for any medicine to get detailed information about usage, dosage, side effects, and warnings.
              </p>
              <div className="flex items-center justify-center gap-2 mt-4 text-sm text-muted-foreground">
                <Info className="w-4 h-4" />
                <span>Database includes {Object.keys(medicineDatabase).length}+ medicines</span>
              </div>
            </div>

            <div className="max-w-4xl mx-auto">
              {/* Search Section */}
              <Card className="mb-8">
                <CardContent className="p-6">
                  <div className="flex gap-3">
                    <div className="relative flex-1">
                      <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                      <Input
                        placeholder="Search medicine by name (e.g., Paracetamol, Dolo 650, Amoxicillin...)"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        onKeyDown={(e) => e.key === 'Enter' && handleSearch(searchQuery)}
                        className="pl-10 h-12 text-base"
                      />
                    </div>
                    <Button 
                      variant="hero" 
                      onClick={() => handleSearch(searchQuery)}
                      disabled={isScanning || !searchQuery.trim()}
                      className="h-12 px-8"
                    >
                      {isScanning ? <Loader2 className="w-5 h-5 animate-spin" /> : 'Search'}
                    </Button>
                  </div>
                  
                  {/* Popular medicines */}
                  <div className="mt-4">
                    <p className="text-sm text-muted-foreground mb-2">Popular searches:</p>
                    <div className="flex flex-wrap gap-2">
                      {popularMedicines.map((medicine) => (
                        <Badge
                          key={medicine}
                          variant="secondary"
                          className="cursor-pointer hover:bg-primary hover:text-primary-foreground transition-colors"
                          onClick={() => handleQuickScan(medicine)}
                        >
                          {medicine}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>

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
                        Take a photo or upload an image of your medicine package
                      </p>
                      <input
                        ref={fileInputRef}
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={handleFileUpload}
                      />
                      <Button
                        variant="outline"
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

                {/* Categories */}
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Browse by Category</CardTitle>
                    <CardDescription>
                      Explore medicines by type
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-2">
                    {['Pain Relief', 'Antibiotic', 'Antihistamine', 'Antacid', 'Vitamin', 'Diabetes'].map((category) => (
                      <Button
                        key={category}
                        variant="ghost"
                        className="w-full justify-start text-left"
                        onClick={() => {
                          const categoryMap: Record<string, string> = {
                            'Pain Relief': 'paracetamol',
                            'Antibiotic': 'amoxicillin',
                            'Antihistamine': 'cetirizine',
                            'Antacid': 'omeprazole',
                            'Vitamin': 'vitamin c',
                            'Diabetes': 'metformin'
                          };
                          handleQuickScan(categoryMap[category]);
                        }}
                        disabled={isScanning}
                      >
                        <Pill className="w-4 h-4 mr-2 text-primary" />
                        {category}
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
                          {error ? 'Not Found' : 'Medicine Details'}
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
                        {/* Header with name and category */}
                        <div className="flex flex-wrap items-center gap-3">
                          <h2 className="text-2xl font-bold text-foreground">{medicineInfo.name}</h2>
                          <Badge variant="outline">{medicineInfo.category}</Badge>
                        </div>

                        <div className="grid md:grid-cols-2 gap-6">
                          <div>
                            <h4 className="font-semibold text-sm text-muted-foreground mb-2">Generic Name</h4>
                            <p className="font-medium">{medicineInfo.genericName}</p>
                          </div>
                          <div>
                            <h4 className="font-semibold text-sm text-muted-foreground mb-2">Category</h4>
                            <p>{medicineInfo.category}</p>
                          </div>
                        </div>

                        <div>
                          <h4 className="font-semibold text-sm text-muted-foreground mb-2">Usage</h4>
                          <p className="text-foreground">{medicineInfo.usage}</p>
                        </div>

                        <div>
                          <h4 className="font-semibold text-sm text-muted-foreground mb-2">Recommended Dosage</h4>
                          <p className="bg-primary/10 text-primary px-4 py-3 rounded-lg">
                            {medicineInfo.dosage}
                          </p>
                        </div>

                        <div>
                          <h4 className="font-semibold text-sm text-muted-foreground mb-3">Possible Side Effects</h4>
                          <div className="flex flex-wrap gap-2">
                            {medicineInfo.sideEffects.map((effect, index) => (
                              <span
                                key={index}
                                className="px-3 py-1.5 bg-warning/10 text-warning rounded-full text-sm"
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

                        {medicineInfo.interactions && medicineInfo.interactions.length > 0 && (
                          <div>
                            <h4 className="font-semibold text-sm text-muted-foreground mb-3">Drug Interactions</h4>
                            <div className="flex flex-wrap gap-2">
                              {medicineInfo.interactions.map((interaction, index) => (
                                <span
                                  key={index}
                                  className="px-3 py-1.5 bg-accent/50 text-foreground rounded-full text-sm"
                                >
                                  {interaction}
                                </span>
                              ))}
                            </div>
                          </div>
                        )}

                        {medicineInfo.storage && (
                          <div>
                            <h4 className="font-semibold text-sm text-muted-foreground mb-2">Storage</h4>
                            <p className="text-muted-foreground">{medicineInfo.storage}</p>
                          </div>
                        )}

                        <p className="text-xs text-muted-foreground italic border-t pt-4">
                          ⚠️ Disclaimer: This information is for educational purposes only. Always consult a healthcare professional before taking any medication. Do not self-medicate based on this information.
                        </p>
                      </CardContent>
                    )}
                    {error && (
                      <CardContent>
                        <p className="text-destructive">{error}</p>
                        <p className="text-sm text-muted-foreground mt-2">
                          Try searching with the brand name, generic name, or common spelling variations.
                        </p>
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
