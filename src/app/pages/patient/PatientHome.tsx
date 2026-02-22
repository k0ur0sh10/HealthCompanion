import { Clock, Calendar, Heart, TrendingUp, Pill } from 'lucide-react';
import { MobileNav } from '../../components/MobileNav';
import { Button } from '../../components/ui/button';
import { useNavigate } from 'react-router';
import { useState } from 'react';

export default function PatientHome() {
  const navigate = useNavigate();
  const [medicationTaken, setMedicationTaken] = useState(false);

  const currentHour = new Date().getHours();
  const greeting =
    currentHour < 12
      ? 'Good Morning'
      : currentHour < 18
      ? 'Good Afternoon'
      : 'Good Evening';

  const handleMarkAsTaken = () => {
    setMedicationTaken(true);
  };

  return (
    <div className="min-h-screen bg-[#F5F6F8] pb-24 md:pb-8">
      {/* Header */}
      <div className="bg-[#2F6FED] text-white p-6 pb-8 rounded-b-3xl">
        <div className="flex items-center justify-between mb-6 max-w-7xl mx-auto">
          <div>
            <h1 className="text-2xl mb-1">{greeting}, David</h1>
            <p className="text-blue-100 text-sm">
              Let's take care of your health today
            </p>
          </div>
          <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
            <Heart className="w-6 h-6" />
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="px-6 -mt-4 space-y-4 max-w-7xl mx-auto">
        {/* Next Medication Card */}
        <div className="bg-white rounded-2xl p-5 shadow-sm">
          <div className="flex items-start justify-between mb-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-[#2F6FED]/10 rounded-xl flex items-center justify-center">
                <Pill className="w-6 h-6 text-[#2F6FED]" />
              </div>
              <div>
                <h3 className="text-lg">Next Medication</h3>
                <p className="text-sm text-muted-foreground">
                  {medicationTaken ? 'Completed!' : 'Due in 30 minutes'}
                </p>
              </div>
            </div>
            <Clock className="w-5 h-5 text-muted-foreground" />
          </div>
          <div className="bg-[#F5F6F8] p-4 rounded-xl mb-4">
            <p className="mb-1">Metformin</p>
            <p className="text-sm text-muted-foreground">500mg • After breakfast</p>
          </div>
          {!medicationTaken ? (
            <Button
              onClick={handleMarkAsTaken}
              className="w-full h-12 bg-[#2ECC71] hover:bg-[#27AE60] text-white"
            >
              Mark as Taken
            </Button>
          ) : (
            <div className="bg-[#2ECC71]/10 text-[#2ECC71] p-3 rounded-xl text-center">
              ✓ Medication taken successfully
            </div>
          )}
        </div>

        {/* Upcoming Appointment Card */}
        <div className="bg-white rounded-2xl p-5 shadow-sm">
          <div className="flex items-start justify-between mb-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-[#2F6FED]/10 rounded-xl flex items-center justify-center">
                <Calendar className="w-6 h-6 text-[#2F6FED]" />
              </div>
              <div>
                <h3 className="text-lg">Upcoming Appointment</h3>
                <p className="text-sm text-muted-foreground">Tomorrow at 10:00 AM</p>
              </div>
            </div>
          </div>
          <div className="bg-[#F5F6F8] p-4 rounded-xl">
            <p className="mb-1">Dr. Sarah Wilson</p>
            <p className="text-sm text-muted-foreground">Endocrinologist • Regular Checkup</p>
          </div>
        </div>

        {/* Health Summary */}
        <div className="bg-white rounded-2xl p-5 shadow-sm">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 bg-[#2F6FED]/10 rounded-xl flex items-center justify-center">
              <TrendingUp className="w-6 h-6 text-[#2F6FED]" />
            </div>
            <h3 className="text-lg">Health Summary</h3>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div className="bg-[#F5F6F8] p-4 rounded-xl">
              <p className="text-2xl mb-1">95%</p>
              <p className="text-sm text-muted-foreground">Medication Adherence</p>
            </div>
            <div className="bg-[#F5F6F8] p-4 rounded-xl">
              <p className="text-2xl mb-1">3</p>
              <p className="text-sm text-muted-foreground">Days Streak</p>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="bg-white rounded-2xl p-5 shadow-sm">
          <h3 className="text-lg mb-4">Quick Actions</h3>
          <div className="space-y-3">
            <Button
              onClick={() => navigate('/patient/appointments')}
              variant="outline"
              className="w-full h-12 justify-start"
            >
              <Calendar className="w-5 h-5 mr-3" />
              Book New Appointment
            </Button>
            <Button
              onClick={() => navigate('/patient/medications')}
              variant="outline"
              className="w-full h-12 justify-start"
            >
              <Pill className="w-5 h-5 mr-3" />
              View Medications
            </Button>
          </div>
        </div>
      </div>

      <MobileNav />
    </div>
  );
}