import {v1} from "uuid";
import {TasksStateType} from "../App";

type RemoveTaskActionType = {
    type: 'REMOVE-TASK'
    taskId: string
    todolistId: string
}

type SecondActionType = {
    type: '2'

}

type ActionsType = RemoveTaskActionType | SecondActionType

export const tasksReducer = (state: TasksStateType, action: ActionsType): TasksStateType => {
    switch (action.type) {
        case 'REMOVE-TASK':
            return {...state, [action.todolistId]:state[action.todolistId].filter(t => t.id !== action.taskId)}
                //lesson 9 31 minutes
        case '2':
            return {...state}
        default:
            throw new Error("I don't understand this type")
    }
}


export const removeTaskAC = (taskId: string, todolistId: string): RemoveTaskActionType => {
    return { type: 'REMOVE-TASK', taskId, todolistId}
}

export const Action2AC = (title: string): SecondActionType => {
    return { type: '2' }
}
