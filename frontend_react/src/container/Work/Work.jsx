import React, { useState, useEffect } from 'react';
import { AiFillEye, AiFillGithub } from 'react-icons/ai';
import { motion } from 'framer-motion';


import { AppWrap, MotionWrap } from '../../wrapper'
import { urlFor, client } from '../../client';
import './Work.scss';
import Project from '../../components/Project/Project'

const Work = () => {
  const [works, setWorks] = useState([]);
  const [filterWork, setFilterWork] = useState([]);
  const [activeFilter, setActiveFilter] = useState('All');
  const [animateCard, setAnimateCard] = useState({ y: 0, opacity: 1 });

  useEffect(() => {
    const query = '*[_type == "works"]';

    client.fetch(query).then((data) => {
      setWorks(data);
      setFilterWork(data);
    });
  }, []);

  let workCategories = new Set();
  for(const work of works) {
    for(const tag of work.tags) {
      workCategories.add(tag)
    }
  }
  workCategories = Array.from(workCategories);

  const handleWorkFilter = (item) => {
    setActiveFilter(item);
    setAnimateCard([{y:100, opacity: 0}])
    setTimeout(() => {
      setAnimateCard([{y:0, opacity: 1}])

      if(item === 'All') {
        setFilterWork(works);
      } else {
        setFilterWork(works.filter((work) => work.tags.includes(item)))
      }
    }, 500);
  }

  return (
    <>
      <h2 className="head-text">My Creative <span>Portfolio</span> Section</h2>

      <div className="app__work-filter">
        {workCategories.map(
          (item, index) => (
            <div
              key={index}
              onClick={() => handleWorkFilter(item)}
              className={`app__work-filter-item app__flex p-text ${activeFilter === item ? 'item-active' : ''}`}
            >
              {item}
            </div>
          ))
        }
        <div
          key="All"
          onClick={() => handleWorkFilter("All")}
          className={`app__work-filter-item app__flex p-text ${activeFilter === "All" ? 'item-active' : ''}`}
        >
          All
        </div>
      </div>

      <motion.div
        animate={animateCard}
        transition={{ duration: 0.5, delayChildren: 0.5 }}
        className='app__work-portfolio'
      >
        {filterWork.map((work, index) => (
          <Project project={work} key={work._id} classNames="app__work-project" />
        ))}
      </motion.div>
    </>
  )
}

export default AppWrap(
  MotionWrap(Work, 'app__works'),
  'work',
  "app__primarybg"
);