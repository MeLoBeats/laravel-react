import React, {MouseEventHandler, useCallback, useEffect} from 'react';
import {Link, Navigate, Outlet} from "react-router-dom";
import {useStateContext} from "../context/StateContextProvider";
import kyClient from "../utils/ky-client";

const DefautLayout = () => {
  const { user, token, setUser, setToken, notification } = useStateContext()

  if(!token) {
    return <Navigate to="/login" />
  }

  const onLogout = async (ev: any) => {
    ev.preventDefault()
    try {
      await kyClient.post('logout')
      setUser!({})
      setToken!(null)
    } catch (e) {

    }
  }

    const fetchingData = async () => {
      const user = await kyClient.get('user').json()
      setUser!(user)
    }
  useEffect(() => {
    fetchingData()
  }, [])

  return (
    <div id="defaultLayout">
      <aside>
        <Link to="/dashboard">Dashboard</Link>
        <Link to="/users">Users</Link>
      </aside>
      <div className="content">
        <header>
          <div>
            Header
          </div>
          <div>
            {user.name}
            <a className="btn-logout" href="#" onClick={onLogout}>Logout</a>
          </div>
        </header>
        <main>
          <Outlet />
        </main>
        {notification &&
          <div className="notification">
            {notification}
          </div>
        }
      </div>
    </div>
  );
};

export default DefautLayout;
