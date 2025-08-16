-- Remove the insecure policy that allows all users to view all coupons
DROP POLICY IF EXISTS "Users can view coupons" ON public.coupons;

-- Create a secure function for coupon redemption that doesn't expose coupon data
CREATE OR REPLACE FUNCTION public.redeem_coupon(p_coupon_code text)
RETURNS json
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
  v_coupon_record RECORD;
  v_user_id uuid;
  v_existing_redemption_count integer;
  v_current_credits integer;
  v_new_credits integer;
BEGIN
  -- Get the current user ID
  v_user_id := auth.uid();
  
  -- Check if user is authenticated
  IF v_user_id IS NULL THEN
    RETURN json_build_object('success', false, 'error', 'User not authenticated');
  END IF;
  
  -- Get coupon details (only if valid and not expired)
  SELECT id, credits, usage_limit, usage_count, expiry_date
  INTO v_coupon_record
  FROM public.coupons
  WHERE code = p_coupon_code
    AND (expiry_date IS NULL OR expiry_date > now())
    AND usage_count < usage_limit;
  
  -- Check if coupon exists and is valid
  IF v_coupon_record.id IS NULL THEN
    RETURN json_build_object('success', false, 'error', 'Invalid or expired coupon code');
  END IF;
  
  -- Check if user has already redeemed this coupon
  SELECT COUNT(*)
  INTO v_existing_redemption_count
  FROM public.coupon_redemptions
  WHERE user_id = v_user_id AND coupon_id = v_coupon_record.id;
  
  IF v_existing_redemption_count > 0 THEN
    RETURN json_build_object('success', false, 'error', 'You have already redeemed this coupon');
  END IF;
  
  -- Get current user credits
  SELECT credits INTO v_current_credits
  FROM public.user_credits
  WHERE user_id = v_user_id;
  
  -- Calculate new credits
  v_new_credits := v_current_credits + v_coupon_record.credits;
  
  -- Update user credits
  UPDATE public.user_credits
  SET credits = v_new_credits, updated_at = now()
  WHERE user_id = v_user_id;
  
  -- Increment coupon usage count
  UPDATE public.coupons
  SET usage_count = usage_count + 1
  WHERE id = v_coupon_record.id;
  
  -- Record the redemption
  INSERT INTO public.coupon_redemptions (user_id, coupon_id, credits_added)
  VALUES (v_user_id, v_coupon_record.id, v_coupon_record.credits);
  
  -- Return success with credits added
  RETURN json_build_object(
    'success', true, 
    'credits_added', v_coupon_record.credits,
    'new_total', v_new_credits
  );
  
EXCEPTION
  WHEN OTHERS THEN
    RETURN json_build_object('success', false, 'error', 'An error occurred while redeeming the coupon');
END;
$$;