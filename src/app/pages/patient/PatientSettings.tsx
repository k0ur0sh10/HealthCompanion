import { useState } from 'react';
import { ArrowLeft, Globe, Bell, Volume2, Moon, LogOut } from 'lucide-react';
import { useNavigate } from 'react-router';
import { MobileNav } from '../../components/MobileNav';
import { Switch } from '../../components/ui/switch';
import { Slider } from '../../components/ui/slider';
import { Button } from '../../components/ui/button';

export default function PatientSettings() {
  const navigate = useNavigate();
  const [fontSize, setFontSize] = useState([16]);
  const [highContrast, setHighContrast] = useState(false);
  const [voiceAssistance, setVoiceAssistance] = useState(false);
  const [notifications, setNotifications] = useState(true);
  const [language, setLanguage] = useState('English');

  return (
    <div className="min-h-screen bg-[#F5F6F8] pb-24 md:pb-8">
      {/* Header */}
      <div className="bg-[#2F6FED] text-white p-6">
        <div className="flex items-center gap-4">
          <button onClick={() => navigate('/patient/home')}>
            <ArrowLeft className="w-6 h-6" />
          </button>
          <h1 className="text-2xl">Settings</h1>
        </div>
      </div>

      {/* Profile Section */}
      <div className="px-6 py-6 space-y-6">
        <div className="bg-white rounded-2xl p-5 shadow-sm">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 bg-[#2F6FED] rounded-full flex items-center justify-center text-white text-xl">
              DJ
            </div>
            <div>
              <p className="text-lg mb-1">David Johnson</p>
              <p className="text-sm text-muted-foreground">david@example.com</p>
            </div>
          </div>
        </div>

        {/* Accessibility Settings */}
        <div className="space-y-3">
          <h2 className="text-lg">Accessibility</h2>

          {/* Language */}
          <div className="bg-white rounded-2xl p-5 shadow-sm">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Globe className="w-5 h-5 text-[#2F6FED]" />
                <div>
                  <p>Language</p>
                  <p className="text-sm text-muted-foreground">Choose your language</p>
                </div>
              </div>
              <select
                value={language}
                onChange={(e) => setLanguage(e.target.value)}
                className="px-3 py-1 rounded-lg border bg-white"
              >
                <option>English</option>
                <option>Spanish</option>
                <option>French</option>
                <option>German</option>
                <option>Chinese</option>
              </select>
            </div>
          </div>

          {/* Font Size */}
          <div className="bg-white rounded-2xl p-5 shadow-sm">
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="text-xl">Aa</div>
                <div className="flex-1">
                  <p>Font Size</p>
                  <p className="text-sm text-muted-foreground">
                    Adjust text size: {fontSize[0]}px
                  </p>
                </div>
              </div>
              <Slider
                value={fontSize}
                onValueChange={setFontSize}
                min={14}
                max={24}
                step={1}
                className="w-full"
              />
            </div>
          </div>

          {/* High Contrast */}
          <div className="bg-white rounded-2xl p-5 shadow-sm">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Moon className="w-5 h-5 text-[#2F6FED]" />
                <div>
                  <p>High Contrast</p>
                  <p className="text-sm text-muted-foreground">
                    Increase color contrast
                  </p>
                </div>
              </div>
              <Switch
                checked={highContrast}
                onCheckedChange={setHighContrast}
              />
            </div>
          </div>

          {/* Voice Assistance */}
          <div className="bg-white rounded-2xl p-5 shadow-sm">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Volume2 className="w-5 h-5 text-[#2F6FED]" />
                <div>
                  <p>Voice Assistance</p>
                  <p className="text-sm text-muted-foreground">
                    Enable screen reader
                  </p>
                </div>
              </div>
              <Switch
                checked={voiceAssistance}
                onCheckedChange={setVoiceAssistance}
              />
            </div>
          </div>
        </div>

        {/* Notification Settings */}
        <div className="space-y-3">
          <h2 className="text-lg">Notifications</h2>

          <div className="bg-white rounded-2xl p-5 shadow-sm">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Bell className="w-5 h-5 text-[#2F6FED]" />
                <div>
                  <p>Medication Reminders</p>
                  <p className="text-sm text-muted-foreground">
                    Get notified when it's time
                  </p>
                </div>
              </div>
              <Switch
                checked={notifications}
                onCheckedChange={setNotifications}
              />
            </div>
          </div>
        </div>

        {/* Account Actions */}
        <div className="space-y-3">
          <Button
            onClick={() => navigate('/patient/dashboard')}
            variant="outline"
            className="w-full h-12"
          >
            Switch to Desktop View
          </Button>

          <Button
            onClick={() => navigate('/')}
            variant="outline"
            className="w-full h-12 text-destructive border-destructive hover:bg-destructive hover:text-white"
          >
            <LogOut className="w-5 h-5 mr-2" />
            Sign Out
          </Button>
        </div>
      </div>

      <MobileNav />
    </div>
  );
}