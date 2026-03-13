export type City = {
  id: string;
  rank: number;
  name: string;
  nameEn: string;
  badge: string;
  costOfLiving: number; // 0-100
  internetSpeed: number; // 0-100
  networkQuality: number; // 1-5
  coworkingCount: number;
  recommendedArea: string;
  rating: number;
  reviewCount: number;
  description: string;
};

export type Review = {
  id: string;
  cityName: string;
  nickname: string;
  rating: number;
  date: string;
  content: string;
  hashtags: string[];
};

export type Nomad = {
  id: string;
  nickname: string;
  city: string;
  online: boolean;
};

export type Meetup = {
  id: string;
  title: string;
  date: string;
  city: string;
  rsvp: number;
};

export const cities: City[] = [
  {
    id: "seoul",
    rank: 1,
    name: "서울",
    nameEn: "Seoul",
    badge: "인기 1위",
    costOfLiving: 72,
    internetSpeed: 95,
    networkQuality: 5,
    coworkingCount: 48,
    recommendedArea: "성수동, 홍대, 강남",
    rating: 4.8,
    reviewCount: 524,
    description: "세계 최고 수준의 인터넷 인프라와 다양한 코워킹 스페이스",
  },
  {
    id: "busan",
    rank: 2,
    name: "부산",
    nameEn: "Busan",
    badge: "가성비 최고",
    costOfLiving: 58,
    internetSpeed: 88,
    networkQuality: 4,
    coworkingCount: 22,
    recommendedArea: "해운대, 광안리, 남포동",
    rating: 4.6,
    reviewCount: 312,
    description: "바다를 바라보며 작업하는 특별한 경험, 서울보다 저렴한 생활비",
  },
  {
    id: "jeju",
    rank: 3,
    name: "제주",
    nameEn: "Jeju",
    badge: "자연 최고",
    costOfLiving: 65,
    internetSpeed: 82,
    networkQuality: 4,
    coworkingCount: 18,
    recommendedArea: "제주시, 서귀포, 애월",
    rating: 4.7,
    reviewCount: 404,
    description: "아름다운 자연 속에서 일과 휴식의 완벽한 균형",
  },
];

export const reviews: Review[] = [
  {
    id: "r1",
    cityName: "서울",
    nickname: "CodeNomad_K",
    rating: 5,
    date: "2026.03.10",
    content:
      "성수동 카페에서 작업하는 느낌이 정말 좋아요. 기가비트 와이파이에 노트북 충전 포트도 넉넉하고, 주변에 맛집도 많아서 점심 걱정이 없네요. 한 달 살기 강력 추천합니다!",
    hashtags: ["#성수동", "#카페작업", "#긱가이파이"],
  },
  {
    id: "r2",
    cityName: "제주",
    nickname: "IslandWorker",
    rating: 5,
    date: "2026.03.05",
    content:
      "제주에서 3개월 살았는데 인생 최고의 경험이었어요. 애월 카페에서 바다 보면서 코딩하다 보면 시간 가는 줄 모르고, 퇴근 후엔 한라산 트레킹. 번아웃 완전 해소됐습니다.",
    hashtags: ["#제주살이", "#애월카페", "#워케이션"],
  },
  {
    id: "r3",
    cityName: "부산",
    nickname: "RemoteDevBusan",
    rating: 4,
    date: "2026.02.28",
    content:
      "해운대 근처 코워킹 스페이스 가격 대비 퀄리티 최고예요. 서울보다 훨씬 여유롭고 바다 산책도 가능해서 스트레스 관리에 좋습니다. 다만 글로벌 밋업은 서울보다 적은 편.",
    hashtags: ["#해운대", "#코워킹", "#부산노마드"],
  },
];

export const nomads: Nomad[] = [
  { id: "n1", nickname: "CodeNomad_K", city: "서울", online: true },
  { id: "n2", nickname: "IslandWorker", city: "제주", online: true },
  { id: "n3", nickname: "BusanDev", city: "부산", online: true },
  { id: "n4", nickname: "SeoulFreelancer", city: "서울", online: false },
  { id: "n5", nickname: "JejuDesigner", city: "제주", online: true },
];

export const meetups: Meetup[] = [
  {
    id: "m1",
    title: "서울 노마드 네트워킹 나잇",
    date: "3월 20일 (목) 19:00",
    city: "서울",
    rsvp: 34,
  },
  {
    id: "m2",
    title: "제주 코더스 위클리 밋업",
    date: "3월 22일 (토) 14:00",
    city: "제주",
    rsvp: 18,
  },
  {
    id: "m3",
    title: "부산 리모트워크 커피챗",
    date: "3월 25일 (화) 10:00",
    city: "부산",
    rsvp: 12,
  },
  {
    id: "m4",
    title: "서울 프리랜서 세금 스터디",
    date: "3월 27일 (목) 19:30",
    city: "서울",
    rsvp: 27,
  },
  {
    id: "m5",
    title: "제주 선셋 요가 & 네트워킹",
    date: "3월 29일 (토) 17:00",
    city: "제주",
    rsvp: 21,
  },
];
