import React from 'react';
import styled, { css } from 'styled-components';
import { MdDone, MdDelete } from 'react-icons/md';
import { useTodoDispatch } from '../TodoContext';

const Remove = styled.div`
    display : flex;
    align-items: center;
    justify-content : center;
    color: #dee2e6;
    font-size : 24px;
    cursor : pointer;
    opacity : 0;
    &:hover {
        color: #ff6b6b; //쓰레기통 아이콘에 마우스 오버 했을때 빨간색
    }
`;

// TodoItemBlock 위에 커서가 있을 때,
// Remove 컴포넌트를 보여주라는 의미를 가지고 있습니다.
const TodoItemBlock = styled.div`
    display: flex;
    align-items: center;
    padding-top: 12px;
    padding-bottom: 12px;
    &:hover {
        ${Remove} {
            opacity : 1;
        }
    }
`;

const CheckCircle = styled.div`
    width: 32px;
    height : 32px;
    border-radius: 16px;
    border : 1px solid #ced4fa;
    font-size : 24px;
    display: flex;
    align-items: center;
    justify-content : center;
    margin-right : 20px;
    cursor : pointer;
    ${props =>
        props.done &&
        css`
            border: 1px solid #38d9a9;
            color: #38d9a9;
        `
    }
`;

const Text = styled.div`
    flex: 1;
    font-size: 21px;
    color: #495057;
    ${props =>
        props.done &&
        css`
            color: #ced4da;
        `
    }
`;

function TodoItem({ id, done, text }) {
    const dispatch = useTodoDispatch();
    const onToggle = () => dispatch({ type: 'TOGGLE', id });
    const onRemove = () => dispatch({ type: 'REMOVE', id });
    return (
        <TodoItemBlock>
            <CheckCircle done={done} onClick={onToggle}>
                {done && <MdDone />}
            </CheckCircle>
            <Text done={done}>{text}</Text>
            <Remove onClick={onRemove}>
                <MdDelete />
            </Remove>
        </TodoItemBlock>
    )
}

// 다른 항목이 업데이트 될 때, 불필요한 리렌더링을 방지하게 되어
// 성능을 최적화 할 수 있게 됩니다.
export default React.memo(TodoItem);