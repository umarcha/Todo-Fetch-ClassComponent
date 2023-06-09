import React from "react"
import AddTodo from "./components/AddTodo";
import TodoCard from "./components/TodoCard";

export interface Todo {
  _id: string;
  title: string;
  status: boolean;
}

interface AppState {
  data: Todo[];
}

class App extends React.Component<object, AppState> {
  constructor(props: object) {
    super(props);
    this.state = {
      data: [],
    };
  }

  componentDidMount() {
    fetch("https://todo-backend.cyclic.app/get-todo")
      .then(response => response.json())
      .then(data => {
        this.setState({ data: data.todos });
      })
      .catch(error => {
        console.log(error);
      });
  }

  handleNewData = (data: Todo[]) => {
    this.setState({ data });
  };

  render(): React.ReactNode {
    const { data } = this.state;
    return (
      <main className="max-w-4xl mx-auto px-5">
        <AddTodo newData={this.handleNewData} />
        <div className="grid grid-cols-2 gap-4 mt-12">
          {data.map((item, index) => (
            <TodoCard key={index} item={item} newData={this.handleNewData} />
          ))}
        </div>
      </main>
    )
  }
}

export default App