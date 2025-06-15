import type { Extension } from '../types';

interface ExtensionCardProps {
    extension: Extension;
    onToggle: (id: string) => void;
}

export default function ExtensionCard({ extension, onToggle }: ExtensionCardProps) {
    return (
        <div className="bg-white dark:bg-gray-800 rounded-xl p-5 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-200 dark:border-gray-700">
            {/* Header with icon and title */}
            <div className="flex items-start justify-between mb-3">
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-700 dark:to-gray-600 rounded-lg flex items-center justify-center text-lg">
                        {extension.icon}
                    </div>
                    <div>
                        <h3 className="font-semibold text-gray-900 dark:text-white text-base">
                            {extension.name}
                        </h3>
                        <div className="flex items-center gap-2 mt-1">
                            <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${extension.category === 'development'
                                ? 'bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300'
                                : extension.category === 'design'
                                    ? 'bg-purple-100 text-purple-700 dark:bg-purple-900 dark:text-purple-300'
                                    : extension.category === 'productivity'
                                        ? 'bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300'
                                        : 'bg-orange-100 text-orange-700 dark:bg-orange-900 dark:text-orange-300'
                                }`}>
                                {extension.category}
                            </span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Description */}
            <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed mb-4">
                {extension.description}
            </p>

            {/* Footer with Remove button and Toggle */}
            <div className="flex items-center justify-between">
                <button className="px-3 py-1.5 text-sm font-medium text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200 transition-colors">
                    Remove
                </button>

                <button
                    onClick={() => onToggle(extension.id)}
                    className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 dark:focus:ring-offset-gray-800 ${extension.isActive
                        ? 'bg-red-500'
                        : 'bg-gray-300 dark:bg-gray-600'
                        }`}
                    role="switch"
                    aria-checked={extension.isActive}
                    aria-label={`Toggle ${extension.name}`}
                >
                    <span
                        className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${extension.isActive ? 'translate-x-6' : 'translate-x-1'
                            }`}
                    />
                </button>
            </div>
        </div>
    );
}
