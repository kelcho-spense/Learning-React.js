import { Link } from '@tanstack/react-router'
import { PenTool, Menu, X, FileText, Users, Tag, PenLine } from 'lucide-react'
import { useState } from 'react'
import { ModeToggle } from './mode-toggle'
import { Button } from './ui/button'
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from './ui/navigation-menu'
import { cn } from '@/lib/utils'

const blogFeatures = [
  {
    title: "Latest Posts",
    href: "/blogs",
    description: "Discover the newest articles and insights from our community of writers.",
    icon: <FileText className="h-4 w-4" />
  },
  {
    title: "Featured Authors",
    href: "/authors",
    description: "Meet our talented writers and explore their featured content.",
    icon: <Users className="h-4 w-4" />
  },
  {
    title: "Trending Topics",
    href: "/trending",
    description: "Stay updated with the most popular topics and discussions.",
    icon: <Tag className="h-4 w-4" />
  },
]

const resources = [
  {
    title: "Writing Guide",
    href: "/guide",
    description: "Learn how to write engaging blog posts that capture your audience.",
  },
  {
    title: "Style Guide",
    href: "/style",
    description: "Follow our style guidelines for consistent and professional content.",
  },
  {
    title: "Publishing Tips",
    href: "/tips",
    description: "Best practices for publishing and promoting your blog posts.",
  },
]

export default function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen)
  }

  return (
    <header className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50 ">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          {/* Logo/Brand */}
          <div className="flex items-center">
            <Link
              to="/"
              className="flex-shrink-0 flex items-center text-2xl font-bold text-foreground hover:text-foreground/80 transition-colors"
            >
              <PenTool className="h-8 w-8 text-primary mr-2" />
              BlogSpace
            </Link>
          </div>

          {/* Desktop Navigation */}
          <NavigationMenu className="hidden md:flex">
            <NavigationMenuList>
              <NavigationMenuItem>
                <NavigationMenuTrigger>Explore</NavigationMenuTrigger>
                <NavigationMenuContent>
                  <ul className="grid gap-3 p-6 md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr]">
                    <li className="row-span-3">
                      <NavigationMenuLink asChild>
                        <Link
                          className="flex h-full w-full select-none flex-col justify-end rounded-md bg-gradient-to-b from-muted/50 to-muted p-6 no-underline outline-none focus:shadow-md"
                          to="/features"
                        >
                          <div className="mb-2 mt-4 text-lg font-medium">
                            BlogSpace Features
                          </div>
                          <p className="text-sm leading-tight text-muted-foreground">
                            Discover powerful writing tools and community features designed for bloggers.
                          </p>
                        </Link>
                      </NavigationMenuLink>
                    </li>
                    {blogFeatures.map((feature) => (
                      <ListItem
                        key={feature.title}
                        title={feature.title}
                        href={feature.href}
                        icon={feature.icon}
                      >
                        {feature.description}
                      </ListItem>
                    ))}
                  </ul>
                </NavigationMenuContent>
              </NavigationMenuItem>

              <NavigationMenuItem>
                <NavigationMenuTrigger>Resources</NavigationMenuTrigger>
                <NavigationMenuContent>
                  <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px]">
                    {resources.map((resource) => (
                      <ListItem
                        key={resource.title}
                        title={resource.title}
                        href={resource.href}
                      >
                        {resource.description}
                      </ListItem>
                    ))}
                  </ul>
                </NavigationMenuContent>
              </NavigationMenuItem>

              <NavigationMenuItem>
                <NavigationMenuLink asChild className={navigationMenuTriggerStyle()}>
                  <Link to="/categories">Categories</Link>
                </NavigationMenuLink>
              </NavigationMenuItem>

              <NavigationMenuItem>
                <NavigationMenuLink asChild className={navigationMenuTriggerStyle()}>
                  <Link to="/about">About</Link>
                </NavigationMenuLink>
              </NavigationMenuItem>

              <NavigationMenuItem>
                <NavigationMenuLink asChild className={navigationMenuTriggerStyle()}>
                  <Link to="/contact">Contact</Link>
                </NavigationMenuLink>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>

          {/* Desktop CTA Buttons */}
          <div className="hidden md:flex items-center space-x-4">
            <Button asChild variant={'outline'}>
              <Link to="/write">
                <PenLine className="h-4 w-4 mr-2" />
                Write Post
              </Link>
            </Button>
            <Button variant="ghost" asChild>
              <Link to="/login">Sign In</Link>
            </Button>
            <ModeToggle />
          </div>

          {/* Mobile menu button */}
          <Button
            variant="ghost"
            size="sm"
            onClick={toggleMobileMenu}
            className="md:hidden"
          >
            {isMobileMenuOpen ? (
              <X className="h-5 w-5" />
            ) : (
              <Menu className="h-5 w-5" />
            )}
          </Button>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden border-t py-4">
            <nav className="flex flex-col space-y-3">
              <Link
                to="/"
                onClick={() => setIsMobileMenuOpen(false)}
                className="flex items-center px-2 py-2 text-sm font-medium text-foreground hover:text-foreground/80 transition-colors"
              >
                Home
              </Link>
              <Link
                to="/features"
                onClick={() => setIsMobileMenuOpen(false)}
                className="flex items-center px-2 py-2 text-sm font-medium text-foreground hover:text-foreground/80 transition-colors"
              >
                Features
              </Link>
              <Link
                to="/blogs"
                onClick={() => setIsMobileMenuOpen(false)}
                className="flex items-center px-2 py-2 text-sm font-medium text-foreground hover:text-foreground/80 transition-colors"
              >
                Blogs
              </Link>
              <Link
                to="/categories"
                onClick={() => setIsMobileMenuOpen(false)}
                className="flex items-center px-2 py-2 text-sm font-medium text-foreground hover:text-foreground/80 transition-colors"
              >
                Categories
              </Link>
              <Link
                to="/about"
                onClick={() => setIsMobileMenuOpen(false)}
                className="flex items-center px-2 py-2 text-sm font-medium text-foreground hover:text-foreground/80 transition-colors"
              >
                About
              </Link>
              <Link
                to="/contact"
                onClick={() => setIsMobileMenuOpen(false)}
                className="flex items-center px-2 py-2 text-sm font-medium text-foreground hover:text-foreground/80 transition-colors"
              >
                Contact
              </Link>

              {/* Mobile CTA Buttons */}
              <div className="border-t pt-3 mt-3 space-y-3">
                <Button asChild className="w-full">
                  <Link to="/write" onClick={() => setIsMobileMenuOpen(false)}>
                    <PenLine className="h-4 w-4 mr-2" />
                    Write Post
                  </Link>
                </Button>
                <Button variant="outline" asChild className="w-full">
                  <Link to="/login" onClick={() => setIsMobileMenuOpen(false)}>
                    Sign In
                  </Link>
                </Button>
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  )
}

function ListItem({
  title,
  children,
  href,
  icon,
  ...props
}: React.ComponentPropsWithoutRef<"li"> & {
  href: string
  icon?: React.ReactNode
}) {
  return (
    <li {...props}>
      <NavigationMenuLink asChild>
        <Link
          to={href}
          className={cn(
            "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
          )}
        >
          <div className="flex items-center gap-2 text-sm font-medium leading-none">
            {icon}
            {title}
          </div>
          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
            {children}
          </p>
        </Link>
      </NavigationMenuLink>
    </li>
  )
}
