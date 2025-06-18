import { useState } from 'react';

// User type
interface User {
    id: number;
    name: string;
    email: string;
    role: 'admin' | 'user';
}

// Deeply nested component that needs user data
function UserProfile({ user, onLogout, onUpdate }: { user: User; onLogout: () => void; onUpdate: (user: User) => void }) {
    const [edit, setEdit] = useState(false);
    const [form, setForm] = useState(user);
    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onUpdate({ ...form, id: user.id });
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
                <button onClick={onLogout} className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600">Logout</button>
            </div>
        </div>
    );
}

// Level 2 (Intermediate)
function Layout({ user, onLogout, onUpdate }: { user: User; onLogout: () => void; onUpdate: (user: User) => void }) {
    return (
        <div className="max-w-xl mx-auto">
            <h3 className="font-bold mb-2">Layout (Intermediate)</h3>
            <UserProfile user={user} onLogout={onLogout} onUpdate={onUpdate} />
        </div>
    );
}

// App-level (root)
export default function PropDrillingExample() {
    const [user, setUser] = useState<User | null>({
        id: 1,
        name: 'Jane Doe',
        email: 'jane@example.com',
        role: 'admin',
    });

    const handleLogout = () => setUser(null);
    const handleUpdate = (updated: User) => setUser(updated);

    if (!user) {
        return (
            <div className="max-w-xl mx-auto bg-white p-8 rounded shadow text-center">
                <h2 className="text-2xl font-bold mb-4">You are logged out.</h2>
            </div>
        );
    }

    return <Layout user={user} onLogout={handleLogout} onUpdate={handleUpdate} />;
}
