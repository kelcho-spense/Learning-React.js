import Layout from '@/components/sidebar/layout'
import { createFileRoute, Outlet } from '@tanstack/react-router'

export const Route = createFileRoute('/dashboard')({
    component: DashboardLayoutComponent,
})

function DashboardLayoutComponent() {
    return (
        <Layout>
            <Outlet />
        </Layout>
    )
}
