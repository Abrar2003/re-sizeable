import React, { useState, useEffect } from 'react';
import axios from 'axios';

function Count() {
  const [counts, setCounts] = useState({ addCount: 0, updateCount: 0 });

  const fetchCounts = async () => {
    try {
      const response = await axios.get('https://re-sizeable-backend.onrender.com/api/count');
      setCounts(response.data);
    } catch (error) {
      console.error('Error fetching counts:', error);
    }
  };

  useEffect(() => {
    fetchCounts();
  }, []);

  return (
    <div className='count'>
      <h1>Counts</h1>
      <div className='counts'>
        <p>Add Count - {counts.addCount}</p>
        <p>Update Count - {counts.updateCount}</p>
      </div>
    </div>
  );
}

export default Count;