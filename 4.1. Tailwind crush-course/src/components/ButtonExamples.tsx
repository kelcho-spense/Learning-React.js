import Button from './Button'

function ButtonExamples() {
    return (
        <div className="p-8 space-y-8 max-w-4xl mx-auto">
            <h1 className="text-3xl font-bold text-center mb-8">Button Component Examples</h1>

            {/* Variants */}
            <section>
                <h2 className="text-xl font-semibold mb-4">Variants</h2>
                <div className="flex flex-wrap gap-4">
                    <Button variant="primary">Primary</Button>
                    <Button variant="secondary">Secondary</Button>
                    <Button variant="outline">Outline</Button>
                    <Button variant="ghost">Ghost</Button>
                    <Button variant="danger">Danger</Button>
                </div>
            </section>

            {/* Sizes */}
            <section>
                <h2 className="text-xl font-semibold mb-4">Sizes</h2>
                <div className="flex flex-wrap items-center gap-4">
                    <Button size="sm">Small</Button>
                    <Button size="md">Medium</Button>
                    <Button size="lg">Large</Button>
                    <Button size="xl">Extra Large</Button>
                </div>
            </section>

            {/* Rounded */}
            <section>
                <h2 className="text-xl font-semibold mb-4">Border Radius</h2>
                <div className="flex flex-wrap gap-4">
                    <Button rounded="none">No Radius</Button>
                    <Button rounded="sm">Small Radius</Button>
                    <Button rounded="md">Medium Radius</Button>
                    <Button rounded="lg">Large Radius</Button>
                    <Button rounded="full">Full Radius</Button>
                </div>
            </section>

            {/* States */}
            <section>
                <h2 className="text-xl font-semibold mb-4">States</h2>
                <div className="flex flex-wrap gap-4">
                    <Button>Normal</Button>
                    <Button disabled>Disabled</Button>
                    <Button loading>Loading</Button>
                    <Button fullWidth>Full Width</Button>
                </div>
            </section>

            {/* Interactive Examples */}
            <section>
                <h2 className="text-xl font-semibold mb-4">Interactive Examples</h2>
                <div className="flex flex-wrap gap-4">
                    <Button
                        variant="primary"
                        onClick={() => alert('Primary button clicked!')}
                    >
                        Click Me
                    </Button>
                    <Button
                        variant="outline"
                        onClick={() => console.log('Outline button clicked!')}
                    >
                        Log to Console
                    </Button>
                    <Button
                        variant="danger"
                        onClick={() => confirm('Are you sure?')}
                    >
                        Confirm Action
                    </Button>
                </div>
            </section>

            {/* Custom Styling */}
            <section>
                <h2 className="text-xl font-semibold mb-4">Custom Styling</h2>
                <div className="flex flex-wrap gap-4">
                    <Button
                        variant="primary"
                        className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600"
                    >
                        Gradient Button
                    </Button>
                    <Button
                        variant="outline"
                        className="border-2 border-green-500 text-green-500 hover:bg-green-500 hover:text-white"
                    >
                        Custom Colors
                    </Button>
                </div>
            </section>

            {/* Form Example */}
            <section>
                <h2 className="text-xl font-semibold mb-4">Form Example</h2>
                <form className="space-y-4 max-w-md" onSubmit={(e) => e.preventDefault()}>
                    <input
                        type="email"
                        placeholder="Enter your email"
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <div className="flex gap-2">
                        <Button type="submit" variant="primary" fullWidth>
                            Submit
                        </Button>
                        <Button type="reset" variant="outline" fullWidth>
                            Reset
                        </Button>
                    </div>
                </form>
            </section>
        </div>
    )
}

export default ButtonExamples
