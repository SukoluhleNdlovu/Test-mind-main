import { useState, useEffect } from "react";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Shield, AlertTriangle, CheckCircle, Lock, Eye, EyeOff } from "lucide-react";
import { securityManager } from "@/utils/security";

interface SecurityStatus {
  isSecure: boolean;
  hasHttps: boolean;
  hasValidSession: boolean;
  lastActivity: Date;
  suspiciousActivity: boolean;
}

const SecurityBanner = () => {
  const [securityStatus, setSecurityStatus] = useState<SecurityStatus>({
    isSecure: false,
    hasHttps: false,
    hasValidSession: false,
    lastActivity: new Date(),
    suspiciousActivity: false
  });
  const [showDetails, setShowDetails] = useState(false);

  useEffect(() => {
    checkSecurityStatus();
    
    // Check security status every 30 seconds
    const interval = setInterval(checkSecurityStatus, 30000);
    
    return () => clearInterval(interval);
  }, []);

  const checkSecurityStatus = () => {
    const isHttps = window.location.protocol === 'https:';
    const userAgent = navigator.userAgent;
    const sessionToken = localStorage.getItem('session_token');
    
    const status: SecurityStatus = {
      isSecure: isHttps,
      hasHttps: isHttps,
      hasValidSession: sessionToken ? securityManager.validateSessionToken(sessionToken) : false,
      lastActivity: new Date(),
      suspiciousActivity: securityManager.detectSuspiciousActivity(userAgent, 'unknown')
    };
    
    setSecurityStatus(status);
  };

  const getSecurityLevel = () => {
    const { isSecure, hasValidSession, suspiciousActivity } = securityStatus;
    
    if (suspiciousActivity) return { level: 'critical', color: 'destructive', icon: AlertTriangle };
    if (!isSecure) return { level: 'warning', color: 'default', icon: AlertTriangle };
    if (!hasValidSession) return { level: 'warning', color: 'default', icon: Lock };
    return { level: 'secure', color: 'secondary', icon: CheckCircle };
  };

  const securityLevel = getSecurityLevel();
  const SecurityIcon = securityLevel.icon;

  if (securityStatus.isSecure && securityStatus.hasValidSession && !securityStatus.suspiciousActivity) {
    return null; // Don't show banner if everything is secure
  }

  return (
    <div className="fixed bottom-6 left-6 md:left-auto md:right-[26rem] z-40 w-[90vw] max-w-md">
      <Alert className={`border-l-4 shadow-lg ${
        securityLevel.level === 'critical' ? 'border-red-500 bg-red-50' :
        securityLevel.level === 'warning' ? 'border-yellow-500 bg-yellow-50' :
        'border-green-500 bg-green-50'
      }`}>
        <SecurityIcon className="h-4 w-4" />
        <AlertDescription className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="font-medium">
              {securityLevel.level === 'critical' && 'Security Alert: Suspicious Activity Detected'}
              {securityLevel.level === 'warning' && 'Security Notice: Connection Not Fully Secure'}
              {securityLevel.level === 'secure' && 'Security Status: All Systems Secure'}
            </span>
            <Badge variant={securityLevel.color as any}>
              {securityLevel.level.toUpperCase()}
            </Badge>
          </div>
          
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setShowDetails(!showDetails)}
            >
              {showDetails ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              {showDetails ? 'Hide' : 'Details'}
            </Button>
            
            {securityLevel.level === 'critical' && (
              <Button size="sm" variant="destructive">
                <Shield className="w-4 h-4 mr-2" />
                Secure Now
              </Button>
            )}
          </div>
        </AlertDescription>
        
        {showDetails && (
          <div className="mt-4 pt-4 border-t space-y-3">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
              <div className="flex items-center gap-2">
                <div className={`w-2 h-2 rounded-full ${
                  securityStatus.hasHttps ? 'bg-green-500' : 'bg-red-500'
                }`} />
                <span>HTTPS: {securityStatus.hasHttps ? 'Enabled' : 'Disabled'}</span>
              </div>
              
              <div className="flex items-center gap-2">
                <div className={`w-2 h-2 rounded-full ${
                  securityStatus.hasValidSession ? 'bg-green-500' : 'bg-yellow-500'
                }`} />
                <span>Session: {securityStatus.hasValidSession ? 'Valid' : 'Invalid'}</span>
              </div>
              
              <div className="flex items-center gap-2">
                <div className={`w-2 h-2 rounded-full ${
                  !securityStatus.suspiciousActivity ? 'bg-green-500' : 'bg-red-500'
                }`} />
                <span>Activity: {securityStatus.suspiciousActivity ? 'Suspicious' : 'Normal'}</span>
              </div>
              
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-blue-500" />
                <span>Last Check: {securityStatus.lastActivity.toLocaleTimeString()}</span>
              </div>
            </div>
            
            {securityLevel.level === 'warning' && (
              <div className="bg-yellow-100 p-3 rounded-lg text-sm">
                <p className="font-medium mb-2">Security Recommendations:</p>
                <ul className="list-disc list-inside space-y-1 text-muted-foreground">
                  {!securityStatus.hasHttps && (
                    <li>Enable HTTPS for secure data transmission</li>
                  )}
                  {!securityStatus.hasValidSession && (
                    <li>Refresh your session or log in again</li>
                  )}
                  <li>Keep your browser and security software updated</li>
                  <li>Use strong, unique passwords</li>
                </ul>
              </div>
            )}
            
            {securityLevel.level === 'critical' && (
              <div className="bg-red-100 p-3 rounded-lg text-sm">
                <p className="font-medium mb-2 text-red-800">Immediate Action Required:</p>
                <ul className="list-disc list-inside space-y-1 text-red-700">
                  <li>Suspicious activity detected in your session</li>
                  <li>Please log out and log back in immediately</li>
                  <li>Contact support if you notice unauthorized access</li>
                  <li>Consider changing your password</li>
                </ul>
              </div>
            )}
          </div>
        )}
      </Alert>
    </div>
  );
};

export default SecurityBanner;
