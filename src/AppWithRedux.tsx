import React, {useCallback, useReducer, useState} from 'react';
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
import {AppRootState, store} from "./state/store";

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
    console.log(store.getState())
    console.log("AppWithRedux")
    const dispatch = useDispatch()

    const removeTask = useCallback((id: string, todolistId: string) => {
        dispatch(removeTaskAC(id, todolistId))
    }, [])

    const addTask = useCallback ( (title: string, todolistId: string) => {
        dispatch(addTaskAC(title, todolistId))
    }, [dispatch] )

    const changeStatus = useCallback((taskId: string, isDone: boolean, todolistId: string) => {
        dispatch(changeTaskStatusAC(taskId, isDone, todolistId))
    }, [dispatch])

    const changeTaskTitle = useCallback((taskId: string, newTitle: string, todolistId: string) => {
        dispatch(changeTaskTitleAC(taskId, newTitle, todolistId))
    }, [dispatch])

    const changeFilter = useCallback((value: FilterValuesType, todolistId: string) => {
        dispatch(changeTodolistFilterAC(value, todolistId))
    }, [dispatch])

    const changeTodolistTitle = useCallback((id: string, newTitle: string) => {
        dispatch(changeTodolistAC(newTitle, id))

    }, [dispatch])

    const removeTodoList = useCallback((todolistId: string) => {
        const action = removeTodolistAC(todolistId)
        dispatch(action)
    }, [dispatch])

    const addTodoList = useCallback((title: string) => {
        const action = addTodolistAC(title)
        dispatch(action)
    }, [dispatch])

    // const dispatch = useDispatch()
    const todoLists = useSelector<AppRootState, Array<todoListType>>(state => state.todolists)
    const tasksObj = useSelector<AppRootState, TasksStateType>(state => state.tasks)

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
                            return <Grid item key={tl.id}>
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
