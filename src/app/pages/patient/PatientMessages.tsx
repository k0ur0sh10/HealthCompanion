import { useState } from 'react';
import { ArrowLeft, Send, Mic, Paperclip, Search, MessageCircle } from 'lucide-react';
import { useNavigate } from 'react-router';
import { MobileNav } from '../../components/MobileNav';
import { Button } from '../../components/ui/button';

interface Conversation {
  id: string;
  professionalName: string;
  professionalRole: string;
  professionalInitials: string;
  lastMessage: string;
  time: string;
  unread: boolean;
}

interface ChatMessage {
  id: string;
  sender: 'patient' | 'professional';
  text: string;
  time: string;
}

export default function PatientMessages() {
  const navigate = useNavigate();
  const [selectedChat, setSelectedChat] = useState<string | null>(null);
  const [messageText, setMessageText] = useState('');
  const [searchQuery, setSearchQuery] = useState('');

  const conversations: Conversation[] = [
    {
      id: '1',
      professionalName: 'Dr. Sarah Wilson',
      professionalRole: 'Endocrinologist',
      professionalInitials: 'SW',
      lastMessage: 'Don\'t forget to take your medication as prescribed.',
      time: '10:00 AM',
      unread: false,
    },
    {
      id: '2',
      professionalName: 'Nurse Sarah Ahmed',
      professionalRole: 'Registered Nurse',
      professionalInitials: 'SA',
      lastMessage: 'Your blood pressure readings look good this week.',
      time: 'Yesterday',
      unread: true,
    },
    {
      id: '3',
      professionalName: 'Dr. Michael Chen',
      professionalRole: 'Cardiologist',
      professionalInitials: 'MC',
      lastMessage: 'See you at your appointment next week.',
      time: '2 days ago',
      unread: false,
    },
    {
      id: '4',
      professionalName: 'Dr. Emily Rodriguez',
      professionalRole: 'General Practitioner',
      professionalInitials: 'ER',
      lastMessage: 'Your lab results are ready for review.',
      time: 'Feb 19',
      unread: true,
    },
  ];

  const [chatMessages, setChatMessages] = useState<{ [key: string]: ChatMessage[] }>({
    '1': [
      { id: '1', sender: 'professional', text: 'Hello David! How are you feeling today?', time: '9:30 AM' },
      { id: '2', sender: 'patient', text: 'Good morning, Dr. Wilson. I\'m feeling much better, thank you!', time: '9:45 AM' },
      { id: '3', sender: 'professional', text: 'That\'s great to hear. Don\'t forget to take your medication as prescribed.', time: '10:00 AM' },
      { id: '4', sender: 'patient', text: 'Will do. Thank you for the reminder!', time: '10:15 AM' },
    ],
    '2': [
      { id: '1', sender: 'professional', text: 'Hi David, I reviewed your recent blood pressure logs.', time: 'Yesterday 2:30 PM' },
      { id: '2', sender: 'professional', text: 'Your blood pressure readings look good this week.', time: 'Yesterday 2:31 PM' },
      { id: '3', sender: 'patient', text: 'Thank you! I\'ve been following the diet plan.', time: 'Yesterday 3:15 PM' },
    ],
    '3': [
      { id: '1', sender: 'professional', text: 'David, your recent ECG results came back normal.', time: '2 days ago' },
      { id: '2', sender: 'patient', text: 'That\'s great news! Thank you, Doctor.', time: '2 days ago' },
      { id: '3', sender: 'professional', text: 'See you at your appointment next week.', time: '2 days ago' },
    ],
    '4': [
      { id: '1', sender: 'professional', text: 'Hi David, your lab results are ready for review.', time: 'Feb 19' },
      { id: '2', sender: 'professional', text: 'Everything looks within normal range. Call if you have questions.', time: 'Feb 19' },
    ],
  });

  const handleSendMessage = () => {
    if (messageText.trim() && selectedChat) {
      const newMessage: ChatMessage = {
        id: Date.now().toString(),
        sender: 'patient',
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

  const filteredConversations = conversations.filter((conv) =>
    conv.professionalName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const selectedConversation = conversations.find((c) => c.id === selectedChat);
  const currentMessages = selectedChat ? chatMessages[selectedChat] || [] : [];

  // List View - Show all conversations
  if (!selectedChat) {
    return (
      <div className="min-h-screen bg-[#F5F6F8] pb-24 md:pb-8">
        {/* Header */}
        <div className="bg-[#2F6FED] text-white p-6">
          <div className="max-w-7xl mx-auto">
            <div className="flex items-center gap-4 mb-4">
              <button onClick={() => navigate('/patient/home')}>
                <ArrowLeft className="w-6 h-6" />
              </button>
              <h1 className="text-2xl">Messages</h1>
            </div>

            {/* Search Bar */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search healthcare providers..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full h-12 pl-10 pr-4 rounded-xl bg-white/20 text-white placeholder-blue-100 outline-none focus:bg-white/30 transition-colors"
              />
            </div>
          </div>
        </div>

        {/* Conversations List */}
        <div className="px-6 py-6 space-y-3 max-w-7xl mx-auto">
          {filteredConversations.length === 0 ? (
            <div className="text-center py-12">
              <MessageCircle className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
              <p className="text-muted-foreground">No conversations found</p>
            </div>
          ) : (
            filteredConversations.map((conv) => (
              <div
                key={conv.id}
                onClick={() => setSelectedChat(conv.id)}
                className="bg-white rounded-2xl p-5 shadow-sm cursor-pointer hover:shadow-md transition-shadow"
              >
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-[#2F6FED] rounded-full flex items-center justify-center text-white flex-shrink-0">
                    {conv.professionalInitials}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between mb-1">
                      <div>
                        <p className="font-medium mb-0.5">{conv.professionalName}</p>
                        <p className="text-sm text-muted-foreground">{conv.professionalRole}</p>
                      </div>
                      <span className="text-xs text-muted-foreground whitespace-nowrap ml-2">
                        {conv.time}
                      </span>
                    </div>
                    <div className="flex items-center justify-between gap-2">
                      <p className="text-sm text-muted-foreground line-clamp-1 flex-1">
                        {conv.lastMessage}
                      </p>
                      {conv.unread && (
                        <div className="w-2 h-2 bg-[#2F6FED] rounded-full flex-shrink-0" />
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        <MobileNav />
      </div>
    );
  }

  // Chat View - Show conversation with selected professional
  return (
    <div className="min-h-screen bg-[#F5F6F8] flex flex-col pb-24 md:pb-8">
      {/* Header */}
      <div className="bg-[#2F6FED] text-white p-6">
        <div className="flex items-center justify-between max-w-7xl mx-auto">
          <div className="flex items-center gap-4">
            <button onClick={() => setSelectedChat(null)}>
              <ArrowLeft className="w-6 h-6" />
            </button>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center text-sm">
                {selectedConversation?.professionalInitials}
              </div>
              <div>
                <h1 className="text-xl">{selectedConversation?.professionalName}</h1>
                <p className="text-sm text-blue-100">{selectedConversation?.professionalRole}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 px-6 py-6 space-y-4 overflow-y-auto max-w-7xl mx-auto w-full">
        {currentMessages.map((msg) => (
          <div
            key={msg.id}
            className={`flex ${msg.sender === 'patient' ? 'justify-end' : 'justify-start'}`}
          >
            <div
              className={`max-w-[75%] md:max-w-[60%] rounded-2xl p-4 ${
                msg.sender === 'patient'
                  ? 'bg-[#2F6FED] text-white rounded-br-sm'
                  : 'bg-white text-gray-900 rounded-bl-sm shadow-sm'
              }`}
            >
              <p className="mb-1">{msg.text}</p>
              <p
                className={`text-xs ${
                  msg.sender === 'patient' ? 'text-blue-100' : 'text-muted-foreground'
                }`}
              >
                {msg.time}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Message Input */}
      <div className="bg-white border-t p-4 mb-16 md:mb-0">
        <div className="flex items-center gap-3 max-w-7xl mx-auto">
          <button className="w-10 h-10 flex items-center justify-center text-muted-foreground hover:text-[#2F6FED] transition-colors">
            <Paperclip className="w-5 h-5" />
          </button>
          <div className="flex-1 bg-[#F5F6F8] rounded-full px-4 py-3 flex items-center gap-2">
            <input
              type="text"
              placeholder="Type a message..."
              value={messageText}
              onChange={(e) => setMessageText(e.target.value)}
              onKeyPress={handleKeyPress}
              className="flex-1 bg-transparent outline-none"
            />
            <button className="text-muted-foreground hover:text-[#2F6FED] transition-colors">
              <Mic className="w-5 h-5" />
            </button>
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
        <div className="flex items-center justify-center gap-2 mt-2">
          <div className="w-2 h-2 bg-[#2ECC71] rounded-full" />
          <span className="text-xs text-muted-foreground">
            Messages are encrypted and secure
          </span>
        </div>
      </div>

      <MobileNav />
    </div>
  );
}
