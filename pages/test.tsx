import HeaderMenu from '@/components/navigation/HeaderMenu';
import React from 'react';

const Test = () => (
  <div className='w-full flex-1 flex flex-wrap items-start justify-center'>
    <div className='container mx-auto p-6'>
      <div className='inline-block relative'>
        <HeaderMenu
          avatarUrl='/images/icon-variations/ico.svg'
          left={false}
          logout={() => {}}
          maxWidthClass='w-[20rem]'
        />
      </div>
    </div>
  </div>
);

export default Test;
