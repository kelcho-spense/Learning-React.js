import { useReducer } from 'react';
import './tabWithReducer.css';

// Define the tab data type
interface TabData {
    id: number;
    label: string;
    content: string;
}

// Define action types
type TabAction =
    | { type: 'SET_ACTIVE_TAB'; payload: number }
    | { type: 'NEXT_TAB' }
    | { type: 'PREVIOUS_TAB' }
    | { type: 'RESET_TO_FIRST' };

// Define state type
interface TabState {
    activeTab: number;
    tabs: TabData[];
}

// Tab data
const tabsData: TabData[] = [
    { id: 0, label: 'Home', content: 'Welcome to the Home tab! This is where you can find general information and overview.' },
    { id: 1, label: 'About', content: 'Learn more about us in the About section. Here you can find our mission, vision, and team information.' },
    { id: 2, label: 'Services', content: 'Discover our Services! We offer a wide range of solutions to meet your needs.' },
    { id: 3, label: 'Contact', content: 'Get in touch with us through the Contact tab. Find our address, phone, and email information.' },
];

// Initial state
const initialState: TabState = {
    activeTab: 0,
    tabs: tabsData
};

// Reducer function
function tabReducer(state: TabState, action: TabAction): TabState {
    switch (action.type) {
        case 'SET_ACTIVE_TAB':
            return { ...state, activeTab: action.payload };
        case 'NEXT_TAB': {
            const nextTab = (state.activeTab + 1) % state.tabs.length;
            return { ...state, activeTab: nextTab };
        }
        case 'PREVIOUS_TAB': {
            const prevTab = state.activeTab === 0 ? state.tabs.length - 1 : state.activeTab - 1;
            return { ...state, activeTab: prevTab };
        }
        case 'RESET_TO_FIRST':
            return { ...state, activeTab: 0 };
        default:
            return state;
    }
}

function TabWithReducer() {
    const [state, dispatch] = useReducer(tabReducer, initialState);

    return (
        <div className='tab-container'>
            <h2 className='tab-title'>Tabs with useReducer</h2>

            {/* Navigation Controls */}
            <div className='tab-controls'>
                <button
                    className='control-btn'
                    onClick={() => dispatch({ type: 'PREVIOUS_TAB' })}
                >
                    ← Previous
                </button>

                <button
                    className='control-btn'
                    onClick={() => dispatch({ type: 'NEXT_TAB' })}
                >
                    Next →
                </button>

                <button
                    className='control-btn reset-btn'
                    onClick={() => dispatch({ type: 'RESET_TO_FIRST' })}
                >
                    Reset
                </button>
            </div>

            {/* Tab List */}
            <div className='tab-list'>
                {state.tabs.map((tab) => (
                    <button
                        className={`tab-btn ${state.activeTab === tab.id ? 'active' : ''}`}
                        key={tab.id}
                        onClick={() => dispatch({ type: 'SET_ACTIVE_TAB', payload: tab.id })}
                    >
                        {tab.label}
                    </button>
                ))}
            </div>

            {/* Tab Content */}
            <div className='tab-content'>
                <h3>
                    {state.tabs.find((tab) => tab.id === state.activeTab)?.label}
                </h3>
                <p>
                    {state.tabs.find((tab) => tab.id === state.activeTab)?.content}
                </p>
            </div>

            {/* Status Info */}
            <div className='tab-status'>
                Active Tab: {state.activeTab + 1} of {state.tabs.length}
            </div>
        </div>
    );
}

export default TabWithReducer;
