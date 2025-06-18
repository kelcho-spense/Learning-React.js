import { createContext, useContext, useState } from 'react';
import type { ReactNode } from 'react';

// User type
interface User {
    id: number;
    name: string;
    email: string;
    role: 'admin' | 'user';
}

// 1. Create the context
const UserContext = createContext<{
    user: User | null;
    logout: () => void;
    update: (user: User) => void;
} | undefined>(undefined);

// 2. Provider component
function UserProvider({ children }: { children: ReactNode }) {
    const [user, setUser] = useState<User | null>({
        id: 1,
        name: 'Jane Doe',
        email: 'jane@example.com',
        role: 'admin',
    });
    const logout = () => setUser(null);
    const update = (u: User) => setUser(u);
    return (
        <UserContext.Provider value={{ user, logout, update }}>
            {children}
        </UserContext.Provider>
    );
}

// 3. Deeply nested component can access user directly
function UserProfile() {
    const ctx = useContext(UserContext);
    const [edit, setEdit] = useState(false);
    const [form, setForm] = useState<User | null>(ctx?.user ?? null);
    if (!ctx || !ctx.user || !form) return <div className="bg-white p-8 rounded shadow text-center">You are logged out.</div>;
    const { user, logout, update } = ctx;
    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        update({ ...form, id: user.id });
        setEdit(false);
    };
    return (
        <div className="bg-white p-6 rounded-lg shadow-md">
            <h4 className="text-lg font-semibold mb-4">User Profile</h4>
            {edit ? (
                <form onSubmit={handleSubmit} className="space-y-2 mb-4">
                    <div>
                        <label className="block text-sm font-medium">Name</label>
                        <input name="name" value={form.name} onChange={handleChange} className="border rounded p-1 w-full" />
                    </div>
                    <div>
                        <label className="block text-sm font-medium">Email</label>
                        <input name="email" value={form.email} onChange={handleChange} className="border rounded p-1 w-full" />
                    </div>
                    <div>
                        <label className="block text-sm font-medium">Role</label>
                        <select name="role" value={form.role} onChange={handleChange} className="border rounded p-1 w-full">
                            <option value="admin">admin</option>
                            <option value="user">user</option>
                        </select>
                    </div>
                    <div className="flex gap-2 mt-2">
                        <button type="submit" className="px-3 py-1 bg-blue-500 text-white rounded">Save</button>
                        <button type="button" onClick={() => setEdit(false)} className="px-3 py-1 bg-gray-300 rounded">Cancel</button>
                    </div>
                </form>
            ) : (
                <div className="space-y-2 mb-4">
                    <p><span className="font-medium">Name:</span> {user.name}</p>
                    <p><span className="font-medium">Email:</span> {user.email}</p>
                    <p><span className="font-medium">Role:</span> {user.role}</p>
                </div>
            )}
            <div className="flex gap-2">
                <button onClick={() => setEdit((v) => !v)} className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600">
                    {edit ? 'Editing...' : 'Edit'}
                </button>
                <button onClick={logout} className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600">Logout</button>
            </div>
        </div>
    );
}

// 4. Intermediate component
function Layout() {
    return (
        <div className="max-w-xl mx-auto">
            <h3 className="font-bold mb-2">Layout (Intermediate)</h3>
            <UserProfile />
        </div>
    );
}

// 5. App-level (root)
export default function UseContextExample() {
    return (
        <UserProvider>
            <Layout />
        </UserProvider>
    );
}
