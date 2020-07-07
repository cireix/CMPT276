import React from 'react';
import { useForm } from 'react-hook-form';
import axios from 'commons/axios';
import { toast } from 'react-toastify';

export default function ForgotPw(props) {
    const { register, handleSubmit, errors, watch } = useForm();

    const onSubmit = async (data) => {
        try {
            const { phoneNumber } = data;
            // post phone number to server side
            // api/users/forgotpw
            const res = await axios.post('api/users/forgotpw', { phone: phoneNumber });
            toast.success("Verification code sent");
        } catch (error) {
            const message = error.response.data.message;
            toast.error(message);
        }
    };

    const onSubmit2 = async (data) => {
        try {
            const { phoneNumber, code, password } = data;
            // post phone number to server side
            // api/users/forgotpw2
            const res = await axios.post('api/users/forgotpw2', { phone: phoneNumber, code: code, password: password });
            props.history.push('/login');
        } catch (error) {
            const message = error.response.data.message;
            toast.error(message);
        }
    }

    return(
        <div className="login_wrapper">
            <form className="box login_box" >

                <div className="field">
                    <label className="label">Phone Number</label>             
                    <div class="field-body">
                        <div class="field is-expanded">
                            <div class="field has-addons">
                                <p class="button is-static">+1</p>
                                <input 
                                type="text" 
                                className={`input ${errors.phoneNumber && 'is-danger'}`}
                                placeholder="Phone number" 
                                name="phoneNumber"
                                ref={register({
                                    
                                    pattern:{
                                        value: /^\(?([0-9]{3})\)?[-.●]?([0-9]{3})[-.●]?([0-9]{4})$/,
                                        message: "invalid phone number"
                                }})} />  
                            </div>
                            { errors.phoneNumber && <p className="helper has-text-danger">{ errors.phoneNumber.message }</p >}
                        </div>
                    </div>                        
                </div>

                <div className="control">
                    <button className="button is-link login_button" onClick={handleSubmit(onSubmit)}>Get Authentication Code</button>
                </div>

                <br />

                <div className="field">
                    <label className="label">Authentication Code</label>
                    <div className="control">
                        <input 
                        className={`input ${errors.code && 'is-danger'}`}  
                        type="number" 
                        placeholder="Authentication Code" 
                        name='code'     
                        ref={ register({       
                            maxLength: {
                                value: 6,
                                message: 'should be 6 digits'
                            }}) }  />   
                        { errors.code && <p className="helper has-text-danger">{ errors.code.message }</p> }  
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
                            // required: true,
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
                            // required: true,
                            validate: (value) => value === watch('password')
                            }) }  />   
                        { errors.password2 && <p className="helper has-text-danger">must match the qrevious entry</p> }  
                    </div>
                </div>

                <div className="control">
                    <button className="button is-link login_button" onClick={handleSubmit(onSubmit2)}>Submit</button>
                </div>
            </form>
        </div>      
    );
}