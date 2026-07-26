import React, { useState, useEffect, useCallback } from 'react';
import App from '../App';
import AdminDashboard from '../../apps/admin/AdminDashboard';
import { NotFoundPage } from './pages/NotFoundPage';
import { resolveRoute, type RouteResolution } from '../routing/routeResolver';
import type { RouteRecord } from '../routing/routeRegistry';
import { Menu, X, Search, ShieldCheck } from 'lucide-react';

// Server-side admin authentication check
const checkAdminAuth = async (): Promise<boolean> => {
  if (typeof window === 'undefined') {
    // Server-side: check for auth token/cookie
    return false;
  }
  
  // Client-side: check for admin session token
  const token = localStorage.getItem('adminAuthToken');
  if (!token) return false;
  
  // Validate token (in production, this would verify with backend)
  try {
    const response = await fetch('/api/admin/verify', {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });
    return response.ok;
  } catch {
    return false;
  }
};

export function RouterApp({ route }: { route?: RouteRecord }): React.ReactElement {
  const [currentPath, setCurrentPath] = useState<string>(() => {
    // Prefer the route prop if provided (server-side / hydration)
    if (route?.path) {
      return route.path;
    }
    // Fallback to window.location if available (client-only)
    if (typeof window !== 'undefined' && window.location) {
      return window.location.pathname;
    }
    return '/';
  });

  // Determine the resolution based on whether we received a route prop (from server) or not
  let resolution: RouteResolution;
  if (route) {
    // Server-rendered or hydrated with a specific route
    resolution = { kind: 'valid', route: route };
  } else {
    // Client-side navigation: resolve the current path
    resolution = resolveRoute(currentPath);
  }

  // Admin authentication state
  const [isAdminAuthenticated, setIsAdminAuthenticated] = useState<boolean | null>(null);
  const [showAdminLogin, setShowAdminLogin] = useState(false);
  const [adminToken, setAdminToken] = useState<string>('');

  useEffect(() => {
    const handlePopState = () => {
      setCurrentPath(window.location.pathname);
      // Re-resolve the route on popstate
      // Note: We don't update the resolution here because we are using the closure variable.
      // We will recalculate the resolution in the render below.
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []); // Empty deps because we only want to add the listener once

  const navigate = (path: string) => {
    window.history.pushState({}, '', path);
    setCurrentPath(path);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Handle admin authentication
  const handleAdminLogin = useCallback(async () => {
    // In production, this would show a proper login modal
    // For now, we'll check if there's an existing admin token
    const token = localStorage.getItem('adminAuthToken');
    
    if (token) {
      const isValid = await checkAdminAuth();
      setIsAdminAuthenticated(isValid);
      if (isValid) {
        setShowAdminLogin(false);
      }
    } else {
      // Show login prompted
      setShowAdminLogin(true);
    }
  }, []);

  // Check admin auth for admin routes (client-side only)
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const isCurrentPathAdmin = currentPath === '/admin' || currentPath.startsWith('/admin/');
      if (isCurrentPathAdmin) {
        checkAdminAuth().then(setIsAdminAuthenticated);
      }
    }
  }, [currentPath]);

  // 1. Handle Redirects (from resolution)
  if (resolution.kind === 'redirect') {
    useEffect(() => {
      navigate(resolution.destination);
    }, [resolution.destination]);
    return null;
  }

  // If resolution returned not-found, display NotFoundPage (HTTP 404 UI)
  if (resolution.kind === 'not-found') {
    return (
      <div className="min-h-screen bg-slate-950 text-slate-100 flex items-center justify-center py-12">
        <NotFoundPage onNavigate={navigate} currentPath={currentPath} />
      </div>
    );
  }

  // Admin route protection - return 404 if server-side or not authenticated
  const isServerSide = typeof window === 'undefined';
  const isCurrentPathAdmin = currentPath === '/admin' || currentPath.startsWith('/admin/');

  if (isCurrentPathAdmin) {
    // Server-side: reject admin routes with 404 (P0 security fix)
    if (isServerSide || isAdminAuthenticated === false) {
      return (
        <div className="min-h-screen bg-slate-950 text-slate-100 flex items-center justify-center py-12">
          <NotFoundPage onNavigate={navigate} currentPath={currentPath} />
        </div>
      );
    }
    
    // Client-side: show login if not authenticated
    if (isAdminAuthenticated === null) {
      return (
        <div className="min-h-screen bg-slate-950 text-slate-100 flex items-center justify-center py-12">
          <div className="text-center">
            <ShieldCheck className="w-16 h-16 text-indigo-500 mx-auto mb-4" />
            <h1 className="text-2xl font-bold mb-4">Admin Access Required</h1>
            <p className="text-slate-400 mb-6">Authentication required to access admin dashboard.</p>
            {showAdminLogin ? (
              <div className="bg-slate-900 p-4 rounded-lg inline-block">
                <p className="text-slate-300 text-sm mb-2">Enter admin credentials:</p>
                <input
                  type="password"
                  placeholder="Admin Token"
                  className="w-64 px-3 py-2 bg-slate-800 border border-slate-700 rounded text-slate-100 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' && adminToken) {
                      localStorage.setItem('adminAuthToken', adminToken);
                      setIsAdminAuthenticated(true);
                      setShowAdminLogin(false);
                    }
                  }}
                  value={adminToken}
                  onChange={(e) => setAdminToken(e.target.value)}
                />
              </div>
            ) : (
              <button
                onClick={handleAdminLogin}
                className="px-6 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700 transition-colors"
              >
                Enter Admin Dashboard
              </button>
            )}
          </div>
        </div>
      );
    }

    // Authenticated admin access
    return <AdminDashboard />;
  }

  // For valid routes, render the App component with route information
  return <App route={resolution.route} navigate={navigate} />;
}

export default RouterApp;
export { RouterApp as AppRouter };