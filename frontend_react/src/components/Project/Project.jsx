import React from 'react';
import { urlFor } from "../../client";
import { motion } from "framer-motion";
import { AiFillEye, AiFillGithub } from "react-icons/ai";

import './Project.scss'

const Project = (props) => {
  const project = props.project;

  return (
    <div className='app__project app__flex'>
      <div className='app__project-imageContainer app__flex'>
        <img className="app__project-image" src={urlFor(project.imgUrl)} alt={project.name}/>
        <motion.div
          whileHover={{ opacity: [0, 1] }}
          transition={{ duration: 0.25, ease: 'easeInOut', staggerChildren: 0.5 }}
          className="app__project-hover app__flex"
        >
          <a href={project.projectLink} target="_blank" rel="noreferrer">
            <motion.div
              whileInView={{ scale: [0, 1] }}
              whileHover={{ scale: [1, 0.9] }}
              transition={{ duration: 0.25 }}
              className="app__project-linkIconContainer app__flex"
            >
              <AiFillEye className="app__project-linkIcon"/>
            </motion.div>
          </a>
          <a href={project.codeLink} target="_blank" rel="noreferrer">
            <motion.div
              whileInView={{ scale: [0, 1] }}
              whileHover={{ scale: [1, 0.9] }}
              transition={{ duration: 0.25 }}
              className="app__project-linkIconContainer app__flex"
            >
              <AiFillGithub className="app__project-linkIcon"/>
            </motion.div>
          </a>
        </motion.div>
      </div>
      <div className="app__project-content app__flex">
        <h4 className="app__project-title bold-text">{project.title}</h4>
        <p className="p-text" style={{ marginTop: 10 }}>{project.description}</p>
        <div className="app__project-tag app__flex">
          <p className="p-text">{project.tags[0]}</p>
        </div>
      </div>
    </div>
  );
};

export default Project;
