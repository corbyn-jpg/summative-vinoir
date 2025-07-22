import React, { useState } from "react";
import HeroSection from "../../Components/HeroSection";
import emailjs from "emailjs-com";
import "./Contact.css";

// Static media
import contactHeroImage from "../../assets/spritz.jpeg";
import contactHeroVideo from "../../assets/ManUnited.jpeg";

// Initialize EmailJS with your User ID
emailjs.init("_QatdQkHx_mavwiI-");

const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      await emailjs.send(
        "service_jtead7u", // Service ID
        "template_63xglp9", // Template ID
        {
          to_email: "241040@virtualwindow.co.za",
          from_name: formData.name,
          from_email: formData.email,
          subject: formData.subject,
          message: formData.message,
        }
      );

      setIsSubmitted(true);
      setFormData({ name: "", email: "", subject: "", message: "" });
    } catch (err) {
      console.error("Email sending failed:", err);
      setError("Failed to send message. Please try again later.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="contact-container">
      {/* Hero Section */}
      <div className="contact-hero-wrapper">
        <HeroSection
          title="CONTACT VINOIR"
          backgroundImage={contactHeroImage}
          buttonText="EXPLORE"
          buttonLink="/shop"
          videoSrc={contactHeroVideo}
        />
      </div>

      {/* Contact Form Section */}
      <div className="contact-form-section">
        <div className="form-container">
          <h2 className="section-title">Send Us a Message</h2>

          {error && (
            <div role="alert" className="error-message">
              {error}
            </div>
          )}

          {isSubmitted ? (
            <div className="success-message" role="status">
              <h3>Thank you for your message!</h3>
              <p>We've received your inquiry and will respond shortly.</p>
              <button
                type="button"
                onClick={() => setIsSubmitted(false)}
                className="submit-button"
              >
                Send another message
              </button>
            </div>
          ) : (
            <form className="contact-form" onSubmit={handleSubmit} noValidate>
              <div className="form-group">
                <label htmlFor="name" className="sr-only">Full Name</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  placeholder="Full Name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  aria-required="true"
                />
              </div>

              <div className="form-group">
                <label htmlFor="email" className="sr-only">Email Address</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  placeholder="Email Address"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  aria-required="true"
                />
              </div>

              <div className="form-group">
                <label htmlFor="subject" className="sr-only">Subject</label>
                <select
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  required
                  aria-required="true"
                >
                  <option value="">Select a subject</option>
                  <option value="Product Inquiry">Product Inquiry</option>
                  <option value="Order Support">Order Support</option>
                  <option value="Press Inquiry">Press Inquiry</option>
                  <option value="Partnership Opportunity">Partnership Opportunity</option>
                  <option value="Other">Other</option>
                </select>
              </div>

              <div className="form-group">
                <label htmlFor="message" className="sr-only">Your message</label>
                <textarea
                  id="message"
                  name="message"
                  rows="5"
                  placeholder="Your message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  aria-required="true"
                />
              </div>

              <button
                type="submit"
                className="submit-button"
                disabled={isLoading}
                aria-busy={isLoading}
              >
                {isLoading ? "Sending..." : "Send Message"}
              </button>
            </form>
          )}
        </div>
      </div>

      {/* Contact Info Section */}
      <div className="contact-info-section" aria-label="Contact Information">
        <div className="contact-info-content">
          <h2>Contact Information</h2>
          <div className="contact-details">
            <section className="contact-method" aria-labelledby="general-inquiries">
              <h3 id="general-inquiries">General Inquiries</h3>
              <p>
                <a href="mailto:241040@virtualwindow.co.za">
                  241040@virtualwindow.co.za
                </a>
              </p>
              <p>+27 12 345 6789</p>
            </section>

            <section className="contact-method" aria-labelledby="visit-us">
              <h3 id="visit-us">Visit Us</h3>
              <p>Open Window - Centurion</p>
              <p>1297 John Vorster</p>
              <p>Centurion, Gauteng</p>
            </section>
          </div>
        </div>
      </div>

      {/* Location Map Section */}
      <div className="location-section" aria-label="Location Map">
        <div className="map-container">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3597.8473501694!2d28.2094135!3d-25.8919438!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x1e956608911ce097%3A0x519896b4b6eda40a!2sOpen%20Window%20-%20Centurion!5e0!3m2!1sen!2sza!4v1718200000000!5m2!1sen!2sza"
            width="100%"
            height="500"
            style={{ border: 0 }}
            allowFullScreen=""
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title="Open Window Location Map"
          ></iframe>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;
