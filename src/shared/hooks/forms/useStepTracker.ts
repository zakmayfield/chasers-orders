import { Steps } from '@/types/auth';
import { Dispatch, SetStateAction, useEffect, useRef, useState } from 'react';

type UseStepTrackerData = {
  step: Steps;
  setStep: Dispatch<SetStateAction<Steps>>;
};

export const useStepTracker = (): UseStepTrackerData => {
  const [step, setStep] = useState<Steps>('1');
  const hasRun = useRef(false);

  useEffect(() => {
    if (!hasRun.current) {
      setStep('1');
    }

    hasRun.current = true;
  }, []);

  return { step, setStep };
};
