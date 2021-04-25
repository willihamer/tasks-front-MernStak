import React, { Fragment, useContext, useState } from 'react'
import projectContext from '../../context/projects/ProjectContext';


const NewProject = () => {

    const projectsContext = useContext(projectContext);
    const { form, errorForm, showForm, addProject, showError } = projectsContext;

    const [project, setProject] = useState({
        name: '',
    });

    const onChangeProject = e => {
        setProject({
            ...project,
            [e.target.name]: e.target.value
        })
    }

    const onSubmitProject = e => {
        e.preventDefault();
        // validate form
        if (project.name === '') {
            showError();
            return;
        }

        // add at the state
        addProject(project);

        // reset form
        setProject({ name: '' });

    }


    return (
        <Fragment>
            <button
                type="button"
                className="btn btn-block btn-primary-1"
                onClick={() => showForm()}
            >
                New Project
        </button>
            {form ?
                (
                    <form
                        className="form-new-project"
                        onSubmit={onSubmitProject}
                    >
                        <input
                            type="text"
                            className="input-text"
                            placeholder="Project name"
                            name="name"
                            onChange={onChangeProject}
                            value={project.name}
                        />

                        <input
                            type="submit"
                            className="btn btn-block btn-primary-1"
                            value="Add Project"
                        />
                    </form>
                ) : null
            }

            {errorForm ? <p className="message error">The name is mandatory</p> : null}
        </Fragment>
    );
}

export default NewProject;