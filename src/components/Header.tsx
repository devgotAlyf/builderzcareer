import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Menu, X, FileText, LogOut, User, Bookmark, Briefcase } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';
import { Link, useLocation } from 'react-router-dom';

export const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { user, signOut } = useAuth();
  const location = useLocation();

  const handleHomeClick = () => {
    if (location.pathname === '/') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return <header className="bg-background/95 backdrop-blur-sm border-b border-border sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center space-x-2" onClick={handleHomeClick}>
            <FileText className="h-8 w-8 text-primary" />
            <h1 className="text-2xl font-bold bg-gradient-primary bg-clip-text text-transparent">CareerBuilderz</h1>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <a href="#home" className="text-foreground hover:text-primary hover:underline transition-colors" onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' }); }}>Home</a>
            <a href="#job-finder" className="text-foreground hover:text-primary hover:underline transition-colors">
              Job Finder
            </a>
            <Link to="/saved-jobs" className="text-foreground hover:text-primary hover:underline transition-colors flex items-center gap-1">
              <Bookmark className="h-4 w-4" />
              Saved Jobs
            </Link>
            <Link to="/applications" className="text-foreground hover:text-primary hover:underline transition-colors flex items-center gap-1">
              <Briefcase className="h-4 w-4" />
              Applications
            </Link>
            {user && (
              <Link to="/profile" className="text-foreground hover:text-primary hover:underline transition-colors flex items-center gap-1">
                <User className="h-4 w-4" />
                Profile
              </Link>
            )}
            <div className="flex items-center space-x-4">
              {user ? (
                <>
                  <span className="text-sm text-muted-foreground">
                    Welcome, {user.email?.split('@')[0]}
                  </span>
                  <Button variant="outline" size="sm" onClick={signOut}>
                    <LogOut className="h-4 w-4 mr-2" />
                    Sign Out
                  </Button>
                </>
              ) : (
                <Link to="/auth">
                  <Button variant="default" size="sm">
                    Sign In / Sign Up
                  </Button>
                </Link>
              )}
            </div>
          </nav>

          {/* Mobile Menu Button */}
          <button className="md:hidden p-2 rounded-lg hover:bg-muted" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && <nav className="md:hidden mt-4 pb-4 border-t border-border pt-4">
            <div className="flex flex-col space-y-4">
              <a href="#home" className="text-foreground hover:text-primary hover:underline transition-colors" onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' }); }}>
                Home
              </a>
              <a href="#job-finder" className="text-foreground hover:text-primary hover:underline transition-colors">
                Job Finder
              </a>
              <Link to="/saved-jobs" className="text-foreground hover:text-primary hover:underline transition-colors flex items-center gap-1">
                <Bookmark className="h-4 w-4" />
                Saved Jobs
              </Link>
              <Link to="/applications" className="text-foreground hover:text-primary hover:underline transition-colors flex items-center gap-1">
                <Briefcase className="h-4 w-4" />
                Applications
              </Link>
              {user && (
                <Link to="/profile" className="text-foreground hover:text-primary hover:underline transition-colors flex items-center gap-1">
                  <User className="h-4 w-4" />
                  Profile
                </Link>
              )}
              <div className="flex flex-col space-y-2 pt-4">
                {user ? (
                  <>
                    <span className="text-sm text-muted-foreground">
                      Welcome, {user.email?.split('@')[0]}
                    </span>
                    <Button variant="outline" size="sm" onClick={signOut}>
                      <LogOut className="h-4 w-4 mr-2" />
                      Sign Out
                    </Button>
                  </>
                ) : (
                  <Link to="/auth">
                    <Button variant="default" size="sm">
                      Sign In / Sign Up
                    </Button>
                  </Link>
                )}
              </div>
            </div>
          </nav>}
      </div>
    </header>;
};