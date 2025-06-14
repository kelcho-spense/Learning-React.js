import { useState } from 'react'
import './tab.css'

function Tab() {
    const [activeTab, setActiveTab] = useState(0)

    const tabs = [
        { id: 0, label: 'Tab 1', content: 'This is the content for Tab 1' },
        { id: 1, label: 'Tab 2', content: 'This is the content for Tab 2' },
        { id: 2, label: 'Tab 3', content: 'This is the content for Tab 3' },
    ]

    
    return (
        <div className='container'>
            <div className='tabList'>
                {tabs.map((tab) => (
                    <button
                        className={`tab ${activeTab === tab.id ? 'active' : ''}`}
                        key={tab.id}
                        onClick={() => setActiveTab(tab.id)}
                    >
                        {tab.label}
                    </button>
                ))}
            </div>
            <div className='tabContent'>
                {tabs.find((tab) => tab.id === activeTab)?.content}
            </div>
        </div>
    )
}

export default Tab