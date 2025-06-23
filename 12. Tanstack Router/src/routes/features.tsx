import { createFileRoute } from '@tanstack/react-router'
import { BookOpen, Globe, Heart, PenTool, Users, Zap } from 'lucide-react'

export const Route = createFileRoute('/features')({
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <section id="features" className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            Everything You Need to Share Your Story
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Powerful tools and features designed to help you write, publish, and grow your audience.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-white p-8 rounded-xl shadow-sm hover:shadow-lg transition-shadow">
            <div className="bg-blue-100 w-12 h-12 rounded-lg flex items-center justify-center mb-6">
              <PenTool className="h-6 w-6 text-blue-600" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-4">Rich Text Editor</h3>
            <p className="text-gray-600">
              Write with our intuitive editor that supports rich formatting, images, videos, and code blocks.
            </p>
          </div>

          <div className="bg-white p-8 rounded-xl shadow-sm hover:shadow-lg transition-shadow">
            <div className="bg-green-100 w-12 h-12 rounded-lg flex items-center justify-center mb-6">
              <Users className="h-6 w-6 text-green-600" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-4">Community Driven</h3>
            <p className="text-gray-600">
              Connect with like-minded writers and readers. Build your following and engage with your audience.
            </p>
          </div>

          <div className="bg-white p-8 rounded-xl shadow-sm hover:shadow-lg transition-shadow">
            <div className="bg-purple-100 w-12 h-12 rounded-lg flex items-center justify-center mb-6">
              <Zap className="h-6 w-6 text-purple-600" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-4">AI-Powered Insights</h3>
            <p className="text-gray-600">
              Get smart suggestions for your writing and insights about your audience engagement.
            </p>
          </div>

          <div className="bg-white p-8 rounded-xl shadow-sm hover:shadow-lg transition-shadow">
            <div className="bg-orange-100 w-12 h-12 rounded-lg flex items-center justify-center mb-6">
              <BookOpen className="h-6 w-6 text-orange-600" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-4">Reading Lists</h3>
            <p className="text-gray-600">
              Curate and organize your favorite stories. Create themed collections for your readers.
            </p>
          </div>

          <div className="bg-white p-8 rounded-xl shadow-sm hover:shadow-lg transition-shadow">
            <div className="bg-red-100 w-12 h-12 rounded-lg flex items-center justify-center mb-6">
              <Heart className="h-6 w-6 text-red-600" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-4">Social Engagement</h3>
            <p className="text-gray-600">
              Like, comment, and share stories. Build meaningful connections through thoughtful discussions.
            </p>
          </div>

          <div className="bg-white p-8 rounded-xl shadow-sm hover:shadow-lg transition-shadow">
            <div className="bg-indigo-100 w-12 h-12 rounded-lg flex items-center justify-center mb-6">
              <Globe className="h-6 w-6 text-indigo-600" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-4">Global Reach</h3>
            <p className="text-gray-600">
              Publish in multiple languages and reach readers worldwide with our global platform.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
