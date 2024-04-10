
function Count({ counts }) {
  
  return (
    <div className='count'>
      <h1>Counts</h1>
      <div className='counts'>
        <p>Add Count - {counts?.addCount}</p>
        <p>Update Count - {counts?.updateCount}</p>
      </div>
    </div>
  );
}

export default Count;