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
  tags: string[];
};

export type Review = {
  id: string;
  cityName: string;
  nickname: string;
  rating: number;
  date: string;
  content: string;
  hashtags: string[];
  coworkingId?: string;
};

export type Nomad = {
  id: string;
  nickname: string;
  city: string;
  online: boolean;
};

export type MeetupCategory = "네트워킹" | "스터디" | "워크숍" | "소셜";

export type Meetup = {
  id: string;
  title: string;
  date: string;
  city: string;
  rsvp: number;
  description: string;
  category: MeetupCategory;
  maxAttendees: number;
  organizer: string;
  tags: string[];
};

export type CoworkingSpace = {
  id: string;
  name: string;
  city: string;
  address: string;
  pricePerDay: number;
  wifi: boolean;
  amenities: string[];
  rating: number;
  reviewCount: number;
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
    tags: ["대도시", "IT허브", "교통편리"],
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
    tags: ["바다", "가성비", "여유"],
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
    tags: ["자연", "워케이션", "청정"],
  },
  {
    id: "daegu",
    rank: 4,
    name: "대구",
    nameEn: "Daegu",
    badge: "교통 요충지",
    costOfLiving: 55,
    internetSpeed: 85,
    networkQuality: 4,
    coworkingCount: 14,
    recommendedArea: "동성로, 수성구",
    rating: 4.4,
    reviewCount: 187,
    description: "대구 수성구와 동성로 중심의 활발한 스타트업 씬",
    tags: ["교통", "가성비", "대학가"],
  },
  {
    id: "incheon",
    rank: 5,
    name: "인천",
    nameEn: "Incheon",
    badge: "공항 접근성",
    costOfLiving: 62,
    internetSpeed: 90,
    networkQuality: 4,
    coworkingCount: 19,
    recommendedArea: "송도, 부평",
    rating: 4.3,
    reviewCount: 143,
    description: "인천국제공항 인접, 송도 스마트시티의 쾌적한 환경",
    tags: ["국제", "송도", "편리"],
  },
  {
    id: "gwangju",
    rank: 6,
    name: "광주",
    nameEn: "Gwangju",
    badge: "문화 도시",
    costOfLiving: 50,
    internetSpeed: 83,
    networkQuality: 3,
    coworkingCount: 11,
    recommendedArea: "충장로, 상무지구",
    rating: 4.2,
    reviewCount: 98,
    description: "아시아 문화중심도시, 저렴한 생활비와 풍부한 예술 문화",
    tags: ["문화", "예술", "가성비"],
  },
  {
    id: "daejeon",
    rank: 7,
    name: "대전",
    nameEn: "Daejeon",
    badge: "과학 도시",
    costOfLiving: 53,
    internetSpeed: 87,
    networkQuality: 4,
    coworkingCount: 16,
    recommendedArea: "둔산동, 유성구",
    rating: 4.3,
    reviewCount: 112,
    description: "대덕 연구단지와 KAIST 인근의 기술 중심 환경",
    tags: ["IT", "연구", "대학"],
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
    hashtags: ["#성수동", "#카페작업", "#기가와이파이"],
    coworkingId: "cw1",
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
    coworkingId: "cw8",
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
    coworkingId: "cw4",
  },
  {
    id: "r4",
    cityName: "서울",
    nickname: "SeoulCoder99",
    rating: 5,
    date: "2026.03.08",
    content:
      "강남 코워킹에서 미팅 후 테헤란로 걷기. 스타트업 에너지가 넘치는 도시예요. 곳곳에 개발자 컨퍼런스와 네트워킹 행사가 열려서 자극도 많이 받고 인맥도 쌓을 수 있어요.",
    hashtags: ["#강남", "#테헤란로", "#스타트업"],
    coworkingId: "cw2",
  },
  {
    id: "r5",
    cityName: "서울",
    nickname: "NomadMom",
    rating: 4,
    date: "2026.03.01",
    content:
      "아이 동반 노마드로 홍대 카페 투어 즐겼어요. 심야카페도 많고 분위기 다양해서 좋아요. 어린이 친화적인 공간도 꽤 있어서 가족 노마드에게도 추천합니다.",
    hashtags: ["#홍대", "#카페투어", "#서울노마드"],
  },
  {
    id: "r6",
    cityName: "부산",
    nickname: "SurfDev",
    rating: 5,
    date: "2026.02.20",
    content:
      "광안리 야경 보면서 코딩, 인생샷 찍고 퇴근. 부산이 이렇게 좋은 도시인지 몰랐어요. 서울에서 KTX 타면 2시간 반이라 이동도 부담 없고 주말 여행지로도 완벽해요.",
    hashtags: ["#광안리", "#야경", "#부산살이"],
  },
  {
    id: "r7",
    cityName: "제주",
    nickname: "MorningHiker",
    rating: 5,
    date: "2026.02.15",
    content:
      "한달살이 두 번째 방문. 서귀포 감귤밭 옆 카페에서 재택. 힐링 완료했습니다. 오전에 오름 트레킹하고 오후에 코딩하면 하루가 너무 알차요. 공기도 맑고 스트레스가 없어요.",
    hashtags: ["#서귀포", "#감귤", "#제주한달살이"],
    coworkingId: "cw9",
  },
  {
    id: "r8",
    cityName: "대구",
    nickname: "TechDaegu",
    rating: 4,
    date: "2026.03.05",
    content:
      "수성구 코워킹 스페이스 가격 대비 최고예요. 서울보다 훨씬 조용하고 집중 잘 돼요. 대구 스타트업 씬이 생각보다 활발해서 놀랐고, 지역 개발자 커뮤니티도 따뜻하게 맞아줬어요.",
    hashtags: ["#수성구", "#대구노마드", "#집중"],
  },
  {
    id: "r9",
    cityName: "인천",
    nickname: "SongdoWorker",
    rating: 4,
    date: "2026.02.25",
    content:
      "송도에서 3주 거주. 공원 산책하며 미팅하고 카페서 코딩. 국제도시 바이브가 좋아요. 센트럴파크 옆 카페에서 작업하면 마치 해외 도시에 있는 것 같은 느낌이 나요.",
    hashtags: ["#송도", "#인천노마드", "#공원"],
  },
  {
    id: "r10",
    cityName: "대전",
    nickname: "KaistNeighbor",
    rating: 5,
    date: "2026.03.12",
    content:
      "유성구 카페에서 연구자들과 네트워킹. 기술 이야기가 끊이질 않는 도시예요. KAIST, ETRI 연구원들과 자연스럽게 어울릴 수 있어서 기술적 영감을 받기에 최고의 환경입니다.",
    hashtags: ["#유성구", "#대전", "#테크노마드"],
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
    description: "서울 성수동에서 열리는 디지털 노마드 네트워킹 행사입니다. 프리랜서, 원격근무자, 스타트업 창업자들이 모여 경험을 나누고 인맥을 쌓는 자리입니다. 가볍게 음료 한 잔 하면서 다양한 사람들과 이야기 나눠보세요.",
    category: "네트워킹",
    maxAttendees: 50,
    organizer: "CodeNomad_K",
    tags: ["네트워킹", "성수동", "프리랜서"],
  },
  {
    id: "m2",
    title: "제주 코더스 위클리 밋업",
    date: "3월 22일 (토) 14:00",
    city: "제주",
    rsvp: 18,
    description: "제주에서 활동하는 개발자들의 주간 모임입니다. 각자의 사이드 프로젝트를 공유하고 기술 이야기를 나누는 캐주얼한 자리입니다. 노트북 지참 환영!",
    category: "스터디",
    maxAttendees: 25,
    organizer: "IslandWorker",
    tags: ["개발", "제주", "사이드프로젝트"],
  },
  {
    id: "m3",
    title: "부산 리모트워크 커피챗",
    date: "3월 25일 (화) 10:00",
    city: "부산",
    rsvp: 12,
    description: "해운대 바다 뷰 카페에서 진행하는 리모트워커들의 커피챗입니다. 원격근무 팁과 생산성 노하우를 자유롭게 공유하는 소규모 모임이에요.",
    category: "소셜",
    maxAttendees: 20,
    organizer: "RemoteDevBusan",
    tags: ["리모트워크", "해운대", "커피챗"],
  },
  {
    id: "m4",
    title: "서울 프리랜서 세금 스터디",
    date: "3월 27일 (목) 19:30",
    city: "서울",
    rsvp: 27,
    description: "프리랜서와 1인 사업자를 위한 세금 스터디입니다. 종합소득세 신고, 부가가치세, 경비 처리 방법 등 실질적인 세무 지식을 함께 공부합니다. 세무사 게스트 스피커 예정.",
    category: "스터디",
    maxAttendees: 40,
    organizer: "SeoulCoder99",
    tags: ["세금", "프리랜서", "재테크"],
  },
  {
    id: "m5",
    title: "제주 선셋 요가 & 네트워킹",
    date: "3월 29일 (토) 17:00",
    city: "제주",
    rsvp: 21,
    description: "제주 협재 해변에서 진행하는 선셋 요가와 네트워킹 행사입니다. 요가 세션 후 자연스럽게 네트워킹하는 힐링 밋업입니다. 요가 매트 지참 부탁드립니다.",
    category: "소셜",
    maxAttendees: 30,
    organizer: "JejuDesigner",
    tags: ["요가", "협재해변", "힐링"],
  },
  {
    id: "m6",
    title: "대구 노마드 첫 밋업",
    date: "4월 3일 (목) 19:00",
    city: "대구",
    rsvp: 9,
    description: "대구 디지털 노마드 커뮤니티의 첫 번째 공식 밋업입니다. 대구에서 활동하는 원격근무자, 프리랜서, 창업자들이 처음으로 한 자리에 모입니다. 새로운 인연의 시작이 될 특별한 자리입니다.",
    category: "네트워킹",
    maxAttendees: 30,
    organizer: "TechDaegu",
    tags: ["대구", "첫밋업", "커뮤니티"],
  },
  {
    id: "m7",
    title: "인천 송도 조식 네트워킹",
    date: "4월 5일 (토) 09:00",
    city: "인천",
    rsvp: 15,
    description: "송도 센트럴파크 인근에서 진행하는 조식 네트워킹입니다. 아침 식사를 함께하며 가볍게 대화를 나누는 편안한 모임입니다. 공원 산책 후 카페에서 이어집니다.",
    category: "네트워킹",
    maxAttendees: 25,
    organizer: "SongdoWorker",
    tags: ["송도", "조식", "공원"],
  },
  {
    id: "m8",
    title: "광주 문화노마드 투어",
    date: "4월 8일 (화) 14:00",
    city: "광주",
    rsvp: 11,
    description: "광주 문화예술의 도시를 함께 탐방하는 노마드 투어입니다. 국립아시아문화전당, 충장로 예술 거리를 함께 걷고 작업하기 좋은 카페와 공간을 소개합니다.",
    category: "소셜",
    maxAttendees: 20,
    organizer: "NomadMom",
    tags: ["광주", "문화투어", "예술"],
  },
  {
    id: "m9",
    title: "대전 사이드프로젝트 발표회",
    date: "4월 10일 (목) 19:30",
    city: "대전",
    rsvp: 22,
    description: "대전 개발자와 디자이너들의 사이드 프로젝트 발표 행사입니다. 5분 라이트닝 토크 형식으로 진행되며 피드백과 협업 기회를 찾을 수 있습니다. 발표자 사전 신청 환영!",
    category: "워크숍",
    maxAttendees: 35,
    organizer: "KaistNeighbor",
    tags: ["사이드프로젝트", "발표", "개발"],
  },
  {
    id: "m10",
    title: "부산 해운대 선셋 런닝",
    date: "4월 12일 (토) 17:30",
    city: "부산",
    rsvp: 19,
    description: "해운대 해변을 따라 달리는 선셋 런닝 모임입니다. 약 5km 코스로 편하게 달리고 이후 해변 카페에서 네트워킹합니다. 운동 실력 상관없이 누구나 환영합니다.",
    category: "소셜",
    maxAttendees: 30,
    organizer: "SurfDev",
    tags: ["런닝", "해운대", "운동"],
  },
  {
    id: "m11",
    title: "서울 UX/UI 디자인 워크숍",
    date: "4월 15일 (화) 14:00",
    city: "서울",
    rsvp: 16,
    description: "피그마를 활용한 실전 UX/UI 디자인 워크숍입니다. 노마드 플랫폼 디자인을 주제로 함께 작업하며 피드백을 주고받습니다. 피그마 계정 필수, 노트북 지참 바랍니다.",
    category: "워크숍",
    maxAttendees: 20,
    organizer: "SeoulCoder99",
    tags: ["UX", "피그마", "디자인"],
  },
  {
    id: "m12",
    title: "제주 영어 스터디 & 네트워킹",
    date: "4월 17일 (목) 18:00",
    city: "제주",
    rsvp: 14,
    description: "제주 노마드들을 위한 영어 스터디 겸 네트워킹 모임입니다. 영어 프레젠테이션 연습과 외국인 노마드와의 교류를 목적으로 합니다. 영어 초중급자도 환영합니다.",
    category: "스터디",
    maxAttendees: 20,
    organizer: "IslandWorker",
    tags: ["영어", "스터디", "외국인"],
  },
  {
    id: "m13",
    title: "부산 프리랜서 포트폴리오 리뷰",
    date: "4월 19일 (토) 13:00",
    city: "부산",
    rsvp: 10,
    description: "프리랜서 개발자와 디자이너를 위한 포트폴리오 상호 리뷰 세션입니다. 서로의 작업물을 솔직하게 피드백하고 더 나은 포트폴리오를 만들 수 있도록 도와줍니다.",
    category: "워크숍",
    maxAttendees: 15,
    organizer: "RemoteDevBusan",
    tags: ["포트폴리오", "프리랜서", "피드백"],
  },
  {
    id: "m14",
    title: "서울 스타트업 창업 스터디",
    date: "4월 22일 (화) 19:00",
    city: "서울",
    rsvp: 31,
    description: "스타트업 창업을 꿈꾸는 노마드들의 스터디 모임입니다. 비즈니스 모델, 투자 유치, MVP 개발 등 창업 전반에 걸친 내용을 함께 공부합니다. 현직 창업자 멘토링 포함.",
    category: "스터디",
    maxAttendees: 40,
    organizer: "CodeNomad_K",
    tags: ["창업", "스타트업", "멘토링"],
  },
  {
    id: "m15",
    title: "대전 AI 개발자 밋업",
    date: "4월 24일 (목) 19:00",
    city: "대전",
    rsvp: 25,
    description: "대전 KAIST, ETRI 인근의 AI 개발자와 연구자들이 모이는 밋업입니다. 최신 AI 트렌드와 실제 프로젝트 사례를 공유하고 협업 기회를 찾습니다.",
    category: "네트워킹",
    maxAttendees: 40,
    organizer: "KaistNeighbor",
    tags: ["AI", "개발", "연구"],
  },
];

export const coworkingSpaces: CoworkingSpace[] = [
  {
    id: "cw1",
    name: "패스트파이브 성수",
    city: "서울",
    address: "성동구 성수동",
    pricePerDay: 25000,
    wifi: true,
    amenities: ["회의실", "라운지", "프린터"],
    rating: 4.7,
    reviewCount: 89,
  },
  {
    id: "cw2",
    name: "위워크 강남",
    city: "서울",
    address: "강남구 테헤란로",
    pricePerDay: 35000,
    wifi: true,
    amenities: ["회의실", "루프탑", "카페"],
    rating: 4.5,
    reviewCount: 124,
  },
  {
    id: "cw3",
    name: "공유오피스 홍대",
    city: "서울",
    address: "마포구 와우산로",
    pricePerDay: 18000,
    wifi: true,
    amenities: ["라운지", "프린터", "락커"],
    rating: 4.4,
    reviewCount: 67,
  },
  {
    id: "cw4",
    name: "스페이스클라우드 해운대",
    city: "부산",
    address: "해운대구 우동",
    pricePerDay: 20000,
    wifi: true,
    amenities: ["회의실", "바다뷰", "카페"],
    rating: 4.6,
    reviewCount: 55,
  },
  {
    id: "cw5",
    name: "광안리 코워크",
    city: "부산",
    address: "수영구 광안해변로",
    pricePerDay: 15000,
    wifi: true,
    amenities: ["라운지", "테라스"],
    rating: 4.3,
    reviewCount: 43,
  },
  {
    id: "cw6",
    name: "서면 비즈허브",
    city: "부산",
    address: "부산진구 서면로",
    pricePerDay: 12000,
    wifi: true,
    amenities: ["회의실", "프린터", "주차"],
    rating: 4.2,
    reviewCount: 38,
  },
  {
    id: "cw7",
    name: "제주 스타트업파크",
    city: "제주",
    address: "제주시 첨단로",
    pricePerDay: 22000,
    wifi: true,
    amenities: ["회의실", "라운지", "카페"],
    rating: 4.8,
    reviewCount: 72,
  },
  {
    id: "cw8",
    name: "애월 리모트워크",
    city: "제주",
    address: "제주시 애월읍",
    pricePerDay: 18000,
    wifi: true,
    amenities: ["바다뷰", "테라스", "라운지"],
    rating: 4.7,
    reviewCount: 61,
  },
  {
    id: "cw9",
    name: "서귀포 워케이션 허브",
    city: "제주",
    address: "서귀포시 중앙로",
    pricePerDay: 16000,
    wifi: true,
    amenities: ["회의실", "정원", "카페"],
    rating: 4.5,
    reviewCount: 49,
  },
];
