import React from "react";
import "./ProjectCard.scss";

const ProjectCard = ({ title, children }) => {
  return (
    <section className="ProjectCard">
      <h3>{title}</h3>
      <div className="text">
        {children}
      </div>
    </section>
  );
};

export default ProjectCard;