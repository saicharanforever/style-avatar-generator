
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ArrowLeft, Mail } from 'lucide-react';
import { toast } from 'sonner';
import { supabase } from '@/integrations/supabase/client';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSent, setIsSent] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email) {
      toast.error('Please enter your email address');
      return;
    }
    
    try {
      setIsSubmitting(true);
      
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: window.location.origin + '/reset-password',
      });
      
      if (error) throw error;
      
      setIsSent(true);
      toast.success('Password reset link sent to your email');
    } catch (error: any) {
      toast.error(error.message || 'Failed to send reset link');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="w-full max-w-md mx-auto">
      <div className="mb-6">
        <button 
          onClick={() => navigate('/auth')} 
          className="flex items-center text-gold-light/70 hover:text-gold"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to login
        </button>
      </div>
      
      {!isSent ? (
        <>
          <h2 className="text-2xl font-bold text-center gold-gradient-text mb-4">
            Reset Your Password
          </h2>
          <p className="text-gold-light/70 text-center mb-6">
            Enter your email address and we'll send you a link to reset your password.
          </p>
          
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <label htmlFor="email" className="text-sm font-medium text-gold-light">
                Email
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gold-light/50 h-5 w-5" />
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="input-field pl-10"
                  placeholder="your-email@example.com"
                />
              </div>
            </div>
            
            <Button 
              type="submit" 
              className="w-full button-primary bg-gradient-to-r from-pink-500 to-blue-500 text-white"
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Sending...' : 'Send Reset Link'}
            </Button>
          </form>
        </>
      ) : (
        <div className="text-center space-y-4 p-6 glass-card rounded-lg">
          <div className="mx-auto w-16 h-16 bg-green-600/20 rounded-full flex items-center justify-center">
            <Mail className="h-8 w-8 text-green-500" />
          </div>
          <h2 className="text-2xl font-bold gold-gradient-text">Check Your Email</h2>
          <p className="text-gold-light/70">
            We've sent a password reset link to:
          </p>
          <p className="text-gold font-semibold">{email}</p>
          <p className="text-gold-light/70 mt-4">
            Please check your inbox and follow the instructions to reset your password.
          </p>
          <Button 
            className="mt-4 w-full border border-gold/30 text-gold hover:bg-navy-light"
            variant="outline"
            onClick={() => navigate('/auth')}
          >
            Return to Sign In
          </Button>
        </div>
      )}
    </div>
  );
};

export default ForgotPassword;
