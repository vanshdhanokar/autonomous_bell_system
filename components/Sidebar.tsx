import React from 'react';
import { CloseIcon } from '../constants';

interface SidebarProps {
    isOpen: boolean;
    onClose: () => void;
    onLogout: () => void;
    onEventsClick: () => void;
    onHolidaysClick: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen, onClose, onLogout, onEventsClick, onHolidaysClick }) => {
    return (
        <>
            <div
                className={`fixed inset-0 bg-black/60 z-30 transition-opacity ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
                onClick={onClose}
            ></div>
            <div className={`fixed top-0 right-0 h-full w-72 bg-gray-800 shadow-2xl z-40 transform transition-transform ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}>
                <div className="flex justify-between items-center p-6 border-b border-gray-700">
                    <h2 className="text-xl font-bold">Menu</h2>
                    <button onClick={onClose} className="p-1 rounded-full hover:bg-gray-700 transition-colors">
                        <CloseIcon className="w-6 h-6" />
                    </button>
                </div>
                <nav className="p-4">
                    <ul>
                        <li className="mb-2">
                            <button onClick={onEventsClick} className="w-full text-left block px-4 py-3 rounded-lg hover:bg-cyan-500/20 text-gray-200 hover:text-cyan-300 transition-colors">Events</button>
                        </li>
                        <li className="mb-2">
                            <button onClick={onHolidaysClick} className="w-full text-left block px-4 py-3 rounded-lg hover:bg-cyan-500/20 text-gray-200 hover:text-cyan-300 transition-colors">Holidays</button>
                        </li>
                        <li>
                            <button
                                onClick={onLogout}
                                className="w-full text-left block px-4 py-3 rounded-lg hover:bg-red-500/20 text-gray-200 hover:text-red-400 transition-colors"
                            >
                                Logout
                            </button>
                        </li>
                    </ul>
                </nav>
            </div>
        </>
    );
};

export default Sidebar;