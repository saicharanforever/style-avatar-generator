
import React, { createContext, useContext, useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from './AuthContext';
import { toast } from 'sonner';
import { Database } from '@/integrations/supabase/types';

type UserCredits = Database['public']['Tables']['user_credits']['Row'];

type CreditsContextType = {
  credits: number;
  totalGenerated: number;
  regenerations: number;
  loading: boolean;
  error: string | null;
  consumeCredits: (amount: number, isRegeneration: boolean) => Promise<boolean>;
  refreshCredits: () => Promise<void>;
};

const CreditsContext = createContext<CreditsContextType | undefined>(undefined);

export const CreditsProvider = ({ children }: { children: React.ReactNode }) => {
  const { user } = useAuth();
  const [credits, setCredits] = useState(0);
  const [totalGenerated, setTotalGenerated] = useState(0);
  const [regenerations, setRegenerations] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchCredits = async () => {
    if (!user) {
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      // First, check if a user_credits record already exists for this Clerk user
      const { data, error } = await supabase
        .from('user_credits')
        .select('*')
        .eq('user_id', user.id)
        .maybeSingle();

      if (error && error.code !== 'PGRST116') {
        // PGRST116 is the error code for "no rows returned"
        throw error;
      }

      if (data) {
        // User already has a credits record
        setCredits(data.credits);
        setTotalGenerated(data.total_generated);
        setRegenerations(data.regenerations);
      } else {
        // No user_credits found, create a new record with default values
        const { error: insertError } = await supabase
          .from('user_credits')
          .insert({
            user_id: user.id,
            credits: 100, // Default 100 free credits
            total_generated: 0,
            regenerations: 0
          });

        if (insertError) throw insertError;
        
        // Set default values in state
        setCredits(100);
        setTotalGenerated(0);
        setRegenerations(0);
        
        toast.success('Welcome! 100 free credits have been added to your account.');
      }
    } catch (err: any) {
      console.error("Error fetching credits:", err);
      setError(err.message);
      toast.error('Failed to load credits information');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user) {
      fetchCredits();
    }
  }, [user]);

  const refreshCredits = async () => {
    await fetchCredits();
  };

  const consumeCredits = async (amount: number, isRegeneration: boolean): Promise<boolean> => {
    if (!user) return false;

    // For regenerations, we'll check if it's within the free limit (3 times)
    let actualAmount = amount;
    let updatedRegenerations = regenerations;
    
    if (isRegeneration) {
      updatedRegenerations += 1;
      if (updatedRegenerations <= 3) {
        actualAmount = 0; // Free regeneration
      }
    }

    // Check if user has enough credits
    if (credits < actualAmount) {
      toast.error('Not enough credits. Please purchase more.');
      return false;
    }

    try {
      // Update the credits in the database
      const { error } = await supabase
        .from('user_credits')
        .update({
          credits: credits - actualAmount,
          total_generated: isRegeneration ? totalGenerated : totalGenerated + 1,
          regenerations: updatedRegenerations,
          updated_at: new Date().toISOString()
        })
        .eq('user_id', user.id);

      if (error) throw error;

      // Update local state
      setCredits(credits - actualAmount);
      if (!isRegeneration) {
        setTotalGenerated(totalGenerated + 1);
      }
      setRegenerations(updatedRegenerations);

      return true;
    } catch (err: any) {
      console.error("Error consuming credits:", err);
      setError(err.message);
      toast.error('Failed to update credits');
      return false;
    }
  };

  return (
    <CreditsContext.Provider value={{ 
      credits, 
      totalGenerated, 
      regenerations,
      loading, 
      error,
      consumeCredits,
      refreshCredits
    }}>
      {children}
    </CreditsContext.Provider>
  );
};

export const useCredits = () => {
  const context = useContext(CreditsContext);
  if (context === undefined) {
    throw new Error('useCredits must be used within a CreditsProvider');
  }
  return context;
};
