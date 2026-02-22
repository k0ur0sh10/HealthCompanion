import { useState } from 'react';
import { ArrowLeft, Calendar as CalendarIcon, Plus, Clock } from 'lucide-react';
import { useNavigate } from 'react-router';
import { MobileNav } from '../../components/MobileNav';
import { Button } from '../../components/ui/button';

interface Appointment {
  id: string;
  doctorName: string;
  specialty: string;
  date: string;
  time: string;
  type: string;
}

export default function PatientAppointments() {
  const navigate = useNavigate();
  const [view, setView] = useState<'list' | 'calendar'>('list');
  const [showBookModal, setShowBookModal] = useState(false);
  const [appointments, setAppointments] = useState<Appointment[]>([
    {
      id: '1',
      doctorName: 'Dr. Sarah Wilson',
      specialty: 'Endocrinologist',
      date: 'Tomorrow',
      time: '10:00 AM',
      type: 'Regular Checkup',
    },
    {
      id: '2',
      doctorName: 'Dr. Michael Chen',
      specialty: 'Cardiologist',
      date: 'Mar 5, 2026',
      time: '2:30 PM',
      type: 'Follow-up',
    },
    {
      id: '3',
      doctorName: 'Dr. Sarah Wilson',
      specialty: 'Endocrinologist',
      date: 'Apr 12, 2026',
      time: '10:00 AM',
      type: 'Quarterly Review',
    },
  ]);

  const [newAppointment, setNewAppointment] = useState({
    doctor: 'Dr. Sarah Wilson - Endocrinologist',
    date: '',
    time: '',
  });

  const handleBookAppointment = () => {
    if (newAppointment.date && newAppointment.time) {
      const [doctorName, specialty] = newAppointment.doctor.split(' - ');
      const newApt: Appointment = {
        id: Date.now().toString(),
        doctorName,
        specialty,
        date: new Date(newAppointment.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
        time: newAppointment.time,
        type: 'Consultation',
      };
      setAppointments([...appointments, newApt]);
      setShowBookModal(false);
      setNewAppointment({ doctor: 'Dr. Sarah Wilson - Endocrinologist', date: '', time: '' });
    }
  };

  return (
    <div className="min-h-screen bg-[#F5F6F8] pb-24 md:pb-8">
      {/* Header */}
      <div className="bg-[#2F6FED] text-white p-6">
        <div className="flex items-center gap-4 mb-4 max-w-7xl mx-auto">
          <button onClick={() => navigate('/patient/home')}>
            <ArrowLeft className="w-6 h-6" />
          </button>
          <h1 className="text-2xl">Appointments</h1>
        </div>

        {/* View Toggle */}
        <div className="flex gap-2 bg-white/20 rounded-lg p-1">
          <button
            onClick={() => setView('list')}
            className={`flex-1 py-2 rounded-md transition-colors ${
              view === 'list' ? 'bg-white text-[#2F6FED]' : 'text-white'
            }`}
          >
            List View
          </button>
          <button
            onClick={() => setView('calendar')}
            className={`flex-1 py-2 rounded-md transition-colors ${
              view === 'calendar' ? 'bg-white text-[#2F6FED]' : 'text-white'
            }`}
          >
            Calendar
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="px-6 py-6 space-y-4 max-w-7xl mx-auto">
        {view === 'list' ? (
          <>
            <h2 className="text-lg">Upcoming Appointments</h2>
            <div className="space-y-3">
              {appointments.map((apt) => (
                <div key={apt.id} className="bg-white rounded-2xl p-5 shadow-sm">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-start gap-3">
                      <div className="w-12 h-12 bg-[#2F6FED]/10 rounded-xl flex items-center justify-center">
                        <CalendarIcon className="w-6 h-6 text-[#2F6FED]" />
                      </div>
                      <div>
                        <p className="mb-1">{apt.doctorName}</p>
                        <p className="text-sm text-muted-foreground">{apt.specialty}</p>
                      </div>
                    </div>
                  </div>
                  <div className="bg-[#F5F6F8] p-4 rounded-xl space-y-2">
                    <div className="flex items-center gap-2 text-sm">
                      <CalendarIcon className="w-4 h-4 text-muted-foreground" />
                      <span>{apt.date}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <Clock className="w-4 h-4 text-muted-foreground" />
                      <span>{apt.time}</span>
                    </div>
                    <div className="pt-2 border-t">
                      <span className="text-sm">{apt.type}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </>
        ) : (
          <div className="bg-white rounded-2xl p-5 shadow-sm">
            <div className="text-center py-12">
              <CalendarIcon className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
              <p className="text-muted-foreground">
                Calendar view with appointment dates
              </p>
            </div>
          </div>
        )}

        <Button
          onClick={() => setShowBookModal(true)}
          className="w-full h-12 bg-[#2F6FED] hover:bg-[#2563D8] text-white"
        >
          <Plus className="w-5 h-5 mr-2" />
          Book New Appointment
        </Button>
      </div>

      {/* Book Appointment Modal */}
      {showBookModal && (
        <div className="fixed inset-0 bg-black/50 flex items-end md:items-center md:justify-center z-50">
          <div className="bg-white rounded-t-3xl md:rounded-3xl w-full md:max-w-md p-6 space-y-6 m-4">
            <div className="text-center">
              <div className="w-16 h-16 bg-[#2F6FED]/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <CalendarIcon className="w-8 h-8 text-[#2F6FED]" />
              </div>
              <h2 className="text-2xl mb-2">Book Appointment</h2>
              <p className="text-muted-foreground">
                Choose your doctor and preferred time
              </p>
            </div>

            <div className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm">Select Doctor</label>
                <select 
                  className="w-full h-12 px-4 rounded-lg border bg-white"
                  value={newAppointment.doctor}
                  onChange={(e) => setNewAppointment({ ...newAppointment, doctor: e.target.value })}
                >
                  <option>Dr. Sarah Wilson - Endocrinologist</option>
                  <option>Dr. Michael Chen - Cardiologist</option>
                </select>
              </div>

              <div className="space-y-2">
                <label className="text-sm">Preferred Date</label>
                <input
                  type="date"
                  className="w-full h-12 px-4 rounded-lg border"
                  value={newAppointment.date}
                  onChange={(e) => setNewAppointment({ ...newAppointment, date: e.target.value })}
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm">Preferred Time</label>
                <input
                  type="time"
                  className="w-full h-12 px-4 rounded-lg border"
                  value={newAppointment.time}
                  onChange={(e) => setNewAppointment({ ...newAppointment, time: e.target.value })}
                />
              </div>
            </div>

            <div className="space-y-3">
              <Button
                onClick={handleBookAppointment}
                disabled={!newAppointment.date || !newAppointment.time}
                className="w-full h-12 bg-[#2F6FED] hover:bg-[#2563D8] text-white disabled:opacity-50"
              >
                Confirm Booking
              </Button>
              <Button
                onClick={() => setShowBookModal(false)}
                variant="outline"
                className="w-full h-12"
              >
                Cancel
              </Button>
            </div>
          </div>
        </div>
      )}

      <MobileNav />
    </div>
  );
}