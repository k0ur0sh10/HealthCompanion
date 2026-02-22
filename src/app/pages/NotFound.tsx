import { useNavigate } from 'react-router';
import { Home, ArrowLeft } from 'lucide-react';
import { Button } from '../components/ui/button';

export default function NotFound() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-[#F5F6F8] flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-white rounded-2xl p-8 shadow-sm text-center">
        <div className="w-20 h-20 bg-[#2F6FED]/10 rounded-full flex items-center justify-center mx-auto mb-6">
          <span className="text-4xl text-[#2F6FED]">404</span>
        </div>
        
        <h1 className="text-3xl mb-3">Page Not Found</h1>
        <p className="text-muted-foreground mb-8">
          Sorry, the page you're looking for doesn't exist or has been moved.
        </p>

        <div className="space-y-3">
          <Button
            onClick={() => navigate(-1)}
            variant="outline"
            className="w-full h-12"
          >
            <ArrowLeft className="w-5 h-5 mr-2" />
            Go Back
          </Button>
          
          <Button
            onClick={() => navigate('/')}
            className="w-full h-12 bg-[#2F6FED] hover:bg-[#2563D8] text-white"
          >
            <Home className="w-5 h-5 mr-2" />
            Go to Home
          </Button>
        </div>
      </div>
    </div>
  );
}
