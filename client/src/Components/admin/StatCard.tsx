import React from 'react';

interface StatCardProps {
  label: string;
  value: string | number;
  changeValue: string;
  changeColor?: string;
  changeDesc: string;
  icon: string;
  colorClass?: string;
}

export const StatCard: React.FC<StatCardProps> = ({
  label, value, changeValue, changeColor, changeDesc, icon, colorClass = ''
}) => {
  return (
    <div className={`stat-card ${colorClass}`}>
      <div className="sc-icon">{icon}</div>
      <div className="sc-label">{label}</div>
      <div className="sc-num" style={{ color: colorClass ? 'inherit' : 'var(--white)' }}>{value}</div>
      <div className="sc-change">
        <span style={changeColor ? { color: changeColor } : {}}>{changeValue}</span> {changeDesc}
      </div>
    </div>
  );
};
