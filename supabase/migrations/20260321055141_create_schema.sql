-- Cities
CREATE TABLE cities (
  id TEXT PRIMARY KEY,
  rank INTEGER NOT NULL,
  name TEXT NOT NULL,
  name_en TEXT NOT NULL,
  badge TEXT,
  cost_of_living INTEGER,
  internet_speed INTEGER,
  network_quality INTEGER,
  coworking_count INTEGER,
  recommended_area TEXT,
  rating NUMERIC(3,1),
  review_count INTEGER DEFAULT 0,
  description TEXT,
  tags TEXT[] DEFAULT '{}'
);

-- Profiles (linked to auth.users)
CREATE TABLE profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  nickname TEXT NOT NULL,
  favorite_city TEXT,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Coworking spaces
CREATE TABLE coworking_spaces (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  city TEXT NOT NULL,
  address TEXT,
  price_per_day INTEGER,
  wifi BOOLEAN DEFAULT true,
  amenities TEXT[] DEFAULT '{}',
  rating NUMERIC(3,1),
  review_count INTEGER DEFAULT 0
);

-- Reviews
CREATE TABLE reviews (
  id TEXT PRIMARY KEY,
  city_name TEXT,
  user_id UUID REFERENCES auth.users(id),
  nickname TEXT,
  rating INTEGER CHECK (rating >= 1 AND rating <= 5),
  content TEXT,
  hashtags TEXT[] DEFAULT '{}',
  coworking_id TEXT REFERENCES coworking_spaces(id),
  date TEXT,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Meetups
CREATE TABLE meetups (
  id TEXT PRIMARY KEY,
  title TEXT NOT NULL,
  date TEXT NOT NULL,
  city TEXT NOT NULL,
  rsvp_count INTEGER DEFAULT 0,
  description TEXT,
  category TEXT,
  max_attendees INTEGER,
  organizer TEXT,
  organizer_id UUID REFERENCES auth.users(id),
  tags TEXT[] DEFAULT '{}'
);

-- Meetup RSVPs
CREATE TABLE meetup_rsvps (
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  meetup_id TEXT REFERENCES meetups(id) ON DELETE CASCADE,
  created_at TIMESTAMPTZ DEFAULT now(),
  PRIMARY KEY (user_id, meetup_id)
);

-- Posts
CREATE TABLE posts (
  id TEXT PRIMARY KEY,
  title TEXT NOT NULL,
  content TEXT,
  category TEXT,
  author TEXT,
  author_id UUID REFERENCES auth.users(id),
  city TEXT,
  date TEXT,
  likes_count INTEGER DEFAULT 0,
  comments_count INTEGER DEFAULT 0,
  tags TEXT[] DEFAULT '{}'
);

-- Post likes
CREATE TABLE post_likes (
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  post_id TEXT REFERENCES posts(id) ON DELETE CASCADE,
  created_at TIMESTAMPTZ DEFAULT now(),
  PRIMARY KEY (user_id, post_id)
);

-- Auto-create profile on signup
CREATE OR REPLACE FUNCTION handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, nickname)
  VALUES (NEW.id, COALESCE(NEW.raw_user_meta_data->>'nickname', split_part(NEW.email, '@', 1)));
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION handle_new_user();
