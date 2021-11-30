import React, {ChangeEvent, KeyboardEvent, useState} from "react";
import {AddBox, Delete} from "@material-ui/icons";
import {IconButton, TextField} from "@material-ui/core";

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
            <TextField
                size={"small"}
                variant={"outlined"}
                value={title}
                onChange={onChangeSetTitle}
                onKeyPress={onKeyPressAddTaskToTodoList}
                label={"Title"}
                error={!!error}
            />
            {/*<input*/}
            {/*    placeholder={"enter title"}*/}
            {/*    onChange={onChangeSetTitle}*/}
            {/*    value={title}*/}
            {/*    onKeyPress={onKeyPressAddTaskToTodoList}*/}
            {/*    className={error ? "error" : ""}*/}
            {/*/>*/}
            <IconButton onClick={onClickAddTaskToTodoList}
                        color={"primary"}>
                <AddBox/>
            </IconButton>
            {/*<button onClick={onClickAddTaskToTodoList}>+</button>*/}
            {error && <div className="error-message">{error}</div>}
        </div>
    )
}
