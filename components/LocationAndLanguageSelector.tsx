
import React, { useState, useEffect } from 'react';
import { Language } from '../types';
import { translations } from '../constants/translations';

interface Props {
  initialLanguage: Language;
  redirectUrl: string;
}

const LocationAndLanguageSelector: React.FC<Props> = ({ initialLanguage, redirectUrl }) => {
  const [language, setLanguage] = useState<Language>(initialLanguage);

  useEffect(() => {
    setLanguage(initialLanguage);
  }, [initialLanguage]);

  const t = translations[language];

  return (
    <div className="flex flex-col items-center justify-center p-6 md:p-14 bg-white text-stone-800 relative">
        <div className="max-w-md w-full flex flex-col items-center">
            
            <div className="text-center mb-3 w-full">
                <h1 className="text-2xl sm:text-3xl md:text-4xl font-serif font-bold text-indigo-950 tracking-tight mb-2 whitespace-nowrap">{t.selectorTitle}</h1>
                <div className="h-1 w-20 bg-indigo-200 mx-auto rounded-full mt-4 mb-6"></div>
                
                <div className="min-h-[12rem] flex flex-col text-xs text-stone-600 text-left space-y-3 mb-8 bg-stone-50 p-5 rounded-xl border border-stone-100 shadow-inner">
                    <p className="font-bold text-indigo-900 text-sm">{t.disclaimerTitle}</p>
                    <p className="leading-relaxed">{t.disclaimerIntro}</p>
                    <ul className="space-y-2 mt-1">
                      {t.disclaimerPoints.map((point, index) => (
                        <li key={index} className="flex items-start gap-2">
                          <span className="shrink-0">{point.split(' ')[0]}</span>
                          <span>{point.split(' ').slice(1).join(' ')}</span>
                        </li>
                      ))}
                    </ul>
                </div>

                <p className="text-stone-600 font-medium h-6">{t.selectorDescription}</p>
            </div>

            <div className="w-full space-y-8 mt-2">
                <div className="flex justify-center items-center gap-8">
                    <button 
                        type="button"
                        onClick={() => setLanguage('en')} 
                        className={`text-sm tracking-wide transition-all duration-300 pb-1 border-b ${language === 'en' ? 'text-indigo-900 font-bold border-indigo-900' : 'text-stone-400 font-medium border-transparent hover:text-stone-600 hover:border-stone-300'}`}
                    >
                        English
                    </button>
                    <span className="text-stone-300 text-sm font-light">|</span>
                    <button 
                        type="button"
                        onClick={() => setLanguage('ja')} 
                        className={`text-sm tracking-wide transition-all duration-300 pb-1 border-b ${language === 'ja' ? 'text-indigo-900 font-bold border-indigo-900' : 'text-stone-400 font-medium border-transparent hover:text-stone-600 hover:border-stone-300'}`}
                    >
                        日本語
                    </button>
                </div>

                <a
                    href={redirectUrl}
                    target="_top"
                    rel="noopener noreferrer"
                    className="w-full bg-indigo-900 text-white py-4 rounded-xl font-bold text-lg shadow-lg hover:bg-indigo-800 hover:shadow-xl hover:-translate-y-0.5 transition-all duration-300 flex items-center justify-center gap-2 group text-center no-underline"
                >
                    <span>{t.startChat}</span>
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
                        <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                        <path d="M5 12l14 0"></path>
                        <path d="M13 18l6 -6"></path>
                        <path d="M13 6l6 6"></path>
                    </svg>
                </a>
            </div>
        </div>
    </div>
  );
};

export default LocationAndLanguageSelector;
