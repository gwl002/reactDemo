import React, { useState, useCallback, useEffect } from 'react';

export default function Home() {
    const [count, setCount] = useState(0);

    const deleteFn = useCallback(() => {
        return null;
    }, [])

    const add = () => {
        setCount(count => count + 1);
    }

    const deleteItem = () => {
        setCount(count => count - 1 >= 0 ? count - 1 : 0)
    }

    return (
        <div>
            home
            <div className="container">
                <button id="btn" onClick={add}>
                    add
                </button>
                <button id="btn" onClick={deleteItem} >
                    delete
                </button>
                <div id="resizeEle">
                    {
                        Array(count).fill(1).map((item, index) => {
                            return <Item
                                index={index}
                                item={item}
                                deleteFn={deleteFn}
                            />
                        })
                    }
                </div>
            </div>
        </div>

    )
}

const randomColor = () => {
    let r = Math.random(1) * 255;
    let g = Math.random(1) * 255;
    let b = Math.random(1) * 255;
    return `rgb(${r},${g},${b})`;
}

// const Item = React.memo(
//     ({ item, index, deleteFn }) => {
//         useEffect(() => {
//             console.log("mounted " + index);
//             return () => {
//                 console.log("unmounted " + index);
//             }
//         })

//         return (
//             <div key={index} style={{ height: 100, backgroundColor: randomColor() }}>{index}</div>
//         )
//     }
// )

const Item = ({ item, index, deleteFn }) => {
    useEffect(() => {
        console.log("mounted " + index);
        return () => {
            console.log("unmounted " + index);
        }
    }, [])

    return (
        <div key={index} style={{ height: 100, backgroundColor: randomColor() }}>{index}</div>
    )
}