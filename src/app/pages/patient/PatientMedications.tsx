import { useState } from 'react';
import { ArrowLeft, Check, Plus } from 'lucide-react';
import { useNavigate } from 'react-router';
import { MobileNav } from '../../components/MobileNav';
import { Button } from '../../components/ui/button';

interface Medication {
  id: string;
  name: string;
  dosage: string;
  time: string;
  taken: boolean;
}

export default function PatientMedications() {
  const navigate = useNavigate();
  const [medications, setMedications] = useState<Medication[]>([
    {
      id: '1',
      name: 'Metformin',
      dosage: '500mg',
      time: '08:00 AM',
      taken: true,
    },
    {
      id: '2',
      name: 'Lisinopril',
      dosage: '10mg',
      time: '09:00 AM',
      taken: true,
    },
    {
      id: '3',
      name: 'Metformin',
      dosage: '500mg',
      time: '02:00 PM',
      taken: false,
    },
    {
      id: '4',
      name: 'Atorvastatin',
      dosage: '20mg',
      time: '08:00 PM',
      taken: false,
    },
  ]);

  const [selectedMed, setSelectedMed] = useState<Medication | null>(null);

  const handleMarkAsTaken = (medId: string) => {
    setMedications(medications.map(med => 
      med.id === medId ? { ...med, taken: true } : med
    ));
    setSelectedMed(null);
  };

  return (
    <div className="min-h-screen bg-[#F5F6F8] pb-24 md:pb-8">
      {/* Header */}
      <div className="bg-[#2F6FED] text-white p-6">
        <div className="flex items-center gap-4 mb-4 max-w-7xl mx-auto">
          <button onClick={() => navigate('/patient/home')}>
            <ArrowLeft className="w-6 h-6" />
          </button>
          <h1 className="text-2xl">Medications</h1>
        </div>
      </div>

      {/* Main Content */}
      <div className="px-6 py-6 space-y-6 max-w-7xl mx-auto">
        {/* Today's Schedule */}
        <div>
          <h2 className="text-lg mb-4">Today's Schedule</h2>
          <div className="space-y-3">
            {medications.map((med) => (
              <div
                key={med.id}
                className="bg-white rounded-2xl p-5 shadow-sm cursor-pointer"
                onClick={() => setSelectedMed(med)}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4 flex-1">
                    <div
                      className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                        med.taken
                          ? 'bg-[#2ECC71]'
                          : 'bg-[#2F6FED]/10'
                      }`}
                    >
                      {med.taken ? (
                        <Check className="w-6 h-6 text-white" />
                      ) : (
                        <div className="w-6 h-6 border-2 border-[#2F6FED] rounded-full" />
                      )}
                    </div>
                    <div className="flex-1">
                      <p className="mb-1">{med.name}</p>
                      <p className="text-sm text-muted-foreground">
                        {med.dosage} • {med.time}
                      </p>
                    </div>
                  </div>
                  {med.taken && (
                    <span className="text-sm text-[#2ECC71]">Taken</span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* History Section */}
        <div>
          <h2 className="text-lg mb-4">Recent History</h2>
          <div className="bg-white rounded-2xl p-5 shadow-sm space-y-4">
            <div className="flex items-center justify-between pb-3 border-b">
              <div>
                <p className="mb-1">Yesterday</p>
                <p className="text-sm text-muted-foreground">4 of 4 taken</p>
              </div>
              <div className="text-[#2ECC71]">100%</div>
            </div>
            <div className="flex items-center justify-between pb-3 border-b">
              <div>
                <p className="mb-1">2 days ago</p>
                <p className="text-sm text-muted-foreground">4 of 4 taken</p>
              </div>
              <div className="text-[#2ECC71]">100%</div>
            </div>
            <div className="flex items-center justify-between">
              <div>
                <p className="mb-1">3 days ago</p>
                <p className="text-sm text-muted-foreground">3 of 4 taken</p>
              </div>
              <div className="text-muted-foreground">75%</div>
            </div>
          </div>
        </div>

        <Button className="w-full h-12 bg-[#2F6FED] hover:bg-[#2563D8] text-white">
          <Plus className="w-5 h-5 mr-2" />
          Add New Medication
        </Button>
      </div>

      {/* Medication Detail Modal */}
      {selectedMed && (
        <div className="fixed inset-0 bg-black/50 flex items-end md:items-center md:justify-center z-50">
          <div className="bg-white rounded-t-3xl md:rounded-3xl w-full md:max-w-md p-6 space-y-6">
            <div className="text-center">
              <div className="w-16 h-16 bg-[#2F6FED]/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
                {selectedMed.taken ? (
                  <Check className="w-8 h-8 text-[#2ECC71]" />
                ) : (
                  <div className="w-8 h-8 border-4 border-[#2F6FED] rounded-full" />
                )}
              </div>
              <h2 className="text-2xl mb-2">{selectedMed.name}</h2>
              <p className="text-muted-foreground">
                {selectedMed.dosage} • {selectedMed.time}
              </p>
            </div>

            <div className="space-y-3">
              {!selectedMed.taken && (
                <Button
                  onClick={() => handleMarkAsTaken(selectedMed.id)}
                  className="w-full h-12 bg-[#2ECC71] hover:bg-[#27AE60] text-white"
                >
                  Mark as Taken
                </Button>
              )}
              <Button
                onClick={() => setSelectedMed(null)}
                variant="outline"
                className="w-full h-12"
              >
                {selectedMed.taken ? 'Close' : 'Skip for Now'}
              </Button>
            </div>
          </div>
        </div>
      )}

      <MobileNav />
    </div>
  );
}