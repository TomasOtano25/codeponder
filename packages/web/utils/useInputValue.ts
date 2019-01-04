import { useState, useCallback } from "react";

export function useInputValue<T>(
  initialValue: T
): [T, (e: React.ChangeEvent<HTMLInputElement>) => void] {
  const [value, setValue] = useState<T>(initialValue);
  const onChange = useCallback(event => {
    setValue(event.currentTarget.value);
  }, []);

  return [value, onChange];
}
