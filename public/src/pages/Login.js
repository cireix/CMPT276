import React from "react";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { login } from "../service/service";
import { toast } from "react-toastify";
import Layout from "../Layout";
import "../css/login.scss";
import { setToken } from "../globalFunc/auth";
import { setUser } from "../globalFunc/Socket";

export default function Login(props) {
  const { register, handleSubmit, errors } = useForm();

  const submitHandler = (data) => {
    //global.auth.logOut();
    const { phoneNumber, password } = data;
    // post to server side for login
    // api/users/login

    login({ phone: phoneNumber, password: password })
      .then((res) => {
        const jwToken = res.data.token.replace("Bearer ", "");
        // store the token locally
        setToken(jwToken);
        // route to the home page
        props.history.push("/");
        toast.success("Login successful!");
        //assign user to socket
        setUser({"phoneNumber":"+1"+phoneNumber})
      })
      .catch((error) => {
        const message = error.response.data.message;
        toast.error(message);
      });
    // const res = await axios.post('api/users/login', );
    // receive a jwtoken from server side if success
  };

  return (
    <Layout>
      <div className='login_wrapper' data-test='login-wrapper'>
        <form
          action=''
          className='box login_box'
          onSubmit={handleSubmit(submitHandler)}
        >
          <div className='field'>
            <label className='label'>Phone Number</label>
            <div className='field-body'>
              <div className='field is-expanded'>
                <div className='field has-addons'>
                  <p className='button is-static'>+1</p>
                  <input
                    type='text'
                    className={`input ${errors.phoneNumber && "is-danger"}`}
                    placeholder='Phone number'
                    name='phoneNumber'
                    ref={register({
                      required: true,
                      pattern: {
                        value: /^\(?([0-9]{3})\)?[-.●]?([0-9]{3})[-.●]?([0-9]{4})$/,
                        message: "invalid phone number",
                      },
                    })}
                  />
                </div>
                {errors.phoneNumber && (
                  <p className='helper has-text-danger'>
                    {errors.phoneNumber.message}
                  </p>
                )}
              </div>
            </div>
          </div>

          <div className='field'>
            <label className='label'>Password</label>
            <div className='control'>
              <input
                type='password'
                className={`input ${errors.password && "is-danger"}`}
                placeholder='Password'
                name='password'
                ref={register({
                  required: true,
                  minLength: {
                    value: 6,
                    message: "cannot be less then 6 digits",
                  },
                })}
              />
              {errors.password && (
                <p className='helper has-text-danger'>
                  {errors.password.message}
                </p>
              )}
              <Link to='/forgotpw' className='has-text-danger forgotpw'>
                forgot password?
              </Link>
            </div>
          </div>

          <div className='control'>
            <button className='button is-link login_button'>Login</button>
          </div>
        </form>
      </div>
    </Layout>
  );
}
