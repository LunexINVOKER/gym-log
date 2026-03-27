const GUIDES = {
  "bench press": "https://www.youtube.com/watch?v=",
  "squat":       "https://www.youtube.com/watch?v=",
  "deadlift":    "https://www.youtube.com/watch?v=",
  "pull-up":     "https://www.youtube.com/watch?v=",
  "incline db":  "https://www.youtube.com/watch?v=",
  "leg press":   "https://www.youtube.com/watch?v=",
};

export default function ExerciseGuide({ exerciseName }) {
  const key = Object.keys(GUIDES).find(k =>
    exerciseName?.toLowerCase().includes(k)
  );

  const url = GUIDES[key];

  if (!url) return null;

  return (
    <a href={url} target="_blank" rel="noreferrer" className="guide-link">
      How to do this
    </a>
  );
}
