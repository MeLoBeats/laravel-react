import React, {useEffect, useState} from 'react';
import kyClient from "../utils/ky-client";
import {Link} from "react-router-dom";

const User = () => {
  const [users, setUsers] = useState([])
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    getUsers()
  }, [])

  const getUsers = async () => {
    try {
      setLoading(true)
      const res: any = await kyClient.get('users').json()
      setUsers(res!.data)
    } catch (e) {
      console.log(e)
    }
    finally {
      setLoading(false)
    }

  }

  async function handleDelete(user: any) {
    if(!window.confirm("Are youre sure you want to delete this user ?")) {
      return
    }
    try {
      await kyClient.delete(`users/${user.id}`)
      getUsers()
    } catch (e) {

    }
  }

  return (
        <div>
            <div style={{ display: "flex", justifyContent: 'space-between', alignItems: 'center'}}>
              <h1>Users</h1>
              <Link to="/user/new" className="btn-add">Add new</Link>
            </div>
            <div className="card animated fadeInDown">
              <table>
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Create Date</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                {loading ? (

                <tbody>
                <tr>
                  <td colSpan={5} className="text-center">
                    Loading
                  </td>
                </tr>
                </tbody>
                ) : (
                <tbody>
                {users.map((user: any) => (
                  <tr key={user.id}>
                    <td>{user.id}</td>
                    <td>{user.name}</td>
                    <td>{user.email}</td>
                    <td>{user.created_at}</td>
                    <td>
                      <Link to={`/user/${user.id}`} state={{ user }} className="btn-edit">Edit</Link>
                      &nbsp;
                      <button onClick={(ev) => handleDelete(user)} className="btn-delete">Delete</button>
                    </td>
                  </tr>
                ))}
                </tbody>
                )}
              </table>
            </div>
        </div>
    );
};

export default User;
