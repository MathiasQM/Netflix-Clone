import { ObjectId } from "mongodb";

export interface Movie {
  _id: ObjectId; // MongoDB's ObjectId type
  plot: string;
  genres: string[];
  runtime: number;
  rated: string;
  cast: string[];
  num_mflix_comments: number;
  poster: string;
  title: string;
  fullplot: string;
  languages: string[];
  released: string; // ISO date string
  directors: string[];
  writers: string[];
  awards: {
    wins: number;
    nominations: number;
    text: string;
  };
  lastupdated: string; // Timestamp as a string
  year: number;
  imdb: {
    rating: number;
    votes: number;
    id: number;
  };
  tomatoes: {
    viewer: {
      rating: number;
      numReviews: number;
      meter: number;
    };
    production: string;
    lastUpdated: string; // Timestamp as a string
  };
  countries: string[];
  type: string;
}
