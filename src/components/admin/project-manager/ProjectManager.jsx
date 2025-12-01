import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { fadeIn, staggerContainer, staggerItem } from '../../../utils/animations';
import { createProject, updateProject, deleteProject } from '../../../services/projectService';
import Button from '../../common/button/Button';
import Loader from '../../common/loader/Loader';
import ProjectForm from '../project-form/ProjectForm';
import { FaEdit, FaTrash, FaPlus, FaTimes, FaExternalLinkAlt } from 'react-icons/fa';
import './ProjectManager.css';

const ProjectManager = ({ projects, loading, refetch }) => {
  const [showForm, setShowForm] = useState(false);
  const [editingProject, setEditingProject] = useState(null);
  const [deleteConfirm, setDeleteConfirm] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleCreate = () => {
    setEditingProject(null);
    setShowForm(true);
  };

  const handleEdit = (project) => {
    setEditingProject(project);
    setShowForm(true);
  };

  const handleCloseForm = () => {
    setShowForm(false);
    setEditingProject(null);
  };

  const handleSubmit = async (data) => {
    try {
      setIsSubmitting(true);
      
      if (editingProject) {
        await updateProject(editingProject._id, data);
      } else {
        await createProject(data);
      }
      
      await refetch();
      handleCloseForm();
    } catch (error) {
      console.error('Error saving project:', error);
      alert('Failed to save project. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteProject(id);
      await refetch();
      setDeleteConfirm(null);
    } catch (error) {
      console.error('Error deleting project:', error);
      alert('Failed to delete project. Please try again.');
    }
  };

  if (loading) {
    return <Loader />;
  }

  return (
    <div className="project-manager">
      {/* Header */}
      <div className="manager-header">
        <div>
          <h1 className="page-title">Manage Projects</h1>
          <p className="page-subtitle">
            Create, edit, and manage your portfolio projects
          </p>
        </div>
        <Button onClick={handleCreate} variant="primary">
          <FaPlus /> Add New Project
        </Button>
      </div>

      {/* Projects List */}
      {projects && projects.length > 0 ? (
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
          className="projects-list"
        >
          {projects.map((project) => (
            <motion.div
              key={project._id}
              variants={staggerItem}
              className="project-item"
            >
              {/* Project Thumbnail */}
              <div className="project-item-thumbnail">
                <img src={project.thumbnail} alt={project.title} />
                {project.featured && (
                  <span className="featured-badge">⭐ Featured</span>
                )}
              </div>

              {/* Project Details */}
              <div className="project-item-details">
                <h3 className="project-item-title">{project.title}</h3>
                <p className="project-item-description">{project.description}</p>
                
                {/* Tech Stack */}
                <div className="project-item-tags">
                  {project.techStack.slice(0, 4).map((tech, index) => (
                    <span key={index} className="tech-badge">
                      {tech}
                    </span>
                  ))}
                  {project.techStack.length > 4 && (
                    <span className="tech-badge">
                      +{project.techStack.length - 4}
                    </span>
                  )}
                </div>

                {/* Links */}
                <div className="project-item-links">
                  {project.liveUrl && (
                    <a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="project-link"
                    >
                      <FaExternalLinkAlt /> Live Demo
                    </a>
                  )}
                  {project.githubUrl && (
                    <a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="project-link"
                    a>
                      GitHub
                    </a>
                  )}
                </div>
              </div>

              {/* Actions */}
              <div className="project-item-actions">
                <button
                  onClick={() => handleEdit(project)}
                  className="action-btn edit-btn"
                  title="Edit Project"
                >
                  <FaEdit />
                </button>
                <button
                  onClick={() => setDeleteConfirm(project._id)}
                  className="action-btn delete-btn"
                  title="Delete Project"
                >
                  <FaTrash />
                </button>
              </div>
            </motion.div>
          ))}
        </motion.div>
      ) : (
        <div className="no-projects">
          <p>No projects yet. Create your first project!</p>
          <Button onClick={handleCreate} variant="primary">
            <FaPlus /> Create Project
          </Button>
        </div>
      )}

      {/* Project Form Modal */}
      <AnimatePresence>
        {showForm && (
          <motion.div
            className="modal-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleCloseForm}
          >
            <motion.div
              className="modal-container"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="modal-header">
                <h2 className="modal-title">
                  {editingProject ? 'Edit Project' : 'Create New Project'}
                </h2>
                <button onClick={handleCloseForm} className="modal-close-btn">
                  <FaTimes />
                </button>
              </div>

              <div className="modal-body">
                <ProjectForm
                  project={editingProject}
                  onSubmit={handleSubmit}
                  onCancel={handleCloseForm}
                  isSubmitting={isSubmitting}
                />
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Delete Confirmation Modal */}
      <AnimatePresence>
        {deleteConfirm && (
          <motion.div
            className="modal-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setDeleteConfirm(null)}
          >
            <motion.div
              className="confirm-modal"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
            >
              <h3 className="confirm-title">Delete Project?</h3>
              <p className="confirm-text">
                Are you sure you want to delete this project? This action cannot
                be undone.
              </p>
              <div className="confirm-actions">
                <Button
                  onClick={() => setDeleteConfirm(null)}
                  variant="outline"
                >
                  Cancel
                </Button>
                <Button
                  onClick={() => handleDelete(deleteConfirm)}
                  variant="primary"
                  className="delete-confirm-btn"
                >
                  Delete
                </Button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ProjectManager;