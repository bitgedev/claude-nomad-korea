import {
  rowToCity,
  rowToCoworkingSpace,
  rowToReview,
  rowToMeetup,
  rowToPost,
} from "@/lib/supabase/mappers";

// ─── rowToCity ───────────────────────────────────────────────────────────────

describe("rowToCity", () => {
  const baseRow = {
    id: "city-1",
    rank: 1,
    name: "서울",
    name_en: "Seoul",
    badge: "인기",
    cost_of_living: 250,
    internet_speed: 500,
    network_quality: 5,
    coworking_count: 30,
    recommended_area: "강남",
    rating: 4.8,
    review_count: 120,
    description: "한국의 수도",
    tags: ["도심", "교통편리"],
  };

  it("정상 row를 camelCase 필드로 매핑한다", () => {
    const city = rowToCity(baseRow);

    expect(city.id).toBe("city-1");
    expect(city.rank).toBe(1);
    expect(city.name).toBe("서울");
    expect(city.nameEn).toBe("Seoul");
    expect(city.badge).toBe("인기");
    expect(city.costOfLiving).toBe(250);
    expect(city.internetSpeed).toBe(500);
    expect(city.networkQuality).toBe(5);
    expect(city.coworkingCount).toBe(30);
    expect(city.recommendedArea).toBe("강남");
    expect(city.rating).toBe(4.8);
    expect(city.reviewCount).toBe(120);
    expect(city.description).toBe("한국의 수도");
    expect(city.tags).toEqual(["도심", "교통편리"]);
  });

  it("null 필드는 기본값(빈 문자열, 0)으로 대체된다", () => {
    const nullRow = {
      id: "city-2",
      rank: 2,
      name: "부산",
      name_en: "Busan",
      badge: null,
      cost_of_living: null,
      internet_speed: null,
      network_quality: null,
      coworking_count: null,
      recommended_area: null,
      rating: null,
      review_count: null,
      description: null,
      tags: null,
    };

    const city = rowToCity(nullRow);

    expect(city.badge).toBe("");
    expect(city.costOfLiving).toBe(0);
    expect(city.internetSpeed).toBe(0);
    expect(city.networkQuality).toBe(0);
    expect(city.coworkingCount).toBe(0);
    expect(city.recommendedArea).toBe("");
    expect(city.reviewCount).toBe(0);
    expect(city.description).toBe("");
  });

  it("rating은 Number()로 변환된 숫자 타입이다", () => {
    const city = rowToCity({ ...baseRow, rating: 4.5 });
    expect(typeof city.rating).toBe("number");
    expect(city.rating).toBe(4.5);
  });

  it("rating이 null이면 0으로 변환된다", () => {
    const city = rowToCity({ ...baseRow, rating: null });
    expect(city.rating).toBe(0);
    expect(typeof city.rating).toBe("number");
  });

  it("tags가 null이면 빈 배열로 대체된다", () => {
    const city = rowToCity({ ...baseRow, tags: null });
    expect(city.tags).toEqual([]);
  });
});

// ─── rowToCoworkingSpace ─────────────────────────────────────────────────────

describe("rowToCoworkingSpace", () => {
  const baseRow = {
    id: "space-1",
    name: "패스트파이브 강남점",
    city: "서울",
    address: "서울시 강남구 테헤란로 1",
    price_per_day: 30000,
    wifi: true,
    amenities: ["프린터", "미팅룸", "커피"],
    rating: 4.7,
    review_count: 85,
  };

  it("정상 row를 camelCase 필드로 매핑한다", () => {
    const space = rowToCoworkingSpace(baseRow);

    expect(space.id).toBe("space-1");
    expect(space.name).toBe("패스트파이브 강남점");
    expect(space.city).toBe("서울");
    expect(space.address).toBe("서울시 강남구 테헤란로 1");
    expect(space.pricePerDay).toBe(30000);
    expect(space.wifi).toBe(true);
    expect(space.amenities).toEqual(["프린터", "미팅룸", "커피"]);
    expect(space.rating).toBe(4.7);
    expect(space.reviewCount).toBe(85);
  });

  it("null 필드는 기본값(0, false, 빈 배열)으로 대체된다", () => {
    const nullRow = {
      id: "space-2",
      name: "공유오피스",
      city: "부산",
      address: null,
      price_per_day: null,
      wifi: null,
      amenities: null,
      rating: null,
      review_count: null,
    };

    const space = rowToCoworkingSpace(nullRow);

    expect(space.address).toBe("");
    expect(space.pricePerDay).toBe(0);
    expect(space.wifi).toBe(false);
    expect(space.amenities).toEqual([]);
    expect(space.reviewCount).toBe(0);
  });

  it("rating은 Number()로 변환된 숫자 타입이다", () => {
    const space = rowToCoworkingSpace({ ...baseRow, rating: 3.9 });
    expect(typeof space.rating).toBe("number");
    expect(space.rating).toBe(3.9);
  });

  it("rating이 null이면 0으로 변환된다", () => {
    const space = rowToCoworkingSpace({ ...baseRow, rating: null });
    expect(space.rating).toBe(0);
    expect(typeof space.rating).toBe("number");
  });
});

// ─── rowToReview ─────────────────────────────────────────────────────────────

describe("rowToReview", () => {
  const baseRow = {
    id: "review-1",
    city_name: "서울",
    nickname: "노마드김",
    rating: 5,
    date: "2025-01-15",
    content: "정말 좋은 도시입니다.",
    hashtags: ["카페많음", "인터넷빠름"],
    coworking_id: "space-1",
  };

  it("정상 row를 camelCase 필드로 매핑한다", () => {
    const review = rowToReview(baseRow);

    expect(review.id).toBe("review-1");
    expect(review.cityName).toBe("서울");
    expect(review.nickname).toBe("노마드김");
    expect(review.rating).toBe(5);
    expect(review.date).toBe("2025-01-15");
    expect(review.content).toBe("정말 좋은 도시입니다.");
    expect(review.hashtags).toEqual(["카페많음", "인터넷빠름"]);
    expect(review.coworkingId).toBe("space-1");
  });

  it("coworking_id가 null이면 undefined로 매핑된다 (빈 문자열 아님)", () => {
    const review = rowToReview({ ...baseRow, coworking_id: null });
    expect(review.coworkingId).toBeUndefined();
    expect(review.coworkingId).not.toBe("");
  });

  it("hashtags가 null이면 빈 배열로 대체된다", () => {
    const review = rowToReview({ ...baseRow, hashtags: null });
    expect(review.hashtags).toEqual([]);
  });
});

// ─── rowToMeetup ─────────────────────────────────────────────────────────────

describe("rowToMeetup", () => {
  const baseRow = {
    id: "meetup-1",
    title: "서울 노마드 밋업",
    date: "2025-02-20",
    city: "서울",
    rsvp_count: 42,
    description: "서울 디지털 노마드 정기 모임",
    category: "네트워킹",
    max_attendees: 50,
    organizer: "노마드클럽",
    organizer_id: "user-1",
    tags: ["네트워킹", "스타트업"],
  };

  it("정상 row를 camelCase 필드로 매핑한다 (rsvp_count → rsvp)", () => {
    const meetup = rowToMeetup(baseRow);

    expect(meetup.id).toBe("meetup-1");
    expect(meetup.title).toBe("서울 노마드 밋업");
    expect(meetup.date).toBe("2025-02-20");
    expect(meetup.city).toBe("서울");
    expect(meetup.rsvp).toBe(42);
    expect(meetup.description).toBe("서울 디지털 노마드 정기 모임");
    expect(meetup.category).toBe("네트워킹");
    expect(meetup.maxAttendees).toBe(50);
    expect(meetup.organizer).toBe("노마드클럽");
    expect(meetup.tags).toEqual(["네트워킹", "스타트업"]);
  });

  it("category가 null이면 '네트워킹' 기본값이 사용된다", () => {
    const meetup = rowToMeetup({ ...baseRow, category: null });
    expect(meetup.category).toBe("네트워킹");
  });

  it("rsvp_count가 null이면 0으로 대체된다", () => {
    const meetup = rowToMeetup({ ...baseRow, rsvp_count: null });
    expect(meetup.rsvp).toBe(0);
  });

  it("tags가 null이면 빈 배열로 대체된다", () => {
    const meetup = rowToMeetup({ ...baseRow, tags: null });
    expect(meetup.tags).toEqual([]);
  });
});

// ─── rowToPost ───────────────────────────────────────────────────────────────

describe("rowToPost", () => {
  const baseRow = {
    id: "post-1",
    title: "서울에서 한 달 살기 후기",
    content: "정말 만족스러운 경험이었습니다.",
    author: "노마드박",
    author_id: "user-2",
    city: "서울",
    date: "2025-03-01",
    category: "후기",
    likes_count: 34,
    comments_count: 12,
    tags: ["서울", "한달살기"],
  };

  it("정상 row를 camelCase 필드로 매핑한다 (likes_count → likes, comments_count → comments)", () => {
    const post = rowToPost(baseRow);

    expect(post.id).toBe("post-1");
    expect(post.title).toBe("서울에서 한 달 살기 후기");
    expect(post.content).toBe("정말 만족스러운 경험이었습니다.");
    expect(post.author).toBe("노마드박");
    expect(post.city).toBe("서울");
    expect(post.date).toBe("2025-03-01");
    expect(post.category).toBe("후기");
    expect(post.likes).toBe(34);
    expect(post.comments).toBe(12);
    expect(post.tags).toEqual(["서울", "한달살기"]);
  });

  it("category가 null이면 '자유' 기본값이 사용된다", () => {
    const post = rowToPost({ ...baseRow, category: null });
    expect(post.category).toBe("자유");
  });

  it("likes_count가 null이면 0으로 대체된다", () => {
    const post = rowToPost({ ...baseRow, likes_count: null });
    expect(post.likes).toBe(0);
  });

  it("comments_count가 null이면 0으로 대체된다", () => {
    const post = rowToPost({ ...baseRow, comments_count: null });
    expect(post.comments).toBe(0);
  });

  it("tags가 null이면 빈 배열로 대체된다", () => {
    const post = rowToPost({ ...baseRow, tags: null });
    expect(post.tags).toEqual([]);
  });
});
