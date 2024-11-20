import {
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { useState } from "react";
import { Task } from "../Task/Task";
import { Input } from "../Input/Input";
import { v4 as uuid } from "uuid";

import "./Column.css";

export const Column = () => {
	const [tasks, setTasks] = useState([]);
	const getTaskPos = (id) => tasks.findIndex((task) => task.id === id);


	const addTask = (text) => {
		// setTasks([...tasks, { id: tasks.length + 1, text }]);
		// Let's assign a random GUID as the ID for the task
		setTasks([...tasks, { id: uuid(), text }]);


		// We need to pass this up to the App component so that we ens
	};

	return (
		<div className="column">
		<SortableContext items={tasks} strategy={verticalListSortingStrategy}>
			{tasks.map((task) => (
				<Task key={task.id} id={task.id} text={task.text} />
			))}
		</SortableContext>
		
		<Input onSubmit={addTask} caption={"Add Task"} />
		</div>
	);
};
