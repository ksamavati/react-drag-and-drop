import { useState } from "react";
import {
  DndContext,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  closestCorners,
} from "@dnd-kit/core";
import { arrayMove, sortableKeyboardCoordinates } from "@dnd-kit/sortable";

import { Column } from "./components/Column/Column";
import { Input } from "./components/Input/Input";

const App = () => {
  const [tasks, setTasks] = useState([]);
  const [columns, setColumns] = useState([{ id: 'toDo', tasks: [] }]);

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const getTaskPos = (id) => tasks.findIndex((task) => task.id === id);

  const handleDragEnd = (event) => {
    const { active, over } = event;

    if (active.id === over.id) return;

    setTasks((tasks) => {
      const originalPos = getTaskPos(active.id);
      const newPos = getTaskPos(over.id);

      return arrayMove(tasks, originalPos, newPos);
    });
  };

  const addTask = (task) => {
    setTasks([...tasks, task]);
  };

  const addColumn = () => {
    const newColumn = { id: `column-${columns.length + 1}`, tasks: [] };
    setColumns([...columns, newColumn]);
  };

  return (
    <div className="App">
      <h1>My Tasks ✅</h1>
      <Input onSubmit={addTask} />
      <button onClick={addColumn}>Add Column</button>
      <DndContext
        sensors={sensors}
        collisionDetection={closestCorners}
        onDragEnd={handleDragEnd}
        className="dnd-container"
      >
        {columns.map((column) => (
          <Column key={column.id} id={column.id} tasks={column.tasks} />
        ))}
      </DndContext>
    </div>
  );
};

export default App;