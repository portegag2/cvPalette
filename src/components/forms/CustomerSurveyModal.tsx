import React, { useState } from 'react';
import { X, Star, ThumbsUp, ThumbsDown, Send, Sparkles } from 'lucide-react';

const CustomerSurveyModal = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [formData, setFormData] = useState({
    experienceRating: 10,
    comments: '',
    wouldRecommend: null,
    usabilityRating: '',
    improvements: '',
    valuedFeatures: []
  });

  const usabilityOptions = [
    { value: 'excelente', label: 'Excelente', emoji: '🚀', color: 'from-emerald-400 to-teal-500' },
    { value: 'bueno', label: 'Bueno', emoji: '👍', color: 'from-blue-400 to-cyan-500' },
    { value: 'regular', label: 'Regular', emoji: '👌', color: 'from-yellow-400 to-orange-500' },
    { value: 'malo', label: 'Malo', emoji: '👎', color: 'from-red-400 to-pink-500' }
  ];

  const featureOptions = [
    { value: 'personalizacion', label: 'Personalización', icon: '🎨', color: 'from-purple-400 to-pink-500' },
    { value: 'diseño', label: 'Diseño', icon: '✨', color: 'from-cyan-400 to-blue-500' },
    { value: 'funcionalidad', label: 'Funcionalidad', icon: '⚡', color: 'from-green-400 to-emerald-500' }
  ];

  const handleFeatureToggle = (feature) => {
    setFormData(prev => ({
      ...prev,
      valuedFeatures: prev.valuedFeatures.includes(feature)
        ? prev.valuedFeatures.filter(f => f !== feature)
        : [...prev.valuedFeatures, feature]
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Aquí puedes integrar el servicio de email que prefieras
    // Por ejemplo: EmailJS, Formspree, tu propio backend, etc.
    
    const emailData = {
      experienceRating: formData.experienceRating,
      comments: formData.comments,
      wouldRecommend: formData.wouldRecommend ? 'Sí' : 'No',
      usabilityRating: formData.usabilityRating,
      improvements: formData.improvements,
      valuedFeatures: formData.valuedFeatures.join(', ')
    };
    
    console.log('Datos a enviar por email:', emailData);
    
    // Simulación de envío
    alert('¡Gracias por tu feedback! Tu encuesta ha sido enviada.');
    setIsOpen(false);
    
    // Reset form
    setFormData({
      experienceRating: 10,
      comments: '',
      wouldRecommend: null,
      usabilityRating: '',
      improvements: '',
      valuedFeatures: []
    });
  };

  const RatingSlider = () => (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <span className="text-xs sm:text-sm text-gray-600">1</span>
        <div className="flex space-x-0.5 sm:space-x-1">
          {[...Array(10)].map((_, i) => (
            <Star
              key={i}
              className={`w-4 h-4 sm:w-6 sm:h-6 cursor-pointer transition-all duration-200 ${
                i < formData.experienceRating
                  ? 'text-yellow-400 fill-yellow-400 scale-110'
                  : 'text-gray-300 hover:text-yellow-300'
              }`}
              onClick={() => setFormData(prev => ({ ...prev, experienceRating: i + 1 }))}
            />
          ))}
        </div>
        <span className="text-xs sm:text-sm text-gray-600">10</span>
      </div>
      <div className="text-center">
        <span className="text-xl sm:text-2xl font-bold bg-gradient-to-r from-yellow-400 to-orange-500 bg-clip-text text-transparent">
          {formData.experienceRating}/10
        </span>
      </div>
    </div>
  );

  const RecommendButtons = () => (
    <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-4">
      <button
        type="button"
        onClick={() => setFormData(prev => ({ ...prev, wouldRecommend: true }))}
        className={`flex-1 p-4 rounded-2xl border-2 transition-all duration-300 ${
          formData.wouldRecommend === true
            ? 'bg-gradient-to-r from-green-400 to-emerald-500 border-emerald-400 text-white shadow-lg scale-105'
            : 'border-gray-200 hover:border-emerald-300 hover:bg-emerald-50'
        }`}
      >
        <ThumbsUp className="w-6 h-6 sm:w-8 sm:h-8 mx-auto mb-2" />
        <span className="font-semibold text-sm sm:text-base">¡Sí!</span>
      </button>
      <button
        type="button"
        onClick={() => setFormData(prev => ({ ...prev, wouldRecommend: false }))}
        className={`flex-1 p-4 rounded-2xl border-2 transition-all duration-300 ${
          formData.wouldRecommend === false
            ? 'bg-gradient-to-r from-red-400 to-pink-500 border-pink-400 text-white shadow-lg scale-105'
            : 'border-gray-200 hover:border-pink-300 hover:bg-pink-50'
        }`}
      >
        <ThumbsDown className="w-6 h-6 sm:w-8 sm:h-8 mx-auto mb-2" />
        <span className="font-semibold text-sm sm:text-base">No</span>
      </button>
    </div>
  );

  if (!isOpen) {
    return (
      <div className="p-8">
        <button
          onClick={() => setIsOpen(true)}
          className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-6 py-3 rounded-full hover:shadow-lg transition-all duration-300 hover:scale-105"
        >
          <Sparkles className="w-5 h-5 inline mr-2" />
          Abrir Encuesta de Satisfacción
        </button>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div 
        className="bg-white overflow-y-auto"
        style={{
          width: window.innerWidth < 640 ? '100vw' : 'min(672px, 90vw)',
          height: window.innerWidth < 640 ? '100vh' : 'auto',
          maxHeight: window.innerWidth < 640 ? '100vh' : '90vh',
          borderRadius: window.innerWidth < 640 ? '0' : '24px'
        }}
      >
        {/* Header */}
        <div className="sticky top-0 bg-gradient-to-r from-purple-500 via-pink-500 to-cyan-500 p-3 sm:p-6 rounded-t-2xl sm:rounded-t-3xl">
          <div className="flex justify-between items-center">
            <div>
              <h2 className="text-xl sm:text-2xl font-bold text-white">Encuesta de Satisfacción</h2>
              <p className="text-sm sm:text-base text-purple-100">Tu opinión nos ayuda a mejorar</p>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="text-white hover:bg-white hover:bg-opacity-20 p-2 rounded-full transition-all duration-200"
            >
              <X className="w-6 h-6" />
            </button>
          </div>
        </div>

        <div className="p-3 sm:p-6 space-y-6 sm:space-y-8">
          {/* Rating Experience */}
          <div className="space-y-3">
            <label className="block text-base sm:text-lg font-semibold text-gray-800">
              ✨ Calificación de la Experiencia
            </label>
            <RatingSlider />
          </div>

          {/* Comments */}
          <div className="space-y-3">
            <label className="block text-lg font-semibold text-gray-800">
              💭 Comentarios
            </label>
            <textarea
              value={formData.comments}
              onChange={(e) => setFormData(prev => ({ ...prev, comments: e.target.value }))}
              placeholder="Cuéntanos tu experiencia..."
              className="w-full p-4 border-2 border-gray-200 rounded-2xl focus:border-purple-400 focus:outline-none transition-all duration-200 resize-none"
              rows="4"
            />
          </div>

          {/* Recommend */}
          <div className="space-y-3">
            <label className="block text-lg font-semibold text-gray-800">
              🤝 ¿Recomendarías esta aplicación?
            </label>
            <RecommendButtons />
          </div>

          {/* Usability Rating */}
          <div className="space-y-3">
            <label className="block text-lg font-semibold text-gray-800">
              🎯 ¿Cómo calificarías la experiencia de manejo?
            </label>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {usabilityOptions.map((option) => (
                <button
                  key={option.value}
                  type="button"
                  onClick={() => setFormData(prev => ({ ...prev, usabilityRating: option.value }))}
                  className={`p-4 rounded-2xl border-2 transition-all duration-300 ${
                    formData.usabilityRating === option.value
                      ? `bg-gradient-to-r ${option.color} border-transparent text-white shadow-lg scale-105`
                      : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
                  }`}
                >
                  <div className="text-2xl mb-1">{option.emoji}</div>
                  <div className="font-semibold text-sm">{option.label}</div>
                </button>
              ))}
            </div>
          </div>

          {/* Improvements */}
          <div className="space-y-3">
            <label className="block text-lg font-semibold text-gray-800">
              🚀 ¿Qué mejorarías en el servicio?
            </label>
            <textarea
              value={formData.improvements}
              onChange={(e) => setFormData(prev => ({ ...prev, improvements: e.target.value }))}
              placeholder="Tus sugerencias de mejora..."
              className="w-full p-4 border-2 border-gray-200 rounded-2xl focus:border-cyan-400 focus:outline-none transition-all duration-200 resize-none"
              rows="3"
            />
          </div>

          {/* Valued Features */}
          <div className="space-y-3">
            <label className="block text-lg font-semibold text-gray-800">
              ⭐ ¿Qué características valoras más?
            </label>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              {featureOptions.map((feature) => (
                <button
                  key={feature.value}
                  type="button"
                  onClick={() => handleFeatureToggle(feature.value)}
                  className={`p-4 rounded-2xl border-2 transition-all duration-300 ${
                    formData.valuedFeatures.includes(feature.value)
                      ? `bg-gradient-to-r ${feature.color} border-transparent text-white shadow-lg scale-105`
                      : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
                  }`}
                >
                  <div className="text-2xl mb-2">{feature.icon}</div>
                  <div className="font-semibold">{feature.label}</div>
                </button>
              ))}
            </div>
          </div>

          {/* Submit Button */}
          <button
            onClick={handleSubmit}
            className="w-full bg-gradient-to-r from-purple-500 via-pink-500 to-cyan-500 text-white p-4 rounded-2xl font-bold text-lg hover:shadow-xl transition-all duration-300 hover:scale-[1.02]"
          >
            <Send className="w-5 h-5 inline mr-2" />
            Enviar Encuesta
          </button>
        </div>
      </div>
    </div>
  );
};

export default CustomerSurveyModal;