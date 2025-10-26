import React from 'react';

interface ToggleSwitchProps {
    isOn: boolean;
    onToggle: () => void;
}

const ToggleSwitch: React.FC<ToggleSwitchProps> = ({ isOn, onToggle }) => {
    return (
        <button
            onClick={onToggle}
            className={`relative inline-flex items-center h-6 rounded-full w-11 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-cyan-500 ${isOn ? 'bg-cyan-600' : 'bg-gray-600'}`}
            aria-checked={isOn}
            role="switch"
        >
            <span className="sr-only">Toggle Bell</span>
            <span
                className={`inline-block w-4 h-4 transform bg-white rounded-full transition-transform ${isOn ? 'translate-x-6' : 'translate-x-1'}`}
            />
        </button>
    );
};

export default ToggleSwitch;
