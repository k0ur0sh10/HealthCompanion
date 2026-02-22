import { useNavigate, useLocation } from 'react-router';
import { Home, Users, MessageCircle, BarChart3, User } from 'lucide-react';

export function ProfessionalMobileNav() {
  const navigate = useNavigate();
  const location = useLocation();

  const navItems = [
    { icon: Home, label: 'Home', path: '/professional/home' },
    { icon: Users, label: 'Patients', path: '/professional/dashboard' },
    { icon: BarChart3, label: 'Analytics', path: '/professional/analytics' },
    { icon: MessageCircle, label: 'Messages', path: '/professional/messages' },
    { icon: User, label: 'Profile', path: '/professional/settings' },
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 px-6 py-3 safe-area-inset-bottom md:hidden">
      <div className="flex justify-between items-center">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = location.pathname === item.path;
          return (
            <button
              key={item.path}
              onClick={() => navigate(item.path)}
              className="flex flex-col items-center gap-1 flex-1"
            >
              <Icon
                className={`w-6 h-6 ${
                  isActive ? 'text-[#2F6FED]' : 'text-gray-400'
                }`}
              />
              <span
                className={`text-xs ${
                  isActive ? 'text-[#2F6FED]' : 'text-gray-400'
                }`}
              >
                {item.label}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
