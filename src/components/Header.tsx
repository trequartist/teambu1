import React from 'react';
import { Link } from 'react-router-dom';
import Button from './Button';
import { Menu } from 'lucide-react';
import { Logo } from './Logo';

interface HeaderProps {
  transparent?: boolean;
}

const Header: React.FC<HeaderProps> = ({ transparent = false }) => {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

  return (
    <header className={`fixed top-0 w-full z-50 ${transparent ? 'bg-transparent' : 'bg-black/50 backdrop-blur-xl border-b border-zinc-800/50'}`}>
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center space-x-8">
            <Link to="/" className="flex items-center">
              <Logo className="h-8 w-auto" />
              <span className="ml-2 text-xl font-bold text-white">KiwiQ</span>
            </Link>
            
            <nav className="hidden md:flex items-center space-x-6">
              <a href="#features" className="text-zinc-400 hover:text-white transition-colors">Features</a>
              <a href="#how-it-works" className="text-zinc-400 hover:text-white transition-colors">How it Works</a>
            </nav>
          </div>
          
          <div className="hidden md:flex items-center space-x-4">
            <Button variant="outline" size="sm">Log in</Button>
            <Button variant="primary" size="sm">Sign up</Button>
          </div>
          
          <button 
            className="md:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <Menu className="h-6 w-6 text-zinc-400" />
          </button>
        </div>
      </div>
      
      {isMenuOpen && (
        <div className="md:hidden bg-zinc-900 shadow-lg py-4 px-4 absolute w-full border-t border-zinc-800">
          <nav className="flex flex-col space-y-4 mb-4">
            <a href="#features" className="text-zinc-400 hover:text-white">Features</a>
            <a href="#how-it-works" className="text-zinc-400 hover:text-white">How it Works</a>
          </nav>
          
          <div className="flex flex-col space-y-3">
            <Button variant="outline" fullWidth>Log in</Button>
            <Button variant="primary" fullWidth>Sign up</Button>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;