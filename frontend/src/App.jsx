import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [formData, setFormData] = useState({
    name: '',
    title: '',
    about: '',
    skills: ''
  });

  const [message, setMessage] = useState('');
  const [portfolio, setPortfolio] = useState(null);

  useEffect(() => {
    fetchPortfolio();
  }, []);

  const fetchPortfolio = async () => {
    try {
      const res = await axios.get('http://localhost:5000/api/portfolio');
      if (res.data) {
        setPortfolio(res.data);
      }
    } catch (err) {
      console.log("No portfolio found yet.");
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:5000/api/portfolio', formData);
      setMessage(res.data.message);
      fetchPortfolio();
    } catch (err) {
      console.error(err);
      setMessage('Error saving portfolio. Please check backend.');
    }
  };

  return (
    <div className="app-container">
      <h1 className="app-title">🚀 Portfolio Builder</h1>
      
      {/* Portfolio Form */}
      <form onSubmit={handleSubmit} className="portfolio-form">
        <input 
          type="text" 
          name="name" 
          placeholder="Your Full Name" 
          value={formData.name} 
          onChange={handleChange} 
          required
          className="form-input"
        />
        <input 
          type="text" 
          name="title" 
          placeholder="Professional Title (e.g. MERN Stack Developer)" 
          value={formData.title} 
          onChange={handleChange} 
          required
          className="form-input"
        />
        <textarea 
          name="about" 
          placeholder="About You" 
          value={formData.about} 
          onChange={handleChange} 
          rows="4"
          required
          className="form-textarea"
        />
        <input 
          type="text" 
          name="skills" 
          placeholder="Skills (comma separated, e.g. React, Node, MongoDB)" 
          value={formData.skills} 
          onChange={handleChange} 
          required
          className="form-input"
        />
        <button type="submit" className="submit-btn">
          Save Portfolio
        </button>
      </form>

      {message && (
        <p className={`status-message ${message.includes('Success') ? 'status-success' : 'status-error'}`}>
          {message}
        </p>
      )}

      {/* Portfolio Preview Card */}
      {portfolio && (
        <div className="portfolio-card">
          <h2 className="portfolio-name">{portfolio.personalInfo?.name}</h2>
          <h4 className="portfolio-title">{portfolio.personalInfo?.title}</h4>
          <p className="portfolio-about">{portfolio.personalInfo?.about}</p>
          
          <h3 className="skills-heading">Skills:</h3>
          <div className="skills-container">
            {portfolio.skills?.map((skill, index) => (
              <span key={index} className="skill-badge">
                {skill}
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default App;