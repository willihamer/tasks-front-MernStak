import React, { useContext, useState, useEffect } from 'react'
import projectContext from '../../context/projects/ProjectContext';
import taskContext from '../../context/tasks/TaskContext';

const FormTask = () => {
    const projectsContext = useContext(projectContext);
    const { project } = projectsContext;

    const tasksContext = useContext(taskContext);
    const { taskError, selectedTask, addTask, checkTask, getTasks, updateTask, cleanTask } = tasksContext;

    // effect that detect if the selectedTask change it's value
    useEffect(() => {
        if (selectedTask !== null) {
            setTask(selectedTask);
        } else {
            setTask({
                name: ''
            });
        }
    }, [selectedTask])

    // state of the task for the form
    const [task, setTask] = useState({
        name: ''
    })

    const { name } = task;

    // if there is not a project selected
    if (!project) {
        return null;
    }


    // Array destructuring to extract the selected project
    const [currentProject] = project;

    const handleChange = e => {
        setTask({
            ...task,
            [e.target.name]: e.target.value
        })
    }

    const onSubmit = e => {
        e.preventDefault();

        // validate form
        if (name.trim() === '') {
            checkTask();
            return;
        }

        // the pass validation reset error in inside the task reducer ADD_TASK
        // check if the send is for to create a new task or edit
        if (selectedTask === null) {
            // add task
            task.project = currentProject._id;
            addTask(task);
        } else {
            updateTask(task);
            cleanTask();
        }

        // get an filter the task of the current project
        getTasks(currentProject._id);

        // reset form
        setTask({
            name: ''
        })
    }


    return (
        <div className="form">
            <form
                onSubmit={onSubmit}
            >
                <div className="container-input">
                    <input
                        type="text"
                        className="input-text"
                        placeholder="Task name..."
                        name="name"
                        value={name}
                        onChange={handleChange}
                    />
                </div>
                <div className="container-input">
                    <input
                        type="submit"
                        className="btn btn-primary-1 btn-submit btn-block"
                        value={selectedTask ? "Edit Task" : "Add Task"} />
                </div>
            </form>
            {taskError ? <p className="message error">the task name is mandatory</p> : null}
        </div>
    );
}

export default FormTask;