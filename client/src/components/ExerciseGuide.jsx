const GUIDES = {
  "bench press": "https://en.wikipedia.org/wiki/Bench_press",
  "squat":       "https://en.wikipedia.org/wiki/Squat_(exercise)",
  "deadlift":    "https://en.wikipedia.org/wiki/Deadlift",
  "pull-up":     "https://en.wikipedia.org/wiki/Pull-up",
  "incline db":  "https://musclewiki.com/exercise/dumbbell-incline-bench-press",
  "leg press":   "https://en.wikipedia.org/wiki/Leg_press",  
  "Overhead Press": "https://en.wikipedia.org/wiki/Overhead_press",
  "Barbell Row": "https://en.wikipedia.org/wiki/Bent-over_row",
  "Bicep Curl": "https://en.wikipedia.org/wiki/Bicep_curl",
  "Tricep Pushdown": "https://en.wikipedia.org/wiki/Push-down_(exercise)",
};

export default function ExerciseGuide({ exerciseName }) {
  const key = Object.keys(GUIDES).find(k =>
    exerciseName?.toLowerCase().includes(k)
  );

  const url = GUIDES[key];


  if (!url) return null;

  return (
    <a href={url} target="_blank" rel="noreferrer" className="guide-link">
      📖 How to do this
    </a>
  );
}