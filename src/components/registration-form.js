import React, { useState } from 'react';
import '../styles/registration-form.css';


function RegistrationForm() {
    const [userRegistration, setUserRegistration] = useState({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        password: '',
        confirmPassword: '',
        isAccept: false
    });

    const [formErrors, setFormErrors] = useState({});

    const handleInput = (e) => {
        const name = e.target.name;
        let value = e.target.value;
        if (name === 'isAccept') {
            value = !userRegistration[name];
        }
        setUserRegistration({ ...userRegistration, [name]: value });
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        setFormErrors(validate(userRegistration));
        if(Object.keys(formErrors).length > 0 && userRegistration.isAccept) {
            const newRecord = { ...userRegistration };
            setUserRegistration({
                firstName: '',
                lastName: '',
                email: '',
                phone: '',
                password: '',
                confirmPassword: '',
                isAccept: false
            });
        }
    }

    const validate = (values) => {
        const errors = {};
        const EMAIL_REGEX = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        const PASSWORD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
        if (!userRegistration.firstName) {
            errors.firstName = 'First Name is required.'
        }
        if (!userRegistration.lastName) {
            errors.lastName = 'Last Name is required.'
        }
        if (!userRegistration.email) {
            errors.email = 'Email Name is required.';
        } else if (!EMAIL_REGEX.test(userRegistration.email)) {
            errors.email = 'Invalid Email';
        }
        if (!userRegistration.phone) {
            errors.phone = 'Phone is required.';
        } else if(!Number(userRegistration.phone)) {
            errors.phone = 'Phone number is not in digit';
        }
        if (!userRegistration.password) {
            errors.password = 'Password is required.';
        } else if (!PASSWORD_REGEX.test(userRegistration.password)) {
            errors.password = 'Password must be contain one capital, one small, one special character and one number';
        }
        if (!userRegistration.confirmPassword) {
            errors.confirmPassword = 'Confirm Password is required.';
        } else if (userRegistration.confirmPassword !== userRegistration.password) {
            errors.confirmPassword = 'Password and Confirm Password are not same';
        }
        return errors;
    }

    return (
        <>
            <div className="container d-flex vh-100 justify-content-center align-items-center bg-secondary">
                <div className="card" style={{ width: '28rem' }}>
                    <div className="card-header border-bottom-0 px-4 pt-4">
                        <h3 className="text-center" style={{ color: '#212529b3' }}>Register</h3>
                        <div className="text-secondary text-center">
                            <small>Create your account. It's free and only takes a minute.</small>
                        </div>
                    </div>
                    <div className="card-body px-4 pb-4" style={{ backgroundColor: 'rgba(0,0,0,.03)' }}>
                        <form className="my-3" onSubmit={handleSubmit}>
                            <div className="mb-3 d-flex">
                                <span className="me-3">
                                    <input className="form-control"
                                        value={userRegistration.firstName}
                                        onChange={handleInput} type="text"
                                        placeholder="First Name"
                                        name="firstName"
                                    />
                                    <div className="invalid-field">{formErrors.firstName}</div>
                                </span>
                                <span className="ms-3">
                                    <input className="form-control"
                                        value={userRegistration.lastName}
                                        onChange={handleInput} type="text"
                                        placeholder="Last Name"
                                        name="lastName"
                                    />
                                    <div className="invalid-field">{formErrors.lastName}</div>
                                </span>
                            </div>
                            <div className="mb-3">
                                <input className="form-control"
                                    value={userRegistration.email}
                                    onChange={handleInput}
                                    type="text"
                                    name="email"
                                    placeholder="Email"
                                />
                                <div className="invalid-field">{formErrors.email}</div>
                            </div>
                            <div className="mb-3">
                                <input className="form-control"
                                    value={userRegistration.phone}
                                    onChange={handleInput} type="text"
                                    placeholder="Phone"
                                    name="phone"
                                />
                                <div className="invalid-field">{formErrors.phone}</div>
                            </div>
                            <div className="mb-3">
                                <input className="form-control"
                                    value={userRegistration.password}
                                    onChange={handleInput}
                                    type="password"
                                    name="password"
                                    placeholder="Password"
                                    autoComplete="off"
                                />
                                <div className="invalid-field">{formErrors.password}</div>
                            </div>
                            <div className="mb-3">
                                <input className="form-control"
                                    value={userRegistration.confirmPassword}
                                    onChange={handleInput}
                                    type="password"
                                    name="confirmPassword"
                                    autoComplete="off"
                                    placeholder="Confirm Password"
                                />
                                <div className="invalid-field">{formErrors.confirmPassword}</div>
                            </div>
                            <div className="mb-3 form-check">
                                <input type="checkbox"
                                    checked={userRegistration.isAccept}
                                    onChange={handleInput}
                                    name="isAccept"
                                    className="form-check-input" id="exampleCheck1" />
                                <label className="form-check-label" htmlFor="exampleCheck1">
                                    <small className="text-secondary">I accept the <span className="text-success">Terms of Use </span> & <span className="text-success"> Privacy Policy</span></small>
                                </label>
                            </div>
                            <div className="d-grid">
                                <button className="btn btn-success" type="submit">Submit</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    );
}

export default RegistrationForm;