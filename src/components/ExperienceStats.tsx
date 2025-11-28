import React from 'react';

interface StatItem {
    label: string;
    value: string;
    subtext?: string;
    trend?: 'up' | 'down' | 'neutral';
}

interface ExperienceStatsProps {
    stats: StatItem[];
}

const ExperienceStats: React.FC<ExperienceStatsProps> = ({ stats }) => {
    return (
        <div className="flex flex-col justify-center gap-6 min-w-[200px] border-l border-white/10 pl-6 h-full">
            {stats.map((stat, index) => (
                <div key={index} className="group/stat relative">
                    <div className="flex justify-between items-end mb-1">
                        <span className="text-[10px] font-mono text-text-muted uppercase tracking-wider">{stat.label}</span>
                        {stat.trend === 'up' && <span className="text-emerald-400 text-[10px]">▲</span>}
                        {stat.trend === 'down' && <span className="text-red-400 text-[10px]">▼</span>}
                    </div>
                    <div className="text-xl md:text-2xl font-bold text-white tracking-tight group-hover/stat:text-primary transition-colors font-display">
                        {stat.value}
                    </div>
                    {stat.subtext && (
                        <div className="text-[10px] text-text-muted mt-0.5 font-mono">
                            {stat.subtext}
                        </div>
                    )}
                    {/* Decorative bar */}
                    <div className="h-0.5 w-full bg-white/5 mt-2 rounded-full overflow-hidden">
                        <div className="h-full bg-primary/50 w-2/3 group-hover/stat:w-full group-hover/stat:bg-primary transition-all duration-700 ease-out"></div>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default ExperienceStats;
