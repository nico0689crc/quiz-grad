import { useState, useEffect, useCallback } from "react";

export function useLocalStorage<T>(key: string, initialState: T) {
  const [localStorage, SetLocalStorage] = useState<T>(initialState);

  useEffect(() => {
    const restored = getStorage(key);

    if (restored) {
      SetLocalStorage((prevValue: T) => ({
        ...prevValue,
        ...restored,
      }));
    }
  }, [key]);

  const updateState = useCallback(
    (updateValue: any) => {
      SetLocalStorage((prevValue: any) => {
        setStorage(key, {
          ...prevValue,
          ...updateValue,
        });

        return {
          ...prevValue,
          ...updateValue,
        };
      });
    },
    [key],
  );

  const update = useCallback(
    (name: string, updateValue: any) => {
      updateState({
        [name]: updateValue,
      });
    },
    [updateState],
  );

  const reset = useCallback(() => {
    removeStorage(key);
    SetLocalStorage(initialState);
  }, [initialState, key]);

  return {
    localStorage,
    update,
    reset,
  };
}

export const getStorage = (key: string) => {
  let value = null;

  try {
    const result = window.localStorage.getItem(key);

    if (result) {
      value = JSON.parse(result);
    }
  } catch (error) {
    console.error(error);
  }

  return value;
};

export const setStorage = (key: string, value: any) => {
  try {
    window.localStorage.setItem(key, JSON.stringify(value));
  } catch (error) {
    console.error(error);
  }
};

export const removeStorage = (key: string) => {
  try {
    window.localStorage.removeItem(key);
  } catch (error) {
    console.error(error);
  }
};

export const getQuizLocalStorageKey = (quizUUID: string) =>
  `STORAGE_KEY_USER_DATA_QUIZ_WEBSOCKET_${quizUUID}`;
