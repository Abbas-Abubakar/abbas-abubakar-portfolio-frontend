import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { fadeIn, staggerContainer, staggerItem } from '../../utils/animations';
import useAuth from '../../hooks/useAuth';
import useFetch from '../../hooks/useFetch';
import { getProjects, deleteProject } from '../../services/projectService';
import { getContactMessages } from '../../services/contactService';
import Button from '../../components/common/button/Button';
import Loader from '../../components/common/loader/Loader';
import ProjectManager from '../../components/admin/project-manager/ProjectManager';
import './AdminDashboard.css';

const AdminDashboard = () => {
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const [activeTab, setActiveTab] = useState('overview');

  const {
    data: projects,
    loading: projectsLoading,
    refetch: refetchProjects,
  } = useFetch(getProjects);

  const {
    data: messages,
    loading: messagesLoading,
  } = useFetch(getContactMessages);

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const tabs = [
    { id: 'overview', label: 'Overview' },
    { id: 'projects', label: 'Projects' },
    { id: 'messages', label: 'Messages' },
    { id: 'profile', label: 'Profile' },
  ];

  return (
    <div className="admin-dashboard">
      {/* Sidebar */}
      <aside className="admin-sidebar">
        <div className="sidebar-header">
          <h2 className="sidebar-title">Admin Panel</h2>
          <p className="sidebar-user">Welcome, {user?.name}</p>
        </div>

        <nav className="sidebar-nav">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`sidebar-link ${
                activeTab === tab.id ? 'active' : ''
              }`}
            >
              {tab.label}
            </button>
          ))}
        </nav>

        <div className="sidebar-footer">
          <Button onClick={() => navigate('/')} variant="ghost">
            View Site
          </Button>
          <Button onClick={handleLogout} variant="outline">
            Logout
          </Button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="admin-main">
        <div className="admin-content">
          {/* Overview Tab */}
          {activeTab === 'overview' && (
            <motion.div
              variants={fadeIn}
              initial="hidden"
              animate="visible"
              className="overview-section"
            >
              <h1 className="page-title">Dashboard Overview</h1>

              {/* Stats Cards */}
              <motion.div
                variants={staggerContainer}
                initial="hidden"
                animate="visible"
                className="stats-grid"
              >
                <motion.div variants={staggerItem} className="stat-card">
                  <div className="stat-icon">📁</div>
                  <div className="stat-info">
                    <h3 className="stat-number">
                      {projects?.length || 0}
                    </h3>
                    <p className="stat-label">Total Projects</p>
                  </div>
                </motion.div>

                <motion.div variants={staggerItem} className="stat-card">
                  <div className="stat-icon">✉️</div>
                  <div className="stat-info">
                    <h3 className="stat-number">
                      {messages?.length || 0}
                    </h3>
                    <p className="stat-label">Messages</p>
                  </div>
                </motion.div>

                <motion.div variants={staggerItem} className="stat-card">
                  <div className="stat-icon">⭐</div>
                  <div className="stat-info">
                    <h3 className="stat-number">
                      {projects?.filter((p) => p.featured).length || 0}
                    </h3>
                    <p className="stat-label">Featured Projects</p>
                  </div>
                </motion.div>

                <motion.div variants={staggerItem} className="stat-card">
                  <div className="stat-icon">📬</div>
                  <div className="stat-info">
                    <h3 className="stat-number">
                      {messages?.filter((m) => !m.read).length || 0}
                    </h3>
                    <p className="stat-label">Unread Messages</p>
                  </div>
                </motion.div>
              </motion.div>

              {/* Quick Actions */}
              <div className="quick-actions">
                <h2 className="section-title">Quick Actions</h2>
                <div className="actions-grid">
                  <Button
                    onClick={() => setActiveTab('projects')}
                    variant="primary"
                  >
                    Manage Projects
                  </Button>
                  <Button
                    onClick={() => setActiveTab('messages')}
                    variant="secondary"
                  >
                    View Messages
                  </Button>
                  <Button
                    onClick={() => setActiveTab('profile')}
                    variant="outline"
                  >
                    Edit Profile
                  </Button>
                </div>
              </div>
            </motion.div>
          )}

          {/* Projects Tab */}
          {activeTab === 'projects' && (
            <motion.div
              variants={fadeIn}
              initial="hidden"
              animate="visible"
            >
              <ProjectManager
                projects={projects}
                loading={projectsLoading}
                refetch={refetchProjects}
              />
            </motion.div>
          )}

          {/* Messages Tab */}
          {activeTab === 'messages' && (
            <motion.div
              variants={fadeIn}
              initial="hidden"
              animate="visible"
            >
              <h1 className="page-title">Contact Messages</h1>

              {messagesLoading ? (
                <Loader />
              ) : messages && messages.length > 0 ? (
                <div className="messages-list">
                  {messages.map((message) => (
                    <div key={message._id} className="message-card">
                      <div className="message-header">
                        <h3 className="message-name">{message.name}</h3>
                        <span
                          className={`message-status ${
                            message.read ? 'read' : 'unread'
                          }`}
                        >
                          {message.read ? 'Read' : 'Unread'}
                        </span>
                      </div>
                      <p className="message-email">{message.email}</p>
                      {message.subject && (
                        <p className="message-subject">
                          Subject: {message.subject}
                        </p>
                      )}
                      <p className="message-text">{message.message}</p>
                      <p className="message-date">
                        {new Date(message.createdAt).toLocaleDateString()}
                      </p>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="no-data">No messages yet</p>
              )}
            </motion.div>
          )}

          {/* Profile Tab */}
          {activeTab === 'profile' && (
            <motion.div
              variants={fadeIn}
              initial="hidden"
              animate="visible"
            >
              <h1 className="page-title">Profile Management</h1>
              <p className="coming-soon">Profile editor coming soon...</p>
            </motion.div>
          )}
        </div>
      </main>
    </div>
  );
};

export default AdminDashboard;