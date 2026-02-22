import { Clock, Users, AlertCircle, TrendingUp, Calendar, MessageCircle } from 'lucide-react';
import { ProfessionalMobileNav } from '../../components/ProfessionalMobileNav';
import { Button } from '../../components/ui/button';
import { useNavigate } from 'react-router';

export default function ProfessionalHome() {
  const navigate = useNavigate();

  const currentHour = new Date().getHours();
  const greeting =
    currentHour < 12
      ? 'Good Morning'
      : currentHour < 18
      ? 'Good Afternoon'
      : 'Good Evening';

  return (
    <div className="min-h-screen bg-[#F5F6F8] pb-24 md:pb-8">
      {/* Header */}
      <div className="bg-[#2F6FED] text-white p-6 pb-8 rounded-b-3xl">
        <div className="flex items-center justify-between mb-6 max-w-7xl mx-auto">
          <div>
            <h1 className="text-2xl mb-1">{greeting}, Sarah</h1>
            <p className="text-blue-100 text-sm">
              You have 6 patients to monitor today
            </p>
          </div>
          <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
            <Users className="w-6 h-6" />
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="px-6 -mt-4 space-y-4 max-w-7xl mx-auto md:px-8">
        {/* Urgent Alerts Card */}
        <div className="bg-white rounded-2xl p-5 shadow-sm">
          <div className="flex items-start justify-between mb-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-red-50 rounded-xl flex items-center justify-center">
                <AlertCircle className="w-6 h-6 text-red-500" />
              </div>
              <div>
                <h3 className="text-lg">Urgent Alerts</h3>
                <p className="text-sm text-muted-foreground">Requires attention</p>
              </div>
            </div>
            <span className="bg-red-100 text-red-600 text-xs px-2 py-1 rounded-full">2</span>
          </div>
          <div className="space-y-3">
            <div 
              className="bg-[#F5F6F8] p-4 rounded-xl cursor-pointer hover:bg-gray-200 transition-colors"
              onClick={() => navigate('/professional/patient/1')}
            >
              <p className="mb-1">Michael Chen</p>
              <p className="text-sm text-muted-foreground">Missed 3 consecutive medications</p>
            </div>
            <div 
              className="bg-[#F5F6F8] p-4 rounded-xl cursor-pointer hover:bg-gray-200 transition-colors"
              onClick={() => navigate('/professional/patient/2')}
            >
              <p className="mb-1">Sarah Johnson</p>
              <p className="text-sm text-muted-foreground">Blood pressure reading: 160/95</p>
            </div>
          </div>
        </div>

        {/* Today's Schedule Card */}
        <div className="bg-white rounded-2xl p-5 shadow-sm">
          <div className="flex items-start justify-between mb-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-[#2F6FED]/10 rounded-xl flex items-center justify-center">
                <Calendar className="w-6 h-6 text-[#2F6FED]" />
              </div>
              <div>
                <h3 className="text-lg">Next Appointment</h3>
                <p className="text-sm text-muted-foreground">In 15 minutes</p>
              </div>
            </div>
            <Clock className="w-5 h-5 text-muted-foreground" />
          </div>
          <div className="bg-[#F5F6F8] p-4 rounded-xl mb-4">
            <p className="mb-1">David Thompson</p>
            <p className="text-sm text-muted-foreground">10:00 AM • Diabetes Management Review</p>
          </div>
          <Button 
            onClick={() => navigate('/professional/dashboard')}
            variant="outline" 
            className="w-full h-12"
          >
            View Full Schedule
          </Button>
        </div>

        {/* Patient Overview */}
        <div className="bg-white rounded-2xl p-5 shadow-sm">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 bg-[#2F6FED]/10 rounded-xl flex items-center justify-center">
              <TrendingUp className="w-6 h-6 text-[#2F6FED]" />
            </div>
            <h3 className="text-lg">Patient Overview</h3>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div className="bg-[#F5F6F8] p-4 rounded-xl">
              <p className="text-2xl mb-1">124</p>
              <p className="text-sm text-muted-foreground">Total Patients</p>
            </div>
            <div className="bg-[#F5F6F8] p-4 rounded-xl">
              <p className="text-2xl mb-1">87%</p>
              <p className="text-sm text-muted-foreground">Avg Adherence</p>
            </div>
            <div className="bg-[#F5F6F8] p-4 rounded-xl">
              <p className="text-2xl mb-1">8</p>
              <p className="text-sm text-muted-foreground">Today's Appts</p>
            </div>
            <div className="bg-[#F5F6F8] p-4 rounded-xl">
              <p className="text-2xl mb-1">12</p>
              <p className="text-sm text-muted-foreground">Unread Messages</p>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="bg-white rounded-2xl p-5 shadow-sm">
          <h3 className="text-lg mb-4">Quick Actions</h3>
          <div className="space-y-3">
            <Button 
              onClick={() => navigate('/professional/dashboard')}
              variant="outline" 
              className="w-full h-12 justify-start"
            >
              <Users className="w-5 h-5 mr-3" />
              View All Patients
            </Button>
            <Button 
              onClick={() => navigate('/professional/messages')}
              variant="outline" 
              className="w-full h-12 justify-start"
            >
              <MessageCircle className="w-5 h-5 mr-3" />
              Check Messages
            </Button>
            <Button 
              onClick={() => navigate('/professional/dashboard')}
              variant="outline" 
              className="w-full h-12 justify-start"
            >
              <Calendar className="w-5 h-5 mr-3" />
              Manage Schedule
            </Button>
          </div>
        </div>
      </div>

      <ProfessionalMobileNav />
    </div>
  );
}