import ProjectList from '@/components/project-list/ProjectList';
import { ProjectItem } from '@/types';

const KidsProjectList = async () => {
  const data = await fetch('http://localhost:3000/api/projects/kids');
  const projects = await data.json();

  return (
    <ProjectList className="for-kids__projects" data={projects}/>
  );
};

export default KidsProjectList;