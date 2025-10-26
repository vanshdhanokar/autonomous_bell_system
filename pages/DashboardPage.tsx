import React, { useState } from 'react';
import { BellScheduleEntry } from '../types';
import DataTable from '../components/DataTable';
import Sidebar from '../components/Sidebar';
import SOSButton from '../components/SOSButton';
import { MenuIcon } from '../constants';
import EventModal from '../components/EventModal';
import HolidayModal from '../components/HolidayModal';

// Mock Data - Converted to 24-hour format for easier comparison
const initialRegularScheduleData: BellScheduleEntry[] = [
    { id: 1, time: '08:00', date: '2024-07-29', day: 'Monday', current_status: 'Rung', isOn: true },
    { id: 2, time: '09:00', date: '2024-07-29', day: 'Monday', current_status: 'Rung', isOn: true },
    { id: 3, time: '10:00', date: '2024-07-29', day: 'Monday', current_status: 'Pending', isOn: true },
    { id: 4, time: '11:00', date: '2024-07-29', day: 'Monday', current_status: 'Pending', isOn: true },
    { id: 5, time: '12:00', date: '2024-07-29', day: 'Monday', current_status: 'Pending', isOn: true },
    { id: 6, time: '08:00', date: '2024-07-30', day: 'Tuesday', current_status: 'Pending', isOn: true },
];

const initialExamScheduleData: BellScheduleEntry[] = [
    { id: 1, time: '09:30', date: '2024-07-29', day: 'Monday', current_status: 'Rung', isOn: true },
    { id: 2, time: '12:30', date: '2024-07-29', day: 'Monday', current_status: 'Pending', isOn: true },
    { id: 3, time: '13:00', date: '2024-07-29', day: 'Monday', current_status: 'Skipped', isOn: true },
    { id: 4, time: '16:00', date: '2024-07-29', day: 'Monday', current_status: 'Pending', isOn: true },
];

type Mode = 'regular' | 'exam';

interface DashboardPageProps {
    onLogout: () => void;
}

const DashboardPage: React.FC<DashboardPageProps> = ({ onLogout }) => {
    const [mode, setMode] = useState<Mode>('regular');
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [isEventModalOpen, setIsEventModalOpen] = useState(false);
    const [isHolidayModalOpen, setIsHolidayModalOpen] = useState(false);
    const [holidays, setHolidays] = useState<string[]>([]);
    const [regularSchedule, setRegularSchedule] = useState<BellScheduleEntry[]>(initialRegularScheduleData);
    const [examSchedule, setExamSchedule] = useState<BellScheduleEntry[]>(initialExamScheduleData);

    const handleScheduleEvent = (startDate: string, startTime: string, endDate: string, endTime: string) => {
        const eventStart = new Date(`${startDate}T${startTime}`);
        const eventEnd = new Date(`${endDate}T${endTime}`);

        const turnOffOverlappingBells = (schedule: BellScheduleEntry[]) => {
            return schedule.map(entry => {
                const entryTime = new Date(`${entry.date}T${entry.time}`);
                if (entryTime >= eventStart && entryTime <= eventEnd) {
                    return { ...entry, isOn: false };
                }
                return entry;
            });
        };

        setRegularSchedule(turnOffOverlappingBells(regularSchedule));
        setExamSchedule(turnOffOverlappingBells(examSchedule));

        alert(`Event scheduled from ${startDate} ${startTime} to ${endDate} ${endTime}. Overlapping bells have been turned off.`);
        setIsEventModalOpen(false);
    };

    const handleDeclareHoliday = (date: string) => {
        // Turn off all bells on the declared holiday date
        const updatedRegularSchedule = regularSchedule.map(entry =>
            entry.date === date ? { ...entry, isOn: false } : entry
        );
        const updatedExamSchedule = examSchedule.map(entry =>
            entry.date === date ? { ...entry, isOn: false } : entry
        );

        setRegularSchedule(updatedRegularSchedule);
        setExamSchedule(updatedExamSchedule);

        // Add to holidays list to mark them as "Skipped"
        setHolidays(prev => [...prev, date]);
        
        alert(`Holiday declared for ${date}. All bells on this day have been turned off.`);
        setIsHolidayModalOpen(false);
    };
    
    const handleToggleRegularBell = (id: number) => {
        setRegularSchedule(prevSchedule =>
            prevSchedule.map(entry =>
                entry.id === id ? { ...entry, isOn: !entry.isOn } : entry
            )
        );
    };

    const handleToggleExamBell = (id: number) => {
        setExamSchedule(prevSchedule =>
            prevSchedule.map(entry =>
                entry.id === id ? { ...entry, isOn: !entry.isOn } : entry
            )
        );
    };

    const processDataWithHolidays = (data: BellScheduleEntry[]): BellScheduleEntry[] => {
        return data.map(entry => 
            holidays.includes(entry.date) 
            ? { ...entry, current_status: 'Skipped' }
            : entry
        );
    };

    const processedRegularSchedule = processDataWithHolidays(regularSchedule);
    const processedExamSchedule = processDataWithHolidays(examSchedule);

    const activeStyle = 'bg-cyan-600 text-white';
    const inactiveStyle = 'bg-gray-700 text-gray-300 hover:bg-gray-600';

    return (
        <div className="min-h-screen bg-gray-900 text-white p-4 sm:p-8 relative">
             <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_top_left,_rgba(21,128,150,0.2),_transparent_30%),_radial-gradient(circle_at_bottom_right,_rgba(21,128,150,0.2),_transparent_30%)] -z-10"></div>
            <header className="flex justify-between items-center mb-8">
                <h1 className="text-3xl font-bold">Bell Dashboard</h1>
                <button onClick={() => setIsSidebarOpen(true)} className="p-2 rounded-md hover:bg-gray-700 transition-colors">
                    <MenuIcon className="w-8 h-8"/>
                </button>
            </header>

            <main>
                <div className="flex space-x-4 mb-8">
                    <button
                        onClick={() => setMode('regular')}
                        className={`px-6 py-3 rounded-lg font-semibold transition-colors ${mode === 'regular' ? activeStyle : inactiveStyle}`}
                    >
                        Regular Mode
                    </button>
                    <button
                        onClick={() => setMode('exam')}
                        className={`px-6 py-3 rounded-lg font-semibold transition-colors ${mode === 'exam' ? activeStyle : inactiveStyle}`}
                    >
                        Exam Mode
                    </button>
                </div>

                {mode === 'regular' ? (
                    <DataTable title="Regular Bell Schedule" data={processedRegularSchedule} onToggle={handleToggleRegularBell} />
                ) : (
                    <DataTable title="Exam Bell Schedule" data={processedExamSchedule} onToggle={handleToggleExamBell} />
                )}
            </main>

            <Sidebar 
                isOpen={isSidebarOpen} 
                onClose={() => setIsSidebarOpen(false)} 
                onLogout={onLogout}
                onEventsClick={() => { setIsSidebarOpen(false); setIsEventModalOpen(true); }}
                onHolidaysClick={() => { setIsSidebarOpen(false); setIsHolidayModalOpen(true); }}
            />
            <SOSButton />
            {isEventModalOpen && <EventModal onClose={() => setIsEventModalOpen(false)} onSchedule={handleScheduleEvent} />}
            {isHolidayModalOpen && <HolidayModal onClose={() => setIsHolidayModalOpen(false)} onDeclare={handleDeclareHoliday} />}
        </div>
    );
};

export default DashboardPage;