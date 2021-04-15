import React, { useState,useEffect } from 'react';
import './App.css';

// 引入外部图标 
const removeIcon =<svg t="1618469840530" className="icon" viewBox="0 0 1028 1028" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="3413" width="200" height="200"><path d="M256 810.666667c0 46.933333 38.4 85.333333 85.333333 85.333333h341.333334c46.933333 0 85.333333-38.4 85.333333-85.333333V298.666667H256v512z m105.173333-303.786667l60.373334-60.373333L512 536.96l90.453333-90.453333 60.373334 60.373333L572.373333 597.333333l90.453334 90.453334-60.373334 60.373333L512 657.706667l-90.453333 90.453333-60.373334-60.373333L451.626667 597.333333l-90.453334-90.453333zM661.333333 170.666667l-42.666666-42.666667H405.333333l-42.666666 42.666667h-149.333334v85.333333h597.333334V170.666667z" p-id="3414" fill="#7868e6"></path></svg>
const completeIcon=<svg t="1618473904074" className="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="3058" width="200" height="200"><path d="M853.32992 102.4H170.67008C133.13024 102.4 102.4 133.13024 102.4 170.67008v682.65984C102.4 890.86976 133.13024 921.6 170.67008 921.6h682.65984C890.86976 921.6 921.6 890.86976 921.6 853.32992V170.67008C921.6 133.13024 890.86976 102.4 853.32992 102.4zM457.8304 716.8L204.8 463.72864l48.27136-48.26112 204.75904 204.8L770.92864 307.2 819.2 355.47136 457.8304 716.8z" p-id="3059" fill="#7868e6"></path></svg>
const uncompleteIcon=<svg t="1618473980001" className="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="3992" width="200" height="200"><path d="M768 810.666667H256c-23.466667 0-42.666667-19.2-42.666667-42.666667V256c0-23.466667 19.2-42.666667 42.666667-42.666667h512c23.466667 0 42.666667 19.2 42.666667 42.666667v512c0 23.466667-19.2 42.666667-42.666667 42.666667z m42.666667-682.666667H213.333333c-46.933333 0-85.333333 38.4-85.333333 85.333333v597.333334c0 46.933333 38.4 85.333333 85.333333 85.333333h597.333334c46.933333 0 85.333333-38.4 85.333333-85.333333V213.333333c0-46.933333-38.4-85.333333-85.333333-85.333333z" p-id="3993" fill="#7868e6"></path></svg>

//已有的代办事项
const INIT_TODOS=[
  {text:'Learn React',isComplete:false},
  {text:'Meet friend',isComplete:false},
  {text:'Build an App',isComplete:false},
]
function Todo({todo,removeTodo,index,completeTodo }){
  //a标签包裹icon的点击事件回调
  const handleRemove=(e)=>{
    //防止a链接点击后刷新
    e.preventDefault();
    //事件冒泡，防止父级事件触发
    e.stopPropagation();
    //console.log(index)
    removeTodo(index);
  }
  return(
    <div className="todo" onClick={()=>{completeTodo(index)}}>
      <div className="task" style={{textDecoration: todo.isComplete? 'line-through':'none'}}>
        {todo.isComplete ? completeIcon:uncompleteIcon}
        {todo.text} 
      </div>
      <a href='#!' onClick={handleRemove} className="remove" > {removeIcon}</a>
    </div>
  )
}

function TodoForm({ addTodo }){
  const [inputValue,setInputValue]=useState('');
  //防止页面跳转 onSubmit事件回调
  const handleSubmit=(e)=>{
    e.preventDefault();
    if(!inputValue)return
    //回车后将input的value传给父组件
    addTodo(inputValue);
    //提交表单后 清空输入框
    setInputValue('')
  }

  //获取input的value onChange事件回调
  const handleChange=(e)=>{
    //更新input的输入值
    setInputValue(e.target.value);
    //console.log(e.target.value)
  }
  
  return(
    <form onSubmit={handleSubmit}>
      <input
        value={inputValue}
        className="input"
        onChange={handleChange}
      />
    </form>
  )
}



function App() {

  
  const [todos,setTodos]=useState(JSON.parse(localStorage.getItem('todos'))||INIT_TODOS);

  useEffect(() => {
    localStorage.setItem('todos',JSON.stringify(todos));
    //console.log(todos)
  }, [todos])
  

  //添加一个新todo --Todoform
  const addTodo=(text)=>{
    //将传过来的newtodo加在数组前面
    const newTodos=[{ text },...todos];
    setTodos(newTodos);
  }
  //移除一个todo ---Todo
  const removeTodo=(index)=>{
    const newTodos=[...todos];
    newTodos.splice(index,1);
    setTodos(newTodos);
  }
  //事项完成  ---Todo
  const completeTodo=(index)=>{
    const newTodos=[...todos];
    newTodos[index].isComplete=!newTodos[index].isComplete;
    setTodos(newTodos);
  }
  return (
    <div className="app">
      
      <div className="todo-list">     
        <TodoForm addTodo={addTodo}/>
       {
         todos.map((todo,index)=>{
          return  <Todo 
            index={index} 
            removeTodo={removeTodo} 
            completeTodo={completeTodo}
            key={index} 
            todo={todo}
           />
         })
       }
      </div>     
    </div>
  );
}

export default App;
