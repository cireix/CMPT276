import React from 'react';
import {useForm} from 'react-hook-form';
import axios from 'commons/axios';
import { toast } from 'react-toastify';

export default function Login(props) {
    const { register, handleSubmit, errors, watch } = useForm();
    
    const submitHandler = async (data) => {    
        try {
            const { nickname, phoneNumber, password } = data;
            // post to server side for register
            const res = await axios.post('/auth/signup', { nickname, phoneNumber, password, type: 0 });  
            // receive a jwtoken from server side if successful
            const jwToken = res.data;
            // store the token locally
            global.auth.setToken(jwToken); 
            // route to the home page 
            props.history.push('/');
            toast.success("Sign up successfully!");
        } catch (error) {
            console.log(error);
            toast.error("This phone number already exists");
        }

    };

    return(
        <div className="login_wrapper">
            <form className="box login_box" onSubmit={ handleSubmit(submitHandler) }>
                <div className="field">
                    <label className="label">Name</label>
                    <div className="control">
                        <input 
                        className={`input ${errors.nickname && 'is-danger'}`}  
                        type="text" 
                        placeholder="Nickname" 
                        name='nickname'     
                        ref={ register({       
                            required: true,
                            maxLength: {
                                value: 10,
                                message: 'cannot be more than 10 digits'
                            }}) }  />   
                        { errors.nickname && <p className="helper has-text-danger">{ errors.nickname.message }</p> }  
                    </div>
                </div>

                <div className="field">
                    <label className="label">Phone Number</label>             
                    <div class="field-body">
                        <div class="field is-expanded">
                            <div class="field has-addons">
                                <p class="control">
                                <a class="button is-static">+1</a>
                                </p>
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
    );
}
