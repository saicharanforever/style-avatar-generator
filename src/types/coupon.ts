
export type Coupon = {
  id: string;
  code: string;
  credits: number;
  usage_limit: number;
  usage_count: number;
  expiry_date: string | null;
  description: string | null;
  created_at: string;
};

export type CouponRedemption = {
  id: string;
  user_id: string;
  coupon_id: string;
  credits_added: number;
  redeemed_at: string;
};
