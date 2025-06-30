
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";
import { CreditsProvider } from "./contexts/CreditsContext"; 
import { ThemeProvider } from "./contexts/ThemeContext";
import Landing from "./pages/Landing";
import Index from "./pages/Index";
import Auth from "./pages/Auth";
import Pricing from "./pages/Pricing";
import NotFound from "./pages/NotFound";
import Profile from "./pages/Profile";
import AdminDashboard from "./components/admin/AdminDashboard";
import ResetPassword from "./components/auth/ResetPassword";
import { useAuth } from "./contexts/AuthContext";

// Protected route component
const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { user, loading } = useAuth();
  
  // While checking auth state, show nothing
  if (loading) return null;
  
  // If not authenticated, redirect to landing page
  if (!user) return <Navigate to="/landing" />;
  
  // If authenticated, show the requested page
  return <>{children}</>;
};

// Admin route component
const AdminRoute = ({ children }: { children: React.ReactNode }) => {
  const { user, loading } = useAuth();
  
  // While checking auth state, show nothing
  if (loading) return null;
  
  // If not authenticated or not admin, redirect
  if (!user) return <Navigate to="/landing" />;
  if (user.email !== 'saicharanvarkala192@gmail.com') return <Navigate to="/" />;
  
  // If authenticated and admin, show the requested page
  return <>{children}</>;
};

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/landing" element={<Landing />} />
      <Route path="/" element={
        <ProtectedRoute>
          <Index />
        </ProtectedRoute>
      } />
      <Route path="/auth" element={<Auth />} />
      <Route path="/reset-password" element={<ResetPassword />} />
      <Route path="/pricing" element={<Pricing />} />
      <Route path="/profile" element={
        <ProtectedRoute>
          <Profile />
        </ProtectedRoute>
      } />
      <Route path="/admin" element={
        <AdminRoute>
          <AdminDashboard />
        </AdminRoute>
      } />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <ThemeProvider>
          <AuthProvider>
            <CreditsProvider>
              <AppRoutes />
            </CreditsProvider>
          </AuthProvider>
        </ThemeProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
