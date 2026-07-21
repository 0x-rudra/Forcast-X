'use client';

interface ErrorPanelProps {
  message: string;
}

export default function ErrorPanel({ message }: ErrorPanelProps) {
  return (
    <div id="error-message" className="glass-panel message-panel">
      <i className="bx bx-error-circle" />
      <p>{message}</p>
    </div>
  );
}
