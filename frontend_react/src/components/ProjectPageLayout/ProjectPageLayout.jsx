import React from "react";
import Layout from "components/Layout/Layout";
import { AnimatedPage } from "components/AnimatedPage/AnimatedPage";

import "./ProjectPageLayout.scss";

const ProjectPageLayout = ({ children }) => {
  return (
    <AnimatedPage>
      <Layout className="ProjectPage">
        {children}
      </Layout>
    </AnimatedPage>
  );
};

export default ProjectPageLayout;