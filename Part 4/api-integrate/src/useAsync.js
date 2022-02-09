import { useReducer, useEffect } from 'react';

function reducer(state, action) {
    switch (action.type) {
        case 'LOADING':
            return {
                loading: true,
                data: null,
                error: null
            };
        case 'SUCCESS':
            return {
                loading: false,
                data: action.data,
                error: null
            }
        case 'ERROR':
            return {
                loading: false,
                data: null,
                error: action.error
            };
        default:
            throw new Error(`Unhandled action type : ${action.type}`);
    }
}

// useAsync함수는 두가지 파라미터를 받아온다.
// callback : API 요청을 시작하는 함수
// deps : 해당 함수 안에서 사용하는 useEffect의 deps로 설정된다.

function useAsync(callback, deps = [], skip = false) {
    const [ state, dispatch] = useReducer(reducer, {
        loading: false,
        data: null,
        error: false
    });

    const fetchData = async () => {
        dispatch ({type: 'LOADING'});
        try {
            const data = await callback();
            dispatch( {type : 'SUCCESS', data});
        } catch (e) {
            dispatch( {type: 'ERROR', error: e});
        }
    };

    useEffect(() => {
        if (skip) return;
        fetchData();
        // eslint 설정을 다음 중에서만 비활성화
        // eslint-disable-next-line
    }, deps);

    return [state, fetchData];
}

export default useAsync;