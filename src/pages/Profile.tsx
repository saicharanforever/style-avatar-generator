
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import Header from '@/components/Header';
import BackgroundParticles from '@/components/BackgroundParticles';
import CouponRedemption from '@/components/user/CouponRedemption';
import { Card, CardContent } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { UserCircle, Ticket, Home } from 'lucide-react';

const Profile = () => {
  const { user, signOut } = useAuth();
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
    <div className="min-h-screen px-4 pb-12 max-w-4xl mx-auto relative">
      <BackgroundParticles />
      <Header />
      
      <div className="mt-8">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-3xl font-bold gold-gradient-text">Your Profile</h1>
          <Button 
            onClick={handleHomeClick}
            className="flex items-center gap-2 bg-blue-600 text-white hover:bg-blue-700"
          >
            <Home className="h-4 w-4" />
            Back to Home
          </Button>
        </div>
        
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid grid-cols-2 max-w-md mx-auto bg-navy-light/60 backdrop-blur-md">
            <TabsTrigger value="account" className="data-[state=active]:text-gold">
              <UserCircle className="mr-2 h-4 w-4" />
              Account
            </TabsTrigger>
            <TabsTrigger value="coupons" className="data-[state=active]:text-gold">
              <Ticket className="mr-2 h-4 w-4" />
              Coupons
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="account" className="mt-6">
            <Card className="bg-navy-light/60 backdrop-blur-md border border-white/10">
              <CardContent className="pt-6">
                <div className="space-y-4">
                  <div className="space-y-1">
                    <p className="text-sm font-medium text-gold-light/70">Email</p>
                    <p className="font-medium text-gold-light">{user.email}</p>
                  </div>
                  
                  <div className="pt-4">
                    <Button 
                      onClick={handleLogout}
                      className="w-full bg-red-800/30 hover:bg-red-800/50 text-red-200"
                    >
                      Sign Out
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="coupons" className="mt-6">
            <CouponRedemption />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Profile;
