import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { slideUp, fadeIn } from '../../../utils/animations';
import { submitContactForm } from '../../../services/contactService';
import useProfile from '../../../hooks/useProfile';
import Input from '../../common/input/Input';
import Textarea from '../../common/textarea/Textarea';
import Button from '../../common/button/Button';
import { FaGithub, FaLinkedin, FaEnvelope, FaWhatsapp } from 'react-icons/fa';
import './Contact.css';

const ContactSection = () => {
  const { profile } = useProfile();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    try {
      setIsSubmitting(true);
      setSubmitStatus(null);
      await submitContactForm(data);
      setSubmitStatus('success');
      reset();
      setTimeout(() => setSubmitStatus(null), 5000);
    } catch (error) {
      setSubmitStatus('error');
      console.error('Contact form error:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const socialLinks = [
    {
      icon: <FaLinkedin size={24} />,
      url: profile?.social?.linkedin || 'https://linkedin.com/in/yourusername',
      label: 'LinkedIn',
    },
    {
      icon: <FaGithub size={24} />,
      url: profile?.social?.github || 'https://github.com/yourusername',
      label: 'GitHub',
    },
    {
      icon: <FaWhatsapp size={24} />,
      url: profile?.social?.whatsapp || 'https://https://wa.me/2340000000000',
      label: 'Whasapp',
    },
    {
      icon: <FaEnvelope size={24} />,
      url: `mailto:${profile?.social?.email || 'your@email.com'}`,
      label: 'Email',
    },
  ];

  return (
    <section id="contact" className="section contact-section">
      <div className="container-custom">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="section-header"
        >
          <h2 className="section-title">Get In Touch</h2>
          <p className="section-subtitle">
            Have a project in mind? Let's work together!
          </p>
        </motion.div>

        <div className="contact-content">
          {/* Contact Form */}
          <motion.div
            variants={slideUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="contact-form-wrapper"
          >
            <form onSubmit={handleSubmit(onSubmit)} className="contact-form">
              <Input
                label="Name"
                name="name"
                placeholder="John Doe"
                required
                register={register}
                error={errors.name}
              />

              <Input
                label="Email"
                name="email"
                type="email"
                placeholder="john@example.com"
                required
                register={register}
                error={errors.email}
              />

              <Input
                label="Subject"
                name="subject"
                placeholder="Project Inquiry"
                register={register}
                error={errors.subject}
              />

              <Textarea
                label="Message"
                name="message"
                placeholder="Tell me about your project..."
                required
                rows={6}
                register={register}
                error={errors.message}
              />

              {/* Submit Button */}
              <Button
                type="submit"
                variant="primary"
                disabled={isSubmitting}
                className="submit-button"
              >
                {isSubmitting ? 'Sending...' : 'Send Message'}
              </Button>

              {/* Success/Error Messages */}
              {submitStatus === 'success' && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="status-message success-message"
                >
                  ✓ Message sent successfully! I'll get back to you soon.
                </motion.div>
              )}

              {submitStatus === 'error' && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="status-message error-message"
                >
                  ✗ Failed to send message. Please try again.
                </motion.div>
              )}
            </form>
          </motion.div>

          {/* Contact Info & Social */}
          <motion.div
            variants={fadeIn}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="contact-info"
          >
            <div className="info-card">
              <h3 className="info-title">Let's Connect</h3>
              <p className="info-text">
                I'm always open to discussing new projects, creative ideas, or
                opportunities to be part of your vision.
              </p>

              {/* Social Links */}
              <div className="social-links">
                {socialLinks.map((link, index) => (
                  <motion.a
                    key={index}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="social-link"
                    whileHover={{ scale: 1.1, y: -3 }}
                
                    aria-label={link.label}
                  >
                    {link.icon}
                  </motion.a>
                ))}
              </div>

              {/* Direct Email */}
              <div className="direct-contact">
                <p className="direct-contact-label">Or email me directly at:</p>
                <a
                  href={`mailto:${profile?.social?.email || 'your@email.com'}`}
                  className="direct-email"
                >
                  {profile?.social?.email || 'your@email.com'}
                </a>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;