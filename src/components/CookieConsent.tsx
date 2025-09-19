import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { cookieManager, cookieCategories } from "@/utils/cookies";
import { Cookie, Settings, Shield, BarChart3, Target, Zap } from "lucide-react";

interface ConsentPreferences {
  necessary: boolean;
  analytics: boolean;
  marketing: boolean;
  functional: boolean;
}

const CookieConsent = () => {
  const [showBanner, setShowBanner] = useState(false);
  const [showDetails, setShowDetails] = useState(false);
  const [preferences, setPreferences] = useState<ConsentPreferences>({
    necessary: true,
    analytics: false,
    marketing: false,
    functional: false
  });

  useEffect(() => {
    // Check if consent has already been given
    if (!cookieManager.isConsentGiven()) {
      setShowBanner(true);
    }
  }, []);

  const handleAcceptAll = () => {
    const allPreferences = {
      necessary: true,
      analytics: true,
      marketing: true,
      functional: true
    };
    
    cookieManager.setConsentPreferences(allPreferences);
    setShowBanner(false);
    
    // Set analytics and marketing cookies
    cookieManager.setAnalyticsCookie('testmind_analytics', 'enabled');
    cookieManager.setMarketingCookie('testmind_marketing', 'enabled');
  };

  const handleRejectAll = () => {
    const minimalPreferences = {
      necessary: true,
      analytics: false,
      marketing: false,
      functional: false
    };
    
    cookieManager.setConsentPreferences(minimalPreferences);
    setShowBanner(false);
  };

  const handleSavePreferences = () => {
    cookieManager.setConsentPreferences(preferences);
    setShowBanner(false);
    setShowDetails(false);
    
    // Set cookies based on preferences
    if (preferences.analytics) {
      cookieManager.setAnalyticsCookie('testmind_analytics', 'enabled');
    }
    
    if (preferences.marketing) {
      cookieManager.setMarketingCookie('testmind_marketing', 'enabled');
    }
  };

  const handlePreferenceChange = (category: keyof ConsentPreferences, checked: boolean) => {
    if (category === 'necessary') return; // Cannot change necessary cookies
    
    setPreferences(prev => ({
      ...prev,
      [category]: checked
    }));
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'necessary': return <Shield className="w-5 h-5" />;
      case 'analytics': return <BarChart3 className="w-5 h-5" />;
      case 'marketing': return <Target className="w-5 h-5" />;
      case 'functional': return <Zap className="w-5 h-5" />;
      default: return <Cookie className="w-5 h-5" />;
    }
  };

  if (!showBanner) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 p-4">
      <Card className="mx-auto max-w-4xl bg-white/95 backdrop-blur shadow-xl border-0">
        <CardHeader>
          <div className="flex items-center gap-3">
            <Cookie className="w-6 h-6 text-primary" />
            <div>
              <CardTitle className="text-xl">Cookie Preferences</CardTitle>
              <CardDescription>
                We use cookies to enhance your experience and analyze our traffic. Choose your preferences below.
              </CardDescription>
            </div>
          </div>
        </CardHeader>
        
        <CardContent className="space-y-6">
          {/* Quick Actions */}
          <div className="flex flex-wrap gap-3">
            <Button onClick={handleAcceptAll} className="bg-primary hover:bg-primary/90">
              Accept All Cookies
            </Button>
            <Button variant="outline" onClick={handleRejectAll}>
              Reject All
            </Button>
            <Dialog open={showDetails} onOpenChange={setShowDetails}>
              <DialogTrigger asChild>
                <Button variant="outline">
                  <Settings className="w-4 h-4 mr-2" />
                  Customize
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
                <DialogHeader>
                  <DialogTitle>Cookie Settings</DialogTitle>
                  <DialogDescription>
                    Manage your cookie preferences for different categories.
                  </DialogDescription>
                </DialogHeader>
                
                <div className="space-y-6">
                  {Object.entries(cookieCategories).map(([key, category]) => (
                    <div key={key} className="space-y-3">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          {getCategoryIcon(key)}
                          <div>
                            <h4 className="font-medium">{category.name}</h4>
                            <p className="text-sm text-muted-foreground">{category.description}</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          {category.required && (
                            <Badge variant="secondary">Required</Badge>
                          )}
                          <Checkbox
                            checked={preferences[key as keyof ConsentPreferences]}
                            onCheckedChange={(checked) => 
                              handlePreferenceChange(key as keyof ConsentPreferences, !!checked)
                            }
                            disabled={category.required}
                          />
                        </div>
                      </div>
                    </div>
                  ))}
                  
                  <div className="flex justify-end gap-3 pt-4 border-t">
                    <Button variant="outline" onClick={() => setShowDetails(false)}>
                      Cancel
                    </Button>
                    <Button onClick={handleSavePreferences}>
                      Save Preferences
                    </Button>
                  </div>
                </div>
              </DialogContent>
            </Dialog>
          </div>

          {/* Privacy Notice */}
          <div className="text-xs text-muted-foreground bg-muted/50 p-3 rounded-lg">
            <p>
              <strong>Privacy Notice:</strong> By using TestMind, you agree to our use of cookies. 
              Necessary cookies are required for the website to function and cannot be disabled. 
              You can change your preferences at any time by clicking the cookie settings button.
            </p>
            <p className="mt-2">
              For more information, please read our{' '}
              <a href="/privacy" className="text-primary hover:underline">
                Privacy Policy
              </a>{' '}
              and{' '}
              <a href="/terms" className="text-primary hover:underline">
                Terms of Service
              </a>
              .
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default CookieConsent;

