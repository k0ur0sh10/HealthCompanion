import { useState } from 'react';
import { useNavigate } from 'react-router';
import {
  Heart,
  Users,
  Calendar,
  MessageCircle,
  Search,
  Bell,
  LogOut,
  ChevronRight,
  Menu,
  Home,
  FileText,
  Settings,
  Download,
  Filter,
} from 'lucide-react';
import { Button } from '../../components/ui/button';
import { Input } from '../../components/ui/input';
import { ProfessionalMobileNav } from '../../components/ProfessionalMobileNav';

interface MedicationAdherence {
  date: number;
  status: 'taken' | 'missed' | 'late';
}

interface Medication {
  name: string;
  adherence: MedicationAdherence[];
}

interface Patient {
  id: string;
  name: string;
  medications: Medication[];
}

export default function ProfessionalAnalytics() {
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [selectedPatient, setSelectedPatient] = useState('1');

  const generateAdherenceData = (patientId: string): Medication[] => {
    const medications = [
      'Metformin 500mg',
      'Lisinopril 10mg',
      'Atorvastatin 20mg',
      'Aspirin 81mg',
    ];

    // Different adherence patterns based on patient
    const adherencePatterns: { [key: string]: number[] } = {
      '1': [95, 92, 90, 88], // David Johnson - excellent
      '2': [78, 75, 70, 85], // Maria Garcia - warning
      '3': [92, 88, 90, 92], // Robert Chen - good
      '4': [65, 60, 55, 70], // Sarah Williams - critical
      '5': [88, 85, 90, 87], // David Martinez - good
      '6': [85, 82, 88, 84], // Maria Lopez - good
    };

    const medicationsByPatient: { [key: string]: string[] } = {
      '1': ['Metformin 500mg', 'Lisinopril 10mg', 'Atorvastatin 20mg'],
      '2': ['Amlodipine 5mg', 'Lisinopril 10mg'],
      '3': ['Albuterol', 'Montelukast 10mg', 'Fluticasone'],
      '4': ['Gabapentin 300mg', 'Tramadol 50mg'],
      '5': ['Metformin 500mg', 'Atorvastatin 10mg'],
      '6': ['Lisinopril 10mg', 'Hydrochlorothiazide 12.5mg'],
    };

    const patientMeds = medicationsByPatient[patientId] || medications.slice(0, 4);
    const pattern = adherencePatterns[patientId] || [80, 80, 80, 80];
    const daysInMonth = 31;

    return patientMeds.map((medName, medIdx) => {
      const adherence: MedicationAdherence[] = [];
      const adherenceRate = pattern[medIdx] || 80;

      for (let day = 1; day <= daysInMonth; day++) {
        let status: 'taken' | 'missed' | 'late';
        
        const random = Math.random() * 100;
        if (random < adherenceRate) {
          status = 'taken';
        } else if (random < adherenceRate + 10) {
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

  const patients: Patient[] = [
    {
      id: '1',
      name: 'David Johnson',
      medications: generateAdherenceData('1'),
    },
    {
      id: '2',
      name: 'Maria Garcia',
      medications: generateAdherenceData('2'),
    },
    {
      id: '3',
      name: 'Robert Chen',
      medications: generateAdherenceData('3'),
    },
    {
      id: '4',
      name: 'Sarah Williams',
      medications: generateAdherenceData('4'),
    },
    {
      id: '5',
      name: 'David Martinez',
      medications: generateAdherenceData('5'),
    },
    {
      id: '6',
      name: 'Maria Lopez',
      medications: generateAdherenceData('6'),
    },
  ];

  const selectedPatientData = patients.find((p) => p.id === selectedPatient);

  const getStatusColor = (status: 'taken' | 'missed' | 'late') => {
    switch (status) {
      case 'taken':
        return 'bg-[#2ECC71]';
      case 'late':
        return 'bg-yellow-500';
      case 'missed':
        return 'bg-red-500';
    }
  };

  const calculateOverallAdherence = (medications: Medication[]) => {
    let totalDays = 0;
    let takenDays = 0;

    medications.forEach((med) => {
      med.adherence.forEach((day) => {
        totalDays++;
        if (day.status === 'taken') {
          takenDays++;
        }
      });
    });

    return Math.round((takenDays / totalDays) * 100);
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
            <button onClick={() => setSidebarOpen(false)} className="md:hidden">
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
                navigate('/professional/analytics');
                setSidebarOpen(false);
              }}
              className="w-full flex items-center gap-3 px-4 py-3 rounded-lg bg-[#2F6FED]/10 text-[#2F6FED] transition-colors text-left"
            >
              <FileText className="w-5 h-5" />
              <span>Analytics</span>
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
              <button onClick={() => setSidebarOpen(true)} className="md:hidden">
                <Menu className="w-6 h-6" />
              </button>
              <div>
                <h1 className="text-2xl md:text-3xl mb-1">Medication Analytics</h1>
                <p className="text-muted-foreground text-sm md:text-base">
                  Detailed adherence tracking and insights
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Button variant="ghost" size="icon" className="relative">
                <Bell className="w-5 h-5" />
                <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full" />
              </Button>
            </div>
          </div>

          {/* Patient Selector */}
          <div className="bg-white rounded-2xl p-4 md:p-6 shadow-sm mb-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <h2 className="text-xl">Select Patient</h2>
              <div className="flex items-center gap-3">
                <select
                  value={selectedPatient}
                  onChange={(e) => setSelectedPatient(e.target.value)}
                  className="px-4 py-2 border border-gray-300 rounded-lg bg-white text-sm md:text-base"
                >
                  {patients.map((patient) => (
                    <option key={patient.id} value={patient.id}>
                      {patient.name}
                    </option>
                  ))}
                </select>
                <Button variant="outline" size="icon">
                  <Download className="w-5 h-5" />
                </Button>
              </div>
            </div>
          </div>

          {/* Medication Adherence Heatmap */}
          {selectedPatientData && (
            <div className="bg-white rounded-2xl p-4 md:p-6 shadow-sm">
              <div className="mb-6">
                <div className="flex items-center justify-between mb-2">
                  <h2 className="text-xl md:text-2xl">Medication Adherence Calendar</h2>
                  <div className="text-right">
                    <p className="text-2xl text-[#2F6FED]">
                      {calculateOverallAdherence(selectedPatientData.medications)}%
                    </p>
                    <p className="text-xs text-muted-foreground">Overall Adherence</p>
                  </div>
                </div>
                <p className="text-sm text-muted-foreground">
                  {selectedPatientData.name} - February 2026
                </p>
              </div>

              {/* Legend */}
              <div className="flex items-center gap-6 mb-6 flex-wrap">
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 bg-[#2ECC71] rounded" />
                  <span className="text-sm">Taken on time</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 bg-yellow-500 rounded" />
                  <span className="text-sm">Taken late</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 bg-red-500 rounded" />
                  <span className="text-sm">Missed</span>
                </div>
              </div>

              {/* Heatmap Grid */}
              <div className="overflow-x-auto">
                <div className="min-w-[800px]">
                  {/* Days Header */}
                  <div className="flex items-center mb-2">
                    <div className="w-40 md:w-48 flex-shrink-0" />
                    <div className="flex-1 grid grid-cols-31 gap-1">
                      {Array.from({ length: 31 }, (_, i) => i + 1).map((day) => (
                        <div
                          key={day}
                          className="text-xs text-center text-muted-foreground font-medium"
                        >
                          {day}
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Medication Rows */}
                  {selectedPatientData.medications.map((medication, medIdx) => (
                    <div key={medIdx} className="mb-3">
                      <div className="flex items-center">
                        {/* Medication Name */}
                        <div className="w-40 md:w-48 flex-shrink-0 pr-4">
                          <p className="text-sm font-medium truncate">
                            {medication.name}
                          </p>
                          <p className="text-xs text-muted-foreground">
                            {medication.adherence.filter((d) => d.status === 'taken')
                              .length}{' '}
                            / {medication.adherence.length} days
                          </p>
                        </div>

                        {/* Adherence Grid */}
                        <div className="flex-1 grid grid-cols-31 gap-1">
                          {medication.adherence.map((day, dayIdx) => (
                            <div
                              key={dayIdx}
                              className={`aspect-square rounded ${getStatusColor(
                                day.status
                              )} hover:opacity-80 transition-opacity cursor-pointer`}
                              title={`Day ${day.date}: ${day.status}`}
                            />
                          ))}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Summary Stats */}
              <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-[#F5F6F8] p-4 rounded-xl">
                  <p className="text-sm text-muted-foreground mb-1">Total Medications</p>
                  <p className="text-2xl">{selectedPatientData.medications.length}</p>
                </div>
                <div className="bg-[#2ECC71]/10 p-4 rounded-xl">
                  <p className="text-sm text-muted-foreground mb-1">Doses Taken</p>
                  <p className="text-2xl text-[#2ECC71]">
                    {selectedPatientData.medications.reduce(
                      (acc, med) =>
                        acc + med.adherence.filter((d) => d.status === 'taken').length,
                      0
                    )}
                  </p>
                </div>
                <div className="bg-red-50 p-4 rounded-xl">
                  <p className="text-sm text-muted-foreground mb-1">Doses Missed</p>
                  <p className="text-2xl text-red-500">
                    {selectedPatientData.medications.reduce(
                      (acc, med) =>
                        acc + med.adherence.filter((d) => d.status === 'missed').length,
                      0
                    )}
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      <ProfessionalMobileNav />
    </div>
  );
}