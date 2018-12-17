import React, { Component, Fragment } from 'react'

class PostHeader extends Component {
    render(){
        const { avatar, author, time } = this.props
        return(
           <div className="post-header">
                <img src={avatar}/>
                <strong>{author}</strong> - 
                <p>{time}</p>
           </div>
        )
    }

}

export default PostHeader