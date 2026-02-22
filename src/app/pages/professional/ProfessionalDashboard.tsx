import { useState } from 'react';
import { useNavigate } from 'react-router';
import {
  Heart,
  Users,
  AlertCircle,
  Calendar,
  MessageCircle,
  Search,
  Bell,
  LogOut,
  TrendingDown,
  TrendingUp,
  ChevronRight,
  Menu,
  Home,
  FileText,
  Settings,
} from 'lucide-react';
import { Button } from '../../components/ui/button';
import { Input } from '../../components/ui/input';
import { ProfessionalMobileNav } from '../../components/ProfessionalMobileNav';

interface Patient {
  id: string;
  name: string;
  age: number;
  condition: string;
  adherence: number;
  missedDoses: number;
  nextAppointment: string;
  status: 'good' | 'warning' | 'critical';
  medications?: Medication[];
}

interface MedicationAdherence {
  date: number;
  status: 'taken' | 'missed' | 'late';
}

interface Medication {
  name: string;
  adherence: MedicationAdherence[];
}

export default function ProfessionalDashboard() {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // Generate adherence data for medications
  const generateMedicationAdherence = (patientId: string): Medication[] => {
    const medicationsByPatient: { [key: string]: string[] } = {
      '1': ['Metformin 500mg', 'Lisinopril 10mg', 'Atorvastatin 20mg'],
      '2': ['Amlodipine 5mg', 'Lisinopril 10mg'],
      '3': ['Albuterol', 'Montelukast 10mg', 'Fluticasone'],
      '4': ['Gabapentin 300mg', 'Tramadol 50mg'],
      '5': ['Metformin 500mg', 'Atorvastatin 10mg'],
      '6': ['Lisinopril 10mg', 'Hydrochlorothiazide 12.5mg'],
    };

    const adherenceRates: { [key: string]: number } = {
      '1': 95,
      '2': 78,
      '3': 92,
      '4': 65,
      '5': 88,
      '6': 85,
    };

    const medications = medicationsByPatient[patientId] || [];
    const baseAdherence = adherenceRates[patientId] || 80;
    const daysToShow = 20; // Show last 20 days

    return medications.map((medName) => {
      const adherence: MedicationAdherence[] = [];
      
      for (let day = 1; day <= daysToShow; day++) {
        let status: 'taken' | 'missed' | 'late';
        
        const random = Math.random() * 100;
        if (random < baseAdherence) {
          status = 'taken';
        } else if (random < baseAdherence + 10) {
          status = 'late';
        } else {
          status = 'missed';
        }

        adherence.push({ date: day, status });
      }

      return {
        name: medName,
        adherence,
      };
    });
  };

  // Generate adherence data based on patient's overall adherence
  const generateAdherenceData = (adherence: number) => {
    const data = [];
    const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
    
    for (let i = 0; i < 7; i++) {
      // Create variation around the adherence percentage
      const variation = Math.random() * 20 - 10; // -10 to +10
      let value = Math.min(100, Math.max(0, adherence + variation));
      
      // Round to nearest 25 for cleaner visualization
      value = Math.round(value / 25) * 25;
      
      data.push({ day: days[i], value });
    }
    
    return data;
  };

  const patients: Patient[] = [
    {
      id: '1',
      name: 'David Johnson',
      age: 45,
      condition: 'Type 2 Diabetes',
      adherence: 95,
      missedDoses: 0,
      nextAppointment: 'Feb 21, 2026',
      status: 'good',
    },
    {
      id: '2',
      name: 'Maria Garcia',
      age: 52,
      condition: 'Hypertension',
      adherence: 78,
      missedDoses: 3,
      nextAppointment: 'Feb 22, 2026',
      status: 'warning',
    },
    {
      id: '3',
      name: 'Robert Chen',
      age: 38,
      condition: 'Asthma',
      adherence: 92,
      missedDoses: 1,
      nextAppointment: 'Feb 25, 2026',
      status: 'good',
    },
    {
      id: '4',
      name: 'Sarah Williams',
      age: 41,
      condition: 'Chronic Pain',
      adherence: 65,
      missedDoses: 5,
      nextAppointment: 'Feb 23, 2026',
      status: 'critical',
    },
    {
      id: '5',
      name: 'David Martinez',
      age: 38,
      condition: 'Type 2 Diabetes',
      adherence: 88,
      missedDoses: 2,
      nextAppointment: 'Mar 28, 2026',
      status: 'good',
    },
    {
      id: '6',
      name: 'Maria Lopez',
      age: 48,
      condition: 'High Blood Pressure',
      adherence: 85,
      missedDoses: 1,
      nextAppointment: 'Apr 3, 2026',
      status: 'good',
    },
  ];

  const filteredPatients = patients.filter(
    (patient) =>
      patient.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      patient.condition.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'good':
        return 'bg-[#2ECC71]';
      case 'warning':
        return 'bg-yellow-500';
      case 'critical':
        return 'bg-red-500';
      default:
        return 'bg-gray-500';
    }
  };

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
              className="w-full flex items-center gap-3 px-4 py-3 rounded-lg bg-[#2F6FED]/10 text-[#2F6FED] transition-colors text-left"
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
              className="w-full flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-[#F5F6F8] transition-colors text-left"
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
                <h1 className="text-2xl md:text-3xl mb-1">Patient Dashboard</h1>
                <p className="text-muted-foreground text-sm md:text-base">
                  Monitor and manage your patient care
                </p>
              </div>
            </div>
            <Button variant="ghost" size="icon" className="relative">
              <Bell className="w-5 h-5" />
              <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full" />
            </Button>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-6 mb-8">
            <div className="bg-white rounded-2xl p-6 shadow-sm">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 bg-[#2F6FED]/10 rounded-lg flex items-center justify-center">
                  <Users className="w-5 h-5 text-[#2F6FED]" />
                </div>
                <span className="text-sm text-muted-foreground">Total Patients</span>
              </div>
              <p className="text-3xl">6</p>
            </div>

            <div className="bg-white rounded-2xl p-6 shadow-sm">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 bg-yellow-100 rounded-lg flex items-center justify-center">
                  <AlertCircle className="w-5 h-5 text-yellow-600" />
                </div>
                <span className="text-sm text-muted-foreground">Needs Attention</span>
              </div>
              <p className="text-3xl">2</p>
            </div>

            <div className="bg-white rounded-2xl p-6 shadow-sm">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 bg-[#2ECC71]/10 rounded-lg flex items-center justify-center">
                  <Calendar className="w-5 h-5 text-[#2ECC71]" />
                </div>
                <span className="text-sm text-muted-foreground">Appointments Today</span>
              </div>
              <p className="text-3xl">4</p>
            </div>

            <div className="bg-white rounded-2xl p-6 shadow-sm">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                  <MessageCircle className="w-5 h-5 text-blue-600" />
                </div>
                <span className="text-sm text-muted-foreground">Unread Messages</span>
              </div>
              <p className="text-3xl">3</p>
            </div>
          </div>

          {/* Patient List */}
          <div className="bg-white rounded-2xl p-4 md:p-6 shadow-sm">
            <div className="flex flex-col md:flex-row md:items-center justify-between mb-6 gap-4">
              <h2 className="text-xl md:text-2xl">Patient List</h2>
              <div className="flex items-center gap-3">
                <div className="relative flex-1 md:min-w-[300px]">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                  <Input
                    placeholder="Search patients..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10 h-10"
                  />
                </div>
              </div>
            </div>

            {/* Alerts Section */}
            <div className="mb-6 space-y-3">
              <div className="flex items-center gap-2 mb-3">
                <AlertCircle className="w-5 h-5 text-red-500" />
                <h3 className="text-base md:text-lg">Priority Alerts</h3>
              </div>
              {patients
                .filter((p) => p.status === 'critical' || p.status === 'warning')
                .map((patient) => (
                  <div
                    key={patient.id}
                    className="bg-red-50 border-l-4 border-red-500 p-4 rounded-lg"
                  >
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
                      <div className="flex items-center gap-3">
                        <TrendingDown className="w-5 h-5 text-red-500 flex-shrink-0" />
                        <div>
                          <p className="mb-1">{patient.name}</p>
                          <p className="text-sm text-muted-foreground">
                            Low adherence: {patient.adherence}% • {patient.missedDoses}{' '}
                            missed doses
                          </p>
                        </div>
                      </div>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => navigate(`/professional/patient/${patient.id}`)}
                      >
                        Review
                      </Button>
                    </div>
                  </div>
                ))}
            </div>

            {/* Patient Table */}
            <div className="space-y-3">
              {filteredPatients.map((patient) => {
                const adherenceData = generateAdherenceData(patient.adherence);
                const medications = generateMedicationAdherence(patient.id);
                
                return (
                <div
                  key={patient.id}
                  className="bg-[#F5F6F8] rounded-xl hover:bg-gray-100 transition-colors"
                >
                  {/* Patient Info Row */}
                  <div 
                    className="flex flex-col md:flex-row md:items-center justify-between p-4 cursor-pointer gap-4"
                    onClick={() => navigate(`/professional/patient/${patient.id}`)}
                  >
                    <div className="flex items-center gap-4 flex-1">
                      <div className="w-12 h-12 bg-[#2F6FED] rounded-full flex items-center justify-center text-white flex-shrink-0">
                        {patient.name
                          .split(' ')
                          .map((n) => n[0])
                          .join('')}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                          <p className="truncate">{patient.name}</p>
                          <span
                            className={`w-2 h-2 rounded-full flex-shrink-0 ${getStatusColor(
                              patient.status
                            )}`}
                          />
                        </div>
                        <p className="text-sm text-muted-foreground">
                          {patient.age} years • {patient.condition}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-4 md:gap-8 justify-between md:justify-end">
                      <div className="text-center">
                        <p className="text-sm text-muted-foreground mb-1">Adherence</p>
                        <p
                          className={
                            patient.adherence >= 80 ? 'text-[#2ECC71]' : 'text-red-500'
                          }
                        >
                          {patient.adherence}%
                        </p>
                      </div>

                      <div className="text-center hidden md:block">
                        <p className="text-sm text-muted-foreground mb-1">Missed Doses</p>
                        <p>{patient.missedDoses}</p>
                      </div>

                      <div className="text-center hidden lg:block">
                        <p className="text-sm text-muted-foreground mb-1">Next Visit</p>
                        <p className="text-sm">{patient.nextAppointment}</p>
                      </div>

                      <ChevronRight className="w-5 h-5 text-muted-foreground hidden md:block" />
                    </div>
                  </div>

                  {/* Medication Adherence Chart */}
                  <div className="px-4 pb-4 border-t border-white/50 pt-4 mt-2">
                    <div className="bg-white rounded-xl p-4">
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center gap-2">
                          <div className="w-8 h-8 bg-[#2F6FED]/10 rounded-lg flex items-center justify-center">
                            <TrendingUp className="w-4 h-4 text-[#2F6FED]" />
                          </div>
                          <span className="font-medium">Medication Adherence</span>
                        </div>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={(e) => {
                            e.stopPropagation();
                            navigate('/professional/analytics');
                          }}
                        >
                          View Full Analytics
                        </Button>
                      </div>

                      {/* Legend */}
                      <div className="flex items-center gap-4 mb-4 flex-wrap text-xs">
                        <div className="flex items-center gap-1.5">
                          <div className="w-4 h-4 bg-[#2ECC71] rounded" />
                          <span className="text-muted-foreground">On time</span>
                        </div>
                        <div className="flex items-center gap-1.5">
                          <div className="w-4 h-4 bg-yellow-500 rounded" />
                          <span className="text-muted-foreground">Late</span>
                        </div>
                        <div className="flex items-center gap-1.5">
                          <div className="w-4 h-4 bg-red-500 rounded" />
                          <span className="text-muted-foreground">Missed</span>
                        </div>
                      </div>

                      {/* Medication Adherence Heatmap */}
                      <div className="overflow-x-auto">
                        <div className="min-w-[500px]">
                          {/* Days Header */}
                          <div className="flex items-center mb-2">
                            <div className="w-32 flex-shrink-0" />
                            <div className="flex-1 grid grid-cols-20 gap-0.5">
                              {Array.from({ length: 20 }, (_, i) => i + 1).map((day) => (
                                <div
                                  key={day}
                                  className="text-[10px] text-center text-muted-foreground"
                                >
                                  {day}
                                </div>
                              ))}
                            </div>
                          </div>

                          {/* Medication Rows */}
                          {medications.map((medication, medIdx) => (
                            <div key={medIdx} className="flex items-center mb-2">
                              {/* Medication Name */}
                              <div className="w-32 flex-shrink-0 pr-2">
                                <p className="text-xs font-medium truncate">
                                  {medication.name}
                                </p>
                              </div>

                              {/* Adherence Grid */}
                              <div className="flex-1 grid grid-cols-20 gap-0.5">
                                {medication.adherence.map((day, dayIdx) => (
                                  <div
                                    key={dayIdx}
                                    className={`aspect-square rounded-sm ${
                                      day.status === 'taken'
                                        ? 'bg-[#2ECC71]'
                                        : day.status === 'late'
                                        ? 'bg-yellow-500'
                                        : 'bg-red-500'
                                    } hover:opacity-80 transition-opacity cursor-pointer`}
                                    title={`Day ${day.date}: ${day.status}`}
                                  />
                                ))}
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Status Message */}
                      <div className="bg-[#F5F6F8] p-3 rounded-lg mt-4">
                        <p className="text-sm text-muted-foreground">
                          {patient.adherence >= 80 
                            ? `Patient has maintained excellent adherence across ${medications.length} medications.`
                            : patient.adherence >= 70
                            ? `Patient adherence has dropped. ${patient.missedDoses} doses missed. Follow-up recommended.`
                            : `Critical: Patient showing low adherence (${patient.adherence}%). Immediate intervention needed.`
                          }
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              )})}
            </div>
          </div>
        </div>
      </div>

      <ProfessionalMobileNav />
    </div>
  );
}