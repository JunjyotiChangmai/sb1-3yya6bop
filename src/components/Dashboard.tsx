import React from 'react';
import { Thermometer, Droplets, Cloud, Wind, Sprout, AlertTriangle, TrendingUp } from 'lucide-react';
import { WeatherData, SoilData, FarmData } from '../types';

interface DashboardProps {
  weatherData: WeatherData;
  soilData: SoilData;
  farmData: FarmData;
  translations: any;
}

const Dashboard: React.FC<DashboardProps> = ({ weatherData, soilData, farmData, translations }) => {
  const mockPredictions = [
    { crop: 'Wheat', yield: 4.2, confidence: 92, trend: 'up' },
    { crop: 'Corn', yield: 8.7, confidence: 88, trend: 'up' },
    { crop: 'Soybeans', yield: 3.1, confidence: 85, trend: 'down' }
  ];

  const mockRecommendations = [
    { 
      type: 'irrigation', 
      priority: 'high', 
      title: translations.irrigationAdvice,
      description: 'Soil moisture is below optimal. Consider irrigation in next 24 hours.',
      action: 'Irrigate 0.5 inches'
    },
    {
      type: 'fertilization',
      priority: 'medium',
      title: translations.fertilizationPlan,
      description: 'Nitrogen levels are adequate. Consider phosphorus supplement.',
      action: 'Apply P2O5 fertilizer'
    }
  ];

  return (
    <div className="space-y-6">
      {/* Welcome Section */}
      <div className="bg-gradient-to-r from-green-500 to-blue-600 text-white rounded-xl p-6">
        <h2 className="text-2xl font-bold mb-2">{translations.welcomeBack}</h2>
        <p className="text-green-100 mb-4">Your farm is performing well this season!</p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-white/10 backdrop-blur rounded-lg p-4">
            <div className="text-2xl font-bold">{farmData.size}</div>
            <div className="text-sm text-green-100">{translations.acres}</div>
          </div>
          <div className="bg-white/10 backdrop-blur rounded-lg p-4">
            <div className="text-2xl font-bold">{farmData.crops.length}</div>
            <div className="text-sm text-green-100">Active Crops</div>
          </div>
          <div className="bg-white/10 backdrop-blur rounded-lg p-4">
            <div className="text-2xl font-bold">12%</div>
            <div className="text-sm text-green-100">Yield Increase</div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Current Weather Conditions */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold mb-4 flex items-center">
            <Cloud className="h-5 w-5 mr-2 text-blue-500" />
            {translations.currentConditions}
          </h3>
          <div className="grid grid-cols-2 gap-4">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-orange-100 rounded-lg">
                <Thermometer className="h-5 w-5 text-orange-600" />
              </div>
              <div>
                <div className="font-semibold">{Math.round(weatherData.temperature)}°C</div>
                <div className="text-sm text-gray-600">{translations.temperature}</div>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-blue-100 rounded-lg">
                <Droplets className="h-5 w-5 text-blue-600" />
              </div>
              <div>
                <div className="font-semibold">{Math.round(weatherData.humidity)}%</div>
                <div className="text-sm text-gray-600">{translations.humidity}</div>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-indigo-100 rounded-lg">
                <Cloud className="h-5 w-5 text-indigo-600" />
              </div>
              <div>
                <div className="font-semibold">{weatherData.rainfall}mm</div>
                <div className="text-sm text-gray-600">{translations.rainfall}</div>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-gray-100 rounded-lg">
                <Wind className="h-5 w-5 text-gray-600" />
              </div>
              <div>
                <div className="font-semibold">{weatherData.windSpeed} km/h</div>
                <div className="text-sm text-gray-600">{translations.windSpeed}</div>
              </div>
            </div>
          </div>
        </div>

        {/* Soil Conditions */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold mb-4 flex items-center">
            <Sprout className="h-5 w-5 mr-2 text-green-500" />
            Soil Health Status
          </h3>
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">{translations.soilMoisture}</span>
              <div className="flex items-center space-x-2">
                <div className="w-24 bg-gray-200 rounded-full h-2">
                  <div 
                    className="bg-blue-500 h-2 rounded-full" 
                    style={{ width: `${soilData.moisture}%` }}
                  />
                </div>
                <span className="text-sm font-medium">{Math.round(soilData.moisture)}%</span>
              </div>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">{translations.phLevel}</span>
              <div className="flex items-center space-x-2">
                <div className="w-24 bg-gray-200 rounded-full h-2">
                  <div 
                    className="bg-green-500 h-2 rounded-full" 
                    style={{ width: `${(soilData.ph / 14) * 100}%` }}
                  />
                </div>
                <span className="text-sm font-medium">{soilData.ph}</span>
              </div>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">{translations.nitrogen}</span>
              <div className="flex items-center space-x-2">
                <div className="w-24 bg-gray-200 rounded-full h-2">
                  <div 
                    className="bg-yellow-500 h-2 rounded-full" 
                    style={{ width: `${soilData.nitrogen}%` }}
                  />
                </div>
                <span className="text-sm font-medium">{Math.round(soilData.nitrogen)}%</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Predictions */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold mb-4 flex items-center">
            <TrendingUp className="h-5 w-5 mr-2 text-green-500" />
            {translations.recentPredictions}
          </h3>
          <div className="space-y-3">
            {mockPredictions.map((prediction, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div className="flex items-center space-x-3">
                  <Sprout className="h-8 w-8 text-green-500" />
                  <div>
                    <div className="font-medium">{prediction.crop}</div>
                    <div className="text-sm text-gray-600">{prediction.yield} {translations.tons}/acre</div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-sm font-medium text-green-600">{prediction.confidence}%</div>
                  <div className="text-xs text-gray-500">{translations.confidence}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Urgent Recommendations */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold mb-4 flex items-center">
            <AlertTriangle className="h-5 w-5 mr-2 text-orange-500" />
            {translations.urgentRecommendations}
          </h3>
          <div className="space-y-3">
            {mockRecommendations.map((rec, index) => (
              <div key={index} className={`p-3 rounded-lg border-l-4 ${
                rec.priority === 'high' ? 'border-red-500 bg-red-50' : 'border-yellow-500 bg-yellow-50'
              }`}>
                <div className="flex justify-between items-start mb-2">
                  <h4 className="font-medium text-gray-900">{rec.title}</h4>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                    rec.priority === 'high' ? 'bg-red-100 text-red-800' : 'bg-yellow-100 text-yellow-800'
                  }`}>
                    {rec.priority === 'high' ? translations.high : translations.medium}
                  </span>
                </div>
                <p className="text-sm text-gray-600 mb-2">{rec.description}</p>
                <div className="text-sm font-medium text-gray-900">{rec.action}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;