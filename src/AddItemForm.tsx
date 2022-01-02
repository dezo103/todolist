import React, {ChangeEvent, KeyboardEvent, useState} from "react";
import {AddBox, Delete} from "@material-ui/icons";
import {IconButton, TextField} from "@material-ui/core";

type AddItemFormPropsType = {
    addItem: (title: string) => void
}
export const AddItemForm = React.memo( (props: AddItemFormPropsType) => {
    console.log("AddItemForm")
    const [title, setTitle] = useState<string>("")
    const [error, setError] = useState<string | null>(null)
    const onChangeSetTitle = (e: ChangeEvent<HTMLInputElement>) => setTitle(e.currentTarget.value)
    const onKeyPressAddTaskToTodoList = (e: KeyboardEvent) => {
        if (error !== null) {
            setError(null)
        }
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
                helperText={error}
            />
            <IconButton onClick={onClickAddTaskToTodoList}
                        color={"primary"}>
                <AddBox/>
            </IconButton>
        </div>
    )
} )
