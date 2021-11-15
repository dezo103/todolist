import React, {useState, KeyboardEvent, ChangeEvent} from "react";
import {FilterValuesType} from "./App";

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

    const [title, setTitle] = useState<string>("")
    let [error, setError] = useState<string | null>(null)

    const onClickAddTaskToTodoList = () => {
            if (title.trim() !== "") {
                props.addTask(title.trim(), props.id);
                setTitle("");
            }
            else {
                setError("Title is required")
            }
    }
    const onKeyPressAddTaskToTodoList = (e: KeyboardEvent) => {
        setError(null)
        if (e.key === "Enter") {
            onClickAddTaskToTodoList()
        }
    }
    const onChangeSetTitle = (e: ChangeEvent<HTMLInputElement>) => setTitle(e.currentTarget.value)
    const onClickSetAllFilter = () => {props.changeFilter("all", props.id)}
    const onClickSetActiveFilter = () => {props.changeFilter("active", props.id)}
    const onClickSetCompletedFilter = () => {props.changeFilter("completed", props.id)}
    const removeTodoList = () => {props.removeTodoList(props.id)}

    return (
        <div>
            <h3>{props.title}<button onClick={removeTodoList}>x</button></h3>
            <div>
                <input
                    placeholder={"enter new task"}
                    onChange={onChangeSetTitle}
                    value={title}
                    onKeyPress={onKeyPressAddTaskToTodoList}
                    className={error ? "error" : ""}
                />
                <button onClick={onClickAddTaskToTodoList}>+</button>
                { error && <div className="error-message">{error}</div>}
            </div>
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
