import React, { Component } from 'react'
import axios from 'axios'
import './App.css'

const apiEndpoint = 'https://jsonplaceholder.typicode.com/todos'

class App extends Component {
  state = {
    posts: [],
    isDialogOpen: false,
    lastUpdatedPost: {},
    lastUpdatedPostIndex: ''
  }

  async componentDidMount() {
    const { data: posts } = await axios.get(apiEndpoint)
    this.setState({ posts })
  }

  handleAdd = async () => {
    const text = document.getElementById('userInput').value

    const obj = { title: text }
    const { data: post } = await axios.post(apiEndpoint, obj)

    const posts = [post, ...this.state.posts]
    this.setState({ posts })
  }

  openDialog = (post) => {
    //this.state.lastUpdatedPost = { ...post }
    const index = this.state.posts.indexOf(post);

    this.setState({ isDialogOpen: true, lastUpdatedPostIndex: index, lastUpdatedPost: post })
  }

  closeDialog = () => {
    //this.setState({ isDialogOpen: false })
    this.state.isDialogOpen = false
    this.handleUpdate()
  } 

  handleUpdate = async () => {
    const text = document.getElementById('update').value

    const posts = [...this.state.posts]
    const post = {...this.state.posts[this.state.lastUpdatedPostIndex]}
    post.title = text;
    posts[this.state.lastUpdatedPostIndex] = {...post}
    this.setState({posts});

    try {
      await axios.put(apiEndpoint + '/' + post.id, post)
    } catch (ex) {
      if (ex.response && ex.response.status === 404)
        alert('This post has already been updated.')
      else {
        console.log('Logging the error', ex)
        alert('An unexpected error has occured.')
      }
      posts[this.state.lastUpdatedPostIndex] = {...this.state.lastUpdatedPost}
    this.setState({posts});
    }
    //creating a local copy of that object
    // const localPost = { ...post }
    // //updating the post title
    // post.title = 'updated'
    // this.forceUpdate()
    // try {
    //   await axios.put(apiEndpoint + '/' + post.id, post)
    // } catch (ex) {
    //   if (ex.response && ex.response.status === 404)
    //     alert('This post has already been updated.')
    //   else {
    //     console.log('Logging the error', ex)
    //     alert('An unexpected error has occured.')
    //   }
    //   post.title = localPost.title
    //   this.forceUpdate()
    // }
  }

  handleDelete = async (post) => {
    const originalPosts = this.state.posts

    const posts = this.state.posts.filter((p) => p.id !== post.id)
    this.setState({ posts })

    try {
      await axios.delete(apiEndpoint + '/' + post.id)
    } catch (ex) {
      if (ex.response && ex.response.status === 404)
        alert('This post has already been deleted.')
      else {
        console.log('Logging the error', ex)
        alert('An unexpected error has occured.')
      }

      this.setState({ posts: originalPosts })
    }
  }

  render() {
    return (
      <React.Fragment>
        <h1 style={{ textAlign: 'center' }}>To Do List</h1>

        {!this.state.isDialogOpen && (
          <div className="input-group mb-3">
            <input
              id="userInput"
              type="text"
              className="form-control"
              placeholder="Type here ..."
            />
            <div className="input-group-append">
              <button
                className="btn btn-primary"
                type="button"
                onClick={this.handleAdd}
              >
                Add Task
              </button>
            </div>
          </div>
        )}

        {this.state.isDialogOpen && (
          <div className="input-group mb-3">
            <input
              id="update"
              type="text"
              className="form-control"
              placeholder="Type here ..."
            />
            <div className="input-group-append">
              <button
                className="btn btn-primary"
                type="button"
                onClick={this.closeDialog}
              >
                Update
              </button>
            </div>
          </div>
        )}

        {/* <button className="btn btn-primary" onClick={this.handleAdd}>
          Add
        </button> */}

        {!this.state.isDialogOpen && (
          <table className="table">
            <thead>
              <tr>
                <th>Tasks</th>
                <th>Update</th>
                <th>Delete</th>
              </tr>
            </thead>
            <tbody>
              {this.state.posts.map((post) => (
                <tr key={post.id}>
                  <td>{post.title}</td>
                  <td>
                    <button
                      className="btn btn-info btn-sm"
                      onClick={() => this.openDialog(post)}
                    >
                      Update
                    </button>
                  </td>

                  <td>
                    <button
                      className="btn btn-danger btn-sm"
                      onClick={() => this.handleDelete(post)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </React.Fragment>
    )
  }
}

export default App
