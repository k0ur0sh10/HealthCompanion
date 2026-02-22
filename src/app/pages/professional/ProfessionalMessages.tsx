import { useState } from 'react';
import { useNavigate } from 'react-router';
import {
  Heart,
  Search,
  Send,
  ArrowLeft,
  LogOut,
  Menu,
  ChevronRight,
  Home,
  Users,
  Calendar,
  MessageCircle,
  FileText,
  Settings,
} from 'lucide-react';
import { Button } from '../../components/ui/button';
import { Input } from '../../components/ui/input';
import { Textarea } from '../../components/ui/textarea';
import { ProfessionalMobileNav } from '../../components/ProfessionalMobileNav';

interface Message {
  id: string;
  patientName: string;
  patientInitials: string;
  lastMessage: string;
  time: string;
  unread: boolean;
}

interface ChatMessage {
  id: string;
  sender: 'doctor' | 'patient';
  text: string;
  time: string;
}

export default function ProfessionalMessages() {
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedChat, setSelectedChat] = useState<string | null>(null);
  const [messageText, setMessageText] = useState('');

  const conversations: Message[] = [
    {
      id: '1',
      patientName: 'David Johnson',
      patientInitials: 'DJ',
      lastMessage: 'Thank you for the advice, Doctor.',
      time: '10:30 AM',
      unread: false,
    },
    {
      id: '2',
      patientName: 'Maria Garcia',
      patientInitials: 'MG',
      lastMessage: 'I forgot to take my medication this morning.',
      time: '9:45 AM',
      unread: true,
    },
    {
      id: '3',
      patientName: 'Robert Chen',
      patientInitials: 'RC',
      lastMessage: 'My asthma symptoms have improved.',
      time: 'Yesterday',
      unread: false,
    },
    {
      id: '4',
      patientName: 'Sarah Williams',
      patientInitials: 'SW',
      lastMessage: 'Can we reschedule my appointment?',
      time: 'Yesterday',
      unread: true,
    },
  ];

  const [chatMessages, setChatMessages] = useState<{ [key: string]: ChatMessage[] }>({
    '1': [
      { id: '1', sender: 'doctor', text: 'Hello David, how are you feeling today?', time: '10:00 AM' },
      { id: '2', sender: 'patient', text: "I'm feeling much better, thank you!", time: '10:15 AM' },
      { id: '3', sender: 'doctor', text: "That's great to hear. Keep up with your medication schedule.", time: '10:20 AM' },
      { id: '4', sender: 'patient', text: 'Thank you for the advice, Doctor.', time: '10:30 AM' },
    ],
    '2': [
      { id: '1', sender: 'patient', text: 'I forgot to take my medication this morning.', time: '9:45 AM' },
    ],
    '3': [
      { id: '1', sender: 'patient', text: 'My asthma symptoms have improved.', time: 'Yesterday' },
      { id: '2', sender: 'doctor', text: "That's wonderful news! Continue your current treatment.", time: 'Yesterday' },
    ],
    '4': [
      { id: '1', sender: 'patient', text: 'Can we reschedule my appointment?', time: 'Yesterday' },
    ],
  });

  const handleSendMessage = () => {
    if (messageText.trim() && selectedChat) {
      const newMessage: ChatMessage = {
        id: Date.now().toString(),
        sender: 'doctor',
        text: messageText,
        time: new Date().toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true }),
      };
      setChatMessages({
        ...chatMessages,
        [selectedChat]: [...(chatMessages[selectedChat] || []), newMessage],
      });
      setMessageText('');
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const filteredConversations = conversations.filter(
    (conv) =>
      conv.patientName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const selectedConversation = conversations.find(c => c.id === selectedChat);

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
              className="w-full flex items-center gap-3 px-4 py-3 rounded-lg bg-[#2F6FED]/10 text-[#2F6FED] transition-colors text-left"
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
      <div className="flex-1 flex flex-col overflow-hidden">
        <div className="bg-white border-b p-4 md:p-6">
          <div className="max-w-7xl mx-auto flex items-center justify-between">
            <div className="flex items-center gap-4">
              <button
                onClick={() => setSidebarOpen(true)}
                className="md:hidden"
              >
                <Menu className="w-6 h-6" />
              </button>
              <div>
                <h1 className="text-2xl md:text-3xl">Messages</h1>
                <p className="text-sm text-muted-foreground hidden md:block">
                  Communicate with your patients
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="flex-1 flex overflow-hidden">
          {/* Conversations List */}
          <div className={`${selectedChat ? 'hidden md:block' : 'block'} w-full md:w-80 border-r bg-white overflow-y-auto`}>
            <div className="p-4 border-b">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <Input
                  placeholder="Search conversations..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 h-10"
                />
              </div>
            </div>

            <div className="divide-y">
              {filteredConversations.map((conv) => (
                <button
                  key={conv.id}
                  onClick={() => setSelectedChat(conv.id)}
                  className={`w-full p-4 flex items-start gap-3 hover:bg-[#F5F6F8] transition-colors text-left ${
                    selectedChat === conv.id ? 'bg-[#F5F6F8]' : ''
                  }`}
                >
                  <div className="w-12 h-12 bg-[#2F6FED] rounded-full flex items-center justify-center text-white flex-shrink-0">
                    {conv.patientInitials}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-1">
                      <p className="truncate">{conv.patientName}</p>
                      <span className="text-xs text-muted-foreground">{conv.time}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <p className="text-sm text-muted-foreground truncate">{conv.lastMessage}</p>
                      {conv.unread && (
                        <span className="w-2 h-2 bg-[#2F6FED] rounded-full flex-shrink-0 ml-2" />
                      )}
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Chat Area */}
          <div className={`${selectedChat ? 'flex' : 'hidden md:flex'} flex-1 flex-col bg-white`}>
            {selectedChat && selectedConversation ? (
              <>
                {/* Chat Header */}
                <div className="p-4 border-b flex items-center gap-4">
                  <button
                    onClick={() => setSelectedChat(null)}
                    className="md:hidden"
                  >
                    <ArrowLeft className="w-6 h-6" />
                  </button>
                  <div className="w-10 h-10 bg-[#2F6FED] rounded-full flex items-center justify-center text-white">
                    {selectedConversation.patientInitials}
                  </div>
                  <div className="flex-1">
                    <p className="font-medium">{selectedConversation.patientName}</p>
                    <p className="text-xs text-muted-foreground">Active</p>
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => navigate(`/professional/patient/${selectedChat}`)}
                  >
                    View Profile
                  </Button>
                </div>

                {/* Messages */}
                <div className="flex-1 overflow-y-auto p-4 space-y-4">
                  {chatMessages[selectedChat]?.map((msg) => (
                    <div
                      key={msg.id}
                      className={`flex ${msg.sender === 'doctor' ? 'justify-end' : 'justify-start'}`}
                    >
                      <div
                        className={`max-w-[75%] rounded-2xl p-4 ${
                          msg.sender === 'doctor'
                            ? 'bg-[#2F6FED] text-white rounded-br-sm'
                            : 'bg-[#F5F6F8] text-gray-900 rounded-bl-sm'
                        }`}
                      >
                        <p className="mb-1">{msg.text}</p>
                        <p
                          className={`text-xs ${
                            msg.sender === 'doctor' ? 'text-blue-100' : 'text-muted-foreground'
                          }`}
                        >
                          {msg.time}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Message Input */}
                <div className="p-4 border-t">
                  <div className="flex items-center gap-3">
                    <div className="flex-1 bg-[#F5F6F8] rounded-full px-4 py-3 flex items-center gap-2">
                      <input
                        type="text"
                        placeholder="Type a message..."
                        value={messageText}
                        onChange={(e) => setMessageText(e.target.value)}
                        onKeyPress={handleKeyPress}
                        className="flex-1 bg-transparent outline-none"
                      />
                    </div>
                    <Button
                      size="icon"
                      onClick={handleSendMessage}
                      disabled={!messageText.trim()}
                      className="w-10 h-10 rounded-full bg-[#2F6FED] hover:bg-[#2563D8] text-white disabled:opacity-50"
                    >
                      <Send className="w-5 h-5" />
                    </Button>
                  </div>
                </div>
              </>
            ) : (
              <div className="flex-1 flex items-center justify-center">
                <div className="text-center">
                  <MessageCircle className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
                  <p className="text-muted-foreground">Select a conversation to start messaging</p>
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