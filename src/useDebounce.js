import { useCallback, useRef } from "react";

const useDebounce = (fn, waitTime) => {
  const timer = useRef();

  return useCallback(
    (...args) => {
      if (timer.current) clearTimeout(timer.current);
      console.log("return inside func");
      timer.current = setTimeout(() => {
        fn(...args);
      }, waitTime);
    },
    [fn, waitTime]
  );
};

export default useDebounce;
