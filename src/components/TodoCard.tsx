import React from "react";
import { Todo } from "../App";



interface TodoCardProps {
  item: Todo;
  newData: (data: Todo[]) => void;
}

class TodoCard extends React.Component<TodoCardProps> {
  updateStatus = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { item } = this.props;
    const status = e.target.checked;
    fetch(`https://todo-backend.cyclic.app/update/${item._id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ status: status })
    })
      .then(() => {
        this.updateData();
      })
      .catch((error) => {
        console.log(error);
      });

  };

  handleDelete = () => {
    const { item } = this.props;
    fetch(`https://todo-backend.cyclic.app/delete/${item._id}`, {
      method: 'DELETE'
    })
      .then(() => {
        this.updateData();
      })
      .catch((error) => {
        console.log(error);
      });

  };

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
  };

  render() {
    const { item } = this.props;
    return (
      <div className="px-4 py-6 rounded-md bg-white shadow-md">
        <div className="flex gap-3 justify-between items-center">
          <h5 className={`${item.status && "line-through text-gray-400"}`}>{item.title}</h5>
          <input type="checkbox" checked={item.status} onChange={this.updateStatus} className="cursor-pointer" />
        </div>
        <div className="flex justify-center mt-4">
          <button
            onClick={this.handleDelete}
            className="bg-red-600 rounded-md px-3 py-2 text-xs text-white"
          >
            Delete
          </button>
        </div>
      </div>
    );
  }
}

export default TodoCard;
