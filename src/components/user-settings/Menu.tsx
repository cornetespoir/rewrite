'use client'

import React from 'react';
import { useState } from 'react';
import { FilterInput } from './FIlterInput';
import { useLocalStorage } from '@/hooks/useLocalStorage';

interface MenuProps {
  stateChanger?: any
  setLoading?: any;
}

const Menu = ({ stateChanger, setLoading }: MenuProps) => {
  const [settingState, setSettingState] = useLocalStorage('settings')
  const [status, setStatus] = useState(settingState || 'open')

  function handleSlide() {
    if (status === 'close')
      setStatus('open')
    else {
      setStatus('close')
      setSettingState('close')
    }
  }
  return (
    <>
      <aside className={status}>
        <button onClick={handleSlide} className='exit'>
          {status === 'close' ? (
            <svg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth='2' strokeLinecap='round' strokeLinejoin='round' className='feather feather-settings'>
              <circle cx='12' cy='12' r='3' />
              <path d='M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z' />
            </svg>
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
              fill="none" stroke="currentColor"
              strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
              className="feather feather-x">
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          )}
          <span className='sr-text'>Toggle content settings</span>
        </button>
        <FilterInput />
      </aside>
    </>

  );
};

export { Menu };