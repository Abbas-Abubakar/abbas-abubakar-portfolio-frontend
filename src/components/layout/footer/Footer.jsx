import React from 'react';
import { FaGithub, FaLinkedin, FaTwitter, FaWhatsapp } from 'react-icons/fa';
import useProfile from '../../../hooks/useProfile';
import { motion } from 'framer-motion';
import './Footer.css';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  const { profile } = useProfile()

  const socialLinks = [
    { icon: <FaGithub size={20} />, url: profile?.social?.github },
    { icon: <FaLinkedin size={20} />, url: profile?.social?.linkedin },
    { icon: <FaWhatsapp size={20} />, url: profile?.social?.whatsapp },
  ];

  return (
    <footer className="footer">
      <div className="footer-content container-custom">
        <div className="footer-inner">
          {/* Copyright */}
          <p className="footer-text">
            © {currentYear} Abbas H Abubakar
          </p>

          {/* Social Links */}
          <div className="footer-social">
            {socialLinks.map((link, index) => (
              <motion.a
                key={index}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="footer-social-link"
                whileHover={{ scale: 1.1, y: -3 }}
                whileTap={{ scale: 0.95 }}
              >
                {link.icon}
              </motion.a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;