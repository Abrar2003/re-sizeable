import React, { useEffect, useState } from 'react';

function Add( { handleAdd }) {
  const [text, setText] = useState('');
  useEffect(() => {
    setText("")
  }, [handleAdd]);

  return (
    <div>
      <h1>Add Data</h1>
      <div className='add'>
      <input
        type="text"
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Enter text"
      />
      <button onClick={() => handleAdd(text)}>ADD</button>
      </div>
      
    </div>
  );
}

export default Add;