import { useState } from 'react';
import { useNavigate, useParams } from 'react-router';
import {
  Heart,
  ArrowLeft,
  MessageCircle,
  Calendar,
  Plus,
  TrendingUp,
  AlertCircle,
  Check,
  X,
} from 'lucide-react';
import { Button } from '../../components/ui/button';
import { Textarea } from '../../components/ui/textarea';

export default function ProfessionalPatientDetail() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [showMessageModal, setShowMessageModal] = useState(false);
  const [showAppointmentModal, setShowAppointmentModal] = useState(false);
  const [showNotesModal, setShowNotesModal] = useState(false);
  const [messageText, setMessageText] = useState('');
  const [noteText, setNoteText] = useState('');
  const [newAppointment, setNewAppointment] = useState({
    type: 'Regular Checkup',
    date: '',
    time: '',
  });

  // Mock patient data
  const patient = {
    id: id || '1',
    name: 'David Johnson',
    age: 45,
    condition: 'Type 2 Diabetes',
    email: 'david@example.com',
    phone: '(555) 123-4567',
    adherence: 95,
    missedDoses: 0,
    currentStreak: 3,
    medications: [
      { name: 'Metformin', dosage: '500mg', frequency: '2x daily', adherence: 98 },
      { name: 'Lisinopril', dosage: '10mg', frequency: '1x daily', adherence: 95 },
      { name: 'Atorvastatin', dosage: '20mg', frequency: '1x daily', adherence: 92 },
    ],
    appointments: [
      { date: 'Feb 21, 2026', time: '10:00 AM', type: 'Regular Checkup', status: 'upcoming' },
      { date: 'Jan 15, 2026', time: '2:00 PM', type: 'Follow-up', status: 'completed' },
      { date: 'Dec 10, 2025', time: '10:00 AM', type: 'Initial Consultation', status: 'completed' },
    ],
    notes: [
      { date: 'Jan 15, 2026', note: 'Patient responding well to current medication regimen. Blood sugar levels stable.' },
      { date: 'Dec 10, 2025', note: 'Started on Metformin 500mg 2x daily. Discussed dietary changes and exercise plan.' },
    ],
  };

  const adherenceData = [
    { day: 'Mon', value: 100 },
    { day: 'Tue', value: 100 },
    { day: 'Wed', value: 100 },
    { day: 'Thu', value: 75 },
    { day: 'Fri', value: 100 },
    { day: 'Sat', value: 100 },
    { day: 'Sun', value: 100 },
  ];

  // Different patient data based on ID
  const patientsData: { [key: string]: typeof patient } = {
    '1': {
      id: '1',
      name: 'David Johnson',
      age: 45,
      condition: 'Type 2 Diabetes',
      email: 'david@example.com',
      phone: '(555) 123-4567',
      adherence: 95,
      missedDoses: 0,
      currentStreak: 14,
      medications: [
        { name: 'Metformin', dosage: '500mg', frequency: '2x daily', adherence: 98 },
        { name: 'Lisinopril', dosage: '10mg', frequency: '1x daily', adherence: 95 },
        { name: 'Atorvastatin', dosage: '20mg', frequency: '1x daily', adherence: 92 },
      ],
      appointments: [
        { date: 'Feb 21, 2026', time: '10:00 AM', type: 'Regular Checkup', status: 'upcoming' },
        { date: 'Jan 15, 2026', time: '2:00 PM', type: 'Follow-up', status: 'completed' },
      ],
      notes: [
        { date: 'Jan 15, 2026', note: 'Patient responding well to current medication regimen. Blood sugar levels stable.' },
      ],
    },
    '2': {
      id: '2',
      name: 'Maria Garcia',
      age: 52,
      condition: 'Hypertension',
      email: 'maria@example.com',
      phone: '(555) 234-5678',
      adherence: 78,
      missedDoses: 3,
      currentStreak: 2,
      medications: [
        { name: 'Amlodipine', dosage: '5mg', frequency: '1x daily', adherence: 82 },
        { name: 'Losartan', dosage: '50mg', frequency: '1x daily', adherence: 75 },
      ],
      appointments: [
        { date: 'Feb 22, 2026', time: '2:00 PM', type: 'Blood Pressure Check', status: 'upcoming' },
        { date: 'Jan 20, 2026', time: '11:00 AM', type: 'Follow-up', status: 'completed' },
      ],
      notes: [
        { date: 'Jan 20, 2026', note: 'Patient missed several doses last week. Discussed importance of consistent medication adherence.' },
      ],
    },
    '3': {
      id: '3',
      name: 'Robert Chen',
      age: 38,
      condition: 'Asthma',
      email: 'robert@example.com',
      phone: '(555) 345-6789',
      adherence: 92,
      missedDoses: 1,
      currentStreak: 7,
      medications: [
        { name: 'Albuterol Inhaler', dosage: '90mcg', frequency: 'As needed', adherence: 95 },
        { name: 'Fluticasone', dosage: '250mcg', frequency: '2x daily', adherence: 88 },
      ],
      appointments: [
        { date: 'Feb 25, 2026', time: '9:00 AM', type: 'Respiratory Assessment', status: 'upcoming' },
        { date: 'Jan 10, 2026', time: '3:00 PM', type: 'Regular Checkup', status: 'completed' },
      ],
      notes: [
        { date: 'Jan 10, 2026', note: 'Asthma well controlled. Continue current medication regimen.' },
      ],
    },
    '4': {
      id: '4',
      name: 'Sarah Williams',
      age: 41,
      condition: 'Chronic Pain',
      email: 'sarah@example.com',
      phone: '(555) 456-7890',
      adherence: 65,
      missedDoses: 5,
      currentStreak: 1,
      medications: [
        { name: 'Gabapentin', dosage: '300mg', frequency: '3x daily', adherence: 70 },
        { name: 'Naproxen', dosage: '500mg', frequency: '2x daily', adherence: 60 },
      ],
      appointments: [
        { date: 'Feb 23, 2026', time: '1:00 PM', type: 'Pain Management', status: 'upcoming' },
        { date: 'Jan 25, 2026', time: '10:00 AM', type: 'Follow-up', status: 'completed' },
      ],
      notes: [
        { date: 'Jan 25, 2026', note: 'Patient struggling with medication adherence. Discussed strategies to improve compliance.' },
      ],
    },
  };

  const patientData = patientsData[id || '1'] || patientsData['1'];

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

  const adherenceChartData = generateAdherenceData(patientData.adherence);

  const handleSendMessage = () => {
    if (messageText.trim()) {
      // Message sent successfully
      setShowMessageModal(false);
      setMessageText('');
      alert('Message sent successfully to ' + patientData.name);
    }
  };

  const handleAddAppointment = () => {
    if (newAppointment.date && newAppointment.time) {
      // Appointment scheduled successfully
      setShowAppointmentModal(false);
      setNewAppointment({ type: 'Regular Checkup', date: '', time: '' });
      alert('Appointment scheduled successfully for ' + patientData.name);
    }
  };

  const handleSaveNote = () => {
    if (noteText.trim()) {
      // Note saved successfully
      setShowNotesModal(false);
      setNoteText('');
      alert('Clinical note saved successfully');
    }
  };

  return (
    <div className="min-h-screen bg-[#F5F6F8] pb-24 md:pb-0">
      {/* Header */}
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto p-4 md:p-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <button
                onClick={() => navigate('/professional/dashboard')}
                className="w-10 h-10 flex items-center justify-center hover:bg-gray-100 rounded-lg"
              >
                <ArrowLeft className="w-5 h-5" />
              </button>
              <div className="flex items-center gap-4">
                <div className="w-12 md:w-16 h-12 md:h-16 bg-[#2F6FED] rounded-full flex items-center justify-center text-white text-lg md:text-xl">
                  {patientData.name.split(' ').map((n) => n[0]).join('')}
                </div>
                <div>
                  <h1 className="text-xl md:text-2xl mb-1">{patientData.name}</h1>
                  <p className="text-sm text-muted-foreground">
                    {patientData.age} years • {patientData.condition}
                  </p>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Button
                onClick={() => setShowMessageModal(true)}
                variant="outline"
                className="h-10 flex-1 md:flex-none"
              >
                <MessageCircle className="w-5 h-5 md:mr-2" />
                <span className="hidden md:inline">Send Message</span>
              </Button>
              <Button
                onClick={() => setShowAppointmentModal(true)}
                className="h-10 bg-[#2F6FED] hover:bg-[#2563D8] text-white flex-1 md:flex-none"
              >
                <Calendar className="w-5 h-5 md:mr-2" />
                <span className="hidden md:inline">Add Appointment</span>
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto p-4 md:p-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Content - 2 columns */}
          <div className="lg:col-span-2 space-y-6">
            {/* Medication Adherence Chart */}
            <div className="bg-white rounded-2xl p-6 shadow-sm">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-[#2F6FED]/10 rounded-lg flex items-center justify-center">
                    <TrendingUp className="w-5 h-5 text-[#2F6FED]" />
                  </div>
                  <h2 className="text-xl">Medication Adherence</h2>
                </div>
                <div className="flex items-center gap-2">
                  <div className="text-right">
                    <p className="text-2xl text-[#2ECC71]">{patientData.adherence}%</p>
                    <p className="text-sm text-muted-foreground">Last 7 days</p>
                  </div>
                </div>
              </div>

              {/* Simple Bar Chart */}
              <div className="flex items-end justify-between gap-2 h-48 mb-4">
                {adherenceChartData.map((data, idx) => (
                  <div key={idx} className="flex-1 flex flex-col items-center gap-2">
                    <div className="w-full flex items-end justify-center h-full">
                      <div
                        className={`w-full rounded-t-lg transition-all ${
                          data.value === 100 
                            ? 'bg-[#2ECC71]' 
                            : data.value >= 75 
                            ? 'bg-yellow-500' 
                            : 'bg-red-500'
                        }`}
                        style={{ height: `${data.value}%` }}
                      />
                    </div>
                    <span className="text-xs text-muted-foreground">{data.day}</span>
                  </div>
                ))}
              </div>

              <div className="bg-[#F5F6F8] p-4 rounded-xl">
                <p className="text-sm text-muted-foreground">
                  {patientData.adherence >= 80 
                    ? `Patient has maintained excellent adherence with a ${patientData.currentStreak}-day streak of taking all medications on time.`
                    : patientData.adherence >= 70
                    ? `Patient adherence has dropped. ${patientData.missedDoses} doses missed in the last 7 days. Follow-up recommended.`
                    : `Critical: Patient showing low adherence (${patientData.adherence}%). Immediate intervention needed.`
                  }
                </p>
              </div>
            </div>

            {/* Current Medications */}
            <div className="bg-white rounded-2xl p-6 shadow-sm">
              <h2 className="text-xl mb-4">Current Medications</h2>
              <div className="space-y-3">
                {patientData.medications.map((med, idx) => (
                  <div key={idx} className="bg-[#F5F6F8] p-4 rounded-xl">
                    <div className="flex items-center justify-between mb-2">
                      <div>
                        <p className="mb-1">{med.name}</p>
                        <p className="text-sm text-muted-foreground">
                          {med.dosage} • {med.frequency}
                        </p>
                      </div>
                      <div className="text-right">
                        <p className={med.adherence >= 80 ? 'text-[#2ECC71]' : 'text-red-500'}>{med.adherence}%</p>
                        <p className="text-xs text-muted-foreground">Adherence</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Appointment History */}
            <div className="bg-white rounded-2xl p-6 shadow-sm">
              <h2 className="text-xl mb-4">Appointment History</h2>
              <div className="space-y-3">
                {patientData.appointments.map((apt, idx) => (
                  <div key={idx} className="flex items-start justify-between p-4 bg-[#F5F6F8] rounded-xl">
                    <div className="flex items-start gap-3">
                      <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                        apt.status === 'upcoming' ? 'bg-[#2F6FED]' : 'bg-[#2ECC71]'
                      }`}>
                        {apt.status === 'upcoming' ? (
                          <Calendar className="w-5 h-5 text-white" />
                        ) : (
                          <Check className="w-5 h-5 text-white" />
                        )}
                      </div>
                      <div>
                        <p className="mb-1">{apt.type}</p>
                        <p className="text-sm text-muted-foreground">
                          {apt.date} • {apt.time}
                        </p>
                      </div>
                    </div>
                    <span className={`px-3 py-1 rounded-full text-xs ${
                      apt.status === 'upcoming'
                        ? 'bg-blue-100 text-blue-700'
                        : 'bg-green-100 text-green-700'
                    }`}>
                      {apt.status}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar - 1 column */}
          <div className="space-y-6">
            {/* Contact Information */}
            <div className="bg-white rounded-2xl p-6 shadow-sm">
              <h2 className="text-xl mb-4">Contact Information</h2>
              <div className="space-y-3">
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Email</p>
                  <p>{patientData.email}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Phone</p>
                  <p>{patientData.phone}</p>
                </div>
              </div>
            </div>

            {/* Quick Stats */}
            <div className="bg-white rounded-2xl p-6 shadow-sm">
              <h2 className="text-xl mb-4">Quick Stats</h2>
              <div className="space-y-3">
                <div className="bg-[#F5F6F8] p-4 rounded-xl">
                  <p className={`text-2xl mb-1 ${patientData.adherence >= 80 ? 'text-[#2ECC71]' : 'text-red-500'}`}>{patientData.adherence}%</p>
                  <p className="text-sm text-muted-foreground">Overall Adherence</p>
                </div>
                <div className="bg-[#F5F6F8] p-4 rounded-xl">
                  <p className="text-2xl mb-1">{patientData.missedDoses}</p>
                  <p className="text-sm text-muted-foreground">Missed Doses (7 days)</p>
                </div>
                <div className="bg-[#F5F6F8] p-4 rounded-xl">
                  <p className="text-2xl mb-1">{patientData.currentStreak}</p>
                  <p className="text-sm text-muted-foreground">Day Streak</p>
                </div>
              </div>
            </div>

            {/* Clinical Notes */}
            <div className="bg-white rounded-2xl p-6 shadow-sm">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl">Clinical Notes</h2>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => setShowNotesModal(true)}
                >
                  <Plus className="w-4 h-4" />
                </Button>
              </div>
              <div className="space-y-3">
                {patientData.notes.map((note, idx) => (
                  <div key={idx} className="bg-[#F5F6F8] p-4 rounded-xl">
                    <p className="text-xs text-muted-foreground mb-2">{note.date}</p>
                    <p className="text-sm">{note.note}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Send Message Modal */}
      {showMessageModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-3xl w-full max-w-md p-6 space-y-4">
            <h2 className="text-2xl">Send Message</h2>
            <Textarea
              placeholder="Type your message to the patient..."
              className="min-h-[120px]"
              value={messageText}
              onChange={(e) => setMessageText(e.target.value)}
            />
            <div className="flex gap-3">
              <Button
                onClick={handleSendMessage}
                disabled={!messageText.trim()}
                className="flex-1 h-12 bg-[#2F6FED] hover:bg-[#2563D8] text-white disabled:opacity-50"
              >
                Send Message
              </Button>
              <Button
                onClick={() => {
                  setShowMessageModal(false);
                  setMessageText('');
                }}
                variant="outline"
                className="flex-1 h-12"
              >
                Cancel
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Add Appointment Modal */}
      {showAppointmentModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-3xl w-full max-w-md p-6 space-y-4">
            <h2 className="text-2xl">Schedule Appointment</h2>
            <div className="space-y-3">
              <div>
                <label className="text-sm mb-2 block">Appointment Type</label>
                <select
                  className="w-full h-12 px-4 rounded-lg border"
                  value={newAppointment.type}
                  onChange={(e) => setNewAppointment({ ...newAppointment, type: e.target.value })}
                >
                  <option>Regular Checkup</option>
                  <option>Follow-up</option>
                  <option>Emergency</option>
                  <option>Consultation</option>
                </select>
              </div>
              <div>
                <label className="text-sm mb-2 block">Date</label>
                <input
                  type="date"
                  className="w-full h-12 px-4 rounded-lg border"
                  value={newAppointment.date}
                  onChange={(e) => setNewAppointment({ ...newAppointment, date: e.target.value })}
                />
              </div>
              <div>
                <label className="text-sm mb-2 block">Time</label>
                <input
                  type="time"
                  className="w-full h-12 px-4 rounded-lg border"
                  value={newAppointment.time}
                  onChange={(e) => setNewAppointment({ ...newAppointment, time: e.target.value })}
                />
              </div>
            </div>
            <div className="flex gap-3">
              <Button
                onClick={handleAddAppointment}
                disabled={!newAppointment.date || !newAppointment.time}
                className="flex-1 h-12 bg-[#2F6FED] hover:bg-[#2563D8] text-white disabled:opacity-50"
              >
                Schedule
              </Button>
              <Button
                onClick={() => {
                  setShowAppointmentModal(false);
                  setNewAppointment({ type: 'Regular Checkup', date: '', time: '' });
                }}
                variant="outline"
                className="flex-1 h-12"
              >
                Cancel
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Add Notes Modal */}
      {showNotesModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-3xl w-full max-w-md p-6 space-y-4">
            <h2 className="text-2xl">Add Clinical Note</h2>
            <Textarea
              placeholder="Enter clinical observations and notes..."
              className="min-h-[150px]"
              value={noteText}
              onChange={(e) => setNoteText(e.target.value)}
            />
            <div className="flex gap-3">
              <Button
                onClick={handleSaveNote}
                disabled={!noteText.trim()}
                className="flex-1 h-12 bg-[#2F6FED] hover:bg-[#2563D8] text-white disabled:opacity-50"
              >
                Save Note
              </Button>
              <Button
                onClick={() => {
                  setShowNotesModal(false);
                  setNoteText('');
                }}
                variant="outline"
                className="flex-1 h-12"
              >
                Cancel
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}