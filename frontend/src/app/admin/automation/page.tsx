'use client';

import { useState } from 'react';
import NeonCard from '@/components/ui/NeonCard';
import NeonButton from '@/components/ui/NeonButton';

const initialJobs = [
  { id: 1, name: 'Price Sync', type: 'sync', icon: '💲', status: 'idle', lastRun: '10 min ago', nextRun: 'In 50 min', schedule: 'Every 1 hour' },
  { id: 2, name: 'Stock Sync', type: 'sync', icon: '📦', status: 'running', lastRun: 'Running now', nextRun: 'After completion', schedule: 'Every 30 min' },
  { id: 3, name: 'Order Fulfillment', type: 'fulfillment', icon: '🚀', status: 'completed', lastRun: '2 min ago', nextRun: 'In 28 min', schedule: 'Every 30 min' },
  { id: 4, name: 'Product Import', type: 'import', icon: '📥', status: 'failed', lastRun: '1 hour ago', nextRun: 'In 2 hours', schedule: 'Every 3 hours' },
  { id: 5, name: 'Image Optimization', type: 'media', icon: '🖼️', status: 'idle', lastRun: 'Yesterday', nextRun: 'Tonight 2am', schedule: 'Daily at 2am' },
];

const statusStyles: Record<string, { text: string; bg: string; dot: string }> = {
  idle: { text: 'text-gray-400', bg: 'bg-gray-400/10', dot: 'bg-gray-400' },
  running: { text: 'text-cyan-400', bg: 'bg-cyan-400/10', dot: 'bg-cyan-400' },
  completed: { text: 'text-green-400', bg: 'bg-green-400/10', dot: 'bg-green-400' },
  failed: { text: 'text-red-400', bg: 'bg-red-400/10', dot: 'bg-red-400' },
};

export default function AutomationPage() {
  const [jobs, setJobs] = useState(initialJobs);

  const runJob = (id: number) =>
    setJobs((prev) => prev.map((j) => j.id === id ? { ...j, status: 'running', lastRun: 'Running now' } : j));

  const stopJob = (id: number) =>
    setJobs((prev) => prev.map((j) => j.id === id ? { ...j, status: 'completed', lastRun: 'Just now' } : j));

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white">Automation Jobs</h1>
          <p className="text-gray-400 text-sm">Scheduled background tasks and automated workflows</p>
        </div>
        <NeonButton variant="outline">+ New Job</NeonButton>
      </div>

      {/* Summary */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {[
          { label: 'Total Jobs', value: jobs.length, color: '#00f5ff' },
          { label: 'Running', value: jobs.filter((j) => j.status === 'running').length, color: '#ff00ff' },
          { label: 'Failed', value: jobs.filter((j) => j.status === 'failed').length, color: '#ff4444' },
          { label: 'Completed Today', value: 12, color: '#39ff14' },
        ].map((s) => (
          <NeonCard key={s.label} className="p-4">
            <p className="text-gray-400 text-xs mb-1 uppercase tracking-wide">{s.label}</p>
            <p className="text-2xl font-bold" style={{ color: s.color }}>{s.value}</p>
          </NeonCard>
        ))}
      </div>

      {/* Job Cards */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {jobs.map((job) => {
          const style = statusStyles[job.status];
          return (
            <NeonCard key={job.id} className="p-5">
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-[#0d0d15] flex items-center justify-center text-xl border border-[rgba(0,245,255,0.1)]">
                    {job.icon}
                  </div>
                  <div>
                    <p className="text-white font-medium">{job.name}</p>
                    <p className="text-gray-500 text-xs capitalize">{job.type}</p>
                  </div>
                </div>
                <span className={`flex items-center gap-1 text-xs px-2 py-1 rounded-full font-medium ${style.text} ${style.bg}`}>
                  <span className={`w-1.5 h-1.5 rounded-full ${style.dot} ${job.status === 'running' ? 'animate-pulse' : ''}`} />
                  {job.status}
                </span>
              </div>

              <div className="space-y-1.5 mb-4">
                <div className="flex justify-between text-xs">
                  <span className="text-gray-500">Schedule</span>
                  <span className="text-gray-300">{job.schedule}</span>
                </div>
                <div className="flex justify-between text-xs">
                  <span className="text-gray-500">Last Run</span>
                  <span className="text-gray-300">{job.lastRun}</span>
                </div>
                <div className="flex justify-between text-xs">
                  <span className="text-gray-500">Next Run</span>
                  <span className="text-gray-300">{job.nextRun}</span>
                </div>
              </div>

              <div className="flex gap-2">
                {job.status === 'running' ? (
                  <NeonButton size="sm" variant="outline" className="flex-1" onClick={() => stopJob(job.id)}>
                    ⏹ Stop
                  </NeonButton>
                ) : (
                  <NeonButton size="sm" className="flex-1" onClick={() => runJob(job.id)}>
                    ▶ Run Now
                  </NeonButton>
                )}
                <button className="text-xs text-gray-500 hover:text-gray-300 px-2">⚙</button>
              </div>
            </NeonCard>
          );
        })}
      </div>
    </div>
  );
}
