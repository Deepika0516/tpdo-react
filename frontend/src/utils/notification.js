import React from 'react';


export const showErrorMessage = (msg) => {
  return <div className='py-2 text-red-500'>{msg}</div>;
};


export const showSuccessMessage = (msg) => {
    return <div className='pay-2 text-green-500'>{msg}</div>
};
