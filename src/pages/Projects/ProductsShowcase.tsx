import { projects } from "./ProductConfig";
import { ProjectBox } from "./ProductBox";

const ProjectShowcase = () => {
  return (
    <>
      {projects.map((project, index) => (
        <ProjectBox key={index} title={project.title} goal={project.goal} actions={project.actions} outcome={project.outcome} />
      ))}
    </>
  );
};

export default ProjectShowcase;
