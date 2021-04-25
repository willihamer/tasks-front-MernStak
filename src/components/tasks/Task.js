import React, { useContext } from 'react';
import projectContext from '../../context/projects/ProjectContext';
import taskContext from '../../context/tasks/TaskContext';


const Task = ({ task }) => {

    const projectsContext = useContext(projectContext);
    const { project } = projectsContext;

    const tasksContext = useContext(taskContext);
    const { deleteTask, getTasks, saveCurrentTask, updateTask } = tasksContext;

    const [currentProject] = project;

    // function that is executed when the user delete a task
    const taskDelete = (id) => {

        deleteTask(id, currentProject._id);
        getTasks(project[0].id);
    }

    // FUNCTION THAD MODIFIES THE STATUS OF A TASK
    const changeState = (task) => {
        if (task.status) {
            task.status = false;
        } else {
            task.status = true;
        }
        updateTask(task);
    }

    const selectTask = task => {
        saveCurrentTask(task);
    }

    return (
        <li className="task shadow">
            <p>{task.name}</p>
            <div className="state">
                {task.status ?
                    (
                        <button
                            type="button"
                            className="complete"
                            onClick={() => changeState(task)}
                        >Complete</button>
                    )
                    :
                    (
                        <button
                            type="button"
                            className="incomplete"
                            onClick={() => changeState(task)}
                        >Incomplete</button>
                    )

                }
            </div>
            <div className="actions">
                <button
                    type="button"
                    className="btn btn-primary-1"
                    onClick={() => selectTask(task)}
                >
                    Edit
                </button>
                <button
                    type="button"
                    className="btn btn-secondary"
                    onClick={() => taskDelete(task._id)}
                >
                    Delete
                </button>
            </div>
        </li>
    );
}

export default Task;