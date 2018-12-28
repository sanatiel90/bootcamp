import React, { Fragment } from 'react'
import { Container, RowUser } from './styles'

const LateralBar = ({ users, deleteUser }) => (
        <Fragment>
            <Container>
                {users.map(user => (
                    <RowUser key={user.id}>
                            <img src={user.avatar} alt={user.name}/>
                            <div className="info-user">
                                <strong>{user.name}</strong>
                                <small>{user.repositories} repositórios</small>
                            </div>
                            <button type="button" onClick={() => { deleteUser(user.id) }} ><i className="fas fa-times"></i></button>
                            <a href={user.url} target="_blank" rel="noopener noreferrer" ><i className="fas fa-angle-right"></i></a>
                    </RowUser>
                ))}
            </Container>
        </Fragment>    
)

export default LateralBar