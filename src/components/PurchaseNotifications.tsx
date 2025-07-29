import React, { useState, useEffect } from 'react';
import { Check, Crown, Sparkles } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface Notification {
  id: number;
  name: string;
  plan: string;
  timestamp: string;
}

// Main component to display purchase notifications
const PurchaseNotifications = () => {
  // State to hold the currently displayed notification
  const [currentNotification, setCurrentNotification] = useState<Notification | null>(null);

  // Expanded list of 100 fake notifications with common Indian names
  // It includes a mix of full names and first names only.
  // Plans are randomly assigned to each name.
  const fakeNotifications: Omit<Notification, 'id' | 'timestamp'>[] = [
    { name: 'Aarav Sharma', plan: 'Pro Plan' },
    { name: 'Saanvi Gupta', plan: 'Lifetime Plan' },
    { name: 'Advik Singh', plan: 'Pro Plan' },
    { name: 'Aanya Patel', plan: 'Lifetime Plan' },
    { name: 'Vihaan Kumar', plan: 'Pro Plan' },
    { name: 'Myra Reddy', plan: 'Lifetime Plan' },
    { name: 'Reyansh Desai', plan: 'Pro Plan' },
    { name: 'Diya Nair', plan: 'Lifetime Plan' },
    { name: 'Arjun Iyer', plan: 'Pro Plan' },
    { name: 'Anika Menon', plan: 'Lifetime Plan' },
    { name: 'Kabir Rao', plan: 'Pro Plan' },
    { name: 'Ishita Joshi', plan: 'Lifetime Plan' },
    { name: 'Rohan Pillai', plan: 'Pro Plan' },
    { name: 'Priya Hegde', plan: 'Lifetime Plan' },
    { name: 'Krishna Krishnan', plan: 'Pro Plan' },
    { name: 'Zara Agarwal', plan: 'Lifetime Plan' },
    { name: 'Mohammed Bhat', plan: 'Pro Plan' },
    { name: 'Kiara Reddy', plan: 'Lifetime Plan' },
    { name: 'Aryan Varma', plan: 'Pro Plan' },
    { name: 'Siya', plan: 'Lifetime Plan' },
    { name: 'Ayaan Rao', plan: 'Pro Plan' },
    { name: 'Navya Raina', plan: 'Lifetime Plan' },
    { name: 'Neel', plan: 'Pro Plan' },
    { name: 'Riya Shankar', plan: 'Lifetime Plan' },
    { name: 'Shaurya Reddy', plan: 'Pro Plan' },
    { name: 'Anvi', plan: 'Lifetime Plan' },
    { name: 'Yuvan Sheikh', plan: 'Pro Plan' },
    { name: 'Fatima Khan', plan: 'Lifetime Plan' },
    { name: 'Sai', plan: 'Pro Plan' },
    { name: 'Ishan Vanga', plan: 'Lifetime Plan' },
    { name: 'Zoya Mehta', plan: 'Pro Plan' },
    { name: 'Atharv Verma', plan: 'Lifetime Plan' },
    { name: 'Avni', plan: 'Pro Plan' },
    { name: 'Vivaan Jain', plan: 'Lifetime Plan' },
    { 'name': 'Aditi Kulkarni', 'plan': 'Pro Plan' },
    { 'name': 'Dev Tiwari', 'plan': 'Lifetime Plan' },
    { 'name': 'Shanaya', 'plan': 'Pro Plan' },
    { 'name': 'Arnav Bajaj', 'plan': 'Lifetime Plan' },
    { 'name': 'Gauri Bedi', 'plan': 'Pro Plan' },
    { 'name': 'Parth Devarakonda', 'plan': 'Lifetime Plan' },
    { 'name': 'Khushi', 'plan': 'Pro Plan' },
    { 'name': 'Rudra', 'plan': 'Lifetime Plan' },
    { 'name': 'Ananya', 'plan': 'Pro Plan' },
    { 'name': 'Veer', 'plan': 'Lifetime Plan' },
    { 'name': 'Pari', 'plan': 'Pro Plan' },
    { 'name': 'Dhruv Kumar', 'plan': 'Lifetime Plan' },
    { 'name': 'Aisha P.', 'plan': 'Pro Plan' },
    { 'name': 'Ritvik Kapoor', 'plan': 'Lifetime Plan' },
    { 'name': 'Sara Bhatt', 'plan': 'Pro Plan' },
    { 'name': 'Om', 'plan': 'Lifetime Plan' },
    { 'name': 'Eva Rai', 'plan': 'Pro Plan' },
    { 'name': 'Yash T.', 'plan': 'Lifetime Plan' },
    { 'name': 'Sia Kohli', 'plan': 'Pro Plan' },
    { 'name': 'Laksh G.', 'plan': 'Lifetime Plan' },
    { 'name': 'Ishaan Dravid', 'plan': 'Pro Plan' },
    { 'name': 'Kavya Kumble', 'plan': 'Lifetime Plan' },
    { 'name': 'Meera Mirza', 'plan': 'Pro Plan' },
    { 'name': 'Samarth Paes', 'plan': 'Lifetime Plan' },
    { 'name': 'Anjali Bhupathi', 'plan': 'Pro Plan' },
    { 'name': 'Advait Nehwal', 'plan': 'Lifetime Plan' },
    { 'name': 'Arya', 'plan': 'Pro Plan' },
    { 'name': 'Rian K.', 'plan': 'Lifetime Plan' },
    { 'name': 'Tara Mirza', 'plan': 'Pro Plan' },
    { 'name': 'Yusuf', 'plan': 'Lifetime Plan' },
    { 'name': 'Jiya Rajput', 'plan': 'Pro Plan' },
    { 'name': 'Arush', 'plan': 'Lifetime Plan' },
    { 'name': 'Naina', 'plan': 'Pro Plan' },
    { 'name': 'Agastya', 'plan': 'Lifetime Plan' },
    { 'name': 'Mahi Sharma', 'plan': 'Pro Plan' },
    { 'name': 'Rishaan Kalam', 'plan': 'Lifetime Plan' },
    { 'name': 'Suhana', 'plan': 'Pro Plan' },
    { 'name': 'Krish N.', 'plan': 'Lifetime Plan' },
    { 'name': 'Ahana Patel', 'plan': 'Pro Plan' },
    { 'name': 'Nehal M.', 'plan': 'Lifetime Plan' },
    { 'name': 'Sameer Kumar', 'plan': 'Pro Plan' },
    { 'name': 'Prisha Rahman', 'plan': 'Lifetime Plan' },
    { 'name': 'Arin Ghoshal', 'plan': 'Pro Plan' },
    { 'name': 'Misha Chauhan', 'plan': 'Lifetime Plan' },
    { 'name': 'Jay Nigam', 'plan': 'Pro Plan' },
    { 'name': 'Anaya Narayan', 'plan': 'Lifetime Plan' },
    { 'name': 'Ronit Sanu', 'plan': 'Pro Plan' },
    { 'name': 'Kyra Yagnik', 'plan': 'Lifetime Plan' },
    { 'name': 'Amit Hussain', 'plan': 'Pro Plan' },
    { 'name': 'Rhea Shankar', 'plan': 'Lifetime Plan' },
    { 'name': 'Manan Ali Khan', 'plan': 'Pro Plan' },
    { 'name': 'Reva', 'plan': 'Lifetime Plan' },
    { 'name': 'Vihaan Khan', 'plan': 'Pro Plan' },
    { 'name': 'Sana Husain', 'plan': 'Lifetime Plan' },
    { 'name': 'Darsh Ray', 'plan': 'Pro Plan' },
    { 'name': 'Aarohi Ratnam', 'plan': 'Lifetime Plan' },
    { 'name': 'Armaan Vikram', 'plan': 'Pro Plan' },
    { 'name': 'Ira M.', 'plan': 'Lifetime Plan' },
    { 'name': 'Aadi', 'plan': 'Pro Plan' },
    { 'name': 'Nitya', 'plan': 'Lifetime Plan' },
    { 'name': 'Kian Akhtar', 'plan': 'Pro Plan' },
    { 'name': 'Myra', 'plan': 'Lifetime Plan' },
    { 'name': 'Vivaan Bhagat', 'plan': 'Pro Plan' },
    { 'name': 'Alia Bond', 'plan': 'Lifetime Plan' },
    { 'name': 'Ahaan Sharma', 'plan': 'Pro Plan' },
    { 'name': 'Inaaya Kapoor', 'plan': 'Lifetime Plan' },
  ];

  useEffect(() => {
    // Function to generate and display a single notification
    const generateNotification = () => {
      // Pick a random notification from the list
      const randomNotification = fakeNotifications[Math.floor(Math.random() * fakeNotifications.length)];
      const newNotification: Notification = {
        id: Date.now(),
        name: randomNotification.name,
        plan: randomNotification.plan,
        timestamp: 'just now'
      };

      setCurrentNotification(newNotification);

      // Set a timer to hide the notification after 4 seconds
      setTimeout(() => {
        setCurrentNotification(null);
      }, 4000);
    };

    // Show the first notification 5 seconds after the component mounts
    const initialTimeout = setTimeout(generateNotification, 5000);

    // Set an interval to show a new notification every 30 seconds
    const interval = setInterval(() => {
      generateNotification();
    }, 30000);

    // Cleanup function to clear timers when the component unmounts
    return () => {
      clearTimeout(initialTimeout);
      clearInterval(interval);
    };
  }, []); // Empty dependency array ensures this effect runs only once

  return (
    <div className="fixed bottom-4 left-4 z-50">
      <AnimatePresence>
        {currentNotification && (
          <motion.div
            key={currentNotification.id} // Add key for AnimatePresence to track the element
            initial={{ x: -400, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: -400, opacity: 0 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 p-4 w-full max-w-sm"
          >
            <div className="flex items-center gap-3">
              {/* Icon section with dynamic background based on plan */}
              <div className={`flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center ${
                currentNotification.plan === 'Lifetime Plan' 
                  ? 'bg-gradient-to-r from-yellow-400 to-orange-500' 
                  : 'bg-gradient-to-r from-purple-500 to-pink-500'
              }`}>
                {currentNotification.plan === 'Lifetime Plan' ? (
                  <Crown className="w-5 h-5 text-white" />
                ) : (
                  <Sparkles className="w-5 h-5 text-white" />
                )}
              </div>
              
              {/* Notification content */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <p className="text-sm font-medium text-gray-900 dark:text-white truncate">
                    {currentNotification.name}
                  </p>
                  <Check className="w-4 h-4 text-green-500 flex-shrink-0" />
                </div>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  purchased {currentNotification.plan}
                </p>
                <p className="text-xs text-gray-400 dark:text-gray-500">
                  {currentNotification.timestamp}
                </p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default PurchaseNotifications;
