import { createClient } from "@/lib/supabase/server";
import { rowToReview } from "@/lib/supabase/mappers";
import { ReviewsClient } from "./_components/reviews-client";

export default async function ReviewsPage() {
  const supabase = await createClient();
  const { data } = await supabase
    .from("reviews")
    .select("*")
    .order("created_at", { ascending: false });

  const reviews = (data ?? []).map(rowToReview);

  return <ReviewsClient initialReviews={reviews} />;
}
