import type { Extension } from '../types';

export const extensionsData: Extension[] = [
    {
        id: '1',
        name: 'DevLens',
        description: 'Quickly inspect page layouts and visualize element boundaries.',
        icon: '📱',
        isActive: true,
        category: 'development'
    },
    {
        id: '2',
        name: 'StyleSpy',
        description: 'Instantly analyze and copy CSS from any webpage element.',
        icon: '🔍',
        isActive: true,
        category: 'development'
    },
    {
        id: '3',
        name: 'JSONWizard',
        description: 'Formats, validates, and prettifies JSON responses in-browser.',
        icon: '🧙‍♂️',
        isActive: true,
        category: 'development'
    },
    {
        id: '4',
        name: 'TabMaster Pro',
        description: 'Organizes browser tabs into groups and sessions.',
        icon: '📂',
        isActive: true,
        category: 'productivity'
    },
    {
        id: '5',
        name: 'Markup Notes',
        description: 'Enables annotation and notes directly onto webpages for collaborative debugging.',
        icon: '📝',
        isActive: true,
        category: 'productivity'
    },
    {
        id: '6',
        name: 'Palette Picker',
        description: 'Instantly extracts color palettes from any webpage.',
        icon: '🎨',
        isActive: true,
        category: 'design'
    },
    {
        id: '7',
        name: 'LinkChecker',
        description: 'Scans and highlights broken links on any page.',
        icon: '🔗',
        isActive: true,
        category: 'utility'
    },
    {
        id: '8',
        name: 'ConsolePlus',
        description: 'Enhanced developer console with advanced filtering and logging.',
        icon: '⚡',
        isActive: true,
        category: 'development'
    },
    {
        id: '9',
        name: 'SpeedBoost',
        description: 'Optimizes browser resource usage to accelerate page loading.',
        icon: '🚀',
        isActive: false,
        category: 'utility'
    },
    {
        id: '10',
        name: 'ViewportBuddy',
        description: 'Simulates various screen resolutions directly within the browser.',
        icon: '📺',
        isActive: false,
        category: 'development'
    },
    {
        id: '11',
        name: 'GridGuides',
        description: 'Overlay customizable grids and alignment guides on any webpage.',
        icon: '⚏',
        isActive: false,
        category: 'design'
    },
    {
        id: '12',
        name: 'DOM Snapshot',
        description: 'Capture and export DOM structures quickly.',
        icon: '📸',
        isActive: false,
        category: 'development'
    }
];
