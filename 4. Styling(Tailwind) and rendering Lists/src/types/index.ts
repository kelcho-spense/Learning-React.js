// Types for the extensions manager
export interface Extension {
    id: string;
    name: string;
    description: string;
    icon: string;
    isActive: boolean;
    category: 'development' | 'productivity' | 'design' | 'utility' | 'social';
}

export type FilterType = 'all' | 'active' | 'inactive';

export type ThemeType = 'dark' | 'light';
