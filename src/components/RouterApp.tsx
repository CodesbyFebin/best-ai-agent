import React, { useState, useEffect } from 'react';
import App from '../App';
import AdminDashboard from '../../apps/admin/AdminDashboard';
import { NotFoundPage } from './pages/NotFoundPage';
import { resolveRoute, type RouteResolution } from '../routing/routeResolver';
import type { RouteRecord } from '../routing/routeRegistry';
import { Menu, X, Search, ShieldCheck } from 'lucide-react';

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

  // For valid routes, render the App component with route information
  return <App route={resolution.route} navigate={navigate} />;
}

export default RouterApp;
export { RouterApp as AppRouter };