import React, { useContext, useEffect } from 'react'
import { Redirect, Route } from 'react-router'
import AuthContext from '../../context/authentication/authContext'

export default function PrivateRouthe({ component: Component, ...props }) {

    const authContext = useContext(AuthContext);
    const { loading, authenticated, userAuthenticated } = authContext;

    useEffect(() => {
        userAuthenticated();
        // eslint-disable-next-line
    }, [])

    return (
        <Route {...props} render={props => !authenticated && !loading ? (
            <Redirect to="/" />
        ) : (
            <Component {...props} />
        )}
        />
    )
}
