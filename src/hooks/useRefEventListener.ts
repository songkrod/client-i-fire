import { useRef } from 'react';

const useRefEventListener = <T = CallableFunction>(fn: T) => {
	const fnRef = useRef<T>(fn);
	fnRef.current = fn;

	return fnRef;
};

export default useRefEventListener;
