import { useState } from 'react';
import { useNavigate } from 'react-router';
import {
  Home,
  Pill,
  Calendar,
  MessageCircle,
  User,
  Heart,
  Clock,
  TrendingUp,
  Bell,
  LogOut,
  Check,
} from 'lucide-react';
import { Button } from '../../components/ui/button';

export default function PatientWebDashboard() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('home');

  const currentHour = new Date().getHours();
  const greeting =
    currentHour < 12
      ? 'Good Morning'
      : currentHour < 18
      ? 'Good Afternoon'
      : 'Good Evening';

  return (
    <div className="min-h-screen bg-[#F5F6F8] flex">
      {/* Sidebar */}
      <div className="w-64 bg-white border-r border-gray-200 flex flex-col">
        <div className="p-6 border-b">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-[#2F6FED] rounded-xl flex items-center justify-center">
              <Heart className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl">HealthCompanion</span>
          </div>
        </div>

        <nav className="flex-1 p-4 space-y-2">
          <button
            onClick={() => setActiveTab('home')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
              activeTab === 'home'
                ? 'bg-[#2F6FED] text-white'
                : 'text-gray-700 hover:bg-gray-100'
            }`}
          >
            <Home className="w-5 h-5" />
            <span>Home</span>
          </button>

          <button
            onClick={() => setActiveTab('medications')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
              activeTab === 'medications'
                ? 'bg-[#2F6FED] text-white'
                : 'text-gray-700 hover:bg-gray-100'
            }`}
          >
            <Pill className="w-5 h-5" />
            <span>Medications</span>
          </button>

          <button
            onClick={() => setActiveTab('appointments')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
              activeTab === 'appointments'
                ? 'bg-[#2F6FED] text-white'
                : 'text-gray-700 hover:bg-gray-100'
            }`}
          >
            <Calendar className="w-5 h-5" />
            <span>Appointments</span>
          </button>

          <button
            onClick={() => setActiveTab('messages')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
              activeTab === 'messages'
                ? 'bg-[#2F6FED] text-white'
                : 'text-gray-700 hover:bg-gray-100'
            }`}
          >
            <MessageCircle className="w-5 h-5" />
            <span>Messages</span>
          </button>

          <button
            onClick={() => setActiveTab('profile')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
              activeTab === 'profile'
                ? 'bg-[#2F6FED] text-white'
                : 'text-gray-700 hover:bg-gray-100'
            }`}
          >
            <User className="w-5 h-5" />
            <span>Profile</span>
          </button>
        </nav>

        <div className="p-4 border-t">
          <Button
            onClick={() => navigate('/')}
            variant="outline"
            className="w-full justify-start text-destructive border-destructive hover:bg-destructive hover:text-white"
          >
            <LogOut className="w-5 h-5 mr-2" />
            Sign Out
          </Button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-y-auto">
        <div className="max-w-7xl mx-auto p-8">
          {/* Header */}
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-3xl mb-1">{greeting}, David</h1>
              <p className="text-muted-foreground">
                Here's your health overview for today
              </p>
            </div>
            <Button variant="ghost" size="icon" className="relative">
              <Bell className="w-5 h-5" />
              <span className="absolute top-1 right-1 w-2 h-2 bg-[#2ECC71] rounded-full" />
            </Button>
          </div>

          {/* Content Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Main Content - 2 columns */}
            <div className="lg:col-span-2 space-y-6">
              {/* Next Medication */}
              <div className="bg-white rounded-2xl p-6 shadow-sm">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-[#2F6FED]/10 rounded-xl flex items-center justify-center">
                      <Pill className="w-6 h-6 text-[#2F6FED]" />
                    </div>
                    <div>
                      <h3 className="text-xl mb-1">Next Medication</h3>
                      <p className="text-sm text-muted-foreground">
                        Due in 30 minutes
                      </p>
                    </div>
                  </div>
                  <Clock className="w-5 h-5 text-muted-foreground" />
                </div>
                <div className="bg-[#F5F6F8] p-4 rounded-xl mb-4">
                  <p className="text-lg mb-1">Metformin</p>
                  <p className="text-sm text-muted-foreground">
                    500mg • After breakfast
                  </p>
                </div>
                <Button className="w-full h-12 bg-[#2ECC71] hover:bg-[#27AE60] text-white">
                  <Check className="w-5 h-5 mr-2" />
                  Mark as Taken
                </Button>
              </div>

              {/* Today's Schedule */}
              <div className="bg-white rounded-2xl p-6 shadow-sm">
                <h3 className="text-xl mb-4">Today's Medication Schedule</h3>
                <div className="space-y-3">
                  {[
                    { name: 'Metformin', time: '8:00 AM', taken: true },
                    { name: 'Lisinopril', time: '9:00 AM', taken: true },
                    { name: 'Metformin', time: '2:00 PM', taken: false },
                    { name: 'Atorvastatin', time: '8:00 PM', taken: false },
                  ].map((med, idx) => (
                    <div
                      key={idx}
                      className="flex items-center justify-between p-4 bg-[#F5F6F8] rounded-xl"
                    >
                      <div className="flex items-center gap-4">
                        <div
                          className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                            med.taken ? 'bg-[#2ECC71]' : 'bg-white border-2 border-[#2F6FED]'
                          }`}
                        >
                          {med.taken && <Check className="w-5 h-5 text-white" />}
                        </div>
                        <div>
                          <p>{med.name}</p>
                          <p className="text-sm text-muted-foreground">{med.time}</p>
                        </div>
                      </div>
                      {med.taken && (
                        <span className="text-sm text-[#2ECC71]">Taken</span>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Sidebar - 1 column */}
            <div className="space-y-6">
              {/* Upcoming Appointment */}
              <div className="bg-white rounded-2xl p-6 shadow-sm">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 bg-[#2F6FED]/10 rounded-xl flex items-center justify-center">
                    <Calendar className="w-6 h-6 text-[#2F6FED]" />
                  </div>
                  <h3 className="text-xl">Next Appointment</h3>
                </div>
                <div className="space-y-3">
                  <div className="bg-[#F5F6F8] p-4 rounded-xl">
                    <p className="mb-1">Dr. Sarah Wilson</p>
                    <p className="text-sm text-muted-foreground mb-3">
                      Endocrinologist
                    </p>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground mb-1">
                      <Calendar className="w-4 h-4" />
                      <span>Tomorrow</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Clock className="w-4 h-4" />
                      <span>10:00 AM</span>
                    </div>
                  </div>
                  <Button variant="outline" className="w-full h-10">
                    View Details
                  </Button>
                </div>
              </div>

              {/* Health Summary */}
              <div className="bg-white rounded-2xl p-6 shadow-sm">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 bg-[#2F6FED]/10 rounded-xl flex items-center justify-center">
                    <TrendingUp className="w-6 h-6 text-[#2F6FED]" />
                  </div>
                  <h3 className="text-xl">Health Summary</h3>
                </div>
                <div className="space-y-3">
                  <div className="bg-[#F5F6F8] p-4 rounded-xl">
                    <p className="text-3xl mb-1">95%</p>
                    <p className="text-sm text-muted-foreground">
                      Medication Adherence
                    </p>
                  </div>
                  <div className="bg-[#F5F6F8] p-4 rounded-xl">
                    <p className="text-3xl mb-1">3 Days</p>
                    <p className="text-sm text-muted-foreground">
                      Current Streak
                    </p>
                  </div>
                </div>
              </div>

              {/* Messages Preview */}
              <div className="bg-white rounded-2xl p-6 shadow-sm">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 bg-[#2F6FED]/10 rounded-xl flex items-center justify-center">
                    <MessageCircle className="w-6 h-6 text-[#2F6FED]" />
                  </div>
                  <h3 className="text-xl">Messages</h3>
                </div>
                <div className="space-y-3">
                  <div className="p-3 bg-[#F5F6F8] rounded-xl">
                    <p className="text-sm mb-1">Dr. Sarah Wilson</p>
                    <p className="text-xs text-muted-foreground">
                      Don't forget your medication...
                    </p>
                  </div>
                  <Button variant="outline" className="w-full h-10">
                    View All Messages
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}