import React, {ChangeEvent} from "react";
import {FilterValuesType} from "./App";
import {AddItemForm} from "./AddItemForm";

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
}


export const TodoList = (props: PropsType) => {
    const onClickSetAllFilter = () => {props.changeFilter("all", props.id)}
    const onClickSetActiveFilter = () => {props.changeFilter("active", props.id)}
    const onClickSetCompletedFilter = () => {props.changeFilter("completed", props.id)}
    const removeTodoList = () => {props.removeTodoList(props.id)}

    return (
        <div>
            <h3>{props.title}<button onClick={removeTodoList}>x</button></h3>
            <AddItemForm addItem={props.addTask} id={props.id}/>
            <ul>
                {
                    props.tasks.map(t => {
                        const onClickHandler = () => {props.removeTask(t.id, props.id)}
                        const onChangeHandler = (e:ChangeEvent<HTMLInputElement>) => {
                            props.changeTaskStatus(t.id, e.currentTarget.checked, props.id)
                        }
                        return <li key={t.id} className={t.isDone ? "is-done" : ""}>
                            <input type="checkbox"
                                   checked={t.isDone}
                                   onChange={onChangeHandler}/>
                            <span>{t.title}</span>
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

