import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Package, AlertTriangle, Shield, Download, ExternalLink, RefreshCw, Globe, Loader2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { WebsiteAnalyzer } from "@/utils/WebsiteAnalyzer";

const DependencyScanner = () => {
  const [isScanning, setIsScanning] = useState(false);
  const [url, setUrl] = useState("");
  const [scanResult, setScanResult] = useState<any>(null);
  const { toast } = useToast();

  const handleScan = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!url) return;

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
    
    try {
      const fullUrl = url.startsWith('http') ? url : `https://${url}`;
      const result = await WebsiteAnalyzer.analyzeWebsite(fullUrl);
      setScanResult(result.dependencies);
      
      toast({
        title: "Dependency Scan Complete",
        description: `Found ${result.dependencies.libraries.length} libraries, ${result.dependencies.vulnerable} with vulnerabilities`,
      });
    } catch (error) {
      console.error('Dependency scan failed:', error);
      toast({
        title: "Scan Failed",
        description: "Unable to scan website dependencies",
        variant: "destructive",
      });
    } finally {
      setIsScanning(false);
    }
  };

  const handleRescan = () => {
    setIsScanning(true);
    setTimeout(() => setIsScanning(false), 4000);
  };

  const vulnerabilities = [
    {
      package: "lodash",
      version: "4.17.15",
      severity: "high",
      cve: "CVE-2021-23337",
      description: "Command injection vulnerability in lodash",
      fixVersion: "4.17.21",
      patchAvailable: true
    },
    {
      package: "axios", 
      version: "0.21.1",
      severity: "medium",
      cve: "CVE-2021-3749",
      description: "Regular expression denial of service",
      fixVersion: "0.21.4",
      patchAvailable: true
    }
  ];

  const packageStats = {
    totalPackages: 847,
    vulnerablePackages: 12,
    highRisk: 3,
    mediumRisk: 5,
    lowRisk: 4,
    upToDate: 835
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-lg bg-gradient-primary">
            <Package className="h-5 w-5 text-primary-foreground" />
          </div>
          <div>
            <h2 className="text-xl font-semibold">Dependency Security Scanner</h2>
            <p className="text-sm text-muted-foreground">Detect vulnerable JavaScript libraries and dependencies</p>
          </div>
        </div>
        <Button onClick={handleRescan} disabled={isScanning} className="bg-gradient-primary hover:shadow-glow">
          <RefreshCw className={`h-4 w-4 mr-2 ${isScanning ? 'animate-spin' : ''}`} />
          {isScanning ? 'Scanning...' : 'Rescan Dependencies'}
        </Button>
      </div>

      {/* Website Scanning Form */}
      <Card className="bg-gradient-card border-primary/20">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Globe className="h-5 w-5 text-primary" />
            Scan Website Dependencies
          </CardTitle>
          <CardDescription>
            Enter a website URL to scan for vulnerable and outdated libraries
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
                className="h-10"
                required
              />
            </div>
            <Button 
              type="submit" 
              disabled={isScanning}
              className="bg-gradient-primary hover:shadow-glow"
            >
              {isScanning ? (
                <>
                  <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                  Scanning...
                </>
              ) : (
                <>
                  <Package className="h-4 w-4 mr-2" />
                  Scan Dependencies
                </>
              )}
            </Button>
          </form>
        </CardContent>
      </Card>

      {/* Live Scan Results */}
      {scanResult && (
        <Card className="bg-gradient-card border-primary/20 animate-fade-in">
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <span>Live Dependency Scan Results</span>
              <Badge variant={scanResult.vulnerable === 0 ? "default" : "destructive"}>
                {scanResult.vulnerable} Vulnerable
              </Badge>
            </CardTitle>
            <CardDescription>
              Found {scanResult.libraries.length} libraries
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="grid grid-cols-3 gap-4 text-center">
                <div>
                  <div className="text-2xl font-bold text-primary">{scanResult.libraries.length}</div>
                  <div className="text-sm text-muted-foreground">Total Libraries</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-destructive">{scanResult.vulnerable}</div>
                  <div className="text-sm text-muted-foreground">Vulnerable</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-warning">{scanResult.outdated}</div>
                  <div className="text-sm text-muted-foreground">Total Found</div>
                </div>
              </div>

              {scanResult.libraries.filter((lib: any) => lib.vulnerability).length > 0 && (
                <div>
                  <h4 className="font-medium mb-3">Vulnerable Libraries</h4>
                  <div className="space-y-3">
                    {scanResult.libraries
                      .filter((lib: any) => lib.vulnerability)
                      .map((lib: any, index: number) => (
                      <div key={index} className="flex items-start gap-3 p-3 rounded-lg bg-destructive/10 border border-destructive/20">
                        <AlertTriangle className="h-4 w-4 text-destructive mt-0.5" />
                        <div className="flex-1">
                          <div className="flex items-center justify-between">
                            <p className="font-medium">{lib.name} v{lib.version}</p>
                            <Badge variant="destructive">{lib.severity}</Badge>
                          </div>
                          <p className="text-sm text-muted-foreground mt-1">{lib.vulnerability}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      )}

      <Tabs defaultValue="vulnerabilities" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="vulnerabilities">Demo Vulnerabilities</TabsTrigger>
          <TabsTrigger value="packages">All Packages</TabsTrigger>
          <TabsTrigger value="reports">Security Reports</TabsTrigger>
        </TabsList>

        <TabsContent value="vulnerabilities" className="space-y-4">
          {vulnerabilities.map((vuln, index) => (
            <Card key={vuln.cve} className={`bg-gradient-card border-primary/20 animate-slide-in-right`} style={{ animationDelay: `${index * 150}ms` }}>
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className={`w-3 h-3 rounded-full ${
                      vuln.severity === 'high' ? 'bg-destructive animate-pulse' :
                      vuln.severity === 'medium' ? 'bg-warning' : 'bg-info'
                    }`} />
                    <span className="font-mono">{vuln.package}@{vuln.version}</span>
                  </div>
                  <Badge variant={vuln.severity === 'high' ? 'destructive' : 'secondary'}>
                    {vuln.severity.toUpperCase()}
                  </Badge>
                </CardTitle>
              </CardHeader>
            </Card>
          ))}
        </TabsContent>

        <TabsContent value="packages">
          <Card className="bg-gradient-card border-primary/20">
            <CardContent className="text-center py-8">
              <Package className="h-12 w-12 mx-auto mb-4 opacity-50" />
              <p>Package analysis results will appear here</p>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="reports">
          <Card className="bg-gradient-card border-primary/20">
            <CardContent>
              <Button className="w-full bg-gradient-primary hover:shadow-glow">
                <Download className="h-4 w-4 mr-2" />
                Download Security Report
              </Button>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default DependencyScanner;
