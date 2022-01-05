import React, {useCallback} from "react";
import {FilterValuesType} from "./App";
import {AddItemForm} from "./AddItemForm";
import {EditableSpan} from "./EditableSpan";
import {Button, ButtonGroup, IconButton, List, Typography} from "@material-ui/core";
import {Delete} from "@material-ui/icons";
import {Task} from "./Task";

export type TasksType = {
    id: string
    title: string
    isDone: boolean
}
type PropsType = {
    id: string
    title: string
    tasks: Array<TasksType>
    addTask: (title: string, todolistId: string) => void
    removeTask: (id: string, todolistId: string) => void
    changeFilter: (value: FilterValuesType, todolistId: string) => void
    changeTaskStatus: (taskId: string, isDone: boolean, todolistId: string) => void
    filter: FilterValuesType
    removeTodoList: (todolistId: string) => void
    changeTodolistTitle: (id: string, newTitle: string) => void
    changeTaskTitle: (id: string, newValue: string, todolistId: string) => void
}

export const TodoList = React.memo((props: PropsType) => {
    console.log("TodoList")

    const onClickSetAllFilter = useCallback(() => {
        props.changeFilter("all", props.id)
    },[props.changeFilter, props.id])
    const onClickSetActiveFilter = useCallback(() => {
        props.changeFilter("active", props.id)
    },[props.changeFilter, props.id])
    const onClickSetCompletedFilter = useCallback(() => {
        props.changeFilter("completed", props.id)
    },[props.changeFilter, props.id])

    const removeTodoList = () => {
        props.removeTodoList(props.id)
    }
    const addTask = useCallback((title: string) => {
        props.addTask(title, props.id)
    }, [props.addTask, props.id])
    const changeTodolistTitle = useCallback((newTitle: string) => {
        props.changeTodolistTitle(props.id, newTitle)
    }, [props.changeTodolistTitle, props.id])

    let tasksForToDoList = props.tasks

    if (props.filter === "active") {
        tasksForToDoList = props.tasks.filter(t => t.isDone === false) //the same !t.isDone
    }
    if (props.filter === "completed") {
        tasksForToDoList = props.tasks.filter(t => t.isDone === true) // the same t.isDone
    }

    return (
        <div>
            <Typography variant={"h6"} style={{fontWeight: "bold"}}>
                <EditableSpan title={props.title} onChange={changeTodolistTitle}/>
                <IconButton onClick={removeTodoList}>
                    <Delete/>
                </IconButton>
            </Typography>
            <AddItemForm addItem={addTask}/>
            <List>
                {
                    tasksForToDoList.map(t => <Task
                        key = {t.id}
                        removeTask = {props.removeTask}
                        changeTaskStatus = {props.changeTaskStatus}
                        changeTaskTitle = {props.changeTaskTitle}
                        task = {t}
                        todolistId = {props.id}
                    />)
                }
            </List>
            <div>
                <ButtonGroup variant={"contained"}
                             size={"small"}
                             fullWidth>
                    <Button color={props.filter === "all" ? "secondary" : "primary"}
                            onClick={onClickSetAllFilter}>All</Button>
                    <Button color={props.filter === "active" ? "secondary" : "primary"}
                            onClick={onClickSetActiveFilter}>Active</Button>
                    <Button color={props.filter === "completed" ? "secondary" : "primary"}
                            onClick={onClickSetCompletedFilter}>Completed</Button>
                </ButtonGroup>
            </div>
        </div>
    )

})

