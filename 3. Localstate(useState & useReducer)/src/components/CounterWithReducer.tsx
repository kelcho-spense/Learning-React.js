import { useReducer } from "react";
import './counterWithReducer.css';

// Define action types
type CounterAction =
    | { type: 'INCREMENT' }
    | { type: 'DECREMENT' }
    | { type: 'RESET' }
    | { type: 'SET_VALUE'; payload: number };

// Define state type
interface CounterState {
    count: number;
}

// Initial state
const initialState: CounterState = {
    count: 0
};

// Reducer function
function counterReducer(state: CounterState, action: CounterAction): CounterState {
    switch (action.type) {
        case 'INCREMENT':
            return { ...state, count: state.count + 1 };
        case 'DECREMENT':
            return { ...state, count: state.count - 1 };
        case 'RESET':
            return { ...state, count: 0 };
        case 'SET_VALUE':
            return { ...state, count: action.payload };
        default:
            return state;
    }
}

function CounterWithReducer() {
    const [state, dispatch] = useReducer(counterReducer, initialState);

    return (
        <div className="counter-container">
            <h2 className="counter-title">Counter with useReducer</h2>

            <div className="counter-buttons">
                <button
                    onClick={() => dispatch({ type: 'INCREMENT' })}
                    className="counter-btn increment-btn"
                >
                    Increment
                </button>

                <button
                    onClick={() => dispatch({ type: 'DECREMENT' })}
                    className="counter-btn decrement-btn"
                >
                    Decrement
                </button>
            </div>

            <div className="counter-display">
                Counter: {state.count}
            </div>

            <div className="counter-actions">
                <button
                    onClick={() => dispatch({ type: 'RESET' })}
                    className="counter-btn reset-btn"
                >
                    Reset
                </button>

                <button
                    onClick={() => dispatch({ type: 'SET_VALUE', payload: 10 })}
                    className="counter-btn set-value-btn"
                >
                    Set to 10
                </button>
            </div>
        </div>
    );
}

export default CounterWithReducer;
