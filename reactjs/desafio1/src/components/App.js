import React, { Component, Fragment } from 'react'
import Header from './Header'
import Post from './Post'

class App extends Component {
    state = {
        posts :  [
            { id: '1', avatar:'', author: 'user 1', post: 'post 1', time: '12:03' },
            { id: '2',avatar:'',  author: 'user 2', post: 'post 2', time: '15:56' },
            { id: '3', avatar:'', author: 'user 3', post: 'post 3', time: '09:18' },
            { id: '4', avatar:'', author: 'user 4', post: 'post 4', time: '18:17' },
            { id: '5', avatar:'', author: 'user 5', post: 'post 5', time: '19:20' },
        ]
    }

    render(){
        return (
           <Fragment>
               <Header/>
                <div className="posts-container">
                    { this.state.posts.map((e) => {    
                        return <Post key={e.id} postInfo={e} />       
                    }) }
                </div>
            </Fragment>
        )
    }
}

export default App
