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

    let [filter, setFilter] = useState<FilterValuesType>("all")

    function removeTask(id: string, todolistId: string) {
        let tasks = tasksObj[todolistId]
        let filteredTasks = tasks.filter(t => t.id !== id)
        tasksObj[todolistId] = filteredTasks
        setTasks({...tasksObj})
    }

    function changeFilter(value: FilterValuesType, todolistId: string) {
        let todoList = todoLists.find(tl => tl.id === todolistId)
        if (todoList) {
            todoList.filter = value;
            setTodoLists([...todoLists])
        }
    }

    function changeStatus(taskId: string, isDone: boolean, todolistId: string) {
        let tasks = tasksObj[todolistId]
        let task = tasks.find(t => t.id === taskId)
        if (task) {
            task.isDone = isDone;
            setTasks({...tasksObj});
        }

    }

    function addTask(title: string, todolistId: string) {
        let task = {id: v1(), title: title, isDone: false}
        let tasks = tasksObj[todolistId];
        let newTasks = [task, ...tasks]
        tasksObj[todolistId] = newTasks
        setTasks({...tasksObj})
    }

    let todolistId1 = v1()
    let todolistId2 = v1()

    const [todoLists, setTodoLists] = useState<Array<todoListType>>([
        {id: todolistId1, title: "What to learn", filter: "active"},
        {id: todolistId2, title: "What to buy", filter: "completed"}
    ])

    let [tasksObj, setTasks] = useState({
        [todolistId1]: [
            {id: v1(), title: "HTML", isDone: true},
            {id: v1(), title: "JS", isDone: true},
            {id: v1(), title: "React", isDone: false},
            {id: v1(), title: "REST API", isDone: false},
            {id: v1(), title: "GraphQL", isDone: false}
        ],
        [todolistId2]: [
            {id: v1(), title: "Book", isDone: false},
            {id: v1(), title: "Milk", isDone: true},
        ]
    });

    return (
        <div className="App">
            {
                todoLists.map((tl) => {
                    let tasksForToDoList = tasksObj[tl.id]

                    if (tl.filter === "active") {
                        tasksForToDoList = tasksForToDoList.filter(t => t.isDone === false) //the same !t.isDone
                    }
                    if (tl.filter === "completed") {
                        tasksForToDoList = tasksForToDoList.filter(t => t.isDone === true) // the same t.isDone
                    }
                    return <TodoList
                        key={tl.id}
                        id={tl.id}
                        title={tl.title}
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
