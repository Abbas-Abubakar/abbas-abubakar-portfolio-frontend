import React from 'react';
import { motion } from 'framer-motion';
import { pageTransition } from '../../utils/animations';
import './Home.css';
import Hero from '../../components/home/hero/Hero';
import ProjectsSection from '../../components/home/projects/ProjectSection';
import AboutSection from '../../components/home/about/About';
import ContactSection from '../../components/home/contact/Contact';
import SkillsSection from '../../components/home/skills/Skills';

const Home = () => {
  return (
    <motion.div
      variants={pageTransition}
      initial="initial"
      animate="animate"
      exit="exit"
      className="home-page"
    >
      <>
        <Hero/>
        <AboutSection/>
        <ProjectsSection/>
        <SkillsSection/>
        <ContactSection/>
      </>
    </motion.div>
  );
};

export default Home;