import React, { useContext, useState, useEffect } from 'react'
import { Link } from 'react-router-dom';
import AlertContext from "../../context/alerts/alertContext"
import AuthContext from '../../context/authentication/authContext';

const NewAccount = (props) => {

    const alertContext = useContext(AlertContext);
    const { alert, showAlert } = alertContext;

    const authContext = useContext(AuthContext);
    const { message, authenticated, signUpUser } = authContext;

    useEffect(() => {
        if (authenticated) {
            props.history.push('/projects');
        }

        if (message) {
            showAlert(message.message, message.category)
        }
        // eslint-disable-next-line
    }, [message, authenticated, props.history])

    const [user, setUser] = useState({
        name: '',
        email: '',
        password: '',
        confirm: ''
    });

    const { name, email, password, confirm } = user;

    const onChange = (e) => {
        setUser({
            ...user,
            [e.target.name]: e.target.value
        })
    };

    const onSubmit = e => {
        e.preventDefault();

        if (name.trim() === '' || email.trim() === '' || password.trim() === '' || confirm.trim() === '') {
            showAlert('All the fields are required', 'alert-error');
            return;
        }

        if (password.length < 6) {
            showAlert('The password must contain at least 6 characters', 'alert-error');
            return;
        }

        if (password !== confirm) {
            showAlert('The passwords are different', 'alert-error');
            return;
        }

        signUpUser({
            name,
            email,
            password
        });

    }

    return (
        <div className="form-user">
            {alert ?
                (<div className={`alert ${alert.category}`}>
                    {alert.message}
                </div>)
                : null}
            <div className="container-form sombre-dark">
                <h1>Create Account</h1>

                <form
                    onSubmit={onSubmit}
                >

                    <div className="campo-form">
                        <label htmlFor="name">Name</label>
                        <input
                            type="text"
                            id="name"
                            name="name"
                            placeholder="Your name"
                            onChange={onChange}
                            value={name}
                        />
                    </div>
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
                        <label htmlFor="confirm">Confirm Password</label>
                        <input
                            type="password"
                            id="confirm"
                            name="confirm"
                            placeholder=" confirm"
                            onChange={onChange}
                            value={confirm}
                        />
                    </div>

                    <div className="campo-form">
                        <input
                            type="submit"
                            className="btn btn-primary-1 btn-block"
                            value="Sign Up"
                        />
                    </div>
                </form>
                <Link to={'/'} className="account-link">
                    Sign in
                </Link>
            </div>
        </div>
    );
}

export default NewAccount;