import axios from "axios";
import { useState, useEffect } from "react";
import { Diary, Weather, Visibility } from "./types";
import { getAllDiaries, createDiary } from "./diaryService";
import Notification from "./Notification";

const App = () => {
  const [comment, setComment] = useState("");
  const [date, setDate] = useState("");
  const [weather, setWeather] = useState<Weather | "">("");
  const [visibility, setVisibility] = useState<Visibility | "">("");
  const [diaries, setDiaries] = useState<Diary[]>([]);
  const [err, setError] = useState("");

  useEffect(() => {
    getAllDiaries().then((data: Diary[]) => {
      setDiaries(data);
    });
  }, []);

  const handleSubmit = async (event: React.SyntheticEvent) => {
    event.preventDefault();
    try {
      await createDiary({ comment, date, weather, visibility }).then(
        (data: Diary) => {
          setDiaries(diaries.concat(data));
        }
      );
      setComment("");
      setDate("");
      setWeather("");
      setVisibility("");
    } catch (err: unknown) {
      if (axios.isAxiosError(err)) {
        setError(
          typeof err.response?.data === "string"
            ? err.response.data
            : "Request failed"
        );
      } else {
        setError("Unexpected error occurred");
      }

      setTimeout(() => {
        setError(null);
      }, 5000);
    }
  };

  const weatherOptions: Weather[] = [
    "windy",
    "stormy",
    "cloudy",
    "rainy",
    "sunny",
  ];
  const visibilityOptions: Visibility[] = ["poor", "ok", "good", "great"];

  return (
    <div>
      <Notification errorMessage={err} />
      <h2>Add new entry</h2>
      <form onSubmit={handleSubmit}>
        <label>
          date
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
          />
        </label>
        <div>
          <label>visibility</label>
          {visibilityOptions.map((option) => (
            <label key={option}>
              <input
                type="radio"
                value={option}
                required
                checked={visibility === option}
                onChange={() => setVisibility(option)}
              />
              {option}
            </label>
          ))}
        </div>
        <div>
          <label>weather</label>
          {weatherOptions.map((op) => (
            <label key={op}>
              <input
                type="radio"
                value={op}
                onChange={() => setWeather(op)}
                checked={weather === op}
                required
              />
              {op}
            </label>
          ))}
        </div>
        <div>
          comment
          <input value={comment} onChange={(e) => setComment(e.target.value)} />
        </div>
        <button type="submit">add</button>
      </form>
      <h2>Diary entries</h2>
      <div>
        {diaries.map((diary) => (
          <div key={diary.id}>
            <h3>{diary.date}</h3>
            <div>visibility: {diary.visibility}</div>
            <div>weather: {diary.weather}</div>
            <div>comment: {diary.comment}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default App;
