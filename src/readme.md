总结

react组件  function组件  class组件

一：
    1. 父组件state 或者 props changes 子组件会render
    2. 子组件props变化 引起render
        几个注意点：
            1. 组件定义在父组件里 每次组件本身改变了 会 重新unmount和mount
            2. 父组件refresh 子组件会render 如果props不变不会update 但是 jsx中function会重新执行
            3. 子组件props变化会update 
            4. 子组件props变化 小心 function props 没有用 useCallback导致组件更新
            5. React.memo 包裹 function组件 


二： hooks
    useState
    useEffect
    useMemo
    useCallback
    useReducer
    useRef
    useContext