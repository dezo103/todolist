import {FilterValuesType, todoListType} from "../App";
import {v1} from "uuid";

type RemoveToDoListActionType = {
    type: 'REMOVE-TODOLIST'
    id: string
}

type AddToDoListActionType = {
    type: 'ADD-TODOLIST'
    title: string
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
                id: v1(),
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
