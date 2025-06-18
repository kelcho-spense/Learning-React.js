import React from 'react'

// Example Grid Item Component for demonstrations
const GridItem = ({ children, className = "" }: { children: React.ReactNode, className?: string }) => (
    <div className={`bg-blue-500 text-white p-4 rounded-lg text-center font-semibold flex items-center justify-center ${className}`}>
        {children}
    </div>
)

// Layout Section Component
const GridSection = ({ title, description, children }: {
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

function Grid() {
    return (
        <div className="min-h-screen bg-gray-100 p-6">
            <div className="max-w-6xl mx-auto">
                <h1 className="text-4xl font-bold text-center text-gray-800 mb-8">
                    🏗️ CSS Grid Layouts Learning Guide
                </h1>
                <p className="text-lg text-gray-600 text-center mb-12 max-w-3xl mx-auto">
                    Master CSS Grid with practical examples of the most commonly used layouts.
                    Grid is perfect for 2D layouts, complex designs, and precise positioning.
                </p>

                {/* 1. Basic Grid */}
                <GridSection
                    title="1. Basic Grid - Equal Columns"
                    description="Simple grid with equal-width columns. Foundation of all grid layouts."
                >
                    <div className="grid grid-cols-3 gap-4 p-4 bg-gray-50 rounded-lg">
                        <GridItem>Item 1</GridItem>
                        <GridItem>Item 2</GridItem>
                        <GridItem>Item 3</GridItem>
                        <GridItem>Item 4</GridItem>
                        <GridItem>Item 5</GridItem>
                        <GridItem>Item 6</GridItem>
                    </div>
                    <div className="mt-2 text-sm text-gray-500 font-mono">
                        Classes: grid grid-cols-3 gap-4
                    </div>
                </GridSection>

                {/* 2. Responsive Grid */}
                <GridSection
                    title="2. Responsive Grid"
                    description="Grid that adapts: 1 column on mobile, 2 on tablet, 3 on desktop."
                >
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4 bg-gray-50 rounded-lg">
                        <GridItem>Responsive 1</GridItem>
                        <GridItem>Responsive 2</GridItem>
                        <GridItem>Responsive 3</GridItem>
                        <GridItem>Responsive 4</GridItem>
                        <GridItem>Responsive 5</GridItem>
                        <GridItem>Responsive 6</GridItem>
                    </div>
                    <div className="mt-2 text-sm text-gray-500 font-mono">
                        Classes: grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4
                    </div>
                    <div className="mt-2 text-xs text-blue-600">
                        💡 Resize your browser to see the responsive behavior
                    </div>
                </GridSection>

                {/* 3. Auto-Fit Grid */}
                <GridSection
                    title="3. Auto-Fit Grid"
                    description="Items automatically fit based on minimum width. Perfect for responsive card layouts."
                >
                    <div className="grid grid-cols-[repeat(auto-fit,minmax(200px,1fr))] gap-4 p-4 bg-gray-50 rounded-lg">
                        <GridItem>Auto 1</GridItem>
                        <GridItem>Auto 2</GridItem>
                        <GridItem>Auto 3</GridItem>
                        <GridItem>Auto 4</GridItem>
                        <GridItem>Auto 5</GridItem>
                    </div>
                    <div className="mt-2 text-sm text-gray-500 font-mono">
                        Classes: grid grid-cols-[repeat(auto-fit,minmax(200px,1fr))] gap-4
                    </div>
                </GridSection>

                {/* 4. Holy Grail Layout */}
                <GridSection
                    title="4. Holy Grail Layout"
                    description="Classic web layout: header, sidebar, main content, and footer."
                >
                    <div className="grid grid-rows-[auto_1fr_auto] grid-cols-1 md:grid-cols-[200px_1fr] gap-4 h-80 p-4 bg-gray-50 rounded-lg">
                        <div className="col-span-1 md:col-span-2 bg-purple-500 text-white p-4 rounded-lg text-center font-semibold">
                            Header
                        </div>
                        <div className="bg-green-500 text-white p-4 rounded-lg text-center font-semibold">
                            Sidebar
                        </div>
                        <div className="bg-blue-500 text-white p-4 rounded-lg text-center font-semibold">
                            Main Content
                        </div>
                        <div className="col-span-1 md:col-span-2 bg-red-500 text-white p-4 rounded-lg text-center font-semibold">
                            Footer
                        </div>
                    </div>
                    <div className="mt-2 text-sm text-gray-500 font-mono">
                        Classes: grid grid-rows-[auto_1fr_auto] grid-cols-1 md:grid-cols-[200px_1fr] (responsive)
                    </div>
                    <div className="mt-2 text-xs text-blue-600">
                        💡 On mobile: Stacks vertically. On desktop: Classic holy grail layout
                    </div>
                </GridSection>

                {/* 5. Card Grid with Different Sizes */}
                <GridSection
                    title="5. Card Grid with Spanning"
                    description="Grid where some items span multiple columns/rows for featured content."
                >
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-4 bg-gray-50 rounded-lg">
                        <GridItem className="col-span-2 row-span-2 bg-purple-500">
                            Featured Item
                            <br />
                            <span className="text-sm opacity-75">(2x2)</span>
                        </GridItem>
                        <GridItem>Item 1</GridItem>
                        <GridItem>Item 2</GridItem>
                        <GridItem>Item 3</GridItem>
                        <GridItem>Item 4</GridItem>
                        <GridItem className="col-span-2 bg-green-500">
                            Wide Item
                            <br />
                            <span className="text-sm opacity-75">(2x1)</span>
                        </GridItem>
                        <GridItem>Item 5</GridItem>
                        <GridItem>Item 6</GridItem>
                    </div>
                    <div className="mt-2 text-sm text-gray-500 font-mono">
                        Classes: grid grid-cols-2 md:grid-cols-4 gap-4 (with col-span-2, row-span-2)
                    </div>
                </GridSection>

                {/* 6. Dashboard Layout */}
                <GridSection
                    title="6. Dashboard Layout"
                    description="Complex dashboard with different sized widgets and sections."
                >
                    <div className="grid grid-cols-6 lg:grid-cols-12 grid-rows-6 gap-2 md:gap-4 h-[500px] md:h-96 p-2 md:p-4 bg-gray-50 rounded-lg">
                        <div className="col-span-6 lg:col-span-12 row-span-1 bg-gray-800 text-white p-2 md:p-4 rounded-lg text-center font-semibold text-sm md:text-base">
                            Dashboard Header
                        </div>
                        <div className="col-span-6 lg:col-span-3 row-span-2 lg:row-span-4 bg-purple-500 text-white p-2 md:p-4 rounded-lg text-center font-semibold text-sm md:text-base">
                            Sidebar Menu
                        </div>
                        <div className="col-span-6 lg:col-span-6 row-span-2 bg-blue-500 text-white p-2 md:p-4 rounded-lg text-center font-semibold text-sm md:text-base">
                            Main Chart
                        </div>
                        <div className="col-span-3 lg:col-span-3 row-span-1 lg:row-span-2 bg-green-500 text-white p-2 md:p-4 rounded-lg text-center font-semibold text-sm md:text-base">
                            Stats Widget
                        </div>
                        <div className="col-span-3 lg:col-span-3 row-span-1 lg:row-span-2 bg-orange-500 text-white p-2 md:p-4 rounded-lg text-center font-semibold text-sm md:text-base">
                            Activity Feed
                        </div>
                        <div className="col-span-3 lg:col-span-3 row-span-1 lg:row-span-2 bg-red-500 text-white p-2 md:p-4 rounded-lg text-center font-semibold text-sm md:text-base">
                            Quick Actions
                        </div>
                        <div className="col-span-6 lg:col-span-12 row-span-1 bg-gray-600 text-white p-2 md:p-4 rounded-lg text-center font-semibold text-sm md:text-base">
                            Footer
                        </div>
                    </div>
                    <div className="mt-2 text-sm text-gray-500 font-mono">
                        Classes: grid grid-cols-6 lg:grid-cols-12 grid-rows-6 gap-2 md:gap-4 (complex spanning)
                    </div>
                </GridSection>

                {/* 7. Magazine Layout */}
                <GridSection
                    title="7. Magazine Layout"
                    description="Asymmetric layout like magazines with featured articles and smaller content."
                >
                    <div className="grid grid-cols-3 md:grid-cols-6 grid-rows-4 gap-2 md:gap-4 h-[400px] md:h-80 p-2 md:p-4 bg-gray-50 rounded-lg">
                        <div className="col-span-3 md:col-span-4 row-span-2 md:row-span-3 bg-blue-600 text-white p-2 md:p-4 rounded-lg font-semibold">
                            <h3 className="text-base md:text-lg mb-1 md:mb-2">Featured Article</h3>
                            <p className="text-xs md:text-sm opacity-90">Main story with large image and detailed content...</p>
                        </div>
                        <div className="col-span-3 md:col-span-2 row-span-1 bg-green-500 text-white p-2 md:p-4 rounded-lg text-center font-semibold text-sm md:text-base">
                            Article 1
                        </div>
                        <div className="col-span-3 md:col-span-2 row-span-1 bg-purple-500 text-white p-2 md:p-4 rounded-lg text-center font-semibold text-sm md:text-base">
                            Article 2
                        </div>
                        <div className="col-span-3 md:col-span-2 row-span-1 bg-orange-500 text-white p-2 md:p-4 rounded-lg text-center font-semibold text-sm md:text-base">
                            Article 3
                        </div>
                        <div className="col-span-3 md:col-span-6 row-span-1 bg-gray-600 text-white p-2 md:p-4 rounded-lg text-center font-semibold text-sm md:text-base">
                            Advertisement Banner
                        </div>
                    </div>
                    <div className="mt-2 text-sm text-gray-500 font-mono">
                        Classes: grid grid-cols-3 md:grid-cols-6 grid-rows-4 gap-2 md:gap-4 (asymmetric spanning)
                    </div>
                </GridSection>

                {/* 8. Photo Gallery Grid */}
                <GridSection
                    title="8. Photo Gallery Grid"
                    description="Masonry-style photo gallery with different sized images."
                >
                    <div className="grid grid-cols-2 md:grid-cols-4 auto-rows-[80px] md:auto-rows-[100px] gap-2 md:gap-4 p-2 md:p-4 bg-gray-50 rounded-lg">
                        <div className="bg-gradient-to-br from-pink-400 to-red-500 text-white p-2 md:p-4 rounded-lg text-center font-semibold row-span-2 text-sm md:text-base">
                            Photo 1
                            <br />
                            <span className="text-xs md:text-sm opacity-75">Tall</span>
                        </div>
                        <div className="bg-gradient-to-br from-blue-400 to-purple-500 text-white p-2 md:p-4 rounded-lg text-center font-semibold text-sm md:text-base">
                            Photo 2
                        </div>
                        <div className="bg-gradient-to-br from-green-400 to-blue-500 text-white p-2 md:p-4 rounded-lg text-center font-semibold col-span-2 text-sm md:text-base">
                            Photo 3 - Wide
                        </div>
                        <div className="bg-gradient-to-br from-yellow-400 to-orange-500 text-white p-2 md:p-4 rounded-lg text-center font-semibold text-sm md:text-base">
                            Photo 4
                        </div>
                        <div className="bg-gradient-to-br from-purple-400 to-pink-500 text-white p-2 md:p-4 rounded-lg text-center font-semibold text-sm md:text-base">
                            Photo 5
                        </div>
                        <div className="bg-gradient-to-br from-indigo-400 to-purple-500 text-white p-2 md:p-4 rounded-lg text-center font-semibold col-span-2 row-span-2 text-sm md:text-base">
                            Photo 6
                            <br />
                            <span className="text-xs md:text-sm opacity-75">Large</span>
                        </div>
                        <div className="bg-gradient-to-br from-teal-400 to-green-500 text-white p-2 md:p-4 rounded-lg text-center font-semibold text-sm md:text-base">
                            Photo 7
                        </div>
                        <div className="bg-gradient-to-br from-red-400 to-pink-500 text-white p-2 md:p-4 rounded-lg text-center font-semibold text-sm md:text-base">
                            Photo 8
                        </div>
                    </div>
                    <div className="mt-2 text-sm text-gray-500 font-mono">
                        Classes: grid grid-cols-2 md:grid-cols-4 auto-rows-[80px] md:auto-rows-[100px] gap-2 md:gap-4 (various spans)
                    </div>
                </GridSection>

                {/* 9. E-commerce Product Grid */}
                <GridSection
                    title="9. E-commerce Product Grid"
                    description="Product grid with featured items and promotional banners."
                >
                    <div className="grid grid-cols-3 md:grid-cols-6 auto-rows-[100px] md:auto-rows-[120px] gap-2 md:gap-4 p-2 md:p-4 bg-gray-50 rounded-lg">
                        <div className="col-span-3 md:col-span-6 bg-gradient-to-r from-purple-600 to-blue-600 text-white p-2 md:p-4 rounded-lg text-center font-semibold text-sm md:text-base">
                            🎉 Summer Sale - Up to 50% Off
                        </div>
                        <div className="col-span-3 md:col-span-2 row-span-2 bg-red-500 text-white p-2 md:p-4 rounded-lg text-center font-semibold text-sm md:text-base">
                            Featured Product
                            <br />
                            <span className="text-xs md:text-sm opacity-75">$299</span>
                        </div>
                        <div className="bg-blue-500 text-white p-2 md:p-4 rounded-lg text-center font-semibold text-sm md:text-base">
                            Product 1
                            <br />
                            <span className="text-xs md:text-sm opacity-75">$99</span>
                        </div>
                        <div className="bg-green-500 text-white p-2 md:p-4 rounded-lg text-center font-semibold text-sm md:text-base">
                            Product 2
                            <br />
                            <span className="text-xs md:text-sm opacity-75">$149</span>
                        </div>
                        <div className="bg-purple-500 text-white p-2 md:p-4 rounded-lg text-center font-semibold text-sm md:text-base">
                            Product 3
                            <br />
                            <span className="text-xs md:text-sm opacity-75">$79</span>
                        </div>
                        <div className="bg-orange-500 text-white p-2 md:p-4 rounded-lg text-center font-semibold text-sm md:text-base">
                            Product 4
                            <br />
                            <span className="text-xs md:text-sm opacity-75">$199</span>
                        </div>
                        <div className="bg-teal-500 text-white p-2 md:p-4 rounded-lg text-center font-semibold text-sm md:text-base">
                            Product 5
                            <br />
                            <span className="text-xs md:text-sm opacity-75">$129</span>
                        </div>
                        <div className="bg-pink-500 text-white p-2 md:p-4 rounded-lg text-center font-semibold text-sm md:text-base">
                            Product 6
                            <br />
                            <span className="text-xs md:text-sm opacity-75">$89</span>
                        </div>
                        <div className="bg-indigo-500 text-white p-2 md:p-4 rounded-lg text-center font-semibold text-sm md:text-base">
                            Product 7
                            <br />
                            <span className="text-xs md:text-sm opacity-75">$159</span>
                        </div>
                        <div className="bg-yellow-500 text-white p-2 md:p-4 rounded-lg text-center font-semibold text-sm md:text-base">
                            Product 8
                            <br />
                            <span className="text-xs md:text-sm opacity-75">$249</span>
                        </div>
                    </div>
                    <div className="mt-2 text-sm text-gray-500 font-mono">
                        Classes: grid grid-cols-3 md:grid-cols-6 auto-rows-[100px] md:auto-rows-[120px] gap-2 md:gap-4 (promotional layout)
                    </div>
                </GridSection>

                {/* 10. Form Layout */}
                <GridSection
                    title="10. Advanced Form Layout"
                    description="Complex form layout using grid for precise field positioning."
                >
                    <div className="grid grid-cols-6 md:grid-cols-12 gap-3 md:gap-4 p-4 md:p-6 bg-gray-50 rounded-lg">
                        <div className="col-span-6 md:col-span-12">
                            <h3 className="text-base md:text-lg font-bold text-gray-800 mb-2">Contact Information</h3>
                        </div>
                        <div className="col-span-6">
                            <label className="block text-sm font-medium text-gray-700 mb-1">First Name</label>
                            <input type="text" className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm md:text-base" />
                        </div>
                        <div className="col-span-6">
                            <label className="block text-sm font-medium text-gray-700 mb-1">Last Name</label>
                            <input type="text" className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm md:text-base" />
                        </div>
                        <div className="col-span-6 md:col-span-8">
                            <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
                            <input type="email" className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm md:text-base" />
                        </div>
                        <div className="col-span-6 md:col-span-4">
                            <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
                            <input type="tel" className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm md:text-base" />
                        </div>
                        <div className="col-span-6 md:col-span-12">
                            <label className="block text-sm font-medium text-gray-700 mb-1">Message</label>
                            <textarea rows={3} className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm md:text-base"></textarea>
                        </div>
                        <div className="col-span-3 md:col-span-6">
                            <button className="w-full px-4 md:px-6 py-2 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400 text-sm md:text-base">
                                Cancel
                            </button>
                        </div>
                        <div className="col-span-3 md:col-span-6">
                            <button className="w-full px-4 md:px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 text-sm md:text-base">
                                Submit
                            </button>
                        </div>
                    </div>
                    <div className="mt-2 text-sm text-gray-500 font-mono">
                        Classes: grid grid-cols-6 md:grid-cols-12 gap-3 md:gap-4 (precise field positioning)
                    </div>
                </GridSection>

                {/* Quick Reference */}
                <GridSection
                    title="🎯 CSS Grid Quick Reference"
                    description="Essential Grid properties and common patterns."
                >
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 text-sm">
                        <div className="bg-blue-50 p-4 rounded-lg">
                            <h4 className="font-bold text-blue-800 mb-2">Grid Container</h4>
                            <ul className="space-y-1 text-blue-700">
                                <li><code className="bg-blue-100 px-1 rounded">grid</code> - Enable grid</li>
                                <li><code className="bg-blue-100 px-1 rounded">grid-cols-3</code> - 3 columns</li>
                                <li><code className="bg-blue-100 px-1 rounded">grid-rows-4</code> - 4 rows</li>
                                <li><code className="bg-blue-100 px-1 rounded">gap-4</code> - Grid gap</li>
                            </ul>
                        </div>

                        <div className="bg-green-50 p-4 rounded-lg">
                            <h4 className="font-bold text-green-800 mb-2">Responsive Grids</h4>
                            <ul className="space-y-1 text-green-700">
                                <li><code className="bg-green-100 px-1 rounded">grid-cols-1 md:grid-cols-3</code></li>
                                <li><code className="bg-green-100 px-1 rounded">auto-rows-[100px]</code></li>
                                <li><code className="bg-green-100 px-1 rounded">grid-cols-[repeat(auto-fit,minmax(200px,1fr))]</code></li>
                            </ul>
                        </div>

                        <div className="bg-purple-50 p-4 rounded-lg">
                            <h4 className="font-bold text-purple-800 mb-2">Grid Items</h4>
                            <ul className="space-y-1 text-purple-700">
                                <li><code className="bg-purple-100 px-1 rounded">col-span-2</code> - Span 2 columns</li>
                                <li><code className="bg-purple-100 px-1 rounded">row-span-3</code> - Span 3 rows</li>
                                <li><code className="bg-purple-100 px-1 rounded">col-start-2</code> - Start at column 2</li>
                                <li><code className="bg-purple-100 px-1 rounded">row-end-4</code> - End at row 4</li>
                            </ul>
                        </div>
                    </div>
                </GridSection>

                {/* Grid vs Flexbox */}
                <GridSection
                    title="⚖️ Grid vs Flexbox - When to Use Each"
                    description="Understanding when to choose Grid over Flexbox."
                >
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                        <div className="bg-blue-50 p-4 md:p-6 rounded-lg">
                            <h4 className="font-bold text-blue-800 mb-3">🏗️ Use CSS Grid When:</h4>
                            <ul className="space-y-2 text-blue-700 text-sm md:text-base">
                                <li>• Creating 2D layouts (rows AND columns)</li>
                                <li>• Building complex page layouts</li>
                                <li>• Need precise positioning control</li>
                                <li>• Creating dashboard or magazine layouts</li>
                                <li>• Items need to span multiple cells</li>
                                <li>• Layout-first approach needed</li>
                            </ul>
                        </div>

                        <div className="bg-green-50 p-4 md:p-6 rounded-lg">
                            <h4 className="font-bold text-green-800 mb-3">📐 Use Flexbox When:</h4>
                            <ul className="space-y-2 text-green-700 text-sm md:text-base">
                                <li>• Creating 1D layouts (row OR column)</li>
                                <li>• Aligning items in a container</li>
                                <li>• Building navigation bars</li>
                                <li>• Centering content</li>
                                <li>• Distributing space between items</li>
                                <li>• Content-first approach needed</li>
                            </ul>
                        </div>
                    </div>
                </GridSection>
            </div>
        </div>
    )
}

export default Grid