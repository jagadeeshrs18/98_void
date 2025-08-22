interface StoredAnalysis {
  id: string;
  url: string;
  timestamp: string;
  result: any;
}

export class AnalysisStorage {
  private static STORAGE_KEY = 'website_analyses';

  static saveAnalysis(url: string, result: any): string {
    const id = Math.random().toString(36).substr(2, 9);
    const analysis: StoredAnalysis = {
      id,
      url,
      timestamp: new Date().toISOString(),
      result
    };

    const existingAnalyses = this.getAllAnalyses();
    existingAnalyses.push(analysis);
    
    // Keep only last 50 analyses
    if (existingAnalyses.length > 50) {
      existingAnalyses.splice(0, existingAnalyses.length - 50);
    }

    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(existingAnalyses));
    return id;
  }

  static initializeDemoData(): void {
    const existing = this.getAllAnalyses();
    if (existing.length === 0) {
      // Add some demo data for first-time users
      const demoAnalyses = [
        {
          id: 'demo-1',
          url: 'https://example.com',
          timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(), // 2 hours ago
          result: {
            overallScore: 82,
            performance: { score: 85, issues: ['Large images'], recommendations: ['Optimize images'] },
            seo: { score: 78, issues: ['Missing meta'], recommendations: ['Add meta tags'] },
            accessibility: { score: 75, issues: ['Missing alt text'], recommendations: ['Add alt text'] },
            security: { score: 90, issues: [], recommendations: [] },
            gdpr: { compliant: true, issues: [], recommendations: [] },
            dependencies: { vulnerable: 0, outdated: 2, libraries: [] }
          }
        },
        {
          id: 'demo-2',
          url: 'https://testsite.org',
          timestamp: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(), // 1 day ago
          result: {
            overallScore: 91,
            performance: { score: 95, issues: [], recommendations: [] },
            seo: { score: 88, issues: ['Title too long'], recommendations: ['Shorten title'] },
            accessibility: { score: 85, issues: ['Color contrast'], recommendations: ['Improve contrast'] },
            security: { score: 96, issues: [], recommendations: [] },
            gdpr: { compliant: true, issues: [], recommendations: [] },
            dependencies: { vulnerable: 1, outdated: 1, libraries: [] }
          }
        },
        {
          id: 'demo-3',
          url: 'https://mywebsite.net',
          timestamp: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(), // 3 days ago
          result: {
            overallScore: 76,
            performance: { score: 78, issues: ['Slow loading'], recommendations: ['Enable caching'] },
            seo: { score: 82, issues: ['Missing keywords'], recommendations: ['Add focus keywords'] },
            accessibility: { score: 68, issues: ['Missing ARIA'], recommendations: ['Add ARIA labels'] },
            security: { score: 76, issues: ['Mixed content'], recommendations: ['Use HTTPS'] },
            gdpr: { compliant: false, issues: ['No consent'], recommendations: ['Add cookie consent'] },
            dependencies: { vulnerable: 2, outdated: 4, libraries: [] }
          }
        }
      ];
      
      localStorage.setItem(this.STORAGE_KEY, JSON.stringify(demoAnalyses));
    }
  }

  static getAnalysis(id: string): StoredAnalysis | null {
    const analyses = this.getAllAnalyses();
    return analyses.find(analysis => analysis.id === id) || null;
  }

  static getAllAnalyses(): StoredAnalysis[] {
    const stored = localStorage.getItem(this.STORAGE_KEY);
    return stored ? JSON.parse(stored) : [];
  }

  static getRecentAnalyses(limit: number = 10): StoredAnalysis[] {
    const analyses = this.getAllAnalyses();
    return analyses
      .sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime())
      .slice(0, limit);
  }

  static deleteAnalysis(id: string): boolean {
    const analyses = this.getAllAnalyses();
    const index = analyses.findIndex(analysis => analysis.id === id);
    
    if (index !== -1) {
      analyses.splice(index, 1);
      localStorage.setItem(this.STORAGE_KEY, JSON.stringify(analyses));
      return true;
    }
    
    return false;
  }
}
