import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { PenTool, Sparkles, Search, Code, Download, Copy, RefreshCw } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const SEOContentWriter = () => {
  const [isGenerating, setIsGenerating] = useState(false);
  const [selectedContent, setSelectedContent] = useState<string>("");
  const { toast } = useToast();

  const contentAnalysis = {
    seoScore: 73,
    readability: 82,
    keywordDensity: 1.8,
    contentLength: 1247,
    suggestions: [
      { type: "keyword", text: "Add more focus keywords in headers", priority: "high" },
      { type: "structure", text: "Break up long paragraphs", priority: "medium" },
      { type: "meta", text: "Meta description too short", priority: "high" },
      { type: "images", text: "Add alt text to 3 images", priority: "medium" }
    ]
  };

  const aiSuggestions = [
    {
      section: "Page Title",
      current: "About Us - Company Name",
      suggested: "Leading Web Solutions Provider | Expert Development Services | Company Name",
      improvement: "+24% SEO Score"
    },
    {
      section: "Meta Description",
      current: "Learn about our company and services.",
      suggested: "Discover innovative web solutions with our expert development team. 10+ years experience, 500+ successful projects. Get your free consultation today!",
      improvement: "+31% Click Rate"
    },
    {
      section: "H1 Header",
      current: "Welcome to Our Company",
      suggested: "Transform Your Business with Expert Web Development Solutions",
      improvement: "+18% Engagement"
    }
  ];

  const schemaTypes = [
    { type: "Organization", status: "active", description: "Company information and contact details" },
    { type: "LocalBusiness", status: "suggested", description: "Enhanced local SEO visibility" },
    { type: "WebSite", status: "active", description: "Site-wide search functionality" },
    { type: "Article", status: "missing", description: "Blog post and content markup" }
  ];

  const handleGenerate = (type: string) => {
    setIsGenerating(true);
    setTimeout(() => {
      setIsGenerating(false);
      toast({
        title: "Content Generated",
        description: `AI-powered ${type} suggestions are ready!`,
      });
    }, 3000);
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    toast({
      title: "Copied to clipboard",
      description: "Content copied successfully!",
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <div className="p-2 rounded-lg bg-gradient-primary">
          <PenTool className="h-5 w-5 text-primary-foreground" />
        </div>
        <div>
          <h2 className="text-xl font-semibold">AI Content & SEO Writer</h2>
          <p className="text-sm text-muted-foreground">Generate optimized content and structured data with AI</p>
        </div>
      </div>

      {/* Content Analysis Overview */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: "SEO Score", value: contentAnalysis.seoScore, suffix: "%", color: "text-primary" },
          { label: "Readability", value: contentAnalysis.readability, suffix: "%", color: "text-success" },
          { label: "Keyword Density", value: contentAnalysis.keywordDensity, suffix: "%", color: "text-warning" },
          { label: "Words", value: contentAnalysis.contentLength, suffix: "", color: "text-info" }
        ].map((stat, index) => (
          <Card key={stat.label} className={`bg-gradient-card border-primary/20 animate-scale-in`} style={{ animationDelay: `${index * 100}ms` }}>
            <CardContent className="p-4 text-center">
              <div className={`text-2xl font-bold ${stat.color}`}>{stat.value}{stat.suffix}</div>
              <div className="text-xs text-muted-foreground">{stat.label}</div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Main Content Tabs */}
      <Tabs defaultValue="suggestions" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="suggestions">AI Suggestions</TabsTrigger>
          <TabsTrigger value="writer">Content Writer</TabsTrigger>
          <TabsTrigger value="schema">Schema Markup</TabsTrigger>
          <TabsTrigger value="analysis">Content Analysis</TabsTrigger>
        </TabsList>

        <TabsContent value="suggestions" className="space-y-4">
          {aiSuggestions.map((suggestion, index) => (
            <Card key={suggestion.section} className={`bg-gradient-card border-primary/20 animate-slide-in-right`} style={{ animationDelay: `${index * 150}ms` }}>
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <span>{suggestion.section}</span>
                  <Badge variant="default" className="bg-gradient-success">
                    {suggestion.improvement}
                  </Badge>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <div className="text-sm font-medium text-muted-foreground mb-2">Current:</div>
                  <div className="p-3 rounded-lg bg-background/30 text-sm">
                    {suggestion.current}
                  </div>
                </div>
                <div>
                  <div className="text-sm font-medium text-success mb-2">AI Suggested:</div>
                  <div className="p-3 rounded-lg bg-success/10 border border-success/20 text-sm">
                    {suggestion.suggested}
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button size="sm" onClick={() => copyToClipboard(suggestion.suggested)}>
                    <Copy className="h-3 w-3 mr-1" />
                    Copy Suggestion
                  </Button>
                  <Button size="sm" variant="outline" onClick={() => handleGenerate("alternative")}>
                    <RefreshCw className="h-3 w-3 mr-1" />
                    Generate Alternative
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </TabsContent>

        <TabsContent value="writer" className="space-y-4">
          <Card className="bg-gradient-card border-primary/20">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Sparkles className="h-5 w-5 text-primary" />
                AI Content Generator
              </CardTitle>
              <CardDescription>Generate SEO-optimized content for any purpose</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                {["Blog Post", "Product Description", "Meta Tags", "Headlines"].map((type) => (
                  <Button 
                    key={type}
                    size="sm" 
                    variant="outline" 
                    onClick={() => handleGenerate(type)}
                    disabled={isGenerating}
                  >
                    {isGenerating ? <RefreshCw className="h-3 w-3 mr-1 animate-spin" /> : <Sparkles className="h-3 w-3 mr-1" />}
                    {type}
                  </Button>
                ))}
              </div>
              
              <Textarea 
                placeholder="Generated content will appear here, or enter your own content to analyze..."
                value={selectedContent}
                onChange={(e) => setSelectedContent(e.target.value)}
                className="min-h-[200px] bg-background/50"
              />
              
              <div className="flex gap-2">
                <Button className="bg-gradient-primary hover:shadow-glow">
                  <Sparkles className="h-4 w-4 mr-2" />
                  Optimize with AI
                </Button>
                <Button variant="outline">
                  <Search className="h-4 w-4 mr-2" />
                  SEO Analysis
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="schema" className="space-y-4">
          <Card className="bg-gradient-card border-primary/20">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Code className="h-5 w-5 text-primary" />
                Schema.org Structured Data
              </CardTitle>
              <CardDescription>Rich snippets and search engine markup</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {schemaTypes.map((schema, index) => (
                  <div key={schema.type} className={`flex items-center justify-between p-4 rounded-lg bg-background/30 animate-fade-in`} style={{ animationDelay: `${index * 100}ms` }}>
                    <div className="flex items-center gap-3">
                      <div className={`w-3 h-3 rounded-full ${
                        schema.status === 'active' ? 'bg-success' :
                        schema.status === 'suggested' ? 'bg-warning' : 'bg-destructive'
                      }`} />
                      <div>
                        <div className="font-medium">{schema.type}</div>
                        <div className="text-sm text-muted-foreground">{schema.description}</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge variant={
                        schema.status === 'active' ? 'default' :
                        schema.status === 'suggested' ? 'secondary' : 'outline'
                      }>
                        {schema.status}
                      </Badge>
                      {schema.status !== 'active' && (
                        <Button size="sm">Generate</Button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="analysis" className="space-y-4">
          <Card className="bg-gradient-card border-primary/20">
            <CardHeader>
              <CardTitle>Content Performance Analysis</CardTitle>
              <CardDescription>Detailed breakdown of content quality and SEO factors</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm font-medium">Overall SEO Score</span>
                  <span className="text-sm">{contentAnalysis.seoScore}%</span>
                </div>
                <Progress value={contentAnalysis.seoScore} className="mb-4" />
              </div>

              <div className="space-y-3">
                <h4 className="font-medium">Improvement Suggestions:</h4>
                {contentAnalysis.suggestions.map((suggestion, index) => (
                  <div key={index} className="flex items-center justify-between p-3 rounded-lg bg-background/30">
                    <span className="text-sm">{suggestion.text}</span>
                    <Badge variant={suggestion.priority === 'high' ? 'destructive' : 'secondary'}>
                      {suggestion.priority}
                    </Badge>
                  </div>
                ))}
              </div>

              <Button className="w-full bg-gradient-primary hover:shadow-glow">
                <Download className="h-4 w-4 mr-2" />
                Download SEO Report
              </Button>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default SEOContentWriter;