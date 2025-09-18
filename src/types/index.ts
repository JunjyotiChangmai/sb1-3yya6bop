export interface FarmData {
  name: string;
  location: string;
  size: number;
  crops: string[];
}

export interface WeatherData {
  temperature: number;
  humidity: number;
  rainfall: number;
  windSpeed: number;
  forecast: ForecastDay[];
}

export interface ForecastDay {
  day: string;
  temp: number;
  condition: string;
  rain: number;
}

export interface SoilData {
  moisture: number;
  ph: number;
  nitrogen: number;
  phosphorus: number;
  potassium: number;
  organicMatter: number;
}

export interface CropPrediction {
  crop: string;
  expectedYield: number;
  confidence: number;
  factors: {
    weather: number;
    soil: number;
    practices: number;
  };
}

export interface Recommendation {
  type: 'irrigation' | 'fertilization' | 'pestControl' | 'general';
  priority: 'high' | 'medium' | 'low';
  title: string;
  description: string;
  action: string;
  timing: string;
}