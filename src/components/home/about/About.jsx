import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { slideLeft, slideRight, fadeIn } from '../../../utils/animations';
import useProfile from '../../../hooks/useProfile';
import Button from '../../common/button/Button';
import Loader from '../../common/loader/Loader';
import { FaDownload, FaCode, FaLaptopCode, FaUsers } from 'react-icons/fa';
import './About.css';
import ResumePreviewModal from '../resume-preview-modal/RessumePreviewModal';

const AboutSection = () => {
  const { profile, loading } = useProfile();
    const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  if (loading) {
    return (
      <section id="about" className="section about-section">
        <div className="container-custom">
          <Loader />
        </div>
      </section>
    );
  }

  return (
    <section id="about" className="section about-section">
      {/* Background Gradient Shapes */}
      <div className="about-bg-shapes">
        <div className="shape shape-1"></div>
        <div className="shape shape-2"></div>
        <div className="shape shape-3"></div>
      </div>

      <div className="container-custom">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="about-header"
        >
          <span className="section-tag">Get to know me</span>
          <h2 className="section-title-large">About Me</h2>
        </motion.div>

        {/* About Content */}
        <div className="about-content-grid">
          {/* Left: Profile Image */}
          <motion.div
            variants={slideLeft}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="about-image-section"
          >
            <div className="profile-card">
              {/* Animated Background Circle */}
              <motion.div
                className="profile-bg-circle"
                animate={{
                  scale: [1, 1.1, 1],
                  rotate: [0, 180, 360],
                }}
                transition={{
                  duration: 20,
                  repeat: Infinity,
                  ease: 'linear',
                }}
              />

              {/* Profile Image */}
              <div className="profile-image-wrapper">
                <img
                  src={
                    profile?.profileImage
                  }
                  alt={profile?.fullName || 'Profile'}
                  className="profile-image"
                />
                
              </div>

              {/* Decorative Elements */}
              <div className="decorative-dots dots-1"></div>
              <div className="decorative-dots dots-2"></div>
            </div>
          </motion.div>

          {/* Right: About Info */}
          <motion.div
            variants={slideRight}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="about-info-section"
          >
            {/* Name & Title */}
            <motion.div
              variants={fadeIn}
              transition={{ delay: 0.2 }}
              className="about-intro"
            >
              <h3 className="about-name">
                {profile?.fullName || 'Your Name'}
              </h3>
              <p className="about-role">
                {profile?.title || 'Full Stack Developer'}
              </p>
            </motion.div>

            {/* Bio */}
            <motion.div
              variants={fadeIn}
              transition={{ delay: 0.3 }}
              className="about-description"
            >
              <p>
                {profile?.bio ||
                  "I'm a passionate developer who loves building amazing digital experiences. With a strong foundation in both frontend and backend technologies, I create solutions that are not just functional, but also beautiful and intuitive."}
              </p>
              <p>
                When I'm not coding, you'll find me exploring new technologies,
                contributing to open-source projects, or sharing knowledge with
                the developer community. I believe in writing clean, maintainable
                code and creating products that make a difference.
              </p>
            </motion.div>

            {/* Highlights/Stats Grid */}
            {/* <motion.div
              variants={fadeIn}
              transition={{ delay: 0.4 }}
              className="about-highlights"
            >
              <div className="highlight-card">
                <div className="highlight-icon">
                  <FaCode />
                </div>
                <div className="highlight-content">
                  <h4 className="highlight-number">5+</h4>
                  <p className="highlight-label">Years of Experience</p>
                </div>
              </div>

              <div className="highlight-card">
                <div className="highlight-icon">
                  <FaLaptopCode />
                </div>
                <div className="highlight-content">
                  <h4 className="highlight-number">50+</h4>
                  <p className="highlight-label">Projects Completed</p>
                </div>
              </div>

              <div className="highlight-card">
                <div className="highlight-icon">
                  <FaUsers />
                </div>
                <div className="highlight-content">
                  <h4 className="highlight-number">30+</h4>
                  <p className="highlight-label">Happy Clients</p>
                </div>
              </div>
            </motion.div> */}

            {/* CTA Buttons */}
            <motion.div
              variants={fadeIn}
              transition={{ delay: 0.5 }}
              className="about-actions"
            >
              {profile?.resumeUrl && (
                <Button onClick={openModal}>
                  View CV
                </Button>
              )}
              <button
                onClick={() => {
                  document
                    .getElementById('contact')
                    ?.scrollIntoView({ behavior: 'smooth' });
                }}
                className="btn-contact-outline"
              >
                Get In Touch
              </button>
            </motion.div>

            {/* Tech Stack Tags */}
            <motion.div
              variants={fadeIn}
              transition={{ delay: 0.6 }}
              className="tech-tags"
            >
              <span className="tech-tag">React</span>
              <span className="tech-tag">Node.js</span>
              <span className="tech-tag">MongoDB</span>
              <span className="tech-tag">TypeScript</span>
              <span className="tech-tag">Tailwind CSS</span>
              <span className="tech-tag">Express</span>
            </motion.div>
          </motion.div>
        </div>
      </div>

      <ResumePreviewModal isOpen={isModalOpen} onClose={closeModal}/>
    </section>
  );
};

export default AboutSection;