import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import Input from '../../common/input/Input';
import Textarea from '../../common/textarea/Textarea';
import Button from '../../common/button/Button';
import { FaSave, FaTimes } from 'react-icons/fa';
import './ProjectForm.css';

const ProjectForm = ({ project, onSubmit, onCancel, isSubmitting }) => {
  const [techStackInput, setTechStackInput] = useState('');
  const [techStack, setTechStack] = useState([]);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    defaultValues: project || {
      title: '',
      description: '',
      fullDescription: '',
      thumbnail: '',
      category: 'Web',
      liveUrl: '',
      githubUrl: '',
      featured: false,
    },
  });

  // Load existing tech stack
  useEffect(() => {
    if (project?.techStack) {
      setTechStack(project.techStack);
    }
  }, [project]);

  const handleAddTech = (e) => {
    e.preventDefault();
    if (techStackInput.trim() && !techStack.includes(techStackInput.trim())) {
      setTechStack([...techStack, techStackInput.trim()]);
      setTechStackInput('');
    }
  };

  const handleRemoveTech = (tech) => {
    setTechStack(techStack.filter((t) => t !== tech));
  };

  const onFormSubmit = (data) => {
    onSubmit({
      ...data,
      techStack,
    });
  };

  return (
    <form onSubmit={handleSubmit(onFormSubmit)} className="project-form">
      {/* Title */}
      <Input
        label="Project Title"
        name="title"
        placeholder="My Awesome Project"
        required
        register={register}
        error={errors.title}
      />

      {/* Short Description */}
      <Textarea
        label="Short Description"
        name="description"
        placeholder="A brief description (200 characters max)"
        required
        rows={3}
        register={register}
        error={errors.description}
      />

      {/* Full Description */}
      <Textarea
        label="Full Description"
        name="fullDescription"
        placeholder="Detailed project description..."
        required
        rows={6}
        register={register}
        error={errors.fullDescription}
      />

      {/* Thumbnail URL */}
      <Input
        label="Thumbnail Image URL"
        name="thumbnail"
        placeholder="https://example.com/image.jpg"
        required
        register={register}
        error={errors.thumbnail}
      />

      {/* Category */}
      <div className="form-group">
        <label className="form-label">
          Category <span className="text-[--primary]">*</span>
        </label>
        <select {...register('category')} className="form-select">
          <option value="Web">Web</option>
          <option value="Mobile">Mobile</option>
          <option value="Design">Design</option>
          <option value="Other">Other</option>
        </select>
      </div>

      {/* Tech Stack */}
      <div className="form-group">
        <label className="form-label">Tech Stack</label>
        <div className="tech-stack-input-wrapper">
          <input
            type="text"
            value={techStackInput}
            onChange={(e) => setTechStackInput(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleAddTech(e)}
            placeholder="e.g., React (press Enter to add)"
            className="tech-input"
          />
          <button onClick={handleAddTech} className="add-tech-btn">
            Add
          </button>
        </div>

        {/* Tech Stack Tags */}
        {techStack.length > 0 && (
          <div className="tech-stack-tags">
            {techStack.map((tech, index) => (
              <span key={index} className="tech-tag-item">
                {tech}
                <button
                  type="button"
                  onClick={() => handleRemoveTech(tech)}
                  className="remove-tech-btn"
                >
                  ×
                </button>
              </span>
            ))}
          </div>
        )}
      </div>

      {/* Live URL */}
      <Input
        label="Live Demo URL"
        name="liveUrl"
        placeholder="https://project-demo.com"
        register={register}
        error={errors.liveUrl}
      />

      {/* GitHub URL */}
      <Input
        label="GitHub Repository URL"
        name="githubUrl"
        placeholder="https://github.com/username/repo"
        register={register}
        error={errors.githubUrl}
      />

      {/* Featured Checkbox */}
      <div className="form-group checkbox-group">
        <label className="checkbox-label">
          <input
            type="checkbox"
            {...register('featured')}
            className="checkbox-input"
          />
          <span>Featured Project</span>
        </label>
        <p className="checkbox-hint">
          Featured projects appear on the home page
        </p>
      </div>

      {/* Form Actions */}
      <div className="form-actions">
        <Button
          type="button"
          onClick={onCancel}
          variant="outline"
          disabled={isSubmitting}
        >
          <FaTimes /> Cancel
        </Button>
        <Button type="submit" variant="primary" disabled={isSubmitting}>
          <FaSave /> {isSubmitting ? 'Saving...' : 'Save Project'}
        </Button>
      </div>
    </form>
  );
};

export default ProjectForm;