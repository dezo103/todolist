import React, {ChangeEvent, KeyboardEvent, useState} from "react";

type AddItemFormType = {
    addItem: (title: string, todolistId: string) => void
    id: string
}
export const AddItemForm = (props: AddItemFormType) => {
    const [title, setTitle] = useState<string>("")
    const [error, setError] = useState<string | null>(null)
    const onChangeSetTitle = (e: ChangeEvent<HTMLInputElement>) => setTitle(e.currentTarget.value)
    const onKeyPressAddTaskToTodoList = (e: KeyboardEvent) => {
        setError(null)
        if (e.key === "Enter") {
            onClickAddTaskToTodoList()
        }
    }
    const onClickAddTaskToTodoList = () => {
        if (title.trim() !== "") {
            props.addItem(title.trim(), props.id);
            setTitle("");
        } else {
            setError("Title is required")
        }
    }

    return (
        <div>
            <input
                placeholder={"enter new task"}
                onChange={onChangeSetTitle}
                value={title}
                onKeyPress={onKeyPressAddTaskToTodoList}
                className={error ? "error" : ""}
            />
            <button onClick={onClickAddTaskToTodoList}>+</button>
            {error && <div className="error-message">{error}</div>}
        </div>
    )
}
