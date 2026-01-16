import { PageLayout } from '@/components/Layout';
import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Camera, Upload, Pill, AlertTriangle, CheckCircle, Loader2, X, Search, Info, Scan, History, GitCompare, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { supabase } from '@/integrations/supabase/client';
import { searchMedicine, Medicine, medicineDatabase } from '@/data/medicineDatabase';

type MedicineInfo = Medicine;
import { useAuth } from '@/hooks/useAuth';
import { toast } from 'sonner';

interface MedicineHistoryItem {
  id: string;
  medicine_name: string;
  generic_name: string | null;
  category: string | null;
  source: string;
  created_at: string;
}

const MedicineScanner = () => {
  const { user } = useAuth();
  const [isScanning, setIsScanning] = useState(false);
  const [isSearching, setIsSearching] = useState(false);
  const [scanResult, setScanResult] = useState<{ medicine: MedicineInfo | null; source: string } | null>(null);
  const [searchResult, setSearchResult] = useState<{ medicine: MedicineInfo | null; query: string } | null>(null);
  const [scanError, setScanError] = useState<string | null>(null);
  const [searchError, setSearchError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [history, setHistory] = useState<MedicineHistoryItem[]>([]);
  const [isLoadingHistory, setIsLoadingHistory] = useState(false);
  const [compareMedicines, setCompareMedicines] = useState<MedicineInfo[]>([]);
  const [activeTab, setActiveTab] = useState('scanner');
  const fileInputRef = useRef<HTMLInputElement>(null);

  const popularMedicines = ['Paracetamol', 'Ibuprofen', 'Amoxicillin', 'Cetirizine', 'Omeprazole', 'Metformin', 'Dolo 650', 'Combiflam'];

  useEffect(() => {
    if (user) {
      fetchHistory();
    }
  }, [user]);

  const fetchHistory = async () => {
    if (!user) return;
    setIsLoadingHistory(true);
    try {
      const { data, error } = await supabase
        .from('medicine_history')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false })
        .limit(20);

      if (error) throw error;
      setHistory(data || []);
    } catch (error) {
      console.error('Error fetching history:', error);
    } finally {
      setIsLoadingHistory(false);
    }
  };

  const saveToHistory = async (medicine: MedicineInfo, source: 'scan' | 'search') => {
    if (!user) return;
    try {
      await supabase.from('medicine_history').insert({
        user_id: user.id,
        medicine_name: medicine.name,
        generic_name: medicine.genericName,
        category: medicine.category,
        source
      });
      fetchHistory();
    } catch (error) {
      console.error('Error saving to history:', error);
    }
  };

  const deleteHistoryItem = async (id: string) => {
    try {
      await supabase.from('medicine_history').delete().eq('id', id);
      setHistory(prev => prev.filter(item => item.id !== id));
      toast.success('Removed from history');
    } catch (error) {
      console.error('Error deleting history item:', error);
    }
  };

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setIsScanning(true);
    setScanError(null);
    setScanResult(null);

    try {
      const reader = new FileReader();
      const imageBase64 = await new Promise<string>((resolve, reject) => {
        reader.onload = () => resolve(reader.result as string);
        reader.onerror = reject;
        reader.readAsDataURL(file);
      });

      const { data, error } = await supabase.functions.invoke('scan-medicine', {
        body: { imageBase64 }
      });

      if (error) throw error;

      if (data.medicineName) {
        const medicine = searchMedicine(data.medicineName) || 
                        (data.genericName ? searchMedicine(data.genericName) : null);
        
        if (medicine) {
          setScanResult({ 
            medicine, 
            source: `AI detected: ${data.medicineName}${data.genericName ? ` (${data.genericName})` : ''} - Confidence: ${data.confidence}` 
          });
          saveToHistory(medicine, 'scan');
        } else {
          setScanError(`Detected "${data.medicineName}" but not found in our database. Try searching manually.`);
        }
      } else {
        setScanError(data.reason || 'Could not identify the medicine from the image. Please ensure the medicine name is clearly visible.');
      }
    } catch (error: any) {
      console.error('Scan error:', error);
      setScanError('Failed to analyze image. Please try again or search manually.');
    } finally {
      setIsScanning(false);
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    }
  };

  const handleSearch = async (query: string) => {
    if (!query.trim()) return;
    
    setIsSearching(true);
    setSearchError(null);
    setSearchResult(null);

    await new Promise(resolve => setTimeout(resolve, 300));

    const medicine = searchMedicine(query);
    if (medicine) {
      setSearchResult({ medicine, query });
      saveToHistory(medicine, 'search');
    } else {
      setSearchError(`Medicine "${query}" not found in database. Try searching with the generic name or brand name.`);
    }
    setIsSearching(false);
  };

  const handleQuickScan = async (medicineName: string) => {
    setSearchQuery(medicineName);
    await handleSearch(medicineName);
  };

  const addToCompare = (medicine: MedicineInfo) => {
    if (compareMedicines.length >= 2) {
      toast.error('You can only compare 2 medicines at a time');
      return;
    }
    if (compareMedicines.find(m => m.name === medicine.name)) {
      toast.error('This medicine is already in compare list');
      return;
    }
    setCompareMedicines(prev => [...prev, medicine]);
    toast.success(`Added ${medicine.name} to compare`);
  };

  const removeFromCompare = (medicineName: string) => {
    setCompareMedicines(prev => prev.filter(m => m.name !== medicineName));
  };

  const clearScanResult = () => {
    setScanResult(null);
    setScanError(null);
  };

  const clearSearchResult = () => {
    setSearchResult(null);
    setSearchError(null);
    setSearchQuery('');
  };

  const renderMedicineInfo = (medicineInfo: MedicineInfo, source?: string, showCompareButton = true) => (
    <CardContent className="space-y-6">
      {source && (
        <p className="text-sm text-muted-foreground bg-muted/50 px-3 py-2 rounded-lg">
          {source}
        </p>
      )}
      
      <div className="flex flex-wrap items-center gap-3">
        <h2 className="text-2xl font-bold text-foreground">{medicineInfo.name}</h2>
        <Badge variant="outline">{medicineInfo.category}</Badge>
        {showCompareButton && (
          <Button 
            variant="outline" 
            size="sm" 
            onClick={() => addToCompare(medicineInfo)}
            disabled={compareMedicines.length >= 2 || compareMedicines.find(m => m.name === medicineInfo.name) !== undefined}
          >
            <GitCompare className="w-4 h-4 mr-1" />
            Compare
          </Button>
        )}
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
            <span key={index} className="px-3 py-1.5 bg-warning/10 text-warning rounded-full text-sm">
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
              <span key={index} className="px-3 py-1.5 bg-accent/50 text-foreground rounded-full text-sm">
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
        ⚠️ Disclaimer: This information is for educational purposes only. Always consult a healthcare professional.
      </p>
    </CardContent>
  );

  const renderCompareView = () => {
    if (compareMedicines.length === 0) {
      return (
        <Card className="text-center py-12">
          <CardContent>
            <GitCompare className="w-12 h-12 mx-auto text-muted-foreground mb-4" />
            <h3 className="text-lg font-semibold mb-2">Compare Medicines</h3>
            <p className="text-muted-foreground">
              Add medicines to compare from scan/search results or history
            </p>
          </CardContent>
        </Card>
      );
    }

    return (
      <div className="space-y-6">
        <div className="flex flex-wrap gap-2">
          {compareMedicines.map(medicine => (
            <Badge key={medicine.name} variant="secondary" className="text-sm py-1 px-3">
              {medicine.name}
              <button onClick={() => removeFromCompare(medicine.name)} className="ml-2 hover:text-destructive">
                <X className="w-3 h-3" />
              </button>
            </Badge>
          ))}
          {compareMedicines.length < 2 && (
            <span className="text-sm text-muted-foreground">Add {2 - compareMedicines.length} more to compare</span>
          )}
        </div>

        {compareMedicines.length === 2 && (
          <div className="grid md:grid-cols-2 gap-6">
            {compareMedicines.map((medicine, index) => (
              <Card key={medicine.name} className={index === 0 ? 'border-primary/30' : 'border-secondary/30'}>
                <CardHeader>
                  <CardTitle className="flex items-center justify-between">
                    <span>{medicine.name}</span>
                    <Badge variant="outline">{medicine.category}</Badge>
                  </CardTitle>
                  <CardDescription>{medicine.genericName}</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <h4 className="font-semibold text-sm text-muted-foreground mb-1">Usage</h4>
                    <p className="text-sm">{medicine.usage}</p>
                  </div>
                  <div>
                    <h4 className="font-semibold text-sm text-muted-foreground mb-1">Dosage</h4>
                    <p className="text-sm bg-primary/10 text-primary px-3 py-2 rounded">{medicine.dosage}</p>
                  </div>
                  <div>
                    <h4 className="font-semibold text-sm text-muted-foreground mb-1">Side Effects</h4>
                    <div className="flex flex-wrap gap-1">
                      {medicine.sideEffects.map((effect, i) => (
                        <span key={i} className="text-xs px-2 py-1 bg-warning/10 text-warning rounded-full">
                          {effect}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div>
                    <h4 className="font-semibold text-sm text-muted-foreground mb-1">Warnings</h4>
                    <ul className="text-sm space-y-1">
                      {medicine.warnings.slice(0, 3).map((warning, i) => (
                        <li key={i} className="text-destructive text-xs">• {warning}</li>
                      ))}
                    </ul>
                  </div>
                  {medicine.interactions && (
                    <div>
                      <h4 className="font-semibold text-sm text-muted-foreground mb-1">Interactions</h4>
                      <div className="flex flex-wrap gap-1">
                        {medicine.interactions.map((interaction, i) => (
                          <span key={i} className="text-xs px-2 py-1 bg-accent/50 rounded-full">
                            {interaction}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    );
  };

  return (
    <PageLayout>
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

            <div className="max-w-6xl mx-auto">
              <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
                <TabsList className="grid w-full grid-cols-3 mb-8">
                  <TabsTrigger value="scanner" className="flex items-center gap-2">
                    <Scan className="w-4 h-4" />
                    Scanner
                  </TabsTrigger>
                  <TabsTrigger value="history" className="flex items-center gap-2">
                    <History className="w-4 h-4" />
                    History {history.length > 0 && `(${history.length})`}
                  </TabsTrigger>
                  <TabsTrigger value="compare" className="flex items-center gap-2">
                    <GitCompare className="w-4 h-4" />
                    Compare {compareMedicines.length > 0 && `(${compareMedicines.length})`}
                  </TabsTrigger>
                </TabsList>

                <TabsContent value="scanner">
                  <div className="grid lg:grid-cols-2 gap-8">
                    {/* Left Column: Scan Section */}
                    <div className="space-y-6">
                      <Card className="border-2 border-dashed border-primary/30 hover:border-primary/50 transition-colors">
                        <CardHeader className="pb-4">
                          <CardTitle className="flex items-center gap-2">
                            <Scan className="w-5 h-5 text-primary" />
                            AI Medicine Scanner
                          </CardTitle>
                          <CardDescription>
                            Upload a photo and AI will identify the medicine
                          </CardDescription>
                        </CardHeader>
                        <CardContent>
                          <div className="text-center">
                            <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                              <Camera className="w-8 h-8 text-primary" />
                            </div>
                            <p className="text-sm text-muted-foreground mb-6">
                              Take a clear photo of the medicine packaging or label
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
                                  Analyzing with AI...
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

                      {/* Scan Results */}
                      <AnimatePresence>
                        {(scanResult || scanError) && (
                          <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                          >
                            <Card className="border-primary/20">
                              <CardHeader className="flex flex-row items-center justify-between pb-2">
                                <div>
                                  <CardTitle className="flex items-center gap-2 text-lg">
                                    {scanError ? (
                                      <AlertTriangle className="w-5 h-5 text-destructive" />
                                    ) : (
                                      <CheckCircle className="w-5 h-5 text-success" />
                                    )}
                                    {scanError ? 'Scan Failed' : 'Scan Result'}
                                  </CardTitle>
                                </div>
                                <Button variant="ghost" size="icon" onClick={clearScanResult}>
                                  <X className="w-4 h-4" />
                                </Button>
                              </CardHeader>
                              {scanResult?.medicine && renderMedicineInfo(scanResult.medicine, scanResult.source)}
                              {scanError && (
                                <CardContent>
                                  <p className="text-destructive">{scanError}</p>
                                </CardContent>
                              )}
                            </Card>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>

                    {/* Right Column: Search Section */}
                    <div className="space-y-6">
                      <Card>
                        <CardHeader className="pb-4">
                          <CardTitle className="flex items-center gap-2">
                            <Search className="w-5 h-5 text-primary" />
                            Search Medicine
                          </CardTitle>
                          <CardDescription>
                            Search by medicine name or generic name
                          </CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                          <div className="flex gap-3">
                            <div className="relative flex-1">
                              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                              <Input
                                placeholder="e.g., Paracetamol, Dolo 650..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                onKeyDown={(e) => e.key === 'Enter' && handleSearch(searchQuery)}
                                className="pl-10 h-12"
                              />
                            </div>
                            <Button 
                              variant="hero" 
                              onClick={() => handleSearch(searchQuery)}
                              disabled={isSearching || !searchQuery.trim()}
                              className="h-12 px-6"
                            >
                              {isSearching ? <Loader2 className="w-5 h-5 animate-spin" /> : 'Search'}
                            </Button>
                          </div>
                          
                          <div>
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

                          <div className="pt-4 border-t">
                            <p className="text-sm text-muted-foreground mb-2">Browse by category:</p>
                            <div className="grid grid-cols-2 gap-2">
                              {['Pain Relief', 'Antibiotic', 'Antihistamine', 'Antacid', 'Vitamin', 'Diabetes'].map((category) => (
                                <Button
                                  key={category}
                                  variant="ghost"
                                  size="sm"
                                  className="justify-start text-left"
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
                                  disabled={isSearching}
                                >
                                  <Pill className="w-3 h-3 mr-2 text-primary" />
                                  {category}
                                </Button>
                              ))}
                            </div>
                          </div>
                        </CardContent>
                      </Card>

                      {/* Search Results */}
                      <AnimatePresence>
                        {(searchResult || searchError) && (
                          <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                          >
                            <Card className="border-secondary/20">
                              <CardHeader className="flex flex-row items-center justify-between pb-2">
                                <div>
                                  <CardTitle className="flex items-center gap-2 text-lg">
                                    {searchError ? (
                                      <AlertTriangle className="w-5 h-5 text-destructive" />
                                    ) : (
                                      <CheckCircle className="w-5 h-5 text-success" />
                                    )}
                                    {searchError ? 'Not Found' : 'Search Result'}
                                  </CardTitle>
                                  {searchResult && (
                                    <CardDescription>Found: {searchResult.query}</CardDescription>
                                  )}
                                </div>
                                <Button variant="ghost" size="icon" onClick={clearSearchResult}>
                                  <X className="w-4 h-4" />
                                </Button>
                              </CardHeader>
                              {searchResult?.medicine && renderMedicineInfo(searchResult.medicine)}
                              {searchError && (
                                <CardContent>
                                  <p className="text-destructive">{searchError}</p>
                                  <p className="text-sm text-muted-foreground mt-2">
                                    Try searching with the brand name, generic name, or common spelling variations.
                                  </p>
                                </CardContent>
                              )}
                            </Card>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="history">
                  {!user ? (
                    <Card className="text-center py-12">
                      <CardContent>
                        <History className="w-12 h-12 mx-auto text-muted-foreground mb-4" />
                        <h3 className="text-lg font-semibold mb-2">Sign in to view history</h3>
                        <p className="text-muted-foreground">
                          Your scanned and searched medicines will be saved here
                        </p>
                      </CardContent>
                    </Card>
                  ) : isLoadingHistory ? (
                    <div className="flex items-center justify-center py-12">
                      <Loader2 className="w-8 h-8 animate-spin text-primary" />
                    </div>
                  ) : history.length === 0 ? (
                    <Card className="text-center py-12">
                      <CardContent>
                        <History className="w-12 h-12 mx-auto text-muted-foreground mb-4" />
                        <h3 className="text-lg font-semibold mb-2">No history yet</h3>
                        <p className="text-muted-foreground">
                          Scan or search medicines to build your history
                        </p>
                      </CardContent>
                    </Card>
                  ) : (
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                      {history.map((item) => {
                        const medicine = searchMedicine(item.medicine_name);
                        return (
                          <Card key={item.id} className="hover:shadow-md transition-shadow">
                            <CardHeader className="pb-2">
                              <div className="flex items-start justify-between">
                                <div>
                                  <CardTitle className="text-lg">{item.medicine_name}</CardTitle>
                                  <CardDescription>{item.generic_name}</CardDescription>
                                </div>
                                <div className="flex gap-1">
                                  {medicine && (
                                    <Button
                                      variant="ghost"
                                      size="icon"
                                      onClick={() => addToCompare(medicine)}
                                      disabled={compareMedicines.length >= 2}
                                    >
                                      <GitCompare className="w-4 h-4" />
                                    </Button>
                                  )}
                                  <Button
                                    variant="ghost"
                                    size="icon"
                                    onClick={() => deleteHistoryItem(item.id)}
                                    className="hover:text-destructive"
                                  >
                                    <Trash2 className="w-4 h-4" />
                                  </Button>
                                </div>
                              </div>
                            </CardHeader>
                            <CardContent>
                              <div className="flex items-center justify-between text-sm">
                                <Badge variant={item.source === 'scan' ? 'default' : 'secondary'}>
                                  {item.source === 'scan' ? 'Scanned' : 'Searched'}
                                </Badge>
                                <span className="text-muted-foreground">
                                  {new Date(item.created_at).toLocaleDateString()}
                                </span>
                              </div>
                              {item.category && (
                                <Badge variant="outline" className="mt-2">{item.category}</Badge>
                              )}
                              {medicine && (
                                <Button
                                  variant="link"
                                  className="p-0 h-auto mt-2"
                                  onClick={() => {
                                    setSearchResult({ medicine, query: item.medicine_name });
                                    setActiveTab('scanner');
                                  }}
                                >
                                  View details →
                                </Button>
                              )}
                            </CardContent>
                          </Card>
                        );
                      })}
                    </div>
                  )}
                </TabsContent>

                <TabsContent value="compare">
                  {renderCompareView()}
                </TabsContent>
              </Tabs>
            </div>
          </div>
        </section>
    </PageLayout>
  );
};

export default MedicineScanner;
