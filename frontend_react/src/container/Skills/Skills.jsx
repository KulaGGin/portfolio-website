import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { AppWrap, MotionWrap } from '../../wrapper'
import { urlFor, client } from '../../client';
import { FeaturedSkill, IndexTreeAssembler } from '../../components'

import './Skills.scss';

const Skills = () => {
  const [experience, setExperience] = useState([]);
  const [skills, setSkills] = useState([]);
  const [activeSkillIndex, setActiveSkillIndex] = useState(1);

  useEffect(() => {
    const query = '*[_type == "experiences"]';
    const skillsQuery = '*[ _type == "skills" ]{ ..., "works": *[ _type == "works" && _id in ^.works[]._ref ], "educationalMaterials": *[ _type == "educationalMaterials" && _id in ^.educationalMaterials[]._ref ], }'

    client.fetch(query).then((data) => {
      setExperience(data);
    });

    client.fetch(skillsQuery).then((data) => {
      setSkills(data);
    });
  }, []);

  return (
    <>
      <h2 className="head-text">Skills & Experience</h2>
      <div className="app__skills-container">
        <motion.div className="app__skills-list">
          {skills.map((skill, index) => (
            <motion.div
              whileInView={{ opacity: [0, 1] }}
              transition={{ duration: 0.5 }}
              className="app__skills-item app__flex"
              onClick= { () => { setActiveSkillIndex(index) } }
              key={skill.name + index}
            >
              <div
                className="app__flex"
                style={{ backgroundColor: skill.bgColor }}
              >
                <img src={urlFor(skill.icon)} alt={skill.name} />
              </div>
              <p className="p-text">{skill.name}</p>
            </motion.div>
          ))}
        </motion.div>
        {
          (() => {
            if(Array.isArray(skills) && skills.length) {

              let skill = skills[activeSkillIndex]

              const indexTreeAssembler = new IndexTreeAssembler();
              skill.indexTree = indexTreeAssembler.assemble(skill.knowledgeIndex);

              return <FeaturedSkill skill={skill} />
            }
          })()
        }
      </div>
    </>
  );
};

export default AppWrap(
  MotionWrap(Skills, 'app__skills'),
  'skills',
  "app__whitebg"
);