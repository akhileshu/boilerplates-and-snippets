// Notes.js - Pseudocode

function Notes({ value, onChange }) {
  // RENDER LOGIC
  return (
    <div>
      <h3>Notes / Key Points</h3>
      <textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Jot down key points after each block..."
        rows="10"
        cols="50"
      />
    </div>
  );
}