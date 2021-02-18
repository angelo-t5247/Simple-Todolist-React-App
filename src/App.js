import React, {Component} from 'react';
import {BrowserRouter as Router, Route} from 'react-router-dom'
import Header from './Components/layout/Header'
import Todos from './Components/Todos'
import AddTodo from './Components/AddTodo'
import About from './Components/pages/About'
// import {v4 as uuid} from "uuid"; 
import axios from 'axios'
import './App.css';

class App extends Component{
  state = {
    todos: []
  }

  componentDidMount(){
    axios
    .get('https://jsonplaceholder.typicode.com/todos?_limit=10')
    .then(res => this.setState({todos: res.data}))
  }
 
  //Mark complete
  markComplete = id => {
    this.setState({
      todos: this.state.todos.map(todo => {
      if (todo.id === id){
        todo.isDone = !todo.isDone; 
      }
      return todo;
      })
  });
};

delTodo = (id) => {

  axios
    .delete(`https://jsonplaceholder.typicode.com/todos/${id}`)
    .then(res => this.setState({
      todos: [...this.state.todos.filter(todo => todo.id !== id)]
  }))

  this.setState({todos:[...this.state.todos.filter(todo => todo.id !== id)]})
}

AddTodo = (title) => {

  axios.post('https://jsonplaceholder.typicode.com/todos', {
    title: title,
    isDone: false
  })
  .then(res => this.setState({todos: [...this.state.todos, res.data]}))
  // this.setState({todos: [...this.state.todos, newTodo]})
}

  render(){
    console.log(this.state.todos)
     return (
       <Router>
        <div className="App"> 
          <Header />
          <Route 
            path="/Simple-Todolist-React-App" 
            render={props => (
              <React.Fragment>
              <div className="container">
              <AddTodo AddTodo={this.AddTodo} />
         
              <Todos 
              todos={this.state.todos} 
              markComplete={this.markComplete} 
              delTodo={this.delTodo}/>
             
            </div>
            </React.Fragment>
            )}
         />
         <Route path="/about" component={About} />
        </div>
      </Router>
    )
  }
}

export default App;
