import React from 'react'
import projectContext from '../../context/projects/ProjectContext';
import taskContext from '../../context/tasks/TaskContext';
import { useContext } from 'react';


const SingleProject = ({ project }) => {
    const projectsContext = useContext(projectContext);
    const { currentProject } = projectsContext;

    const tasksContext = useContext(taskContext);
    const { getTasks } = tasksContext;


    // function to add the current project and current tasks
    const selectProject = id => {
        currentProject(id); //put the current project in the state
        getTasks(id); //filter the tasks by the selected project
    }

    return (
        <li>
            <button
                type="button"
                className="btn btn-blank"
                onClick={() => selectProject(project._id)}
            >
                {project.name}
            </button>
        </li>
    );
}

export default SingleProject;