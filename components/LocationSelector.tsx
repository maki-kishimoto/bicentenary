
import React, { useState } from 'react';
import { LocationChoice } from '../types';
import { translations } from '../constants/translations';

interface LocationSelectorProps {
  selectedLocation: LocationChoice;
  onSelect?: (location: LocationChoice) => void;
  onConfirm?: () => void;
  overrideSelect?: (location: LocationChoice) => void;
}

const LocationSelector: React.FC<LocationSelectorProps> = ({ 
  selectedLocation: initialLocation, 
  overrideSelect 
}) => {
  const [currentSelection, setCurrentSelection] = useState<LocationChoice>(initialLocation);
  
  const t = translations['en']; 
  const tj = translations['ja'];

  const handleConfirm = () => {
    if (overrideSelect) {
      overrideSelect(currentSelection);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center p-6 md:p-14 bg-white text-stone-800">
      <div className="max-w-md w-full flex flex-col items-center">
        <div className="text-center mb-8">
          <h1 className="text-2xl sm:text-3xl font-serif font-bold text-indigo-950 tracking-tight mb-2">
            {t.locationTitle}
          </h1>
          <p className="text-stone-500 text-sm">{t.locationDescription}</p>
          <div className="h-1 w-16 bg-indigo-200 mx-auto rounded-full mt-4"></div>
        </div>

        <div className="w-full space-y-4 mb-10">
          <button
            type="button"
            onClick={() => setCurrentSelection('ucl')}
            className={`w-full p-6 rounded-xl border-2 transition-all duration-300 text-left flex flex-col gap-1 ${
              currentSelection === 'ucl'
                ? 'border-indigo-900 bg-indigo-50 shadow-md'
                : 'border-stone-100 bg-white hover:border-stone-200 hover:bg-stone-50'
            }`}
          >
            <span className={`font-bold text-lg ${currentSelection === 'ucl' ? 'text-indigo-900' : 'text-stone-700'}`}>
              {t.uclName}
            </span>
            <span className="text-xs text-stone-400 font-medium">London, UK</span>
          </button>

          <button
            type="button"
            onClick={() => setCurrentSelection('hagi')}
            className={`w-full p-6 rounded-xl border-2 transition-all duration-300 text-left flex flex-col gap-1 ${
              currentSelection === 'hagi'
                ? 'border-indigo-900 bg-indigo-50 shadow-md'
                : 'border-stone-100 bg-white hover:border-stone-200 hover:bg-stone-50'
            }`}
          >
            <span className={`font-bold text-lg ${currentSelection === 'hagi' ? 'text-indigo-900' : 'text-stone-700'}`}>
              {tj.hagiName}
            </span>
            <span className="text-xs text-stone-400 font-medium">Yamaguchi, Japan</span>
          </button>
        </div>

        <button
          type="button"
          onClick={handleConfirm}
          className="w-full bg-indigo-900 text-white py-4 rounded-xl font-bold text-lg shadow-lg hover:bg-indigo-800 hover:shadow-xl transition-all duration-300 flex items-center justify-center gap-2 group"
        >
          <span>{currentSelection === 'hagi' ? tj.start : t.start}</span>
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 transition-transform group-hover:translate-x-1" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M5 12h14M12 5l7 7-7 7" />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default LocationSelector;
