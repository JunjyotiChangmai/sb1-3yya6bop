import React, { useState } from 'react';
import { Target, Brain, TrendingUp, Calendar, MapPin } from 'lucide-react';
import { WeatherData, SoilData, CropPrediction as CropPredictionType } from '../types';

interface CropPredictionProps {
  weatherData: WeatherData;
  soilData: SoilData;
  translations: any;
}

const CropPrediction: React.FC<CropPredictionProps> = ({ weatherData, soilData, translations }) => {
  const [selectedCrop, setSelectedCrop] = useState('');
  const [plantingDate, setPlantingDate] = useState('');
  const [fieldSize, setFieldSize] = useState('');
  const [prediction, setPrediction] = useState<CropPredictionType | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const crops = ['Wheat', 'Corn', 'Soybeans', 'Rice', 'Barley', 'Oats'];

  const simulateMLPrediction = (): CropPredictionType => {
    // Simulate complex ML model calculations
    const baseYields = {
      'Wheat': 4.5,
      'Corn': 9.2,
      'Soybeans': 3.3,
      'Rice': 7.8,
      'Barley': 3.8,
      'Oats': 2.9
    };

    const baseYield = baseYields[selectedCrop as keyof typeof baseYields] || 4.0;
    
    // Weather impact calculation
    const tempOptimal = selectedCrop === 'Rice' ? 28 : 22;
    const tempDiff = Math.abs(weatherData.temperature - tempOptimal);
    const weatherImpact = Math.max(0.7, 1 - (tempDiff * 0.05));
    
    // Soil impact calculation
    const soilHealthScore = (soilData.nitrogen + soilData.phosphorus + soilData.potassium) / 300;
    const moistureOptimal = selectedCrop === 'Rice' ? 80 : 60;
    const moistureImpact = Math.max(0.7, 1 - Math.abs(soilData.moisture - moistureOptimal) * 0.01);
    const soilImpact = (soilHealthScore + moistureImpact) / 2;
    
    // Farming practices impact (simulated)
    const practicesImpact = 0.9 + Math.random() * 0.2;
    
    const finalYield = baseYield * weatherImpact * soilImpact * practicesImpact;
    const confidence = Math.min(95, Math.max(70, 85 + (soilHealthScore * 10) - (tempDiff * 2)));

    return {
      crop: selectedCrop,
      expectedYield: parseFloat(finalYield.toFixed(1)),
      confidence: Math.round(confidence),
      factors: {
        weather: Math.round(weatherImpact * 100),
        soil: Math.round(soilImpact * 100),
        practices: Math.round(practicesImpact * 100)
      }
    };
  };

  const handlePredict = async () => {
    if (!selectedCrop || !plantingDate || !fieldSize) return;
    
    setIsLoading(true);
    
    // Simulate API call delay
    setTimeout(() => {
      const result = simulateMLPrediction();
      setPrediction(result);
      setIsLoading(false);
    }, 2000);
  };

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <h2 className="text-2xl font-bold mb-6 flex items-center">
          <Target className="h-6 w-6 mr-3 text-green-500" />
          {translations.predictYield}
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              {translations.selectCrop}
            </label>
            <select
              value={selectedCrop}
              onChange={(e) => setSelectedCrop(e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-green-500 focus:border-transparent"
            >
              <option value="">Select a crop...</option>
              {crops.map(crop => (
                <option key={crop} value={crop}>{crop}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              {translations.plantingDate}
            </label>
            <input
              type="date"
              value={plantingDate}
              onChange={(e) => setPlantingDate(e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-green-500 focus:border-transparent"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              {translations.fieldSize}
            </label>
            <input
              type="number"
              value={fieldSize}
              onChange={(e) => setFieldSize(e.target.value)}
              placeholder="0"
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-green-500 focus:border-transparent"
            />
          </div>

          <div className="flex items-end">
            <button
              onClick={handlePredict}
              disabled={!selectedCrop || !plantingDate || !fieldSize || isLoading}
              className="w-full bg-green-500 text-white px-4 py-2 rounded-lg font-medium hover:bg-green-600 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors duration-200"
            >
              {isLoading ? translations.loading : translations.predictButton}
            </button>
          </div>
        </div>

        {isLoading && (
          <div className="text-center py-8">
            <div className="inline-flex items-center space-x-2">
              <Brain className="h-6 w-6 text-green-500 animate-pulse" />
              <span className="text-lg text-gray-600">AI is analyzing your data...</span>
            </div>
            <div className="mt-4 space-y-2">
              <div className="text-sm text-gray-500">Processing weather patterns...</div>
              <div className="text-sm text-gray-500">Analyzing soil conditions...</div>
              <div className="text-sm text-gray-500">Calculating yield predictions...</div>
            </div>
          </div>
        )}

        {prediction && !isLoading && (
          <div className="bg-gradient-to-r from-green-50 to-blue-50 rounded-xl p-6 border border-green-200">
            <h3 className="text-xl font-semibold mb-4 flex items-center">
              <TrendingUp className="h-5 w-5 mr-2 text-green-600" />
              {translations.predictionResults}
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-white rounded-lg p-4 shadow-sm">
                <div className="text-3xl font-bold text-green-600">{prediction.expectedYield}</div>
                <div className="text-sm text-gray-600">{translations.tons} per acre</div>
                <div className="text-lg font-medium text-gray-900 mt-1">
                  {translations.expectedYield}
                </div>
              </div>
              
              <div className="bg-white rounded-lg p-4 shadow-sm">
                <div className="text-3xl font-bold text-blue-600">{prediction.confidence}%</div>
                <div className="text-sm text-gray-600">Model accuracy</div>
                <div className="text-lg font-medium text-gray-900 mt-1">
                  {translations.confidence}
                </div>
              </div>
              
              <div className="bg-white rounded-lg p-4 shadow-sm">
                <div className="text-3xl font-bold text-purple-600">
                  {Math.round(prediction.expectedYield * parseFloat(fieldSize || '0'))}
                </div>
                <div className="text-sm text-gray-600">{translations.tons} total</div>
                <div className="text-lg font-medium text-gray-900 mt-1">Total Yield</div>
              </div>
            </div>

            <div className="mt-6">
              <h4 className="font-semibold mb-3">Contributing Factors:</h4>
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Weather Conditions</span>
                  <div className="flex items-center space-x-2">
                    <div className="w-32 bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-orange-500 h-2 rounded-full" 
                        style={{ width: `${prediction.factors.weather}%` }}
                      />
                    </div>
                    <span className="text-sm font-medium">{prediction.factors.weather}%</span>
                  </div>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Soil Health</span>
                  <div className="flex items-center space-x-2">
                    <div className="w-32 bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-green-500 h-2 rounded-full" 
                        style={{ width: `${prediction.factors.soil}%` }}
                      />
                    </div>
                    <span className="text-sm font-medium">{prediction.factors.soil}%</span>
                  </div>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Farming Practices</span>
                  <div className="flex items-center space-x-2">
                    <div className="w-32 bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-blue-500 h-2 rounded-full" 
                        style={{ width: `${prediction.factors.practices}%` }}
                      />
                    </div>
                    <span className="text-sm font-medium">{prediction.factors.practices}%</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CropPrediction;