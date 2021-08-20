

export interface appConfig {
    walkthrough: boolean,
    login: boolean,
    access: string,
};

export interface fileModel {
    name: string,
    size: string,
    path: string,
    data: any
}

export interface authModel {
    email: string,
    number: string,
    password: string
}

export interface userProfile {
    email: string,
    displayName: string,
    phoneNumber: String,
    photoURL: string,
    providerId: string,
    uid: string
};

export interface Movie {
    id: number;
    title: string;
    overview: string;
    release_date: string;
    vote_count: number;
    vote_average: number;
    poster_path: string;
    backdrop_path: string;
    original_language: string;
    original_title: string;
    popularity: number;
    adult: boolean;
    video: boolean;
    // detail
    runtime?: number;
    budget?: number;
    production_companies?: {
      id: number;
      logo_path: string;
      name: string;
      origin_country: string;
    }[];
    genres?: {
      id: number;
      name: string;
    }[];
    credits?: {
      cast?: {
        name?: string,
        profile_path?: string,
        character?: string
      }[];
    };
}

export interface Person {
    id: number;
    name: string;
    birthday: string;
    deathday: string;
    biography: string;
    popularity: number;
    place_of_birth: string;
    profile_path: string;
    adult: boolean;
    imdb_id: string;
    homepage: string;
    also_known_as: string[];
    credits: {
      cast: {
        id: number;
        title: string;
        character: string;
        original_title: string;
        release_date: string;
        adult: boolean;
        poster_path: string;
        credit_id: string;
      }[]
    };
  }
  
  