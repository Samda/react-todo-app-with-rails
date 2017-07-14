import React from 'react'

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      todos: [
        { id: 1, title: 'Learn', completed: true, image: ''},
        { id: 2, title: 'Practice', completed: false, image: ''},
        { id: 3, title: 'Work', completed: false, image: ''}
      ]
    }
  }

  clickHandler(e){
    debugger;
    console.log(this.Children)
  }

  update(){
    this.setState({
    })
  }

  render(){
    return(
      <div className='main-todo' style={{ background: '#efefef', textAlign: 'center' }} >
        <h1> Todo list </h1>
        <div style={{margin: '0px auto', background: '#ddd', width: 300, padding: 0 }}>
          <form>
            <input type="text" style={{ fontSize: 20, width: '100%', padding: 0, margin: 0,  borderWidth: 0 }}/>
          </form>
          <ul style={{padding: 0}}>
            {this.state.todos.map(todo =>
              <li key={todo.id} style={{ listStyleType: 'none', display: 'block' }} onClick={this.clickHandler.bind(this)}>
                <input type='checkbox' defaultChecked={ todo.completed }/>
                {todo.title}
              </li>
            )}
          </ul>
        </div>
      </div>
    )
  }
}

export default App
