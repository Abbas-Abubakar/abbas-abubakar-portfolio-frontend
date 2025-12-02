// ResumePreviewModal.jsx
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaDownload, FaTimes } from 'react-icons/fa';
import Button from '../../common/button/Button';
import './ResumePreviewModal.css';

const ResumePreviewModal = ({ isOpen, onClose }) => {
  const [loading, setLoading] = useState(true);

  const pdfPath = 'https://Abbas-Abubakar.github.io/abbas-abubakar-portfolio-frontend/resume.pdf';

  const handleDownload = () => {
    const link = document.createElement('a');
    link.href = pdfPath;
    link.download = 'resume.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <React.Fragment key="resume-modal">
          {/* Backdrop */}
          <motion.div
            key="backdrop"
            className="rpm-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            transition={{ duration: 0.2 }}
          />

          {/* Modal */}
          <motion.div
            key="modal"
            className="rpm-modal-container"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.25 }}
          >
            <div className="rpm-modal-content" onClick={(e) => e.stopPropagation()}>
              {/* Header */}
              <div className="rpm-header">
                <h2>CV Preview</h2>
                <button onClick={onClose} className="rpm-close-btn" aria-label="Close preview">
                  <FaTimes size={22} />
                </button>
              </div>

              {/* PDF Viewer */}
              <div className="rpm-pdf-container">
                {loading && (
                  <div className="rpm-loading">
                    <div className="rpm-spinner" />
                    <p>Loading PDF...</p>
                  </div>
                )}
                <iframe
                  src={`${pdfPath}?nocache=${Date.now()}`}
                  className="rpm-iframe"
                  title="Resume Preview"
                  onLoad={() => setLoading(false)}
                />
              </div>

              {/* Action buttons */}
              <div className="rpm-actions">
                <Button variant="secondary" onClick={onClose} className="rpm-btn-flex-1">
                  Close
                </Button>

                <Button variant="primary" onClick={handleDownload} className="rpm-btn-flex-2">
                  <FaDownload size={16} className="rpm-download-icon" />
                  Download
                </Button>
              </div>
            </div>
          </motion.div>
        </React.Fragment>
      )}
    </AnimatePresence>
  );
};

export default ResumePreviewModal;
