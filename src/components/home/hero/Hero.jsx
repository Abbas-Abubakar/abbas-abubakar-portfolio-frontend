import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { slideUp, fadeIn } from '../../../utils/animations';
import useProfile from '../../../hooks/useProfile';
import Button from '../../common/button/Button';
import './Hero.css';
import Loader from '../../common/loader/Loader';

const Hero = () => {
  const { profile, loading } = useProfile();
  const navigate = useNavigate();
  const [displayedText, setDisplayedText] = useState('');
  const fullText = profile?.title || 'Full Stack Developer';

  // Typing animation effect
  useEffect(() => {
    let index = 0;
    const timer = setInterval(() => {
      if (index <= fullText.length) {
        setDisplayedText(fullText.slice(0, index));
        index++;
      } else {
        clearInterval(timer);
      }
    }, 50);

    return () => clearInterval(timer);
  }, [fullText]);

  const scrollToContact = () => {
    const contactSection = document.getElementById('contact');
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Dot grid background
  const DotGrid = () => (
    <div className="dot-grid">
      {Array.from({ length: 15 }).map((_, rowIndex) => (
        <div key={rowIndex} className="dot-row">
          {Array.from({ length: 25 }).map((_, colIndex) => (
            <motion.div
              key={colIndex}
              className="dot"
              initial={{ opacity: 0.1 }}
              animate={{ opacity: [0.1, 0.3, 0.1] }}
              transition={{
                duration: 2,
                repeat: Infinity,
                delay: (rowIndex + colIndex) * 0.05,
              }}
            />
          ))}
        </div>
      ))}
    </div>
  );

  if (loading) {
    return (
      <section id="about" className="hero-section">
        <div className="container-custom">
          <Loader/>
        </div>
      </section>
    );
  }

  return (
    <section className="hero-section">
      {/* Animated Dot Grid Background */}
      <DotGrid />

      <div className="container-custom hero-content">
        <motion.div
          initial="hidden"
          animate="visible"
          className="hero-text"
        >
          {/* Main Heading */}
          <motion.h1 variants={slideUp} className="hero-heading">
            Hi, I'm {profile?.fullName || ''}
            <motion.span
              className="blue-dot"
              animate={{
                scale: [1, 1.2, 1],
                opacity:  [0.3, 0.8, 0.3],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
              }}
            >
              .
            </motion.span>
          </motion.h1>

          {/* Subtitle with typing effect */}
          <motion.p variants={fadeIn} className="hero-subtitle">
            I'm a{' '}
            <span className="primary-text">
              {profile?.title}
              <span className="cursor">|</span>
            </span>
          </motion.p>

          {/* Bio */}
          <motion.p
            variants={fadeIn}
            transition={{ delay: 0.3 }}
            className="hero-bio"
          >
            {profile?.tagline ||
              "I've spent the last 5 years building and scaling software for some pretty cool companies. I also teach people to paint online (incase you've got an empty canvas layin' around 🎨). Let's connect!"}
          </motion.p>

          {/* CTA Button */}
          <motion.div
            variants={fadeIn}
            transition={{ delay: 0.5 }}
            className="hero-cta"
          >
            <Button onClick={scrollToContact} variant="primary">
              Contact Me
            </Button>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;