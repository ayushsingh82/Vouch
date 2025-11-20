import TwitterIcon from './icons/TwitterIcon';
import TelegramIcon from './icons/TelegramIcon';

export default function Footer() {
  return (
    <footer className="w-full border-t-2 border-black bg-white shadow-[6px_-6px_0_0_rgba(0,0,0,1)]">
      <div className="container mx-auto px-6 py-4 flex items-center justify-between">
        <div className="flex items-center">
          <span className="text-lg font-bold text-black">X402</span>
        </div>
        <div className="flex items-center gap-4">
          <a
            href="https://twitter.com"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-white border-2 border-black shadow-[4px_4px_0_0_rgba(0,0,0,1)] p-3 rounded-lg hover:shadow-[2px_2px_0_0_rgba(0,0,0,1)] hover:translate-x-[2px] hover:translate-y-[2px] transition-all duration-200"
            aria-label="Twitter"
          >
            <TwitterIcon className="w-6 h-6 text-black" />
          </a>
          <a
            href="https://telegram.org"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-white border-2 border-black shadow-[4px_4px_0_0_rgba(0,0,0,1)] p-3 rounded-lg hover:shadow-[2px_2px_0_0_rgba(0,0,0,1)] hover:translate-x-[2px] hover:translate-y-[2px] transition-all duration-200"
            aria-label="Telegram"
          >
            <TelegramIcon className="w-6 h-6 text-black" />
          </a>
        </div>
      </div>
    </footer>
  );
}

