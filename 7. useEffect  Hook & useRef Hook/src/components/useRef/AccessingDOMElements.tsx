import { useRef } from 'react'

function AccessingDOMElements() {

    const inputElement = useRef<HTMLInputElement>(null);

    const focusInput = () => {
        inputElement.current?.focus();
    };

    return (
        <div
            onClick={focusInput}
            className="max-h-screen bg-gray-100 p-6 flex flex-col items-center justify-center
         border-amber-200 border-4 rounded-lg shadow-lg ">
            <div className="w-full max-w-md space-y-6">
                <h2 className="text-2xl font-bold text-gray-800 text-center mb-8">
                    Click anywhere or use the button to focus the input
                </h2>

                <input
                    className='border-2 border-gray-300 rounded-lg p-4 w-full text-lg
                               transition-all duration-300 ease-in-out
                               focus:border-blue-500 focus:ring-4 
                               focus:ring-blue-200 focus:shadow-lg focus:scale-105 focus:outline-none
                               placeholder:text-gray-400'
                    type="text"
                    ref={inputElement}
                    placeholder="Click to focus me..."
                />

                <button
                    className='w-full bg-gray-500 hover:bg-blue-600 text-white font-semibold 
                               py-3 px-6 rounded-lg transition-all duration-200
                               hover:shadow-lg hover:scale-105 active:scale-95
                               focus:outline-none focus:ring-4 focus:ring-blue-300'
                    onClick={focusInput}
                >
                    Focus Input
                </button>
            </div>
        </div>
    )
}

export default AccessingDOMElements