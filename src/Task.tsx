import React, {ChangeEvent, useCallback} from "react";
import {Checkbox, IconButton, ListItem} from "@material-ui/core";
import {EditableSpan} from "./EditableSpan";
import {Delete} from "@material-ui/icons";
import {TasksType} from "./Todolist";

type TaskPropsType = {
    removeTask: (id: string, todolistId: string) => void
    changeTaskStatus: (taskId: string, isDone: boolean, todolistId: string) => void
    changeTaskTitle: (id: string, newValue: string, todolistId: string) => void
    task: TasksType
    todolistId: string
}
export const Task = React.memo((props: TaskPropsType) => {
    {
        const onClickHandler = () => {
            props.removeTask(props.task.id, props.todolistId)
        }
        const onChangeStatusHandler = (e: ChangeEvent<HTMLInputElement>) => {
            props.changeTaskStatus(props.task.id, e.currentTarget.checked, props.todolistId)
        }
        const onChangeTitleHandler = useCallback((newValue: string) => {
            props.changeTaskTitle(props.task.id, newValue, props.todolistId)
        }, [props.task.id, props.changeTaskTitle, props.todolistId])
        return <ListItem
            divider
            key={props.task.id}
            className={props.task.isDone ? "is-done" : ""}
            style={{display: "flex", justifyContent: "space-between", padding: "0"}}>
            <Checkbox color={"primary"}
                      checked={props.task.isDone}
                      onChange={onChangeStatusHandler}/>
            <EditableSpan
                title={props.task.title}
                onChange={onChangeTitleHandler}/>
            <IconButton onClick={onClickHandler}>
                <Delete fontSize={"small"}/>
            </IconButton>
        </ListItem>
    }
})
