export class PostSawgger {
  // ------------------------ GENRE ------------------------
  static genreDate = {
    id: 1,
    createdAt: '2025-09-13T07:02:33.525Z',
    updatedAt: '2025-09-13T07:02:33.525Z',
    name: 'Action',
  };

  static genreAll = {
    id: 1,
    name: 'Action',
  };
  // ------------------------ COUNTRY ------------------------
  static countryDate = {
    id: 1,
    createdAt: '2025-09-13T07:02:33.525Z',
    updatedAt: '2025-09-13T07:02:33.525Z',
    name: 'Uzbekiston',
    movies: [],
  };

  static countryAll = {
    id: 2,
    name: 'Uzbeksiton',
    movies: [],
  };

  // ------------------------ MOVIE ------------------------
  static movieDate = {
    createdAt: '2025-09-13T13:01:23.862Z',
    title: 'Inception',
    description: 'A mind-bending thriller about dreams within dreams.',
    duration: '02:15:20',
    realase_date: '2010-07-16',
    image_url: 'https://example.com/movie-image.jpg',
    video_url: 'https://example.com/movie-video.mp4',
    language: 'Uzb',
    admin: {
      id: 1,
      name: 'Komol',
      username: 'admin123!@',
      role: 'SUPERADMIN',
    },
    genre: {
      id: 9,
      name: 'Action',
    },
    country: {
      id: 1,
      name: 'Uzbeksiton',
    },
  };

  static movieAll = {
    id: 1,
    title: 'Inception',
    description: 'A mind-bending thriller about dreams within dreams.',
    duration: '02:15:20',
    admin: {
      id: 1,
      name: 'John',
      username: 'john123!@',
      role: 'ADMIN',
    },
    genre: {
      id: 9,
      name: 'Action',
    },
    country: {
      id: 1,
      name: 'Uzbeksiton',
    },
  };
  // ------------------------ REVIEW ------------------------

  static reviewDate = {
    id: 1,
    createdAt: '2025-09-13T15:00:57.124Z',
    updatedAt: '2025-09-13T15:00:57.124Z',
    comment: 'Ajoyib film, juda yoqdi!',
    rating: 5,
    customer: {
      id: 1,
      name: 'Alice Johnson',
      email: 'www.komol8689@gmail.com',
    },
    movie: {
      id: 1,
      createdAt: '2025-09-13T14:35:25.417Z',
      title: 'Inception 2',
    },
  };

  static reviewAll = {
    id: 1,
    comment: 'Ajoyib film, juda yoqdi!',
    rating: 5,
    customer: {
      id: 1,
      name: 'Alice Johnson',
      email: 'www.komol8689@gmail.com',
    },
    movie: {
      id: 1,
      createdAt: '2025-09-13T14:35:25.417Z',
      title: 'Inception 2',
    },
  };

  // --------------------------- ROOM ---------------------------

  static roomDate = {
    id: 2,
    createdAt: '2025-09-13T16:05:35.815Z',
    updatedAt: '2025-09-13T16:05:35.815Z',
    name: 'VIP Hall 2',
    location: '1st Floor, Building A',
    total_seats: 120,
    is_active: true,
  };
}
