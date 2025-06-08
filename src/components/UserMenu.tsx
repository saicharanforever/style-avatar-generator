
import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { User, LogOut, Ticket, Shield, Coins } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';

const UserMenu = () => {
  const { user, signOut } = useAuth();
  const navigate = useNavigate();
  
  if (!user) {
    return (
      <Button 
        className="rounded-full px-4 bg-gradient-to-r from-pink-500 to-blue-500 text-white hover:from-pink-600 hover:to-blue-600 border border-white/10"
        onClick={() => navigate('/landing')}
      >
        Sign In
      </Button>
    );
  }

  const userEmail = user.email || '';
  const initials = userEmail
    .split('@')[0]
    .split('.')
    .map(name => name[0]?.toUpperCase() || '')
    .join('')
    .slice(0, 2);
    
  const handleSignOut = async () => {
    await signOut();
    navigate('/landing');
  };

  const isAdmin = userEmail === 'saicharanvarkala192@gmail.com';

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="relative h-10 w-10 rounded-full">
          <Avatar className="h-10 w-10 border border-gold/20">
            <AvatarImage src="" alt={userEmail} />
            <AvatarFallback className="bg-navy-light text-gold">
              {initials}
            </AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56 glass-card" align="end">
        <DropdownMenuLabel className="font-normal">
          <div className="flex flex-col space-y-1">
            <p className="text-sm font-medium leading-none text-gold">Account</p>
            <p className="text-xs leading-none text-gold-light/70 truncate max-w-[200px]">
              {userEmail}
            </p>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem 
          className="flex cursor-pointer items-center text-gold-light/90 hover:text-gold-light"
          onClick={() => navigate('/profile')}
        >
          <User className="mr-2 h-4 w-4" />
          <span>Profile</span>
        </DropdownMenuItem>
        <DropdownMenuItem 
          className="flex cursor-pointer items-center text-gold-light/90 hover:text-gold-light"
          onClick={() => navigate('/profile?tab=coupons')}
        >
          <Ticket className="mr-2 h-4 w-4" />
          <span>Coupons</span>
        </DropdownMenuItem>
        <DropdownMenuItem 
          className="flex cursor-pointer items-center text-gold-light/90 hover:text-gold-light"
          onClick={() => navigate('/pricing')}
        >
          <Coins className="mr-2 h-4 w-4" />
          <span>Get More Credits</span>
        </DropdownMenuItem>
        
        {isAdmin && (
          <>
            <DropdownMenuSeparator />
            <DropdownMenuItem 
              className="flex cursor-pointer items-center text-gold-light/90 hover:text-gold-light"
              onClick={() => navigate('/admin')}
            >
              <Shield className="mr-2 h-4 w-4" />
              <span>Admin Dashboard</span>
            </DropdownMenuItem>
          </>
        )}
        
        <DropdownMenuSeparator />
        <DropdownMenuItem 
          className="flex cursor-pointer items-center text-gold-light/90 hover:text-gold-light"
          onClick={handleSignOut}
        >
          <LogOut className="mr-2 h-4 w-4" />
          <span>Log out</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default UserMenu;
