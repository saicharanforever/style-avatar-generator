
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
      const { data, error } = await supabase
        .from('user_credits')
        .select('*')
        .eq('user_id', user.id)
        .single();

      if (error) throw error;

      if (data) {
        setCredits(data.credits);
        setTotalGenerated(data.total_generated);
        setRegenerations(data.regenerations);
      }
    } catch (err: any) {
      setError(err.message);
      toast.error('Failed to load credits information');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCredits();
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
