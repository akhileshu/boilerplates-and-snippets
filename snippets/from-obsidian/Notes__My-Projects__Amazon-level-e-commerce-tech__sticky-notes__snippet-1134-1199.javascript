// App.js - Pseudocode

function App() {
  // STATE
  // The entire session plan created by the user
  const [sessionPlan, setSessionPlan] = useState(null); // e.g., { tasks: [...], blockDuration: 30, breakDuration: 5 }
  // Holds all notes taken during the session
  const [sessionNotes, setSessionNotes] = useState("");
  // Tracks if the session is running or not
  const [isSessionActive, setIsSessionActive] = useState(false);
  // Holds saved session structures for quick re-use
  const [templates, setTemplates] = useState([]); // Bonus Feature

  // FUNCTIONS
  // Function to start the session, passed from SessionCreator
  function handleStartSession(plan) {
    setSessionPlan(plan);
    setIsSessionActive(true);
  }

  // Function called when the timer component signals the session is over
  function handleSessionEnd(finalNotes) {
    setSessionNotes(finalNotes);
    setIsSessionActive(false);
    // show analytics here (Bonus Feature)
  }

  // Function to save the final notes to a file (simplified)
  function exportNotesToObsidian() {
    // Logic to create a markdown file with sessionNotes and sessionPlan details
    // and trigger a download for the user.
    console.log("Exporting notes:", sessionNotes);
  }

  // Bonus Feature: Save the current plan as a template
  function saveCurrentPlanAsTemplate(templateName) {
    // Logic to add sessionPlan to the templates array with a name
  }

  // RENDER LOGIC
  return (
    <div>
      <h1>Focus Session App</h1>

      { if (!isSessionActive) {
          // If no session is active, show the creation form
          <SessionCreator onStart={handleStartSession} savedTemplates={templates} />
        } else {
          // If session is active, show the timer and notes
          <TimerDisplay plan={sessionPlan} onEnd={handleSessionEnd} />
        }
      }

      { if (sessionNotes && !isSessionActive) {
          // After session ends, show notes and export button
          <h2>Session Complete!</h2>
          <pre>{sessionNotes}</pre>
          <button onClick={exportNotesToObsidian}>Save to Obsidian</button>
          // Optionally display <Analytics report={...} /> here (Bonus Feature)
        }
      }
    </div>
  );
}