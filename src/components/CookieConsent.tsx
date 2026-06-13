import React, { useState, useEffect } from 'react';

interface CookieConsentProps {
  onAccept?: (preferences: Record<string, boolean>) => void;
}

export default function CookieConsent({ onAccept }: CookieConsentProps) {
  const [showBanner, setShowBanner] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [preferences, setPreferences] = useState({
    necessary: true,
    analytics: false,
    marketing: false,
    affiliate: false
  });

  useEffect(() => {
    const consent = localStorage.getItem('cookie-consent');
    if (!consent) {
      setShowBanner(true);
    } else {
      const saved = JSON.parse(consent);
      setPreferences(saved);
    }
  }, []);

  const handleAcceptAll = () => {
    const allAccepted = {
      necessary: true,
      analytics: true,
      marketing: true,
      affiliate: true
    };
    setPreferences(allAccepted);
    localStorage.setItem('cookie-consent', JSON.stringify(allAccepted));
    setShowBanner(false);
    onAccept?.(allAccepted);
  };

  const handleAcceptNecessary = () => {
    const necessaryOnly = {
      necessary: true,
      analytics: false,
      marketing: false,
      affiliate: false
    };
    setPreferences(necessaryOnly);
    localStorage.setItem('cookie-consent', JSON.stringify(necessaryOnly));
    setShowBanner(false);
    onAccept?.(necessaryOnly);
  };

  const handleCustomise = () => {
    setShowModal(true);
  };

  const handleSaveCustom = () => {
    localStorage.setItem('cookie-consent', JSON.stringify(preferences));
    setShowBanner(false);
    setShowModal(false);
    onAccept?.(preferences);
  };

  const handleToggle = (key: string) => {
    if (key === 'necessary') return; // Cannot disable necessary cookies
    setPreferences(prev => ({
      ...prev,
      [key]: !prev[key as keyof typeof prev]
    }));
  };

  if (!showBanner) return null;

  return (
    <>
      <div className="fixed bottom-0 left-0 right-0 bg-slate-900 text-white p-4 shadow-lg z-50">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex-1">
            <p className="text-sm font-medium mb-1">We use cookies to improve your experience</p>
            <p className="text-xs text-slate-300">
              We use essential cookies for site functionality. Optional cookies enable analytics,
              personalized ads, and affiliate links. Manage your preferences below.
            </p>
          </div>
          <div className="flex gap-2">
            <button
              onClick={handleAcceptNecessary}
              className="px-3 py-1.5 text-xs font-medium bg-slate-700 hover:bg-slate-600 rounded transition"
            >
              Necessary Only
            </button>
            <button
              onClick={handleCustomise}
              className="px-3 py-1.5 text-xs font-medium bg-slate-700 hover:bg-slate-600 rounded transition"
            >
              Customize
            </button>
            <button
              onClick={handleAcceptAll}
              className="px-3 py-1.5 text-xs font-medium bg-emerald-600 hover:bg-emerald-500 rounded transition"
            >
              Accept All
            </button>
          </div>
        </div>
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white text-slate-900 rounded-2xl p-6 max-w-md w-full shadow-xl">
            <h3 className="text-lg font-bold mb-4">Cookie Preferences</h3>
            <div className="space-y-3 mb-4">
              <label className="flex items-center justify-between">
                <span className="text-sm font-medium">Necessary Cookies</span>
                <input
                  type="checkbox"
                  checked={preferences.necessary}
                  disabled
                  className="h-4 w-4 rounded border-slate-300"
                />
              </label>
              <label className="flex items-center justify-between">
                <span className="text-sm font-medium">Analytics Cookies</span>
                <input
                  type="checkbox"
                  checked={preferences.analytics}
                  onChange={() => handleToggle('analytics')}
                  className="h-4 w-4 rounded border-slate-300"
                />
              </label>
              <label className="flex items-center justify-between">
                <span className="text-sm font-medium">Marketing Cookies</span>
                <input
                  type="checkbox"
                  checked={preferences.marketing}
                  onChange={() => handleToggle('marketing')}
                  className="h-4 w-4 rounded border-slate-300"
                />
              </label>
              <label className="flex items-center justify-between">
                <span className="text-sm font-medium">Affiliate Tracking</span>
                <input
                  type="checkbox"
                  checked={preferences.affiliate}
                  onChange={() => handleToggle('affiliate')}
                  className="h-4 w-4 rounded border-slate-300"
                />
              </label>
            </div>
            <div className="flex gap-2 justify-end">
              <button
                onClick={() => setShowModal(false)}
                className="px-3 py-1.5 text-xs font-medium bg-slate-200 hover:bg-slate-300 rounded transition"
              >
                Cancel
              </button>
              <button
                onClick={handleSaveCustom}
                className="px-3 py-1.5 text-xs font-medium bg-emerald-600 hover:bg-emerald-500 rounded transition"
              >
                Save Preferences
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}