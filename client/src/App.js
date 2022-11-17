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
		const data = fetch(API_BASE + `/todo/complete/${id}`)
		.then(res => res.json());
		console.log(data);

		setTodos(todos => todos.map(todo => {
			if (todo._id === data._id) todo.complete = data.complete;
			return todo;
		}))
	}

	return (
		<div className="App">
			<h1>Welcome!</h1>
			<h4>Your Tasks</h4>

			<div className="todos">
				{todos.map(todo => (
				<div className={"todo " + (todo.complete ? "is-complete" : '')} key={todo._id} onClick={() => completeTodo(todo._id)}>
					<div className="checkBox"></div>

					<div className="text">{todo.text}</div>

					<div className="delete-todo">X</div> 
				</div>
				))}
			</div>
		</div>
	);
}

export default App;
