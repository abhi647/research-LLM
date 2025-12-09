import React from 'react';
import { Card, Button } from '../components/UIComponents';
import {  PieChart, Pie, Cell, ResponsiveContainer, BarChart, Bar, XAxis, Tooltip } from 'recharts';
import { Users, FileText, CreditCard, Activity } from 'lucide-react';

const DATA_USAGE = [
  { name: 'Mon', queries: 400 },
  { name: 'Tue', queries: 300 },
  { name: 'Wed', queries: 550 },
  { name: 'Thu', queries: 450 },
  { name: 'Fri', queries: 600 },
  { name: 'Sat', queries: 200 },
  { name: 'Sun', queries: 150 },
];

const DATA_STORAGE = [
    { name: 'PDFs', value: 400 },
    { name: 'Images', value: 300 },
    { name: 'Text', value: 300 },
];

const COLORS = ['#DCE8F2', '#E7E3F8', '#DCEDE2'];

export const AdminView: React.FC = () => {
    return (
        <div className="container mx-auto max-w-6xl p-6 overflow-y-auto h-full">
            <h1 className="text-2xl font-bold text-slate-800 mb-6">Admin Dashboard</h1>
            
            {/* Stats Row */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
                {[
                    { title: 'Total Users', value: '1,240', icon: Users, color: 'text-blue-500', bg: 'bg-blue-50' },
                    { title: 'Documents Indexed', value: '45.2k', icon: FileText, color: 'text-purple-500', bg: 'bg-purple-50' },
                    { title: 'MRR', value: '$12.4k', icon: CreditCard, color: 'text-green-500', bg: 'bg-green-50' },
                    { title: 'Avg. Latency', value: '840ms', icon: Activity, color: 'text-orange-500', bg: 'bg-orange-50' },
                ].map((stat, i) => (
                    <Card key={i} className="p-4 flex items-center gap-4">
                        <div className={`w-12 h-12 rounded-xl ${stat.bg} flex items-center justify-center ${stat.color}`}>
                            <stat.icon size={20} />
                        </div>
                        <div>
                            <p className="text-xs text-slate-400 font-bold uppercase tracking-wider">{stat.title}</p>
                            <h3 className="text-2xl font-bold text-slate-800">{stat.value}</h3>
                        </div>
                    </Card>
                ))}
            </div>

            {/* Charts Row */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                <Card className="p-6">
                    <h3 className="text-lg font-bold text-slate-700 mb-4">Query Volume (7 Days)</h3>
                    <div className="h-64 w-full">
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={DATA_USAGE}>
                                <XAxis dataKey="name" stroke="#94a3b8" fontSize={12} tickLine={false} axisLine={false} />
                                <Tooltip cursor={{fill: '#f1f5f9'}} contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.05)' }} />
                                <Bar dataKey="queries" fill="#1e293b" radius={[4, 4, 0, 0]} barSize={32} />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </Card>

                <Card className="p-6">
                    <h3 className="text-lg font-bold text-slate-700 mb-4">Storage Distribution</h3>
                    <div className="h-64 w-full flex items-center justify-center">
                         <ResponsiveContainer width="100%" height="100%">
                            <PieChart>
                                <Pie
                                    data={DATA_STORAGE}
                                    cx="50%"
                                    cy="50%"
                                    innerRadius={60}
                                    outerRadius={80}
                                    fill="#8884d8"
                                    paddingAngle={5}
                                    dataKey="value"
                                >
                                    {DATA_STORAGE.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                    ))}
                                </Pie>
                                <Tooltip />
                            </PieChart>
                        </ResponsiveContainer>
                    </div>
                    <div className="flex justify-center gap-4">
                         {DATA_STORAGE.map((entry, index) => (
                            <div key={entry.name} className="flex items-center gap-2">
                                <div className="w-3 h-3 rounded-full" style={{ backgroundColor: COLORS[index] }} />
                                <span className="text-xs text-slate-500 font-medium">{entry.name}</span>
                            </div>
                         ))}
                    </div>
                </Card>
            </div>

            {/* Quick Actions */}
            <Card className="p-6">
                 <h3 className="text-lg font-bold text-slate-700 mb-4">Platform Management</h3>
                 <div className="flex gap-4">
                    <Button>Manage Subscriptions</Button>
                    <Button variant="secondary">Review Flagged Content</Button>
                    <Button variant="ghost">System Logs</Button>
                 </div>
            </Card>
        </div>
    );
};
