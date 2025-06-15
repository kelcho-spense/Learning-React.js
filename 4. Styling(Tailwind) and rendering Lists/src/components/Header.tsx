import ThemeToggle from './ThemeToggle';
import type { ThemeType } from '../types';

interface HeaderProps {
    theme: ThemeType;
    onThemeChange: (theme: ThemeType) => void;
}

export default function Header({ theme, onThemeChange }: HeaderProps) {
    return (
        <header className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-red-500 rounded-lg flex items-center justify-center">
                    <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
                    </svg>
                </div>
                <h1 className="text-xl font-bold text-gray-900 dark:text-white">
                    Extensions
                </h1>
            </div>

            <ThemeToggle theme={theme} onThemeChange={onThemeChange} />
        </header>
    );
}
