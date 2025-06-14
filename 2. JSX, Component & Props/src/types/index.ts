// Type definitions for our learning project

export interface User {
    id: number;
    name: string;
    email: string;
    age: number;
    isActive: boolean;
}

export interface Product {
    id: string;
    name: string;
    price: number;
    category: 'electronics' | 'clothing' | 'books' | 'home';
    inStock: boolean;
    tags: string[];
}

export interface Theme {
    primary: string;
    secondary: string;
    background: string;
    text: string;
}

export type ButtonVariant = 'primary' | 'secondary' | 'danger' | 'success';

export type Size = 'small' | 'medium' | 'large';
