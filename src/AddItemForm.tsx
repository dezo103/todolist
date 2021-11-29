import React, {ChangeEvent, KeyboardEvent, useState} from "react";

type AddItemFormPropsType = {
    addItem: (title: string) => void
}
export const AddItemForm = (props: AddItemFormPropsType) => {
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
            props.addItem(title.trim());
            setTitle("");
        } else {
            setError("Title is required")
        }
    }

    return (
        <div>
            <input
                placeholder={"enter title"}
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
