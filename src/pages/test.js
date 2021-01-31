import React, { useState, useCallback, useEffect, useReducer } from 'react';

export default () => {
    const [showB, setShowB] = useState(false);

    return (
        <div>
            <button onClick={() => { setShowB(!showB) }}>toggle</button>
            <A />
            {showB && <B />}
            <C />
        </div>
    )
}


const A = () => {
    return (
        <div>A</div>
    )
}

const B = () => {
    return (
        <div>B</div>
    )
}

const C = () => {

    useEffect(() => {
        console.log("mounted C")
        return () => {
            console.log("unmounted C")
        }
    }, [])

    return (
        <div>C</div>
    )
}