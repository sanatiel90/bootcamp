import React, { Component, Fragment } from 'react'

import PostHeader from './PostHeader'

class Post extends Component {
    render(){
        const { postInfo } = this.props
        return (
            <div className="post-content">
                <PostHeader avatar={postInfo.avatar} author={postInfo.author} time={postInfo.time} />
                <p>{postInfo.post}</p>
            </div>
        )
    }
}

export default Post


