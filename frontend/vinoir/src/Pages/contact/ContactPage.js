import React, { useState } from "react";
import emailjs from "@emailjs/browser";
import Navbar from "../../Components/Navbar";
import "./Contact.css";

// Initialize EmailJS only if emailjs is available
if (emailjs) {
  emailjs.init("_QatdQkHx_mavwiI-");
}

const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: "", 
    email: "", 
    subject: "", 
    message: ""
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      if (emailjs) {
        await emailjs.send(
          "service_jtead7u",
          "template_63xglp9",
          {
            to_email: "241040@virtualwindow.co.za",
            from_name: formData.name,
            from_email: formData.email,
            subject: formData.subject,
            message: formData.message,
          }
        );
      }

      setIsSubmitted(true);
      setFormData({ name: "", email: "", subject: "", message: "" });
    } catch (err) {
      setError("Failed to send message. Please try again later.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <Navbar />
      
      {/* Hero Header Section */}
      <div className="contact-hero">
        <div className="hero-content">
          <h1 className="hero-title">Contact Us</h1>
          <p className="hero-description">
            We'd love to hear from you. Send us a message and we'll respond as soon as possible.
          </p>
        </div>
      </div>
      
      <div className="contact-page">
        <div className="form-container">
          {isSubmitted ? (
            <div style={{ textAlign: 'center', padding: '2rem 0' }}>
              <div style={{
                fontSize: '3rem',
                color: '#2a4936',
                marginBottom: '1rem'
              }}>
                ✓
              </div>
              <h2 style={{
                fontFamily: '"Playfair Display", serif',
                color: '#2a4936',
                marginBottom: '1rem'
              }}>
                Message Sent Successfully!
              </h2>
              <p style={{
                color: '#666',
                marginBottom: '2rem',
                fontSize: '1.1rem'
              }}>
                We've received your message and will respond within 24 hours.
              </p>
              <button
                onClick={() => setIsSubmitted(false)}
                className="submit-button"
              >
                Send Another Message
              </button>
            </div>
          ) : (
            <>
              <form onSubmit={handleSubmit} className="contact-form">
                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="name">Your Name *</label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  
                  <div className="form-group">
                    <label htmlFor="email">Email Address *</label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                    />
                  </div>
                </div>
                
                <div className="form-group">
                  <label htmlFor="subject">Subject *</label>
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    required
                  />
                </div>
                
                <div className="form-group">
                  <label htmlFor="message">Your Message *</label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    rows="6"
                    required
                  ></textarea>
                </div>
                
                {error && <div className="error-message">{error}</div>}
                
                <button 
                  type="submit" 
                  className="submit-button"
                  disabled={isLoading}
                >
                  {isLoading ? "Sending..." : "Send Message"}
                </button>
              </form>

              {/* Email Subscribe Section */}
              <div className="newsletter-section">
                <h3>Stay Updated</h3>
                <p>Subscribe to our newsletter for exclusive offers and new fragrance releases.</p>
                <div className="newsletter-form">
                  <input 
                    type="email" 
                    placeholder="Enter your email" 
                    className="newsletter-input"
                  />
                  <button className="newsletter-button">Subscribe</button>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default ContactPage;