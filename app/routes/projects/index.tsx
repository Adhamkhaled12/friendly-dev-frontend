import type { Route } from "./+types/index";
import type { Project, StrapiProject, StrapiResponse } from "~/types";
import ProjectCard from "~/components/ProjectCard";
import { useState } from "react";
import Pagination from "~/components/Pagination";
import { AnimatePresence, motion } from "framer-motion";

// Before the page renders, go get the data it needs as React Router calls loader before rendering ProjectsPage whatever you return from loader becomes page data
export async function loader({request}: Route.LoaderArgs): Promise<{projects: Project[]}> {
  const res = await fetch(`${import.meta.env.VITE_API_URL}/projects?populate=*`);
  const json: StrapiResponse<StrapiProject> = await res.json();

  const projects = json.data.map((item) => ({
    id: item.id,
    documentId: item.documentId,
    title: item.title,
    description: item.description,
    image: item.image?.url ? `${item.image.url}` : '/images/no-image.png',
    url: item.url,
    date: item.date,
    category: item.category,
    featured: item.featured
  }))

  return {projects};
}

// Destructure the data returned from the loader, so loaderData is an object that has inside it the projects
const ProjectsPage = ({ loaderData }: Route.ComponentProps) => {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [currentPage, setCurrentPage] = useState(1);
  const projectsPerPage = 10;
  
  // Add pagination, set to page 1
  const { projects } = loaderData as {projects: Project[]};

  // Get unique categories
  const categories = ['All', ...new Set(projects.map((project) => project.category))]

  // Filter projects based on category
  const filteredProjects = selectedCategory === 'All' ? projects : projects.filter((project) => project.category === selectedCategory)

  // Calculate total pages
  const totalPages = Math.ceil(filteredProjects.length / projectsPerPage);

  // Get current pages projects
  const indexOfLast = currentPage * projectsPerPage;
  const indexOfFirst = indexOfLast - projectsPerPage;
  const currentProjects = filteredProjects.slice(indexOfFirst, indexOfLast);

  return ( 
  <>
    <h2 className="text-3xl text-white font-bold mb-8">
      🚀 Projects
    </h2>

    <div className="flex flex-wrap gap-2 mb-8">
      {categories.map((category) => (
        <button key={category} onClick={() => {
          setSelectedCategory(category)
          setCurrentPage(1)
        }} className={`px-3 py-1 rounded text-sm cursor-pointer ${selectedCategory
        === category ? 'bg-blue-600 text-white' : 'bg-gray-700 text-gray-200'}`}
        >
          {category}
        </button>
      ))}
    </div>

    <AnimatePresence mode="wait">
    <motion.div layout className="grid gap-6 sm:grid-cols-2">
      {currentProjects.map((project) => (
        <motion.div layout key={project.id}>
          <ProjectCard project={project} />
        </motion.div>
      ))}
    </motion.div>
    </AnimatePresence>
    <Pagination totalPages={totalPages} currentPage={currentPage} onPageChange={setCurrentPage}/>
  </> );
}

export default ProjectsPage;