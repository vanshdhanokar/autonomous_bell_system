import React from 'react';
import { BellScheduleEntry } from '../types';
import ToggleSwitch from './ToggleSwitch';

interface DataTableProps {
    data: BellScheduleEntry[];
    title: string;
    onToggle?: (id: number) => void;
}

const statusColorMap: Record<BellScheduleEntry['current_status'], string> = {
    'Rung': 'bg-green-500/20 text-green-400',
    'Pending': 'bg-yellow-500/20 text-yellow-400',
    'Skipped': 'bg-red-500/20 text-red-400',
};

const DataTable: React.FC<DataTableProps> = ({ data, title, onToggle }) => {
    return (
        <div className="bg-gray-800/50 backdrop-blur-sm p-4 sm:p-6 rounded-2xl shadow-lg w-full">
            <h2 className="text-2xl font-bold mb-6 text-cyan-400">{title}</h2>
            <div className="overflow-x-auto">
                <table className="w-full text-left min-w-[600px]">
                    <thead className="border-b border-gray-600">
                        <tr>
                            <th className="p-4">ID</th>
                            <th className="p-4">Time</th>
                            <th className="p-4">Date</th>
                            <th className="p-4">Day</th>
                            <th className="p-4">Status</th>
                            {onToggle && <th className="p-4 text-center">ON/OFF</th>}
                        </tr>
                    </thead>
                    <tbody>
                        {data.map((entry) => (
                            <tr key={entry.id} className="border-b border-gray-700 hover:bg-gray-700/50 transition-colors">
                                <td className="p-4">{entry.id}</td>
                                <td className="p-4 font-mono">{entry.time}</td>
                                <td className="p-4">{entry.date}</td>
                                <td className="p-4">{entry.day}</td>
                                <td className="p-4">
                                    <span className={`px-3 py-1 rounded-full text-sm font-semibold ${statusColorMap[entry.current_status]}`}>
                                        {entry.current_status}
                                    </span>
                                </td>
                                {onToggle && (
                                    <td className="p-4 text-center">
                                        <ToggleSwitch 
                                            isOn={entry.isOn ?? true} 
                                            onToggle={() => onToggle(entry.id)} 
                                        />
                                    </td>
                                )}
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default DataTable;