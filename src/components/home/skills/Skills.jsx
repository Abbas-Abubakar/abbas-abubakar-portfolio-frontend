import React from 'react';
import { motion } from 'framer-motion';
import { staggerContainer, staggerItem } from '../../../utils/animations';
import { DiMsqlServer } from "react-icons/di";
import useProfile from '../../../hooks/useProfile';
import Loader from '../../common/loader/Loader';
import {
  SiReact,
  SiHtml5,
  SiNodedotjs,
  SiMongodb,
  SiJavascript,
  SiTypescript,
  SiTailwindcss,
  SiGit,
  SiDocker,
  SiPostgresql,
  SiExpress,
  SiNextdotjs,
  SiPython,
  SiCss3,
  SiFlutter,
  SiDart,
  SiSqlalchemy,
  SiFirebase,
  SiFigma,
} from 'react-icons/si';
import './Skills.css';

const SkillsSection = () => {
  const { profile, loading } = useProfile();

  // Icon mapping for skills
  const skillIcons = {
    react: <SiReact />,
    'Node.js': <SiNodedotjs />,
    mongodb: <SiMongodb />,
    html5: <SiHtml5 />,
    css3: <SiCss3 />,
    flutter: <SiFlutter />,
    dart: <SiDart />,
    sql: <DiMsqlServer />,
    "express.js": <SiExpress />,
    "node.js": <SiNodedotjs />,
    javascript: <SiJavascript />,
    typescript: <SiTypescript />,
    'tailwind css': <SiTailwindcss />,
    git: <SiGit />,
    docker: <SiDocker />,
    postresql: <SiPostgresql />,
    express: <SiExpress />,
    'Next.js': <SiNextdotjs />,
    python: <SiPython />,
    firebase: <SiFirebase />,
    figma: <SiFigma />
  };

  const skillColors = {
    react: "#61DBFB",
    "node.js": "#83CD29",
    mongodb: "#4DB33D",
    html5: "#E34F26",
    css3: "#1572B6",
    flutter: "#02569B",
    dart: "#0175C2",
    express: "#000000",
    javascript: "#F7DF1E",
    typescript: "#3178C6",
    "tailwind css": "#38BDF8",
    git: "#F05033",
    docker: "#0DB7ED",
    postgresql: "#336791",
    nextjs: "#000000",
    python: "#3776AB",
    firebase: "#FFCA28",
    figma: "#F24E1E",
  };


  // Group skills by category
  const groupedSkills = profile?.skills?.reduce((acc, skill) => {
    if (!acc[skill.category]) {
      acc[skill.category] = [];
    }
    acc[skill.category].push(skill);
    return acc;
  }, {});

  if (loading) {
    return (
      <section id="skills" className="section skills-section">
        <div className="container-custom">
          <Loader />
        </div>
      </section>
    );
  }

  return (
    <section id="skills" className="section skills-section">
      <div className="container-custom">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="section-header"
        >
          <h2 className="section-title">Skills & Technologies</h2>
          <p className="section-subtitle">
            Tools and technologies I work with
          </p>
        </motion.div>

        {/* Skills Grid by Category */}
        <div className="skills-container">
          {groupedSkills && Object.entries(groupedSkills).map(([category, skills]) => (
            <motion.div
              key={category}
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-100px' }}
              className="skills-category"
            >
              <h3 className="category-title">{category}</h3>
              <div className="skills-grid">
                {skills.map((skill, index) => (
                  <motion.div
                    key={index}
                    variants={staggerItem}
                    whileHover={{ y: -5 }}
                    className="skill-card"
                  >
                    <div className="skill-icon">
                      {skillIcons[skill.name.toLowerCase()] &&
                        React.cloneElement(skillIcons[skill.name.toLowerCase()], {
                          style: { color: skillColors[skill.name.toLowerCase()] }
                        })
                      }
                      {!skillIcons[skill.name.toLowerCase()] && (
                        <div className="skill-icon-fallback">
                          {skill.name.charAt(0)}
                        </div>
                      )}
                    </div>

                    <div className="skill-info">
                      <h4 className="skill-name">{skill.name}</h4>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          ))}

          {/* Fallback if no skills in profile */}
          {(!groupedSkills || Object.keys(groupedSkills).length === 0) && (
            <p className="no-skills">No skills added yet.</p>
          )}
        </div>
      </div>
    </section>
  );
};

export default SkillsSection;