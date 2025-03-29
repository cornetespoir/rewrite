import { useState, useEffect } from "react";

const useLocalStorage = (key: string, defaultValue?: any) => {
  const [value, setValue] = useState(() => {
    let currentValue

    try {
      currentValue = JSON.parse(
        localStorage.getItem(key) || String(defaultValue)
      )
    } catch (error) {
      currentValue = defaultValue
    }

    return currentValue
  })

  useEffect(() => {
    if (typeof window !== 'undefined') {
    localStorage.setItem(key, JSON.stringify(value));
    }
  }, [value, key])

  return [value, setValue]
};

export { useLocalStorage }