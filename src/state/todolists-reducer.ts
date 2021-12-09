import {FilterValuesType, todoListType} from "../App";
import {v1} from "uuid";

export type RemoveToDoListActionType = {
    type: 'REMOVE-TODOLIST'
    id: string
}

export type AddToDoListActionType = {
    type: 'ADD-TODOLIST'
    title: string
    todolistId: string
}

type ChangeToDoListTitleActionType = {
    type: 'CHANGE-TODOLIST-TITLE'
    id: string
    title: string
}

type ChangeToDoListFilterActionType = {
    type: 'CHANGE-TODOLIST-FILTER'
    id: string
    filter: FilterValuesType
}

type ActionsType = RemoveToDoListActionType |
    AddToDoListActionType |
    ChangeToDoListTitleActionType |
    ChangeToDoListFilterActionType

export const todolistsReducer = (state: Array<todoListType>, action: ActionsType): Array<todoListType> => {
    switch (action.type) {
        case 'REMOVE-TODOLIST':
            return state.filter(tl => tl.id !== action.id)
        case 'ADD-TODOLIST':
            return [...state, {
                id: action.todolistId,
                title: action.title,
                filter: "all"
            }]
        case 'CHANGE-TODOLIST-TITLE': {
            const todoList = state.find(tl => tl.id === action.id)
            if (todoList) {
                todoList.title = action.title
            }
            return [...state]
        }
        case 'CHANGE-TODOLIST-FILTER': {
            let todoList = state.find(tl => tl.id === action.id)
            if (todoList) {
                todoList.filter = action.filter;
            }
            return [...state]
        }
        default:
            throw new Error("I don't understand this type")
    }
}


export const removeTodolistAC = (todolistId: string): RemoveToDoListActionType => {
    return { type: 'REMOVE-TODOLIST', id: todolistId}
}

export const addTodolistAC = (title: string): AddToDoListActionType => {
    return { type: 'ADD-TODOLIST', title, todolistId: v1()}
}

export const changeTodolistAC = (title: string, id: string): ChangeToDoListTitleActionType => {
    return { type: 'CHANGE-TODOLIST-TITLE', title, id}
}

export const changeTodolistFilterAC = (filter: FilterValuesType, id: string): ChangeToDoListFilterActionType => {
    return { type: 'CHANGE-TODOLIST-FILTER', filter:filter, id:id}
}
