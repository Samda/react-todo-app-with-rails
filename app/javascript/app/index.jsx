import React from 'react'

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {}
  }

  render(){
    return(
      <div className='main-todo' style={{ background: '#efefef', textAlign: 'center' }} >
        <h1> Todo list </h1>
        <div style={{margin: '0px auto', background: '#ddd', width: 300, padding: 0 }}>
          <form>
            <input type="text" style={{ fontSize: 20, width: '100%', padding: 0, margin: 0,  borderWidth: 0 }}/>
          </form>
          <TodoList />
        </div>
      </div>
    )
  }
}

class TodoList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      todos: [],
      todo: {},
      errors: '',
      isEditing: false
    }

    this.update = this.update.bind(this)
    this.clickHandler = this.clickHandler.bind(this)
  }

  componentDidMount() {
    fetch('http://localhost:3000/api/v1/todos')
      .then(res => res.json())
      .then(data => {
        const todos = data.todos
        this.setState({todos: todos})
      }).catch(error => {
        const errors = error.toString()
        this.setState({ errors: errors })
      });
  }

  update(e){
    var title;
    if(e.target.type === "text"){ title = {title: e.target.value} }
    const completed = {completed: this.refs.todoCompleted.checked}
    const todoData = Object.assign({}, title, completed)
    fetch(
      `http://localhost:3000/api/v1/todos/${e.target.dataset['todoId']}`,
      {
        method: 'put',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          todo: todoData
        })
      })
      .then(res => res.json())
      .then(data => {
        const todo = data.todo
        const stateTodos = Object.assign({}, this.state.todos);
        stateTodos[todo.id - 1].title = todo.title
        stateTodos[todo.id - 1].completed = todo.completed
        this.setState(stateTodos);
      }).catch(error => {
        const errors = error.toString()
        this.setState({ errors: errors })
      });
  }

  clickHandler(e){
    this.setState({
      isEditing: true,
      todo: this.state.todos[parseInt(e.target.dataset['todo']) - 1]
    })
  }

  render(){
    if (this.state.todos.length === 0 && this.state.errors.length === 0){
      return(
        <h1> Loading ... </h1>
      )
    }

    if(this.state.errors.length > 0){
      return(
        <p style={{color: 'red'}}>something went wrong !</p>
      )
    }

    if(this.state.todos.length > 0){
      return(
        <ul style={{padding: 20}}>
          {this.state.todos.map(todo =>
            <li key={todo.id} style={{ listStyleType: 'none', display: 'block' }} >
              <input type='checkbox' ref="todoCompleted" data-todo-id={ todo.id } defaultChecked={ todo.completed } onChange={ this.update }/>
              <Title
                todo={todo}
                update={this.update}
              />
            </li>
          )}
        </ul>
      )
    }
  }
}

class Title extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isEditing: false,
      todoId: 0
    }

    this.clickHandler = this.clickHandler.bind(this)
    this.handInputClose = this.handInputClose.bind(this)
  }

  clickHandler(e){
    this.setState({
      isEditing: true,
      todoId: parseInt(e.target.dataset['todoId'])
    })
  }

  handInputClose(e){
    if(["Enter", "Escape"].includes(e.key) || ['blur'].includes(e.type))
    this.setState({
      isEditing: false,
      todoId: 0
    })
  }

  render(){
    if(this.state.isEditing && this.state.todoId === this.props.todo.id){
      return(
        <input
          type="text"
          defaultValue={this.props.todo.title}
          onBlur={this.handInputClose}
          onKeyPress={this.handInputClose}
          onKeyUp={this.handInputClose}
          data-todo-id={this.props.todo.id}
          onChange={this.props.update}
          autoFocus
        />
      )
    }else{
      return(
        <span onClick={this.clickHandler} data-todo-id={this.props.todo.id} >{this.props.todo.title}</span>
      )
    }
  }
}


export default App
