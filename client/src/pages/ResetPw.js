import React from 'react';
import { useForm } from 'react-hook-form';
import axios from 'commons/axios';
import { toast } from 'react-toastify';

export default function ResetPw(props) {
    const { register, handleSubmit, errors, watch } = useForm();

    const submitHandler = async (data) => {
        try {
            const { veri_code, password } = data;
            // post verfication code and new password to server side
            const res = await axios.post('/auth/resetpw', { veri_code, password });
            // receive a jwtoken from server side if successful
            const jwToken = res.data;
            // store the token locally
            global.auth.setToken(jwToken);
            // route to the home page
            props.history.push('/');
            toast.success("Reset password successfully!")
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <div className="login_wrapper">
            <form action="" className="box login_box" onSubmit={ handleSubmit(submitHandler) }>
                <div className="field">
                    <label className="label">Verification Code</label>
                    <div className="control">  
                        <input 
                        type="text" 
                        className={`input ${errors.veri_code && 'is-danger'}`}
                        placeholder="Verification Code" 
                        name="veri_code"
                        ref={register({
                            required: true,
                            })} />
                            { errors.veri_code && <p className="helper has-text-danger">verification code is required</p >}
                    </div>
                </div>

                <div className="field">
                    <label className="label">New Password</label>
                    <div className="control">
                        <input 
                        className={`input ${errors.password && 'is-danger'}`}
                        type="text" 
                        placeholder="Password" 
                        name='password'     
                        ref={ register({ 
                            required: true,
                            minLength: {
                                value: 6,
                                message: 'cannot be less than 6 digits'
                            }}) } />
                        { errors.password && <p className="helper has-text-danger">{ errors.password.message }</p> } 
                    </div>
                </div>

                <div className="field">
                    <label className="label">Confirm Password</label>
                    <div className="control">
                        <input 
                        className={`input ${errors.password2 && 'is-danger'}`}  
                        type="text" 
                        placeholder="Confirm Password" 
                        name='password2'     
                        ref={ register({       
                            required: true,
                            validate: (value) => value === watch('password')
                            }) }  />   
                        { errors.password2 && <p className="helper has-text-danger">must match the qrevious entry</p> }  
                    </div>
                </div>

                <div className="control">
                    <button className="button is-link login_button">Submit</button>
                </div>
            </form>
        </div>
    )
}