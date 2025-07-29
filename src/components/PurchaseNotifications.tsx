import React, { useState, useEffect } from 'react';
import { Check, Crown, Sparkles } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface Notification {
  id: number;
  name: string;
  plan: string;
  timestamp: string;
}

const PurchaseNotifications = () => {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [currentNotification, setCurrentNotification] = useState<Notification | null>(null);

  const fakeNotifications: Omit<Notification, 'id' | 'timestamp'>[] = [
    { name: 'Sarah M.', plan: 'Pro Plan' },
    { name: 'Alex K.', plan: 'Lifetime Plan' },
    { name: 'Emma R.', plan: 'Pro Plan' },
    { name: 'James L.', plan: 'Lifetime Plan' },
    { name: 'Maya P.', plan: 'Pro Plan' },
    { name: 'David T.', plan: 'Lifetime Plan' },
    { name: 'Lisa H.', plan: 'Pro Plan' },
    { name: 'Mike C.', plan: 'Pro Plan' },
    { name: 'Anna W.', plan: 'Lifetime Plan' },
    { name: 'Ryan B.', plan: 'Pro Plan' }
  ];

  useEffect(() => {
    // Generate notifications with random intervals
    const generateNotification = () => {
      const randomNotification = fakeNotifications[Math.floor(Math.random() * fakeNotifications.length)];
      const newNotification: Notification = {
        id: Date.now(),
        name: randomNotification.name,
        plan: randomNotification.plan,
        timestamp: 'just now'
      };

      setCurrentNotification(newNotification);

      // Hide notification after 4 seconds
      setTimeout(() => {
        setCurrentNotification(null);
      }, 4000);
    };

    // Show first notification after 3 seconds
    const initialTimeout = setTimeout(generateNotification, 3000);

    // Then show notifications every 8-15 seconds
    const interval = setInterval(() => {
      generateNotification();
    }, Math.random() * 7000 + 8000); // Random between 8-15 seconds

    return () => {
      clearTimeout(initialTimeout);
      clearInterval(interval);
    };
  }, []);

  return (
    <div className="fixed bottom-4 left-4 z-50">
      <AnimatePresence>
        {currentNotification && (
          <motion.div
            initial={{ x: -400, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: -400, opacity: 0 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 p-4 max-w-sm"
          >
            <div className="flex items-center gap-3">
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