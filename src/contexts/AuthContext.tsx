
import React, { createContext, useContext } from 'react';
import { 
  useAuth as useClerkAuth, 
  useUser, 
  SignIn, 
  SignUp, 
  SignedIn, 
  SignedOut,
  useClerk
} from '@clerk/clerk-react';
import { toast } from 'sonner';

type AuthContextType = {
  user: any | null;
  session: any | null;
  signIn: (redirectUrl?: string) => void;
  signUp: (redirectUrl?: string) => void;
  signOut: () => Promise<void>;
  loading: boolean;
  signInWithGoogle: () => void;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const { isLoaded: isClerkLoaded, userId, sessionId } = useClerkAuth();
  const { user } = useUser();
  const { signOut: clerkSignOut } = useClerk();
  const clerk = useClerk();

  // Handle sign in with custom UI
  const handleSignIn = (redirectUrl?: string) => {
    clerk.openSignIn({ redirectUrl });
  };
  
  // Handle sign up with custom UI
  const handleSignUp = (redirectUrl?: string) => {
    clerk.openSignUp({ redirectUrl });
  };

  // Handle sign in with Google
  const signInWithGoogle = () => {
    // Use the OAuth provider directly without specifying strategy
    clerk.openSignIn({ 
      redirectUrl: window.location.origin,
      signInUrl: "/sign-in",
      appearance: {
        elements: {
          socialButtonsBlockButton: {
            value: "google", // This will only display the Google button
          },
        },
      },
    });
  };

  // Handle sign out
  const handleSignOut = async () => {
    try {
      await clerkSignOut();
      toast.success('Successfully signed out');
    } catch (error: any) {
      toast.error(error.message || 'Error signing out');
    }
  };
  
  // Map to maintain compatibility with existing code
  const contextValue = {
    user: user ? { 
      id: userId, 
      email: user.primaryEmailAddress?.emailAddress,
      metadata: user.publicMetadata 
    } : null,
    session: sessionId ? { id: sessionId } : null,
    signIn: handleSignIn,
    signUp: handleSignUp,
    signOut: handleSignOut,
    loading: !isClerkLoaded,
    signInWithGoogle
  };
  
  return (
    <AuthContext.Provider value={contextValue}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
