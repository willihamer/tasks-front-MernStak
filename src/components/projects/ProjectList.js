import React, { useContext, useEffect } from 'react'
import projectContext from '../../context/projects/ProjectContext';
import SingleProject from './SingleProject'
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import AlertContext from '../../context/alerts/alertContext';

const ProjectList = () => {

    const projectsContext = useContext(projectContext);
    const { message, projects, getProjects } = projectsContext;

    const alertContext = useContext(AlertContext);
    const { alert, showAlert } = alertContext;

    useEffect(() => {

        // if we got an error we display it here
        if (message) {
            showAlert(message.message, message.category);
        }
        getProjects();
        //eslint-disable-next-line
    }, [message]);

    if (projects.length === 0) return <p>You don't have projects, let's create one</p>;

    return (
        <ul className="list-project">

            {alert ? (
                <div className={`alert ${alert.category}`}>{alert.message}</div>
            ) : null}

            <TransitionGroup>
                {projects.map(project => (
                    <CSSTransition
                        key={project._id}
                        timeout={200}
                        classNames="projects"
                    >
                        <SingleProject
                            project={project}
                        />
                    </CSSTransition>
                ))}
            </TransitionGroup>
        </ul>
    );
}

export default ProjectList;