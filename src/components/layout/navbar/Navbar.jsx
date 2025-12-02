import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { HiMenu, HiX } from 'react-icons/hi';
import { FaGithub, FaLinkedin, FaTwitter, FaWhatsapp } from 'react-icons/fa';
import './Navbar.css';
import Button from '../../common/button/Button';
import useProfile from '../../../hooks/useProfile';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { profile } = useProfile()

  const responsiveSize = window.innerWidth <= 640

  const handleDownload =  () => {
    const link = document.createElement('a');
    link.href = '/resume.pdf';
    link.download = 'Abbas_Abubakar_resume.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };


  const navLinks = [
    { name: 'About', href: '#about' },
    { name: 'Projects', href: '#projects' },
    { name: 'Skills', href: '#skills' },
    { name: 'Contact', href: '#contact' },
  ];

  const socialLinks = [
    { icon: <FaLinkedin size={20} />, url: profile?.social?.linkedin },
    { icon: <FaGithub size={20} />, url: profile?.social?.github },
    { icon: <FaWhatsapp size={20} />, url: profile?.social?.whatsapp },
  ];

  return (
    <>
      {/* Top Bar: Social Links + Resume */}
      <div className="top-bar">
          <a className='logo' href="/">Abbas Abubakar</a>
        <div className='nav-header'>
          <div className="social-bar">
          {socialLinks.map((link, index) => (
            <motion.a
              key={index}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              className="social-icon-top"
              whileHover={{ scale: 1.1, color: 'var(--primary)', borderBlock: '1px solid var(--primary)'}}
              whileTap={{ scale: 0.95 }}
            >
              {link.icon}
            </motion.a>
          ))}
        </div>
        </div>
        <Button onClick={handleDownload} size={responsiveSize && 'sm'}>
            Resume
        </Button>
      </div>

      {/* Vertical Nav Links Sidebar */}
      <nav className="navbar-vertical">
        <ul className="nav-links-vertical">
          {navLinks.map((link) => (
            <li key={link.href}>
              <a href={link.href} className="nav-link-vertical">
                {link.name}
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </>
  );
};

export default Navbar;
