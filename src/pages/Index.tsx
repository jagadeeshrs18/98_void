import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Zap, 
  Shield, 
  Search, 
  Eye, 
  Brain, 
  FileText, 
  Users, 
  BarChart3,
  CheckCircle,
  ArrowRight,
  Sparkles
} from "lucide-react";
import { Link } from "react-router-dom";
import Navigation from "@/components/Navigation";
import heroImage from "@/assets/hero-bg.jpg";

const Index = () => {
  const features = [
    {
      icon: Brain,
      title: "AI-Powered Analysis",
      description: "Advanced machine learning algorithms provide intelligent insights and explanations in plain English.",
      color: "text-primary"
    },
    {
      icon: Shield,
      title: "GDPR Compliance Check",
      description: "Map technical flaws to legal violations and ensure your website meets all privacy regulations.",
      color: "text-success"
    },
    {
      icon: Search,
      title: "Phishing & Clone Detection",
      description: "Protect your brand with advanced detection of fraudulent websites and copycats.",
      color: "text-warning"
    },
    {
      icon: Eye,
      title: "Accessibility Auto-Fix",
      description: "Automatically improve ARIA attributes, color contrast, and provide accessibility overlays.",
      color: "text-info"
    },
    {
      icon: FileText,
      title: "Content & SEO Writer",
      description: "AI-generated content improvements, SEO optimizations, and structured data suggestions.",
      color: "text-primary"
    },
    {
      icon: Users,
      title: "White-Label Dashboard",
      description: "Multi-client agency dashboard with custom branding and comprehensive project management.",
      color: "text-success"
    }
  ];

  const stats = [
    { number: "10M+", label: "Websites Analyzed" },
    { number: "500+", label: "Agencies Trust Us" },
    { number: "99.9%", label: "Uptime Guarantee" },
    { number: "24/7", label: "AI Support" }
  ];

  const auditTypes = [
    { icon: Zap, name: "Performance", color: "text-warning" },
    { icon: Search, name: "SEO", color: "text-success" },
    { icon: Eye, name: "Accessibility", color: "text-info" },
    { icon: Shield, name: "Security", color: "text-destructive" },
    { icon: FileText, name: "Compliance", color: "text-primary" }
  ];

  return (
    <div className="min-h-screen bg-gradient-secondary">
      <Navigation />
      
      {/* Hero Section */}
      <section className="relative overflow-hidden animate-fade-in">
        <div 
          className="absolute inset-0 bg-cover bg-center opacity-20"
          style={{ backgroundImage: `url(${heroImage})` }}
        />
        <div className="absolute inset-0 bg-gradient-hero opacity-90" />
        
        <div className="relative container mx-auto px-4 py-24 lg:py-32">
          <div className="max-w-4xl mx-auto text-center">
            <Badge className="mb-6 bg-primary/20 text-primary border-primary/30 hover:bg-primary/30">
              <Sparkles className="h-3 w-3 mr-1" />
              AI-Powered Web Auditing Platform
            </Badge>
            
            <h1 className="text-4xl lg:text-6xl font-bold mb-6 bg-gradient-primary bg-clip-text text-transparent animate-scale-in">
              Transform Website Analysis with AI Intelligence
            </h1>
            
            <p className="text-xl text-muted-foreground mb-8 max-w-3xl mx-auto">
              Comprehensive web auditing powered by advanced AI. Get instant performance insights, 
              security analysis, accessibility fixes, and GDPR compliance checks - all explained in simple terms.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12 animate-fade-in">
              <Button
                size="lg" 
                className="bg-gradient-primary hover:shadow-glow px-8 py-3 text-lg hover-scale transition-all duration-300"
                asChild
              >
                <Link to="/dashboard">
                  Start Free Audit
                  <ArrowRight className="h-5 w-5 ml-2" />
                </Link>
              </Button>
              
              <Button variant="outline" size="lg" className="px-8 py-3 text-lg border-primary/30 hover:bg-primary/10 hover-scale transition-all duration-300" asChild>
                <Link to="/scan/demo?url=https://demo.webauditai.com">
                  View Demo Report
                </Link>
              </Button>
            </div>
            
            {/* Audit Types */}
            <div className="flex flex-wrap justify-center gap-4 animate-slide-in-right">
              {auditTypes.map((type) => (
                <div key={type.name} className="flex items-center gap-2 bg-background/20 backdrop-blur-sm rounded-full px-4 py-2 hover-scale transition-all duration-200">
                  <type.icon className={`h-4 w-4 ${type.color}`} />
                  <span className="text-sm font-medium">{type.name}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 border-y border-primary/20 bg-background/30 animate-fade-in">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center hover-scale transition-all duration-300">
                <div className="text-3xl lg:text-4xl font-bold text-primary mb-2">
                  {stat.number}
                </div>
                <div className="text-sm text-muted-foreground">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 animate-fade-in">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <Badge className="mb-4 bg-primary/20 text-primary border-primary/30">
                Advanced Features
              </Badge>
              <h2 className="text-3xl lg:text-4xl font-bold mb-4">
                Everything You Need for Comprehensive Web Auditing
              </h2>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                Our AI-powered platform combines technical analysis with intelligent explanations 
                to make web optimization accessible for everyone.
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {features.map((feature, index) => (
                <Card 
                  key={index} 
                  className="bg-gradient-card border-primary/20 hover:shadow-elevated transition-all duration-300 hover:border-primary/40 group hover-scale animate-scale-in"
                >
                  <CardHeader>
                    <div className={`w-12 h-12 rounded-lg bg-gradient-primary/20 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                      <feature.icon className={`h-6 w-6 ${feature.color}`} />
                    </div>
                    <CardTitle className="text-xl">{feature.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-base">
                      {feature.description}
                    </CardDescription>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-24 bg-background/30 animate-fade-in">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-16 items-center">
              <div>
                <Badge className="mb-4 bg-success/20 text-success border-success/30">
                  Agency Ready
                </Badge>
                <h2 className="text-3xl lg:text-4xl font-bold mb-6">
                  White-Label Solution for Digital Agencies
                </h2>
                <p className="text-lg text-muted-foreground mb-8">
                  Rebrand our platform with your logo and colors. Provide comprehensive 
                  audit reports to your clients with professional branding and detailed insights.
                </p>
                
                <div className="space-y-4 mb-8">
                  {[
                    "Custom branding and white-label reports",
                    "Multi-client dashboard management",
                    "Automated report delivery and scheduling",
                    "Advanced analytics and client insights"
                  ].map((benefit, index) => (
                    <div key={index} className="flex items-center gap-3">
                      <CheckCircle className="h-5 w-5 text-success flex-shrink-0" />
                      <span className="text-muted-foreground">{benefit}</span>
                    </div>
                  ))}
                </div>
                
                <Button className="bg-gradient-primary hover:shadow-glow hover-scale transition-all duration-300" asChild>
                  <Link to="/dashboard">
                    Learn More About Agency Features
                  </Link>
                </Button>
              </div>
              
              <div className="relative">
                <Card className="bg-gradient-card border-primary/20 shadow-elevated animate-slide-in-right hover-scale transition-all duration-300">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <BarChart3 className="h-5 w-5 text-primary" />
                      Live Dashboard Preview
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <span className="text-sm">Overall Performance</span>
                        <Badge variant="secondary">94/100</Badge>
                      </div>
                      <div className="space-y-2">
                        {auditTypes.map((type, index) => (
                          <div key={index} className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                              <type.icon className={`h-4 w-4 ${type.color}`} />
                              <span className="text-sm">{type.name}</span>
                            </div>
                            <div className="w-24 bg-background/50 rounded-full h-2">
                              <div 
                                className="bg-gradient-primary h-2 rounded-full" 
                                style={{ width: `${85 + Math.random() * 15}%` }}
                              />
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 animate-fade-in">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl lg:text-4xl font-bold mb-6">
              Ready to Transform Your Web Auditing?
            </h2>
            <p className="text-xl text-muted-foreground mb-8">
              Join thousands of agencies and developers who trust our AI-powered platform 
              for comprehensive website analysis and optimization.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                size="lg" 
                className="bg-gradient-primary hover:shadow-glow px-8 py-3 text-lg hover-scale transition-all duration-300"
                asChild
              >
                <Link to="/dashboard">
                  Start Your Free Audit
                  <ArrowRight className="h-5 w-5 ml-2" />
                </Link>
              </Button>
              
              <Button variant="outline" size="lg" className="px-8 py-3 text-lg border-primary/30 hover:bg-primary/10 hover-scale transition-all duration-300" asChild>
                <Link to="/dashboard">
                  Contact Sales
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-primary/20 py-12 bg-background/30">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto text-center">
            <div className="flex items-center justify-center gap-2 font-bold text-xl mb-4">
              <div className="w-8 h-8 rounded-lg bg-gradient-primary flex items-center justify-center">
                <Zap className="h-5 w-5 text-white" />
              </div>
              <span className="bg-gradient-primary bg-clip-text text-transparent">
                WebAudit AI
              </span>
            </div>
            <p className="text-muted-foreground">
              The most advanced AI-powered web auditing platform for agencies and developers.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;