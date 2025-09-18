import React, { useState } from 'react';
import { Settings as SettingsIcon, Globe, Car as Farm, User, Save, MapPin } from 'lucide-react';
import { Language, translations } from '../utils/translations';
import { FarmData } from '../types';

interface SettingsProps {
  language: Language;
  setLanguage: (lang: Language) => void;
  farmData: FarmData;
  setFarmData: (data: FarmData) => void;
  translations: any;
}

const Settings: React.FC<SettingsProps> = ({ 
  language, 
  setLanguage, 
  farmData, 
  setFarmData, 
  translations: t 
}) => {
  const [editedFarmData, setEditedFarmData] = useState(farmData);
  const [activeSection, setActiveSection] = useState('general');

  const handleSave = () => {
    setFarmData(editedFarmData);
    // Simulate save animation or notification
    alert('Settings saved successfully!');
  };

  const languages = [
    { code: 'en' as Language, name: 'English', flag: '🇺🇸' },
    { code: 'es' as Language, name: 'Español', flag: '🇪🇸' },
    { code: 'hi' as Language, name: 'हिन्दी', flag: '🇮🇳' }
  ];

  const sections = [
    { id: 'general', name: 'General', icon: SettingsIcon },
    { id: 'farm', name: 'Farm Profile', icon: Farm },
    { id: 'language', name: 'Language', icon: Globe },
    { id: 'notifications', name: 'Notifications', icon: User }
  ];

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-xl shadow-sm border border-gray-200">
        <div className="p-6 border-b border-gray-200">
          <h2 className="text-2xl font-bold flex items-center">
            <SettingsIcon className="h-6 w-6 mr-3 text-green-500" />
            {t.settings}
          </h2>
        </div>

        <div className="flex">
          {/* Sidebar */}
          <div className="w-64 border-r border-gray-200 p-4">
            <nav className="space-y-2">
              {sections.map(({ id, name, icon: Icon }) => (
                <button
                  key={id}
                  onClick={() => setActiveSection(id)}
                  className={`w-full text-left flex items-center space-x-3 px-3 py-2 rounded-lg transition-colors duration-200 ${
                    activeSection === id
                      ? 'bg-green-100 text-green-700 font-medium'
                      : 'text-gray-600 hover:bg-gray-100'
                  }`}
                >
                  <Icon className="h-4 w-4" />
                  <span>{name}</span>
                </button>
              ))}
            </nav>
          </div>

          {/* Main Content */}
          <div className="flex-1 p-6">
            {activeSection === 'general' && (
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold mb-4">General Settings</h3>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Data Update Frequency
                      </label>
                      <select className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-green-500 focus:border-transparent">
                        <option value="30">Every 30 seconds</option>
                        <option value="60">Every minute</option>
                        <option value="300">Every 5 minutes</option>
                        <option value="900">Every 15 minutes</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Temperature Unit
                      </label>
                      <div className="flex space-x-4">
                        <label className="flex items-center">
                          <input type="radio" name="temp" value="celsius" defaultChecked className="mr-2" />
                          Celsius (°C)
                        </label>
                        <label className="flex items-center">
                          <input type="radio" name="temp" value="fahrenheit" className="mr-2" />
                          Fahrenheit (°F)
                        </label>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeSection === 'farm' && (
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold mb-4 flex items-center">
                    <Farm className="h-5 w-5 mr-2 text-green-600" />
                    Farm Profile
                  </h3>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Farm Name
                      </label>
                      <input
                        type="text"
                        value={editedFarmData.name}
                        onChange={(e) => setEditedFarmData({...editedFarmData, name: e.target.value})}
                        className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-green-500 focus:border-transparent"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Location
                      </label>
                      <div className="relative">
                        <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                        <input
                          type="text"
                          value={editedFarmData.location}
                          onChange={(e) => setEditedFarmData({...editedFarmData, location: e.target.value})}
                          className="w-full pl-10 border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-green-500 focus:border-transparent"
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Farm Size (acres)
                      </label>
                      <input
                        type="number"
                        value={editedFarmData.size}
                        onChange={(e) => setEditedFarmData({...editedFarmData, size: parseFloat(e.target.value)})}
                        className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-green-500 focus:border-transparent"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Primary Crops
                      </label>
                      <div className="space-y-2">
                        {['Wheat', 'Corn', 'Soybeans', 'Rice', 'Barley', 'Oats'].map(crop => (
                          <label key={crop} className="flex items-center">
                            <input
                              type="checkbox"
                              checked={editedFarmData.crops.includes(crop)}
                              onChange={(e) => {
                                if (e.target.checked) {
                                  setEditedFarmData({
                                    ...editedFarmData,
                                    crops: [...editedFarmData.crops, crop]
                                  });
                                } else {
                                  setEditedFarmData({
                                    ...editedFarmData,
                                    crops: editedFarmData.crops.filter(c => c !== crop)
                                  });
                                }
                              }}
                              className="mr-2 text-green-600 focus:ring-green-500"
                            />
                            {crop}
                          </label>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeSection === 'language' && (
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold mb-4 flex items-center">
                    <Globe className="h-5 w-5 mr-2 text-blue-600" />
                    Language Preferences
                  </h3>
                  <div className="space-y-3">
                    {languages.map(({ code, name, flag }) => (
                      <label key={code} className="flex items-center p-3 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer">
                        <input
                          type="radio"
                          name="language"
                          value={code}
                          checked={language === code}
                          onChange={() => setLanguage(code)}
                          className="mr-3 text-green-600 focus:ring-green-500"
                        />
                        <span className="text-2xl mr-3">{flag}</span>
                        <div>
                          <div className="font-medium">{name}</div>
                          <div className="text-sm text-gray-500">
                            {code === 'en' && 'English - United States'}
                            {code === 'es' && 'Spanish - España'}
                            {code === 'hi' && 'Hindi - भारत'}
                          </div>
                        </div>
                        {language === code && (
                          <div className="ml-auto text-green-600">✓</div>
                        )}
                      </label>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {activeSection === 'notifications' && (
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold mb-4">Notification Settings</h3>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                      <div>
                        <div className="font-medium">Weather Alerts</div>
                        <div className="text-sm text-gray-600">Get notified about severe weather conditions</div>
                      </div>
                      <input type="checkbox" defaultChecked className="text-green-600 focus:ring-green-500" />
                    </div>
                    <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                      <div>
                        <div className="font-medium">Irrigation Reminders</div>
                        <div className="text-sm text-gray-600">Alerts when soil moisture is low</div>
                      </div>
                      <input type="checkbox" defaultChecked className="text-green-600 focus:ring-green-500" />
                    </div>
                    <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                      <div>
                        <div className="font-medium">Pest Control Alerts</div>
                        <div className="text-sm text-gray-600">Early warning for pest and disease risks</div>
                      </div>
                      <input type="checkbox" defaultChecked className="text-green-600 focus:ring-green-500" />
                    </div>
                    <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                      <div>
                        <div className="font-medium">Harvest Predictions</div>
                        <div className="text-sm text-gray-600">Updates on yield predictions and harvest timing</div>
                      </div>
                      <input type="checkbox" defaultChecked className="text-green-600 focus:ring-green-500" />
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Save Button */}
            <div className="mt-8 pt-6 border-t border-gray-200">
              <div className="flex justify-end space-x-3">
                <button
                  onClick={() => {
                    setEditedFarmData(farmData);
                    alert('Changes discarded');
                  }}
                  className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors duration-200"
                >
                  {t.cancel}
                </button>
                <button
                  onClick={handleSave}
                  className="px-6 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors duration-200 flex items-center space-x-2"
                >
                  <Save className="h-4 w-4" />
                  <span>{t.save}</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;