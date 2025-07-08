import { Badge } from '@/components/ui/badge'
import Quill from 'quill'

const Delta = Quill.import('delta')

interface BlogPreviewProps {
    title: string
    summary: string
    category: string
    tags: string
    content: any // Quill Delta object
    author?: string
    publishDate?: Date
}

function BlogPreview({
    title,
    summary,
    category,
    tags,
    content,
    author = "John Doe",
    publishDate = new Date()
}: BlogPreviewProps) {
    // Convert Quill Delta to HTML for preview
    const convertDeltaToHtml = (delta: any) => {
        if (!delta) return ''

        try {
            // Create a temporary Quill instance to convert Delta to HTML
            const tempContainer = document.createElement('div')
            const tempQuill = new Quill(tempContainer, { theme: 'snow' })
            tempQuill.setContents(new Delta(delta))
            return tempQuill.root.innerHTML
        } catch (error) {
            console.error('Error converting delta to HTML:', error)
            return '<p>Content preview unavailable</p>'
        }
    }

    const formatDate = (date: Date) => {
        return date.toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        })
    }

    const formatCategory = (category: string) => {
        if (category.includes('/')) {
            const [main, sub] = category.split('/')
            return { main, sub }
        }
        return { main: category, sub: null }
    }

    const { main: mainCategory, sub: subCategory } = formatCategory(category)
    const tagList = tags.split(',').map(tag => tag.trim()).filter(tag => tag.length > 0)

    return (
        <article className="max-w-4xl mx-auto bg-white">
            {/* Header Section */}
            <header className="mb-8">
                <div className="flex flex-wrap items-center gap-2 mb-4">
                    <Badge variant="default" className="bg-blue-100 text-blue-800">
                        {mainCategory}
                    </Badge>
                    {subCategory && (
                        <Badge variant="outline" className="text-gray-600">
                            {subCategory}
                        </Badge>
                    )}
                </div>

                <h1 className="text-4xl font-bold text-gray-900 mb-4 leading-tight">
                    {title}
                </h1>

                <p className="text-xl text-gray-600 mb-6 leading-relaxed">
                    {summary}
                </p>

                <div className="flex items-center justify-between border-b border-gray-200 pb-4">
                    <div className="flex items-center space-x-4">
                        <div className="flex items-center space-x-2">
                            <div className="w-10 h-10 bg-gray-300 rounded-full flex items-center justify-center">
                                <span className="text-sm font-medium text-gray-700">
                                    {author.split(' ').map(n => n[0]).join('')}
                                </span>
                            </div>
                            <div>
                                <p className="text-sm font-medium text-gray-900">{author}</p>
                                <p className="text-sm text-gray-500">{formatDate(publishDate)}</p>
                            </div>
                        </div>
                    </div>

                    <div className="flex items-center space-x-2 text-sm text-gray-500">
                        <span>5 min read</span>
                        <span>•</span>
                        <span>0 comments</span>
                    </div>
                </div>
            </header>

            {/* Content Section */}
            <div className="prose prose-lg max-w-none mb-8">
                <div
                    className="ql-editor"
                    dangerouslySetInnerHTML={{
                        __html: convertDeltaToHtml(content)
                    }}
                    style={{
                        padding: 0,
                        fontSize: '18px',
                        lineHeight: '1.8',
                        color: '#374151'
                    }}
                />
            </div>

            {/* Tags Section */}
            {tagList.length > 0 && (
                <footer className="border-t border-gray-200 pt-6">
                    <div className="flex flex-wrap gap-2">
                        <span className="text-sm font-medium text-gray-700 mr-2">Tags:</span>
                        {tagList.map((tag, index) => (
                            <Badge
                                key={index}
                                variant="secondary"
                                className="text-xs bg-gray-100 text-gray-700 hover:bg-gray-200"
                            >
                                #{tag}
                            </Badge>
                        ))}
                    </div>
                </footer>
            )}

            {/* Social Share Preview (Optional) */}
            <div className="mt-8 pt-6 border-t border-gray-200">
                <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-500">Share this post:</span>
                    <div className="flex space-x-3">
                        <button className="text-gray-400 hover:text-blue-500 transition-colors">
                            <span className="sr-only">Share on Twitter</span>
                            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                                <path d="M6.29 18.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0020 3.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.073 4.073 0 01.8 7.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 010 16.407a11.616 11.616 0 006.29 1.84" />
                            </svg>
                        </button>
                        <button className="text-gray-400 hover:text-blue-600 transition-colors">
                            <span className="sr-only">Share on Facebook</span>
                            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M20 10C20 4.477 15.523 0 10 0S0 4.477 0 10c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V10h2.54V7.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V10h2.773l-.443 2.89h-2.33v6.988C16.343 19.128 20 14.991 20 10z" clipRule="evenodd" />
                            </svg>
                        </button>
                        <button className="text-gray-400 hover:text-blue-700 transition-colors">
                            <span className="sr-only">Share on LinkedIn</span>
                            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M16.338 16.338H13.67V12.16c0-.995-.017-2.277-1.387-2.277-1.39 0-1.601 1.086-1.601 2.207v4.248H8.014v-8.59h2.559v1.174h.037c.356-.675 1.227-1.387 2.526-1.387 2.703 0 3.203 1.778 3.203 4.092v4.711zM5.005 6.575a1.548 1.548 0 11-.003-3.096 1.548 1.548 0 01.003 3.096zm-1.337 9.763H6.34v-8.59H3.667v8.59zM17.668 1H2.328C1.595 1 1 1.581 1 2.298v15.403C1 18.418 1.595 19 2.328 19h15.34c.734 0 1.332-.582 1.332-1.299V2.298C19 1.581 18.402 1 17.668 1z" clipRule="evenodd" />
                            </svg>
                        </button>
                    </div>
                </div>
            </div>
        </article>
    )
}

export default BlogPreview