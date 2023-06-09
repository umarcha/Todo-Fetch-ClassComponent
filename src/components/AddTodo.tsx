import React, { Component } from 'react';
import { Todo } from '../App';

interface Props {
  newData: (data: Todo[]) => void;
}

type State = {
  todo: string;
};

class AddTodo extends Component<Props, State> {
  state = {
    todo: "",
  };

  handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    fetch('https://todo-backend.cyclic.app/add-todo', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ title: this.state.todo, status: false })
    })
      .then(() => {
        this.updateData();
      })
      .catch((error) => {
        console.log(error);
      });
    this.setState({ todo: "" });
  }

  updateData = () => {
    fetch('https://todo-backend.cyclic.app/get-todo')
      .then(response => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error('Network response was not ok.');
        }
      })
      .then(data => {
        this.props.newData(data.todos);
      })
      .catch(error => {
        console.error('There was a problem fetching data:', error);
      });
  }

  render() {
    const { todo } = this.state;

    return (
      <div className="px-6 py-8 shadow-lg rounded-xl w-full max-w-md mx-auto mt-8">
        <form onSubmit={this.handleSubmit}>
          <input type="text" className="block outline-none border border-gray-400 rounded h-9 w-full px-2"
            onChange={(e) => this.setState({ todo: e.target.value })}
            required
            value={todo}
          />
          <button type="submit" className="mt-4 px-4 py-2 block mx-auto w-fit rounded font-semibold text-base leading-5 text-white bg-teal-600">
            Add Todo
          </button>
        </form>
      </div>
    );
  }
}

export default AddTodo;
