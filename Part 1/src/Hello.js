import React from 'react';

function Hello( {color, name, isSpecial }) {
    return (
        <div style={{ color }}>
            { isSpecial && <b>*</b>}
            안녕하세요 해당 프롭스는 {name} 입니다 ㅋ
        </div>
    )
}

Hello.defaultProps = {
    name : '이름없음ㅋ'
}

export default Hello;