import { SignUpFormSteps } from '@/shared/types/Forms';
import { Dispatch, SetStateAction, useEffect, useRef, useState } from 'react';

type UseStepTrackerData = {
  step: SignUpFormSteps;
  setStep: Dispatch<SetStateAction<SignUpFormSteps>>;
};

export const useStepTracker = (): UseStepTrackerData => {
  const [step, setStep] = useState<SignUpFormSteps>('1');
  const hasRun = useRef(false);

  useEffect(() => {
    if (!hasRun.current) {
      setStep('1');
    }

    hasRun.current = true;
  }, []);

  return { step, setStep };
};
