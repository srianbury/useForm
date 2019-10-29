import React from 'react';

/**
 * React Hook to use in forms, easily handles resets and input changes
 *
 * @param {*} initialForm
 * @returns [
 *      form state object, 
 *      function to handle text input changes, 
 *      function to handle other changes, 
 *      and function to reset form state
 *  ]
 */
const useForm = initialForm => {
    const [form, dispatch] = React.useReducer(formReducer, initialForm);

    // reset the form to initialForm
    function reset(){
        dispatch({
            type: 'RESET',
            payload: initialForm
        });
    }

    /**
     * @param {object} payload
     */
    function handleChange(payload){
        dispatch({
            type: 'UPDATE',
            payload
        });
    }

    function handleInputChange(event){
        dispatch({
            type: 'UPDATE',
            payload: {
                [event.target.name]: event.target.value
            }
        });
    }

    /**
     * @param {object} error ({ error: new Error() })
     */
    function handleError(payload){
        dispatch({
            type: 'UPDATE',
            payload
        });
    }

    function clearError(){
        dispatch({
            type: 'DELETE_ERROR',
        });
    }

    return { form, handleInputChange, handleChange, reset, handleError, clearError };
}

/**
 * update or reset the data in the form
 *
 * @param {object} state
 * @param {object} action
 * @returns {object} updated state
 */
function formReducer(state, action){
    switch(action.type){
        case 'UPDATE':
            return { ...state, ...action.payload };
        case 'RESET':
            return action.payload;
        case 'DELETE_ERROR':
            delete state.error;
            return state;
        default:
            return state;
    }
}

export default useForm;
