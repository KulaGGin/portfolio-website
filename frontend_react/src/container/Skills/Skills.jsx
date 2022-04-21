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
    const skillsQuery = '*[ _type == "skills" ]{ ..., "works": *[ _type == "works" && _id in ^.works[]._ref ], }'

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

              skill.description = "I am a proficient git user: I know how to keep the commit history clean" +
                " and I use features like interactive rebase and rebase --onto to achieve it."
              skill.educationalMaterials = [
                {
                  authors: ["Scott Chacon", "Ben Straub"],
                  name: "Pro Git",
                  description: "Git has taken the open source world by storm since its inception in 2005, and this book teaches you how to use it like a pro.",
                  logo: "https://git-scm.com/images/progit2.png",
                  link: "https://git-scm.com/book/en/v2"
                },
                {
                  authors: ["Scott Chacon", "Ben Straub"],
                  name: "Pro Git",
                  description: "Git has taken the open source world by storm since its inception in 2005, and this book teaches you how to use it like a pro.",
                  logo: "https://git-scm.com/images/progit2.png",
                  link: "https://git-scm.com/book/en/v2"
                },
                {
                  authors: ["Scott Chacon", "Ben Straub"],
                  name: "Pro Git",
                  description: "Git has taken the open source world by storm since its inception in 2005, and this book teaches you how to use it like a pro.",
                  logo: "https://git-scm.com/images/progit2.png",
                  link: "https://git-scm.com/book/en/v2"
                },
              ]
              skill.index = "Git Basics\n" +
                "\tGit Bash CLI\n" +
                "\tInitializing New Project\n" +
                "\tCloning an Existing Repository\n" +
                "\tRecording Changes to the Repository\n" +
                "\t\tChecking the Status of Files\n" +
                "\t\tTracking New Files\n" +
                "\t\tStaging Modified Files\n" +
                "\t\tIgnoring Files\n" +
                "\t\tViewing Staged and Unstaged Changes\n" +
                "\t\tCommitting Changes\n" +
                "\t\tRemoving Files\n" +
                "\t\tMoving Files\n" +
                "\tViewing the Commit History\n" +
                "\t\tLimiting Log Output\t\n" +
                "\tUndoing Things\n" +
                "\t\tUnstaging a Staged File\n" +
                "\t\tUnmodifying a Modified File\n" +
                "\tWorking with Remotes\n" +
                "\t\tShowing Remotes\n" +
                "\t\tAdding Remote Repositories\n" +
                "\t\tFetching and Pulling from Remotes\n" +
                "\t\tPushing to Remotes\n" +
                "\t\tInspecting a Remote\n" +
                "\t\tRenaming and Removing Remotes\n" +
                "\tTagging\n" +
                "\t\tListing Tags\n" +
                "\t\tCreating Tags\n" +
                "\t\tAnnotated Tags\n" +
                "\t\tLightweight Tags\n" +
                "\t\tSharing Tags\n" +
                "\t\tDeleting Tags\n" +
                "\t\tChecking out Tags\n" +
                "\tGit Aliases\n" +
                "Git Branching\n" +
                "\tBranch Management\n" +
                "\t\tCreating a New Branch\n" +
                "\t\tSwitching Branches\n" +
                "\t\tMerging\n" +
                "\t\tResolving Merge Conflicts\n" +
                "\tBranching Workflows\n" +
                "\t\tLong-Running Branches\n" +
                "\t\tTopic Branches\n" +
                "\tRemote Branches\n" +
                "\t\tPushing\n" +
                "\t\tTracking Branches\n" +
                "\t\tPulling\n" +
                "\t\tDeleting Remote Branches\n" +
                "\tRebasing\n" +
                "\t\tRebase -i\n" +
                "\t\tRebase --onto\n" +
                "Git Tools\n" +
                "\tInteractive Staging\n" +
                "\tStashing and Cleaning\n" +
                "\t\tStashing Work\n" +
                "\t\tCreating a Branch from a Stash\n" +
                "\t\tCleaning Working Directory\n" +
                "\tSearching\n" +
                "\t\tgit grep\n" +
                "\t\tgit log\n" +
                "\tRewriting History\n" +
                "\t\tChanging the Last Commit\n" +
                "\t\tChanging Commit Messages\n" +
                "\t\tReordering Commits\n" +
                "\t\tSquashing Commits\n" +
                "\t\tSplitting a Commit\n" +
                "\t\tReverse the commit\n" +
                "\tAdvanced Merging\n" +
                "\t\tMerge Conflicts\n" +
                "\t\tAborting a Merge\n" +
                "\tSubmodules\n" +
                "\t\tCloning a Project with Submodules\n" +
                "\t\tWorking on a Project with Submodules\n" +
                "\t\t\tPulling in Upstream Changes\n" +
                "\t\t\tWorking on a Submodule\n" +
                "\t\t\tPublishing Submodule Changes\n" +
                "\t\t\tMerging Submodule Changes"

              const indexTreeAssembler = new IndexTreeAssembler();
              skill.indexTree = indexTreeAssembler.assemble(skill.index);

              return <FeaturedSkill skill={skill} />
            }
          })()
        }
        {/*<motion.div className="app__skills-exp">*/}
        {/*  {experience?.map((experience) => (*/}
        {/*    <motion.div className="app__skills-exp-item" key={experience.year}>*/}
        {/*      <div className="app__skills-exp-year">*/}
        {/*        <p className="bold-text">{experience.year}</p>*/}
        {/*      </div>*/}
        {/*      <motion.div className="app__skills-exp-works">*/}
        {/*        {experience.works.map((work) => (*/}
        {/*          <>*/}
        {/*            <motion.div*/}
        {/*              whileInView={{ opacity: [0, 1] }}*/}
        {/*              transition={{ duration: 0.5 }}*/}
        {/*              className="app__skills-exp-work"*/}
        {/*              data-tip*/}
        {/*              data-for={work.name}*/}
        {/*              key={work.name}*/}
        {/*            >*/}
        {/*              <h4 className="bold-text">{work.name}</h4>*/}
        {/*              <p className="p-text">{work.company}</p>*/}
        {/*            </motion.div>*/}
        {/*            <ReactTooltip*/}
        {/*              id={work.name}*/}
        {/*              effect="solid"*/}
        {/*              arrowColor="#fff"*/}
        {/*              className="skills-tooltip"*/}
        {/*            >*/}
        {/*              {work.desc}*/}
        {/*            </ReactTooltip>*/}
        {/*          </>*/}
        {/*        ))}*/}
        {/*      </motion.div>*/}
        {/*    </motion.div>*/}
        {/*  ))}*/}
        {/*</motion.div>*/}
      </div>
    </>
  );
};

export default AppWrap(
  MotionWrap(Skills, 'app__skills'),
  'skills',
  "app__whitebg"
);