import { createFileRoute } from '@tanstack/react-router'
import { useRef, useState } from 'react';
import Editor from '@/components/newblog/Editor';
import BlogPreview from '@/components/newblog/BlogPreview';
import Quill from 'quill';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
    Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle,
} from "@/components/ui/dialog"

const Delta = Quill.import('delta');

export const Route = createFileRoute('/dashboard/new-blog')({
    component: RouteComponent,
})

interface BlogFormData {
    title: string;
    summary: string;
    category: string;
    tags: string;
    content: any; // Quill Delta object
}

const BlogCategories = {
    'Technology': {
        subcategories: ['Web Development', 'Mobile Apps', 'AI & Machine Learning', 'Cybersecurity', 'Cloud Computing', 'DevOps', 'Programming Languages', 'Tech News']
    },
    'Lifestyle': {
        subcategories: ['Fashion', 'Home Decor', 'Personal Development', 'Relationships', 'Minimalism', 'Work-Life Balance', 'Hobbies', 'Sustainability']
    },
    'Health': {
        subcategories: ['Fitness', 'Nutrition', 'Mental Health', 'Medical News', 'Wellness', 'Yoga & Meditation', 'Weight Loss', 'Alternative Medicine']
    },
    'Education': {
        subcategories: ['Online Learning', 'Study Tips', 'Career Development', 'Language Learning', 'STEM', 'Arts & Humanities', 'Test Prep', 'Educational Technology']
    },
    'Travel': {
        subcategories: ['Destinations', 'Travel Tips', 'Budget Travel', 'Adventure Travel', 'Food & Culture', 'Travel Gear', 'Solo Travel', 'Family Travel']
    },
    'Food': {
        subcategories: ['Recipes', 'Restaurant Reviews', 'Cooking Tips', 'Baking', 'Healthy Eating', 'International Cuisine', 'Food Trends', 'Meal Planning']
    },
    'Finance': {
        subcategories: ['Personal Finance', 'Investing', 'Budgeting', 'Cryptocurrency', 'Real Estate', 'Retirement Planning', 'Tax Tips', 'Side Hustles']
    },
    'Entertainment': {
        subcategories: ['Movies', 'TV Shows', 'Music', 'Books', 'Gaming', 'Celebrity News', 'Theater', 'Streaming Services']
    },
    'Business': {
        subcategories: ['Entrepreneurship', 'Marketing', 'Management', 'Startups', 'E-commerce', 'Productivity', 'Leadership', 'Business Strategy']
    },
    'Sports': {
        subcategories: ['Football', 'Basketball', 'Baseball', 'Soccer', 'Tennis', 'Golf', 'Fitness Sports', 'Extreme Sports']
    }
};

const initialBlogData: BlogFormData = {
    title: 'My Awesome Blog Post',
    summary: 'A brief description of what this blog post is about...',
    category: 'Technology/Web Development',
    tags: 'react, typescript, quill',
    content: [
        {
            insert: 'Welcome to my blog post! This is where you can write your amazing content.\n'
        },
        {
            insert: 'Key Features:',
            attributes: { header: 2 }
        },
        {
            insert: '\n'
        },
        {
            insert: 'Rich text editing with Quill\n'
        },
        {
            insert: 'Easy to use interface\n'
        },
        {
            insert: 'Modern React implementation\n'
        }
    ],
};

function RouteComponent() {
    const [formData, setFormData] = useState<BlogFormData>(initialBlogData);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isPreviewOpen, setIsPreviewOpen] = useState(false);
    const quillRef = useRef<Quill | null>(null);

    const handleInputChange = (field: keyof BlogFormData, value: string) => {
        setFormData(prev => ({
            ...prev,
            [field]: value
        }));
    };

    const handleContentChange = () => {
        if (quillRef.current) {
            const content = quillRef.current.getContents();
            setFormData(prev => ({
                ...prev,
                content: content.ops
            }));
        }
    };

    const resetForm = () => {
        setFormData(initialBlogData);
        if (quillRef.current) {
            quillRef.current.setContents(new Delta(initialBlogData.content));
        }
    };

    const handlePreview = () => {
        // Update content from Quill before showing preview
        if (quillRef.current) {
            const content = quillRef.current.getContents();
            setFormData(prev => ({
                ...prev,
                content: content.ops
            }));
        }
        setIsPreviewOpen(true);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);

        try {
            // Get the latest content from Quill
            if (quillRef.current) {
                const content = quillRef.current.getContents();
                const finalFormData = {
                    ...formData,
                    content: content.ops
                };

                // Here you would typically send the data to your API
                console.log('Submitting blog post:', finalFormData);

                // Simulate API call
                await new Promise(resolve => setTimeout(resolve, 1000));

                alert('Blog post submitted successfully!');

                // Optionally reset form after successful submission
                // resetForm();
            }
        } catch (error) {
            console.error('Error submitting blog post:', error);
            alert('Error submitting blog post. Please try again.');
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="flex-1 p-6 max-w-4xl mx-auto">
            <Card>
                <CardHeader>
                    <CardTitle className="text-2xl font-bold">Create New Blog Post</CardTitle>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleSubmit} className="space-y-6">
                        {/* Title Field */}
                        <div className="space-y-2">
                            <Label htmlFor="title">Blog Title</Label>
                            <Input
                                id="title"
                                name="title"
                                type="text"
                                value={formData.title}
                                onChange={(e) => handleInputChange('title', e.target.value)}
                                placeholder="Enter your blog title"
                                required
                            />
                        </div>

                        {/* Summary Field */}
                        <div className="space-y-2">
                            <Label htmlFor="summary">Summary</Label>
                            <Textarea
                                id="summary"
                                name="summary"
                                value={formData.summary}
                                onChange={(e) => handleInputChange('summary', e.target.value)}
                                placeholder="Brief description of your blog post"
                                rows={3}
                                required
                            />
                        </div>

                        {/* Category and Tags Row */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <Label htmlFor="category">Category</Label>
                                <Select
                                    value={formData.category}
                                    onValueChange={(value) => handleInputChange('category', value)}
                                >
                                    <SelectTrigger className="w-full">
                                        <SelectValue placeholder="Select a category" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {Object.entries(BlogCategories).map(([category, data]) => (
                                            <SelectGroup key={category}>
                                                <SelectLabel>{category}</SelectLabel>
                                                {data.subcategories.map((subcategory) => (
                                                    <SelectItem
                                                        key={`${category}-${subcategory}`}
                                                        value={`${category}/${subcategory}`}
                                                    >
                                                        {subcategory}
                                                    </SelectItem>
                                                ))}
                                            </SelectGroup>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="tags">Tags</Label>
                                <Input
                                    id="tags"
                                    name="tags"
                                    type="text"
                                    value={formData.tags}
                                    onChange={(e) => handleInputChange('tags', e.target.value)}
                                    placeholder="comma, separated, tags"
                                />
                            </div>
                        </div>

                        {/* Content Editor */}
                        <div className="space-y-2">
                            <Label>Content</Label>
                            <div className="border rounded-md overflow-hidden">
                                <Editor
                                    ref={quillRef}
                                    defaultValue={new Delta(initialBlogData.content)}
                                    onTextChange={handleContentChange}
                                />
                            </div>
                        </div>

                        {/* Action Buttons */}
                        <div className="flex gap-4 pt-4">
                            <Button
                                type="submit"
                                disabled={isSubmitting}
                                className="bg-blue-600 hover:bg-blue-700"
                            >
                                {isSubmitting ? 'Publishing...' : 'Publish Blog Post'}
                            </Button>
                            <Button type="button" variant="outline" onClick={resetForm} disabled={isSubmitting}>
                                Reset to Initial Data
                            </Button>
                            <Button type="button" variant="secondary" disabled={isSubmitting}>
                                Save as Draft
                            </Button>

                            <Button
                                type="button"
                                variant="destructive"
                                disabled={isSubmitting}
                                onClick={handlePreview}
                            >
                                Preview Draft
                            </Button>

                            <Dialog open={isPreviewOpen} onOpenChange={setIsPreviewOpen}>
                                <DialogContent className="max-w-5xl max-h-[90vh] overflow-y-auto">
                                    <DialogHeader>
                                        <DialogTitle>Blog Post Preview</DialogTitle>
                                        <DialogDescription>
                                            This is how your blog post will look when published.
                                        </DialogDescription>
                                    </DialogHeader>
                                    <div className="mt-4">
                                        <BlogPreview
                                            title={formData.title}
                                            summary={formData.summary}
                                            category={formData.category}
                                            tags={formData.tags}
                                            content={formData.content}
                                        />
                                    </div>
                                    <DialogFooter>
                                        <DialogClose asChild>
                                            <Button type="button" variant="outline">
                                                Close Preview
                                            </Button>
                                        </DialogClose>
                                    </DialogFooter>
                                </DialogContent>
                            </Dialog>
                        </div>
                    </form>

                    {/* Debug Info (remove in production) */}
                    <div className="mt-8 p-4 bg-gray-50 rounded-lg">
                        <h3 className="font-semibold mb-2">Form Data Preview:</h3>
                        <pre className="text-sm bg-gray-100 p-2 rounded overflow-auto max-h-40">
                            {JSON.stringify({
                                ...formData,
                                content: formData.content?.slice(0, 2) // Show only first 2 content operations
                            }, null, 2)}
                        </pre>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}
