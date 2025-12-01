import React from 'react';
import { motion } from 'framer-motion';
import './Card.css';

const Card = ({ children, className = '', hover = true, onClick }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      whileHover={hover ? { y: -8 } : {}}
      transition={{ duration: 0.3 }}
      className={`card ${className}`}
      onClick={onClick}
    >
      {children}
    </motion.div>
  );
};

export default Card;