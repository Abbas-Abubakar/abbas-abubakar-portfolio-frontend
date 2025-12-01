import React from 'react';
import { motion } from 'framer-motion';
import { staggerContainer, staggerItem } from '../../../utils/animations';
import useFetch from '../../../hooks/useFetch';
import { getProjects } from '../../../services/projectService';
import ProjectCard from '../projects/projects-card/ProjectCard';
import Loader from '../../common/loader/Loader';
import './ProjectSection.css';

const ProjectsSection = () => {
  const { data: projects, loading, error } = useFetch(getProjects);

  return (
    <section id="projects" className="section projects-section">
      <div className="container-custom">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="section-header"
        >
          <h2 className="section-title">Featured Projects</h2>
          <p className="section-subtitle">
            Some of the projects I've worked on recently
          </p>
        </motion.div>

        {/* Projects Grid */}
        {loading ? (
          <Loader />
        ) : error ? (
          <p className="error-message">{error}</p>
        ) : (
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-100px' }}
            className="projects-grid"
          >
            {projects?.map((project) => (
              <motion.div key={project._id} variants={staggerItem}>
                <ProjectCard project={project} />
              </motion.div>
            ))}
          </motion.div>
        )}

        {!loading && projects?.length === 0 && (
          <p className="no-projects">No projects yet. Check back soon!</p>
        )}
      </div>
    </section>
  );
};

export default ProjectsSection;