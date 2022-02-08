// 1. useState를 통하여 만들었을때
// import React, { useState }from 'react';

// function Counter() {
//     const [number, setNumber] = useState(0);

//     const onIncrease = () => {
//         setNumber(prevNumber1 => prevNumber1 + 1);
//       }
      
//       const onDecrease = () => {
//         setNumber(prevNumber2 => prevNumber2 - 1);
//       }

//     return (
//         <div>
//             <h1>{number}</h1>
//             <button onClick={onIncrease}>+1</button>
//             <button onClick={onDecrease}>-1</button>
//         </div>
//     )
// }

// export default Counter;

// 2. useReducer를 통하여 만들었을때
import React, { useReducer }from 'react';
function reducer(state, action) {
  switch (action.type) {
    case 'INCREMENT':
      return state + 1;
    case 'DECREMENT' :
      return state - 1;
    default :
      return state;
  }
}

function Counter() {
  const[number, dispatch] = useReducer(reducer, 0);

  const onIncrease = () => {
    dispatch({type : 'INCREMENT'});
  };

  const onDecrease = () => {
    dispatch ({ type : 'DECREMENT'});
  };

  return (
    <div>
      <h1>{number}</h1>
      <button onClick={onIncrease}>+1</button>
      <button onClick={onDecrease}>-1</button>
    </div>
  )
}
export default Counter;