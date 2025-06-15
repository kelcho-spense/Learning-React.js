import ExtensionCard from './ExtensionCard';
import type { Extension, FilterType } from '../types';

interface ExtensionListProps {
    extensions: Extension[];
    filter: FilterType;
    onToggleExtension: (id: string) => void;
}

export default function ExtensionList({ extensions, filter, onToggleExtension }: ExtensionListProps) {
    const filteredExtensions = extensions.filter(extension => {
        switch (filter) {
            case 'active':
                return extension.isActive;
            case 'inactive':
                return !extension.isActive;
            default:
                return true;
        }
    });

    if (filteredExtensions.length === 0) {
        return (
            <div className="text-center py-12">
                <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center">
                    <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                    </svg>
                </div>
                <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
                    No extensions found
                </h3>
                <p className="text-gray-500 dark:text-gray-400">
                    {filter === 'active' && 'No active extensions to display.'}
                    {filter === 'inactive' && 'No inactive extensions to display.'}
                    {filter === 'all' && 'No extensions available.'}
                </p>
            </div>
        );
    } return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredExtensions.map(extension => (
                <ExtensionCard
                    key={extension.id}
                    extension={extension}
                    onToggle={onToggleExtension}
                />
            ))}
        </div>
    );
}
