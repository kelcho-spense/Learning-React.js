import { Store } from "@tanstack/store";

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

interface UserState {
  user: User | null
  loading: boolean
  error: string | null
  currentUserId: number
}

export const counterStore = new Store(0)

export const userStore = new Store<UserState>({
  user: null,
  loading: false,
  error: null,
  currentUserId: 1
})

export const handleIncrement = () => {
  counterStore.setState(prev => prev + 1)
}

export const handleDecrement = () => {
  counterStore.setState(prev => prev - 1)
}

export const handleReset = () => {
  counterStore.setState(0)
}

export const handleIncrementAsync = async () => {
  await new Promise(resolve => setTimeout(resolve, 5000))
  counterStore.setState(prev => prev + 1)
}

export const fetchUser = async (id: number) => {
  userStore.setState(prev => ({ ...prev, loading: true, error: null }))
  try {
    const response = await fetch(`https://jsonplaceholder.typicode.com/users/${id}`)
    if (!response.ok) {
      throw new Error('Failed to fetch user')
    }
    const userData = await response.json()
    userStore.setState(prev => ({
      ...prev,
      user: userData,
      loading: false,
      currentUserId: id
    }))
  } catch (error) {
    userStore.setState(prev => ({
      ...prev,
      error: error instanceof Error ? error.message : 'Unknown error',
      loading: false
    }))
  }
}

export const fetchNextUser = async () => {
  const currentState = userStore.state
  const nextId = currentState.currentUserId >= 10 ? 1 : currentState.currentUserId + 1
  await fetchUser(nextId)
}