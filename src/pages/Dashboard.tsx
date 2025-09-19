import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { useAuth } from "@/contexts/AuthContext";
import { UseCases } from "@/components/UseCases";

const Dashboard = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  return (
    <div className="min-h-screen relative">
      {/* Video Background */}
      <video 
        autoPlay 
        loop 
        muted 
        className="absolute inset-0 w-full h-full object-cover z-0"
      >
        <source src="/src/assets/istockphoto-2206519913-640_adpp_is.mp4" type="video/mp4" />
      </video>
      
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/40 z-10"></div>
      
      {/* Content */}
      <div className="relative z-20 container mx-auto px-6 py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <Card className="bg-white/90 backdrop-blur shadow-xl border-0">
            <CardHeader>
              <div className="flex items-center gap-4">
                {user && (
                  <Avatar className="h-12 w-12">
                    <AvatarImage src={user.avatarUrl} alt={user.name} />
                    <AvatarFallback>{user.name.slice(0,2).toUpperCase()}</AvatarFallback>
                  </Avatar>
                )}
                <div>
                  <CardTitle className="text-2xl">{user ? `Welcome, ${user.name}` : 'Welcome to your Dashboard'}</CardTitle>
                  <CardDescription className="text-lg">
                    {user ? user.email : "Explore features or upgrade when you're ready."}
                  </CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
              <p className="text-muted-foreground text-lg">
                You are signed in. You can continue exploring the app and start your trial or choose a plan any time.
              </p>
              <div className="grid grid-cols-2 gap-4">
                <Button onClick={() => navigate("/test-configuration")} className="h-12 text-lg bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700">
                  Create Test
                </Button>
                <Button variant="outline" onClick={() => navigate("/test-results")} className="h-12 text-lg border-2">
                  View Results
                </Button>
                <Button variant="outline" onClick={() => navigate("/analytics-reports")} className="h-12 text-lg border-2">
                  Analytics
                </Button>
                <Button variant="outline" onClick={() => navigate("/behavioral-insights")} className="h-12 text-lg border-2">
                  Insights
                </Button>
              </div>
              <div className="flex gap-4">
                <Button variant="outline" onClick={() => navigate("/#features")} className="flex-1 h-12 text-lg border-2">
                  Explore Features
                </Button>
                <Button variant="outline" onClick={() => navigate("/#pricing")} className="flex-1 h-12 text-lg border-2">
                  View Pricing
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Real World Applications Section */}
        <div className="mb-8">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold mb-4">
              <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Real-World Applications
              </span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              TestMind transforms testing across industries where human context and emotional states 
              directly impact software performance and user experience.
            </p>
          </div>
          <UseCases />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;


