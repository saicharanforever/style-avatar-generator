
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from '@/components/ui/card';
import { Loader2, Plus, Trash2, Calendar } from 'lucide-react';
import Header from '@/components/Header';
import BackgroundParticles from '@/components/BackgroundParticles';
import type { Coupon } from '@/types/coupon';

const AdminDashboard = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  
  const [coupons, setCoupons] = useState<Coupon[]>([]);
  const [loading, setLoading] = useState(true);
  const [newCoupon, setNewCoupon] = useState({
    code: '',
    credits: 0,
    usage_limit: 1,
    expiry_date: '',
    description: ''
  });
  const [submitting, setSubmitting] = useState(false);
  const [deleting, setDeleting] = useState<string | null>(null);

  // Check if the user is the admin
  const isAdmin = user?.email === 'saicharanvarkala192@gmail.com';

  useEffect(() => {
    if (!user) return;

    if (!isAdmin) {
      navigate('/');
      toast.error("You don't have permission to access this page");
      return;
    }

    const fetchCoupons = async () => {
      try {
        // Bypass RLS by using service role (for admin only)
        const { data, error } = await supabase
          .from('coupons')
          .select('*')
          .order('created_at', { ascending: false });

        if (error) throw error;
        setCoupons(data as Coupon[]);
      } catch (error: any) {
        toast.error(`Error fetching coupons: ${error.message}`);
      } finally {
        setLoading(false);
      }
    };

    fetchCoupons();
  }, [user, navigate, isAdmin]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNewCoupon({
      ...newCoupon,
      [name]: name === 'credits' || name === 'usage_limit' ? parseInt(value) || 0 : value
    });
  };

  const handleCreateCoupon = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!newCoupon.code.trim()) {
      toast.error('Please enter a coupon code');
      return;
    }

    if (newCoupon.credits <= 0) {
      toast.error('Credits must be greater than 0');
      return;
    }

    if (newCoupon.usage_limit <= 0) {
      toast.error('Usage limit must be greater than 0');
      return;
    }

    try {
      setSubmitting(true);
      
      // Check if code already exists
      const { data: existingCoupon } = await supabase
        .from('coupons')
        .select('code')
        .eq('code', newCoupon.code.toUpperCase())
        .single();
      
      if (existingCoupon) {
        toast.error('This coupon code already exists');
        return;
      }

      // Use RPC function for admin operations - Fix the TS error by using proper typing
      const { error } = await supabase
        .rpc('admin_create_coupon', {
          p_code: newCoupon.code.toUpperCase(),
          p_credits: newCoupon.credits,
          p_usage_limit: newCoupon.usage_limit,
          p_expiry_date: newCoupon.expiry_date || null,
          p_description: newCoupon.description || null
        } as any); // Using 'as any' to bypass TypeScript error until types are updated

      if (error) throw error;
      
      toast.success('Coupon created successfully!');
      
      // Fetch updated coupons
      const { data: updatedCoupons, error: fetchError } = await supabase
        .from('coupons')
        .select('*')
        .order('created_at', { ascending: false });
      
      if (fetchError) throw fetchError;
      setCoupons(updatedCoupons as Coupon[]);
      
      // Reset form
      setNewCoupon({
        code: '',
        credits: 0,
        usage_limit: 1,
        expiry_date: '',
        description: ''
      });
    } catch (error: any) {
      toast.error(`Error creating coupon: ${error.message}`);
    } finally {
      setSubmitting(false);
    }
  };

  const handleDeleteCoupon = async (id: string) => {
    if (window.confirm('Are you sure you want to delete this coupon?')) {
      try {
        setDeleting(id);
        
        // Use RPC function for admin operations - Fix the TS error by using proper typing
        const { error } = await supabase
          .rpc('admin_delete_coupon', {
            p_coupon_id: id
          } as any); // Using 'as any' to bypass TypeScript error until types are updated
        
        if (error) throw error;
        
        setCoupons(coupons.filter(coupon => coupon.id !== id));
        toast.success('Coupon deleted successfully!');
      } catch (error: any) {
        toast.error(`Error deleting coupon: ${error.message}`);
      } finally {
        setDeleting(null);
      }
    }
  };

  if (!isAdmin && !loading) {
    return null;
  }

  return (
    <div className="min-h-screen px-4 pb-12 max-w-6xl mx-auto relative">
      <BackgroundParticles />
      <Header />
      
      <div className="mt-8">
        <h1 className="text-3xl font-bold mb-6 gold-gradient-text">Admin Dashboard</h1>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Create Coupon Form */}
          <Card className="bg-navy-light/60 backdrop-blur-md border border-white/10">
            <CardHeader>
              <CardTitle className="text-xl text-gold">Create New Coupon</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleCreateCoupon} className="space-y-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gold-light">
                    Coupon Code*
                  </label>
                  <Input
                    name="code"
                    value={newCoupon.code}
                    onChange={handleInputChange}
                    placeholder="SUMMER2025"
                    className="input-field"
                  />
                </div>
                
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gold-light">
                    Credits*
                  </label>
                  <Input
                    name="credits"
                    type="number"
                    value={newCoupon.credits}
                    onChange={handleInputChange}
                    min="1"
                    className="input-field"
                  />
                </div>
                
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gold-light">
                    Usage Limit*
                  </label>
                  <Input
                    name="usage_limit"
                    type="number"
                    value={newCoupon.usage_limit}
                    onChange={handleInputChange}
                    min="1"
                    className="input-field"
                  />
                </div>
                
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gold-light flex items-center gap-2">
                    <Calendar className="h-4 w-4" />
                    Expiry Date (Optional)
                  </label>
                  <Input
                    name="expiry_date"
                    type="date"
                    value={newCoupon.expiry_date}
                    onChange={handleInputChange}
                    className="input-field"
                  />
                </div>
                
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gold-light">
                    Description (Optional)
                  </label>
                  <Input
                    name="description"
                    value={newCoupon.description}
                    onChange={handleInputChange}
                    placeholder="Special offer for new users"
                    className="input-field"
                  />
                </div>
              </form>
            </CardContent>
            <CardFooter>
              <Button 
                onClick={handleCreateCoupon}
                disabled={submitting}
                className="w-full bg-gradient-to-r from-blue-500 to-pink-500 hover:from-blue-600 hover:to-pink-600"
              >
                {submitting ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Creating...
                  </>
                ) : (
                  <>
                    <Plus className="mr-2 h-4 w-4" />
                    Create Coupon
                  </>
                )}
              </Button>
            </CardFooter>
          </Card>
          
          {/* Coupons List */}
          <Card className="bg-navy-light/60 backdrop-blur-md border border-white/10">
            <CardHeader>
              <CardTitle className="text-xl text-gold">Active Coupons</CardTitle>
            </CardHeader>
            <CardContent>
              {loading ? (
                <div className="flex justify-center p-8">
                  <Loader2 className="h-8 w-8 animate-spin text-gold" />
                </div>
              ) : coupons.length === 0 ? (
                <div className="text-center py-8 text-gold-light/70">
                  No coupons created yet
                </div>
              ) : (
                <div className="divide-y divide-white/10">
                  {coupons.map((coupon) => (
                    <div key={coupon.id} className="py-4 first:pt-0 last:pb-0">
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="text-lg font-medium text-gold">{coupon.code}</h3>
                          <p className="text-sm text-gold-light/70">
                            {coupon.credits} credits | Used: {coupon.usage_count}/{coupon.usage_limit}
                          </p>
                          {coupon.expiry_date && (
                            <p className="text-xs text-gold-light/60">
                              Expires: {new Date(coupon.expiry_date).toLocaleDateString()}
                            </p>
                          )}
                          {coupon.description && (
                            <p className="text-xs text-gold-light/80 mt-1">
                              {coupon.description}
                            </p>
                          )}
                        </div>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => handleDeleteCoupon(coupon.id)}
                          disabled={deleting === coupon.id}
                          className="text-red-400 hover:text-red-300 hover:bg-red-900/20"
                        >
                          {deleting === coupon.id ? (
                            <Loader2 className="h-4 w-4 animate-spin" />
                          ) : (
                            <Trash2 className="h-4 w-4" />
                          )}
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
