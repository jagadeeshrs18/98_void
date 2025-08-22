import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Zap, Shield, Search, Globe, ChevronRight, Plus, Package, PenTool, Eye, Building2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { WebsiteAnalyzer } from "@/utils/WebsiteAnalyzer";
import { AnalysisStorage } from "@/utils/AnalysisStorage";
import Navigation from "@/components/Navigation";
import GDPRCompliance from "@/components/features/GDPRCompliance";
import PhishingDetection from "@/components/features/PhishingDetection";
import DependencyScanner from "@/components/features/DependencyScanner";
import SEOContentWriter from "@/components/features/SEOContentWriter";
import AccessibilityOverlay from "@/components/features/AccessibilityOverlay";
import AgencyDashboard from "@/components/features/AgencyDashboard";

const Dashboard = () => {
  const [url, setUrl] = useState("");
  const [isScanning, setIsScanning] = useState(false);
  const [recentScans, setRecentScans] = useState<any[]>([]);
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleScan = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!url) return;

    // Validate URL format
    try {
      new URL(url.startsWith('http') ? url : `https://${url}`);
    } catch {
      toast({
        title: "Invalid URL",
        description: "Please enter a valid website URL",
        variant: "destructive",
      });
      return;
    }

    setIsScanning(true);
    
    toast({
      title: "Scan Started",
      description: "Analyzing your website with AI-powered tools...",
    });

    try {
      const fullUrl = url.startsWith('http') ? url : `https://${url}`;
      const result = await WebsiteAnalyzer.analyzeWebsite(fullUrl);
      const scanId = AnalysisStorage.saveAnalysis(fullUrl, result);
      
      toast({
        title: "Analysis Complete",
        description: "Your website has been successfully analyzed!",
      });
      
      // Refresh recent scans
      loadRecentScans();
      
      navigate(`/scan/${scanId}?url=${encodeURIComponent(fullUrl)}`);
    } catch (error) {
      console.error('Scan failed:', error);
      toast({
        title: "Scan Failed",
        description: "Unable to analyze the website. Please check the URL and try again.",
        variant: "destructive",
      });
    } finally {
      setIsScanning(false);
    }
  };

  const loadRecentScans = () => {
    const recent = AnalysisStorage.getRecentAnalyses(3);
    const formattedScans = recent.map((analysis, index) => ({
      id: analysis.id,
      url: new URL(analysis.url).hostname,
      score: analysis.result.overallScore,
      date: getRelativeTime(analysis.timestamp),
      status: "completed"
    }));
    setRecentScans(formattedScans);
  };

  const getRelativeTime = (timestamp: string) => {
    const now = new Date();
    const then = new Date(timestamp);
    const diffInHours = Math.floor((now.getTime() - then.getTime()) / (1000 * 60 * 60));
    
    if (diffInHours < 1) return "Just now";
    if (diffInHours < 24) return `${diffInHours} hour${diffInHours > 1 ? 's' : ''} ago`;
    const diffInDays = Math.floor(diffInHours / 24);
    return `${diffInDays} day${diffInDays > 1 ? 's' : ''} ago`;
  };

  useEffect(() => {
    // Initialize demo data if needed
    AnalysisStorage.initializeDemoData();
    loadRecentScans();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-background animate-gradient-shift animate-breathe" style={{ backgroundSize: '300% 300%' }}>
      <Navigation />
      
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold mb-2">Website Scanner</h1>
            <p className="text-muted-foreground">
              Enter a URL to start a comprehensive AI-powered audit of your website
            </p>
          </div>

          {/* Scanner Card */}
          <Card className="mb-8 bg-gradient-card border-primary/20 shadow-elevated">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Search className="h-5 w-5 text-primary" />
                Start New Scan
              </CardTitle>
              <CardDescription>
                Our AI will analyze your website for performance, SEO, accessibility, and security issues
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleScan} className="flex gap-4">
                <div className="flex-1">
                  <Input
                    type="url"
                    placeholder="https://example.com"
                    value={url}
                    onChange={(e) => setUrl(e.target.value)}
                    className="h-12 text-lg bg-background/50 border-primary/30"
                    required
                  />
                </div>
                <Button 
                  type="submit" 
                  size="lg"
                  disabled={isScanning}
                  className="bg-gradient-primary hover:shadow-glow px-8"
                >
                  {isScanning ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2" />
                      Scanning...
                    </>
                  ) : (
                    <>
                      <Zap className="h-4 w-4 mr-2" />
                      Scan Website
                    </>
                  )}
                </Button>
              </form>
            </CardContent>
          </Card>

          {/* Feature Tabs */}
          <Tabs defaultValue="scanner" className="w-full">
            <TabsList className="grid w-full grid-cols-7">
              <TabsTrigger value="scanner">Scanner</TabsTrigger>
              <TabsTrigger value="gdpr">GDPR</TabsTrigger>
              <TabsTrigger value="phishing">Security</TabsTrigger>
              <TabsTrigger value="dependencies">Dependencies</TabsTrigger>
              <TabsTrigger value="seo">SEO Writer</TabsTrigger>
              <TabsTrigger value="accessibility">A11y</TabsTrigger>
              <TabsTrigger value="agency">Agency</TabsTrigger>
            </TabsList>

            <TabsContent value="scanner" className="space-y-6">
              <div className="grid md:grid-cols-2 gap-8">
                {/* Recent Scans */}
                <Card className="bg-gradient-card border-primary/20 animate-fade-in">
                  <CardHeader>
                    <CardTitle className="flex items-center justify-between">
                      Recent Scans
                      <Badge variant="secondary">3 scans</Badge>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {recentScans.map((scan, index) => (
                        <div 
                          key={index}
                          className="flex items-center justify-between p-3 rounded-lg bg-background/30 hover:bg-background/50 transition-colors cursor-pointer group animate-slide-in-right"
                          style={{ animationDelay: `${index * 100}ms` }}
                          onClick={() => navigate(`/scan/${scan.id}?url=${encodeURIComponent(`https://${scan.url}`)}`)}
                        >
                          <div className="flex items-center gap-3">
                            <div className="w-2 h-2 rounded-full bg-success animate-pulse" />
                            <div>
                              <p className="font-medium">{scan.url}</p>
                              <p className="text-sm text-muted-foreground">{scan.date}</p>
                            </div>
                          </div>
                          <div className="flex items-center gap-2">
                            <Badge 
                              variant={scan.score >= 90 ? "default" : scan.score >= 70 ? "secondary" : "destructive"}
                            >
                              {scan.score}
                            </Badge>
                            <ChevronRight className="h-4 w-4 text-muted-foreground group-hover:text-primary transition-colors" />
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                {/* Premium Features */}
                <Card className="bg-gradient-card border-primary/20 animate-fade-in">
                  <CardHeader>
                    <CardTitle>Premium Features</CardTitle>
                    <CardDescription>Advanced auditing capabilities</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {[
                        { icon: Shield, label: "GDPR Compliance Check", desc: "Legal violation mapping" },
                        { icon: Package, label: "Dependency Scanner", desc: "Vulnerable libraries detection" },
                        { icon: PenTool, label: "AI SEO Writer", desc: "Content optimization" },
                        { icon: Eye, label: "Accessibility Overlay", desc: "WCAG compliance fixes" },
                        { icon: Building2, label: "Agency Dashboard", desc: "White-label reporting" }
                      ].map((feature, index) => (
                        <div key={feature.label} className={`flex items-center gap-3 p-3 rounded-lg bg-background/30 hover:bg-background/50 transition-all duration-300 cursor-pointer animate-scale-in`} style={{ animationDelay: `${index * 100}ms` }}>
                          <feature.icon className="h-5 w-5 text-primary" />
                          <div className="flex-1">
                            <div className="font-medium">{feature.label}</div>
                            <div className="text-xs text-muted-foreground">{feature.desc}</div>
                          </div>
                          <Badge variant="default" className="bg-gradient-primary">Pro</Badge>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="gdpr"><GDPRCompliance /></TabsContent>
            <TabsContent value="phishing"><PhishingDetection /></TabsContent>
            <TabsContent value="dependencies"><DependencyScanner /></TabsContent>
            <TabsContent value="seo"><SEOContentWriter /></TabsContent>
            <TabsContent value="accessibility"><AccessibilityOverlay /></TabsContent>
            <TabsContent value="agency"><AgencyDashboard /></TabsContent>
          </Tabs>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;