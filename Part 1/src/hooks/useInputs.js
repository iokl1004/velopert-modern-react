import { useState, useCallback } from 'react';

function reducer(state, action) {
    switch (action.type) {
        case 'CHANGE':
            return {
                ...state,
                [action.name]: action.value
            };
        case 'RESET':
            return Object.keys(state).reduce((acc, current) => {
                acc[current] = '';
                return acc;
            }, {});
        default:
            return state;
    }
}
function useInputs(initialForm) {
    const [form, setForm] = useState(initialForm);
    // change
    const onChange = useCallback(e => {
        const { name, value } = e.target;
        setForm(form => ({ ...form, [name]: value }));
    }, []);
    const reset = useCallback(() => setForm(initialForm), [initialForm]);
    return [form, onChange, reset];
}

export default useInputs;