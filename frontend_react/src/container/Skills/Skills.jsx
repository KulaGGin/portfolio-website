import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { AppWrap, MotionWrap } from '../../wrapper'
import { urlFor, client } from '../../client';
import {EducationalMaterial, FeaturedSkill, IndexTreeAssembler, Project, TextContainer} from '../../components'

import './Skills.scss';

const Skills = () => {
  const [experience, setExperience] = useState([]);
  const [skills, setSkills] = useState([]);
  const [animateCard, setAnimateCard] = useState({ y: 0, opacity: 1 });
  const [currentSkill, setCurrentSkill] = useState(null);

  useEffect(() => {
    const query = '*[_type == "experiences"]';
    const skillsQuery = '*[ _type == "skills" ]{ ..., "works": *[ _type == "works" && _id in ^.works[]._ref ], "educationalMaterials": *[ _type == "educationalMaterials" && _id in ^.educationalMaterials[]._ref ], }'

    client.fetch(query).then((data) => {
      setExperience(data);
    });

    client.fetch(skillsQuery).then((data) => {
      setSkills(data);
      setCurrentSkill(data[0]);
    });
  }, []);

  const HideCurrentSkill = (SkillIndex) => {
    setAnimateCard([{y:100, opacity: 0}])
  }

  const ShowCurrentSkill = (SkillIndex) => {
    setAnimateCard([{y:0, opacity: 1}])
  }

  const SkillCategoryClicked_EventHandler = (SkillIndex) => {
    HideCurrentSkill(SkillIndex);

    setTimeout(() => {
      UpdateCurrentSkill(SkillIndex);
      ShowCurrentSkill(SkillIndex);
    }, 500);
  }

  const UpdateCurrentSkill = (CurrentSkillIndex) => {
    if(Array.isArray(skills) && skills.length) {

      setCurrentSkill(skills[CurrentSkillIndex]);
      // const indexTreeAssembler = new IndexTreeAssembler();
      // skill.indexTree = indexTreeAssembler.assemble(skill.knowledgeIndex);
    }
  }

  return (
    <>
      <h2 className="head-text">Skills & Experience</h2>
      <p className="p-text">Click on the skills below to see their detailed description.</p>
      <div className="app__skills-container">
        <motion.div
            transition={{duration: 0.5, delayChildren: 0.5}}
            className="app__skills-list">
          {skills.map((skill, index) => (
              <motion.div
                  whileInView={{opacity: [0, 1]}}
                  transition={{duration: 0.5}}
                  className="app__skills-item app__flex"
                  onClick={() => {
                    SkillCategoryClicked_EventHandler(index)
                  }}
                  key={skill.name + index}
              >
                <div
                    className="app__flex"
                    style={{backgroundColor: skill.bgColor}}
                >
                  <img src={urlFor(skill.icon)} alt={skill.name}/>
                </div>
                <p className="app__skills-item-text">{skill.name}</p>
              </motion.div>
          ))}
        </motion.div>
        <motion.div animate={animateCard} transition={{duration: 0.5, delayChildren: 0.5}}>
          <FeaturedSkill skill={currentSkill}/>
        </motion.div>
      </div>
    </>
  );
};

export default AppWrap(
    MotionWrap(Skills, 'app__skills'),
    'skills',
    "app__whitebg"
);