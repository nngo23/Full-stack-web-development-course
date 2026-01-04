import { useState, useEffect } from "react";
import { Diary } from "./types";
import { getAllDiaries, createDiary } from "./diaryService";

const App = () => {
  const [newDiary, setNewDiary] = useState("");
  const [date, setDate] = useState("");
  const [weather, setWeather] = useState("");
  const [visibility, setVisibility] = useState("");
  const [diaries, setDiaries] = useState<Diary[]>([]);

  useEffect(() => {
    getAllDiaries().then((data: Diary[]) => {
      setDiaries(data);
    });
  }, []);

  const diaryCreation = (event: React.SyntheticEvent) => {
    event.preventDefault();
    createDiary({ comment, date, weather, visibility: newDiary }).then(
      (data: Diary) => {
        setDiaries(diaries.concat(data));
      }
    );
    setNewDiary("");
    setDate("");
    setWeather("");
    setVisibility("");
  };

  return (
    <div>
      <form onSubmit={diaryCreation}>
        <input
          placeholder="date"
          value={date}
          onChange={(event) => setDate(event.target.value)}
        />
        <input
          placeholder="weather"
          value={weather}
          onChange={(event) => setWeather(event.target.value)}
        />
        <input
          placeholder="visibility"
          value={visibility}
          onChange={(event) => setVisibility(event.target.value)}
        />
        <input
          placeholder="comment"
          value={newDiary}
          onChange={(event) => setNewDiary(event.target.value)}
        />
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
