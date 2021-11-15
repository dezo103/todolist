import React, {useState} from 'react';
import './App.css';
import {TasksType, TodoList} from "./Todolist";
import {v1} from "uuid";

const toDoListTitle = "What to learn"

export type FilterValuesType = "all" | "completed" | "active"

type todoListType = {
    id: string
    title: string,
    filter: FilterValuesType
}

function App() {
    let [tasks, setTasks] = useState<Array<TasksType>>([
        {id: v1(), title: "HTML", isDone: true},
        {id: v1(), title: "JS", isDone: true},
        {id: v1(), title: "React", isDone: false},
        {id: v1(), title: "REST API", isDone: false},
        {id: v1(), title: "GraphQL", isDone: false},
    ])

    let [filter, setFilter] = useState<FilterValuesType>("all")

    function removeTask(id: string) {
        let filteredTasks = tasks.filter( t => t.id !== id)
        setTasks(filteredTasks)
    }

    function changeFilter(value: FilterValuesType) {
        setFilter(value)
    }

    function changeStatus(taskId: string, isDone: boolean) {
        let task = tasks.find(t => t.id === taskId);
        if (task) {
            task.isDone = isDone;
        }
        setTasks([...tasks]);
    }

    function addTask(title: string) {
        const newTask: TasksType = {
            id: v1(),
            title, // title: title (the same)
            isDone: false
        }

        setTasks([newTask, ...tasks])
    }

    // let tasksForToDoList = tasks
    //
    // if (filter === "active") {
    //     tasksForToDoList = tasks.filter( t => t.isDone === false) //the same !t.isDone
    // }
    // if (filter === "completed") {
    //     tasksForToDoList = tasks.filter( t => t.isDone === true) // the same t.isDone
    // }

    const todoLists: Array<todoListType> = [
        {id: v1(), title: "What to learn", filter: "active"},
        {id: v1(), title: "What to buy", filter: "completed"}
    ]

    return (
        <div className="App">
            {
                todoLists.map( (tl) => {
                    let tasksForToDoList = tasks

                    if (tl.filter === "active") {
                        tasksForToDoList = tasks.filter( t => t.isDone === false) //the same !t.isDone
                    }
                    if (tl.filter === "completed") {
                        tasksForToDoList = tasks.filter( t => t.isDone === true) // the same t.isDone
                    }
                    return <TodoList title={tl.title}
                                     tasks={tasksForToDoList}
                                     addTask={addTask}
                                     removeTask={removeTask}
                                     changeFilter={changeFilter}
                                     changeTaskStatus={changeStatus}
                                     filter={tl.filter}
                    />
                })
            }
            {/*<TodoList title={toDoListTitle}*/}
            {/*          tasks={tasksForToDoList}*/}
            {/*          addTask={addTask}*/}
            {/*          removeTask={removeTask}*/}
            {/*          changeFilter={changeFilter}*/}
            {/*          changeTaskStatus={changeStatus}*/}
            {/*          filter={filter}*/}
            {/*/>*/}

        </div>
    );
}

export default App;
