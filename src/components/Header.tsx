import React from 'react';
import { Sprout, BarChart3, Target, Activity, TrendingUp, Settings } from 'lucide-react';

interface HeaderProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  language: string;
  translations: any;
}

const Header: React.FC<HeaderProps> = ({ activeTab, setActiveTab, language, translations }) => {
  const navItems = [
    { id: 'dashboard', icon: BarChart3, label: translations.dashboard },
    { id: 'prediction', icon: Target, label: translations.prediction },
    { id: 'recommendations', icon: Sprout, label: translations.recommendations },
    { id: 'monitoring', icon: Activity, label: translations.monitoring },
    { id: 'analysis', icon: TrendingUp, label: translations.analysis },
    { id: 'settings', icon: Settings, label: translations.settings }
  ];

  return (
    <header className="bg-white shadow-sm border-b border-gray-200">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-green-100 rounded-lg">
              <Sprout className="h-8 w-8 text-green-600" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-gray-900">AgriAI Platform</h1>
              <p className="text-sm text-gray-500">Smart Farming Solutions</p>
            </div>
          </div>
          
          <nav className="hidden md:flex space-x-1">
            {navItems.map(({ id, icon: Icon, label }) => (
              <button
                key={id}
                onClick={() => setActiveTab(id)}
                className={`flex items-center space-x-2 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                  activeTab === id
                    ? 'bg-green-100 text-green-700 shadow-sm'
                    : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
                }`}
              >
                <Icon className="h-4 w-4" />
                <span>{label}</span>
              </button>
            ))}
          </nav>
          
          <div className="md:hidden">
            <select
              value={activeTab}
              onChange={(e) => setActiveTab(e.target.value)}
              className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-green-500 focus:border-transparent"
            >
              {navItems.map(({ id, label }) => (
                <option key={id} value={id}>{label}</option>
              ))}
            </select>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;