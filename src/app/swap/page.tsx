"use client"
import React, { useState } from 'react';
import { ChevronDown, ArrowRight, RefreshCw } from 'lucide-react';

// --- Color Palette ---
const COLORS = {
  BACKGROUND: '#0A0A0A',
  BOX_BG: '#1A0A05',
  ORANGE_PRIMARY: '#CC4420',
  ORANGE_ACCENT: '#FF7F50',
  ORANGE_DARK: '#6E3C1B',
  USDC_BLUE: '#3D7BFD',
  BUTTON_BG: '#B85542',
  TEXT_COLOR_DIM: '#9CA3AF',
  GLOW_ORANGE: '#FF6B3D',
};

// --- Image URLs ---
const USDC_LOGO = 'https://upload.wikimedia.org/wikipedia/commons/c/ca/USD_Coin_logo_%28cropped%29.png';
const BASE_LOGO = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQTbAQfvnrWQHN1GgMh45q43sjkuos2XRs_5ng_Pdj67e1t9cOyp63DXDZP5Uo08sk0K3I&usqp=CAU';
const ARB_LOGO = 'https://s2.coinmarketcap.com/static/img/coins/200x200/11841.png';

// --- Custom CSS for complex shapes and borders ---
const customStyles = `
  /* Enhanced geometric frame for token boxes */
  .token-box-frame {
    clip-path: polygon(
      2% 0, 98% 0, 100% 2%, 100% 98%, 98% 100%, 2% 100%, 0 98%, 0 2%
    );
    border: 3px solid ${COLORS.ORANGE_PRIMARY};
    background: linear-gradient(135deg, ${COLORS.BOX_BG} 0%, #120805 100%);
    position: relative;
    z-index: 10;
    box-shadow: 
      0 0 20px rgba(204, 68, 32, 0.3),
      inset 0 0 30px rgba(0, 0, 0, 0.5);
  }
  
  /* Multiple inner borders for depth */
  .token-box-frame::before {
    content: '';
    position: absolute;
    top: 4px;
    left: 4px;
    right: 4px;
    bottom: 4px;
    border: 2px solid ${COLORS.ORANGE_DARK};
    pointer-events: none;
    z-index: 1;
    clip-path: polygon(
      2% 0, 98% 0, 100% 2%, 100% 98%, 98% 100%, 2% 100%, 0 98%, 0 2%
    );
  }
  
  .token-box-frame::after {
    content: '';
    position: absolute;
    top: 8px;
    left: 8px;
    right: 8px;
    bottom: 8px;
    border: 1px solid ${COLORS.ORANGE_ACCENT};
    opacity: 0.3;
    pointer-events: none;
    z-index: 1;
  }

  /* Enhanced decorative stripes */
  .deco-stripes {
    position: absolute;
    top: 8px;
    left: 8px;
    width: 40px;
    height: 12px;
    overflow: hidden;
    z-index: 20;
  }
  .deco-stripes div {
    float: left;
    width: 4px;
    height: 100%;
    background: linear-gradient(180deg, ${COLORS.ORANGE_PRIMARY} 0%, ${COLORS.ORANGE_ACCENT} 100%);
    margin-right: 3px;
    opacity: 0.5;
    transform: skewX(-25deg);
  }
  
  /* Corner decorations */
  .corner-accent {
    position: absolute;
    width: 24px;
    height: 24px;
    border: 2px solid ${COLORS.ORANGE_PRIMARY};
    z-index: 30;
  }
  .corner-accent.top-left {
    top: -2px;
    left: -2px;
    border-right: none;
    border-bottom: none;
  }
  .corner-accent.top-right {
    top: -2px;
    right: -2px;
    border-left: none;
    border-bottom: none;
  }
  .corner-accent.bottom-left {
    bottom: -2px;
    left: -2px;
    border-right: none;
    border-top: none;
  }
  .corner-accent.bottom-right {
    bottom: -2px;
    right: -2px;
    border-left: none;
    border-top: none;
  }

  /* Swap button with enhanced styling */
  .swap-button-style {
    clip-path: polygon(3% 0, 97% 0, 100% 8%, 100% 92%, 97% 100%, 3% 100%, 0 92%, 0 8%);
    border: 2px solid ${COLORS.ORANGE_PRIMARY};
    background: linear-gradient(135deg, ${COLORS.BUTTON_BG} 0%, #944232 100%);
    position: relative;
    z-index: 10;
    box-shadow: 
      0 0 15px rgba(204, 68, 32, 0.4),
      inset 0 0 20px rgba(0, 0, 0, 0.3);
    transition: all 0.3s ease;
  }
  .swap-button-style:hover {
    transform: translateY(-2px);
    box-shadow: 
      0 0 25px rgba(255, 107, 61, 0.6),
      inset 0 0 20px rgba(0, 0, 0, 0.3);
    border-color: ${COLORS.GLOW_ORANGE};
  }
  .swap-button-style::before {
    content: '';
    position: absolute;
    inset: 4px;
    border: 1px solid ${COLORS.ORANGE_ACCENT};
    pointer-events: none;
    z-index: 1;
    opacity: 0.5;
  }
  
  /* Input field enhancements */
  .amount-input {
    background: transparent;
    border: none;
    outline: none;
    color: ${COLORS.ORANGE_ACCENT};
    font-size: 3rem;
    font-weight: 700;
    font-family: 'Courier New', monospace;
    text-shadow: 0 0 10px rgba(255, 127, 80, 0.5);
  }
  .amount-input::placeholder {
    color: ${COLORS.ORANGE_DARK};
    opacity: 0.5;
  }
`;

// Interface for state
interface TokenState {
  amount: string;
  symbol: 'USDC';
  chain: 'Base' | 'Arbitrum';
}

const EnhancedIndustrialSwapBox: React.FC = () => {
  const [fromToken, setFromToken] = useState<TokenState>({ amount: '1000.00', symbol: 'USDC', chain: 'Base' });
  const [toToken, setToToken] = useState<TokenState>({ amount: '1000.00', symbol: 'USDC', chain: 'Arbitrum' });

  const exchangeRate = '1 USDC (Base) = 1.0000 USDC (Arbitrum)';

  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setFromToken(prev => ({ ...prev, amount: value }));
    setToToken(prev => ({ ...prev, amount: value }));
  };

  const handleSwap = () => { 
    alert('Swap initiated (Demo)'); 
  };

  const TokenAndChainBox: React.FC<{ token: TokenState, isInput: boolean }> = ({ token, isInput }) => {
    const chainLogo = token.chain === 'Base' ? BASE_LOGO : ARB_LOGO;

    return (
      <div className={`token-box-frame p-8 w-[420px] min-h-[280px] flex flex-col justify-between relative`}>
        
        {/* Decorative elements */}
        <div className="deco-stripes">
          <div /><div /><div /><div /><div />
        </div>
        
        {/* Corner accents */}
        <div className="corner-accent top-left" />
        <div className="corner-accent top-right" />
        <div className="corner-accent bottom-left" />
        <div className="corner-accent bottom-right" />

        {/* Top Section: Large Token Logo with label */}
        <div className="flex flex-col items-center mb-6 relative z-20">
          <div className="relative mb-4">
            <img 
              src={USDC_LOGO} 
              alt="USDC Logo" 
              className="w-24 h-24 rounded-full shadow-lg" 
              style={{ boxShadow: `0 0 30px rgba(61, 123, 253, 0.4)` }}
            />
            <div className="absolute -bottom-2 -right-2 w-10 h-10 rounded-full border-3 border-white bg-white shadow-md overflow-hidden">
              <img src={chainLogo} alt={`${token.chain} Logo`} className="w-full h-full object-cover" />
            </div>
          </div>
          <div className="text-center">
            <div className="text-4xl font-bold text-white tracking-wider mb-1">{token.symbol}</div>
            <div className="flex items-center justify-center space-x-2 text-gray-400">
              <span className="text-sm font-medium">on</span>
              <span className="text-lg font-semibold text-white">{token.chain}</span>
            </div>
          </div>
        </div>

        {/* Middle Section: Amount Input/Display */}
        <div className="relative z-20 mb-4">
          {isInput ? (
            <input
              type="text"
              value={fromToken.amount}
              onChange={handleAmountChange}
              placeholder="0.00"
              className="amount-input w-full text-center"
            />
          ) : (
            <div className="amount-input w-full text-center">
              {token.amount}
            </div>
          )}
        </div>
        
        {/* Bottom Section: Balance and decorations */}
        <div className="flex justify-between items-end relative z-20 pt-4 border-t border-gray-800">
          <div className="text-sm text-gray-500">
            <div className="text-xs text-gray-600 mb-1">BALANCE</div>
            <div className="text-base font-mono text-gray-400">5,000.00 {token.symbol}</div>
          </div>
          {/* Tech decoration */}
          <div className="text-xs font-mono opacity-40" style={{ color: COLORS.ORANGE_PRIMARY }}>
            <div>0x4A...B2C9</div>
            <div className="text-right">BLK: 892451</div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <>
      <style>{customStyles}</style> 
      <div className="min-h-screen flex flex-col items-center justify-center p-4" style={{ backgroundColor: COLORS.BACKGROUND }}>
        
        {/* Main Swap Container */}
        <div className="w-full max-w-5xl px-4 py-8 relative">
          
          {/* Horizontal Alignment of Swap Boxes and Arrow */}
          <div className="flex items-center justify-center gap-12 mb-8 relative">
            
            {/* From Token Box (USDC on Base) */}
            <TokenAndChainBox token={fromToken} isInput={true} />
            
            {/* Horizontal Swap Arrow Button */}
            <div className="flex items-center justify-center">
              <div 
                className="p-4 rounded-full border-2 cursor-pointer transition-all duration-300 hover:scale-110"
                style={{ 
                  borderColor: COLORS.ORANGE_PRIMARY,
                  backgroundColor: COLORS.BOX_BG,
                  boxShadow: `0 0 20px rgba(204, 68, 32, 0.3)`
                }}
              >
                <ArrowRight className="w-8 h-8" style={{ color: COLORS.ORANGE_ACCENT }} />
              </div>
            </div>
            
            {/* To Token Box (USDC on Arbitrum) */}
            <TokenAndChainBox token={toToken} isInput={false} />
            
          </div>
          
          {/* Exchange Rate with better styling */}
          <div 
            className="text-center my-6 py-3 px-6 rounded-lg border inline-block mx-auto"
            style={{ 
              color: COLORS.ORANGE_ACCENT,
              borderColor: COLORS.ORANGE_DARK,
              backgroundColor: 'rgba(26, 10, 5, 0.5)',
              display: 'flex',
              justifyContent: 'center'
            }}
          >
            <div className="flex items-center gap-3">
              <RefreshCw className="w-4 h-4" />
              <span className="text-sm font-mono">{exchangeRate}</span>
            </div>
          </div>
          
          {/* Swap Button - Smaller width */}
          <div className="flex justify-center mt-8">
            <button
              onClick={handleSwap}
              className="swap-button-style py-5 px-12 text-xl font-bold text-white text-center"
              style={{ minWidth: '250px', maxWidth: '280px' }}
            >
              Execute Swap
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default EnhancedIndustrialSwapBox;