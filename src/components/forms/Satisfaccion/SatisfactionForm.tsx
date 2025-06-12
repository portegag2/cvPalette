import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { ChevronRight, ChevronLeft, User, Mail, Package, Star, MessageSquare, ThumbsUp } from "lucide-react";
import "./formStyles.css";

interface FormData {
  name: string;
  email: string;
  product: string;
  rating: number;
  recommend: string;
  comments: string;
}

interface Props {
  onClose: () => void;
}

export default function SatisfactionForm({ onClose }: Props) {
  const [currentSection, setCurrentSection] = useState(1);
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    product: '',
    rating: 5,
    recommend: '',
    comments: ''
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch('https://httpbin.org/post', {
        method: 'POST',
        body: JSON.stringify(formData),
        headers: { 'Content-Type': 'application/json' }
      });
      if (response.ok) {
        alert('Thank you! Your survey has been submitted.');
        onClose();
      }
    } catch (error) {
      alert('Error submitting form');
    }
  };

  return (
    <div className="form-container">
      <header className="form-header">
        <h1 className="form-title">Customer Satisfaction Survey</h1>
        <div className="progress-container">
          <div 
            className="progress-bar" 
            style={{ width: `${(currentSection / 3) * 100}%` }} 
          />
        </div>
        <div className="page-indicator">
          Page <span className="page-number">{currentSection}</span> of <span>3</span>
        </div>
      </header>

      <form onSubmit={handleSubmit} className="satisfaction-form">
        {currentSection === 1 && (
          <section className="form-section">
            <h2 className="section-title">Contact Information</h2>
            <div className="form-group">
              <label className="form-label">
                <User className="input-icon" size={18} />
                Name
              </label>
              <input
                type="text"
                className="form-input"
                value={formData.name}
                onChange={e => setFormData({...formData, name: e.target.value})}
                placeholder="Your name"
              />
            </div>
            <div className="form-group">
              <label className="form-label">
                <Mail className="input-icon" size={18} />
                Email
              </label>
              <input
                type="email"
                className="form-input"
                value={formData.email}
                onChange={e => setFormData({...formData, email: e.target.value})}
                placeholder="your@email.com"
              />
            </div>
            <div className="button-group">
              <Button type="button" onClick={() => setCurrentSection(2)} className="next-btn">
                Next <ChevronRight size={16} />
              </Button>
            </div>
          </section>
        )}

        {currentSection === 2 && (
          <section className="form-section">
            <h2 className="section-title">Product Rating</h2>
            <div className="form-group">
              <label className="form-label">
                <Package className="input-icon" size={18} />
                Product Purchased
              </label>
              <input
                type="text"
                className="form-input"
                value={formData.product}
                onChange={e => setFormData({...formData, product: e.target.value})}
                placeholder="Product name"
              />
            </div>
            <div className="form-group">
              <label className="form-label">
                <Star className="input-icon" size={18} />
                Satisfaction Rating
              </label>
              <div className="rating-container">
                <input
                  type="range"
                  className="rating-slider"
                  min="1"
                  max="10"
                  value={formData.rating}
                  onChange={e => setFormData({...formData, rating: Number(e.target.value)})}
                />
                <span className="rating-value">{formData.rating}/10</span>
              </div>
            </div>
            <div className="button-group">
              <Button type="button" variant="outline" onClick={() => setCurrentSection(1)}>
                <ChevronLeft size={16} /> Previous
              </Button>
              <Button type="button" onClick={() => setCurrentSection(3)}>
                Next <ChevronRight size={16} />
              </Button>
            </div>
          </section>
        )}

        {currentSection === 3 && (
          <section className="form-section">
            <h2 className="section-title">Additional Feedback</h2>
            <div className="form-group">
              <label className="form-label">
                <ThumbsUp className="input-icon" size={18} />
                Would you recommend our product?
              </label>
              <div className="radio-group">
                <label className="radio-label">
                  <input
                    type="radio"
                    name="recommend"
                    value="yes"
                    checked={formData.recommend === 'yes'}
                    onChange={e => setFormData({...formData, recommend: e.target.value})}
                  />
                  <span>Yes</span>
                </label>
                <label className="radio-label">
                  <input
                    type="radio"
                    name="recommend"
                    value="no"
                    checked={formData.recommend === 'no'}
                    onChange={e => setFormData({...formData, recommend: e.target.value})}
                  />
                  <span>No</span>
                </label>
              </div>
            </div>
            <div className="form-group">
              <label className="form-label">
                <MessageSquare className="input-icon" size={18} />
                Comments
              </label>
              <textarea
                className="form-textarea"
                rows={4}
                value={formData.comments}
                onChange={e => setFormData({...formData, comments: e.target.value})}
                placeholder="Share your thoughts..."
              />
            </div>
            <div className="button-group">
              <Button type="button" variant="outline" onClick={() => setCurrentSection(2)}>
                <ChevronLeft size={16} /> Previous
              </Button>
              <Button type="submit" className="submit-btn">Submit Survey</Button>
            </div>
          </section>
        )}
      </form>
    </div>
  );
}
