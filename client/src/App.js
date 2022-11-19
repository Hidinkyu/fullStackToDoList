import { useState, useEffect } from 'react';

const API_BASE = 'http://localhost:3001';

const App = () => {
	const [todos, setTodos] = useState([]);
	const [popupActive, setPopupActive] = useState(false);
	const [newTodo, setNewTodo] = useState('');

	useEffect(() => {
		GetTodos();
	}, [])

	const GetTodos = () => {
		fetch(API_BASE + "/todos")
		.then(res => res.json())
		.then(data => setTodos(data))
		.catch(err => console.error("Error: ", err))
	}

	const completeTodo = async id => {
		const data = await fetch(API_BASE + `/todo/complete/${id}`, {
			method: 'PUT'
		}).then(res => res.json());

		setTodos(todos => todos.map(todo => {
			if (todo._id === data._id) todo.complete = data.complete;
			return todo;
		}))
	}

	const deleteTodo = async id => {
		const data = await fetch(API_BASE + `/todo/delete/${id}`, {
			method: "DELETE"
		}).then(res => res.json());
		setTodos(todos => todos.filter(todo => todo._id !== data._id));
	}

	const addTodo = async () => {
		if (newTodo) {const data = await fetch(API_BASE + `/todo/new`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json"
			},
			body: JSON.stringify({
				text: newTodo
			})
		}).then(res => res.json()); 
		setTodos([...todos, data]);
		setPopupActive(false);
		setNewTodo('');}
	}

	return (
		<div className="App">
			<h1 className="noselect">Welcome!</h1>
			<h4 className='noselect'>Your Tasks</h4>

			<div className="todos">
				{todos.map(todo => (
					<div className="todoBox" key={todo._id}>
				<div className={"todo " + (todo.complete ? "is-complete" : '')} onClick={() => completeTodo(todo._id)}>
					<div className="checkBox"></div>

					<div className="text">{todo.text}</div>

				</div>
					<div className="delete-todo noselect" onClick={() => deleteTodo(todo._id)}>X</div> 
					</div>
				))}
			</div>
			<div className="addPopup noselect" onClick={() => setPopupActive(true)}> + </div>

			{ popupActive ? 
			(
			<div className='popup'>
				<div className='closePopup noselect' onClick={()=> setPopupActive(false)}>X</div>
				<h3 className='noselect'>Add Task</h3>
				<input 
				type="text" 
				className="add-todo-input" 
				onChange={e => setNewTodo(e.target.value)}
				value={newTodo}/>
				<div className="button noselect" onClick={ addTodo }>Create Task</div>
			</div>
				) : '' }
		</div>
	);
}

export default App;
