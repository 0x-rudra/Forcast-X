'use client';

export default function LoadingSpinner() {
  return (
    <div id="loading" className="glass-panel message-panel">
      <div className="spinner" />
      <p>Scanning atmosphere...</p>
    </div>
  );
}
