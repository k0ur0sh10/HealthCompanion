import { useNavigate } from 'react-router';
import { Heart, Stethoscope } from 'lucide-react';
import { Button } from '../components/ui/button';

export default function RoleSelector() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-white flex flex-col items-center justify-center p-6">
      <div className="max-w-md w-full space-y-8">
        <div className="text-center space-y-3">
          <div className="flex justify-center">
            <div className="w-16 h-16 bg-[#2F6FED] rounded-2xl flex items-center justify-center">
              <Heart className="w-8 h-8 text-white" />
            </div>
          </div>
          <h1 className="text-3xl">HealthCompanion</h1>
          <p className="text-muted-foreground">
            Choose your role to continue
          </p>
        </div>

        <div className="space-y-4">
          <Button
            onClick={() => navigate('/patient/onboarding')}
            className="w-full h-20 bg-[#2F6FED] hover:bg-[#2563D8] text-white flex flex-col items-center justify-center gap-2"
          >
            <Heart className="w-6 h-6" />
            <span>I'm a Patient</span>
          </Button>

          <Button
            onClick={() => navigate('/professional/login')}
            className="w-full h-20 bg-white hover:bg-gray-50 text-gray-900 border-2 border-gray-200 flex flex-col items-center justify-center gap-2"
          >
            <Stethoscope className="w-6 h-6" />
            <span>I'm a Healthcare Professional</span>
          </Button>
        </div>
      </div>
    </div>
  );
}