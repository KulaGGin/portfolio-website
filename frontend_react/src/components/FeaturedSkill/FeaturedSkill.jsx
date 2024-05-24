import React from 'react';

import Collapsible from "react-collapsible";
import { motion } from "framer-motion";
import { urlFor } from "../../client";
import { TextContainer, Project, EducationalMaterial } from "../index";

import scssVars from './FeaturedSkill.scss';

const FeaturedSkill = (props) => {
  const cn = scssVars.cn;
  const styles = scssVars;
  const skill = props.skill;

  function traverseIndexTree(node) {
    if(!node.children.length) {
      return <p className={`${cn}-indexNode-leaf`} key={node.name}>{node.name}</p>
    }

    return <Collapsible trigger={node.name} key={node.name}>
      {
        node.children.map((item, number) => (
          traverseIndexTree(item)
        ))
      }
    </Collapsible>
  }

  return (
    <motion.div
      whileInView={{ opacity: [0, 1] }}
      transition={{ duration: 0.5 }}
      className={`${cn}`}
    >
      {/*<div className="app__featuredSkill-main">*/}
      {/*  <h2>{skill.name}</h2>*/}
      {/*  <img src={urlFor(skill.icon)} alt={skill.name} className={`${styles.image}`} style={{ backgroundColor: skill.bgColor }} />*/}
      {/*  {skill.description !== undefined &&*/}
      {/*  <TextContainer classNames={`${cn}-descriptionContainer`}>*/}
      {/*    <p className={styles.description}>{skill.description}</p>*/}
      {/*  </TextContainer>*/}
      {/*  }*/}
      {/*</div>*/}
      <div className="app__featuredSkill-secondary">
        <div className="app__featuredSkill-projects">
          <h2>Projects</h2>
          <TextContainer classNames={`${cn}-descriptionContainer`}>
            <p>Projects in which I applied the skill.</p>
          </TextContainer>
          <div className="app__featuredSkill-projectsContainer">
            {
              skill.works.map((work, index) => (
                <Project project={work} classNames="app__featuredSkill-project" key={`app__skills-featuredSkill-project-${work._id}-${index}`} />
              ))
            }
          </div>
        </div>
        {/*<div className="app__featuredSkill-index">*/}
        {/*  <h2>Index</h2>*/}
        {/*  <TextContainer classNames={`${cn}-descriptionContainer`}>*/}
        {/*    <p>*/}
        {/*      This is index of things that this skill includes.<br/>*/}
        {/*      Click on an item to expand, or click on the Expand All button to expand all.*/}
        {/*    </p>*/}
        {/*  </TextContainer>*/}
        {/*  <TextContainer classNames={`${cn}-indexContainer`}>*/}
        {/*    <div className="app__featuredSkill-indexList">*/}
        {/*      {*/}
        {/*        skill.indexTree.children.map((indexItem, numbfer) => (*/}
        {/*          traverseIndexTree(indexItem)*/}
        {/*        ))*/}
        {/*      }*/}
        {/*    </div>*/}
        {/*  </TextContainer>*/}

        {/*</div>*/}
        <div className="app__featuredSkill-educationalMaterials">
          <h2>Educational Materials</h2>
          <TextContainer classNames={`${cn}-descriptionContainer`}>
            <p>
              Educational materials I used to learn and practice this skill.
            </p>
          </TextContainer>
          <div className="app__featuredSkill-educationalMaterialsContainer">
            {
              skill.educationalMaterials.map((material, index) => (
                <EducationalMaterial educationalMaterial={material} classNames="app__featuredSkill-educationalMaterial" key={`app__skills-featuredSkill-educationalMaterial-${index}`} />
              ))
            }
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default FeaturedSkill;
