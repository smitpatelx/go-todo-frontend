import DLoading from '@/components/generic/DLoading';
import React from 'react';

const Test = () => (
  <div className='w-full flex-1 flex flex-wrap items-start justify-center'>
    <div className='container mx-auto p-6'>
      <div className='inline-block relative'>
        <DLoading />
      </div>
    </div>
  </div>
);

export default Test;
