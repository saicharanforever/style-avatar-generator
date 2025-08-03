import React, { Suspense, lazy } from 'react';
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";
import { CreditsProvider } from "./contexts/CreditsContext"; 
import { ThemeProvider } from "./contexts/ThemeContext";
import { useAuth } from "./contexts/AuthContext";

// Lazy load all route components for code splitting
const Landing = lazy(() => import("./pages/Landing"));
const Index = lazy(() => import("./pages/Index"));
const Auth = lazy(() => import("./pages/Auth"));
const Pricing = lazy(() => import("./pages/Pricing"));
const NotFound = lazy(() => import("./pages/NotFound"));
const Profile = lazy(() => import("./pages/Profile"));
const PrivacyPolicy = lazy(() => import("./pages/PrivacyPolicy"));
const AdminDashboard = lazy(() => import("./components/admin/AdminDashboard"));
const ResetPassword = lazy(() => import("./components/auth/ResetPassword"));

// Loading fallback component
const LoadingFallback = () => (
  <div className="min-h-screen flex items-center justify-center">
    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
  </div>
);

// Protected route component with memo
const ProtectedRoute = React.memo(({ children }: { children: React.ReactNode }) => {
  const { user, loading } = useAuth();
  
  if (loading) return <LoadingFallback />;
  if (!user) return <Navigate to="/landing" />;
  
  return <>{children}</>;
});

// Admin route component with memo
const AdminRoute = React.memo(({ children }: { children: React.ReactNode }) => {
  const { user, loading } = useAuth();
  
  if (loading) return <LoadingFallback />;
  if (!user) return <Navigate to="/landing" />;
  if (user.email !== 'saicharanvarkala192@gmail.com') return <Navigate to="/" />;
  
  return <>{children}</>;
});

const AppRoutes = React.memo(() => {
  return (
    <Routes>
      <Route path="/landing" element={
        <Suspense fallback={<LoadingFallback />}>
          <Landing />
        </Suspense>
      } />
      <Route path="/" element={
        <ProtectedRoute>
          <Suspense fallback={<LoadingFallback />}>
            <Index />
          </Suspense>
        </ProtectedRoute>
      } />
      <Route path="/auth" element={
        <Suspense fallback={<LoadingFallback />}>
          <Auth />
        </Suspense>
      } />
      <Route path="/reset-password" element={
        <Suspense fallback={<LoadingFallback />}>
          <ResetPassword />
        </Suspense>
      } />
      <Route path="/pricing" element={
        <Suspense fallback={<LoadingFallback />}>
          <Pricing />
        </Suspense>
      } />
      <Route path="/privacy-policy" element={
        <Suspense fallback={<LoadingFallback />}>
          <PrivacyPolicy />
        </Suspense>
      } />
      <Route path="/profile" element={
        <ProtectedRoute>
          <Suspense fallback={<LoadingFallback />}>
            <Profile />
          </Suspense>
        </ProtectedRoute>
      } />
      <Route path="/admin" element={
        <AdminRoute>
          <Suspense fallback={<LoadingFallback />}>
            <AdminDashboard />
          </Suspense>
        </AdminRoute>
      } />
      <Route path="*" element={
        <Suspense fallback={<LoadingFallback />}>
          <NotFound />
        </Suspense>
      } />
    </Routes>
  );
});

// Optimize QueryClient configuration
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000, // 5 minutes
      gcTime: 10 * 60 * 1000, // 10 minutes
    },
  },
});

const App = React.memo(() => (
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
));

export default App;