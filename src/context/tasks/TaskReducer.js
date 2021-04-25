import { PROJECT_TASKS, ADD_TASK, CHECK_TASK, DELETE_TASK, CURRENT_TASK, UPDATE_TASK, CLEAN_EDIT_TASK } from '../../types';


export default (state, action) => {
    switch (action.type) {
        case PROJECT_TASKS:
            return {
                ...state,
                tasksProject: action.payload
            }
        case ADD_TASK:
            return {
                ...state,
                tasksProject: [action.payload, ...state.tasksProject],
                taskError: false
            }
        case CHECK_TASK:
            return {
                ...state,
                taskError: true
            }
        case DELETE_TASK:
            return {
                ...state,
                tasksProject: state.tasksProject.filter(task => task._id !== action.payload)
            }
        case UPDATE_TASK:
            return {
                ...state,
                tasksProject: state.tasksProject.map(task => task._id === action.payload._id ? action.payload : task)
            }
        case CURRENT_TASK:
            return {
                ...state,
                selectedTask: action.payload
            }
        case CLEAN_EDIT_TASK:
            return {
                ...state,
                selectedTask: null
            }
        default:
            return state;
    }
}