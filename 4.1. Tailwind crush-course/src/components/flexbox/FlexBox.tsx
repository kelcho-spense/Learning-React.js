import React from 'react'

// Example Item Component for demonstrations
const FlexItem = ({ children, className = "" }: { children: React.ReactNode, className?: string }) => (
    <div className={`bg-blue-500 text-white p-4 rounded-lg text-center font-semibold ${className}`}>
        {children}
    </div>
)

// Layout Section Component
const LayoutSection = ({ title, description, children }: {
    title: string,
    description: string,
    children: React.ReactNode
}) => (
    <div className="mb-8 p-6 bg-white rounded-lg shadow-md border">
        <h3 className="text-xl font-bold text-gray-800 mb-2">{title}</h3>
        <p className="text-gray-600 mb-4 text-sm">{description}</p>
        {children}
    </div>
)

function FlexBox() {
    return (
        <div className="min-h-screen bg-gray-100 p-6">
            <div className="max-w-6xl mx-auto">
                <h1 className="text-4xl font-bold text-center text-gray-800 mb-8">
                    Flexbox Layouts Learning Guide
                </h1>
                <p className="text-lg text-gray-600 text-center mb-12 max-w-3xl mx-auto">
                    Learn the most commonly used flexbox layouts with practical examples.
                    Each example shows the CSS classes and explains when to use each layout.
                </p>

                {/* 1. Basic Horizontal Layout */}
                <LayoutSection
                    title="1. Basic Horizontal Layout"
                    description="Items arranged horizontally in a row. Most basic flexbox layout."
                >
                    <div className="flex space-x-4 p-4 bg-gray-50 rounded-lg">
                        <FlexItem>Item 1</FlexItem>
                        <FlexItem>Item 2</FlexItem>
                        <FlexItem>Item 3</FlexItem>
                    </div>
                    <div className="mt-2 text-sm text-gray-500 font-mono">
                        Classes: flex space-x-4
                    </div>
                </LayoutSection>

                {/* 2. Vertical Stack */}
                <LayoutSection
                    title="2. Vertical Stack"
                    description="Items stacked vertically. Great for mobile layouts and sidebars."
                >
                    <div className="flex flex-col space-y-4 p-4 bg-gray-50 rounded-lg max-w-sm">
                        <FlexItem>Item 1</FlexItem>
                        <FlexItem>Item 2</FlexItem>
                        <FlexItem>Item 3</FlexItem>
                    </div>
                    <div className="mt-2 text-sm text-gray-500 font-mono">
                        Classes: flex flex-col space-y-4
                    </div>
                </LayoutSection>

                {/* 3. Center Everything */}
                <LayoutSection
                    title="3. Perfect Centering"
                    description="Center content both horizontally and vertically. Perfect for modals and hero sections."
                >
                    <div className="flex items-center justify-center h-40 p-4 bg-gray-50 rounded-lg">
                        <FlexItem>Centered Content</FlexItem>
                    </div>
                    <div className="mt-2 text-sm text-gray-500 font-mono">
                        Classes: flex items-center justify-center
                    </div>
                </LayoutSection>

                {/* 4. Space Between */}
                <LayoutSection
                    title="4. Space Between Layout"
                    description="Distribute items with equal space between them. Great for navigation bars."
                >
                    <div className="flex justify-between items-center p-4 bg-gray-50 rounded-lg">
                        <FlexItem>Logo</FlexItem>
                        <FlexItem>Navigation</FlexItem>
                        <FlexItem>User Menu</FlexItem>
                    </div>
                    <div className="mt-2 text-sm text-gray-500 font-mono">
                        Classes: flex justify-between items-center
                    </div>
                </LayoutSection>

                {/* 5. Space Around */}
                <LayoutSection
                    title="5. Space Around Layout"
                    description="Equal space around each item. Good for evenly distributed content."
                >
                    <div className="flex justify-around items-center p-4 bg-gray-50 rounded-lg">
                        <FlexItem>Feature 1</FlexItem>
                        <FlexItem>Feature 2</FlexItem>
                        <FlexItem>Feature 3</FlexItem>
                    </div>
                    <div className="mt-2 text-sm text-gray-500 font-mono">
                        Classes: flex justify-around items-center
                    </div>
                </LayoutSection>

                {/* 6. Flex Grow */}
                <LayoutSection
                    title="6. Flexible Growing Items"
                    description="Items grow to fill available space. Perfect for responsive layouts."
                >
                    <div className="flex space-x-4 p-4 bg-gray-50 rounded-lg">
                        <FlexItem>Fixed</FlexItem>
                        <FlexItem className="flex-1">Grows to fill space</FlexItem>
                        <FlexItem>Fixed</FlexItem>
                    </div>
                    <div className="mt-2 text-sm text-gray-500 font-mono">
                        Classes: flex space-x-4 (middle item has flex-1)
                    </div>
                </LayoutSection>

                {/* 7. Sidebar Layout */}
                <LayoutSection
                    title="7. Sidebar Layout"
                    description="Fixed sidebar with flexible main content. Common in admin dashboards."
                >
                    <div className="flex h-32 p-4 bg-gray-50 rounded-lg space-x-4">
                        <div className="w-48 bg-purple-500 text-white p-4 rounded-lg text-center font-semibold">
                            Sidebar (Fixed)
                        </div>
                        <div className="flex-1 bg-green-500 text-white p-4 rounded-lg text-center font-semibold">
                            Main Content (Flexible)
                        </div>
                    </div>
                    <div className="mt-2 text-sm text-gray-500 font-mono">
                        Classes: flex (sidebar: w-48, main: flex-1)
                    </div>
                </LayoutSection>

                {/* 8. Card Grid */}
                <LayoutSection
                    title="8. Responsive Card Grid"
                    description="Cards that wrap to new lines. Great for product listings and portfolios."
                >
                    <div className="flex flex-wrap gap-4 p-4 bg-gray-50 rounded-lg">
                        <FlexItem className="flex-1 min-w-48">Card 1</FlexItem>
                        <FlexItem className="flex-1 min-w-48">Card 2</FlexItem>
                        <FlexItem className="flex-1 min-w-48">Card 3</FlexItem>
                        <FlexItem className="flex-1 min-w-48">Card 4</FlexItem>
                        <FlexItem className="flex-1 min-w-48">Card 5</FlexItem>
                    </div>
                    <div className="mt-2 text-sm text-gray-500 font-mono">
                        Classes: flex flex-wrap gap-4 (items: flex-1 min-w-48)
                    </div>
                </LayoutSection>

                {/* 9. Header Layout */}
                <LayoutSection
                    title="9. Header with Actions"
                    description="Title on the left, actions on the right. Common in app headers."
                >
                    <div className="flex justify-between items-center p-4 bg-gray-50 rounded-lg">
                        <div>
                            <h3 className="text-lg font-bold text-gray-800">Page Title</h3>
                            <p className="text-sm text-gray-600">Subtitle or description</p>
                        </div>
                        <div className="flex space-x-2">
                            <button className="px-4 py-2 bg-blue-500 text-white rounded-lg text-sm">
                                Edit
                            </button>
                            <button className="px-4 py-2 bg-red-500 text-white rounded-lg text-sm">
                                Delete
                            </button>
                        </div>
                    </div>
                    <div className="mt-2 text-sm text-gray-500 font-mono">
                        Classes: flex justify-between items-center
                    </div>
                </LayoutSection>

                {/* 10. Footer Layout */}
                <LayoutSection
                    title="10. Footer Layout"
                    description="Multi-column footer that stacks on mobile. Responsive design pattern."
                >
                    <div className="flex flex-col md:flex-row gap-4 p-4 bg-gray-50 rounded-lg">
                        <div className="flex-1">
                            <h4 className="font-bold text-gray-800 mb-2">Company</h4>
                            <p className="text-sm text-gray-600">About us, Contact, Careers</p>
                        </div>
                        <div className="flex-1">
                            <h4 className="font-bold text-gray-800 mb-2">Products</h4>
                            <p className="text-sm text-gray-600">Features, Pricing, Support</p>
                        </div>
                        <div className="flex-1">
                            <h4 className="font-bold text-gray-800 mb-2">Resources</h4>
                            <p className="text-sm text-gray-600">Blog, Documentation, API</p>
                        </div>
                    </div>
                    <div className="mt-2 text-sm text-gray-500 font-mono">
                        Classes: flex flex-col md:flex-row gap-4 (items: flex-1)
                    </div>
                </LayoutSection>

                {/* 11. Align Items Examples */}
                <LayoutSection
                    title="11. Alignment Variations"
                    description="Different alignment options for items of varying heights."
                >
                    <div className="space-y-4">
                        {/* Align Start */}
                        <div className="flex items-start space-x-4 p-4 bg-gray-50 rounded-lg">
                            <FlexItem className="h-16">Tall Item</FlexItem>
                            <FlexItem className="h-8">Short</FlexItem>
                            <FlexItem className="h-12">Medium</FlexItem>
                        </div>
                        <div className="text-sm text-gray-500 font-mono">items-start</div>

                        {/* Align Center */}
                        <div className="flex items-center space-x-4 p-4 bg-gray-50 rounded-lg">
                            <FlexItem className="h-16">Tall Item</FlexItem>
                            <FlexItem className="h-8">Short</FlexItem>
                            <FlexItem className="h-12">Medium</FlexItem>
                        </div>
                        <div className="text-sm text-gray-500 font-mono">items-center</div>

                        {/* Align End */}
                        <div className="flex items-end space-x-4 p-4 bg-gray-50 rounded-lg">
                            <FlexItem className="h-16">Tall Item</FlexItem>
                            <FlexItem className="h-8">Short</FlexItem>
                            <FlexItem className="h-12">Medium</FlexItem>
                        </div>
                        <div className="text-sm text-gray-500 font-mono">items-end</div>
                    </div>
                </LayoutSection>

                {/* RESPONSIVE DESIGN PATTERNS */}
                <div className="mt-12 mb-8">
                    <h2 className="text-3xl font-bold text-center text-gray-800 mb-4">
                        📱 Responsive Design Patterns
                    </h2>
                    <p className="text-lg text-gray-600 text-center max-w-3xl mx-auto">
                        Learn the most commonly used responsive design patterns that adapt to different screen sizes.
                        These patterns use Tailwind's responsive prefixes (sm:, md:, lg:, xl:).
                    </p>
                </div>

                {/* 12. Basic Responsive Stack */}
                <LayoutSection
                    title="12. Basic Responsive Stack"
                    description="Items stack vertically on mobile, arrange horizontally on desktop. Most fundamental responsive pattern."
                >
                    <div className="flex flex-col md:flex-row gap-4 p-4 bg-gray-50 rounded-lg">
                        <FlexItem className="md:flex-1">Item 1</FlexItem>
                        <FlexItem className="md:flex-1">Item 2</FlexItem>
                        <FlexItem className="md:flex-1">Item 3</FlexItem>
                    </div>
                    <div className="mt-2 text-sm text-gray-500 font-mono">
                        Classes: flex flex-col md:flex-row gap-4 (items: md:flex-1)
                    </div>
                    <div className="mt-2 text-xs text-blue-600">
                        💡 Try resizing your browser to see the responsive behavior
                    </div>
                </LayoutSection>

                {/* 13. Responsive Navigation */}
                <LayoutSection
                    title="13. Responsive Navigation"
                    description="Logo on left, menu items on right (desktop). Stacked layout on mobile."
                >
                    <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4 p-4 bg-gray-50 rounded-lg">
                        <div className="text-xl font-bold text-gray-800">Logo</div>
                        <div className="flex flex-col md:flex-row gap-2 md:gap-4">
                            <a href="#" className="px-3 py-2 text-sm bg-white rounded hover:bg-gray-100">Home</a>
                            <a href="#" className="px-3 py-2 text-sm bg-white rounded hover:bg-gray-100">About</a>
                            <a href="#" className="px-3 py-2 text-sm bg-white rounded hover:bg-gray-100">Services</a>
                            <a href="#" className="px-3 py-2 text-sm bg-blue-500 text-white rounded hover:bg-blue-600">Contact</a>
                        </div>
                    </div>
                    <div className="mt-2 text-sm text-gray-500 font-mono">
                        Classes: flex flex-col md:flex-row md:justify-between md:items-center
                    </div>
                </LayoutSection>

                {/* 14. Responsive Card Grid */}
                <LayoutSection
                    title="14. Responsive Card Grid"
                    description="1 column on mobile, 2 on tablet, 3 on desktop. Perfect for product listings."
                >
                    <div className="flex flex-col sm:flex-row sm:flex-wrap gap-4 p-4 bg-gray-50 rounded-lg">
                        <FlexItem className="sm:flex-1 sm:min-w-0 md:min-w-60 lg:min-w-72">Product 1</FlexItem>
                        <FlexItem className="sm:flex-1 sm:min-w-0 md:min-w-60 lg:min-w-72">Product 2</FlexItem>
                        <FlexItem className="sm:flex-1 sm:min-w-0 md:min-w-60 lg:min-w-72">Product 3</FlexItem>
                        <FlexItem className="sm:flex-1 sm:min-w-0 md:min-w-60 lg:min-w-72">Product 4</FlexItem>
                        <FlexItem className="sm:flex-1 sm:min-w-0 md:min-w-60 lg:min-w-72">Product 5</FlexItem>
                        <FlexItem className="sm:flex-1 sm:min-w-0 md:min-w-60 lg:min-w-72">Product 6</FlexItem>
                    </div>
                    <div className="mt-2 text-sm text-gray-500 font-mono">
                        Classes: flex flex-col sm:flex-row sm:flex-wrap gap-4
                    </div>
                </LayoutSection>

                {/* 15. Responsive Sidebar */}
                <LayoutSection
                    title="15. Responsive Sidebar Layout"
                    description="Full-width on mobile, sidebar + content on desktop. Common in admin panels."
                >
                    <div className="flex flex-col lg:flex-row gap-4 p-4 bg-gray-50 rounded-lg">
                        <div className="lg:w-64 bg-purple-500 text-white p-4 rounded-lg text-center font-semibold">
                            <div className="mb-2">Sidebar</div>
                            <div className="text-sm opacity-75">Full width on mobile</div>
                        </div>
                        <div className="flex-1 bg-green-500 text-white p-4 rounded-lg text-center font-semibold">
                            <div className="mb-2">Main Content</div>
                            <div className="text-sm opacity-75">Adapts to remaining space</div>
                        </div>
                    </div>
                    <div className="mt-2 text-sm text-gray-500 font-mono">
                        Classes: flex flex-col lg:flex-row (sidebar: lg:w-64, main: flex-1)
                    </div>
                </LayoutSection>

                {/* 16. Responsive Hero Section */}
                <LayoutSection
                    title="16. Responsive Hero Section"
                    description="Text and image stack on mobile, side-by-side on desktop. Classic landing page pattern."
                >
                    <div className="flex flex-col md:flex-row gap-6 p-6 bg-gray-50 rounded-lg">
                        <div className="md:flex-1 space-y-4">
                            <h2 className="text-2xl font-bold text-gray-800">Hero Title</h2>
                            <p className="text-gray-600">
                                This is a hero section that demonstrates responsive layout. 
                                The text and image stack vertically on mobile devices for better readability.
                            </p>
                            <button className="px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600">
                                Call to Action
                            </button>
                        </div>
                        <div className="md:flex-1 bg-gradient-to-br from-blue-400 to-purple-500 rounded-lg p-8 text-white text-center">
                            <div className="text-6xl mb-2">📸</div>
                            <div>Hero Image Placeholder</div>
                        </div>
                    </div>
                    <div className="mt-2 text-sm text-gray-500 font-mono">
                        Classes: flex flex-col md:flex-row gap-6 (both sides: md:flex-1)
                    </div>
                </LayoutSection>

                {/* 17. Responsive Feature Cards */}
                <LayoutSection
                    title="17. Responsive Feature Cards"
                    description="Features stack on mobile, 2 columns on tablet, 3 on desktop. Scalable grid pattern."
                >
                    <div className="flex flex-col sm:flex-row sm:flex-wrap gap-4 p-4 bg-gray-50 rounded-lg">
                        <div className="sm:flex-1 sm:min-w-72 bg-blue-500 text-white p-6 rounded-lg">
                            <div className="text-2xl mb-2">🚀</div>
                            <h3 className="font-bold mb-2">Fast Performance</h3>
                            <p className="text-sm opacity-90">Lightning fast loading times for the best user experience.</p>
                        </div>
                        <div className="sm:flex-1 sm:min-w-72 bg-green-500 text-white p-6 rounded-lg">
                            <div className="text-2xl mb-2">🔒</div>
                            <h3 className="font-bold mb-2">Secure</h3>
                            <p className="text-sm opacity-90">Enterprise-grade security to protect your data.</p>
                        </div>
                        <div className="sm:flex-1 sm:min-w-72 bg-purple-500 text-white p-6 rounded-lg">
                            <div className="text-2xl mb-2">📱</div>
                            <h3 className="font-bold mb-2">Mobile First</h3>
                            <p className="text-sm opacity-90">Designed for mobile devices with desktop enhancements.</p>
                        </div>
                    </div>
                    <div className="mt-2 text-sm text-gray-500 font-mono">
                        Classes: flex flex-col sm:flex-row sm:flex-wrap gap-4 (items: sm:flex-1 sm:min-w-72)
                    </div>
                </LayoutSection>

                {/* 18. Responsive Form Layout */}
                <LayoutSection
                    title="18. Responsive Form Layout"
                    description="Form fields stack on mobile, side-by-side on desktop. Optimizes form completion."
                >
                    <div className="p-6 bg-gray-50 rounded-lg">
                        <div className="flex flex-col md:flex-row gap-4 mb-4">
                            <div className="md:flex-1">
                                <label className="block text-sm font-medium text-gray-700 mb-1">First Name</label>
                                <input type="text" className="w-full px-3 py-2 border border-gray-300 rounded-lg" />
                            </div>
                            <div className="md:flex-1">
                                <label className="block text-sm font-medium text-gray-700 mb-1">Last Name</label>
                                <input type="text" className="w-full px-3 py-2 border border-gray-300 rounded-lg" />
                            </div>
                        </div>
                        <div className="mb-4">
                            <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                            <input type="email" className="w-full px-3 py-2 border border-gray-300 rounded-lg" />
                        </div>
                        <div className="flex flex-col sm:flex-row gap-4">
                            <button className="sm:flex-1 px-6 py-2 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400">
                                Cancel
                            </button>
                            <button className="sm:flex-1 px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600">
                                Submit
                            </button>
                        </div>
                    </div>
                    <div className="mt-2 text-sm text-gray-500 font-mono">
                        Classes: flex flex-col md:flex-row gap-4 (inputs and buttons adapt)
                    </div>
                </LayoutSection>

                {/* 19. Responsive Pricing Cards */}
                <LayoutSection
                    title="19. Responsive Pricing Cards"
                    description="Pricing plans stack on mobile, side-by-side on desktop. Perfect for SaaS websites."
                >
                    <div className="flex flex-col lg:flex-row gap-6 p-4 bg-gray-50 rounded-lg">
                        <div className="lg:flex-1 bg-white p-6 rounded-lg border-2 border-gray-200">
                            <h3 className="text-xl font-bold text-gray-800 mb-2">Basic</h3>
                            <div className="text-3xl font-bold text-blue-600 mb-4">$9<span className="text-lg text-gray-500">/mo</span></div>
                            <ul className="space-y-2 text-sm text-gray-600 mb-6">
                                <li>✓ 10 Projects</li>
                                <li>✓ 100GB Storage</li>
                                <li>✓ Email Support</li>
                            </ul>
                            <button className="w-full px-4 py-2 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300">
                                Choose Plan
                            </button>
                        </div>
                        <div className="lg:flex-1 bg-white p-6 rounded-lg border-2 border-blue-500 transform lg:scale-105">
                            <div className="text-xs bg-blue-500 text-white px-2 py-1 rounded mb-2 inline-block">POPULAR</div>
                            <h3 className="text-xl font-bold text-gray-800 mb-2">Pro</h3>
                            <div className="text-3xl font-bold text-blue-600 mb-4">$29<span className="text-lg text-gray-500">/mo</span></div>
                            <ul className="space-y-2 text-sm text-gray-600 mb-6">
                                <li>✓ Unlimited Projects</li>
                                <li>✓ 1TB Storage</li>
                                <li>✓ Priority Support</li>
                                <li>✓ Advanced Analytics</li>
                            </ul>
                            <button className="w-full px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600">
                                Choose Plan
                            </button>
                        </div>
                        <div className="lg:flex-1 bg-white p-6 rounded-lg border-2 border-gray-200">
                            <h3 className="text-xl font-bold text-gray-800 mb-2">Enterprise</h3>
                            <div className="text-3xl font-bold text-blue-600 mb-4">$99<span className="text-lg text-gray-500">/mo</span></div>
                            <ul className="space-y-2 text-sm text-gray-600 mb-6">
                                <li>✓ Everything in Pro</li>
                                <li>✓ Custom Integrations</li>
                                <li>✓ 24/7 Phone Support</li>
                                <li>✓ SLA Guarantee</li>
                            </ul>
                            <button className="w-full px-4 py-2 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300">
                                Contact Sales
                            </button>
                        </div>
                    </div>
                    <div className="mt-2 text-sm text-gray-500 font-mono">
                        Classes: flex flex-col lg:flex-row gap-6 (cards: lg:flex-1)
                    </div>
                </LayoutSection>

                {/* 20. Responsive Dashboard Layout */}
                <LayoutSection
                    title="20. Responsive Dashboard Layout"
                    description="Complex dashboard that adapts from single column to multi-column layout."
                >
                    <div className="p-4 bg-gray-50 rounded-lg space-y-4">
                        {/* Top Stats */}
                        <div className="flex flex-col sm:flex-row gap-4">
                            <div className="sm:flex-1 bg-blue-500 text-white p-4 rounded-lg text-center">
                                <div className="text-2xl font-bold">1,234</div>
                                <div className="text-sm opacity-75">Total Users</div>
                            </div>
                            <div className="sm:flex-1 bg-green-500 text-white p-4 rounded-lg text-center">
                                <div className="text-2xl font-bold">$56.7K</div>
                                <div className="text-sm opacity-75">Revenue</div>
                            </div>
                            <div className="sm:flex-1 bg-purple-500 text-white p-4 rounded-lg text-center">
                                <div className="text-2xl font-bold">89.2%</div>
                                <div className="text-sm opacity-75">Conversion</div>
                            </div>
                        </div>
                        
                        {/* Main Content */}
                        <div className="flex flex-col lg:flex-row gap-4">
                            <div className="lg:flex-2 bg-white p-4 rounded-lg">
                                <h3 className="font-bold text-gray-800 mb-2">Analytics Chart</h3>
                                <div className="h-32 bg-gray-100 rounded flex items-center justify-center text-gray-500">
                                    📊 Chart Placeholder
                                </div>
                            </div>
                            <div className="lg:flex-1 bg-white p-4 rounded-lg">
                                <h3 className="font-bold text-gray-800 mb-2">Recent Activity</h3>
                                <div className="space-y-2 text-sm text-gray-600">
                                    <div>• User John registered</div>
                                    <div>• Payment received</div>
                                    <div>• New order #1234</div>
                                    <div>• Support ticket created</div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="mt-2 text-sm text-gray-500 font-mono">
                        Classes: Complex responsive layout with multiple breakpoints
                    </div>
                </LayoutSection>

                {/* Responsive Patterns Guide */}
                <LayoutSection
                    title="🎯 Responsive Design Best Practices"
                    description="Key principles and patterns for creating responsive layouts with Flexbox."
                >
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm">
                        <div className="bg-blue-50 p-6 rounded-lg">
                            <h4 className="font-bold text-blue-800 mb-3">📱 Mobile-First Approach</h4>
                            <ul className="space-y-2 text-blue-700">
                                <li>• Start with mobile layout (smallest screen)</li>
                                <li>• Use <code className="bg-blue-100 px-1 rounded">flex-col</code> as default</li>
                                <li>• Add responsive prefixes for larger screens</li>
                                <li>• Test on actual devices, not just browser resize</li>
                            </ul>
                        </div>

                        <div className="bg-green-50 p-6 rounded-lg">
                            <h4 className="font-bold text-green-800 mb-3">📏 Breakpoint Strategy</h4>
                            <ul className="space-y-2 text-green-700">
                                <li>• <code className="bg-green-100 px-1 rounded">sm:</code> 640px+ (Large phones)</li>
                                <li>• <code className="bg-green-100 px-1 rounded">md:</code> 768px+ (Tablets)</li>
                                <li>• <code className="bg-green-100 px-1 rounded">lg:</code> 1024px+ (Small laptops)</li>
                                <li>• <code className="bg-green-100 px-1 rounded">xl:</code> 1280px+ (Large screens)</li>
                            </ul>
                        </div>

                        <div className="bg-purple-50 p-6 rounded-lg">
                            <h4 className="font-bold text-purple-800 mb-3">🔄 Common Patterns</h4>
                            <ul className="space-y-2 text-purple-700">
                                <li>• Stack → Side-by-side: <code className="bg-purple-100 px-1 rounded">flex-col md:flex-row</code></li>
                                <li>• Hide on mobile: <code className="bg-purple-100 px-1 rounded">hidden md:flex</code></li>
                                <li>• Different alignments: <code className="bg-purple-100 px-1 rounded">items-start md:items-center</code></li>
                                <li>• Responsive gaps: <code className="bg-purple-100 px-1 rounded">gap-2 md:gap-4 lg:gap-6</code></li>
                            </ul>
                        </div>

                        <div className="bg-orange-50 p-6 rounded-lg">
                            <h4 className="font-bold text-orange-800 mb-3">✅ Testing Tips</h4>
                            <ul className="space-y-2 text-orange-700">
                                <li>• Use browser dev tools device simulation</li>
                                <li>• Test on real devices when possible</li>
                                <li>• Check touch targets (minimum 44px)</li>
                                <li>• Ensure readable text without zooming</li>
                            </ul>
                        </div>
                    </div>
                </LayoutSection>

                {/* Quick Reference */}
                <LayoutSection
                    title="Quick Reference Guide"
                    description="Common flexbox patterns and their use cases."
                >
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                        <div className="bg-blue-50 p-4 rounded-lg">
                            <h4 className="font-bold text-blue-800 mb-2">Direction & Wrapping</h4>
                            <ul className="space-y-1 text-blue-700">
                                <li><code className="bg-blue-100 px-1 rounded">flex</code> - Horizontal row</li>
                                <li><code className="bg-blue-100 px-1 rounded">flex-col</code> - Vertical column</li>
                                <li><code className="bg-blue-100 px-1 rounded">flex-wrap</code> - Allow wrapping</li>
                                <li><code className="bg-blue-100 px-1 rounded">flex-nowrap</code> - Prevent wrapping</li>
                            </ul>
                        </div>

                        <div className="bg-green-50 p-4 rounded-lg">
                            <h4 className="font-bold text-green-800 mb-2">Justify Content</h4>
                            <ul className="space-y-1 text-green-700">
                                <li><code className="bg-green-100 px-1 rounded">justify-start</code> - Pack to start</li>
                                <li><code className="bg-green-100 px-1 rounded">justify-center</code> - Center items</li>
                                <li><code className="bg-green-100 px-1 rounded">justify-between</code> - Space between</li>
                                <li><code className="bg-green-100 px-1 rounded">justify-around</code> - Space around</li>
                            </ul>
                        </div>

                        <div className="bg-purple-50 p-4 rounded-lg">
                            <h4 className="font-bold text-purple-800 mb-2">Align Items</h4>
                            <ul className="space-y-1 text-purple-700">
                                <li><code className="bg-purple-100 px-1 rounded">items-start</code> - Align to start</li>
                                <li><code className="bg-purple-100 px-1 rounded">items-center</code> - Center vertically</li>
                                <li><code className="bg-purple-100 px-1 rounded">items-end</code> - Align to end</li>
                                <li><code className="bg-purple-100 px-1 rounded">items-stretch</code> - Stretch to fit</li>
                            </ul>
                        </div>

                        <div className="bg-orange-50 p-4 rounded-lg">
                            <h4 className="font-bold text-orange-800 mb-2">Flex Properties</h4>
                            <ul className="space-y-1 text-orange-700">
                                <li><code className="bg-orange-100 px-1 rounded">flex-1</code> - Grow to fill space</li>
                                <li><code className="bg-orange-100 px-1 rounded">flex-none</code> - Don't grow/shrink</li>
                                <li><code className="bg-orange-100 px-1 rounded">flex-auto</code> - Auto flex</li>
                                <li><code className="bg-orange-100 px-1 rounded">flex-initial</code> - Initial flex</li>
                            </ul>
                        </div>
                    </div>
                </LayoutSection>
            </div>
        </div>
    )
}

export default FlexBox