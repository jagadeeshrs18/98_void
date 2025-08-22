import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Slider } from "@/components/ui/slider";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { Eye, Volume2, Type, Contrast, MousePointer, Palette, Settings, Download } from "lucide-react";

const AccessibilityOverlay = () => {
  const [overlayEnabled, setOverlayEnabled] = useState(false);
  const [fontSize, setFontSize] = useState([100]);
  const [contrast, setContrast] = useState([100]);

  const accessibilityScore = 78;
  
  const issues = [
    { type: "Color Contrast", count: 8, severity: "high", description: "Text contrast below WCAG standards" },
    { type: "Missing Alt Text", count: 12, severity: "high", description: "Images without descriptive alt attributes" },
    { type: "ARIA Labels", count: 5, severity: "medium", description: "Interactive elements missing ARIA labels" },
    { type: "Focus Indicators", count: 3, severity: "medium", description: "Keyboard navigation focus not visible" },
    { type: "Heading Structure", count: 2, severity: "low", description: "Improper heading hierarchy" }
  ];

  const overlayFeatures = [
    { name: "High Contrast Mode", enabled: true, icon: Contrast },
    { name: "Large Text", enabled: false, icon: Type },
    { name: "Screen Reader", enabled: true, icon: Volume2 },
    { name: "Keyboard Navigation", enabled: true, icon: MousePointer },
    { name: "Color Blind Support", enabled: false, icon: Palette },
    { name: "Focus Highlights", enabled: true, icon: Eye }
  ];

  const wcagCompliance = {
    levelA: 92,
    levelAA: 78,
    levelAAA: 45
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-lg bg-gradient-primary">
            <Eye className="h-5 w-5 text-primary-foreground" />
          </div>
          <div>
            <h2 className="text-xl font-semibold">Accessibility Auto-Overlay</h2>
            <p className="text-sm text-muted-foreground">Automated fixes and accessible browsing overlay</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <span className="text-sm">Live Overlay</span>
          <Switch 
            checked={overlayEnabled} 
            onCheckedChange={setOverlayEnabled}
          />
        </div>
      </div>

      {/* Accessibility Score */}
      <Card className="bg-gradient-card border-primary/20 animate-fade-in">
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <span>Accessibility Score</span>
            <Badge variant={accessibilityScore >= 80 ? "default" : accessibilityScore >= 60 ? "secondary" : "destructive"}>
              {accessibilityScore}%
            </Badge>
          </CardTitle>
          <CardDescription>WCAG 2.1 compliance assessment</CardDescription>
        </CardHeader>
        <CardContent>
          <Progress value={accessibilityScore} className="mb-4" />
          <div className="grid grid-cols-3 gap-4">
            {Object.entries(wcagCompliance).map(([level, score]) => (
              <div key={level} className="text-center">
                <div className="text-lg font-semibold">{score}%</div>
                <div className="text-sm text-muted-foreground">{level.toUpperCase()}</div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Main Tabs */}
      <Tabs defaultValue="issues" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="issues">Issues</TabsTrigger>
          <TabsTrigger value="overlay">Live Overlay</TabsTrigger>
          <TabsTrigger value="fixes">Auto Fixes</TabsTrigger>
          <TabsTrigger value="reports">Reports</TabsTrigger>
        </TabsList>

        <TabsContent value="issues" className="space-y-4">
          {issues.map((issue, index) => (
            <Card key={issue.type} className={`bg-gradient-card border-primary/20 animate-slide-in-right`} style={{ animationDelay: `${index * 150}ms` }}>
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className={`w-3 h-3 rounded-full ${
                      issue.severity === 'high' ? 'bg-destructive animate-pulse' :
                      issue.severity === 'medium' ? 'bg-warning' : 'bg-info'
                    }`} />
                    <span>{issue.type}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge variant="outline">{issue.count} issues</Badge>
                    <Badge variant={issue.severity === 'high' ? 'destructive' : issue.severity === 'medium' ? 'secondary' : 'outline'}>
                      {issue.severity}
                    </Badge>
                  </div>
                </CardTitle>
                <CardDescription>{issue.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex gap-2">
                  <Button size="sm" className="bg-gradient-primary hover:shadow-glow">
                    <Settings className="h-3 w-3 mr-1" />
                    Auto Fix
                  </Button>
                  <Button size="sm" variant="outline">
                    <Eye className="h-3 w-3 mr-1" />
                    View Details
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </TabsContent>

        <TabsContent value="overlay" className="space-y-4">
          <Card className="bg-gradient-card border-primary/20">
            <CardHeader>
              <CardTitle>Accessibility Overlay Controls</CardTitle>
              <CardDescription>Real-time accessibility enhancements for users</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Font Size Control */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">Font Size</span>
                  <span className="text-sm text-muted-foreground">{fontSize[0]}%</span>
                </div>
                <Slider
                  value={fontSize}
                  onValueChange={setFontSize}
                  min={75}
                  max={200}
                  step={25}
                  className="w-full"
                />
              </div>

              {/* Contrast Control */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">Contrast</span>
                  <span className="text-sm text-muted-foreground">{contrast[0]}%</span>
                </div>
                <Slider
                  value={contrast}
                  onValueChange={setContrast}
                  min={50}
                  max={200}
                  step={25}
                  className="w-full"
                />
              </div>

              {/* Feature Toggles */}
              <div className="space-y-4">
                <h4 className="font-medium">Accessibility Features</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {overlayFeatures.map((feature, index) => (
                    <div key={feature.name} className={`flex items-center justify-between p-3 rounded-lg bg-background/30 animate-fade-in`} style={{ animationDelay: `${index * 100}ms` }}>
                      <div className="flex items-center gap-3">
                        <feature.icon className="h-4 w-4 text-primary" />
                        <span className="text-sm">{feature.name}</span>
                      </div>
                      <Switch defaultChecked={feature.enabled} />
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="fixes" className="space-y-4">
          <Card className="bg-gradient-card border-primary/20">
            <CardHeader>
              <CardTitle>Automated Accessibility Fixes</CardTitle>
              <CardDescription>AI-powered corrections for common accessibility issues</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-3">
                {[
                  { fix: "Add missing alt text to images", status: "ready", count: 12 },
                  { fix: "Improve color contrast ratios", status: "ready", count: 8 },
                  { fix: "Add ARIA labels to buttons", status: "ready", count: 5 },
                  { fix: "Fix heading hierarchy", status: "ready", count: 2 },
                  { fix: "Enhance keyboard navigation", status: "partial", count: 3 }
                ].map((fix, index) => (
                  <div key={fix.fix} className={`flex items-center justify-between p-4 rounded-lg bg-background/30 animate-slide-in-left`} style={{ animationDelay: `${index * 100}ms` }}>
                    <div>
                      <div className="font-medium">{fix.fix}</div>
                      <div className="text-sm text-muted-foreground">{fix.count} items to fix</div>
                    </div>
                    <Button size="sm" className="bg-gradient-success hover:shadow-success">
                      Apply Fix
                    </Button>
                  </div>
                ))}
              </div>
              
              <Button className="w-full bg-gradient-primary hover:shadow-glow">
                <Settings className="h-4 w-4 mr-2" />
                Apply All Fixes
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="reports" className="space-y-4">
          <Card className="bg-gradient-card border-primary/20">
            <CardHeader>
              <CardTitle>Accessibility Reports</CardTitle>
              <CardDescription>Compliance documentation and audit trails</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <Button className="w-full justify-start bg-gradient-primary hover:shadow-glow">
                  <Download className="h-4 w-4 mr-2" />
                  WCAG 2.1 Compliance Report
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <Download className="h-4 w-4 mr-2" />
                  Accessibility Audit Summary
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <Download className="h-4 w-4 mr-2" />
                  Screen Reader Test Results
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <Download className="h-4 w-4 mr-2" />
                  Color Contrast Analysis
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AccessibilityOverlay;