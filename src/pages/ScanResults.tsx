import { useParams, useSearchParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Shield, 
  Zap, 
  Eye, 
  Search, 
  AlertTriangle, 
  CheckCircle, 
  XCircle, 
  Download,
  RefreshCw,
  ExternalLink
} from "lucide-react";
import { AnalysisStorage } from "@/utils/AnalysisStorage";
import { useToast } from "@/hooks/use-toast";
import Navigation from "@/components/Navigation";

const ScanResults = () => {
  const { id } = useParams();
  const [searchParams] = useSearchParams();
  const url = searchParams.get('url') || 'example.com';
  const [analysisData, setAnalysisData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  const handleExportReport = () => {
    toast({
      title: "Report Export",
      description: "Report export functionality would be available in the full version.",
    });
  };

  const handleRescan = () => {
    if (id !== 'demo') {
      window.history.back();
    } else {
      toast({
        title: "Demo Mode",
        description: "This is a demo report. Try scanning a real website from the dashboard!",
      });
    }
  };

  useEffect(() => {
    if (id) {
      if (id === 'demo') {
        // Show demo data
        const demoResult = {
          url: 'https://demo.webauditai.com',
          timestamp: new Date().toISOString(),
          overallScore: 87,
          performance: {
            score: 89,
            issues: ['Large images without lazy loading', 'Multiple render-blocking CSS files'],
            recommendations: ['Implement lazy loading for images', 'Combine and minify CSS files']
          },
          seo: {
            score: 92,
            issues: ['Missing structured data', 'Title could be more descriptive'], 
            recommendations: ['Add JSON-LD structured data', 'Optimize title tags for better CTR']
          },
          accessibility: {
            score: 78,
            issues: ['Some images missing alt text', 'Color contrast issues on buttons'],
            recommendations: ['Add alt text to all images', 'Improve color contrast ratios']
          },
          security: {
            score: 91,
            issues: ['Mixed content warnings'],
            recommendations: ['Ensure all resources load over HTTPS']
          },
          gdpr: {
            compliant: true,
            issues: [],
            recommendations: ['Consider adding cookie preference center']
          },
          dependencies: {
            vulnerable: 1,
            outdated: 3,
            libraries: [
              { name: 'bootstrap', version: '4.5.0', vulnerability: 'XSS vulnerability in tooltips', severity: 'medium' }
            ]
          }
        };
        setAnalysisData(demoResult);
      } else {
        const analysis = AnalysisStorage.getAnalysis(id);
        if (analysis) {
          setAnalysisData(analysis.result);
        }
      }
    }
    setLoading(false);
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-background animate-gradient-shift animate-breathe" style={{ backgroundSize: '300% 300%' }}>
        <Navigation />
        <div className="container mx-auto px-4 py-8">
          <div className="text-center">
            <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary mx-auto"></div>
            <p className="mt-4 text-muted-foreground">Loading analysis results...</p>
          </div>
        </div>
      </div>
    );
  }

  if (!analysisData) {
    return (
      <div className="min-h-screen bg-gradient-background animate-gradient-shift animate-breathe" style={{ backgroundSize: '300% 300%' }}>
        <Navigation />
        <div className="container mx-auto px-4 py-8">
          <div className="text-center">
            <h1 className="text-2xl font-bold mb-4">Analysis Not Found</h1>
            <p className="text-muted-foreground mb-4">The requested analysis could not be found.</p>
            <Button onClick={() => window.history.back()}>Go Back</Button>
          </div>
        </div>
      </div>
    );
  }

  const scanData = {
    overall: analysisData.overallScore,
    performance: analysisData.performance.score,
    seo: analysisData.seo.score,
    accessibility: analysisData.accessibility.score,
    security: analysisData.security.score,
    compliance: analysisData.gdpr.compliant ? 95 : 60,
    issues: {
      critical: [
        ...analysisData.performance.issues.filter((_: any, i: number) => i < 2),
        ...analysisData.seo.issues.filter((_: any, i: number) => i < 2),
        ...analysisData.accessibility.issues.filter((_: any, i: number) => i < 1),
        ...analysisData.security.issues.filter((_: any, i: number) => i < 2),
      ].length,
      warning: [
        ...analysisData.performance.issues,
        ...analysisData.seo.issues,
        ...analysisData.accessibility.issues,
        ...analysisData.security.issues,
      ].length - 5,
      info: [
        ...analysisData.performance.recommendations.slice(0, 3),
        ...analysisData.seo.recommendations.slice(0, 3),
      ].length
    },
    scannedAt: new Date(analysisData.timestamp).toLocaleString()
  };

  const auditCategories = [
    {
      name: "Performance",
      score: analysisData.performance.score,
      icon: Zap,
      color: "success",
      issues: analysisData.performance.issues.map((issue: string, index: number) => ({
        type: index < 2 ? "critical" : "warning",
        message: issue,
        impact: index < 2 ? "High" : "Medium",
        recommendation: analysisData.performance.recommendations[index]
      }))
    },
    {
      name: "SEO",
      score: analysisData.seo.score,
      icon: Search,
      color: "success",
      issues: analysisData.seo.issues.map((issue: string, index: number) => ({
        type: index < 2 ? "critical" : "warning",
        message: issue,
        impact: index < 2 ? "High" : "Medium",
        recommendation: analysisData.seo.recommendations[index]
      }))
    },
    {
      name: "Accessibility",
      score: analysisData.accessibility.score,
      icon: Eye,
      color: "success",
      issues: analysisData.accessibility.issues.map((issue: string, index: number) => ({
        type: index < 1 ? "critical" : "warning",
        message: issue,
        impact: index < 1 ? "High" : "Medium",
        recommendation: analysisData.accessibility.recommendations[index]
      }))
    },
    {
      name: "Security",
      score: analysisData.security.score,
      icon: Shield,
      color: "warning",
      issues: analysisData.security.issues.map((issue: string, index: number) => ({
        type: index < 2 ? "critical" : "warning",
        message: issue,
        impact: "High",
        recommendation: analysisData.security.recommendations[index]
      }))
    }
  ];

  const getScoreColor = (score: number) => {
    if (score >= 90) return "success";
    if (score >= 70) return "warning";
    return "destructive";
  };

  const getIssueIcon = (type: string) => {
    switch (type) {
      case "critical": return XCircle;
      case "warning": return AlertTriangle;
      case "info": return CheckCircle;
      default: return CheckCircle;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-background animate-gradient-shift animate-breathe" style={{ backgroundSize: '300% 300%' }}>
      <Navigation />
      
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="mb-8">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h1 className="text-3xl font-bold mb-2">Scan Results</h1>
                <div className="flex items-center gap-2 text-muted-foreground">
                  <span>{url}</span>
                  <ExternalLink className="h-4 w-4" />
                  <span>•</span>
                  <span>Scanned {scanData.scannedAt}</span>
                </div>
              </div>
              <div className="flex gap-2">
                <Button variant="outline" size="sm" onClick={handleRescan}>
                  <RefreshCw className="h-4 w-4 mr-2" />
                  Rescan
                </Button>
                <Button size="sm" className="bg-gradient-primary" onClick={handleExportReport}>
                  <Download className="h-4 w-4 mr-2" />
                  Export Report
                </Button>
              </div>
            </div>
          </div>

          {/* Overall Score */}
          <Card className="mb-8 bg-gradient-card border-primary/20 shadow-elevated">
            <CardHeader>
              <CardTitle className="text-center">Overall Score</CardTitle>
            </CardHeader>
            <CardContent className="text-center">
              <div className="relative inline-flex items-center justify-center w-32 h-32 mb-4">
                <div className="absolute inset-0 rounded-full bg-gradient-primary opacity-20"></div>
                <div className="relative text-4xl font-bold">
                  {scanData.overall}
                  <span className="text-lg text-muted-foreground">/100</span>
                </div>
              </div>
              <div className="flex justify-center gap-6 text-sm">
                <div className="flex items-center gap-1">
                  <XCircle className="h-4 w-4 text-destructive" />
                  <span>{scanData.issues.critical} Critical</span>
                </div>
                <div className="flex items-center gap-1">
                  <AlertTriangle className="h-4 w-4 text-warning" />
                  <span>{scanData.issues.warning} Warnings</span>
                </div>
                <div className="flex items-center gap-1">
                  <CheckCircle className="h-4 w-4 text-info" />
                  <span>{scanData.issues.info} Info</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Category Scores */}
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {auditCategories.map((category) => {
              const Icon = category.icon;
              return (
                <Card key={category.name} className="bg-gradient-card border-primary/20 hover:shadow-elevated transition-shadow">
                  <CardHeader className="pb-2">
                    <div className="flex items-center justify-between">
                      <Icon className="h-5 w-5 text-primary" />
                      <Badge variant={getScoreColor(category.score) as any}>
                        {category.score}
                      </Badge>
                    </div>
                    <CardTitle className="text-lg">{category.name}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <Progress 
                      value={category.score} 
                      className="mb-3"
                    />
                    <div className="text-sm text-muted-foreground">
                      {category.issues.length} issues found
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>

          {/* Detailed Results */}
          <Tabs defaultValue="all" className="space-y-6">
            <TabsList className="grid w-full grid-cols-5 bg-card/50">
              <TabsTrigger value="all">All Issues</TabsTrigger>
              <TabsTrigger value="performance">Performance</TabsTrigger>
              <TabsTrigger value="seo">SEO</TabsTrigger>
              <TabsTrigger value="accessibility">Accessibility</TabsTrigger>
              <TabsTrigger value="security">Security</TabsTrigger>
            </TabsList>

            <TabsContent value="all" className="space-y-4">
              {auditCategories.map((category) => (
                <Card key={category.name} className="bg-gradient-card border-primary/20">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle className="flex items-center gap-2">
                        <category.icon className="h-5 w-5" />
                        {category.name} Issues
                      </CardTitle>
                      <Badge variant={getScoreColor(category.score) as any}>
                        {category.score}/100
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {category.issues.map((issue, index) => {
                        const IssueIcon = getIssueIcon(issue.type);
                        return (
                          <div key={index} className="flex items-start gap-3 p-3 rounded-lg bg-background/30">
                            <IssueIcon className={`h-5 w-5 mt-0.5 ${
                              issue.type === 'critical' ? 'text-destructive' :
                              issue.type === 'warning' ? 'text-warning' : 'text-info'
                            }`} />
                              <div className="flex-1">
                                <p className="font-medium">{issue.message}</p>
                                {issue.recommendation && (
                                  <p className="text-sm text-muted-foreground mt-1">
                                    <strong>Fix:</strong> {issue.recommendation}
                                  </p>
                                )}
                                <div className="flex items-center gap-4 mt-2">
                                  <Badge variant="outline">
                                    {issue.impact} Impact
                                  </Badge>
                                  <Button variant="link" size="sm" className="h-auto p-0 text-primary">
                                    Learn more
                                  </Button>
                                </div>
                              </div>
                          </div>
                        );
                      })}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </TabsContent>

            {auditCategories.map((category) => (
              <TabsContent key={category.name.toLowerCase()} value={category.name.toLowerCase()}>
                <Card className="bg-gradient-card border-primary/20">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <category.icon className="h-5 w-5" />
                      {category.name} Detailed Analysis
                    </CardTitle>
                    <CardDescription>
                      AI-powered insights and recommendations for {category.name.toLowerCase()} optimization
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="p-4 rounded-lg bg-primary/10 border border-primary/20">
                        <h4 className="font-medium text-primary mb-2">AI Recommendation</h4>
                        <p className="text-sm text-muted-foreground">
                          Our AI analysis suggests focusing on the critical issues first as they have the highest impact on your {category.name.toLowerCase()} score. 
                          We've prioritized the fixes based on effort vs. impact ratio.
                        </p>
                      </div>
                      
                      <div className="space-y-3">
                        {category.issues.map((issue, index) => {
                          const IssueIcon = getIssueIcon(issue.type);
                          return (
                            <div key={index} className="flex items-start gap-3 p-4 rounded-lg bg-background/30">
                              <IssueIcon className={`h-5 w-5 mt-0.5 ${
                                issue.type === 'critical' ? 'text-destructive' :
                                issue.type === 'warning' ? 'text-warning' : 'text-info'
                              }`} />
                               <div className="flex-1">
                                 <p className="font-medium">{issue.message}</p>
                                 <p className="text-sm text-muted-foreground mt-1">
                                   This issue affects your {category.name.toLowerCase()} score and should be addressed to improve your website's performance.
                                 </p>
                                 {issue.recommendation && (
                                   <div className="mt-2 p-2 bg-primary/10 rounded-md">
                                     <p className="text-sm"><strong>Recommended Fix:</strong> {issue.recommendation}</p>
                                   </div>
                                 )}
                                 <div className="flex items-center gap-4 mt-2">
                                   <Badge variant="outline">
                                     {issue.impact} Impact
                                   </Badge>
                                   <Button variant="link" size="sm" className="h-auto p-0 text-primary">
                                     Get detailed guide
                                   </Button>
                                 </div>
                               </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            ))}
          </Tabs>
        </div>
      </main>
    </div>
  );
};

export default ScanResults;