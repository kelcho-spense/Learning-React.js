import Counter from "./components/Counter";
import Tab from "./components/Tab";
import CounterWithReducer from "./components/CounterWithReducer";
import TabWithReducer from "./components/TabWithReducer";

export default function App() {
  return (
    <div className="app-container">
      <h1 style={{ textAlign: 'center', marginBottom: '40px', color: '#333' }}>
        useState vs useReducer Comparison
      </h1>

      <div style={{ display: 'grid', gap: '40px' }}>
        {/* useState Examples */}
        <section>
          <h2 style={{ textAlign: 'center', color: '#1976d2', marginBottom: '20px' }}>
            🎯 useState Examples
          </h2>
          <Counter />
          <Tab />
        </section>

        {/* useReducer Examples */}
        <section>
          <h2 style={{ textAlign: 'center', color: '#4caf50', marginBottom: '20px' }}>
            🔧 useReducer Examples
          </h2>
          <CounterWithReducer />
          <TabWithReducer />
        </section>

        {/* Comparison Info */}
        <section style={{
          backgroundColor: '#f5f5f5',
          padding: '30px',
          borderRadius: '12px',
          marginTop: '20px'
        }}>
          <h2 style={{ textAlign: 'center', color: '#333', marginBottom: '20px' }}>
            📊 When to Use Each
          </h2>

          <div style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: '20px'
          }}>
            <div style={{
              backgroundColor: '#e3f2fd',
              padding: '20px',
              borderRadius: '8px',
              border: '2px solid #1976d2'
            }}>
              <h3 style={{ color: '#1976d2', marginBottom: '15px' }}>useState</h3>
              <ul style={{ color: '#333', lineHeight: '1.6' }}>
                <li>Simple state updates</li>
                <li>Independent state values</li>
                <li>Basic toggle/counter logic</li>
                <li>Less complex state transitions</li>
                <li>Easier to understand for beginners</li>
              </ul>
            </div>

            <div style={{
              backgroundColor: '#e8f5e8',
              padding: '20px',
              borderRadius: '8px',
              border: '2px solid #4caf50'
            }}>
              <h3 style={{ color: '#4caf50', marginBottom: '15px' }}>useReducer</h3>
              <ul style={{ color: '#333', lineHeight: '1.6' }}>
                <li>Complex state logic</li>
                <li>Multiple related state updates</li>
                <li>State transitions with multiple actions</li>
                <li>Predictable state management</li>
                <li>Better for testing and debugging</li>
              </ul>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
