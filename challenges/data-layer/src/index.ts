export interface DataEntity {
  id: string;
}

export interface Movie extends DataEntity {
  director: string;
}

export interface Song extends DataEntity {
  singer: string;
}

// export interface Comic extends DataEntity {
//   issueNumber: number;
// }

export type DataEntityMap = {
  movie: Movie;
  song: Song;
  // comic: Comic;
};

type DataStoreMethods = {
  [K in keyof DataEntityMap as `getAll${Capitalize<K>}s`]: () => DataEntityMap[K][];
} & {
  [K in keyof DataEntityMap as `get${Capitalize<K>}`]: (
    id: number
  ) => DataEntityMap[K];
} & {
  [K in keyof DataEntityMap as `clear${Capitalize<K>}s`]: () => void;
} & {
  [K in keyof DataEntityMap as `add${Capitalize<K>}`]: (
    arg: DataEntityMap[K]
  ) => DataEntityMap[K];
};

function isDefined<T>(x: T | undefined): x is T {
  return typeof x !== "undefined";
}

class DataStore implements DataStoreMethods {
  #data: { [K in keyof DataEntityMap]: Record<string, DataEntityMap[K]> } = {
    movie: {},
    song: {},
  };

  addSong(song: Song): Song {
    this.#data.song[song.id] = song;
    return song;
  }

  getAllSongs(): Song[] {
    return Object.keys(this.#data.song)
      .map((songKey) => this.#data.song[songKey])
      .filter(isDefined);
  }

  getSong(songKey: number): Song {
    const song = this.#data.song[songKey];
    if (!song) throw new Error(`Could not find song for id: ${songKey}`);
    return song;
  }

  clearSongs(): void {
    this.#data.song = {};
  }

  addMovie(movie: Movie): Movie {
    this.#data.movie[movie.id] = movie;
    return movie;
  }

  getAllMovies(): Movie[] {
    return Object.keys(this.#data.movie)
      .map((movieKey) => this.#data.movie[movieKey])
      .filter(isDefined);
  }

  getMovie(movieKey: number): Movie {
    const movie = this.#data.movie[movieKey];
    if (!movie) throw new Error(`Could not find movie for id: ${movieKey}`);
    return movie;
  }

  clearMovies(): void {
    this.#data.movie = {};
  }
}

export { DataStore };
