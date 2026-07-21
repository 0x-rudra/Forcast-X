'use client';

import { AqiCurrent } from '@/lib/types';

interface AqiBannerProps {
  aqi: AqiCurrent;
}

function getAqiStatus(value: number): { label: string; className: string } {
  if (value <= 50) return { label: 'Good', className: 'aqi-good' };
  if (value <= 100) return { label: 'Moderate', className: 'aqi-fair' };
  return { label: 'Poor', className: 'aqi-poor' };
}

export default function AqiBanner({ aqi }: AqiBannerProps) {
  const { label, className } = getAqiStatus(aqi.us_aqi);

  return (
    <div className="aqi-banner" id="aqi-banner">
      <div className="aqi-header">
        <div className="aqi-icon">
          <i className="bx bx-leaf" />
        </div>
        <div className="aqi-info">
          <span className="aqi-label">Air Quality (AQI)</span>
          <span id="aqi-value" className="aqi-value">{aqi.us_aqi}</span>
        </div>
        <div className={`aqi-status ${className}`} id="aqi-status">
          {label}
        </div>
      </div>
      <div className="aqi-pollutants">
        <div className="pollutant">
          <span className="p-val">{Math.round(aqi.pm2_5) || '--'}</span>
          <span className="p-lbl">PM2.5</span>
        </div>
        <div className="pollutant">
          <span className="p-val">{Math.round(aqi.pm10) || '--'}</span>
          <span className="p-lbl">PM10</span>
        </div>
        <div className="pollutant">
          <span className="p-val">{Math.round(aqi.nitrogen_dioxide) || '--'}</span>
          <span className="p-lbl">NO₂</span>
        </div>
        <div className="pollutant">
          <span className="p-val">{Math.round(aqi.ozone) || '--'}</span>
          <span className="p-lbl">O₃</span>
        </div>
        <div className="pollutant">
          <span className="p-val">{Math.round(aqi.carbon_monoxide) || '--'}</span>
          <span className="p-lbl">CO</span>
        </div>
      </div>
    </div>
  );
}
