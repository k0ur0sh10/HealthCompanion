import { useState } from 'react';
import { useNavigate } from 'react-router';
import { Heart, Stethoscope } from 'lucide-react';
import { Button } from '../../components/ui/button';
import { Input } from '../../components/ui/input';
import { Label } from '../../components/ui/label';

export default function ProfessionalLogin() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    navigate('/professional/dashboard');
  };

  return (
    <div className="min-h-screen bg-white flex flex-col items-center justify-center p-6">
      <div className="max-w-md w-full space-y-8">
        <div className="text-center space-y-3">
          <div className="flex justify-center">
            <div className="w-16 h-16 bg-[#2F6FED] rounded-2xl flex items-center justify-center">
              <Stethoscope className="w-8 h-8 text-white" />
            </div>
          </div>
          <h1 className="text-3xl">Professional Portal</h1>
          <p className="text-muted-foreground">
            Sign in to access your patient dashboard
          </p>
        </div>

        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="email">Email Address</Label>
            <Input
              id="email"
              type="email"
              placeholder="doctor@hospital.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="h-12"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="h-12"
            />
          </div>

          <Button
            onClick={handleLogin}
            className="w-full h-12 bg-[#2F6FED] hover:bg-[#2563D8] text-white"
          >
            Sign In
          </Button>

          <div className="text-center">
            <button
              onClick={() => navigate('/')}
              className="text-sm text-muted-foreground hover:text-[#2F6FED]"
            >
              ← Back to role selection
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}