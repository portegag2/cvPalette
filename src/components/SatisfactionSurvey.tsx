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
        console.log('Form submitted successfully');
        // Handle success (e.g., show message, reset form, etc.)
      }
    } catch (error) {
      console.error('Error submitting form:', error);
    }
  };

  return (
    <div className="container">
      <header>
        <h1>Encuesta de Satisfacción del Cliente</h1>
        <div className="progress-container">
          <div 
            className="progress-bar" 
            style={{ width: `${(currentPage / totalPages) * 100}%` }}
          />
        </div>
        <div className="page-indicator">
          <span>{currentPage}</span> de <span>{totalPages}</span>
        </div>
      </header>

      <form onSubmit={handleSubmit}>
        {currentPage === 1 && (
          <section className="form-section">
            <h2>Experiencia de Compra</h2>
            
            <div className="form-group">
              <label htmlFor="rating">Calificación de la Experiencia (1-10):</label>
              <div className="rating-container">
                <input
                  type="range"
                  id="rating"
                  name="rating"
                  min="1"
                  max="10"
                  value={formData.rating}
                  onChange={handleInputChange}
                />
                <span>{formData.rating}</span>
              </div>
              <div className="rating-labels">
                <span>Muy Malo</span>
                <span>Excelente</span>
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="comments">Comentarios:</label>
              <textarea
                id="comments"
                name="comments"
                rows={4}
                value={formData.comments}
                onChange={handleInputChange}
              />
            </div>

            <div className="button-group">
              <button type="button" onClick={() => setCurrentPage(2)}>
                Siguiente
              </button>
            </div>
          </section>
        )}

        {currentPage === 2 && (
          <section className="form-section">
            <h2>Satisfacción General</h2>
            
            <div className="form-group">
              <label>¿Recomendarías esta aplicación?</label>
              <div className="radio-group">
                <input
                  type="radio"
                  id="recommendYes"
                  name="recommend"
                  value="si"
                  checked={formData.recommend === 'si'}
                  onChange={handleInputChange}
                />
                <label htmlFor="recommendYes">Sí</label>
                
                <input
                  type="radio"
                  id="recommendNo"
                  name="recommend"
                  value="no"
                  checked={formData.recommend === 'no'}
                  onChange={handleInputChange}
                />
                <label htmlFor="recommendNo">No</label>
              </div>
            </div>

            <div className="form-group">
              <label>¿Cómo calificarías la experiencia de manejo de la aplicación?</label>
              <div className="radio-group">
                {['excelente', 'bueno', 'regular', 'malo'].map(value => (
                  <div key={value}>
                    <input
                      type="radio"
                      id={`service${value}`}
                      name="service"
                      value={value}
                      checked={formData.service === value}
                      onChange={handleInputChange}
                    />
                    <label htmlFor={`service${value}`}>
                      {value.charAt(0).toUpperCase() + value.slice(1)}
                    </label>
                  </div>
                ))}
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="improvements">
                ¿Qué mejorarías en el servicio? (nos ayudará a mejorar)
              </label>
              <textarea
                id="improvements"
                name="improvements"
                rows={4}
                value={formData.improvements}
                onChange={handleInputChange}
              />
            </div>

            <div className="form-group">
              <label>¿Qué características valoras más?</label>
              <div className="checkbox-group">
                {[
                  { value: 'personalizacion', label: 'Personalización' },
                  { value: 'diseño', label: 'Diseño' },
                  { value: 'funcionalidad', label: 'Funcionalidad' },
                ].map(({ value, label }) => (
                  <div key={value}>
                    <input
                      type="checkbox"
                      id={`feature${value}`}
                      name="features"
                      value={value}
                      checked={formData.features.includes(value)}
                      onChange={handleCheckboxChange}
                    />
                    <label htmlFor={`feature${value}`}>{label}</label>
                  </div>
                ))}
              </div>
            </div>

            <div className="button-group">
              <button type="button" onClick={() => setCurrentPage(1)}>
                Anterior
              </button>
              <button type="submit">Enviar Encuesta</button>
            </div>
          </section>
        )}
      </form>
    </div>
  );
};

export default SatisfactionSurvey;
