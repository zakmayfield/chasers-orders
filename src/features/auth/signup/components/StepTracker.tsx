import { FC } from 'react';
import { Steps } from '../helpers.signup';

interface StepTrackerProps {
  activeStep: Steps;
}

export const StepTracker: FC<StepTrackerProps> = ({ activeStep }) => {
  if (!activeStep) {
    return (
      <div className='text-center text-sm tracking-wide flex items-center justify-center gap-3 mb-12'>
        <span>credentials</span> <span className='text-lg'>/</span>
        <span>contact</span> <span className='text-lg'>/</span>
        <span>company</span> <span className='text-lg'>/</span>
        <span>shipping</span>
      </div>
    );
  }

  return (
    <div className='text-center text-sm tracking-wide flex items-center justify-center gap-3 mb-12'>
      <span
        className={`${activeStep === '1' ? 'text-green-500 font-normal' : 'text-slate-600'} ${activeStep > '1' && 'text-opacity-30'}`}
      >
        credentials
      </span>{' '}
      <span className={`text-lg'}`}>/</span>
      <span
        className={`${activeStep === '2' ? 'text-green-500 font-normal' : 'text-slate-600'} ${activeStep > '2' && 'text-opacity-30'}`}
      >
        contact
      </span>{' '}
      <span className={`text-lg`}>/</span>
      <span
        className={`${activeStep === '3' ? 'text-green-500 font-normal' : 'text-slate-600'} ${activeStep > '3' && 'text-opacity-30'}`}
      >
        company
      </span>{' '}
      <span className={`text-lg`}>/</span>
      <span
        className={`${activeStep === '4' ? 'text-green-500 font-normal' : 'text-slate-600'}`}
      >
        shipping
      </span>
    </div>
  );
};
