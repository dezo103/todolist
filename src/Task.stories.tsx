import React from "react";
import {action} from "@storybook/addon-actions";
import {Task} from "./Task";

export default {
    title: "Task Component",
    component: Task
}

const removeTaskCallback = action("Task removed")
const changeTaskStatusCallback = action("Task status changed")
const changeTaskTitleCallback = action("Task title changed")


export const TaskBaseExample = () => {
    return <>
        <Task
            removeTask = {removeTaskCallback}
            changeTaskStatus = {changeTaskStatusCallback}
            changeTaskTitle = {changeTaskTitleCallback}
            task = { {id: '1', isDone: true, title: 'CSS'} }
            todolistId = {'todolistId1'}
        />
        <Task
            removeTask = {removeTaskCallback}
            changeTaskStatus = {changeTaskStatusCallback}
            changeTaskTitle = {changeTaskTitleCallback}
            task = { {id: '2', isDone: false, title: 'React'} }
            todolistId = {'todolistId2'}
        />
        </>
}
