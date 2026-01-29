// TimerDisplay.js - Pseudocode

function TimerDisplay({ plan, onEnd }) {
  // STATE
  // Creates a flat array of all blocks and breaks, e.g., ['orders', 'break', 'orders', 'break',...]
  const [schedule, setSchedule] = useState([]); // Generated from the 'plan' prop
  const [currentBlockIndex, setCurrentBlockIndex] = useState(0);
  const [timeLeft, setTimeLeft] = useState(0); // in seconds
  const [isBreak, setIsBreak] = useState(false);
  const [notes, setNotes] = useState("");

  // EFFECT for initializing the timer
  useEffect(() => {
    // On first load, create the flat 'schedule' array from the plan prop
    // Set 'timeLeft' to the duration of the first block
  }, [plan]);

  // EFFECT for the countdown logic
  useEffect(() => {
    // If timeLeft is 0, move to the next block or end the session
    if (timeLeft === 0) {
      // Play a sound
      // Check if there are more blocks in the schedule
      if (currentBlockIndex < schedule.length - 1) {
        // Move to the next block
        const nextIndex = currentBlockIndex + 1;
        setCurrentBlockIndex(nextIndex);
        // Set 'isBreak' and 'timeLeft' for the next block
      } else {
        // Session is over
        onEnd(notes);
      }
      return;
    }

    // Use setInterval to decrease timeLeft by 1 every second
    const timerId = setInterval(() => {
      setTimeLeft(timeLeft - 1);
    }, 1000);

    // Cleanup function to clear the interval
    return () => clearInterval(timerId);
  }, [timeLeft, currentBlockIndex]);

  // RENDER LOGIC
  return (
    <div>
      <h2>
        { isBreak ? "BREAK" : `Task: ${schedule[currentBlockIndex]}` }
      </h2>
      <div className="timer-digits">
        {/* Display formatted timeLeft (e.g., 29:59) */}
      </div>

      <Notes value={notes} onChange={setNotes} />
    </div>
  );
}