import React, { useState } from 'react';
import axios from 'axios';

function Add() {
  const [text, setText] = useState('');

  const handleAdd = async () => {
    try {
      const response = await axios.post('http://localhost:8080/api/data', { text });
      console.log('Data added:', response.data);
      setText(''); // Clear the input field after successful addition
    } catch (error) {
      console.error('Error adding data:', error);
    }
  };

  return (
    <div className='add'>
      <input
        type="text"
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Enter text"
      />
      <button onClick={handleAdd}>ADD</button>
    </div>
  );
}

export default Add;