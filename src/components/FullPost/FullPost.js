import React, { Component } from 'react';
import axios from 'axios';

import './FullPost.css';

class FullPost extends Component {
    state = {
        loadedPost: null
    };

    componentDidUpdate () {
        if (this.props.id) {
            if (!this.state.loadedPost || (this.state.loadedPost && this.state.loadedPost.id !== this.props.id)) {
                axios.get('/Posts/' + this.props.id)
                .then(response => {
                    console.log(response);
                    this.setState({ loadedPost: response.data });
                });
            }
        }
    }

    postDeleteHandler = (postId) => {
        axios.delete('/Posts/' + postId)
            .then(res => {
                console.log(res);
                this.setState({ loadedPost: null });
            });
    };

    render () {
        let post = <p style={{textAlign: 'center'}}>Please select a Post!</p>;
        if (this.props.id) {
            post = <p style={{textAlign: 'center'}}>Loading...!</p>;
        }

        if (this.state.loadedPost) {
            post = (
                <div className="FullPost">
                    <h1>{this.state.loadedPost.title}</h1>
                    <p>{this.state.loadedPost.body}</p>
                    <div className="Edit">
                        <button onClick={() => this.postDeleteHandler(this.state.loadedPost.id)} className="Delete">Delete</button>
                    </div>
                </div>
    
            );
        }
        return post;
    }
}

export default FullPost;