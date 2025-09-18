import React from 'react';
import { Droplets, Beaker, Bug, Lightbulb, AlertTriangle, Clock, CheckCircle } from 'lucide-react';
import { WeatherData, SoilData, FarmData, Recommendation } from '../types';

interface RecommendationsProps {
  weatherData: WeatherData;
  soilData: SoilData;
  farmData: FarmData;
  translations: any;
}

const Recommendations: React.FC<RecommendationsProps> = ({ weatherData, soilData, farmData, translations }) => {
  
  const generateRecommendations = (): Recommendation[] => {
    const recommendations: Recommendation[] = [];

    // Irrigation recommendations
    if (soilData.moisture < 40) {
      recommendations.push({
        type: 'irrigation',
        priority: 'high',
        title: 'Immediate Irrigation Required',
        description: `Soil moisture is at ${Math.round(soilData.moisture)}%, which is below the optimal range for most crops.`,
        action: 'Apply 0.5-0.75 inches of water uniformly across the field',
        timing: 'Within 24 hours'
      });
    } else if (soilData.moisture < 50) {
      recommendations.push({
        type: 'irrigation',
        priority: 'medium',
        title: 'Monitor Irrigation Needs',
        description: 'Soil moisture is approaching critical levels. Monitor closely.',
        action: 'Prepare irrigation system and check weather forecast',
        timing: 'Within 48 hours'
      });
    }

    // Fertilization recommendations
    if (soilData.nitrogen < 70) {
      recommendations.push({
        type: 'fertilization',
        priority: 'high',
        title: 'Nitrogen Deficiency Detected',
        description: `Nitrogen levels at ${Math.round(soilData.nitrogen)}% of optimal. This may limit crop growth.`,
        action: 'Apply nitrogen fertilizer (urea or ammonium nitrate)',
        timing: 'Before next growth phase'
      });
    }

    if (soilData.phosphorus < 60) {
      recommendations.push({
        type: 'fertilization',
        priority: 'medium',
        title: 'Phosphorus Supplement Needed',
        description: `Phosphorus levels are at ${Math.round(soilData.phosphorus)}%. Consider supplementation.`,
        action: 'Apply phosphate fertilizer (DAP or MAP)',
        timing: 'Within 2 weeks'
      });
    }

    // Pest control based on weather conditions
    if (weatherData.humidity > 70 && weatherData.temperature > 20) {
      recommendations.push({
        type: 'pestControl',
        priority: 'high',
        title: 'Fungal Disease Risk Alert',
        description: 'High humidity and warm temperatures create ideal conditions for fungal diseases.',
        action: 'Apply preventive fungicide and ensure good air circulation',
        timing: 'Immediate preventive action'
      });
    }

    if (weatherData.temperature > 25 && soilData.moisture > 60) {
      recommendations.push({
        type: 'pestControl',
        priority: 'medium',
        title: 'Insect Activity Monitoring',
        description: 'Warm, moist conditions may increase insect pest activity.',
        action: 'Increase scouting frequency and prepare IPM strategies',
        timing: 'Ongoing monitoring'
      });
    }

    // General farming tips
    recommendations.push({
      type: 'general',
      priority: 'low',
      title: 'Soil pH Optimization',
      description: `Current pH is ${soilData.ph}. Most crops prefer 6.0-7.0 range.`,
      action: soilData.ph < 6.0 ? 'Consider lime application' : 'pH levels are optimal',
      timing: 'During off-season'
    });

    return recommendations;
  };

  const recommendations = generateRecommendations();

  const getIconForType = (type: string) => {
    switch (type) {
      case 'irrigation': return Droplets;
      case 'fertilization': return Beaker;
      case 'pestControl': return Bug;
      default: return Lightbulb;
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'border-red-500 bg-red-50';
      case 'medium': return 'border-yellow-500 bg-yellow-50';
      default: return 'border-blue-500 bg-blue-50';
    }
  };

  const getPriorityBadgeColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'bg-red-100 text-red-800';
      case 'medium': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-blue-100 text-blue-800';
    }
  };

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <h2 className="text-2xl font-bold mb-6 flex items-center">
          <Lightbulb className="h-6 w-6 mr-3 text-green-500" />
          AI-Powered Recommendations
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
          <div className="bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-lg p-4">
            <div className="text-2xl font-bold">{recommendations.filter(r => r.priority === 'high').length}</div>
            <div className="text-sm text-blue-100">High Priority Actions</div>
          </div>
          <div className="bg-gradient-to-r from-yellow-500 to-yellow-600 text-white rounded-lg p-4">
            <div className="text-2xl font-bold">{recommendations.filter(r => r.priority === 'medium').length}</div>
            <div className="text-sm text-yellow-100">Medium Priority Actions</div>
          </div>
          <div className="bg-gradient-to-r from-green-500 to-green-600 text-white rounded-lg p-4">
            <div className="text-2xl font-bold">{recommendations.length}</div>
            <div className="text-sm text-green-100">Total Recommendations</div>
          </div>
        </div>

        <div className="space-y-4">
          {recommendations.map((rec, index) => {
            const Icon = getIconForType(rec.type);
            return (
              <div
                key={index}
                className={`rounded-xl border-l-4 p-6 transition-all duration-200 hover:shadow-md ${getPriorityColor(rec.priority)}`}
              >
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center space-x-3">
                    <div className={`p-2 rounded-lg ${rec.type === 'irrigation' ? 'bg-blue-100' : 
                      rec.type === 'fertilization' ? 'bg-green-100' : 
                      rec.type === 'pestControl' ? 'bg-red-100' : 'bg-gray-100'}`}>
                      <Icon className={`h-5 w-5 ${rec.type === 'irrigation' ? 'text-blue-600' : 
                        rec.type === 'fertilization' ? 'text-green-600' : 
                        rec.type === 'pestControl' ? 'text-red-600' : 'text-gray-600'}`} />
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900">{rec.title}</h3>
                  </div>
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${getPriorityBadgeColor(rec.priority)}`}>
                    {rec.priority.charAt(0).toUpperCase() + rec.priority.slice(1)} Priority
                  </span>
                </div>
                
                <p className="text-gray-700 mb-4">{rec.description}</p>
                
                <div className="space-y-2">
                  <div className="flex items-center space-x-2">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    <span className="font-medium text-gray-900">Recommended Action:</span>
                  </div>
                  <p className="text-gray-800 ml-6">{rec.action}</p>
                  
                  <div className="flex items-center space-x-2 mt-2">
                    <Clock className="h-4 w-4 text-orange-500" />
                    <span className="font-medium text-gray-900">Timing:</span>
                    <span className="text-gray-800">{rec.timing}</span>
                  </div>
                </div>

                {rec.priority === 'high' && (
                  <div className="mt-4 p-3 bg-white/60 rounded-lg border border-red-200">
                    <div className="flex items-center space-x-2">
                      <AlertTriangle className="h-4 w-4 text-red-500" />
                      <span className="text-sm font-medium text-red-800">
                        Immediate attention required to prevent yield loss
                      </span>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {recommendations.length === 0 && (
          <div className="text-center py-8">
            <CheckCircle className="h-12 w-12 text-green-500 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-900 mb-2">All Systems Optimal!</h3>
            <p className="text-gray-600">Your farm conditions are within optimal ranges. Keep monitoring for any changes.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Recommendations;