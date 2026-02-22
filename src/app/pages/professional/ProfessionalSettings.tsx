import { useState } from 'react';
import { useNavigate } from 'react-router';
import {
  Heart,
  LogOut,
  Menu,
  ChevronRight,
  Home,
  Users,
  Calendar,
  MessageCircle,
  FileText,
  Settings,
  Bell,
  Lock,
  User,
  Mail,
  Phone,
  Globe,
  Shield,
} from 'lucide-react';
import { Button } from '../../components/ui/button';
import { Input } from '../../components/ui/input';
import { ProfessionalMobileNav } from '../../components/ProfessionalMobileNav';

export default function ProfessionalSettings() {
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<'profile' | 'notifications' | 'security' | 'preferences'>('profile');

  const [profileData, setProfileData] = useState({
    name: 'Sarah Ahmed',
    specialty: 'Registered Nurse',
    email: 'sarah.ahmed@publichospital.ca',
    phone: '(514) 555-0123',
    license: 'RN-987654',
    workplace: 'Public Hospital',
    location: 'Montreal, Canada',
  });

  const [notifications, setNotifications] = useState({
    emailNotifications: true,
    smsNotifications: false,
    urgentAlerts: true,
    appointmentReminders: true,
    medicationAlerts: true,
  });

  return (
    <div className="min-h-screen bg-[#F5F6F8] flex pb-24 md:pb-0">
      {/* Sidebar */}
      <div
        className={`fixed md:static inset-y-0 left-0 z-50 w-64 bg-white border-r border-gray-200 flex flex-col transform transition-transform ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'
        }`}
      >
        <div className="p-6 border-b">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-[#2F6FED] rounded-xl flex items-center justify-center">
                <Heart className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl">HealthCompanion</span>
            </div>
            <button
              onClick={() => setSidebarOpen(false)}
              className="md:hidden"
            >
              <ChevronRight className="w-6 h-6" />
            </button>
          </div>
          <p className="text-sm text-muted-foreground mt-2">Professional Portal</p>
        </div>

        <div className="flex-1 p-4">
          <div className="bg-[#F5F6F8] p-4 rounded-xl mb-4">
            <p className="text-sm text-muted-foreground mb-1">Logged in as</p>
            <p>Sarah Ahmed</p>
            <p className="text-sm text-muted-foreground">Registered Nurse</p>
            <p className="text-xs text-muted-foreground mt-1">Public Hospital • Montreal</p>
          </div>

          <nav className="space-y-2">
            <button
              onClick={() => {
                navigate('/professional/home');
                setSidebarOpen(false);
              }}
              className="w-full flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-[#F5F6F8] transition-colors text-left"
            >
              <Home className="w-5 h-5" />
              <span>Home</span>
            </button>
            
            <button
              onClick={() => {
                navigate('/professional/dashboard');
                setSidebarOpen(false);
              }}
              className="w-full flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-[#F5F6F8] transition-colors text-left"
            >
              <Users className="w-5 h-5" />
              <span>Patients</span>
            </button>

            <button
              onClick={() => {
                navigate('/professional/dashboard');
                setSidebarOpen(false);
              }}
              className="w-full flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-[#F5F6F8] transition-colors text-left"
            >
              <Calendar className="w-5 h-5" />
              <span>Schedule</span>
            </button>

            <button
              onClick={() => {
                navigate('/professional/messages');
                setSidebarOpen(false);
              }}
              className="w-full flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-[#F5F6F8] transition-colors text-left"
            >
              <MessageCircle className="w-5 h-5" />
              <span>Messages</span>
            </button>

            <button
              onClick={() => {
                navigate('/professional/dashboard');
                setSidebarOpen(false);
              }}
              className="w-full flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-[#F5F6F8] transition-colors text-left"
            >
              <FileText className="w-5 h-5" />
              <span>Reports</span>
            </button>

            <button
              onClick={() => {
                navigate('/professional/settings');
                setSidebarOpen(false);
              }}
              className="w-full flex items-center gap-3 px-4 py-3 rounded-lg bg-[#2F6FED]/10 text-[#2F6FED] transition-colors text-left"
            >
              <Settings className="w-5 h-5" />
              <span>Settings</span>
            </button>
          </nav>
        </div>

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

      {/* Overlay for mobile */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 md:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Main Content */}
      <div className="flex-1 overflow-y-auto">
        <div className="max-w-7xl mx-auto p-4 md:p-8">
          {/* Header */}
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-4">
              <button
                onClick={() => setSidebarOpen(true)}
                className="md:hidden"
              >
                <Menu className="w-6 h-6" />
              </button>
              <div>
                <h1 className="text-2xl md:text-3xl mb-1">Settings</h1>
                <p className="text-muted-foreground text-sm md:text-base">
                  Manage your account and preferences
                </p>
              </div>
            </div>
          </div>

          {/* Tabs */}
          <div className="flex gap-2 mb-6 overflow-x-auto pb-2">
            <button
              onClick={() => setActiveTab('profile')}
              className={`px-4 py-2 rounded-lg whitespace-nowrap transition-colors ${
                activeTab === 'profile'
                  ? 'bg-[#2F6FED] text-white'
                  : 'bg-white hover:bg-gray-100'
              }`}
            >
              <User className="w-4 h-4 inline mr-2" />
              Profile
            </button>
            <button
              onClick={() => setActiveTab('notifications')}
              className={`px-4 py-2 rounded-lg whitespace-nowrap transition-colors ${
                activeTab === 'notifications'
                  ? 'bg-[#2F6FED] text-white'
                  : 'bg-white hover:bg-gray-100'
              }`}
            >
              <Bell className="w-4 h-4 inline mr-2" />
              Notifications
            </button>
            <button
              onClick={() => setActiveTab('security')}
              className={`px-4 py-2 rounded-lg whitespace-nowrap transition-colors ${
                activeTab === 'security'
                  ? 'bg-[#2F6FED] text-white'
                  : 'bg-white hover:bg-gray-100'
              }`}
            >
              <Lock className="w-4 h-4 inline mr-2" />
              Security
            </button>
            <button
              onClick={() => setActiveTab('preferences')}
              className={`px-4 py-2 rounded-lg whitespace-nowrap transition-colors ${
                activeTab === 'preferences'
                  ? 'bg-[#2F6FED] text-white'
                  : 'bg-white hover:bg-gray-100'
              }`}
            >
              <Globe className="w-4 h-4 inline mr-2" />
              Preferences
            </button>
          </div>

          {/* Content */}
          <div className="bg-white rounded-2xl p-6 shadow-sm">
            {activeTab === 'profile' && (
              <div className="space-y-6">
                <div>
                  <h2 className="text-xl mb-4">Profile Information</h2>
                  <div className="space-y-4">
                    <div className="flex items-center justify-center mb-6">
                      <div className="w-24 h-24 bg-[#2F6FED] rounded-full flex items-center justify-center text-white text-3xl">
                        SW
                      </div>
                    </div>

                    <div className="space-y-2">
                      <label className="text-sm">Full Name</label>
                      <Input
                        value={profileData.name}
                        onChange={(e) => setProfileData({ ...profileData, name: e.target.value })}
                        className="h-12"
                      />
                    </div>

                    <div className="space-y-2">
                      <label className="text-sm">Specialty</label>
                      <Input
                        value={profileData.specialty}
                        onChange={(e) => setProfileData({ ...profileData, specialty: e.target.value })}
                        className="h-12"
                      />
                    </div>

                    <div className="space-y-2">
                      <label className="text-sm">Email</label>
                      <div className="relative">
                        <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                        <Input
                          value={profileData.email}
                          onChange={(e) => setProfileData({ ...profileData, email: e.target.value })}
                          className="h-12 pl-10"
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <label className="text-sm">Phone</label>
                      <div className="relative">
                        <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                        <Input
                          value={profileData.phone}
                          onChange={(e) => setProfileData({ ...profileData, phone: e.target.value })}
                          className="h-12 pl-10"
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <label className="text-sm">Medical License Number</label>
                      <div className="relative">
                        <Shield className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                        <Input
                          value={profileData.license}
                          onChange={(e) => setProfileData({ ...profileData, license: e.target.value })}
                          className="h-12 pl-10"
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <label className="text-sm">Workplace</label>
                      <Input
                        value={profileData.workplace}
                        onChange={(e) => setProfileData({ ...profileData, workplace: e.target.value })}
                        className="h-12"
                      />
                    </div>

                    <div className="space-y-2">
                      <label className="text-sm">Location</label>
                      <Input
                        value={profileData.location}
                        onChange={(e) => setProfileData({ ...profileData, location: e.target.value })}
                        className="h-12"
                      />
                    </div>

                    <Button className="w-full h-12 bg-[#2F6FED] hover:bg-[#2563D8] text-white">
                      Save Changes
                    </Button>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'notifications' && (
              <div className="space-y-6">
                <h2 className="text-xl mb-4">Notification Preferences</h2>
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 bg-[#F5F6F8] rounded-xl">
                    <div>
                      <p className="mb-1">Email Notifications</p>
                      <p className="text-sm text-muted-foreground">Receive updates via email</p>
                    </div>
                    <button
                      onClick={() => setNotifications({ ...notifications, emailNotifications: !notifications.emailNotifications })}
                      className={`w-12 h-6 rounded-full transition-colors ${
                        notifications.emailNotifications ? 'bg-[#2F6FED]' : 'bg-gray-300'
                      }`}
                    >
                      <div
                        className={`w-5 h-5 bg-white rounded-full transition-transform ${
                          notifications.emailNotifications ? 'translate-x-6' : 'translate-x-1'
                        }`}
                      />
                    </button>
                  </div>

                  <div className="flex items-center justify-between p-4 bg-[#F5F6F8] rounded-xl">
                    <div>
                      <p className="mb-1">SMS Notifications</p>
                      <p className="text-sm text-muted-foreground">Receive text messages</p>
                    </div>
                    <button
                      onClick={() => setNotifications({ ...notifications, smsNotifications: !notifications.smsNotifications })}
                      className={`w-12 h-6 rounded-full transition-colors ${
                        notifications.smsNotifications ? 'bg-[#2F6FED]' : 'bg-gray-300'
                      }`}
                    >
                      <div
                        className={`w-5 h-5 bg-white rounded-full transition-transform ${
                          notifications.smsNotifications ? 'translate-x-6' : 'translate-x-1'
                        }`}
                      />
                    </button>
                  </div>

                  <div className="flex items-center justify-between p-4 bg-[#F5F6F8] rounded-xl">
                    <div>
                      <p className="mb-1">Urgent Alerts</p>
                      <p className="text-sm text-muted-foreground">Critical patient updates</p>
                    </div>
                    <button
                      onClick={() => setNotifications({ ...notifications, urgentAlerts: !notifications.urgentAlerts })}
                      className={`w-12 h-6 rounded-full transition-colors ${
                        notifications.urgentAlerts ? 'bg-[#2F6FED]' : 'bg-gray-300'
                      }`}
                    >
                      <div
                        className={`w-5 h-5 bg-white rounded-full transition-transform ${
                          notifications.urgentAlerts ? 'translate-x-6' : 'translate-x-1'
                        }`}
                      />
                    </button>
                  </div>

                  <div className="flex items-center justify-between p-4 bg-[#F5F6F8] rounded-xl">
                    <div>
                      <p className="mb-1">Appointment Reminders</p>
                      <p className="text-sm text-muted-foreground">Get notified before appointments</p>
                    </div>
                    <button
                      onClick={() => setNotifications({ ...notifications, appointmentReminders: !notifications.appointmentReminders })}
                      className={`w-12 h-6 rounded-full transition-colors ${
                        notifications.appointmentReminders ? 'bg-[#2F6FED]' : 'bg-gray-300'
                      }`}
                    >
                      <div
                        className={`w-5 h-5 bg-white rounded-full transition-transform ${
                          notifications.appointmentReminders ? 'translate-x-6' : 'translate-x-1'
                        }`}
                      />
                    </button>
                  </div>

                  <div className="flex items-center justify-between p-4 bg-[#F5F6F8] rounded-xl">
                    <div>
                      <p className="mb-1">Medication Alerts</p>
                      <p className="text-sm text-muted-foreground">Patient medication compliance alerts</p>
                    </div>
                    <button
                      onClick={() => setNotifications({ ...notifications, medicationAlerts: !notifications.medicationAlerts })}
                      className={`w-12 h-6 rounded-full transition-colors ${
                        notifications.medicationAlerts ? 'bg-[#2F6FED]' : 'bg-gray-300'
                      }`}
                    >
                      <div
                        className={`w-5 h-5 bg-white rounded-full transition-transform ${
                          notifications.medicationAlerts ? 'translate-x-6' : 'translate-x-1'
                        }`}
                      />
                    </button>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'security' && (
              <div className="space-y-6">
                <h2 className="text-xl mb-4">Security Settings</h2>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <label className="text-sm">Current Password</label>
                    <Input type="password" placeholder="Enter current password" className="h-12" />
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm">New Password</label>
                    <Input type="password" placeholder="Enter new password" className="h-12" />
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm">Confirm New Password</label>
                    <Input type="password" placeholder="Confirm new password" className="h-12" />
                  </div>

                  <Button className="w-full h-12 bg-[#2F6FED] hover:bg-[#2563D8] text-white">
                    Update Password
                  </Button>

                  <div className="border-t pt-6 mt-6">
                    <h3 className="mb-4">Two-Factor Authentication</h3>
                    <p className="text-sm text-muted-foreground mb-4">
                      Add an extra layer of security to your account
                    </p>
                    <Button variant="outline" className="w-full h-12">
                      Enable 2FA
                    </Button>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'preferences' && (
              <div className="space-y-6">
                <h2 className="text-xl mb-4">Application Preferences</h2>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <label className="text-sm">Language</label>
                    <select className="w-full h-12 px-4 rounded-lg border bg-white">
                      <option>English</option>
                      <option>Spanish</option>
                      <option>French</option>
                      <option>German</option>
                    </select>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm">Time Zone</label>
                    <select className="w-full h-12 px-4 rounded-lg border bg-white">
                      <option>Eastern Time (ET)</option>
                      <option>Central Time (CT)</option>
                      <option>Mountain Time (MT)</option>
                      <option>Pacific Time (PT)</option>
                    </select>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm">Date Format</label>
                    <select className="w-full h-12 px-4 rounded-lg border bg-white">
                      <option>MM/DD/YYYY</option>
                      <option>DD/MM/YYYY</option>
                      <option>YYYY-MM-DD</option>
                    </select>
                  </div>

                  <Button className="w-full h-12 bg-[#2F6FED] hover:bg-[#2563D8] text-white">
                    Save Preferences
                  </Button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      <ProfessionalMobileNav />
    </div>
  );
}