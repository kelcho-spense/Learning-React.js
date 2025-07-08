import {
    Sidebar,
    SidebarContent,
    SidebarGroup,
    SidebarGroupContent,
    SidebarGroupLabel,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
} from "@/components/ui/sidebar"
import { Link } from "@tanstack/react-router"
import { Home, CircleUserRound, Users, ChevronDown, LayoutDashboard, ShieldUser, Gauge, Hash, NotepadTextDashed, ChartColumnStacked, NotebookPen } from "lucide-react"
import { Collapsible, CollapsibleTrigger, CollapsibleContent } from "../ui/collapsible"

// Menu items.
const items = [
    {
        title: "Dashboard",
        url: "/dashboard",
        icon: Home,
    },
    {
        title: "Write Blog",
        url: "/dashboard/new-blog",
        icon: NotebookPen,
    },
    {
        title: "Drafts",
        url: "/dashboard/drafts",
        icon: NotepadTextDashed,
    },
    {
        title: "Categories",
        url: "/dashboard/categories",
        icon: ChartColumnStacked,
    },
    {
        title: "Users",
        url: "/dashboard/users",
        icon: Users,
    },
    {
        title: "My Account",
        url: "/dashboard/me",
        icon: CircleUserRound,
    },
]
export function AppSidebar() {
    return (
        
        <Sidebar className="mt-17">
            <SidebarContent>
                <SidebarGroup>
                    <SidebarGroupLabel className="flex items-center gap-1"><Hash /> Menu</SidebarGroupLabel>
                    <SidebarGroupContent>
                        <SidebarMenu>
                            {items.map((item) => (
                                <SidebarMenuItem key={item.title}>
                                    <SidebarMenuButton asChild>
                                        <Link to={item.url} replace>
                                            <item.icon color="#2dc870" />
                                            <span>{item.title}</span>
                                        </Link>
                                    </SidebarMenuButton>
                                </SidebarMenuItem>
                            ))}
                        </SidebarMenu>
                    </SidebarGroupContent>
                
                    <Collapsible defaultOpen className="group/collapsible">
                        <SidebarGroup>
                            <SidebarGroupLabel asChild>
                                <CollapsibleTrigger>
                                    <LayoutDashboard />
                                    <SidebarGroupLabel>Admin</SidebarGroupLabel>
                                    <ChevronDown className="ml-auto transition-transform group-data-[state=open]/collapsible:rotate-180" />
                                </CollapsibleTrigger>
                            </SidebarGroupLabel>
                            <CollapsibleContent>
                                <SidebarGroupContent />
                                <SidebarMenu>
                                    <SidebarMenuItem>
                                        <SidebarMenuButton asChild>
                                            <Link to="/dashboard/admin-dashboard">
                                                <Gauge color="#c82d2d" /> <span>Dashboard</span>
                                            </Link>
                                        </SidebarMenuButton>
                                    </SidebarMenuItem>
                                    <SidebarMenuItem>
                                        <SidebarMenuButton asChild>
                                            <Link to="/dashboard/admin-accounts">
                                                <ShieldUser color="#c82d2d" /> <span>Accounts</span>
                                            </Link>
                                        </SidebarMenuButton>
                                    </SidebarMenuItem>
                                </SidebarMenu>
                            </CollapsibleContent>
                        </SidebarGroup>
                    </Collapsible>
                </SidebarGroup>
            </SidebarContent>
        </Sidebar>
    )
}