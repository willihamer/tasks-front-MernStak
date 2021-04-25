import React, { useReducer } from 'react';
import TaskContext from './TaskContext';
import TaskReducer from './TaskReducer';
import { PROJECT_TASKS, ADD_TASK, CHECK_TASK, DELETE_TASK, CURRENT_TASK, UPDATE_TASK, CLEAN_EDIT_TASK } from '../../types';
import clientAxios from '../../config/axios';

const TaskState = props => {
    const initialState = {
        tasksProject: [],
        taskError: false,
        selectedTask: null
    }

    // create dispatch
    const [state, dispatch] = useReducer(TaskReducer, initialState);


    // get tasks from a project
    const getTasks = async project => {
        try {
            const answer = await clientAxios.get('/api/tasks', { params: { project } });
            dispatch({
                type: PROJECT_TASKS,
                payload: answer.data.tasks
            })
        } catch (error) {

        }
    }

    // Add task to the project
    const addTask = async task => {
        try {
            await clientAxios.post('/api/tasks', task);
            dispatch({
                type: ADD_TASK,
                payload: task
            })
        } catch (error) {

        }
    }

    // CHECK AND SHOW AN ERROR
    const checkTask = () => {
        dispatch({
            type: CHECK_TASK
        })
    }

    // DELETE TASKS
    const deleteTask = async (taskId, project) => {
        try {
            await clientAxios.delete(`/api/tasks/${taskId}`, { params: { project } });
            dispatch({
                type: DELETE_TASK,
                payload: taskId
            })
        } catch (error) {

        }
    }

    // UPDATE THE TASK
    const updateTask = async task => {
        try {
            console.log('task');
            console.log(task);
            const answer = await clientAxios.put(`/api/tasks/${task._id}`, task);
            console.log('answer');
            console.log(answer);
            dispatch({
                type: UPDATE_TASK,
                payload: answer.data.task
            })
        } catch (error) {

        }
    }

    // EXTRACT A TASK TO EDIT
    const saveCurrentTask = task => {
        dispatch({
            type: CURRENT_TASK,
            payload: task
        })
    }

    // CLEAN THE SELECTED TASK WHEN YOU EDIT
    const cleanTask = () => {
        dispatch({
            type: CLEAN_EDIT_TASK
        })
    }


    return (
        <TaskContext.Provider
            value={{
                tasksProject: state.tasksProject,
                taskError: state.taskError,
                selectedTask: state.selectedTask,
                getTasks,
                addTask,
                checkTask,
                deleteTask,
                saveCurrentTask,
                updateTask,
                cleanTask
            }}
        >
            {props.children}
        </TaskContext.Provider>
    )
}

export default TaskState;