const EXERCISES = [
  "Bench Press",
  "Incline Dumbbell Press",
  "Squat",
  "Leg Press",
  "Deadlift",
  "Pull-up",
  "Overhead Press",
  "Barbell Row",
  "Bicep Curl",
  "Tricep Pushdown",
];

export default function ExerciseSuggestions({value, onSelect}) {
  const matches = EXERCISES.filter(ex => 
    ex.toLowerCase().includes(value.toLowerCase())
  );

if(!value || matches.length === 0) { 
  return null;
}

return (
  <ul className="suggestion-list">
    {matches.map(ex => (
    <li
    key={ex}
    className="suggestion-item"
    onClick={() => onSelect(ex)}
    >
      {ex}
    </li>
    ))}
  </ul>
);
}


