import React, {useEffect, useState} from 'react';
import kyClient from "../utils/ky-client";
import {Link, useLocation, useNavigate, useParams} from "react-router-dom";
import {useStateContext} from "../context/StateContextProvider";

const UserForm = () => {
  const location = useLocation()
  const state = location?.state?.user;
  const navigate = useNavigate()
  const { id } = useParams()
  const { setNotification } = useStateContext()
  const [errors, setErrors] = useState(null)
  const [loading, setLoading] = useState(false)
  const [user, setUser] = useState<any>({
    id: null,
    name: '',
    email: '',
  })

  if(id) {
    useEffect(() => {
      setLoading(true)
      if(state) {
        setUser(state)
        setLoading(false)
      } else {
        kyClient.get(`users/${id}`).then(r => r.json()).then((u: any) => setUser(u)).finally(() => setLoading(false));
      }
    }, [])
  }

  const onSubmit = (ev: any) => {
    ev.preventDefault()
    if (user.id) {
      kyClient.put(`users/${user.id}`, {json: user})
        .then(() => {
          setNotification('User was successfully updated')
          navigate('/users')
        })
        .catch(err => {
          const response = err.response;
          if (response && response.status === 422) {
            setErrors(response.data.errors)
          }
        })
    } else {
      kyClient.post('users', {
        json: {
          user
        }
      })
        .then(() => {
          setNotification('User was successfully created')
          navigate('/users')
        })
        .catch(err => {
          const response = err.response;
          if (response && response.status === 422) {
            setErrors(response.data.errors)
          }
        })
    }
  }

  return (
    <>
      {user.id && <h1>Update User: {user.name}</h1>}
      {!user.id && <h1>New User</h1>}
      <div className="card animated fadeInDown">
        {loading && (
          <div className="text-center">
            Loading...
          </div>
        )}
        {errors &&
          <div className="alert">
            {Object.keys(errors).map(key => (
              <p key={key}>{errors[key][0]}</p>
            ))}
          </div>
        }
        {!loading && (
          <form onSubmit={onSubmit}>
            <input value={user.name} onChange={ev => setUser({...user, name: ev.target.value})} placeholder="Name"/>
            <input value={user.email} onChange={ev => setUser({...user, email: ev.target.value})} placeholder="Email"/>
            <input type="password" onChange={(ev: any) => setUser({...user, password: ev.target.value})} placeholder="Password"/>
            <input type="password" onChange={(ev: any) => setUser({...user, password_confirmation: ev.target.value})} placeholder="Password Confirmation"/>
            <button className="btn">Save</button>
          </form>
        )}
      </div>
    </>
  )
};

export default UserForm;
