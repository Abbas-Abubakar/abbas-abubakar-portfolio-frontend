import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaGithub, FaExternalLinkAlt, FaTimes } from 'react-icons/fa';
import Card from '../../../common/card/Card';
import './ProjectCard.css';

const ProjectCard = ({ project }) => {
  const [showModal, setShowModal] = useState(false);

  // Prevent body scroll when modal is open
  useEffect(() => {
    if (showModal) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    
    // Cleanup on unmount
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [showModal]);

  return (
    <>
      {/* Project Card */}
      <Card className="project-card" onClick={() => setShowModal(true)}>
        <div className="project-thumbnail">
          <img src={project.thumbnail} alt={project.title} />
          <div className="project-overlay">
            <span className="view-details">View Details</span>
          </div>
        </div>

        <div className="project-info">
          <h3 className="project-title">{project.title}</h3>
          <p className="project-description">{project.description}</p>

          <div className="tech-stack">
            {project.techStack.slice(0, 3).map((tech, index) => (
              <span key={index} className="tech-tag">
                {tech}
              </span>
            ))}
            {project.techStack.length > 3 && (
              <span className="tech-tag">+{project.techStack.length - 3}</span>
            )}
          </div>
        </div>
      </Card>

      {/* Project Modal */}
      <AnimatePresence>
        {showModal && (
          <motion.div
            className="modal-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setShowModal(false)}
          >
            <motion.div
              className="modal-content"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close Button */}
              <button
                className="modal-close"
                onClick={() => setShowModal(false)}
              >
                <FaTimes size={24} />
              </button>

              {/* Modal Body */}
              <div className="modal-body">
                <img
                  src={project.thumbnail}
                  alt={project.title}
                  className="modal-image"
                />

                <h2 className="modal-title">{project.title}</h2>

                <p className="modal-description">{project.fullDescription}</p>

                {/* Tech Stack */}
                <div className="modal-tech-stack">
                  {project.techStack.map((tech, index) => (
                    <span key={index} className="modal-tech-tag">
                      {tech}
                    </span>
                  ))}
                </div>

                {/* Links */}
                <div className="modal-links">
                  {project.githubUrl && (
                    <a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="modal-link"
                    >
                      <FaGithub /> View Code
                    </a>
                  )}
                  {project.liveUrl && (
                    <a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="modal-link modal-link-primary"
                    >
                      <FaExternalLinkAlt /> Live Demo
                    </a>
                  )}
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default ProjectCard;