import React, { useReducer } from 'react'
import { PROJECT_FORM, GET_PROJECTS, ADD_PROJECT, CHECK_FORM, CURRENT_PROJECT, DELETE_PROJECT, ERROR_PROJECT } from '../../types'
import ProjectContext from './ProjectContext'
import projectReducer from './ProjectReducer'
import clientAxios from '../../config/axios';

const ProjectState = props => {

    const initialState = {
        projects: [],
        form: false,
        errorForm: false,
        project: null,
        message: null
    }

    // Dispatch to execute actions
    const [state, dispatch] = useReducer(projectReducer, initialState);

    // Service of functions for CRUD

    const showForm = async () => {
        dispatch({
            type: PROJECT_FORM
        })
    }

    // get Projects
    const getProjects = async () => {

        try {
            const result = await clientAxios.get('/api/projects');
            dispatch({
                type: GET_PROJECTS,
                payload: result.data.projects
            })

        } catch (error) {
            const alert = {
                message: 'error getting projects',
                category: 'alert-error'
            }

            dispatch({
                type: ERROR_PROJECT,
                payload: alert
            })
        }


    }

    const addProject = async project => {

        try {
            const result = await clientAxios.post('/api/projects', project);



            dispatch({
                type: ADD_PROJECT,
                payload: result.data
            });
        } catch (error) {
            const alert = {
                message: 'error adding projects',
                category: 'alert-error'
            }

            dispatch({
                type: ERROR_PROJECT,
                payload: alert
            })
        }

    }

    // check form

    const showError = () => {
        dispatch({
            type: CHECK_FORM,
        })
    }


    // Select current Project
    const currentProject = (projectId) => {
        dispatch({
            type: CURRENT_PROJECT,
            payload: projectId
        })
    }

    // Delete a project
    const deleteProject = async projectId => {
        try {
            await clientAxios.delete(`/api/projects/${projectId}`);
            dispatch({
                type: DELETE_PROJECT,
                payload: projectId
            })
        } catch (error) {

            const alert = {
                message: 'error deleting project',
                category: 'alert-error'
            }

            dispatch({
                type: ERROR_PROJECT,
                payload: alert
            })
        }



    }


    return (
        <ProjectContext.Provider
            value={{
                projects: state.projects,
                form: state.form,
                errorForm: state.errorForm,
                project: state.project,
                message: state.message,
                showForm,
                getProjects,
                addProject,
                showError,
                currentProject,
                deleteProject
            }}
        >
            {props.children}
        </ProjectContext.Provider>
    )
}

export default ProjectState;