import React, {ChangeEvent} from "react";
import {FilterValuesType} from "./App";
import {AddItemForm} from "./AddItemForm";
import {EditableSpan} from "./EditableSpan";
import {Button, ButtonGroup, Checkbox, IconButton, List, ListItem, Typography} from "@material-ui/core";
import {Delete} from "@material-ui/icons";

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

export const TodoList = (props: PropsType) => {
    const onClickSetAllFilter = () => {
        props.changeFilter("all", props.id)
    }
    const onClickSetActiveFilter = () => {
        props.changeFilter("active", props.id)
    }
    const onClickSetCompletedFilter = () => {
        props.changeFilter("completed", props.id)
    }
    const removeTodoList = () => {
        props.removeTodoList(props.id)
    }
    const addTask = (title: string) => {
        props.addTask(title, props.id)
    }
    const changeTodolistTitle = (newTitle: string) => {
        props.changeTodolistTitle(props.id, newTitle)
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
                    props.tasks.map(t => {
                        const onClickHandler = () => {
                            props.removeTask(t.id, props.id)
                        }
                        const onChangeStatusHandler = (e: ChangeEvent<HTMLInputElement>) => {
                            props.changeTaskStatus(t.id, e.currentTarget.checked, props.id)
                        }
                        const onChangeTitleHandler = (newValue: string) => {
                            props.changeTaskTitle(t.id, newValue, props.id)
                        }
                        return <ListItem
                            divider
                            key={t.id}
                            className={t.isDone ? "is-done" : ""}
                            style={{display: "flex", justifyContent: "space-between", padding: "0"}}>
                            <Checkbox color={"primary"}
                                      checked={t.isDone}
                                      onChange={onChangeStatusHandler}/>
                            <EditableSpan
                                title={t.title}
                                onChange={onChangeTitleHandler}/>
                            <IconButton onClick={onClickHandler}>
                                <Delete fontSize={"small"}/>
                            </IconButton>
                        </ListItem>
                    })
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

}

