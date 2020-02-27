import React, { Component } from 'react';
import { v4 as uuidv4 } from 'uuid';

const format_date = date => {
  return [date.getFullYear(), date.getMonth() + 1, date.getDate()].join('.');
}

class App extends Component {
  state = {
    todos: [
      {
        id: 0,
        title: 'Make dinner for my wonderful family',
        date: new Date()
      },
      {
        id: 1,
        title: 'Prepare papers for presentation',
        date: new Date()
      },
      {
        id: 2,
        title: 'Give this guy a job',
        date: new Date()
      },
      {
        id: 3,
        title: 'Work, work, work!',
        date: new Date()
      },
    ]
  }

  add_todo = () => {
    const title = this._input_element.value;
    if (title !== '') {
      this.setState(state => {
        const todo = {
          id: uuidv4(),
          title: title,
          date: new Date(),
        }
        state.todos = [todo, ...state.todos];
        return state;
      });
      this._input_element.value = '';
    }
  }

  delete_todo = id =>{
    console.log(id);
    const todos = this.state.todos.filter(todo=> todo.id !== id);
    this.setState({todos})
  }

  componentDidUpdate(prevProps, prevState) {
    localStorage.setItem('todos', JSON.stringify(this.state.todos));
  }

  componentDidMount() {
    if (localStorage.todos !== undefined) {
      const todos = JSON.parse(localStorage.todos).map(todo => {
        return {
          ...todo,
          date: new Date(todo.date)
        }
      });
      this.setState({ todos });
    }
  }


  render = () => {
    const { todos } = this.state;
    return (
      <div className="container">
        <div className="header">
          <div className="header__input">
            <input
              type="text"
              ref={a => this._input_element = a}
              placeholder="Todo"
              onKeyPress={e => { if (e.key === 'Enter') this.add_todo(); }} />
            <button onClick={this.add_todo}>Add</button>
          </div>
        </div>

        <div className="todo__container">
          { todos.length < 1 ? <p className="todo__empty">Your todo list is empty.</p>: null}
          {
            todos.map(todo => (
              <div className="todo" key={todo.id}>
                <div className="todo__data">
                  <div className="todo__data__title">{todo.title}</div>
                  <div className="todo__data__date">{format_date(todo.date)}</div>
                </div>
                <div className="todo__action">
                  <button className="todo__action__delete">
                    <i className="fa fa-trash-o" onClick={()=> this.delete_todo(todo.id)}></i>
                  </button>
                </div>
              </div>
            ))
          }
        </div>
      </div>
    );
  }
}

export default App;
