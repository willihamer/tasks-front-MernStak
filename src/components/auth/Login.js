import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import AlertContext from '../../context/alerts/alertContext';
import AuthContext from '../../context/authentication/authContext';


const Login = (props) => {

    const contextAlert = useContext(AlertContext);
    const { alert, showAlert } = contextAlert;

    const authContext = useContext(AuthContext);
    const { message, authenticated, loginUser } = authContext;

    useEffect(() => {
        if(authenticated) {
            props.history.push('/projects'); 
        }

        if (message) {
            showAlert(message.message, message.category);
        }
        // eslint-disable-next-line
    }, [message, authenticated, props.history]);

    const [user, setUser] = useState({
        email: '',
        password: ''
    });

    const { email, password } = user;

    const onChange = (e) => {
        setUser({
            ...user,
            [e.target.name]: e.target.value
        })
    };

    const onSubmit = e => {
        e.preventDefault();

        if (email.trim() === '' || password.trim() === '') {
            showAlert('All fields are necessary', 'alert-error');
        }

        loginUser({ email, password });

    }

    return (
        <div className="form-user">
            {alert ?
                (<div className={`alert ${alert.category}`}>
                    {alert.message}
                </div>)
                : null}
            <div className="container-form sombre-dark">
                <h1>Sign In</h1>

                <form
                    onSubmit={onSubmit}
                >
                    <div className="campo-form">
                        <label htmlFor="email">Email</label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            placeholder="Tu Email"
                            onChange={onChange}
                            value={email}
                        />
                    </div>

                    <div className="campo-form">
                        <label htmlFor="password">Password</label>
                        <input
                            type="password"
                            id="password"
                            name="password"
                            placeholder="Tu Password"
                            onChange={onChange}
                            value={password}
                        />
                    </div>

                    <div className="campo-form">
                        <input
                            type="submit"
                            className="btn btn-primary-1 btn-block"
                            value="Login"
                        />
                    </div>
                </form>
                <Link to={'/new-account'} className="account-link">
                    Create account
                </Link>
            </div>
        </div>
    );
}

export default Login;