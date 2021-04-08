import './App.css';
import React from 'react';


const INIT_TODOS=[
  'Learn React',
  'Meet friend',
  'Build an App',
]
//创建函数式组件Todo
function Todo({todo}){
  return(
    <div className="todo">
      {todo}
    </div>
  )
}

function App() {
  return (
    <div className="app">
      <div className="todo-list">
        <input className="input"/>
        {
          INIT_TODOS.map((v)=>(
            <Todo key={v} todo={v} />
          ))
        }

      </div>     
    </div>
  );
}

export default App;
