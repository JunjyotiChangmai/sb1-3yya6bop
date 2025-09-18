import React, { useState } from 'react';
import { Activity, Thermometer, Droplets, Cloud, Wind, Zap, MapPin } from 'lucide-react';
import { WeatherData, SoilData } from '../types';

interface DataMonitoringProps {
  weatherData: WeatherData;
  soilData: SoilData;
  translations: any;
}

const DataMonitoring: React.FC<DataMonitoringProps> = ({ weatherData, soilData, translations }) => {
  const [selectedMetric, setSelectedMetric] = useState('temperature');

  const generateTimeSeriesData = (baseValue: number, variance: number) => {
    const data = [];
    for (let i = 0; i < 24; i++) {
      data.push({
        time: `${i.toString().padStart(2, '0')}:00`,
        value: baseValue + (Math.random() - 0.5) * variance
      });
    }
    return data;
  };

  const temperatureData = generateTimeSeriesData(weatherData.temperature, 6);
  const humidityData = generateTimeSeriesData(weatherData.humidity, 20);
  const moistureData = generateTimeSeriesData(soilData.moisture, 10);

  const getDataForMetric = (metric: string) => {
    switch (metric) {
      case 'temperature': return temperatureData;
      case 'humidity': return humidityData;
      case 'moisture': return moistureData;
      default: return temperatureData;
    }
  };

  const getMetricInfo = (metric: string) => {
    switch (metric) {
      case 'temperature':
        return { label: translations.temperature, unit: '°C', color: 'bg-orange-500', icon: Thermometer };
      case 'humidity':
        return { label: translations.humidity, unit: '%', color: 'bg-blue-500', icon: Droplets };
      case 'moisture':
        return { label: translations.soilMoisture, unit: '%', color: 'bg-green-500', icon: Droplets };
      default:
        return { label: translations.temperature, unit: '°C', color: 'bg-orange-500', icon: Thermometer };
    }
  };

  const chartData = getDataForMetric(selectedMetric);
  const metricInfo = getMetricInfo(selectedMetric);
  const Icon = metricInfo.icon;

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <h2 className="text-2xl font-bold mb-6 flex items-center">
          <Activity className="h-6 w-6 mr-3 text-green-500" />
          Real-Time Data Monitoring
        </h2>

        {/* Current Readings Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <div 
            className={`p-4 rounded-lg border-2 transition-all duration-200 cursor-pointer ${
              selectedMetric === 'temperature' ? 'border-orange-500 bg-orange-50' : 'border-gray-200 hover:border-orange-300'
            }`}
            onClick={() => setSelectedMetric('temperature')}
          >
            <div className="flex items-center justify-between mb-2">
              <Thermometer className="h-5 w-5 text-orange-500" />
              <div className="text-2xl font-bold text-orange-600">
                {Math.round(weatherData.temperature)}°C
              </div>
            </div>
            <div className="text-sm text-gray-600">{translations.temperature}</div>
            <div className="text-xs text-gray-500 mt-1">Live data from sensors</div>
          </div>

          <div 
            className={`p-4 rounded-lg border-2 transition-all duration-200 cursor-pointer ${
              selectedMetric === 'humidity' ? 'border-blue-500 bg-blue-50' : 'border-gray-200 hover:border-blue-300'
            }`}
            onClick={() => setSelectedMetric('humidity')}
          >
            <div className="flex items-center justify-between mb-2">
              <Droplets className="h-5 w-5 text-blue-500" />
              <div className="text-2xl font-bold text-blue-600">
                {Math.round(weatherData.humidity)}%
              </div>
            </div>
            <div className="text-sm text-gray-600">{translations.humidity}</div>
            <div className="text-xs text-gray-500 mt-1">Atmospheric humidity</div>
          </div>

          <div 
            className={`p-4 rounded-lg border-2 transition-all duration-200 cursor-pointer ${
              selectedMetric === 'moisture' ? 'border-green-500 bg-green-50' : 'border-gray-200 hover:border-green-300'
            }`}
            onClick={() => setSelectedMetric('moisture')}
          >
            <div className="flex items-center justify-between mb-2">
              <Droplets className="h-5 w-5 text-green-500" />
              <div className="text-2xl font-bold text-green-600">
                {Math.round(soilData.moisture)}%
              </div>
            </div>
            <div className="text-sm text-gray-600">{translations.soilMoisture}</div>
            <div className="text-xs text-gray-500 mt-1">IoT soil sensors</div>
          </div>

          <div className="p-4 rounded-lg border-2 border-gray-200">
            <div className="flex items-center justify-between mb-2">
              <Wind className="h-5 w-5 text-gray-500" />
              <div className="text-2xl font-bold text-gray-600">
                {weatherData.windSpeed} km/h
              </div>
            </div>
            <div className="text-sm text-gray-600">{translations.windSpeed}</div>
            <div className="text-xs text-gray-500 mt-1">Weather station data</div>
          </div>
        </div>

        {/* Chart Section */}
        <div className="bg-gray-50 rounded-xl p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-3">
              <div className={`p-2 rounded-lg ${metricInfo.color.replace('bg-', 'bg-').replace('-500', '-100')}`}>
                <Icon className={`h-5 w-5 ${metricInfo.color.replace('bg-', 'text-')}`} />
              </div>
              <div>
                <h3 className="text-lg font-semibold">{metricInfo.label} - 24 Hour Trend</h3>
                <p className="text-sm text-gray-600">Click on cards above to switch metrics</p>
              </div>
            </div>
            <div className="flex items-center space-x-2 text-sm text-gray-500">
              <Zap className="h-4 w-4" />
              <span>Live updates every 30s</span>
            </div>
          </div>

          {/* Simple Line Chart Simulation */}
          <div className="relative h-64 bg-white rounded-lg border border-gray-200 p-4">
            <div className="h-full flex items-end justify-between space-x-1">
              {chartData.map((point, index) => {
                const height = ((point.value - Math.min(...chartData.map(p => p.value))) / 
                  (Math.max(...chartData.map(p => p.value)) - Math.min(...chartData.map(p => p.value)))) * 200 + 20;
                
                return (
                  <div key={index} className="flex flex-col items-center group">
                    <div 
                      className={`w-2 ${metricInfo.color} rounded-t transition-all duration-200 hover:opacity-80`}
                      style={{ height: `${height}px` }}
                    />
                    <div className="text-xs text-gray-500 mt-1 transform rotate-45 origin-top-left opacity-0 group-hover:opacity-100 transition-opacity">
                      {point.time}
                    </div>
                    <div className="absolute -top-8 bg-gray-900 text-white px-2 py-1 rounded text-xs opacity-0 group-hover:opacity-100 transition-opacity">
                      {point.value.toFixed(1)}{metricInfo.unit}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Weather Forecast */}
        <div className="mt-8">
          <h3 className="text-lg font-semibold mb-4 flex items-center">
            <Cloud className="h-5 w-5 mr-2 text-blue-500" />
            {translations.weatherForecast}
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            {weatherData.forecast.map((day, index) => (
              <div key={index} className="bg-white border border-gray-200 rounded-lg p-4 text-center">
                <div className="font-medium text-gray-900 mb-2">{day.day}</div>
                <div className="text-2xl font-bold text-blue-600 mb-1">{day.temp}°C</div>
                <div className="text-sm text-gray-600 mb-2">{day.condition}</div>
                {day.rain > 0 && (
                  <div className="text-xs text-blue-600 bg-blue-100 px-2 py-1 rounded">
                    {day.rain}mm rain
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* System Status */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-green-50 border border-green-200 rounded-lg p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span className="text-sm font-medium text-green-800">Weather Station</span>
              </div>
              <span className="text-xs text-green-600">Online</span>
            </div>
          </div>
          <div className="bg-green-50 border border-green-200 rounded-lg p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span className="text-sm font-medium text-green-800">Soil Sensors</span>
              </div>
              <span className="text-xs text-green-600">Online</span>
            </div>
          </div>
          <div className="bg-green-50 border border-green-200 rounded-lg p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span className="text-sm font-medium text-green-800">Data Sync</span>
              </div>
              <span className="text-xs text-green-600">Active</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DataMonitoring;