import React from 'react'

const Header = () => {
  let render = (
    <div className='border h-16 text-xl flex items-center tracking-wider lg:h-20 lg:text-2xl'>
      <div className='p-2'>
        <div className='font-bold  text-gray-400'>MEMO</div>
      </div>
    </div>
  );

  return render;
}

export default Header