import { useState } from 'react';
import { useNavigate } from 'react-router';
import { Heart, ChevronRight, Check } from 'lucide-react';
import { Button } from '../../components/ui/button';
import { Input } from '../../components/ui/input';
import { Label } from '../../components/ui/label';

export default function PatientOnboarding() {
  const [step, setStep] = useState(1);
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    condition: '',
    medicationName: '',
    medicationDosage: '',
    medicationTime: '',
    doctorName: '',
    doctorSpecialty: '',
    doctorContact: '',
  });

  const updateField = (field: string, value: string) => {
    setFormData({ ...formData, [field]: value });
  };

  const nextStep = () => {
    if (step < 6) {
      setStep(step + 1);
    } else {
      navigate('/patient/home');
    }
  };

  const prevStep = () => {
    if (step > 1) setStep(step - 1);
  };

  return (
    <div className="min-h-screen bg-white flex flex-col">
      {/* Header */}
      <div className="bg-[#2F6FED] text-white p-6">
        <div className="flex items-center justify-between mb-4">
          <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">
            <Heart className="w-6 h-6" />
          </div>
          <span className="text-sm">Step {step} of 6</span>
        </div>
        <div className="w-full bg-white/30 h-2 rounded-full">
          <div
            className="bg-white h-2 rounded-full transition-all duration-300"
            style={{ width: `${(step / 6) * 100}%` }}
          />
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 p-6 overflow-y-auto">
        {step === 1 && (
          <div className="space-y-6">
            <div className="space-y-2">
              <h2 className="text-2xl">Welcome!</h2>
              <p className="text-muted-foreground">
                Let's get started by creating your account
              </p>
            </div>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">Full Name</Label>
                <Input
                  id="name"
                  placeholder="David Johnson"
                  value={formData.name}
                  onChange={(e) => updateField('name', e.target.value)}
                  className="h-12"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email Address</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="david@example.com"
                  value={formData.email}
                  onChange={(e) => updateField('email', e.target.value)}
                  className="h-12"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="Create a secure password"
                  value={formData.password}
                  onChange={(e) => updateField('password', e.target.value)}
                  className="h-12"
                />
              </div>
            </div>
          </div>
        )}

        {step === 2 && (
          <div className="space-y-6">
            <div className="space-y-2">
              <h2 className="text-2xl">Health Condition</h2>
              <p className="text-muted-foreground">
                What health condition are you managing?
              </p>
            </div>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="condition">Primary Condition</Label>
                <Input
                  id="condition"
                  placeholder="e.g., Type 2 Diabetes"
                  value={formData.condition}
                  onChange={(e) => updateField('condition', e.target.value)}
                  className="h-12"
                />
              </div>
              <div className="bg-[#F5F6F8] p-4 rounded-lg">
                <p className="text-sm text-muted-foreground">
                  This information helps us provide personalized reminders and insights.
                </p>
              </div>
            </div>
          </div>
        )}

        {step === 3 && (
          <div className="space-y-6">
            <div className="space-y-2">
              <h2 className="text-2xl">Add Medication</h2>
              <p className="text-muted-foreground">
                Tell us about your medication schedule
              </p>
            </div>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="medName">Medication Name</Label>
                <Input
                  id="medName"
                  placeholder="e.g., Metformin"
                  value={formData.medicationName}
                  onChange={(e) => updateField('medicationName', e.target.value)}
                  className="h-12"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="dosage">Dosage</Label>
                <Input
                  id="dosage"
                  placeholder="e.g., 500mg"
                  value={formData.medicationDosage}
                  onChange={(e) => updateField('medicationDosage', e.target.value)}
                  className="h-12"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="time">Time to Take</Label>
                <Input
                  id="time"
                  type="time"
                  value={formData.medicationTime}
                  onChange={(e) => updateField('medicationTime', e.target.value)}
                  className="h-12"
                />
              </div>
            </div>
          </div>
        )}

        {step === 4 && (
          <div className="space-y-6">
            <div className="space-y-2">
              <h2 className="text-2xl">Your Doctor</h2>
              <p className="text-muted-foreground">
                Add your primary healthcare provider
              </p>
            </div>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="doctorName">Doctor's Name</Label>
                <Input
                  id="doctorName"
                  placeholder="Dr. Sarah Wilson"
                  value={formData.doctorName}
                  onChange={(e) => updateField('doctorName', e.target.value)}
                  className="h-12"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="specialty">Specialty</Label>
                <Input
                  id="specialty"
                  placeholder="e.g., Endocrinologist"
                  value={formData.doctorSpecialty}
                  onChange={(e) => updateField('doctorSpecialty', e.target.value)}
                  className="h-12"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="contact">Contact Number</Label>
                <Input
                  id="contact"
                  type="tel"
                  placeholder="(555) 123-4567"
                  value={formData.doctorContact}
                  onChange={(e) => updateField('doctorContact', e.target.value)}
                  className="h-12"
                />
              </div>
            </div>
          </div>
        )}

        {step === 5 && (
          <div className="space-y-6">
            <div className="space-y-2">
              <h2 className="text-2xl">Review Your Information</h2>
              <p className="text-muted-foreground">
                Please review the details you've entered
              </p>
            </div>
            <div className="space-y-3">
              <div className="bg-[#F5F6F8] p-4 rounded-lg space-y-3">
                <div>
                  <p className="text-sm text-muted-foreground">Name</p>
                  <p>{formData.name || 'Not provided'}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Email</p>
                  <p>{formData.email || 'Not provided'}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Health Condition</p>
                  <p>{formData.condition || 'Not provided'}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Medication</p>
                  <p>
                    {formData.medicationName || 'Not provided'}{' '}
                    {formData.medicationDosage && `- ${formData.medicationDosage}`}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Doctor</p>
                  <p>{formData.doctorName || 'Not provided'}</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {step === 6 && (
          <div className="space-y-6 text-center">
            <div className="flex justify-center">
              <div className="w-20 h-20 bg-[#2ECC71] rounded-full flex items-center justify-center">
                <Check className="w-10 h-10 text-white" />
              </div>
            </div>
            <div className="space-y-2">
              <h2 className="text-2xl">All Set!</h2>
              <p className="text-muted-foreground">
                Your health companion is ready. Let's start managing your health together.
              </p>
            </div>
          </div>
        )}
      </div>

      {/* Navigation */}
      <div className="p-6 border-t bg-white">
        <div className="flex gap-3">
          {step > 1 && step < 6 && (
            <Button
              onClick={prevStep}
              variant="outline"
              className="flex-1 h-12"
            >
              Back
            </Button>
          )}
          <Button
            onClick={nextStep}
            className="flex-1 h-12 bg-[#2F6FED] hover:bg-[#2563D8] text-white"
          >
            {step === 6 ? 'Get Started' : 'Continue'}
            <ChevronRight className="w-5 h-5 ml-2" />
          </Button>
        </div>
      </div>
    </div>
  );
}