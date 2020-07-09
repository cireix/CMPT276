import React from 'react';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';
import Header from 'components/Header';

export default function Login(props)  {
    const user = global.auth.getUser();

    const { register, handleSubmit, errors } = useForm();

    const submitHandler = async (data) => {
        try {

            //global.auth.logOut();
            const { phoneNumber, password } = data;
            // post to server side for login
            // api/users/login
            const res = await axios.post('api/users/login', { phone:phoneNumber, password: password});
            // receive a jwtoken from server side if success
            const jwToken = res.data.token.replace('Bearer ','');
            // store the token locally
            global.auth.setToken(jwToken);
            // route to the home page
            props.history.push('/');
            toast.success("Login successful!");
        } catch (error) {
            const message = error.response.data.message;
            toast.error(message);
        }
    };

    return(
        <React.Fragment>
            <Header user={user} />
            <div className="login_wrapper">
                <form action="" className="box login_box" onSubmit={ handleSubmit(submitHandler) }>
                    <div className="field">
                        <label className="label">Phone Number</label>
                        <div className="field-body">
                            <div className="field is-expanded">
                                <div className="field has-addons">
                                    <p className="button is-static">+1</p>
                                    <input
                                    type="text"
                                    className={`input ${errors.phoneNumber && 'is-danger'}`}
                                    placeholder="Phone number"
                                    name="phoneNumber"
                                    ref={register({
                                        required: true,
                                        pattern:{
                                            value: /^\(?([0-9]{3})\)?[-.●]?([0-9]{3})[-.●]?([0-9]{4})$/,
                                            message: "invalid phone number"
                                    }})} />
                                </div>
                                { errors.phoneNumber && <p className="helper has-text-danger">{ errors.phoneNumber.message }</p >}
                            </div>
                        </div>
                    </div>

                    <div className="field">
                        <label className="label">Password</label>
                        <div className="control">
                            <input
                            type="password"
                            className={`input ${errors.password && 'is-danger'}`}
                            placeholder="Password"
                            name="password"
                            ref={register({
                                required: true,
                                minLength: {
                                    value: 6,
                                    message: "cannot be less then 6 digits"
                                }})}/>
                            { errors.password && <p className="helper has-text-danger">{ errors.password.message }</p >}
                            <Link to='/forgotpw' className="has-text-danger forgotpw">forgot password?</Link>
                        </div>
                    </div>



                    <div className="control">
                        <button className="button is-link login_button">Login</button>
                    </div>

                </form>
            </div>
        </React.Fragment>
    );
}
