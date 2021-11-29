import React from "react";

export type EditableSpanPropsType = {
    title: string
}
export const EditableSpan = (props: EditableSpanPropsType) => {
    return <span>{props.title}</span>
}
