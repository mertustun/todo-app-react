import { useState, useEffect } from 'react'
import './main.css'

function ToDoList() {
  // the states are defined to be usable.
  const [todos, SetTodo] = useState([])
  const [new_input, SetNewInput] = useState('')
  const [filter, SetFilter] = useState('all')

  const storage_set = (updated) => {
    SetTodo(updated)
    localStorage.setItem('tasks', JSON.stringify(updated))
  }

  useEffect(() => {
    const storedTasks = JSON.parse(localStorage.getItem('tasks')) || []
    SetTodo(storedTasks)
  }, [])

  // input is activeted by this function.
  const input_add = (e) => SetNewInput(e.target.value)

  // To can add any input this function below is used.
  const add_new_todo = (event) => {
    if (event.key === 'Enter') {
      console.log('Entered is working!');
      storage_set([...todos, { text: new_input, completed: false }])
      // console.log(SetTodo);
      SetNewInput('')
    }
  }
  // This function used to can be deleted each task.
  const delete_item = (index) => {
    const afterDelete = [...todos]
    afterDelete.splice(index, 1) // selected index is deleted by this way.
    storage_set(afterDelete) // we have to set the state again after deleting process for showing the new form of the list.
  }
  // This one is used to can be changed the completed prop of the todos by changing the checked property of the input(type:check)
  const toggle_complete = (index) => {
    const updatedTodos = [...todos]
    updatedTodos[index].completed = !updatedTodos[index].completed
    storage_set(updatedTodos)
  }

  // This function is used to delete mutliple tasks by filtering the array as a completed prop which are true
  const clear_completed = () => {
    const activeTodos = todos.filter(todo => !todo.completed)
    storage_set(activeTodos) // after clicking clear completed in website this function is set the todo state again and completed one's deleted in this way!
  }

  // This function is used to filter tasks by choosen properties of them. filter case comes from state [filter, SetFilter] and its inital value set as 'all'!
  const filterTodos = () => {
    switch (filter) {
      case 'active':
        return todos.filter(todo => !todo.completed)
      case 'completed':
        return todos.filter(todo => todo.completed)
      default:
        return todos
    }
  }

  //  This countItems function is used below to count tasks dynamically.
  const countItems = () => {
    const all_tasks = todos.length // length of all of the tasks for which there is no need to query their completed property
    const completed_tasks = todos.filter(todo => todo.completed).length // Created an array which have ture of completed propertiesç 
    const resultCount = all_tasks - completed_tasks // Result operation (subtraction)
    console.log(all_tasks - completed_tasks); // This is console test. We can show the number of left items in each operation of list (add, chcecked, delete...)
    return resultCount
  }

  useEffect(() => {
    console.log('Todos updated:', todos);  // To control the change of todos this useEffect hook is used.
  }, [todos]);

  return (
    <div className='wrapper'>
      <div className="container">
        <div className='todo-input'>
          <h1>ToDo's</h1>
          <input
            name=''
            placeholder='What has to do?'
            value={new_input}
            onChange={input_add}
            onKeyDown={add_new_todo}
          />
        </div>

        <div className='list-container'>
          <ul className='list-items'>
            {filterTodos().map((todo, i) => (
              <li className='list-item' key={i}>
                <input
                  type="checkbox"
                  checked={todo.completed}
                  onChange={() => toggle_complete(i)}
                />
                <span>
                  {todo.text}
                </span>
                <button className='delete-btn' onClick={() => delete_item(i)}>&times;</button>
              </li>
            ))

            }
          </ul>
        </div>
        <div className="footer-container">
          <span>
            {countItems()} items left.
          </span>
          <div className="filter-buttons">
            <button class='filtered-btn' onClick={() => SetFilter('all')}>All</button>
            <button class='filtered-btn' onClick={() => SetFilter('active')}>Active</button>
            <button class='filtered-btn' onClick={() => SetFilter('completed')}>Completed</button>
          </div>
          <p className='completed-all' onClick={clear_completed}>Clear completed</p>
        </div>
      </div>
    </div>
  )
}

export default ToDoList
