const GUIDES = {
  "bench press": "https://www.youtube.com/watch?v=rT7DgCr-3pg",
  "squat":       "https://www.youtube.com/watch?v=ultWZbUMPL8",
  "deadlift":    "https://www.youtube.com/watch?v=op9kVnSso6Q",
  "pull-up":     "https://www.youtube.com/watch?v=eGo4IYlbE5g",
  "incline db":  "https://www.youtube.com/watch?v=8iPEnn-ltC8",
  "leg press":   "https://www.youtube.com/watch?v=IZxyjW7MPJQ",
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