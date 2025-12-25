
import React, { useState, useEffect, useCallback } from 'react';
import LocationAndLanguageSelector from './components/LocationAndLanguageSelector';
import LocationSelector from './components/LocationSelector';
import { LocationChoice, Language } from './types';

// These should be the final chat interface URLs
const REDIRECT_URL_UCL = 'https://www.ucl.ac.uk/about/ucls-bicentenary';
const REDIRECT_URL_HAGI = 'https://www.city.hagi.lg.jp/site/meiringakusha/';

const App: React.FC = () => {
  const [step, setStep] = useState<'location' | 'ucl' | 'hagi'>('location');

  // Function to determine step from URL
  const getStepFromUrl = useCallback(() => {
    const params = new URLSearchParams(window.location.search);
    const view = params.get('view');
    if (view === 'ucl') return 'ucl';
    if (view === 'hagi') return 'hagi';
    return 'location';
  }, []);

  // Initialize and handle browser back/forward buttons
  useEffect(() => {
    setStep(getStepFromUrl());

    const handlePopState = () => {
      setStep(getStepFromUrl());
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, [getStepFromUrl]);

  const handleLocationConfirm = (choice: LocationChoice) => {
    const newUrl = new URL(window.location.href);
    newUrl.searchParams.set('view', choice);
    
    // Update browser history and internal state
    window.history.pushState({ view: choice }, '', newUrl.toString());
    setStep(choice);
  };

  return (
    <div className="flex flex-col h-screen w-full bg-stone-50 items-center justify-center p-4">
      <div className="w-full max-w-3xl bg-white shadow-xl rounded-2xl overflow-hidden transition-all duration-500">
        {step === 'location' ? (
          <LocationSelector 
            selectedLocation="ucl"
            onSelect={() => {}} 
            onConfirm={() => {}} 
            overrideSelect={handleLocationConfirm}
          />
        ) : step === 'ucl' ? (
          <LocationAndLanguageSelector 
            initialLanguage="en"
            redirectUrl={REDIRECT_URL_UCL}
          />
        ) : (
          <LocationAndLanguageSelector 
            initialLanguage="ja"
            redirectUrl={REDIRECT_URL_HAGI}
          />
        )}
      </div>
    </div>
  );
};

export default App;
