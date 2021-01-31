import React, { useState, useCallback, useEffect, useReducer } from 'react';

const initState = {
    input: "",
    todos: []
};

// todo = {
//     id:"",
//     text: "",
//     createdAt: "",
//     updatedAt: "",
//     completed: false
// }

const createRandomId = () => {
    return Date.now().toString() + Math.floor(Math.random() * 10000)
}

const reducer = (state, action) => {
    switch (action.type) {
        case "addTodo":
            return {
                ...state,
                input: "",
                todos: [
                    ...state.todos,
                    {
                        id: createRandomId(),
                        text: action.text,
                        createdAt: Date.now(),
                        updatedAt: null,
                        completed: false
                    }
                ]
            }
            break;
        case "toggleComplete":
            return {
                ...state,
                todos: state.todos.map((todo, index) => {
                    if (todo.id === action.id) {
                        let obj = { ...todo };
                        obj.completed = !obj.completed;
                        return obj;
                        //为什么这里不会起作用 因为todoItem中todo没变
                        // todo.completed = !todo.completed;
                        // return todo;
                    }
                    return todo
                })
            }
        default:
            return state
    }
}

export default function TodoList() {
    const [state, dispatch] = useReducer(reducer, initState);

    const addTodo = (text) => {
        if (text) {
            dispatch({
                type: "addTodo",
                text
            })
        }
    }

    // const toggleCheck = useCallback(
    //     (id) => {
    //         dispatch({
    //             type: "toggleComplete",
    //             id
    //         })
    //     }
    //     , [dispatch])

    const toggleCheck = (id) => {
        dispatch({
            type: "toggleComplete",
            id
        })
    }

    return (
        <div>
            <h3>TodoList</h3>
            <AddTodo addTodo={addTodo} />
            <Todos todos={state.todos} toggleCheck={toggleCheck} />
        </div>
    )
}


const AddTodo = ({ addTodo }) => {
    const [text, setText] = useState("");
    return (
        <div>
            <input type="text" value={text} onChange={(e) => setText(e.target.value)} />
            <button onClick={(e) => {
                addTodo(text);
                setText("");
            }}>add</button>
        </div>
    )
}

const Todos = ({ todos, toggleCheck }) => {
    return (
        <>
            {
                todos.map((todo, index) => {
                    return (
                        <TodoItem todo={todo} key={todo.id} toggleCheck={toggleCheck} />
                    )
                })
            }
        </>
    )
}

const TodoItem = ({ todo, toggleCheck }) => {
    console.log(todo, "======");
    useEffect(() => {
        console.log("mounted");
        return () => {
            console.log("unmounted");
        }
    }, [])

    useEffect(() => {
        console.log("todo change")
    }, [todo])

    useEffect(() => {
        console.log("togoCheck change")
    }, [toggleCheck])


    return (
        <div>
            <input
                type="checkbox"
                checked={todo.completed}
                onChange={() => {
                    toggleCheck(todo.id)
                }}
            />
            <span>{todo.text}</span>
        </div>
    )
}

//区分 render 和 mount   props change 