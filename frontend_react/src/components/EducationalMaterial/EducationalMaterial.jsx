import React from 'react';
import {urlFor} from "../../client";
import {motion} from "framer-motion";
import {AiFillEye, AiFillGithub} from "react-icons/ai";

import scssVars from './EducationalMaterial.scss';

const EducationalMaterial = (props) => {
  const educationalMaterial = props.educationalMaterial;
  const cn = scssVars.cn;

  return (
      <a className={`${props.classNames} ${cn}`} href={educationalMaterial.link}>
        {educationalMaterial.imgUrl &&
            <img className={`${cn}-image`} src={urlFor(educationalMaterial.imgUrl)} alt={educationalMaterial.name}/>
        }
        <div className={`${cn}-content app__flex`}>
          <h4 className={`${cn}-name`}>{educationalMaterial.title}</h4>
          <p className={`${cn}-authors`}>
            {educationalMaterial.authors &&
                <>by </>
            }

            {educationalMaterial.authors &&
                educationalMaterial.authors.reduce((author1, author2) => (
                <>{author1}, {author2}</>
                ))
            }
          </p>
          <p className={`${cn}-description`}>{educationalMaterial.description}</p>
          {/*<div className={`${cn}-tag app__flex`}>*/}
          {/*  <p className="p-text">{educationalMaterial.tags[0]}</p>*/}
          {/*</div>*/}
        </div>
      </a>
  );
};

export default EducationalMaterial;
