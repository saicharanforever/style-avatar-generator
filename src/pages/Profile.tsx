
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { useTheme } from '@/contexts/ThemeContext';
import CouponRedemption from '@/components/user/CouponRedemption';
import { Card, CardContent } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { UserCircle, Ticket, Home, LogOut } from 'lucide-react';

const Profile = () => {
  const { user, signOut } = useAuth();
  const { theme } = useTheme();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('account');

  if (!user) {
    navigate('/auth');
    return null;
  }

  const handleLogout = async () => {
    await signOut();
    navigate('/landing');
  };
  
  const handleHomeClick = () => {
    navigate('/');
  };

  return (
    <div className={`min-h-screen ${theme === 'dark' ? 'bg-navy' : 'bg-white'}`}>
      {/* Header */}
      <div className={`sticky top-0 z-50 ${theme === 'dark' ? 'bg-navy/80 backdrop-blur-md' : 'bg-white/80 backdrop-blur-md'} border-b ${theme === 'dark' ? 'border-white/10' : 'border-gray-200'}`}>
        <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
          <h1 className={`text-2xl font-bold ${theme === 'dark' ? 'text-gold' : 'text-[#5D3FD3]'}`}>
            TrylumDressing
          </h1>
          <Button 
            onClick={handleHomeClick}
            className={`flex items-center gap-2 ${theme === 'dark' ? 'bg-gold text-navy-dark hover:bg-gold-dark' : 'bg-gradient-to-r from-blue-500 to-pink-500 text-white hover:from-blue-600 hover:to-pink-600'}`}
          >
            <Home className="h-4 w-4" />
            Back to Home
          </Button>
        </div>
      </div>
      
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="mb-8">
          <h2 className={`text-3xl font-bold mb-2 ${theme === 'dark' ? 'text-gold' : 'text-[#5D3FD3]'}`}>
            Your Profile
          </h2>
          <p className={`${theme === 'dark' ? 'text-gold-light/70' : 'text-gray-600'}`}>
            Manage your account settings and preferences
          </p>
        </div>
        
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className={`grid grid-cols-2 max-w-md mx-auto ${theme === 'dark' ? 'bg-navy-light/60' : 'bg-gray-100'}`}>
            <TabsTrigger 
              value="account" 
              className={`${theme === 'dark' ? 'data-[state=active]:text-gold data-[state=active]:bg-navy-light text-gold-light' : 'data-[state=active]:text-[#5D3FD3] data-[state=active]:bg-white text-gray-600'}`}
            >
              <UserCircle className="mr-2 h-4 w-4" />
              Account
            </TabsTrigger>
            <TabsTrigger 
              value="coupons" 
              className={`${theme === 'dark' ? 'data-[state=active]:text-gold data-[state=active]:bg-navy-light text-gold-light' : 'data-[state=active]:text-[#5D3FD3] data-[state=active]:bg-white text-gray-600'}`}
            >
              <Ticket className="mr-2 h-4 w-4" />
              Coupons
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="account" className="mt-8">
            <Card className={`${theme === 'dark' ? 'bg-navy-light/60 border-white/10' : 'bg-white border-gray-200'} shadow-lg`}>
              <CardContent className="pt-6">
                <div className="space-y-6">
                  <div className="flex items-center space-x-4">
                    <div className={`w-16 h-16 rounded-full ${theme === 'dark' ? 'bg-gold/20' : 'bg-gradient-to-r from-blue-500/20 to-pink-500/20'} flex items-center justify-center`}>
                      <UserCircle className={`h-8 w-8 ${theme === 'dark' ? 'text-gold' : 'text-[#5D3FD3]'}`} />
                    </div>
                    <div>
                      <h3 className={`text-xl font-semibold ${theme === 'dark' ? 'text-gold' : 'text-[#5D3FD3]'}`}>
                        Account Details
                      </h3>
                      <p className={`${theme === 'dark' ? 'text-gold-light/70' : 'text-gray-600'}`}>
                        Your account information
                      </p>
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    <div className={`p-4 rounded-lg ${theme === 'dark' ? 'bg-navy-dark/30' : 'bg-gray-50'}`}>
                      <label className={`block text-sm font-medium mb-2 ${theme === 'dark' ? 'text-gold-light/70' : 'text-gray-700'}`}>
                        Email Address
                      </label>
                      <p className={`font-medium ${theme === 'dark' ? 'text-gold-light' : 'text-black font-bold'}`}>
                        {user.email}
                      </p>
                    </div>
                    
                    <div className={`p-4 rounded-lg ${theme === 'dark' ? 'bg-navy-dark/30' : 'bg-gray-50'}`}>
                      <label className={`block text-sm font-medium mb-2 ${theme === 'dark' ? 'text-gold-light/70' : 'text-gray-700'}`}>
                        Account Status
                      </label>
                      <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${theme === 'dark' ? 'bg-green-900/30 text-green-300' : 'bg-green-100 text-green-800'}`}>
                        Active
                      </span>
                    </div>
                  </div>
                  
                  <div className="pt-6 border-t border-gray-200">
                    <Button 
                      onClick={handleLogout}
                      className={`w-full ${theme === 'dark' ? 'bg-red-800/30 hover:bg-red-800/50 text-red-200' : 'bg-red-500 hover:bg-red-600 text-white'}`}
                    >
                      <LogOut className="mr-2 h-4 w-4" />
                      Sign Out
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="coupons" className="mt-8">
            <CouponRedemption />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Profile;
