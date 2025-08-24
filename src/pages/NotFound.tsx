import { useLocation, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Home, AlertCircle } from "lucide-react";

const NotFound = () => {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen bg-gradient-hero flex items-center justify-center">
      <Card className="bg-gradient-card backdrop-blur-glass border-glass-border max-w-md w-full mx-4">
        <CardContent className="text-center p-8 space-y-6">
          <div className="w-20 h-20 mx-auto bg-gradient-primary rounded-full flex items-center justify-center shadow-glow">
            <AlertCircle className="w-10 h-10 text-primary-foreground" />
          </div>

          <div className="space-y-2">
            <h1 className="text-4xl font-bold text-foreground">404</h1>
            <h2 className="text-xl font-semibold text-foreground">
              Page Not Found
            </h2>
            <p className="text-muted-foreground">
              Oops! The page you're looking for doesn't exist or has been moved.
            </p>
          </div>

          <Button
            onClick={() => navigate("/")}
            className="bg-primary hover:bg-primary/90 text-primary-foreground shadow-glow transition-all duration-300 hover:scale-105"
          >
            <Home className="w-4 h-4 mr-2" />
            Return to Home
          </Button>

          <p className="text-xs text-muted-foreground">
            Route attempted:{" "}
            <code className="bg-muted px-2 py-1 rounded">
              {location.pathname}
            </code>
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default NotFound;
