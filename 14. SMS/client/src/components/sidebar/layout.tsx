import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { AppSidebar } from "./AppSidebar"
import { useLocation } from "@tanstack/react-router"
import { useMemo } from "react"

export default function Layout({ children }: { children: React.ReactNode }) {
    const location = useLocation()

    const pageTitle = useMemo(() => {
        const pathSegments = location.pathname.split('/').filter(Boolean)
        const lastSegment = pathSegments[pathSegments.length - 1]

        // Map route segments to user-friendly titles
        const titleMap: Record<string, string> = {
            'dashboard': 'Dashboard',
            'new-blog': 'Write Blog',
            'drafts': 'Drafts',
            'categories': 'Categories',
            'users': 'Users',
            'me': 'My Account',
            'blogs': 'Blogs'
        }

        return titleMap[lastSegment] || 'Dashboard'
    }, [location.pathname])

    return (
        <SidebarProvider>
            <AppSidebar />
            <main className="flex-1 overflow-auto">
                <div className="flex items-center gap-2 p-2 border-b">
                    <SidebarTrigger />
                    <div className="h-4 w-px bg-border" />
                    <h2 className="md:text-sm lg:text-2xl font-medium">
                        {pageTitle}
                    </h2>
                </div>
                {children}
            </main>
        </SidebarProvider>
    )
}