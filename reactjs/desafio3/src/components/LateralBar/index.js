import React, { Component, Fragment } from 'react'
import './style.css'

class LateralBar extends Component {
   
    render(){
        return(
            <Fragment>
                <div className="container">
                    {this.props.users.map(user => (
                        <Fragment>
                        <p>{user.name}</p>
                        <br/>
                        </Fragment>
                    ))}
                </div>
            </Fragment>
        )
    }
}

export default LateralBar