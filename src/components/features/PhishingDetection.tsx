import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { AlertTriangle, Shield, Eye, Globe, Download, RefreshCw } from "lucide-react";

const PhishingDetection = () => {
  const [isScanning, setIsScanning] = useState(false);

  const detectedThreats = [
    {
      url: "fake-site-copy.com",
      similarity: 94,
      riskLevel: "high",
      elements: ["Logo copied", "Color scheme match", "Layout identical"],
      detected: "2 hours ago"
    },
    {
      url: "phishing-variant.net",
      similarity: 78,
      riskLevel: "medium", 
      elements: ["Similar domain", "Copy text content", "Fake contact form"],
      detected: "1 day ago"
    },
    {
      url: "suspicious-clone.org",
      similarity: 65,
      riskLevel: "low",
      elements: ["Similar branding", "Copied footer"],
      detected: "3 days ago"
    }
  ];

  const brandProtectionStats = {
    totalScans: 156,
    threatsDetected: 8,
    activeMonitoring: 23,
    blockedDomains: 12
  };

  const handleRescan = () => {
    setIsScanning(true);
    setTimeout(() => setIsScanning(false), 3000);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-lg bg-gradient-warning">
            <Shield className="h-5 w-5 text-warning-foreground" />
          </div>
          <div>
            <h2 className="text-xl font-semibold">Brand Protection & Phishing Detection</h2>
            <p className="text-sm text-muted-foreground">Monitor for fraudulent copies and brand impersonation</p>
          </div>
        </div>
        <Button onClick={handleRescan} disabled={isScanning} className="bg-gradient-primary hover:shadow-glow">
          <RefreshCw className={`h-4 w-4 mr-2 ${isScanning ? 'animate-spin' : ''}`} />
          {isScanning ? 'Scanning...' : 'Rescan Web'}
        </Button>
      </div>

      {/* Alert for High-Risk Threats */}
      <Alert className="border-destructive/50 bg-destructive/10 animate-pulse-glow">
        <AlertTriangle className="h-4 w-4 text-destructive" />
        <AlertDescription className="text-destructive-foreground">
          <strong>2 high-risk phishing sites detected</strong> - Immediate action recommended
        </AlertDescription>
      </Alert>

      {/* Brand Protection Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: "Total Scans", value: brandProtectionStats.totalScans, icon: Globe },
          { label: "Threats Detected", value: brandProtectionStats.threatsDetected, icon: AlertTriangle },
          { label: "Active Monitoring", value: brandProtectionStats.activeMonitoring, icon: Eye },
          { label: "Blocked Domains", value: brandProtectionStats.blockedDomains, icon: Shield }
        ].map((stat, index) => (
          <Card key={stat.label} className={`bg-gradient-card border-primary/20 animate-scale-in`} style={{ animationDelay: `${index * 100}ms` }}>
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <stat.icon className="h-8 w-8 text-primary" />
                <div>
                  <div className="text-2xl font-bold">{stat.value}</div>
                  <div className="text-sm text-muted-foreground">{stat.label}</div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Detection Results */}
      <Tabs defaultValue="threats" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="threats">Detected Threats</TabsTrigger>
          <TabsTrigger value="monitoring">Active Monitoring</TabsTrigger>
          <TabsTrigger value="reports">Reports</TabsTrigger>
        </TabsList>

        <TabsContent value="threats" className="space-y-4">
          {detectedThreats.map((threat, index) => (
            <Card key={threat.url} className={`bg-gradient-card border-primary/20 animate-slide-in-left`} style={{ animationDelay: `${index * 150}ms` }}>
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className={`w-3 h-3 rounded-full ${
                      threat.riskLevel === 'high' ? 'bg-destructive animate-pulse' :
                      threat.riskLevel === 'medium' ? 'bg-warning' : 'bg-info'
                    }`} />
                    <span className="font-mono text-sm">{threat.url}</span>
                  </div>
                  <Badge variant={threat.riskLevel === 'high' ? 'destructive' : threat.riskLevel === 'medium' ? 'secondary' : 'outline'}>
                    {threat.similarity}% Similar
                  </Badge>
                </CardTitle>
                <CardDescription>Detected {threat.detected}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div>
                    <h4 className="font-medium mb-2">Copied Elements:</h4>
                    <div className="flex flex-wrap gap-2">
                      {threat.elements.map((element, i) => (
                        <Badge key={i} variant="outline" className="text-xs">
                          {element}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button size="sm">
                      <Eye className="h-3 w-3 mr-1" />
                      View Site
                    </Button>
                    <Button size="sm" variant="outline">
                      <Download className="h-3 w-3 mr-1" />
                      Evidence Report
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </TabsContent>

        <TabsContent value="monitoring">
          <Card className="bg-gradient-card border-primary/20">
            <CardHeader>
              <CardTitle>Domain Monitoring Setup</CardTitle>
              <CardDescription>Configure automated monitoring for brand protection</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-center py-8 text-muted-foreground">
                <Globe className="h-12 w-12 mx-auto mb-4 opacity-50" />
                <p>Active monitoring for 23 domain variations</p>
                <p className="text-sm">Next scan in 4 hours</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="reports">
          <Card className="bg-gradient-card border-primary/20">
            <CardHeader>
              <CardTitle>Threat Intelligence Reports</CardTitle>
              <CardDescription>Download detailed analysis and evidence packages</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <Button className="w-full justify-start bg-gradient-primary hover:shadow-glow">
                  <Download className="h-4 w-4 mr-2" />
                  Weekly Threat Summary Report
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <Download className="h-4 w-4 mr-2" />
                  Legal Evidence Package
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <Download className="h-4 w-4 mr-2" />
                  Brand Protection Analytics
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default PhishingDetection;