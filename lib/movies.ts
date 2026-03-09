import { Movie } from './store';

export const moviesData: Movie[] = [
  {
    id: 1,
    title: 'Захар Беркут',
    titleEn: 'Zakhar Berkut',
    description: 'Епічна історія про боротьбу карпатських горян за свою землю та свободу проти монгольської навали. Фільм розповідає про героїзм та самопожертву українського народу.',
    rating: 8.2,
    year: 2019,
    duration: '120 хв',
    genre: ['Історичний', 'Драма', 'Бойовик'],
    backdrop: 'linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%)',
    poster: 'linear-gradient(135deg, #2d3561 0%, #4a5f8f 100%)',
    director: 'Ахтем Сеітаблаєв',
    cast: ['Роберт Патрік', 'Алекс Макбрайд', 'Попрі Ванга'],
    hasVoiceover: true,
    viewCount: 125000,
    isTrending: true
  },
  {
    id: 2,
    title: 'Атлантида',
    titleEn: 'Atlantis',
    description: 'Постапокаліптична драма про ветерана війни у зруйнованому Донбасі 2025 року. Фільм досліджує теми травми, виживання та пошуку сенсу життя після війни.',
    rating: 7.8,
    year: 2020,
    duration: '106 хв',
    genre: ['Драма', 'Sci-Fi', 'Військовий'],
    backdrop: 'linear-gradient(135deg, #0f2027 0%, #203a43 50%, #2c5364 100%)',
    poster: 'linear-gradient(135deg, #203a43 0%, #3a5f6c 100%)',
    director: 'Валентин Васянович',
    cast: ['Андрій Римарук', 'Людмила Білека'],
    hasVoiceover: true,
    viewCount: 98000,
    isTrending: true
  },
  {
    id: 3,
    title: 'Толока',
    titleEn: 'Toloka',
    description: 'Містична історія про українське село та його таємниці, де реальність переплітається з фольклором. Атмосферний трилер про традиції та їх темну сторону.',
    rating: 7.5,
    year: 2020,
    duration: '95 хв',
    genre: ['Трилер', 'Містика', 'Драма'],
    backdrop: 'linear-gradient(135deg, #4a148c 0%, #6a1b9a 50%, #8e24aa 100%)',
    poster: 'linear-gradient(135deg, #6a1b9a 0%, #8e24aa 100%)',
    director: 'Михайло Іллєнко',
    cast: ['Григорій Боковенко', 'Євген Ламах'],
    hasVoiceover: true,
    viewCount: 87000,
    isTrending: false
  },
  {
    id: 4,
    title: 'Додому',
    titleEn: 'Home',
    description: 'Зворушлива драма про повернення додому після довгих років відсутності. Історія про родинні зв\'язки, пробачення та пошук свого місця у світі.',
    rating: 7.9,
    year: 2019,
    duration: '110 хв',
    genre: ['Драма'],
    poster: 'linear-gradient(135deg, #2d3561 0%, #c05c7e 100%)',
    backdrop: 'linear-gradient(135deg, #2d3561 0%, #c05c7e 50%, #f3a183 100%)',
    director: 'Наріман Алієв',
    hasVoiceover: true,
    viewCount: 76000,
    isTrending: false
  },
  {
    id: 5,
    title: 'Бліндаж',
    titleEn: 'Blindage',
    description: 'Потужна історія про життя людей у прифронтовій зоні, їхню стійкість та надію на краще майбутнє попри всі випробування війною.',
    rating: 8.0,
    year: 2021,
    duration: '92 хв',
    genre: ['Драма', 'Військовий'],
    poster: 'linear-gradient(135deg, #4b6cb7 0%, #182848 100%)',
    backdrop: 'linear-gradient(135deg, #4b6cb7 0%, #182848 50%, #0a0e27 100%)',
    director: 'Олександр Течинський',
    hasVoiceover: true,
    viewCount: 92000,
    isTrending: true
  },
  {
    id: 6,
    title: 'Кіборги',
    titleEn: 'Cyborgs',
    description: 'Героїчна історія оборони Донецького аеропорту українськими воїнами. Фільм про мужність, братерство та незламний дух українських захисників.',
    rating: 8.5,
    year: 2017,
    duration: '112 хв',
    genre: ['Бойовик', 'Військовий', 'Драма'],
    poster: 'linear-gradient(135deg, #1f4037 0%, #99f2c8 100%)',
    backdrop: 'linear-gradient(135deg, #1f4037 0%, #99f2c8 50%, #667db6 100%)',
    director: 'Ахтем Сеітаблаєв',
    hasVoiceover: true,
    viewCount: 145000,
    isTrending: true
  },
  {
    id: 7,
    title: 'Поводир',
    titleEn: 'The Guide',
    description: 'Історична драма про американського інженера в Україні 30-х років під час Голодомору. Свідчення про трагічні події та людську стійкість.',
    rating: 7.6,
    year: 2014,
    duration: '99 хв',
    genre: ['Історичний', 'Драма'],
    poster: 'linear-gradient(135deg, #ee0979 0%, #ff6a00 100%)',
    backdrop: 'linear-gradient(135deg, #ee0979 0%, #ff6a00 50%, #ffa726 100%)',
    director: 'Олесь Санін',
    hasVoiceover: true,
    viewCount: 68000,
    isTrending: false
  },
  {
    id: 8,
    title: 'Чорний ворон',
    titleEn: 'Black Raven',
    description: 'Атмосферний містичний трилер про таємниці карпатських лісів, древні легенди та сучасність, що переплітається з минулим.',
    rating: 7.3,
    year: 2019,
    duration: '87 хв',
    genre: ['Трилер', 'Містика'],
    poster: 'linear-gradient(135deg, #232526 0%, #414345 100%)',
    backdrop: 'linear-gradient(135deg, #232526 0%, #414345 50%, #667db6 100%)',
    director: 'Тарас Химич',
    hasVoiceover: true,
    viewCount: 54000,
    isTrending: false
  },
  {
    id: 9,
    title: 'Номери',
    titleEn: 'Numbers',
    description: 'Драма-комедія про життя різних людей у провінційному готелі, їхні долі та несподівані зустрічі. Кіно про людяність та розуміння.',
    rating: 7.4,
    year: 2020,
    duration: '103 хв',
    genre: ['Драма', 'Комедія'],
    poster: 'linear-gradient(135deg, #667db6 0%, #0082c8 100%)',
    backdrop: 'linear-gradient(135deg, #667db6 0%, #0082c8 50%, #00b4db 100%)',
    director: 'Олег Сенцов',
    hasVoiceover: false,
    viewCount: 61000,
    isTrending: false
  },
  {
    id: 10,
    title: 'Ной',
    titleEn: 'Noah',
    description: 'Сучасна інтерпретація біблійної історії в українських реаліях. Філософська драма про віру, надію та порятунок.',
    rating: 7.7,
    year: 2021,
    duration: '98 хв',
    genre: ['Драма', 'Фентезі'],
    poster: 'linear-gradient(135deg, #355c7d 0%, #6c5b7b 50%, #c06c84 100%)',
    backdrop: 'linear-gradient(135deg, #355c7d 0%, #6c5b7b 50%, #c06c84 100%)',
    director: 'Михайло Іллєнко',
    hasVoiceover: true,
    viewCount: 72000,
    isTrending: false
  },
  {
    id: 11,
    title: 'Віддалік',
    titleEn: 'From a Distance',
    description: 'Актуальна історія про родину в часи пандемії, ізоляції та пошуку нових форм зв\'язку між людьми у цифрову епоху.',
    rating: 7.1,
    year: 2021,
    duration: '89 хв',
    genre: ['Драма'],
    poster: 'linear-gradient(135deg, #485563 0%, #29323c 100%)',
    backdrop: 'linear-gradient(135deg, #485563 0%, #29323c 50%, #1a1f26 100%)',
    director: 'Тарас Дуда',
    hasVoiceover: true,
    viewCount: 48000,
    isTrending: false
  },
  {
    id: 12,
    title: 'Стоп-Земля',
    titleEn: 'Stop-Earth',
    description: 'Фантастична драма про дівчину, яка може зупиняти час. Фільм про підлітковість, дорослішання та прийняття себе.',
    rating: 7.8,
    year: 2020,
    duration: '105 хв',
    genre: ['Sci-Fi', 'Драма'],
    poster: 'linear-gradient(135deg, #fc4a1a 0%, #f7b733 100%)',
    backdrop: 'linear-gradient(135deg, #fc4a1a 0%, #f7b733 50%, #ffd700 100%)',
    director: 'Катерина Горностай',
    hasVoiceover: true,
    viewCount: 83000,
    isTrending: true
  },
  {
    id: 13,
    title: 'Межа',
    titleEn: 'The Border',
    description: 'Напружений трилер про прикордонників на східному кордоні України. Фільм про відповідальність, вибір та патріотизм.',
    rating: 7.9,
    year: 2018,
    duration: '98 хв',
    genre: ['Трилер', 'Драма'],
    poster: 'linear-gradient(135deg, #1e3c72 0%, #2a5298 100%)',
    backdrop: 'linear-gradient(135deg, #1e3c72 0%, #2a5298 50%, #3f6fb5 100%)',
    director: 'Леонтій Когут',
    hasVoiceover: true,
    viewCount: 69000,
    isTrending: false
  },
  {
    id: 14,
    title: 'Ціна правди',
    titleEn: 'Mr. Jones',
    description: 'Історія про британського журналіста, який розкрив правду про Голодомор в Україні. Важлива історична драма про пошук істини.',
    rating: 8.1,
    year: 2019,
    duration: '119 хв',
    genre: ['Історичний', 'Драма', 'Біографія'],
    poster: 'linear-gradient(135deg, #283048 0%, #859398 100%)',
    backdrop: 'linear-gradient(135deg, #283048 0%, #859398 50%, #b8c6db 100%)',
    director: 'Агнєшка Холланд',
    hasVoiceover: true,
    viewCount: 112000,
    isTrending: true
  },
  {
    id: 15,
    title: 'Додолюб',
    titleEn: 'Crazy Wedding',
    description: 'Легка романтична комедія про підготовку до весілля з безліччю несподіваних поворотів. Веселий фільм для всієї родини.',
    rating: 6.8,
    year: 2018,
    duration: '92 хв',
    genre: ['Комедія', 'Романтика'],
    poster: 'linear-gradient(135deg, #fa709a 0%, #fee140 100%)',
    backdrop: 'linear-gradient(135deg, #fa709a 0%, #fee140 50%, #ffd700 100%)',
    director: 'Микола Засєєв-Руденко',
    hasVoiceover: true,
    viewCount: 95000,
    isTrending: false
  }
];

export const genres = [
  'all',
  'Драма',
  'Бойовик',
  'Історичний',
  'Sci-Fi',
  'Трилер',
  'Містика',
  'Військовий',
  'Комедія',
  'Фентезі',
  'Романтика',
  'Біографія'
];

export const getMovieById = (id: number): Movie | undefined => {
  return moviesData.find(movie => movie.id === id);
};

export const getTrendingMovies = (): Movie[] => {
  return moviesData.filter(movie => movie.isTrending).slice(0, 6);
};

export const getTopRatedMovies = (): Movie[] => {
  return [...moviesData].sort((a, b) => b.rating - a.rating).slice(0, 10);
};

export const getMoviesByGenre = (genre: string): Movie[] => {
  if (genre === 'all') return moviesData;
  return moviesData.filter(movie => movie.genre.includes(genre));
};
