1. hook
1.1 useState
가장 기본적인 hook입니다. 함수형 컴포넌트에서도 가변적인 상태를 지닙니다. 
함수형 컴포넌트에서 상태를 관리해야 한다면 Hook 사용하면 됩니다.
const [value, setValue] = useState(0);
함수의 파라미터에는 상태의 기본값을 넣어줘야합니다. 배열의 요소중 첫번째 원소는 상태 값, 두 번째 원소는 상태를 설정하는 함수입니다. 파라미터를 넣어서 호출하면 전달받은 파라미터로 값이 바뀌고, 정상적으로 리렌더링 됩니다. 

1.1.1 useState 여러 번 사용하기
useState 함수는 하나의 상태 값만 관리 가능하기때문에 여러번 사용하고자 한다면 useState를 여러번 사용하면 됩니다.

import React, { useState } from 'react';
 
const Info = () => {
  const [name, setName] = useState('');
  const [nickname, setNickname] = useState('');
 
  const onChangeName = e => {
    setName(e.target.value);
  };
 
  const onChangeNickname = e => {
    setNickname(e.target.value);
  };
 
  return (
    <div>
      <div>
        <input value={name} onChange={onChangeName} />
        <input value={nickname} onChange={onChangeNickname} />
      </div>
      <div>
        <div>
          <b>이름:</b> {name}
        </div>
        <div>
          <b>닉네임:</b> {nickname}
        </div>
      </div>
    </div>
  );
};
 
export default Info


1.2 useEffect
useEffect 함수는 컴포넌트가 렌더링 될때마다 특정 작업을 수행하도록 설정할 수 있는 Hook 입니다. 또한 클래스형 컴포넌트의

componentDidMount + componentDidUpdate 형태와 비슷합니다. 밑의 코드는 위에 있던 코드에 useEffect 함수를 넣어 만든 코드입니다. 

import React, { useState, useEffect } from 'react';
 
const Info = () => {
  const [name, setName] = useState('');
  const [nickname, setNickname] = useState('');
  useEffect(() => {
    console.log('렌더링이 완료되었습니다!');
    console.log({
      name,
      nickname
    });
  });
1.2.1 마운트될 때만 실행하고 싶을때
useEffect에서 렌더링할때 실행하고,업데이트 될때는 실행하지 않으면 함수의 두 번째 파라미터로 비어 있는 배열로 넣어주면 됩니다.

useEffect(() => {
    console.log('마운트될 때만 실행됩니다.');
  }, []);
1.2.2  특정 값이 업데이트될 때만 실행하고 싶을 때 
props 안에 들어 있는 value 값이 바뀔 때만 특정 작업을 수행하는 특징이 있습니다. useEffect를 사용하고자 할떄 두 번째 파라미터로 전달되는 배열 안에 검사하고자 하는 값을 넣어 작업을 수행할 수 있습니다. 또한 배열안에는 useStateㄹ르 통해 관리하고 있는 상태를 넣을 수 있고, props로 전달받은 값을 넣을 수 있습니다. 

useEffect(() => {
    console.log(name);
  }, [name]);
1.2.3 뒷정리하기 
컴포넌트가 언마운트되기 전이나 업데이트 되기 직전에 작업을 수행하고자 한다면 useEffect에서 뒷정리(cleanup)함수를 반환해야 합니다. 컴포넌트가 나타날 때 콘솔에 effect가 나타나고, 사라질 때 cleanup이 나타납니다. 렌더링될 때마다 뒷정리 함수가 계속 나타나고, 호출될 때는 업데이트되기 직전의 값을 보여줍니다. 또한 언마운트될 때만 뒷정리 함수를 호출하고자 한다면 1.2.1에서 마운트만 실행하고 싶을때 처럼 두 번째 파라미터에 비여있는 배열을 넣으면 됩니다.

useEffect(() => {
    console.log('effect');
    console.log(name);
    return () => {
      console.log('cleanup');
      console.log(name);
    };
  });
1.3 useReducer
더 다양한 컴포넌트 상황에 따라 다양한 상태를 다른 값으로 업데이트 할 때 사용하는 hook 입니다.리듀서는 현재 상태, 업데이트를 위해 필요한 정보를 담은 액션 값을 전달받아 새로운 상태를 반환하는 함수입니다. 새로운 상태를 만들고자 할때 반드시 불변성을 지줘야 합니다. useReducer에서 사용하는 액션 객체는 반드시 type을 지니고 있을 필요가 없고, 객체는 문자열 숫자형 모두 가능합니다.

function reducer(state, action) {
return { ... }; // 불변성을 지키면서 업데이트한 새로운 상태를 반환합니다.
}
액션 값은 주로 다음과 같은 형태로 이루어져 있습니다.

{
  type: 'INCREMENT',
  // 다른 값들이 필요하다면 추가로 들어감
}
1.3.1 카운터 구현하기
useReducer의 첫 번째 파라미터에는 리듀서 함수, 두 번째 파라미터에는 해당 리듀서의 기본값을 넣어 줍니다. state값은 현재 가리키고 있는 상태이고 ,dispatch는 액션을 발생시키는 함수를 받아옵니다.dispatch과 같은 형태로 액션 값을 넣어 주면 리듀서 함수가 호출되는 구조입니다. 또한 이 함수를 사용한다면 컴포넌트 업데이트 로직을 컴포넌트 바깥으로 빼낼 수 있는것이 가장 큰 특징입니다.

import React, { useReducer } from 'react';
 
function reducer(state, action) {
  // action.type에 따라 다른 작업 수행
  switch (action.type) {
    case 'INCREMENT':
      return { value: state.value + 1 };
    case 'DECREMENT':
      return { value: state.value - 1 };
    default:
      // 아무것도 해당되지 않을 때 기존 상태 반환
      return state;
  }
}
 
const Counter = () => {
  const [state, dispatch] = useReducer(reducer, { value: 0 });
 
  return (
    <div>
      <p>
        현재 카운터 값은 <b>{state.value}</b>입니다.
      </p>
      <button onClick={() => dispatch({ type: 'INCREMENT' })}>+1</button>
      <button onClick={() => dispatch({ type: 'DECREMENT' })}>-1</button>
    </div>
  );
};
 
export default Counter;
-->Counter.js
import React from 'react';
import Counter from './Counter';
 
const App = () => {
  return <Counter />;
};
 
export default App;
-->App
1.3.2 인풋 상태 관리하기
기존에는 인풋이 여러개여서 useState를 여러번 사용했지만 useReducer를 사용하면 클래스 컴포넌트에서 인풋 태그에 name값을 할당하고,  e.target.name을 참고하여 setState를 사용한것과 같이 작업 처리가 가능합니다.또한 액션은 그 어떤 값도 사용 가능하기 때문에 e.target값 자체를 액션값으로 사용 가능합니다. 인풋 상태를 관리한다면 인풋의 개수가 많아져도 코드를 간단하게 유지할 수 있습니다.

import React, { useReducer } from 'react';
 
function reducer(state, action) {
  return {
    ...state,
    [action.name]: action.value
  };
}
 
const Info = () => {
  const [state, dispatch] = useReducer(reducer, {
    name: '',
    nickname: ''
  });
  const { name, nickname } = state;
  const onChange = e => {
    dispatch(e.target);
  };
 
  return (
    <div>
      <div>
        <input name="name" value={name} onChange={onChange} />
        <input name="nickname" value={nickname} onChange={onChange} />
      </div>
      <div>
        <div>
          <b>이름:</b> {name}
        </div>
        <div>
          <b>닉네임: </b>
          {nickname}
        </div>
      </div>
    </div>
  );
};
 
export default Info;
1.4 useMemo
함수형 컴포넌트 내부에서 발생하는 연산을 최적화 하기가 가능합니다. 렌더링하는 과정에서 특정 값이 바뀌었을 때만 실행하고, 바뀌지 않았다면 그 전에 사용했던 결과를 다시 사용하는 방식입니다.

import React, { useState, useMemo } from 'react';
 
const getAverage = numbers => {
  console.log('평균값 계산 중..');
  if (numbers.length === 0) return 0;
  const sum = numbers.reduce((a, b) => a + b);
  return sum / numbers.length;
};
 
const Average = () => {
  const [list, setList] = useState([]);
  const [number, setNumber] = useState('');
 
  const onChange = e => {
    setNumber(e.target.value);
  };
  const onInsert = () => {
    const nextList = list.concat(parseInt(number));
    setList(nextList);
    setNumber('');
  };
 
  const avg = useMemo(() => getAverage(list), [list]);
 
  return (
    <div>
      <input value={number} onChange={onChange} />
      <button onClick={onInsert}>등록</button>
      <ul>
        {list.map((value, index) => (
          <li key={index}>{value}</li>
        ))}
      </ul>
      <div>
        <b>평균값:</b> {avg}
      </div>
    </div>
  );
};
 
export default Average;
1.5 useCallback
최적화 하고자 할때 사용 가능하고, useMemo와 비슷한 함수입니다.컴포넌트의 렌더링이 자주 발생하거나 렌덜이해야 할 컴포넌트의 개수가 많아지면 이 부분을 최적화 해주는 것이 좋습니다.또한 첫 번째 파라미터에는 생성하고 싶은 함수를 넣고, 두 번째에는 배열을 넣습니다. 배열을 넣고자 할 때는 이 배열에는 어떤 값이 바뀌었을때 함수를 새로 생성해야 하는지 명시해야 합니다. 비여 있는 배열을 넣게 되면 컴포넌트가 렌더링 될때 단 한번만 함수가 생성되며, number,list를 넣게되면 인풋의 내용이 바뀌거나 함수가 생성됩니다. 상태값에 의존해야 할 때는 반드시 두 번째 파라미터 안에 포함시켜야 하고, onChane는 바로 설정하여 배열이 비어도 괜찮지만, onInsert는 기본의 number,list를 조회해서 nextlist를 생성하기 때문에 무조건 넣어줘야 합니다. 

 ...
 const onChange = useCallback(e => {
    setNumber(e.target.value);
}, []); // 컴포넌트가 처음 렌더링될 때만 함수 생성
const onInsert = useCallback(() => {
    const nextList = list.concat(parseInt(number));
    setList(nextList);
    setNumber('');
  }, [number, list]); // number 혹은 list가 바뀌었을 때만 함수 생성
  ...
  ->최적화 하고자 하는 함수


useMemo는 숫자,문자열,객체처럼 일반 값을 재사용하고자 할때 사용하고, useCallback는 함수를 재사용하고 할때 사용하면 됩ㄴ다.

useCallback(() => {
  console.log('hello world!');
}, [])
 
useMemo(() => {
  const fn = () => {
    console.log('hello world!');
  };
  return fn;
}, [])
1.6 useRef
함수형 컴포넌트에서 ref를 쉽게 사용할 수 있도록 해주는 hook입니다. ref 설정하면 만든 객체 안의 현재값이 실제 엘리먼트를 가리킵니다. 

1.6.1 로컬 변수 사용하기
렌더링과 상관없이 바뀔 수 있는 값인 로컬변수를 사용하여 클래스 형태로 작성된 컴포넌트일때 사용 할 수 있습니다.. ref 안의 값이 바뀌어도 컴포넌트가 렌더링 되지 않기 때문에 조심해야 합니다.

import React, { Component } from 'react';
 
class MyComponent extends Component {
  id = 1
  setId = (n) => {
    this.id = n;
  }
  printId = () => {
    console.log(this.id);
  }
  render() {
    return (
      <div>
        MyComponent
      </div>
    );
  }
}
import React, { useRef } from 'react';
 
const RefSample = () => {
  const id = useRef(1);
  const setId = (n) => {
    id.current = n;
  }
  const printId = () => {
    console.log(id.current);
  }
  return (
    <div>
      refsample
    </div>
  );
};
 
export default RefSample;
-->함수형 컴포넌트로 작성
1.6 커스텀 Hooks 만들기
다양한 컴포넌트에서 비슷한 기능을 공유할 경우, hook을 사용하여 로직을 재사용할 수 있습니다. hook을 info 컴포넌트 안에서 사용하고, useReducer로 작성했던것을 useInputs라는 Hook으로 분리한다면 깔끔해진 코드를 사용할 수 있습니다.

import React from 'react';
import useInputs from './useInputs';
 
const Info = () => {
  const [state, onChange] = useInputs({
    name: '',
    nickname: ''
  });
  const { name, nickname } = state;
 
  return (
    <div>
      <div>
        <input name="name" value={name} onChange={onChange} />
        <input name="nickname" value={nickname} onChange={onChange} />
      </div>
      <div>
        <div>
          <b>이름:</b> {name}
        </div>
        <div>
          <b>닉네임: </b>
          {nickname}
        </div>
      </div>
    </div>
  );
};
 
export default Info;
1.7 다른 Hooks
use-abortable-stream-fetch
useAPI
useAbortableFetch
useActions
useActive
useAdjustColor
useApolloClient
useApolloMutation
useApolloQuery
useArray
useAsync
etc...
더 다양한 hooks들이 존재합니다
1.8 정리
 Hooks를 사용한다면 클래스형 컴포넌트를 사용하지 않아도 많은 기능들을 구현 할 수 있습니다. 코드를 간결하고 더욱 깔끔하게 사용하고자 한다면 Hooks를 사용하는것 또한 방법입니다. 물론 클래스형 컴포넌트를 사용해서 구현 할 수 있지만, 함수형 컴포넌트를 먼저 생각하여 쓰고, 클래스형 컴포넌트를 꼭 사용할 상황에서만 쓰는걸 추천드립니다.