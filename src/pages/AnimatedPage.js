import React, { useState, useCallback, useEffect, useReducer, useRef } from 'react';
import { animated, useSpring } from "react-spring";
import "../styles/animate.css";

export default () => {
    const [num, setNum] = useState(0);
    const [positionY, setPositionY] = useState(0);
    return (
        <div>
            <button onClick={() => { setNum(num => num + 100) }}>add</button>
            <button onClick={() => { setNum(num => num - 100) }}>minus</button>
            <button onClick={() => { setPositionY(100) }}>add</button>
            <Number number={num} />
            <Nest positionY={positionY} />
        </div>
    )
}


function Number(props) {
    props = useSpring({ number: props.number ? props.number : 0 });
    return (
        <animated.span>
            {props.number.interpolate(x => (x * 100).toFixed(0))}
        </animated.span>
    )
}

const Nest = React.memo(({ positionY }) => {
    let { xyz } = useSpring({
        from: { xyz: [0, 0, 0] },
        to: async (next, cancel) => {
            await next({ xyz: [100, 0, 0], delay: 1000 })
            await next({ xyz: [100, 400, 0] })
        },
    })

    return (
        <animated.div
            style={{
                transform: xyz.interpolate((x, y, z) => `translate3d(${x}px, ${y}px, ${z}px)`),
            }}
        >
            <animated.span
                className="box"
            >
                {xyz.interpolate((x, y, z) => `${x.toFixed(2)}\n${y.toFixed(2)}\n${z.toFixed(2)}`)}
            </animated.span>
        </animated.div >
    )
})

