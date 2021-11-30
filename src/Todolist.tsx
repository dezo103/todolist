import React, {ChangeEvent} from "react";
import {FilterValuesType} from "./App";
import {AddItemForm} from "./AddItemForm";
import {EditableSpan} from "./EditableSpan";

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
    const onClickSetAllFilter = () => {props.changeFilter("all", props.id)}
    const onClickSetActiveFilter = () => {props.changeFilter("active", props.id)}
    const onClickSetCompletedFilter = () => {props.changeFilter("completed", props.id)}
    const removeTodoList = () => {props.removeTodoList(props.id)}
    const addTask = (title: string) => {
        props.addTask(title, props.id)
    }
    const changeTodolistTitle = (newTitle: string) => {
        props.changeTodolistTitle(props.id, newTitle)
    }

    return (
        <div>
            <h3><EditableSpan title={props.title} onChange={changeTodolistTitle}/><button onClick={removeTodoList}>x</button></h3>
            <AddItemForm addItem={addTask}/>
            <ul>
                {
                    props.tasks.map(t => {
                        const onClickHandler = () => {props.removeTask(t.id, props.id)}
                        const onChangeStatusHandler = (e:ChangeEvent<HTMLInputElement>) => {
                            props.changeTaskStatus(t.id, e.currentTarget.checked, props.id)
                        }
                        const onChangeTitleHandler = (newValue: string) => {
                            props.changeTaskTitle(t.id, newValue, props.id)
                        }
                        return <li key={t.id} className={t.isDone ? "is-done" : ""}>
                            <input type="checkbox"
                                   checked={t.isDone}
                                   onChange={onChangeStatusHandler}/>
                            <EditableSpan
                                title={t.title}
                                onChange={onChangeTitleHandler}/>
                            <button onClick={ onClickHandler }>X
                            </button>
                        </li>
                    })

                }
            </ul>
            <div>
                <button onClick={onClickSetAllFilter}
                        className={props.filter === "all" ? "active-filter" : ""}>All</button>
                <button onClick={onClickSetActiveFilter}
                        className={props.filter === "active" ? "active-filter" : ""}>Active</button>
                <button onClick={onClickSetCompletedFilter}
                        className={props.filter === "completed" ? "active-filter" : ""}>Completed</button>
            </div>
        </div>
    )

}

