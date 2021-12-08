import React, { Component } from 'react'
import axios from 'axios'
import SearchBox from './components/searchBox';
import './App.css'
import InputField from './components/inputField';
import Button from './components/button';
import Table from './components/table';

const apiEndpoint = 'http://localhost:3000/api/tasks';

class App extends Component {
  state = {
    posts: [],
    isDialogOpen: false,
    lastUpdatedPost: {},
    lastUpdatedPostIndex: '',
    searchQuery: '',
  }


  handleSearch = (query) => {
    this.setState({ searchQuery: query })
  }

  getPageData = () => {

    let filtered = this.state.posts

    if (this.state.searchQuery) {
      filtered = this.state.posts.filter((m) =>
        m.name.toLowerCase().startsWith(this.state.searchQuery.toLowerCase()),
      )
    }

    return { filtered }
  }

  async componentDidMount() {
    const { data: posts } = await axios.get(apiEndpoint)
    this.setState({ posts })
  }

  handleAdd = async () => {
    const text = document.getElementById('userInput').value

    const obj = { name: text }
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
    const text = document.getElementById('userInput').value

    const posts = [...this.state.posts]
    const post = { ...this.state.posts[this.state.lastUpdatedPostIndex] }
    post.name = text;
    posts[this.state.lastUpdatedPostIndex] = { ...post }
    this.setState({ posts });

    try {
      await axios.put(apiEndpoint + '/' + post._id, post)
    } catch (ex) {
      if (ex.response && ex.response.status === 404)
        alert('This post has already been updated.')
      else {
        console.log('Logging the error', ex)
        alert('An unexpected error has occured.')
      }
      posts[this.state.lastUpdatedPostIndex] = { ...this.state.lastUpdatedPost }
      this.setState({ posts });
    }
  }

  handleDelete = async (post) => {
    const originalPosts = this.state.posts

    const posts = this.state.posts.filter((p) => p._id !== post._id)
    this.setState({ posts })

    try {
      await axios.delete(apiEndpoint + '/' + post._id)
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

    //getting the list of all the posts we want to add in the table
    const { filtered: posts } = this.getPageData();


    return (
      <React.Fragment>

        {/* main logo */}
        <h1 style={{ textAlign: 'center' }}>To Do List</h1>


        {/* if we want to update the page, show the update input field */}
        {this.state.isDialogOpen && (
          <div className="input-group mb-3">
            <InputField placeholder={'Type here ...'} />
            <div className="input-group-append">
              <Button onClick={this.closeDialog} text={'Update Task'} className={'btn btn-primary'} />
            </div>
          </div>
        )}

        {/* if we dont want to update the page, show the to-do list */}
        {!this.state.isDialogOpen && (
          <React.Fragment>
            <div className="input-group mb-3">
              <InputField placeholder={'Type here ...'} />
              <div className="input-group-append">
                <Button onClick={this.handleAdd} text={'Add Task'} className={'btn btn-primary'} />
              </div>
            </div>

            <SearchBox onChange={this.handleSearch}></SearchBox>

            <Table posts={posts} onUpdate={this.openDialog} onDelete={this.handleDelete} />
          </React.Fragment>
        )}

      </React.Fragment>
    )
  }
}

export default App