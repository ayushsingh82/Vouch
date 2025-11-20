export default function TelegramIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="currentColor"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.568 8.16l-1.608 7.592c-.12.54-.43.67-.87.42l-2.4-1.77-1.16.74c-.135.09-.247.165-.51.165l.173-2.45 4.44-4.01c.193-.17-.043-.265-.3-.1l-5.49 3.46-2.37-.74c-.51-.16-.52-.51.106-.77l9.18-3.54c.42-.16.79.1.65.62z" />
    </svg>
  );
}

