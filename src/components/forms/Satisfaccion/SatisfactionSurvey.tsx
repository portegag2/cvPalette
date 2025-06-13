import React, { useState } from 'react';

interface SurveyFormData {
  rating: number;
  comments: string;
  recommend: string;
  service: string;
  improvements: string;
  features: string[];
}

const SatisfactionSurvey: React.FC = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = 2;
  
  const [formData, setFormData] = useState<SurveyFormData>({
    rating: 10,
    comments: '',
    recommend: '',
    service: '',
    improvements: '',
    features: [],
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      features: checked 
        ? [...prev.features, value]
        : prev.features.filter(item => item !== value)
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch('https://httpbin.org/post', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      if (response.ok) {
        alert('Encuesta enviada con éxito');
      }
    } catch (error) {
      console.error('Error submitting form:', error);
    }
  };

  return (
    <div className="py-4">
      <form onSubmit={handleSubmit} className="space-y-6 max-w-2xl mx-auto">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold">
            Página {currentPage} de {totalPages}
          </h2>
          <div className="w-32 h-2 bg-gray-200 rounded-full">
            <div 
              className="h-full bg-blue-500 rounded-full"
              style={{ width: `${(currentPage / totalPages) * 100}%` }}
            />
          </div>
        </div>

        {currentPage === 1 && (
          <section className="space-y-4">
            <h2 className="text-xl font-semibold">Experiencia de Compra</h2>
            
            <div>
              <label className="block mb-2">
                Calificación de la Experiencia (1-10)
              </label>
              <div className="flex items-center gap-4">
                <input
                  type="range"
                  name="rating"
                  min="1"
                  max="10"
                  value={formData.rating}
                  onChange={handleInputChange}
                  className="w-full"
                />
                <span className="w-8 text-center">{formData.rating}</span>
              </div>
              <div className="flex justify-between text-sm text-gray-500">
                <span>Muy Malo</span>
                <span>Excelente</span>
              </div>
            </div>

            <div>
              <label className="block mb-2">
                Comentarios
              </label>
              <textarea
                name="comments"
                rows={4}
                value={formData.comments}
                onChange={handleInputChange}
                className="w-full p-2 border rounded"
              />
            </div>

            <button
              type="button"
              onClick={() => setCurrentPage(2)}
              className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            >
              Siguiente
            </button>
          </section>
        )}

        {currentPage === 2 && (
          <section className="space-y-4">
            <h2 className="text-xl font-semibold">Satisfacción General</h2>
            
            <div>
              <label className="block mb-2">¿Recomendarías esta aplicación?</label>
              <div className="space-x-4">
                {['si', 'no'].map(value => (
                  <label key={value} className="inline-flex items-center">
                    <input
                      type="radio"
                      name="recommend"
                      value={value}
                      checked={formData.recommend === value}
                      onChange={handleInputChange}
                      className="mr-2"
                    />
                    {value.charAt(0).toUpperCase() + value.slice(1)}
                  </label>
                ))}
              </div>
            </div>

            <div>
              <label className="block mb-2">
                ¿Cómo calificarías la experiencia de manejo de la aplicación?
              </label>
              <div className="space-y-2">
                {['excelente', 'bueno', 'regular', 'malo'].map(value => (
                  <label key={value} className="block">
                    <input
                      type="radio"
                      name="service"
                      value={value}
                      checked={formData.service === value}
                      onChange={handleInputChange}
                      className="mr-2"
                    />
                    {value.charAt(0).toUpperCase() + value.slice(1)}
                  </label>
                ))}
              </div>
            </div>

            <div>
              <label className="block mb-2">
                ¿Qué mejorarías en el servicio?
              </label>
              <textarea
                name="improvements"
                rows={4}
                value={formData.improvements}
                onChange={handleInputChange}
                className="w-full p-2 border rounded"
              />
            </div>

            <div>
              <label className="block mb-2">¿Qué características valoras más?</label>
              <div className="space-y-2">
                {[
                  { value: 'personalizacion', label: 'Personalización' },
                  { value: 'diseño', label: 'Diseño' },
                  { value: 'funcionalidad', label: 'Funcionalidad' },
                ].map(({ value, label }) => (
                  <label key={value} className="block">
                    <input
                      type="checkbox"
                      name="features"
                      value={value}
                      checked={formData.features.includes(value)}
                      onChange={handleCheckboxChange}
                      className="mr-2"
                    />
                    {label}
                  </label>
                ))}
              </div>
            </div>

            <div className="flex gap-4">
              <button
                type="button"
                onClick={() => setCurrentPage(1)}
                className="px-4 py-2 border rounded hover:bg-gray-100"
              >
                Anterior
              </button>
              <button
                type="submit"
                className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
              >
                Enviar Encuesta
              </button>
            </div>
          </section>
        )}
      </form>
    </div>
  );
};

export default SatisfactionSurvey;
