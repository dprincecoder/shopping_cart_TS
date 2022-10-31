import { useState, useEffect } from "react";
export const useLocalStorage = <T>(
  key: string,
  initialValue: T | (() => T)
) => {
  const [value, setValue] = useState<T>(() => {
    const jsonValue = localStorage.getItem(key);
    //get local storage items when there is item
    if (jsonValue != null) return JSON.parse(jsonValue);

    if (typeof initialValue === "function") return (initialValue as () => T)();
    return initialValue;
  });

  //set back item to localStorage
  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value));
  }, [key, value]);
  return [value, setValue] as [typeof value, typeof setValue];
};
