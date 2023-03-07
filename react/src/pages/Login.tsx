import React, {FormEvent, useRef, useState} from 'react';
import {Link} from "react-router-dom";
import kyClient from "../utils/ky-client";
import {useStateContext} from "../context/StateContextProvider";

const Login = () => {

  const [errors, setErrors] = useState<any>(null);

  const { setUser, setToken } = useStateContext()

  const formRef = useRef<any>()
  async function handleSubmit(e: FormEvent) {
    e.preventDefault()
    const payload = {
      email: formRef.current[0].value,
      password: formRef.current[1].value,
    }
    try {
      const response = await kyClient.post('login', {
        json: payload
      }).json()
      // @ts-ignore
      setUser!(response!.user)
      // @ts-ignore
      setToken!(response!.token)
      setErrors(null);
    } catch (err: any) {
      const res = err.response
      const data = await res.json()
      if(res && res.status === 422) {
        if(data.errors) {
          setErrors(data.errors)
        } else {
          setErrors({
            email: [data.message]
          })
        }
      }
      throw  err;
    }
  }

  return (
        <div className="login-signup-form animated fadeInDown">
            <div className="form">
              <form ref={formRef} onSubmit={handleSubmit}>
                <h1 className="title">Login into your account</h1>
                {errors && <div className="alert">
                  {Object.keys(errors).map((key: any) => (
                    <p key={key}>{errors[key][0]}</p>
                  ))}
                </div>
                }
                <input type="email" placeholder="Email" />
                <input type="password" placeholder="Password" />
                <button type="submit" className="btn btn-block">Login</button>
                <p className="message">
                  Not Registered ? <Link to="/signup">Sign Up</Link>
                </p>
              </form>
            </div>
        </div>
    );
};

export default Login;
