import React, { useRef, useState, useMemo, useCallback } from 'react';
import Hello from './Hello';
import Wrapper from './Wrapper';
import Counter from './Counter';
import InputSample from './InputSample';
import UserList from './UserList';
import CreateUser from './CreateUser';

function countActiveUsers(users) {
  console.log('활성 사용자 수를 세는중...');
  return users.filter(user => user.active).length;
}

function App() {
  const [inputs, setInputs] = useState({
    username: '',
    email: ''
  });

  const { username, email } = inputs;
  
  // useCallback 은 특정 함수를 새로 만들지 않고 재사용하고 싶을때 사용
  // 주의 할점, 함수 안에서 사용하는 상태 혹은 props 가 있다면
  // 꼭, deps 배열안에 포함시켜야 된다!!
  // 만약에 deps 배열 안에 함수에서 사용하는 값을 넣지 않게 된다면,
  // 함수 내에서 해당 값들을 참조할때 가장 최신 값을 참조 할 것이라고 보장 할 수 없습니다.
  // props 로 받아온 함수가 있다면, 이 또한 deps 에 넣어주어야 해요.
  const onChange = useCallback(
    (e) => {
    const { name, value } = e.target;
    setInputs({
      ...inputs,
      [name]: value
    });
  }, [inputs]);

  const [users, setUsers] = useState([
    {
      id: 1,
      username: 'velopert',
      email: 'public.velopert@gmail.com',
      active : true
    },
    {
      id: 2,
      username: 'tester',
      email: 'tester@example.com',
      active : false
    },
    {
      id: 3,
      username: 'liz',
      email: 'liz@example.com',
      active : false
    },
  ]);

  const nextId = useRef(users.length+1);

  const onCreate = useCallback(() => {
    const user = {
      id: nextId.current,
      username,
      email
    };
    
    // 불변성을 지키면서 배열에 추가하는 방법
    setUsers([...users, user]); // 1.spread 연산자를 사용하는 것
    //setUsers(users.concat(user)); // 2. concat 함수를 사용하는 것

    setInputs({
      username: '',
      email: ''
    });

    nextId.current += 1;
  }, [users, username, email]);
  
  const onRemove = useCallback(
    (id) => {
    // user.id가 파라미터로 일치하지 않는 원소만 추출해서 새로운 배열을 만듬
    // = user.id가 id 인 것을 제거함
    setUsers(users.filter(user => user.id !== id));
  }, [users]);

  const onToggle = useCallback(
    (id) => {
    setUsers(
      users.map(user =>
        user.id === id ? { ...user, active : !user.active} : user)
    )
    
  }, [users]);

  // useMemo
  // 첫번째 파라미터에는 어떻게 연산할지 정의하는 함수를 넣어주면 되고,
  // 두번째 파라미터에는 deps 배열을 넣어주면 되는데,
  // 이 배열 안에 넣은 내용이 바뀌면,
  // 우리가 등록한 함수를 호출해서 값을 연산해주고,
  // 만약에 내용이 바뀌지 않았다면 이전에 연산한 값을 재사용하게 됩니다.
  const count = useMemo(() => countActiveUsers(users), [users]);

  return (
    <div>
      <CreateUser
        username={username}
        email={email}
        onChange={onChange}
        onCreate={onCreate}
      />
      <UserList users={users} onRemove={onRemove} onToggle={onToggle}/>
      <div>활성사용자 수 : {count} </div>
    </div>
  );
}

export default App;