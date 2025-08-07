import React from 'react';

const ContentGrid = ({ children, className }) => {
  return (
    <div className={`grid grid-cols-[5%_1fr_1fr_1fr_5%] grid-rows-[auto_auto] gap-5 ${className === 'new-submissions' ? 'grid-cols-3 gap-5 mx-[5%]' : ''} md:flex md:flex-col md:gap-4 md:px-3`}>
      {children}
    </div>
  );
};

export default ContentGrid;