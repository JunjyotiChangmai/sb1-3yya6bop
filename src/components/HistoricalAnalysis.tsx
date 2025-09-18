import React, { useState } from 'react';
import { TrendingUp, BarChart3, Calendar, Target, Award } from 'lucide-react';

interface HistoricalAnalysisProps {
  translations: any;
}

const HistoricalAnalysis: React.FC<HistoricalAnalysisProps> = ({ translations }) => {
  const [selectedYear, setSelectedYear] = useState('2024');
  const [selectedCrop, setSelectedCrop] = useState('all');

  const years = ['2024', '2023', '2022', '2021', '2020'];
  const crops = ['all', 'Wheat', 'Corn', 'Soybeans'];

  const mockHistoricalData = {
    yields: [
      { year: '2020', wheat: 3.8, corn: 8.1, soybeans: 2.9, total: 14.8 },
      { year: '2021', wheat: 4.1, corn: 8.5, soybeans: 3.2, total: 15.8 },
      { year: '2022', wheat: 3.9, corn: 8.3, soybeans: 3.0, total: 15.2 },
      { year: '2023', wheat: 4.3, corn: 8.9, soybeans: 3.4, total: 16.6 },
      { year: '2024', wheat: 4.5, corn: 9.2, soybeans: 3.6, total: 17.3 }
    ],
    improvements: [
      { category: 'Overall Yield', improvement: '17%', period: '5 years' },
      { category: 'Water Efficiency', improvement: '23%', period: '3 years' },
      { category: 'Fertilizer Optimization', improvement: '15%', period: '2 years' },
      { category: 'Pest Management', improvement: '28%', period: '4 years' }
    ],
    trends: {
      temperature: [20.5, 21.2, 21.8, 22.1, 22.4],
      rainfall: [850, 780, 920, 810, 875],
      yieldIncrease: [0, 6.8, -3.8, 9.2, 4.2]
    }
  };

  const getCurrentYearData = () => {
    return mockHistoricalData.yields.find(y => y.year === selectedYear) || mockHistoricalData.yields[0];
  };

  const getYieldTrend = () => {
    const currentIndex = mockHistoricalData.yields.findIndex(y => y.year === selectedYear);
    if (currentIndex > 0) {
      const current = mockHistoricalData.yields[currentIndex];
      const previous = mockHistoricalData.yields[currentIndex - 1];
      const change = ((current.total - previous.total) / previous.total) * 100;
      return {
        change: change.toFixed(1),
        isPositive: change > 0
      };
    }
    return { change: '0', isPositive: true };
  };

  const currentData = getCurrentYearData();
  const trend = getYieldTrend();

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <h2 className="text-2xl font-bold mb-6 flex items-center">
          <TrendingUp className="h-6 w-6 mr-3 text-green-500" />
          {translations.analysis}
        </h2>

        {/* Filter Controls */}
        <div className="flex flex-wrap gap-4 mb-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Year</label>
            <select
              value={selectedYear}
              onChange={(e) => setSelectedYear(e.target.value)}
              className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-green-500 focus:border-transparent"
            >
              {years.map(year => (
                <option key={year} value={year}>{year}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Crop</label>
            <select
              value={selectedCrop}
              onChange={(e) => setSelectedCrop(e.target.value)}
              className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-green-500 focus:border-transparent"
            >
              {crops.map(crop => (
                <option key={crop} value={crop}>{crop === 'all' ? 'All Crops' : crop}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-gradient-to-r from-green-500 to-green-600 text-white rounded-lg p-4">
            <div className="flex items-center justify-between mb-2">
              <Target className="h-6 w-6" />
              <span className={`text-sm px-2 py-1 rounded-full bg-white/20 ${
                trend.isPositive ? 'text-green-100' : 'text-red-100'
              }`}>
                {trend.isPositive ? '+' : ''}{trend.change}%
              </span>
            </div>
            <div className="text-2xl font-bold">{currentData.total}</div>
            <div className="text-sm text-green-100">Total Yield (tons/acre)</div>
          </div>
          
          <div className="bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-lg p-4">
            <div className="flex items-center justify-between mb-2">
              <BarChart3 className="h-6 w-6" />
              <Award className="h-5 w-5 text-blue-200" />
            </div>
            <div className="text-2xl font-bold">{currentData.wheat}</div>
            <div className="text-sm text-blue-100">Wheat Yield (tons/acre)</div>
          </div>
          
          <div className="bg-gradient-to-r from-yellow-500 to-yellow-600 text-white rounded-lg p-4">
            <div className="flex items-center justify-between mb-2">
              <BarChart3 className="h-6 w-6" />
              <Award className="h-5 w-5 text-yellow-200" />
            </div>
            <div className="text-2xl font-bold">{currentData.corn}</div>
            <div className="text-sm text-yellow-100">Corn Yield (tons/acre)</div>
          </div>
          
          <div className="bg-gradient-to-r from-purple-500 to-purple-600 text-white rounded-lg p-4">
            <div className="flex items-center justify-between mb-2">
              <BarChart3 className="h-6 w-6" />
              <Award className="h-5 w-5 text-purple-200" />
            </div>
            <div className="text-2xl font-bold">{currentData.soybeans}</div>
            <div className="text-sm text-purple-100">Soybean Yield (tons/acre)</div>
          </div>
        </div>

        {/* 5-Year Yield Trend Chart */}
        <div className="bg-gray-50 rounded-xl p-6 mb-6">
          <h3 className="text-lg font-semibold mb-4 flex items-center">
            <TrendingUp className="h-5 w-5 mr-2 text-green-600" />
            5-Year Yield Trends
          </h3>
          <div className="relative h-64 bg-white rounded-lg border border-gray-200 p-4">
            <div className="h-full flex items-end justify-between space-x-2">
              {mockHistoricalData.yields.map((data, index) => {
                const height = (data.total / Math.max(...mockHistoricalData.yields.map(y => y.total))) * 200;
                const isSelected = data.year === selectedYear;
                
                return (
                  <div key={data.year} className="flex flex-col items-center group flex-1">
                    <div className="relative w-full max-w-16">
                      <div 
                        className={`w-full rounded-t transition-all duration-300 ${
                          isSelected ? 'bg-green-600' : 'bg-green-400 hover:bg-green-500'
                        }`}
                        style={{ height: `${height}px` }}
                      />
                      <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-gray-900 text-white px-2 py-1 rounded text-xs opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                        {data.total} tons/acre
                      </div>
                    </div>
                    <div className={`text-sm mt-2 font-medium ${
                      isSelected ? 'text-green-600' : 'text-gray-600'
                    }`}>
                      {data.year}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Performance Improvements */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white border border-gray-200 rounded-xl p-6">
            <h3 className="text-lg font-semibold mb-4 flex items-center">
              <Award className="h-5 w-5 mr-2 text-gold-500" />
              AI-Driven Improvements
            </h3>
            <div className="space-y-4">
              {mockHistoricalData.improvements.map((item, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                  <div>
                    <div className="font-medium text-gray-900">{item.category}</div>
                    <div className="text-sm text-gray-600">Over {item.period}</div>
                  </div>
                  <div className="text-right">
                    <div className="text-2xl font-bold text-green-600">{item.improvement}</div>
                    <div className="text-xs text-gray-500">improvement</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white border border-gray-200 rounded-xl p-6">
            <h3 className="text-lg font-semibold mb-4 flex items-center">
              <Calendar className="h-5 w-5 mr-2 text-blue-500" />
              Seasonal Performance
            </h3>
            <div className="space-y-4">
              <div className="p-3 bg-blue-50 rounded-lg">
                <div className="flex justify-between items-center mb-2">
                  <span className="font-medium text-blue-900">Spring 2024</span>
                  <span className="text-sm text-blue-600">Excellent</span>
                </div>
                <div className="w-full bg-blue-200 rounded-full h-2">
                  <div className="bg-blue-600 h-2 rounded-full w-5/6"></div>
                </div>
                <div className="text-xs text-blue-700 mt-1">Optimal planting conditions</div>
              </div>
              
              <div className="p-3 bg-green-50 rounded-lg">
                <div className="flex justify-between items-center mb-2">
                  <span className="font-medium text-green-900">Summer 2024</span>
                  <span className="text-sm text-green-600">Good</span>
                </div>
                <div className="w-full bg-green-200 rounded-full h-2">
                  <div className="bg-green-600 h-2 rounded-full w-4/5"></div>
                </div>
                <div className="text-xs text-green-700 mt-1">Consistent growth period</div>
              </div>
              
              <div className="p-3 bg-yellow-50 rounded-lg">
                <div className="flex justify-between items-center mb-2">
                  <span className="font-medium text-yellow-900">Fall 2024</span>
                  <span className="text-sm text-yellow-600">Average</span>
                </div>
                <div className="w-full bg-yellow-200 rounded-full h-2">
                  <div className="bg-yellow-600 h-2 rounded-full w-3/5"></div>
                </div>
                <div className="text-xs text-yellow-700 mt-1">Weather challenges</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HistoricalAnalysis;