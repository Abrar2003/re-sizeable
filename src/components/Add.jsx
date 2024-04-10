import React, { useEffect, useState } from 'react';

function Add( { handleAdd }) {
  const [text, setText] = useState('');
  useEffect(() => {
    setText("")
  }, [handleAdd]);

  return (
    <div className='add'>
      <input
        type="text"
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Enter text"
      />
      <button onClick={() => handleAdd(text)}>ADD</button>
    </div>
  );
}

export default Add;