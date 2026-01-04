export type Weather = "windy" | "stormy" | "cloudy" | "rainy" | "sunny";
export type Visibility = "poor" | "ok" | "good" | "great";

export interface Diary {
  id: number;
  date: string;
  weather: Weather;
  visibility: Visibility;
  comment?: string;
}

export type NewDiary = Omit<Diary, "id">;
