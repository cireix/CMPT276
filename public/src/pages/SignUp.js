import React, {useState} from 'react';
import {useForm} from 'react-hook-form';
import axios from 'axios';
import { toast } from 'react-toastify';
import decode from 'jwt-decode';

export default function SignUp(props) {
    const { register, handleSubmit, errors, watch } = useForm();
    var [codeSent,setCodeSent] = useState(false);
    // Get name, phone number, and password that user input in the form
    const onSubmit = data => {    
            const { nickname, phoneNumber, password } = data;
            // post to server side for register
            // api/users/register'
            axios.post('api/users/register', { name: nickname, phone: phoneNumber, password: password, password2:password})
            .then(res=>{console.log('res=>',res);
                toast.success('Sent verification code');
                setCodeSent(true);
            })
            .catch((err)=>toast.error(err.response.data.message));

    };

    // Get phone number, and verification code that user input in the form
    const onSubmit2 = async(data) => {    
        try {
            const { phoneNumber, code } = data;
            // post to server side for register
            // api/users/register2
            const res = await axios.post('api/users/register2', { phone: phoneNumber,code });
            // receive a jwtoken from server side if successful
            const jwToken = res.data.token.replace('Bearer ','');
            console.log(decode(jwToken));
            // store the token locally
            global.auth.setToken(jwToken); 
            // route to the home page 
            props.history.push('/');
            toast.success("Sign up successfully!");
        } catch (error) {
            const message = error.response.data.message;
            toast.error(message);
        }
};


    return(
        <div className="login_wrapper">
            <form className="box login_box" >
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
                                <p class="button is-static">+1</p>
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
                        type="password" 
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
                        type="password" 
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
                    <button className="button is-link login_button" onClick={handleSubmit(onSubmit)}>Get Authentication Code</button>
                </div>
                <br />
                <div className="field">
                    <label className="label">Authentication Code</label>
                    <div className="control">
                        <input 
                        disabled = {(codeSent)?"":"disabled"}
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

                <div className="control">
                    <button className="button is-link login_button" onClick={handleSubmit(onSubmit2)} disabled = {(codeSent)?"":"disabled"}>Submit</button>
                </div>
            </form>
        </div>      
    );
}
