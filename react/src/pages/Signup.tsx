import React, {FormEvent, LegacyRef, MutableRefObject, useRef, useState} from 'react';
import {Link} from "react-router-dom";
import kyClient from "../utils/ky-client";
import {useStateContext} from "../context/StateContextProvider";

const SignUp = () => {

  const [errors, setErrors] = useState(null);

  const formRef: any = useRef()

  const { setUser, setToken } = useStateContext()
  async function handleSubmit(e: FormEvent) {
    e.preventDefault()
    const payload = {
      name: formRef.current[0].value,
      email: formRef.current[1].value,
      password: formRef.current[2].value,
      password_confirmation: formRef.current[3].value,
    }
    try {
      const response = await kyClient.post('signup', {
        json: payload
      }).json()
      // @ts-ignore
      setUser!(response!.user)
      // @ts-ignore
      setToken!(response!.token)
    } catch (err: any) {
      const res = err.response
      const data = await res.json()
      if(res && res.status === 422) {
        setErrors(data.errors)
      }
        throw  err;
    }
  }

  return (
      <div className="login-signup-form animated fadeInDown">
        <div className="form">
          <form ref={formRef} onSubmit={handleSubmit}>
            <h1 className="title">Signup for free</h1>
            {errors && <div className="alert">
              {Object.keys(errors).map((key: any) => (
                <p key={key}>{errors[key][0]}</p>
              ))}
            </div>
            }
            <input type="text" placeholder="Full name" />
            <input type="email" placeholder="Email" />
            <input type="password" placeholder="Password" />
            <input type="password" placeholder="Password Confirmation" />
            <button type="submit" className="btn btn-block">Sign Up</button>
            <p className="message">
              Already Registered ? <Link to="/login">Sign In</Link>
            </p>
          </form>
        </div>
      </div>
    );
};

export default SignUp;
