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

// export let todolistId1 = v1()
// export let todolistId2 = v1()

const initialState: Array<todoListType> = [
    // {id: todolistId1, title: "What to learn", filter: "all"},
    // {id: todolistId2, title: "What to buy", filter: "all"}
]

export const todolistsReducer = (state: Array<todoListType> = initialState, action: ActionsType): Array<todoListType> => {
    switch (action.type) {
        case 'REMOVE-TODOLIST':
            return state.filter(tl => tl.id !== action.id)
        case 'ADD-TODOLIST':
            return [{
                id: action.todolistId,
                title: action.title,
                filter: "all"
            }, ...state]
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
            return state
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
