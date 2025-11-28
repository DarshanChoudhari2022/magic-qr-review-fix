'use client';

import React, { useState, useEffect } from 'react';

interface ReviewSuggestionBoxProps {
  businessName: string;
  businessCategory: string;
  campaignId: string;
}

export default function ReviewSuggestionBox({
  businessName,
  businessCategory,
  campaignId,
}: ReviewSuggestionBoxProps) {
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    fetchSuggestions();
  }, [businessName, businessCategory]);

  const fetchSuggestions = async () => {
    setLoading(true);
    try {
      const response = await fetch('/api/generateReviewSuggestion', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ businessName, category: businessCategory, campaignId }),
      });
      const data = await response.json();
      if (data.suggestions?.length > 0) setSuggestions(data.suggestions);
    } catch (err) {
      console.error('Error:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleCopy = async () => {
    if (suggestions[currentIndex]) {
      await navigator.clipboard.writeText(suggestions[currentIndex]);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const goNext = () => setCurrentIndex((currentIndex + 1) % suggestions.length);
  const goPrev = () => setCurrentIndex((currentIndex - 1 + suggestions.length) % suggestions.length);

  return (
    <div className="rounded-lg shadow-md bg-white overflow-hidden">
      <div className="bg-purple-600 text-white p-4">
        <h3 className="font-semibold text-lg">✨ AI-Powered Review Suggestion</h3>
        <p className="text-purple-100 text-sm mt-1">Tap to copy and paste on Google</p>
      </div>
      <div className="p-6">
        {loading ? (
          <div className="flex justify-center py-8"><div className="animate-spin rounded-full h-8 w-8 border-2 border-purple-600 border-t-transparent"></div></div>
        ) : suggestions.length > 0 ? (
          <>
            <p className="text-gray-700 mb-4">{suggestions[currentIndex]}</p>
            <div className="flex gap-2 mb-3">
              {suggestions.map((_, i) => (
                <button key={i} onClick={() => setCurrentIndex(i)} className={`w-2 h-2 rounded-full ${i === currentIndex ? 'bg-purple-600' : 'bg-gray-300'}`} />
              ))}
            </div>
            <button onClick={handleCopy} className="w-full bg-purple-600 hover:bg-purple-700 text-white py-2 rounded mb-2">
              {copied ? '✓ Copied!' : 'Copy to Clipboard'}
            </button>
            {suggestions.length > 1 && (
              <div className="flex gap-2">
                <button onClick={goPrev} className="flex-1 bg-gray-200 hover:bg-gray-300 py-2 rounded">← Prev</button>
                <button onClick={goNext} className="flex-1 bg-gray-200 hover:bg-gray-300 py-2 rounded">Next →</button>
              </div>
            )}
          </>
        ) : (
          <p className="text-center text-gray-500">No suggestions available</p>
        )}
      </div>
    </div>
  );
}
