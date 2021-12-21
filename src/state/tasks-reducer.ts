import {v1} from "uuid";
import {TasksStateType} from "../App";
import {AddToDoListActionType, RemoveToDoListActionType} from "./todolists-reducer";
// import {todolistId1, todolistId2} from "./todolists-reducer";

type RemoveTaskActionType = {
    type: 'REMOVE-TASK'
    taskId: string
    todolistId: string
}

type AddTaskActionType = {
    type: 'ADD-TASK'
    title: string
    todolistId: string
}

type ChangeTaskStatusActionType = {
    type: 'CHANGE-TASK-STATUS'
    taskId: string
    isDone: boolean
    todolistId: string
}

type ChangeTaskTitleActionType = {
    type: 'CHANGE-TASK-TITLE'
    taskId: string
    title: string
    todolistId: string
}

type ActionsType = RemoveTaskActionType |
    AddTaskActionType |
    ChangeTaskStatusActionType |
    ChangeTaskTitleActionType |
    AddToDoListActionType |
    RemoveToDoListActionType

const initialState: TasksStateType = {
    // [todolistId1]: [
    //     {id: v1(), title: "HTML", isDone: true},
    //     {id: v1(), title: "JS", isDone: true},
    //     {id: v1(), title: "React", isDone: false},
    //     {id: v1(), title: "REST API", isDone: false},
    //     {id: v1(), title: "GraphQL", isDone: false}
    // ],
    // [todolistId2]: [
    //     {id: v1(), title: "Book", isDone: false},
    //     {id: v1(), title: "Milk", isDone: true},
    // ]
}

export const tasksReducer = (state: TasksStateType = initialState, action: ActionsType): TasksStateType => {
    switch (action.type) {
        case 'REMOVE-TASK':
            return {...state, [action.todolistId]: state[action.todolistId].filter(t => t.id !== action.taskId)}
        case 'ADD-TASK':
            const stateCopy = {...state}
            const tasks = stateCopy[action.todolistId]
            const newTask = {id: v1(), title: action.title, isDone: false}
            const newTasks = [newTask, ...tasks]
            stateCopy[action.todolistId] = newTasks
            return stateCopy
        case 'CHANGE-TASK-STATUS':
            const stateCopy1 = {...state}
            const tasks1 = stateCopy1[action.todolistId]
            const task1 = tasks1.find(t => t.id === action.taskId)
            if (task1) {
                task1.isDone = action.isDone
            }
            return stateCopy1
        case 'CHANGE-TASK-TITLE':
            const stateCopy2 = {...state}
            const tasks2 = stateCopy2[action.todolistId]
            const task2 = tasks2.find(t => t.id === action.taskId)
            if (task2) {
                task2.title = action.title
            }
            return stateCopy2
        case "ADD-TODOLIST":
            const stateCopy3 = {...state}
            stateCopy3[action.todolistId] = []
            return stateCopy3
        case "REMOVE-TODOLIST":
            const stateCopy4 = {...state}
            delete stateCopy4[action.id]
            return stateCopy4
        default:
            return state
    }
}


export const removeTaskAC = (taskId: string, todolistId: string): RemoveTaskActionType => {
    return {type: 'REMOVE-TASK', taskId, todolistId}
}

export const addTaskAC = (title: string, todolistId: string): AddTaskActionType => {
    return {type: 'ADD-TASK', title, todolistId}
}

export const changeTaskStatusAC = (taskId: string, isDone: boolean, todolistId: string): ChangeTaskStatusActionType => {
    return {type: 'CHANGE-TASK-STATUS', taskId, isDone, todolistId}
}

export const changeTaskTitleAC = (taskId: string, title: string, todolistId: string): ChangeTaskTitleActionType => {
    return {type: 'CHANGE-TASK-TITLE', taskId, title, todolistId}
}
