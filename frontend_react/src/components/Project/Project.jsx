import React from 'react';
import {urlFor} from "../../client";
import {motion} from "framer-motion";
import {AiFillEye, AiFillGithub} from "react-icons/ai";

import scssVars from './Project.scss';

const Project = (props) => {
  const project = props.project;
  const cn = scssVars.cn;
  return (
      <div className={`${props.classNames} ${cn}`}>
        <div className={`${cn}-imageContainer app__flex`}>
          {project.imgUrl &&
              <img className={`${cn}-image`} src={urlFor(project.imgUrl)} alt={project.name}/>
          }

          <motion.div
              whileHover={{opacity: [0, 1]}}
              transition={{duration: 0.25, ease: 'easeInOut', staggerChildren: 0.5}}
              className={`${cn}-hover  app__flex`}
          >
            <a href={project.projectLink} target="_blank" rel="noreferrer">
              <motion.div
                  whileInView={{scale: [0, 1]}}
                  whileHover={{scale: [1, 0.9]}}
                  transition={{duration: 0.25}}
                  className={`${cn}-linkIconContainer  app__flex`}
              >
                <AiFillEye className={`${cn}-linkIcon`}/>
              </motion.div>
            </a>
            <a href={project.codeLink} target="_blank" rel="noreferrer">
              <motion.div
                  whileInView={{scale: [0, 1]}}
                  whileHover={{scale: [1, 0.9]}}
                  transition={{duration: 0.25}}
                  className={`${cn}-linkIconContainer app__flex`}
              >
                <AiFillGithub className={`${cn}-linkIcon`}/>
              </motion.div>
            </a>
          </motion.div>
        </div>
        <div className={`${cn}-content app__flex`}>
          <h4 className={`${cn}-title bold-text`}>{project.title}</h4>
          <p className="p-text" style={{marginTop: 10}}>{project.description}</p>
          <div className={`${cn}-tag app__flex`}>
            {project.tags &&
                <p className="p-text">{project.tags[0]}</p>
            }
          </div>
        </div>
      </div>
  );
};

export default Project;
