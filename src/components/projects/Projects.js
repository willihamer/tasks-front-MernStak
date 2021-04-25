import React, { useContext, useEffect } from 'react'
import AuthContext from '../../context/authentication/authContext';
import Sidebar from '../layout/Sidebar';
import TopBar from '../layout/TopBar';
import FormTask from '../tasks/FormTask';
import TaskList from '../tasks/TaskList';

const Projects = () => {

    // Extract the user info
    const authContext = useContext(AuthContext);
    const { userAuthenticated } = authContext;

    useEffect(() => {
        userAuthenticated();
        // eslint-disable-next-line
    }, [])

    return (
        <div className="container-app">
            <Sidebar />
            <div className="section-principal">
                <TopBar />
                <main>
                    <FormTask />
                    <div className="container-tasks">
                        <TaskList />
                    </div>
                </main>
            </div>
        </div>
    );
}

export default Projects;