import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useTheme } from '@/contexts/ThemeContext';

const PrivacyPolicy = () => {
  const navigate = useNavigate();
  const { theme } = useTheme();

  return (
    <div className={`min-h-screen px-4 py-8 ${
      theme === 'light' 
        ? 'bg-gradient-to-br from-white via-purple-50 to-pink-50' 
        : 'bg-navy-dark'
    }`}>
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <Button
            onClick={() => navigate(-1)}
            variant="ghost"
            className="mb-4 flex items-center gap-2"
          >
            <ArrowLeft className="h-4 w-4" />
            Back
          </Button>
          
          <h1 className={`text-4xl md:text-5xl font-bold mb-4 ${
            theme === 'light' 
              ? 'bg-gradient-to-r from-purple-700 via-purple-800 to-pink-700 bg-clip-text text-transparent' 
              : 'gold-gradient-text'
          }`}>
            Privacy Policy
          </h1>
          
          <p className={`text-sm ${
            theme === 'light' ? 'text-gray-600' : 'text-gray-400'
          }`}>
            Last updated: {new Date().toLocaleDateString()}
          </p>
        </div>

        {/* Content */}
        <div className={`prose max-w-none ${
          theme === 'light' ? 'text-gray-800' : 'text-gray-200'
        }`}>
          
          <section className="mb-8">
            <h2 className={`text-2xl font-semibold mb-4 ${
              theme === 'light' ? 'text-purple-700' : 'text-gold-light'
            }`}>
              1. Information We Collect
            </h2>
            <div className="space-y-4">
              <p>
                At Trylum, we collect information you provide directly to us, such as when you create an account, 
                upload images for processing, or contact us for support.
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li><strong>Account Information:</strong> Name, email address, and password</li>
                <li><strong>Usage Data:</strong> Images uploaded, generation preferences, and usage patterns</li>
                <li><strong>Payment Information:</strong> Billing details for subscription services</li>
                <li><strong>Technical Data:</strong> IP address, browser type, and device information</li>
              </ul>
            </div>
          </section>

          <section className="mb-8">
            <h2 className={`text-2xl font-semibold mb-4 ${
              theme === 'light' ? 'text-purple-700' : 'text-gold-light'
            }`}>
              2. How We Use Your Information
            </h2>
            <div className="space-y-4">
              <p>We use the information we collect to:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Provide and improve our AI-powered fashion visualization services</li>
                <li>Process your image generation requests</li>
                <li>Manage your account and subscriptions</li>
                <li>Send you service-related communications</li>
                <li>Analyze usage patterns to enhance our platform</li>
                <li>Ensure platform security and prevent fraud</li>
              </ul>
            </div>
          </section>

          <section className="mb-8">
            <h2 className={`text-2xl font-semibold mb-4 ${
              theme === 'light' ? 'text-purple-700' : 'text-gold-light'
            }`}>
              3. Image Processing and Storage
            </h2>
            <div className="space-y-4">
              <p>
                Your uploaded images are processed using advanced AI technology to generate fashion visualizations. 
                We implement strict security measures to protect your images:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Images are encrypted during transmission and storage</li>
                <li>Generated images are automatically deleted after 30 days unless saved to your account</li>
                <li>We do not use your images to train our AI models without explicit consent</li>
                <li>Access to your images is restricted to authorized personnel only</li>
              </ul>
            </div>
          </section>

          <section className="mb-8">
            <h2 className={`text-2xl font-semibold mb-4 ${
              theme === 'light' ? 'text-purple-700' : 'text-gold-light'
            }`}>
              4. Information Sharing
            </h2>
            <div className="space-y-4">
              <p>
                We do not sell, trade, or rent your personal information to third parties. We may share 
                information in the following circumstances:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>With service providers who assist in platform operations</li>
                <li>When required by law or to protect our rights</li>
                <li>In connection with a business transaction (merger, acquisition, etc.)</li>
                <li>With your explicit consent</li>
              </ul>
            </div>
          </section>

          <section className="mb-8">
            <h2 className={`text-2xl font-semibold mb-4 ${
              theme === 'light' ? 'text-purple-700' : 'text-gold-light'
            }`}>
              5. Data Security
            </h2>
            <div className="space-y-4">
              <p>
                We implement industry-standard security measures to protect your information:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>SSL encryption for all data transmission</li>
                <li>Regular security audits and monitoring</li>
                <li>Secure cloud storage with redundant backups</li>
                <li>Access controls and authentication protocols</li>
              </ul>
            </div>
          </section>

          <section className="mb-8">
            <h2 className={`text-2xl font-semibold mb-4 ${
              theme === 'light' ? 'text-purple-700' : 'text-gold-light'
            }`}>
              6. Your Rights
            </h2>
            <div className="space-y-4">
              <p>You have the right to:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Access and update your personal information</li>
                <li>Delete your account and associated data</li>
                <li>Export your data in a portable format</li>
                <li>Opt out of marketing communications</li>
                <li>Request information about how your data is processed</li>
              </ul>
            </div>
          </section>

          <section className="mb-8">
            <h2 className={`text-2xl font-semibold mb-4 ${
              theme === 'light' ? 'text-purple-700' : 'text-gold-light'
            }`}>
              7. Cookies and Tracking
            </h2>
            <div className="space-y-4">
              <p>
                We use cookies and similar technologies to enhance your experience, analyze usage, 
                and provide personalized content. You can control cookie settings through your browser preferences.
              </p>
            </div>
          </section>

          <section className="mb-8">
            <h2 className={`text-2xl font-semibold mb-4 ${
              theme === 'light' ? 'text-purple-700' : 'text-gold-light'
            }`}>
              8. Children's Privacy
            </h2>
            <div className="space-y-4">
              <p>
                Our service is not intended for children under 13. We do not knowingly collect 
                personal information from children under 13. If you believe we have collected 
                such information, please contact us immediately.
              </p>
            </div>
          </section>

          <section className="mb-8">
            <h2 className={`text-2xl font-semibold mb-4 ${
              theme === 'light' ? 'text-purple-700' : 'text-gold-light'
            }`}>
              9. Changes to This Policy
            </h2>
            <div className="space-y-4">
              <p>
                We may update this privacy policy from time to time. We will notify you of any 
                significant changes by posting the new policy on this page and updating the 
                "last updated" date.
              </p>
            </div>
          </section>

          <section className="mb-8">
            <h2 className={`text-2xl font-semibold mb-4 ${
              theme === 'light' ? 'text-purple-700' : 'text-gold-light'
            }`}>
              10. Contact Us
            </h2>
            <div className="space-y-4">
              <p>
                If you have any questions about this privacy policy or our practices, please contact us:
              </p>
              <div className={`p-4 rounded-lg ${
                theme === 'light' ? 'bg-purple-50' : 'bg-gray-800'
              }`}>
                <p><strong>Email:</strong> privacy@trylum.com</p>
                <p><strong>Address:</strong> Trylum Inc., 123 Fashion Street, Style City, SC 12345</p>
                <p><strong>Phone:</strong> +1 (555) 123-4567</p>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicy;