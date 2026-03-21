-- Enable RLS on all tables
ALTER TABLE cities ENABLE ROW LEVEL SECURITY;
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE coworking_spaces ENABLE ROW LEVEL SECURITY;
ALTER TABLE reviews ENABLE ROW LEVEL SECURITY;
ALTER TABLE meetups ENABLE ROW LEVEL SECURITY;
ALTER TABLE meetup_rsvps ENABLE ROW LEVEL SECURITY;
ALTER TABLE posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE post_likes ENABLE ROW LEVEL SECURITY;

-- Public read
CREATE POLICY "cities_public_read" ON cities FOR SELECT USING (true);
CREATE POLICY "coworking_public_read" ON coworking_spaces FOR SELECT USING (true);
CREATE POLICY "reviews_public_read" ON reviews FOR SELECT USING (true);
CREATE POLICY "meetups_public_read" ON meetups FOR SELECT USING (true);
CREATE POLICY "posts_public_read" ON posts FOR SELECT USING (true);
CREATE POLICY "profiles_public_read" ON profiles FOR SELECT USING (true);
CREATE POLICY "post_likes_public_read" ON post_likes FOR SELECT USING (true);

-- Profiles: own write
CREATE POLICY "profiles_own_insert" ON profiles FOR INSERT WITH CHECK (auth.uid() = id);
CREATE POLICY "profiles_own_update" ON profiles FOR UPDATE USING (auth.uid() = id);

-- Reviews: authenticated insert / own update+delete
CREATE POLICY "reviews_auth_insert" ON reviews FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "reviews_own_update" ON reviews FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "reviews_own_delete" ON reviews FOR DELETE USING (auth.uid() = user_id);

-- Meetups: authenticated insert / own update
CREATE POLICY "meetups_auth_insert" ON meetups FOR INSERT WITH CHECK (auth.uid() = organizer_id);
CREATE POLICY "meetups_own_update" ON meetups FOR UPDATE USING (auth.uid() = organizer_id);

-- Meetup RSVPs: own CRUD
CREATE POLICY "rsvps_own_read" ON meetup_rsvps FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "rsvps_auth_insert" ON meetup_rsvps FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "rsvps_own_delete" ON meetup_rsvps FOR DELETE USING (auth.uid() = user_id);

-- Posts: authenticated insert / own update+delete
CREATE POLICY "posts_auth_insert" ON posts FOR INSERT WITH CHECK (auth.uid() = author_id);
CREATE POLICY "posts_own_update" ON posts FOR UPDATE USING (auth.uid() = author_id);
CREATE POLICY "posts_own_delete" ON posts FOR DELETE USING (auth.uid() = author_id);

-- Post likes: own CRUD
CREATE POLICY "post_likes_auth_insert" ON post_likes FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "post_likes_own_delete" ON post_likes FOR DELETE USING (auth.uid() = user_id);
