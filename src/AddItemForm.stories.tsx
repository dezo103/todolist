import React from "react";
import {AddItemForm} from "./AddItemForm";
import {action} from "@storybook/addon-actions";

export default {
    title: "AddItemForm Component",
    component: AddItemForm
}

const callback = action("pressed Button add")

export const AddItemFormBaseExample = () => {
    return <AddItemForm addItem={callback} />
}
