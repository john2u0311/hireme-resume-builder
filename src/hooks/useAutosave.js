import { useEffect } from 'react';

export const useAutosave = (data, key) => {
  useEffect(() => {
    const saveToLocalStorage = () => {
      localStorage.setItem(key, JSON.stringify(data));
    };
    
    const debounceTimer = setTimeout(saveToLocalStorage, 1000);
    return () => clearTimeout(debounceTimer);
  }, [data, key]);

  return {
    loadSavedData: () => {
      const saved = localStorage.getItem(key);
      return saved ? JSON.parse(saved) : null;
    }
  };
};