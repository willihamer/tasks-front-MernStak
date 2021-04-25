import React, { useContext, useEffect } from 'react';
import AuthContext from '../../context/authentication/authContext';

const TopBar = () => {

    // Extract the user info
    const authContext = useContext(AuthContext);
    const { user, userAuthenticated, logout } = authContext;

    useEffect(() => {
        userAuthenticated();
        // eslint-disable-next-line
    }, []);


    return (
        <header className="app-header">
            {user ? <p className="username">Hi <span>{user.name}</span></p> : null}
            <nav className="nav-principal">
                <button
                    className="btn btn-blank close-session"
                    onClick={() => logout()}
                >Logout</button>
            </nav>
        </header>
    );
}

export default TopBar;