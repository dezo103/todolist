import React from "react";
import {action} from "@storybook/addon-actions";
import {EditableSpan} from "./EditableSpan";

export default {
    title: "EditableSpan Component",
    component: EditableSpan
}

const changeEditableSpan = action("Editable Span Changed")

export const EditableSpanBaseExample = () => {
    return <EditableSpan
        title={"CSS"}
        onChange={changeEditableSpan}
    />
}
