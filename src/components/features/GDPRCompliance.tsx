import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
import { Shield, AlertTriangle, CheckCircle, FileText, Download, Globe, Loader2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { WebsiteAnalyzer } from "@/utils/WebsiteAnalyzer";

const GDPRCompliance = () => {
  const [activeSection, setActiveSection] = useState<string | null>(null);
  const [url, setUrl] = useState("");
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisResult, setAnalysisResult] = useState<any>(null);
  const { toast } = useToast();

  const handleAnalyze = async (e: React.FormEvent) => {
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

    setIsAnalyzing(true);
    
    try {
      const fullUrl = url.startsWith('http') ? url : `https://${url}`;
      const result = await WebsiteAnalyzer.analyzeWebsite(fullUrl);
      setAnalysisResult(result.gdpr);
      
      toast({
        title: "GDPR Analysis Complete",
        description: `Found ${result.gdpr.issues.length} compliance issues`,
      });
    } catch (error) {
      console.error('GDPR analysis failed:', error);
      toast({
        title: "Analysis Failed",
        description: "Unable to analyze website for GDPR compliance",
        variant: "destructive",
      });
    } finally {
      setIsAnalyzing(false);
    }
  };

  const complianceIssues = [
    {
      category: "Data Collection",
      severity: "high",
      compliance: 65,
      issues: [
        { type: "Missing consent banner", status: "critical", description: "No GDPR consent mechanism detected" },
        { type: "Cookie disclosure", status: "warning", description: "Cookies set without explicit consent" },
        { type: "Privacy policy link", status: "good", description: "Privacy policy accessible" }
      ]
    },
    {
      category: "Data Processing",
      severity: "medium", 
      compliance: 78,
      issues: [
        { type: "Data retention policy", status: "warning", description: "No clear retention timeframes" },
        { type: "Processing lawfulness", status: "good", description: "Processing purposes documented" }
      ]
    },
    {
      category: "User Rights",
      severity: "low",
      compliance: 85,
      issues: [
        { type: "Data portability", status: "good", description: "Export functionality available" },
        { type: "Right to deletion", status: "good", description: "Account deletion process documented" }
      ]
    }
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <div className="p-2 rounded-lg bg-gradient-primary">
          <Shield className="h-5 w-5 text-primary-foreground" />
        </div>
        <div>
          <h2 className="text-xl font-semibold">GDPR Compliance Check</h2>
          <p className="text-sm text-muted-foreground">Legal compliance mapping and violation detection</p>
        </div>
      </div>

      {/* Website Analysis Form */}
      <Card className="bg-gradient-card border-primary/20">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Globe className="h-5 w-5 text-primary" />
            Analyze Website for GDPR Compliance
          </CardTitle>
          <CardDescription>
            Enter a website URL to perform live GDPR compliance analysis
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleAnalyze} className="flex gap-4">
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
              disabled={isAnalyzing}
              className="bg-gradient-primary hover:shadow-glow"
            >
              {isAnalyzing ? (
                <>
                  <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                  Analyzing...
                </>
              ) : (
                <>
                  <Shield className="h-4 w-4 mr-2" />
                  Analyze
                </>
              )}
            </Button>
          </form>
        </CardContent>
      </Card>

      {/* Live Analysis Results */}
      {analysisResult && (
        <Card className="bg-gradient-card border-primary/20 animate-fade-in">
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <span>Live GDPR Analysis Results</span>
              <Badge variant={analysisResult.compliant ? "default" : "destructive"}>
                {analysisResult.compliant ? "Compliant" : "Issues Found"}
              </Badge>
            </CardTitle>
            <CardDescription>
              Real-time analysis of {new URL(url.startsWith('http') ? url : `https://${url}`).hostname}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {/* Compliance Status */}
              <div className="flex items-center justify-between p-4 rounded-lg bg-background/30">
                <div className="flex items-center gap-3">
                  {analysisResult.compliant ? (
                    <CheckCircle className="h-6 w-6 text-success" />
                  ) : (
                    <AlertTriangle className="h-6 w-6 text-warning" />
                  )}
                  <div>
                    <h4 className="font-medium">
                      {analysisResult.compliant ? "GDPR Compliant" : "Compliance Issues Found"}
                    </h4>
                    <p className="text-sm text-muted-foreground">
                      {analysisResult.compliant 
                        ? "Website appears to meet GDPR requirements"
                        : `${analysisResult.issues.length} issues need attention`
                      }
                    </p>
                  </div>
                </div>
              </div>

              {/* Issues Found */}
              {analysisResult.issues.length > 0 && (
                <div>
                  <h4 className="font-medium mb-3">Issues Found</h4>
                  <div className="space-y-3">
                    {analysisResult.issues.map((issue: string, index: number) => (
                      <div key={index} className="flex items-start gap-3 p-3 rounded-lg bg-destructive/10 border border-destructive/20">
                        <AlertTriangle className="h-4 w-4 text-destructive mt-0.5" />
                        <div className="flex-1">
                          <p className="text-sm">{issue}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Recommendations */}
              {analysisResult.recommendations.length > 0 && (
                <div>
                  <h4 className="font-medium mb-3">Recommendations</h4>
                  <div className="space-y-3">
                    {analysisResult.recommendations.map((rec: string, index: number) => (
                      <div key={index} className="flex items-start gap-3 p-3 rounded-lg bg-primary/10 border border-primary/20">
                        <CheckCircle className="h-4 w-4 text-primary mt-0.5" />
                        <div className="flex-1">
                          <p className="text-sm">{rec}</p>
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

      {/* Overall Compliance Score */}
      <Card className="bg-gradient-card border-primary/20 animate-fade-in">
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <span>Overall GDPR Compliance</span>
            <Badge variant={76 >= 80 ? "default" : 76 >= 60 ? "secondary" : "destructive"}>
              76% Compliant
            </Badge>
          </CardTitle>
          <CardDescription>Based on technical analysis and regulatory requirements</CardDescription>
        </CardHeader>
        <CardContent>
          <Progress value={76} className="mb-4" />
          <div className="grid grid-cols-3 gap-4 text-center">
            <div>
              <div className="text-2xl font-bold text-success">8</div>
              <div className="text-sm text-muted-foreground">Compliant</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-warning">4</div>
              <div className="text-sm text-muted-foreground">Warnings</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-destructive">2</div>
              <div className="text-sm text-muted-foreground">Critical</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Compliance Categories */}
      <div className="grid gap-4">
        {complianceIssues.map((category, index) => (
          <Card 
            key={category.category}
            className={`bg-gradient-card border-primary/20 cursor-pointer transition-all duration-300 hover:shadow-elevated animate-slide-in-right`}
            style={{ animationDelay: `${index * 100}ms` }}
            onClick={() => setActiveSection(activeSection === category.category ? null : category.category)}
          >
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className={`w-3 h-3 rounded-full ${
                    category.severity === 'high' ? 'bg-destructive' :
                    category.severity === 'medium' ? 'bg-warning' : 'bg-success'
                  }`} />
                  <span>{category.category}</span>
                </div>
                <Badge variant="outline">{category.compliance}%</Badge>
              </CardTitle>
            </CardHeader>
            {activeSection === category.category && (
              <CardContent className="animate-accordion-down">
                <div className="space-y-3">
                  {category.issues.map((issue, issueIndex) => (
                    <div key={issueIndex} className="flex items-center justify-between p-3 rounded-lg bg-background/30">
                      <div className="flex items-center gap-3">
                        {issue.status === 'critical' ? (
                          <AlertTriangle className="h-4 w-4 text-destructive" />
                        ) : issue.status === 'warning' ? (
                          <AlertTriangle className="h-4 w-4 text-warning" />
                        ) : (
                          <CheckCircle className="h-4 w-4 text-success" />
                        )}
                        <div>
                          <div className="font-medium">{issue.type}</div>
                          <div className="text-sm text-muted-foreground">{issue.description}</div>
                        </div>
                      </div>
                      <Badge 
                        variant={issue.status === 'critical' ? 'destructive' : 
                                issue.status === 'warning' ? 'secondary' : 'default'}
                      >
                        {issue.status}
                      </Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            )}
          </Card>
        ))}
      </div>

      {/* Action Buttons */}
      <div className="flex gap-3">
        <Button className="bg-gradient-primary hover:shadow-glow">
          <FileText className="h-4 w-4 mr-2" />
          Generate Compliance Report
        </Button>
        <Button variant="outline">
          <Download className="h-4 w-4 mr-2" />
          Export Violations
        </Button>
      </div>
    </div>
  );
};

export default GDPRCompliance;