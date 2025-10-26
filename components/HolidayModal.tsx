import React, { useState } from 'react';
import { CalendarDaysIcon, CloseIcon } from '../constants';

interface HolidayModalProps {
    onClose: () => void;
    onDeclare: (date: string) => void;
}

const HolidayModal: React.FC<HolidayModalProps> = ({ onClose, onDeclare }) => {
    const [date, setDate] = useState('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (date) {
            onDeclare(date);
        }
    };

    return (
        <div className="fixed inset-0 bg-black/60 z-40 flex items-center justify-center p-4">
            <div className="bg-gray-800 rounded-2xl shadow-2xl p-6 w-full max-w-md animate-fade-in">
                <div className="flex justify-between items-center mb-6">
                    <div className="flex items-center gap-3">
                        <CalendarDaysIcon className="w-6 h-6 text-cyan-400" />
                        <h2 className="text-xl font-bold">Declare a Holiday</h2>
                    </div>
                    <button onClick={onClose} className="p-1 rounded-full hover:bg-gray-700 transition-colors">
                        <CloseIcon className="w-6 h-6" />
                    </button>
                </div>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label htmlFor="holiday-date" className="block text-sm font-medium text-gray-300 mb-1">Select Date</label>
                        <input
                            type="date"
                            id="holiday-date"
                            value={date}
                            onChange={(e) => setDate(e.target.value)}
                            className="w-full bg-gray-700 border border-gray-600 rounded-md shadow-sm py-2 px-3 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-cyan-500"
                            required
                        />
                    </div>
                    <div className="flex justify-end gap-4 pt-4">
                        <button type="button" onClick={onClose} className="px-4 py-2 rounded-md bg-gray-600 hover:bg-gray-500 font-semibold transition-colors">Cancel</button>
                        <button type="submit" className="px-4 py-2 rounded-md bg-cyan-600 hover:bg-cyan-700 font-semibold transition-colors">Declare Holiday</button>
                    </div>
                </form>
            </div>
             <style>{`
                @keyframes fade-in {
                    from { opacity: 0; transform: scale(0.95); }
                    to { opacity: 1; transform: scale(1); }
                }
                .animate-fade-in {
                    animation: fade-in 0.2s ease-out forwards;
                }
                 input[type="date"]::-webkit-calendar-picker-indicator {
                    filter: invert(1);
                }
            `}</style>
        </div>
    );
};

export default HolidayModal;
