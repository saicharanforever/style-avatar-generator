
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Lock } from 'lucide-react';
import { toast } from 'sonner';
import { supabase } from '@/integrations/supabase/client';

const ResetPassword = () => {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isResetSuccessful, setIsResetSuccessful] = useState(false);
  const navigate = useNavigate();

  // Check if user has valid reset token in URL
  useEffect(() => {
    const hashParams = new URLSearchParams(window.location.hash.substring(1));
    if (!hashParams.get('access_token')) {
      toast.error('Invalid or expired reset link');
      navigate('/auth');
    }
  }, [navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (password.length < 6) {
      toast.error('Password must be at least 6 characters');
      return;
    }
    
    if (password !== confirmPassword) {
      toast.error('Passwords do not match');
      return;
    }
    
    try {
      setIsSubmitting(true);
      
      const { error } = await supabase.auth.updateUser({ 
        password 
      });
      
      if (error) throw error;
      
      setIsResetSuccessful(true);
      toast.success('Password reset successful');
    } catch (error: any) {
      toast.error(error.message || 'Failed to reset password');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="w-full max-w-md mx-auto">
      {!isResetSuccessful ? (
        <>
          <h2 className="text-2xl font-bold text-center gold-gradient-text mb-4">
            Create New Password
          </h2>
          <p className="text-gold-light/70 text-center mb-6">
            Your new password must be at least 6 characters long.
          </p>
          
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <label htmlFor="password" className="text-sm font-medium text-gold-light">
                New Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gold-light/50 h-5 w-5" />
                <Input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="input-field pl-10"
                  placeholder="••••••••"
                  minLength={6}
                />
              </div>
            </div>
            
            <div className="space-y-2">
              <label htmlFor="confirmPassword" className="text-sm font-medium text-gold-light">
                Confirm New Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gold-light/50 h-5 w-5" />
                <Input
                  id="confirmPassword"
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                  className="input-field pl-10"
                  placeholder="••••••••"
                  minLength={6}
                />
              </div>
            </div>
            
            <Button 
              type="submit" 
              className="w-full button-primary bg-gradient-to-r from-pink-500 to-blue-500 text-white"
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Processing...' : 'Reset Password'}
            </Button>
          </form>
        </>
      ) : (
        <div className="text-center space-y-4 p-6 glass-card rounded-lg">
          <div className="mx-auto w-16 h-16 bg-green-600/20 rounded-full flex items-center justify-center">
            <Lock className="h-8 w-8 text-green-500" />
          </div>
          <h2 className="text-2xl font-bold gold-gradient-text">Password Reset Successfully</h2>
          <p className="text-gold-light/70">
            Your password has been reset successfully. You can now sign in with your new password.
          </p>
          <Button 
            className="mt-4 w-full bg-gradient-to-r from-pink-500 to-blue-500 text-white"
            onClick={() => navigate('/auth')}
          >
            Sign In
          </Button>
        </div>
      )}
    </div>
  );
};

export default ResetPassword;
