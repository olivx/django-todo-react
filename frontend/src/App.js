import React, {Component} from 'react'
import axios from 'axios'
import './App.css';

import Modal  from './components/Modal'



class App extends Component{
  constructor(props){
    super(props)
    this.state = {
      modal: false,
      viewComplete: false,
      activeItem: {
        title: "",
        description: "",
        complete: false
      },
      todoList: [],

      }
    }

    componentDidMount(){
      this.refreshList()
    }

    refreshList = () => {
      axios
        .get('api/todo/')
        .then(resp => this.setState({todoList: resp.data}))
        .catch(err => console.log(err))
    }

    toggle =() => {
       this.setState({modal: !this.state.modal})
    }

    handleSubmit = item => {
      this.toggle()
      if(item.pk){
        axios
        .put(`/api/todo/${item.pk}/`, item)
        .then(resp => this.refreshList())
        .catch(err => console.log(err))
        return
      }else{
        axios
          .post('api/todo/', item)
          .then(resp => this.refreshList())
      }
    }

    handleDelete = item => {
      console.log('delete',item)
      axios
        .delete(`/api/todo/${item.pk}`)
        .then(resp => this.refreshList())
    }
    
    createItem = () => {
      this.toggle()
      const item = {title: "", description: "" , complete: false}
      this.setState({activeItem: item, modal: !this.state.modal})
    }

    editItem = item => {
      this.setState({activeItem: item, modal: !this.state.modal})
    }
    

  displayComplete = status => {
    if(status){
      return this.setState({viewComplete: true})
    }
    return this.setState({viewComplete: false})
  }

  renderTabList = () =>{
    return(
        <div className="my-5 tab-list">
          <span
              onClick={() => this.displayComplete(true)}
              className={this.state.viewComplete ? "active": ""}
          >
            complete 
          </span>
          <span
            onClick={() => this.displayComplete(false)}
            className={this.state.viewComplete ? "": "active"}
          >
            Imcomplete
          </span>
          
        </div>
    ) 
  }

  renderItems = () => {
    const { viewComplete } = this.state

    const newItems = this.state.todoList.filter(
       item => item.complete === viewComplete
    )
    return newItems.map( (item, index) =>(
      <li key={index}
        className="list-group-item d-flex justify-content-between align-items-center">

        <span 
        title={item.description}
        className={`todo-tile mr-2 ${this.state.viewCompleted ? "completed-todo" : ""}`}
        >
          {item.title}
        </span>
        <span>
          <button className="btn btn-secondary mr-2" onClick={() => this.editItem(item)}> Edit</button>
          <button className="btn btn-danger mr-2" onClick={() => this.handleDelete(item)}> Delete </button>
        </span>
      </li>
     )
    )
  }
  render(){
      return (
        <main className="content">
          <h1 className="text-white text-uppercase text-center my-4">Todo app</h1>
          <div className="row ">
            <div className="col-md-6 col-sm-10 mx-auto p-0">
              <div className="card p-3">
                <div className="">
                  <button className="btn btn-primary" onClick={ this.createItem }>Add task</button>
                </div>
                {this.renderTabList()}
                <ul className="list-group list-group-flush">
                  {this.renderItems()}
                </ul>
              </div>
            </div>
          </div>
          {this.state.modal ? (
            <Modal 
              activeItem={this.state.activeItem}
              toggle={this.toggle}
              onSave={this.handleSubmit}
              />
          ): null }
        </main>
    )
  }
}

export default App;
