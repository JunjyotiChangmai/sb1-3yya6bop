import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import Dashboard from './components/Dashboard';
import CropPrediction from './components/CropPrediction';
import Recommendations from './components/Recommendations';
import DataMonitoring from './components/DataMonitoring';
import HistoricalAnalysis from './components/HistoricalAnalysis';
import Settings from './components/Settings';
import { Language, translations } from './utils/translations';
import { FarmData, WeatherData, SoilData } from './types';

function App() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [language, setLanguage] = useState<Language>('en');
  const [farmData, setFarmData] = useState<FarmData>({
    name: 'Green Valley Farm',
    location: 'California, USA',
    size: 150,
    crops: ['Wheat', 'Corn', 'Soybeans']
  });

  const [weatherData, setWeatherData] = useState<WeatherData>({
    temperature: 24,
    humidity: 65,
    rainfall: 12,
    windSpeed: 8,
    forecast: [
      { day: 'Today', temp: 24, condition: 'Partly Cloudy', rain: 0 },
      { day: 'Tomorrow', temp: 26, condition: 'Sunny', rain: 0 },
      { day: 'Day 3', temp: 22, condition: 'Light Rain', rain: 5 },
      { day: 'Day 4', temp: 25, condition: 'Sunny', rain: 0 },
      { day: 'Day 5', temp: 23, condition: 'Cloudy', rain: 2 }
    ]
  });

  const [soilData, setSoilData] = useState<SoilData>({
    moisture: 42,
    ph: 6.8,
    nitrogen: 85,
    phosphorus: 72,
    potassium: 90,
    organicMatter: 3.2
  });

  // Simulate real-time data updates
  useEffect(() => {
    const interval = setInterval(() => {
      setWeatherData(prev => ({
        ...prev,
        temperature: prev.temperature + (Math.random() - 0.5) * 2,
        humidity: Math.max(30, Math.min(90, prev.humidity + (Math.random() - 0.5) * 10))
      }));

      setSoilData(prev => ({
        ...prev,
        moisture: Math.max(20, Math.min(80, prev.moisture + (Math.random() - 0.5) * 5))
      }));
    }, 30000); // Update every 30 seconds

    return () => clearInterval(interval);
  }, []);

  const t = translations[language];

  return (
    <div className="min-h-screen bg-gray-50">
      <Header 
        activeTab={activeTab} 
        setActiveTab={setActiveTab}
        language={language}
        translations={t}
      />
      
      <main className="container mx-auto px-4 py-6">
        {activeTab === 'dashboard' && (
          <Dashboard 
            weatherData={weatherData}
            soilData={soilData}
            farmData={farmData}
            translations={t}
          />
        )}
        {activeTab === 'prediction' && (
          <CropPrediction 
            weatherData={weatherData}
            soilData={soilData}
            translations={t}
          />
        )}
        {activeTab === 'recommendations' && (
          <Recommendations 
            weatherData={weatherData}
            soilData={soilData}
            farmData={farmData}
            translations={t}
          />
        )}
        {activeTab === 'monitoring' && (
          <DataMonitoring 
            weatherData={weatherData}
            soilData={soilData}
            translations={t}
          />
        )}
        {activeTab === 'analysis' && (
          <HistoricalAnalysis translations={t} />
        )}
        {activeTab === 'settings' && (
          <Settings 
            language={language}
            setLanguage={setLanguage}
            farmData={farmData}
            setFarmData={setFarmData}
            translations={t}
          />
        )}
      </main>
    </div>
  );
}

export default App;