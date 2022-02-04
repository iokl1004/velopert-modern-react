import React, { useEffect } from 'react';

function User({ user, onRemove, onToggle }) {

    useEffect(() => {
        //deps 파라미터를 생략하기
        //     console.log(user);
        // });

        // deps에 특정값 넣기
            // console.log('user 값이 설정됨');
            // console.log(user);
            return () => {
                // console.log('user 가 바뀌기 전..');
                // console.log(user);
            };
        }, [user]);

        return (
            <div>
                <b
                    style={{
                        cursor: 'pointer',  //마우스를 올렸을때 커서가 손가락 모양으로 변하게끔
                        color: user.active ? 'green' : 'black'  // active값에 따라 폰트의 색상 변경
                    }}
                    onClick={() => onToggle(user.id)}
                >
                    {user.username}
                </b>
                <span>({user.email})</span>
                <button onClick={() => onRemove(user.id)}>삭제</button>
            </div>
        );
    }

function UserList({ users, onRemove, onToggle }) {
            return (
                <div>
                    {users.map(user => (
                        <User
                            user={user}
                            key={user.id}
                            onRemove={onRemove}
                            onToggle={onToggle} />
                    ))}
                </div>
            );
        }

export default UserList;