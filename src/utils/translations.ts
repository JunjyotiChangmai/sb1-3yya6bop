export type Language = 'en' | 'es' | 'hi';

export const translations = {
  en: {
    // Navigation
    dashboard: 'Dashboard',
    prediction: 'Crop Prediction',
    recommendations: 'Recommendations',
    monitoring: 'Data Monitoring',
    analysis: 'Historical Analysis',
    settings: 'Settings',
    
    // Dashboard
    welcomeBack: 'Welcome back',
    farmOverview: 'Farm Overview',
    currentConditions: 'Current Conditions',
    quickStats: 'Quick Stats',
    recentPredictions: 'Recent Predictions',
    urgentRecommendations: 'Urgent Recommendations',
    
    // Weather
    temperature: 'Temperature',
    humidity: 'Humidity',
    rainfall: 'Rainfall',
    windSpeed: 'Wind Speed',
    weatherForecast: 'Weather Forecast',
    
    // Soil
    soilMoisture: 'Soil Moisture',
    phLevel: 'pH Level',
    nitrogen: 'Nitrogen',
    phosphorus: 'Phosphorus',
    potassium: 'Potassium',
    organicMatter: 'Organic Matter',
    
    // Predictions
    predictYield: 'Predict Crop Yield',
    selectCrop: 'Select Crop',
    plantingDate: 'Planting Date',
    fieldSize: 'Field Size (acres)',
    predictButton: 'Generate Prediction',
    predictionResults: 'Prediction Results',
    expectedYield: 'Expected Yield',
    confidence: 'Confidence',
    
    // Recommendations
    irrigationAdvice: 'Irrigation Advice',
    fertilizationPlan: 'Fertilization Plan',
    pestControlAlert: 'Pest Control Alert',
    generalTips: 'General Tips',
    
    // Common
    acres: 'acres',
    tons: 'tons',
    days: 'days',
    high: 'High',
    medium: 'Medium',
    low: 'Low',
    save: 'Save',
    cancel: 'Cancel',
    update: 'Update',
    loading: 'Loading...'
  },
  
  es: {
    // Navigation
    dashboard: 'Panel de Control',
    prediction: 'Predicción de Cultivos',
    recommendations: 'Recomendaciones',
    monitoring: 'Monitoreo de Datos',
    analysis: 'Análisis Histórico',
    settings: 'Configuraciones',
    
    // Dashboard
    welcomeBack: 'Bienvenido de vuelta',
    farmOverview: 'Resumen de la Granja',
    currentConditions: 'Condiciones Actuales',
    quickStats: 'Estadísticas Rápidas',
    recentPredictions: 'Predicciones Recientes',
    urgentRecommendations: 'Recomendaciones Urgentes',
    
    // Weather
    temperature: 'Temperatura',
    humidity: 'Humedad',
    rainfall: 'Precipitación',
    windSpeed: 'Velocidad del Viento',
    weatherForecast: 'Pronóstico del Tiempo',
    
    // Soil
    soilMoisture: 'Humedad del Suelo',
    phLevel: 'Nivel de pH',
    nitrogen: 'Nitrógeno',
    phosphorus: 'Fósforo',
    potassium: 'Potasio',
    organicMatter: 'Materia Orgánica',
    
    // Predictions
    predictYield: 'Predecir Rendimiento de Cultivos',
    selectCrop: 'Seleccionar Cultivo',
    plantingDate: 'Fecha de Siembra',
    fieldSize: 'Tamaño del Campo (acres)',
    predictButton: 'Generar Predicción',
    predictionResults: 'Resultados de Predicción',
    expectedYield: 'Rendimiento Esperado',
    confidence: 'Confianza',
    
    // Recommendations
    irrigationAdvice: 'Consejos de Riego',
    fertilizationPlan: 'Plan de Fertilización',
    pestControlAlert: 'Alerta de Control de Plagas',
    generalTips: 'Consejos Generales',
    
    // Common
    acres: 'acres',
    tons: 'toneladas',
    days: 'días',
    high: 'Alto',
    medium: 'Medio',
    low: 'Bajo',
    save: 'Guardar',
    cancel: 'Cancelar',
    update: 'Actualizar',
    loading: 'Cargando...'
  },
  
  hi: {
    // Navigation
    dashboard: 'डैशबोर्ड',
    prediction: 'फसल भविष्यवाणी',
    recommendations: 'सिफारिशें',
    monitoring: 'डेटा निगरानी',
    analysis: 'ऐतिहासिक विश्लेषण',
    settings: 'सेटिंग्स',
    
    // Dashboard
    welcomeBack: 'वापसी पर स्वागत है',
    farmOverview: 'फार्म अवलोकन',
    currentConditions: 'वर्तमान स्थितियां',
    quickStats: 'त्वरित आंकड़े',
    recentPredictions: 'हाल की भविष्यवाणियां',
    urgentRecommendations: 'तत्काल सिफारिशें',
    
    // Weather
    temperature: 'तापमान',
    humidity: 'नमी',
    rainfall: 'वर्षा',
    windSpeed: 'हवा की गति',
    weatherForecast: 'मौसम पूर्वानुमान',
    
    // Soil
    soilMoisture: 'मिट्टी की नमी',
    phLevel: 'पीएच स्तर',
    nitrogen: 'नाइट्रोजन',
    phosphorus: 'फास्फोरस',
    potassium: 'पोटेशियम',
    organicMatter: 'जैविक पदार्थ',
    
    // Predictions
    predictYield: 'फसल उत्पादन की भविष्यवाणी',
    selectCrop: 'फसल चुनें',
    plantingDate: 'रोपण तिथि',
    fieldSize: 'खेत का आकार (एकड़)',
    predictButton: 'भविष्यवाणी उत्पन्न करें',
    predictionResults: 'भविष्यवाणी परिणाम',
    expectedYield: 'अपेक्षित उत्पादन',
    confidence: 'विश्वास',
    
    // Recommendations
    irrigationAdvice: 'सिंचाई सलाह',
    fertilizationPlan: 'उर्वरीकरण योजना',
    pestControlAlert: 'कीट नियंत्रण चेतावनी',
    generalTips: 'सामान्य सुझाव',
    
    // Common
    acres: 'एकड़',
    tons: 'टन',
    days: 'दिन',
    high: 'उच्च',
    medium: 'मध्यम',
    low: 'कम',
    save: 'सेव करें',
    cancel: 'रद्द करें',
    update: 'अपडेट करें',
    loading: 'लोड हो रहा है...'
  }
};