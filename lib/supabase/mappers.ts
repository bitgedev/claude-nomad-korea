import type { Tables } from "./database.types";
import type { City, Review, Meetup, CoworkingSpace, Post, MeetupCategory, PostCategory } from "@/lib/mock-data";

export function rowToCity(row: Tables<"cities">): City {
  return {
    id: row.id,
    rank: row.rank,
    name: row.name,
    nameEn: row.name_en,
    badge: row.badge ?? "",
    costOfLiving: row.cost_of_living ?? 0,
    internetSpeed: row.internet_speed ?? 0,
    networkQuality: row.network_quality ?? 0,
    coworkingCount: row.coworking_count ?? 0,
    recommendedArea: row.recommended_area ?? "",
    rating: Number(row.rating ?? 0),
    reviewCount: row.review_count ?? 0,
    description: row.description ?? "",
    tags: row.tags ?? [],
  };
}

export function rowToCoworkingSpace(row: Tables<"coworking_spaces">): CoworkingSpace {
  return {
    id: row.id,
    name: row.name,
    city: row.city,
    address: row.address ?? "",
    pricePerDay: row.price_per_day ?? 0,
    wifi: row.wifi ?? false,
    amenities: row.amenities ?? [],
    rating: Number(row.rating ?? 0),
    reviewCount: row.review_count ?? 0,
  };
}

export function rowToReview(row: Tables<"reviews">): Review {
  return {
    id: row.id,
    cityName: row.city_name ?? "",
    nickname: row.nickname ?? "",
    rating: row.rating ?? 0,
    date: row.date ?? "",
    content: row.content ?? "",
    hashtags: row.hashtags ?? [],
    coworkingId: row.coworking_id ?? undefined,
  };
}

export function rowToMeetup(row: Tables<"meetups">): Meetup {
  return {
    id: row.id,
    title: row.title,
    date: row.date,
    city: row.city,
    rsvp: row.rsvp_count ?? 0,
    description: row.description ?? "",
    category: (row.category as MeetupCategory) ?? "네트워킹",
    maxAttendees: row.max_attendees ?? 0,
    organizer: row.organizer ?? "",
    tags: row.tags ?? [],
  };
}

export function rowToPost(row: Tables<"posts">): Post {
  return {
    id: row.id,
    title: row.title,
    content: row.content ?? "",
    author: row.author ?? "",
    city: row.city ?? "",
    date: row.date ?? "",
    category: (row.category as PostCategory) ?? "자유",
    likes: row.likes_count ?? 0,
    comments: row.comments_count ?? 0,
    tags: row.tags ?? [],
  };
}
