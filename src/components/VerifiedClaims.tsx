/**
 * ATLAS P08 — Verified Claims Component
 * 
 * Displays evidence-backed claims for AI agents and routes.
 */

import React from 'react';
import type { EvidenceClaim } from '../data/evidenceSchema.js';

interface VerifiedClaimsProps {
  claims: EvidenceClaim[];
  maxDisplay?: number;
}

export const VerifiedClaims: React.FC<VerifiedClaimsProps> = ({ 
  claims, 
  maxDisplay = 10 
}) => {
  if (claims.length === 0) return null;

  return (
    <div className="mt-6 border-l-4 border-green-500 bg-green-50 p-4 rounded-r">
      <h4 className="font-semibold text-green-800 flex items-center gap-2">
        <span className="text-lg">✅</span>
        Verified Claims
      </h4>
      <ul className="mt-2 space-y-2 text-sm text-gray-700">
        {claims.slice(0, maxDisplay).map((claim) => (
          <li key={claim.id} className="flex items-start gap-2">
            <span className="text-green-600 mt-1">•</span>
            <span className="flex-1">
              <span className="font-medium text-gray-800">
                {claim.statement}
              </span>
              {claim.evidence.length > 0 && (
                <>
                  <div className="mt-1 text-xs text-gray-600">
                    Sources: 
                    {claim.evidence.slice(0, 2).map((src, idx) => (
                      <span key={idx} className="ml-2 inline-block">
                        <a
                          href={src.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-blue-600 hover:underline"
                        >
                          {src.publisher}
                        </a>
                      </span>
                    ))}
                    {claim.evidence.length > 2 && (
                      <span className="text-gray-500">
                        {' '} +{claim.evidence.length - 2} more
                      </span>
                    )}
                  </div>
                  <div className="mt-1 text-xs text-gray-500">
                    Confidence: {claim.confidence}% • Last verified: {new Date(claim.verifiedAt).toLocaleDateString()}
                  </div>
                </>
              )}
            </span>
          </li>
        ))}
        {claims.length > maxDisplay && (
          <li className="text-xs text-gray-500">
            ...and {claims.length - maxDisplay} more claims
          </li>
        )}
      </ul>
    </div>
  );
};

export default VerifiedClaims;