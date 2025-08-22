import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { Building2, Users, Globe, BarChart3, Settings, Plus, Download, Eye } from "lucide-react";

const AgencyDashboard = () => {
  const [selectedClient, setSelectedClient] = useState<string>("acme-corp");

  const clients = [
    {
      id: "acme-corp",
      name: "Acme Corporation",
      domain: "acmecorp.com",
      lastScan: "2 hours ago",
      status: "active",
      overallScore: 89,
      sites: 3,
      issues: 12
    },
    {
      id: "tech-startup",
      name: "TechStartup Inc",
      domain: "techstartup.io",
      lastScan: "1 day ago", 
      status: "active",
      overallScore: 76,
      sites: 1,
      issues: 23
    },
    {
      id: "retail-co",
      name: "Retail Co",
      domain: "retailcompany.com",
      lastScan: "3 days ago",
      status: "inactive",
      overallScore: 67,
      sites: 5,
      issues: 45
    }
  ];

  const agencyStats = {
    totalClients: 12,
    activeSites: 28,
    totalScans: 1247,
    avgScore: 82,
    monthlyGrowth: 15.2
  };

  const clientDetails = clients.find(c => c.id === selectedClient) || clients[0];

  const recentActivity = [
    { client: "Acme Corporation", action: "Scan completed", score: 89, time: "2 hours ago" },
    { client: "TechStartup Inc", action: "GDPR compliance check", score: 76, time: "1 day ago" },
    { client: "Retail Co", action: "Security scan", score: 67, time: "3 days ago" }
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-lg bg-gradient-primary">
            <Building2 className="h-5 w-5 text-primary-foreground" />
          </div>
          <div>
            <h2 className="text-xl font-semibold">White-Label Agency Dashboard</h2>
            <p className="text-sm text-muted-foreground">Multi-client management and branded reporting</p>
          </div>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <Settings className="h-4 w-4 mr-2" />
            Branding
          </Button>
          <Button className="bg-gradient-primary hover:shadow-glow">
            <Plus className="h-4 w-4 mr-2" />
            Add Client
          </Button>
        </div>
      </div>

      {/* Agency Stats Overview */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
        {[
          { label: "Total Clients", value: agencyStats.totalClients, icon: Users },
          { label: "Active Sites", value: agencyStats.activeSites, icon: Globe },
          { label: "Total Scans", value: agencyStats.totalScans, icon: BarChart3 },
          { label: "Avg Score", value: `${agencyStats.avgScore}%`, icon: BarChart3 },
          { label: "Growth", value: `+${agencyStats.monthlyGrowth}%`, icon: BarChart3 }
        ].map((stat, index) => (
          <Card key={stat.label} className={`bg-gradient-card border-primary/20 animate-scale-in`} style={{ animationDelay: `${index * 100}ms` }}>
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <stat.icon className="h-6 w-6 text-primary" />
                <div>
                  <div className="text-lg font-bold">{stat.value}</div>
                  <div className="text-xs text-muted-foreground">{stat.label}</div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Main Dashboard */}
      <div className="grid lg:grid-cols-3 gap-6">
        {/* Client List */}
        <Card className="bg-gradient-card border-primary/20">
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              Clients
              <Badge variant="outline">{clients.length}</Badge>
            </CardTitle>
            <CardDescription>Select a client to view details</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {clients.map((client, index) => (
                <div
                  key={client.id}
                  className={`p-3 rounded-lg cursor-pointer transition-all duration-200 animate-fade-in ${
                    selectedClient === client.id 
                      ? 'bg-primary/20 border-primary/50 border' 
                      : 'bg-background/30 hover:bg-background/50'
                  }`}
                  style={{ animationDelay: `${index * 100}ms` }}
                  onClick={() => setSelectedClient(client.id)}
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="font-medium">{client.name}</div>
                      <div className="text-sm text-muted-foreground">{client.domain}</div>
                      <div className="text-xs text-muted-foreground">{client.lastScan}</div>
                    </div>
                    <div className="text-right">
                      <Badge variant={client.status === 'active' ? 'default' : 'secondary'}>
                        {client.overallScore}%
                      </Badge>
                      <div className="text-xs text-muted-foreground mt-1">
                        {client.sites} sites
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Client Details */}
        <div className="lg:col-span-2 space-y-6">
          <Card className="bg-gradient-card border-primary/20 animate-slide-in-right">
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <span>{clientDetails.name}</span>
                <div className="flex gap-2">
                  <Button size="sm" variant="outline">
                    <Eye className="h-3 w-3 mr-1" />
                    View Site
                  </Button>
                  <Button size="sm" className="bg-gradient-primary hover:shadow-glow">
                    <Download className="h-3 w-3 mr-1" />
                    Generate Report
                  </Button>
                </div>
              </CardTitle>
              <CardDescription>{clientDetails.domain}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm font-medium">Overall Score</span>
                    <span className="text-sm">{clientDetails.overallScore}%</span>
                  </div>
                  <Progress value={clientDetails.overallScore} className="mb-4" />
                </div>

                <div className="grid grid-cols-3 gap-4 text-center">
                  <div>
                    <div className="text-2xl font-bold text-primary">{clientDetails.sites}</div>
                    <div className="text-sm text-muted-foreground">Sites</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-warning">{clientDetails.issues}</div>
                    <div className="text-sm text-muted-foreground">Issues</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-success">2</div>
                    <div className="text-sm text-muted-foreground">Fixed</div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Client-specific tabs */}
          <Tabs defaultValue="overview" className="w-full">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="scans">Recent Scans</TabsTrigger>
              <TabsTrigger value="reports">Reports</TabsTrigger>
              <TabsTrigger value="settings">Settings</TabsTrigger>
            </TabsList>

            <TabsContent value="overview">
              <Card className="bg-gradient-card border-primary/20">
                <CardHeader>
                  <CardTitle>Site Performance Overview</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {[
                      { metric: "Performance", score: 89, trend: "+5%" },
                      { metric: "SEO", score: 76, trend: "+12%" },
                      { metric: "Accessibility", score: 82, trend: "+3%" },
                      { metric: "Security", score: 91, trend: "+8%" }
                    ].map((metric, index) => (
                      <div key={metric.metric} className={`flex items-center justify-between p-3 rounded-lg bg-background/30 animate-slide-in-left`} style={{ animationDelay: `${index * 100}ms` }}>
                        <span className="font-medium">{metric.metric}</span>
                        <div className="flex items-center gap-3">
                          <Progress value={metric.score} className="w-24" />
                          <Badge variant="default" className="bg-gradient-success">
                            {metric.trend}
                          </Badge>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="scans">
              <Card className="bg-gradient-card border-primary/20">
                <CardHeader>
                  <CardTitle>Recent Activity</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {recentActivity.map((activity, index) => (
                      <div key={index} className={`flex items-center justify-between p-3 rounded-lg bg-background/30 animate-fade-in`} style={{ animationDelay: `${index * 100}ms` }}>
                        <div>
                          <div className="font-medium">{activity.action}</div>
                          <div className="text-sm text-muted-foreground">{activity.time}</div>
                        </div>
                        <Badge variant="outline">{activity.score}%</Badge>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="reports">
              <Card className="bg-gradient-card border-primary/20">
                <CardHeader>
                  <CardTitle>Branded Reports</CardTitle>
                  <CardDescription>White-label reports for client delivery</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <Button className="w-full justify-start bg-gradient-primary hover:shadow-glow">
                      <Download className="h-4 w-4 mr-2" />
                      Executive Summary Report
                    </Button>
                    <Button variant="outline" className="w-full justify-start">
                      <Download className="h-4 w-4 mr-2" />
                      Technical Audit Report
                    </Button>
                    <Button variant="outline" className="w-full justify-start">
                      <Download className="h-4 w-4 mr-2" />
                      Monthly Progress Report
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="settings">
              <Card className="bg-gradient-card border-primary/20">
                <CardHeader>
                  <CardTitle>Client Settings</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <label className="text-sm font-medium">Client Name</label>
                      <Input defaultValue={clientDetails.name} className="mt-1" />
                    </div>
                    <div>
                      <label className="text-sm font-medium">Primary Domain</label>
                      <Input defaultValue={clientDetails.domain} className="mt-1" />
                    </div>
                    <Button className="bg-gradient-primary hover:shadow-glow">
                      Save Changes
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default AgencyDashboard;