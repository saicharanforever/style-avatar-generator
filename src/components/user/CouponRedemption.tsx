
import React, { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useCredits } from '@/contexts/CreditsContext';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Loader2 } from 'lucide-react';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import type { Coupon } from '@/types/coupon';

const CouponRedemption = () => {
  const { user } = useAuth();
  const { refreshCredits } = useCredits();
  const [couponCode, setCouponCode] = useState('');
  const [loading, setLoading] = useState(false);

  const handleRedeemCoupon = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!couponCode.trim()) {
      toast.error('Please enter a coupon code');
      return;
    }
    
    if (!user) {
      toast.error('You must be logged in to redeem coupons');
      return;
    }
    
    try {
      setLoading(true);
      
      // Check if coupon exists and is valid
      const { data: coupon, error: couponError } = await supabase
        .from('coupons')
        .select('*')
        .eq('code', couponCode.toUpperCase())
        .single();
      
      if (couponError || !coupon) {
        toast.error('Invalid coupon code');
        return;
      }
      
      const typedCoupon = coupon as Coupon;
      
      // Check if coupon has reached usage limit
      if (typedCoupon.usage_count >= typedCoupon.usage_limit) {
        toast.error('This coupon has reached its usage limit');
        return;
      }
      
      // Check if coupon is expired
      if (typedCoupon.expiry_date && new Date(typedCoupon.expiry_date) < new Date()) {
        toast.error('This coupon has expired');
        return;
      }
      
      // Check if user has already used this coupon
      const { data: existingRedemption, error: redemptionError } = await supabase
        .from('coupon_redemptions')
        .select('*')
        .eq('user_id', user.id)
        .eq('coupon_id', typedCoupon.id)
        .single();
      
      if (existingRedemption) {
        toast.error('You have already used this coupon');
        return;
      }
      
      // Update user credits
      const { error: updateError } = await supabase
        .from('user_credits')
        .update({ credits: credits.credits + typedCoupon.credits })
        .eq('user_id', user.id);
      
      if (updateError) {
        toast.error('Error applying credits to your account');
        return;
      }
      
      // Increment coupon usage count
      const { error: couponUpdateError } = await supabase
        .from('coupons')
        .update({ usage_count: typedCoupon.usage_count + 1 })
        .eq('id', typedCoupon.id);
      
      if (couponUpdateError) {
        console.error('Error updating coupon usage count:', couponUpdateError);
      }
      
      // Record the redemption
      const { error: redemptionInsertError } = await supabase
        .from('coupon_redemptions')
        .insert({
          user_id: user.id,
          coupon_id: typedCoupon.id,
          credits_added: typedCoupon.credits
        });
      
      if (redemptionInsertError) {
        console.error('Error recording coupon redemption:', redemptionInsertError);
      }
      
      // Refresh the credits context
      await refreshCredits();
      
      toast.success(`Success! ${typedCoupon.credits} credits added to your account`);
      setCouponCode('');
    } catch (error: any) {
      toast.error(`Error redeeming coupon: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="bg-navy-light/60 backdrop-blur-md border border-white/10">
      <CardHeader>
        <CardTitle className="text-xl text-gold">Redeem a Coupon</CardTitle>
        <CardDescription className="text-gold-light/70">
          Enter a valid coupon code to add credits to your account
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleRedeemCoupon} className="space-y-4">
          <div className="flex space-x-2">
            <Input
              value={couponCode}
              onChange={(e) => setCouponCode(e.target.value)}
              placeholder="SUMMER2025"
              className="input-field uppercase"
            />
            <Button 
              type="submit" 
              disabled={loading || !couponCode.trim()}
              className="bg-gradient-to-r from-blue-500 to-pink-500 hover:from-blue-600 hover:to-pink-600"
            >
              {loading ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                'Redeem'
              )}
            </Button>
          </div>
        </form>
      </CardContent>
      <CardFooter>
        <p className="text-xs text-gold-light/60">
          Note: Each coupon can only be used once per account
        </p>
      </CardFooter>
    </Card>
  );
};

export default CouponRedemption;
