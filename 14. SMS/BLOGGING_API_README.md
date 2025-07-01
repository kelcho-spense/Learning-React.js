# Blogging API

This is a NestJS-based blogging platform API with user role-based access control.

## Features

### User Roles

- **USER**: Regular users who can write and manage their own blogs
- **ADMIN**: Administrators who can manage all blogs, edit, review, and manage users
- **SUPER-ADMIN**: Super administrator who can manage admins (activate and deactivate their accounts) and perform all admin functions

### User Capabilities

#### Regular Users (USER)

- Create, update, delete their own blogs
- View their own blogs and drafts
- Submit blogs for admin approval
- View approved public blogs
- Comment on approved blogs
- Update/delete their own comments

#### Administrators (ADMIN)

- All user capabilities plus:
- View all blogs (drafts, pending, approved, rejected)
- Approve/reject blog submissions with review messages
- Activate/deactivate user accounts
- Reset user passwords
- View user statistics
- Manage all comments

#### Super Administrators (SUPER-ADMIN)

- All admin capabilities plus:
- Activate/deactivate admin accounts
- Manage admin roles and permissions

### API Endpoints

#### Authentication

- `POST /auth/login` - User login
- `POST /auth/register` - User registration
- `POST /auth/refresh` - Refresh access token

#### Blogs

- `GET /blogs` - Get all approved blogs (users) or all blogs (admins)
- `GET /blogs/my-blogs` - Get current user's blogs
- `GET /blogs/my-drafts` - Get current user's draft blogs
- `GET /blogs/pending` - Get pending blogs (admin only)
- `GET /blogs/:id` - Get specific blog
- `POST /blogs` - Create new blog
- `PATCH /blogs/:id` - Update blog
- `PATCH /blogs/:id/submit-for-review` - Submit blog for admin review
- `PATCH /blogs/:id/admin-review` - Admin review blog (admin only)
- `DELETE /blogs/:id` - Delete blog

#### Comments

- `GET /comments/blog/:blogId` - Get comments for a blog
- `GET /comments/:id` - Get specific comment
- `POST /comments` - Create comment on approved blog
- `PATCH /comments/:id` - Update comment
- `DELETE /comments/:id` - Delete comment

#### Admin Panel

- `GET /admin/users` - Get all users (admin only)
- `GET /admin/admins` - Get all admins (super-admin only)
- `GET /admin/users/:id` - Get specific user (admin only)
- `PATCH /admin/users/:id/activate` - Activate user (admin only)
- `PATCH /admin/users/:id/deactivate` - Deactivate user (admin only)
- `PATCH /admin/admins/:id/activate` - Activate admin (super-admin only)
- `PATCH /admin/admins/:id/deactivate` - Deactivate admin (super-admin only)
- `PATCH /admin/users/:id/reset-password` - Reset user password (admin only)
- `GET /admin/stats` - Get user statistics (admin only)

### Database Entities

#### Profile

- id, firstName, lastName, email, password
- role (USER/ADMIN/SUPER-ADMIN)
- isActive (boolean)
- createdAt, updatedAt
- hashedRefreshToken
- blogs (relationship)

#### Blog

- id, title, content, excerpt
- status (DRAFT/PENDING/APPROVED/REJECTED)
- adminReviewMessage
- createdAt, updatedAt, publishedAt
- tags, viewCount
- author (relationship to Profile)
- comments (relationship)

#### Comment

- id, content
- createdAt, updatedAt
- author (relationship to Profile)
- blog (relationship to Blog)

#### Admin/User

- Simple entities that reference Profile

### Blog Status Workflow

1. **DRAFT** - Initial state when user creates blog
2. **PENDING** - User submits blog for review
3. **APPROVED** - Admin approves blog (becomes public)
4. **REJECTED** - Admin rejects blog (user can edit and resubmit)

### Security Features

- JWT-based authentication
- Role-based access control
- Password hashing with bcrypt
- Request throttling
- User account activation/deactivation

### Environment Setup

Required environment variables:

- Database connection settings
- JWT secrets
- Redis URL for caching
- Throttling settings

### Getting Started

1. Install dependencies: `npm install`
2. Set up environment variables
3. Run database migrations
4. Start the application: `npm run start:dev`

The API will be available at `http://localhost:3000` with automatic API documentation at `/api` (if Swagger is enabled).
