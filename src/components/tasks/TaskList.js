import React, { Fragment, useContext } from 'react';
import Task from './Task';
import projectContext from '../../context/projects/ProjectContext';
import taskContext from '../../context/tasks/TaskContext';
import { CSSTransition, TransitionGroup } from 'react-transition-group';

const TaskList = () => {

    const projectsContext = useContext(projectContext);
    const { project, deleteProject } = projectsContext;


    const tasksContext = useContext(taskContext);
    const { tasksProject } = tasksContext;



    // if there is not a project selected
    if (!project) {
        return <h2>Select a project</h2>;
    }


    // Array destructuring to extract the selected project
    const [currentProject] = project;

    return (
        <Fragment>
            <h2>Project: {currentProject.name}</h2>
            <ul className="list-tasks">
                {tasksProject.length === 0 ?
                    (<li className="task"><p>No tasks for now</p></li>)
                    :
                    <TransitionGroup>
                        {
                            tasksProject.map(task => (
                                <CSSTransition
                                    key={task.id}
                                    timeout={200}
                                    classNames="task"
                                >
                                    <Task
                                        task={task}
                                    />
                                </CSSTransition>
                            ))
                        }
                    </TransitionGroup>
                }
            </ul>
            <button
                type="button"
                className="btn btn-delete"
                onClick={() => deleteProject(currentProject._id)}
            >Delete Project &times;</button>
        </Fragment>
    );
}

export default TaskList;