import React, { Fragment } from 'react'
import './style.css'

const LateralBar = ({ users, deleteUser }) => (
        <Fragment>
            <div className="container">
                {users.map(user => (
                    <div className="row-user" key={user.id}>
                            <img className="imagem" src={user.avatar} alt={user.name}/>
                            <strong>{user.name}</strong>
                            <button type="button" onClick={() => { deleteUser(user.id) }} >X</button>
                    </div>
                ))}
            </div>
        </Fragment>    
)

export default LateralBar