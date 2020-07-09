import React from 'react';
import {useForm} from 'react-hook-form';
import axios from 'axios';
import { toast } from 'react-toastify';
import decode from 'jwt-decode';
// import { render } from 'node-sass';

class SignUp extends React.Component{
    state = {
        codeSent: false
    }
    // Get name, phone number, and password that user input in the form
    onSubmit = data => {
            const { nickname, phoneNumber, password } = data;
            // post to server side for register
            // api/users/register'
            axios.post('api/users/register', { name: nickname, phone: phoneNumber, password: password, password2:password})
            .then(res=>{console.log('res=>',res);
                toast.success('Sent verification code');
                this.setState({
                    codeSent:true
                })
            })
            .catch((err)=>toast.error(err.response.data.message));

    };

    // Get phone number, and verification code that user input in the form
    onSubmit2 = async(data) => {
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
            this.props.history.push('/');
            toast.success("Sign up successfully!");
        } catch (error) {
            const message = error.response.data.message;
            toast.error(message);
        }
    }
    render() {

        return(
            <div className="login_wrapper">
                <form className="box login_box" >
                    <div className="field">
                        <label className="label">Name</label>
                        <div className="control">
                            <input
                            className={`input ${this.props.errors.nickname && 'is-danger'}`}
                            type="text"
                            placeholder="Nickname"
                            name='nickname'
                            ref={ this.props.register({
                                required: true,
                                maxLength: {
                                    value: 10,
                                    message: 'cannot be more than 10 digits'
                                }}) }  />
                            { this.props.errors.nickname && <p className="helper has-text-danger">{ this.props.errors.nickname.message }</p> }
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
                                    className={`input ${this.props.errors.phoneNumber && 'is-danger'}`}
                                    placeholder="Phone number"
                                    name="phoneNumber"
                                    ref={this.props.register({
                                        required: true,
                                        pattern:{
                                            value: /^\(?([0-9]{3})\)?[-.●]?([0-9]{3})[-.●]?([0-9]{4})$/,
                                            message: "invalid phone number"
                                    }})} />
                                </div>
                                { this.props.errors.phoneNumber && <p className="helper has-text-danger">{ this.props.errors.phoneNumber.message }</p >}
                            </div>
                        </div>
                    </div>

                    <div className="field">
                        <label className="label">Password</label>
                        <div className="control">
                            <input
                            className={`input ${this.props.errors.password && 'is-danger'}`}
                            type="password"
                            placeholder="Password"
                            name='password'
                            ref={ this.props.register({
                                required: true,
                                minLength: {
                                    value: 6,
                                    message: 'cannot be less than 6 digits'
                                }}) } />
                            { this.props.errors.password && <p className="helper has-text-danger">{ this.props.errors.password.message }</p> }
                        </div>
                    </div>

                    <div className="field">
                        <label className="label">Confirm Password</label>
                        <div className="control">
                            <input
                            className={`input ${this.props.errors.password2 && 'is-danger'}`}
                            type="password"
                            placeholder="Confirm Password"
                            name='password2'
                            ref={ this.props.register({
                                required: true,
                                validate: (value) => value === this.props.watch('password')
                                }) }  />
                            { this.props.errors.password2 && <p className="helper has-text-danger">must match the qrevious entry</p> }
                        </div>
                    </div>

                    <div className="control">
                        <button className="button is-link login_button" onClick={this.props.handleSubmit(this.onSubmit)}>Get Authentication Code</button>
                    </div>
                    <br />
                    <div className="field">
                        <label className="label">Authentication Code</label>
                        <div className="control">
                            <input
                            className={`input ${this.props.errors.code && 'is-danger'}`}
                            type="number"
                            placeholder="Authentication Code"
                            name='code'
                            ref={ this.props.register({
                                maxLength: {
                                    value: 6,
                                    message: 'should be 6 digits'
                                }}) }
                            disabled = {(this.state.codeSent)?"":"disabled"}
                            />
                            { this.props.errors.code && <p className="helper has-text-danger">{ this.props.errors.code.message }</p> }
                        </div>
                    </div>

                    <div className="control">
                        <button className="button is-link login_button" onClick={this.props.handleSubmit(this.onSubmit2)} disabled = {(this.state.codeSent)?"":"disabled"} >Submit</button>
                    </div>
                </form>
            </div>
        );
    }
}
export default () => {
    const { register, handleSubmit, errors, watch } = useForm();
    return (
        <SignUp register={register} handleSubmit={handleSubmit} errors={errors} watch={watch}/>
    )
}
