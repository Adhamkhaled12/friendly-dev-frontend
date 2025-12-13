import type { Route } from "./+types/index";
import type { Project } from "~/types";
import ProjectCard from "~/components/ProjectCard";
import { useState } from "react";
import Pagination from "~/components/Pagination";

// Before the page renders, go get the data it needs as React Router calls loader before rendering ProjectsPage whatever you return from loader becomes page data
export async function loader({request}: Route.LoaderArgs): Promise<{projects: Project[]}> {
  const res = await fetch('http://localhost:8000/projects');
  const data = await res.json();

  return {projects: data};
}

// Destructure the data returned from the loader, so loaderData is an object that has inside it the projects
const ProjectsPage = ({ loaderData }: Route.ComponentProps) => {
  const { projects } = loaderData as {projects: Project[]};
  const projectsPerPage = 10;

  // Add pagination, set to page 1
  const [currentPage, setCurrentPage] = useState(1);

  // Calculate total pages
  const totalPages = Math.ceil(projects.length / projectsPerPage);

  // Get current pages projects
  const indexOfLast = currentPage * projectsPerPage;
  const indexOfFirst = indexOfLast - projectsPerPage;
  const currentProjects = projects.slice(indexOfFirst, indexOfLast);

  return ( 
  <>
    <h2 className="text-3xl text-white font-bold mb-8">
      🚀 Projects
    </h2>

    <div className="grid gap-6 sm:grid-cols-2">
      {currentProjects.map((project) => (
        <ProjectCard key={project.id} project={project} />
      ))}
    </div>
    <Pagination totalPages={totalPages} currentPage={currentPage} onPageChange={setCurrentPage}/>
  </> );
}

export default ProjectsPage;