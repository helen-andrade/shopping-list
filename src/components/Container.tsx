import React, { useState, ChangeEvent, useCallback } from 'react';

interface Task {
    text: string;
    completed: boolean;
}

function Container() {
    const [tasks, setTasks] = useState<Task[]>([]);
    const [taskInput, setTaskInput] = useState<string>('');

    const handleInputChange = (e: ChangeEvent<HTMLInputElement>): void => {
        setTaskInput(e.target.value);
    };

    const addTask = useCallback((): void => {
        if (taskInput.trim()) {
            setTasks(prevTasks => [
                ...prevTasks, 
                { text: taskInput, completed: false }
            ]);
            setTaskInput('');
        }
    }, [taskInput]);

    const deleteTask = useCallback((index: number): void => {
        setTasks(prevTasks => prevTasks.filter((_, i) => i !== index));
    }, []);

    const toggleTaskCompletion = useCallback((index: number): void => {
        setTasks(prevTasks => prevTasks.map((task, i) =>
            i === index ? { ...task, completed: !task.completed } : task
        ));
    }, []);

    return (
        <div className="container">
            <h1>Lista de Compras</h1>
            <TaskInput
                value={taskInput}
                onChange={handleInputChange}
                onAddTask={addTask}
            />
            <TaskList
                tasks={tasks}
                onToggleCompletion={toggleTaskCompletion}
                onDeleteTask={deleteTask}
            />
        </div>
    );
}

interface TaskInputProps {
    value: string;
    onChange: (e: ChangeEvent<HTMLInputElement>) => void;
    onAddTask: () => void;
}

const TaskInput: React.FC<TaskInputProps> = ({ value, onChange, onAddTask }) => (
    <div className="task-input">
        <label>Adicionar novo item:</label>
        <input 
            type="text" 
            value={value} 
            onChange={onChange} 
        />
        <button onClick={onAddTask}>Adicionar</button>
    </div>
);

interface TaskListProps {
    tasks: Task[];
    onToggleCompletion: (index: number) => void;
    onDeleteTask: (index: number) => void;
}

const TaskList: React.FC<TaskListProps> = ({ tasks, onToggleCompletion, onDeleteTask }) => (
    <ul className="shopping-list">
        {tasks.map((task, index) => (
            <li key={index} className={task.completed ? 'completed' : ''}>
                <input
                    type="checkbox" 
                    checked={task.completed} 
                    onChange={() => onToggleCompletion(index)} 
                />
                {task.text}
                <button className='deleteTask' onClick={() => onDeleteTask(index)}>Apagar</button>
            </li>
        ))}
    </ul>
);

export default Container;