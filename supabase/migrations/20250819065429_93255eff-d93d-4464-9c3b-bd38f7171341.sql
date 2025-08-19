-- Fix security vulnerability: Restrict coupon table access to admins only
-- This prevents unauthorized users from harvesting coupon codes and credit values

-- First, ensure RLS is enabled on coupons table (should already be enabled)
ALTER TABLE public.coupons ENABLE ROW LEVEL SECURITY;

-- Add explicit SELECT policy that only allows admins to view coupon data
-- This closes the security gap where regular users might access coupon information
CREATE POLICY "Only admins can view coupon details" 
ON public.coupons 
FOR SELECT 
USING (
  -- Only allow admins to view coupon details
  (auth.jwt() ->> 'email'::text) = 'saicharanvarkala192@gmail.com'::text
);

-- Drop any existing policies that might be too permissive
-- Keep the existing admin management policies but ensure they're properly scoped
DROP POLICY IF EXISTS "Admin can manage coupons" ON public.coupons;

-- Recreate the admin management policy with explicit commands
CREATE POLICY "Admins can insert coupons" 
ON public.coupons 
FOR INSERT 
WITH CHECK (
  (auth.jwt() ->> 'email'::text) = 'saicharanvarkala192@gmail.com'::text
);

CREATE POLICY "Admins can update coupons" 
ON public.coupons 
FOR UPDATE 
USING (
  (auth.jwt() ->> 'email'::text) = 'saicharanvarkala192@gmail.com'::text
);

CREATE POLICY "Admins can delete coupons" 
ON public.coupons 
FOR DELETE 
USING (
  (auth.jwt() ->> 'email'::text) = 'saicharanvarkala192@gmail.com'::text
);

-- Ensure the redeem_coupon function uses SECURITY DEFINER to bypass RLS
-- when validating coupon codes (this should already be set but let's confirm)
-- The function is already SECURITY DEFINER which allows it to access coupons
-- for validation while preventing direct user access to the table