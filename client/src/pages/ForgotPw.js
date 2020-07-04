import React from 'react';
import { useForm } from 'react-hook-form';
import axios from 'commons/axios';

export default function ForgotPw(props) {
    const { register, handleSubmit, errors } = useForm();

    const submitHandler = async (data) => {
        try {
            const { phoneNumber } = data;
            // post phone number to server side
            const res = await axios.post('/auth/forgotpw', { phoneNumber });
            // route to reset password page
            props.history.push('/resetpw');
        } catch (error) {
            console.log(error);
        }
    };

    return(
        <div className="login_wrapper">
            <form action="" className="box login_box" onSubmit={ handleSubmit(submitHandler) }>
                <div className="field">
                    <label className="label">Phone Number</label>             
                    <div class="field-body">
                        <div class="field is-expanded">
                            <div class="field has-addons">
                                <p class="control">
                                <p class="button is-static">+1</p>
                                </p>
                                <input 
                                type="text" 
                                className={`input ${errors.phoneNumber && 'is-danger'}`}
                                placeholder="Enter your phone number" 
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

                <div className="control">
                    <button className="button is-link login_button">Submit</button>
                </div>
            </form>
        </div>
    )
}