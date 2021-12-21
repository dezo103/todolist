import React, {useReducer, useState} from 'react';
import './App.css';
import {TasksType, TodoList} from "./Todolist";
import {v1} from "uuid";
import {AddItemForm} from "./AddItemForm";
import {AppBar, Button, Container, Grid, IconButton, Paper, Toolbar, Typography} from "@material-ui/core";
import {Menu} from "@material-ui/icons";
import {
    addTodolistAC,
    changeTodolistAC,
    changeTodolistFilterAC,
    removeTodolistAC,
    todolistsReducer
} from "./state/todolists-reducer";
import {addTaskAC, changeTaskStatusAC, changeTaskTitleAC, removeTaskAC, tasksReducer} from "./state/tasks-reducer";
import {useDispatch, useSelector} from "react-redux";
import {AppRootState} from "./state/store";

export type FilterValuesType = "all" | "completed" | "active"

export type todoListType = {
    id: string
    title: string,
    filter: FilterValuesType
}

export type TasksStateType = {
    [key: string]: Array<TasksType>
}

function AppWithRedux() {
    function removeTask(id: string, todolistId: string) {
        dispatch(removeTaskAC(id, todolistId))
    }
    function addTask(title: string, todolistId: string) {
        dispatch(addTaskAC(title, todolistId))
    }
    function changeStatus(taskId: string, isDone: boolean, todolistId: string) {
        dispatch(changeTaskStatusAC(taskId, isDone, todolistId))
    }
    function changeTaskTitle(taskId: string, newTitle: string, todolistId: string) {
        dispatch(changeTaskTitleAC(taskId, newTitle, todolistId))
    }

    function changeFilter(value: FilterValuesType, todolistId: string) {
        dispatch(changeTodolistFilterAC(value, todolistId))
    }
    const changeTodolistTitle = (id: string, newTitle: string) => {
        dispatch(changeTodolistAC(id, newTitle))

    }
    const removeTodoList = (todolistId: string) => {
        const action = removeTodolistAC(todolistId)
        dispatch(action)
    }
    function addTodoList(title: string) {
        const action = addTodolistAC(title)
        dispatch(action)
    }

    // let todolistId1 = v1()
    // let todolistId2 = v1()

    const dispatch = useDispatch()
    const todoLists = useSelector<AppRootState, Array<todoListType>>(state => state.todolists)
    const tasksObj = useSelector<AppRootState, TasksStateType>(state => state.tasks)

    // const [todoLists] = useReducer(todolistsReducer, [
    //     {id: todolistId1, title: "What to learn", filter: "all"},
    //     {id: todolistId2, title: "What to buy", filter: "all"}
    // ])

    // let [tasksObj] = useReducer(tasksReducer, {
    //     [todolistId1]: [
    //         {id: v1(), title: "HTML", isDone: true},
    //         {id: v1(), title: "JS", isDone: true},
    //         {id: v1(), title: "React", isDone: false},
    //         {id: v1(), title: "REST API", isDone: false},
    //         {id: v1(), title: "GraphQL", isDone: false}
    //     ],
    //     [todolistId2]: [
    //         {id: v1(), title: "Book", isDone: false},
    //         {id: v1(), title: "Milk", isDone: true},
    //     ]
    // });


    return (
        <div className="App">
            <AppBar position="static">
                <Toolbar variant="dense">
                    <IconButton edge="start" color="inherit" aria-label="menu">
                        <Menu/>
                    </IconButton>
                    <Typography variant="h6" color="inherit" component="div">
                        Menu
                    </Typography>
                    <Button color={"inherit"}>Login</Button>
                </Toolbar>
            </AppBar>
            <Container fixed>
                <Grid container style={{padding: "20px"}}>
                    <AddItemForm addItem={addTodoList}/>
                </Grid>
                <Grid container spacing={3}>
                    {
                        todoLists.map((tl) => {
                            let tasksForToDoList = tasksObj[tl.id]

                            if (tl.filter === "active") {
                                tasksForToDoList = tasksForToDoList.filter(t => t.isDone === false) //the same !t.isDone
                            }
                            if (tl.filter === "completed") {
                                tasksForToDoList = tasksForToDoList.filter(t => t.isDone === true) // the same t.isDone
                            }
                            return <Grid item>
                                <Paper style={{padding: "10px"}}>
                                    <TodoList
                                        key={tl.id}
                                        id={tl.id}
                                        title={tl.title}
                                        tasks={tasksForToDoList}
                                        addTask={addTask}
                                        removeTask={removeTask}
                                        changeFilter={changeFilter}
                                        changeTaskStatus={changeStatus}
                                        changeTaskTitle={changeTaskTitle}
                                        filter={tl.filter}
                                        removeTodoList={removeTodoList}
                                        changeTodolistTitle={changeTodolistTitle}
                                    />
                                </Paper>
                            </Grid>
                        })
                    }
                </Grid>
            </Container>
        </div>
    );
}

export default AppWithRedux;
