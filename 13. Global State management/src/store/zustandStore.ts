import { create } from "zustand"

interface User {
    id: number
    name: string
    username: string
    email: string
    phone: string
    website: string
    company: {
        name: string
    }
    address: {
        city: string
        street: string
    }
}

interface CounterState {
    count: number
    increment: () => void
    decrement: () => void
    reset: () => void
    incrementAsync: () => Promise<void>
}

interface UserState {
    user: User | null
    loading: boolean
    error: string | null
    currentUserId: number
    fetchUser: (id: number) => Promise<void>
    fetchNextUser: () => Promise<void>
}

export const useZustandStore = create<CounterState>((set) => ({
    count: 0,
    increment: () => set((state) => ({ count: state.count + 1 })),
    decrement: () => set((state) => ({ count: state.count - 1 })),
    reset: () => set({ count: 0 }),
    incrementAsync: async () => {
        await new Promise((resolve) => setTimeout(resolve, 5000))
        set((state) => ({ count: state.count + 1 }))
    }
}))

export const useZustandUserStore = create<UserState>((set, get) => ({
    user: null,
    loading: false,
    error: null,
    currentUserId: 1,
    fetchUser: async (id: number) => {
        set({ loading: true, error: null })
        try {
            const response = await fetch(`https://jsonplaceholder.typicode.com/users/${id}`)
            if (!response.ok) {
                throw new Error('Failed to fetch user')
            }
            const userData = await response.json()
            set({ user: userData, loading: false, currentUserId: id })
        } catch (error) {
            set({ error: error instanceof Error ? error.message : 'Unknown error', loading: false })
        }
    },
    fetchNextUser: async () => {
        const { currentUserId, fetchUser } = get()
        const nextId = currentUserId >= 10 ? 1 : currentUserId + 1
        await fetchUser(nextId)
    }
}))