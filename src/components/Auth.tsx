import { useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';
import { Link } from 'react-router-dom';
import { FileText } from 'lucide-react';

interface AuthProps {
  onAuthSuccess: () => void;
}

export const Auth = ({ onAuthSuccess }: AuthProps) => {
  const [isSignIn, setIsSignIn] = useState(true);
  const [signInEmail, setSignInEmail] = useState('');
  const [signInPassword, setSignInPassword] = useState('');
  const [signUpEmail, setSignUpEmail] = useState('');
  const [signUpPassword, setSignUpPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const redirectUrl = `${window.location.origin}/`;
      
      const { error } = await supabase.auth.signUp({
        email: signUpEmail,
        password: signUpPassword,
        options: {
          emailRedirectTo: redirectUrl,
          data: {
            full_name: fullName,
          }
        }
      });

      if (error) {
        if (error.message.includes('already registered')) {
          toast({
            title: "Account exists",
            description: "This email is already registered. Please sign in instead.",
            variant: "destructive",
          });
        } else {
          toast({
            title: "Sign up failed",
            description: error.message,
            variant: "destructive",
          });
        }
      } else {
        toast({
          title: "Check your email",
          description: "Please check your email for a verification link.",
        });
      }
    } catch (error) {
      console.error('Sign up error:', error);
      toast({
        title: "Error",
        description: "An unexpected error occurred. Please try again.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const { error } = await supabase.auth.signInWithPassword({
        email: signInEmail,
        password: signInPassword,
      });

      if (error) {
        if (error.message.includes('Invalid login credentials')) {
          toast({
            title: "Sign in failed",
            description: "Invalid email or password. Please check your credentials.",
            variant: "destructive",
          });
        } else {
          toast({
            title: "Sign in failed",
            description: error.message,
            variant: "destructive",
          });
        }
      } else {
        toast({
          title: "Welcome back!",
          description: "You have successfully signed in.",
        });
        onAuthSuccess();
      }
    } catch (error) {
      console.error('Sign in error:', error);
      toast({
        title: "Error",
        description: "An unexpected error occurred. Please try again.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div 
      className="min-h-screen flex items-center justify-center relative"
      style={{
        backgroundImage: `url('/back.jpg')`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat'
      }}
    >
      {/* CareerBuilderz Logo */}
      <Link to="/" className="absolute top-6 left-6 md:left-8 flex items-center space-x-2 z-10">
        <FileText className="h-8 w-8 text-purple-500" />
        <h1 className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-blue-300 bg-clip-text text-transparent">
          CareerBuilderz
        </h1>
      </Link>

      <div className="w-full max-w-5xl mx-4 my-8">
        <div className="bg-black/95 backdrop-blur-sm rounded-lg shadow-2xl overflow-hidden">
          <div className="grid md:grid-cols-2 min-h-[600px]">
            {/* Left Panel - Login/Signup Form */}
            <div className="bg-black p-8 md:p-12 flex flex-col justify-center relative overflow-hidden">
              {/* Sliding Button Container */}
              <div className="absolute top-8 left-8 right-8 md:right-12">
                <div className="relative bg-gray-900 rounded-full p-1 w-full max-w-xs">
                  <div className="flex relative">
                    <button
                      type="button"
                      onClick={() => setIsSignIn(true)}
                      className={`flex-1 py-3 px-6 rounded-full font-semibold text-sm transition-all duration-300 z-10 ${
                        isSignIn 
                          ? 'text-gray-900' 
                          : 'text-white hover:text-gray-300'
                      }`}
                    >
                      Sign In
                    </button>
                    <button
                      type="button"
                      onClick={() => setIsSignIn(false)}
                      className={`flex-1 py-3 px-6 rounded-full font-semibold text-sm transition-all duration-300 z-10 ${
                        !isSignIn 
                          ? 'text-gray-900' 
                          : 'text-white hover:text-gray-300'
                      }`}
                    >
                      Sign Up
                    </button>
                    <div 
                      className={`absolute inset-y-1 w-1/2 bg-green-600 rounded-full transition-transform duration-300 ${
                        isSignIn ? 'translate-x-0' : 'translate-x-full'
                      }`}
                      style={{ top: '4px', bottom: '4px' }}
                    />
                  </div>
                </div>
              </div>

              {/* Form Slider Container */}
              <div className="relative mt-20 overflow-hidden">
                <div 
                  className="flex transition-transform duration-500 ease-in-out"
                  style={{ 
                    transform: `translateX(${isSignIn ? '0' : '-50%'})`,
                    width: '200%'
                  }}
                >
                  {/* Sign In Form */}
                  <div className="w-1/2 space-y-8 px-2 flex-shrink-0">
                    <div>
                      <h1 className="text-5xl md:text-6xl font-serif text-white mb-4">
                        Login
                      </h1>
                      <p className="text-white/70 text-sm">
                        Welcome back! Please sign in to continue.
                      </p>
                    </div>

                    <form onSubmit={handleSignIn} className="space-y-6">
                      <div>
                        <label className="block text-white uppercase text-xs font-medium mb-2 tracking-wider">
                          EMAIL
                        </label>
                        <Input
                          type="email"
                          placeholder="Enter your email"
                          value={signInEmail}
                          onChange={(e) => setSignInEmail(e.target.value)}
                          required
                          className="bg-transparent border-0 border-b-2 border-green-800 rounded-none text-white placeholder:text-white/40 focus:border-green-500 transition-colors"
                        />
                      </div>

                      <div>
                        <label className="block text-white uppercase text-xs font-medium mb-2 tracking-wider">
                          PASSWORD
                        </label>
                        <Input
                          type="password"
                          placeholder="Enter your password"
                          value={signInPassword}
                          onChange={(e) => setSignInPassword(e.target.value)}
                          required
                          className="bg-transparent border-0 border-b-2 border-green-800 rounded-none text-white placeholder:text-white/40 focus:border-green-500 transition-colors"
                        />
                      </div>

                      <div className="flex items-center justify-between text-sm">
                        <label className="flex items-center text-white/70 cursor-pointer">
                          <input type="checkbox" className="mr-2" />
                          Remember me
                        </label>
                        <a href="#" className="text-white/70 hover:text-white underline text-xs">
                          Forgot your password?
                        </a>
                      </div>

                      <Button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-gradient-to-r from-green-600 via-green-700 to-green-800 hover:from-green-700 hover:via-green-800 hover:to-green-900 text-white py-6 rounded-xl font-semibold uppercase tracking-wide text-sm transition-all duration-300 shadow-lg"
                      >
                        {loading ? 'Signing in...' : 'Login'}
                      </Button>

                    </form>
                  </div>

                  {/* Sign Up Form */}
                  <div className="w-1/2 space-y-8 px-2 flex-shrink-0">
                    <div>
                      <h1 className="text-5xl md:text-6xl font-serif text-white mb-4">
                        Sign Up
                      </h1>
                      <p className="text-white/70 text-sm">
                        Create your account to get started.
                      </p>
                    </div>

                    <form onSubmit={handleSignUp} className="space-y-6">
                      <div>
                        <label className="block text-white uppercase text-xs font-medium mb-2 tracking-wider">
                          FULL NAME
                        </label>
                        <Input
                          type="text"
                          placeholder="Enter your full name"
                          value={fullName}
                          onChange={(e) => setFullName(e.target.value)}
                          required
                          className="bg-transparent border-0 border-b-2 border-green-800 rounded-none text-white placeholder:text-white/40 focus:border-green-500 transition-colors"
                        />
                      </div>

                      <div>
                        <label className="block text-white uppercase text-xs font-medium mb-2 tracking-wider">
                          EMAIL
                        </label>
                        <Input
                          type="email"
                          placeholder="Enter your email"
                          value={signUpEmail}
                          onChange={(e) => setSignUpEmail(e.target.value)}
                          required
                          className="bg-transparent border-0 border-b-2 border-green-800 rounded-none text-white placeholder:text-white/40 focus:border-green-500 transition-colors"
                        />
                      </div>

                      <div>
                        <label className="block text-white uppercase text-xs font-medium mb-2 tracking-wider">
                          PASSWORD
                        </label>
                        <Input
                          type="password"
                          placeholder="Enter your password"
                          value={signUpPassword}
                          onChange={(e) => setSignUpPassword(e.target.value)}
                          required
                          minLength={6}
                          className="bg-transparent border-0 border-b-2 border-green-800 rounded-none text-white placeholder:text-white/40 focus:border-green-500 transition-colors"
                        />
                      </div>

                      <Button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-gradient-to-r from-green-600 via-green-700 to-green-800 hover:from-green-700 hover:via-green-800 hover:to-green-900 text-white py-6 rounded-xl font-semibold uppercase tracking-wide text-sm transition-all duration-300 shadow-lg"
                      >
                        {loading ? 'Creating account...' : 'Sign Up'}
                      </Button>

                    </form>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Panel - Image */}
            <div className="hidden md:block relative overflow-hidden">
              <img 
                src="/back.jpg" 
                alt="Background" 
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-b from-black/40 to-black/60"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
