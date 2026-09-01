create extension if not exists "pgcrypto";

create table if not exists public.couples (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  anniversary date,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  couple_id uuid references public.couples(id) on delete cascade,
  email text not null,
  display_name text not null,
  avatar_url text,
  role text not null default 'member',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.calendar_events (
  id uuid primary key default gen_random_uuid(),
  couple_id uuid not null references public.couples(id) on delete cascade,
  title text not null,
  description text,
  start_at timestamptz not null,
  end_at timestamptz,
  all_day boolean not null default false,
  location text,
  event_type text not null default 'custom',
  created_by uuid references public.profiles(id),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.tasks (
  id uuid primary key default gen_random_uuid(),
  couple_id uuid not null references public.couples(id) on delete cascade,
  title text not null,
  description text,
  category text not null default 'general',
  priority text not null default 'medium',
  due_date date,
  assignee_id uuid references public.profiles(id),
  completed boolean not null default false,
  completed_at timestamptz,
  recurring_rule text,
  created_by uuid references public.profiles(id),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.messages (
  id uuid primary key default gen_random_uuid(),
  couple_id uuid not null references public.couples(id) on delete cascade,
  author_id uuid not null references public.profiles(id),
  body text not null,
  pinned boolean not null default false,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.message_comments (
  id uuid primary key default gen_random_uuid(),
  message_id uuid not null references public.messages(id) on delete cascade,
  author_id uuid not null references public.profiles(id),
  body text not null,
  created_at timestamptz not null default now()
);

create table if not exists public.albums (
  id uuid primary key default gen_random_uuid(),
  couple_id uuid not null references public.couples(id) on delete cascade,
  title text not null,
  description text,
  cover_photo_url text,
  created_by uuid references public.profiles(id),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.photos (
  id uuid primary key default gen_random_uuid(),
  album_id uuid not null references public.albums(id) on delete cascade,
  url text not null,
  caption text,
  uploaded_by uuid references public.profiles(id),
  created_at timestamptz not null default now()
);

create table if not exists public.activities (
  id uuid primary key default gen_random_uuid(),
  couple_id uuid not null references public.couples(id) on delete cascade,
  title text not null,
  description text,
  category text not null default 'custom',
  status text not null default 'wanted',
  planned_date date,
  rating integer,
  created_by uuid references public.profiles(id),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.links (
  id uuid primary key default gen_random_uuid(),
  couple_id uuid not null references public.couples(id) on delete cascade,
  title text not null,
  url text not null,
  category text not null default 'general',
  notes text,
  favorite boolean not null default false,
  created_by uuid references public.profiles(id),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.question_of_the_day (
  id uuid primary key default gen_random_uuid(),
  couple_id uuid not null references public.couples(id) on delete cascade,
  question text not null,
  response text,
  created_by uuid references public.profiles(id),
  created_at timestamptz not null default now(),
  response_at timestamptz
);

-- ============================================================
-- ROW LEVEL SECURITY
-- Enable RLS on every table, then add policies so that only
-- authenticated users who belong to the same couple can read
-- or write rows. The profiles table also allows a user to
-- read and update their own row.
-- ============================================================

alter table public.couples              enable row level security;
alter table public.profiles             enable row level security;
alter table public.calendar_events      enable row level security;
alter table public.tasks                enable row level security;
alter table public.messages             enable row level security;
alter table public.message_comments     enable row level security;
alter table public.albums               enable row level security;
alter table public.photos               enable row level security;
alter table public.activities           enable row level security;
alter table public.links                enable row level security;
alter table public.question_of_the_day  enable row level security;

-- Helper: returns the couple_id for the currently logged-in user.
-- Used in every policy below to avoid repeating the subquery.
create or replace function public.my_couple_id()
returns uuid
language sql
stable
security definer
as $$
  select couple_id from public.profiles where id = auth.uid();
$$;

-- couples: members can read their own couple row
create policy "couple members can read their couple"
  on public.couples for select
  using (id = public.my_couple_id());

-- profiles: members can read any profile in their couple
create policy "couple members can read profiles"
  on public.profiles for select
  using (couple_id = public.my_couple_id());

-- profiles: users can insert their own profile
create policy "users can insert own profile"
  on public.profiles for insert
  with check (id = auth.uid());

-- profiles: users can update their own profile
create policy "users can update own profile"
  on public.profiles for update
  using (id = auth.uid());

-- calendar_events
create policy "couple can read events"
  on public.calendar_events for select
  using (couple_id = public.my_couple_id());

create policy "couple can insert events"
  on public.calendar_events for insert
  with check (couple_id = public.my_couple_id());

create policy "couple can update events"
  on public.calendar_events for update
  using (couple_id = public.my_couple_id());

create policy "couple can delete events"
  on public.calendar_events for delete
  using (couple_id = public.my_couple_id());

-- tasks
create policy "couple can read tasks"
  on public.tasks for select
  using (couple_id = public.my_couple_id());

create policy "couple can insert tasks"
  on public.tasks for insert
  with check (couple_id = public.my_couple_id());

create policy "couple can update tasks"
  on public.tasks for update
  using (couple_id = public.my_couple_id());

create policy "couple can delete tasks"
  on public.tasks for delete
  using (couple_id = public.my_couple_id());

-- messages
create policy "couple can read messages"
  on public.messages for select
  using (couple_id = public.my_couple_id());

create policy "couple can insert messages"
  on public.messages for insert
  with check (couple_id = public.my_couple_id());

create policy "couple can update messages"
  on public.messages for update
  using (couple_id = public.my_couple_id());

create policy "couple can delete messages"
  on public.messages for delete
  using (couple_id = public.my_couple_id());

-- message_comments
create policy "couple can read comments"
  on public.message_comments for select
  using (
    message_id in (
      select id from public.messages where couple_id = public.my_couple_id()
    )
  );

create policy "couple can insert comments"
  on public.message_comments for insert
  with check (
    message_id in (
      select id from public.messages where couple_id = public.my_couple_id()
    )
  );

create policy "couple can delete comments"
  on public.message_comments for delete
  using (author_id = auth.uid());

-- albums
create policy "couple can read albums"
  on public.albums for select
  using (couple_id = public.my_couple_id());

create policy "couple can insert albums"
  on public.albums for insert
  with check (couple_id = public.my_couple_id());

create policy "couple can update albums"
  on public.albums for update
  using (couple_id = public.my_couple_id());

create policy "couple can delete albums"
  on public.albums for delete
  using (couple_id = public.my_couple_id());

-- photos
create policy "couple can read photos"
  on public.photos for select
  using (
    album_id in (
      select id from public.albums where couple_id = public.my_couple_id()
    )
  );

create policy "couple can insert photos"
  on public.photos for insert
  with check (
    album_id in (
      select id from public.albums where couple_id = public.my_couple_id()
    )
  );

create policy "couple can delete photos"
  on public.photos for delete
  using (uploaded_by = auth.uid());

-- activities
create policy "couple can read activities"
  on public.activities for select
  using (couple_id = public.my_couple_id());

create policy "couple can insert activities"
  on public.activities for insert
  with check (couple_id = public.my_couple_id());

create policy "couple can update activities"
  on public.activities for update
  using (couple_id = public.my_couple_id());

create policy "couple can delete activities"
  on public.activities for delete
  using (couple_id = public.my_couple_id());

-- links
create policy "couple can read links"
  on public.links for select
  using (couple_id = public.my_couple_id());

create policy "couple can insert links"
  on public.links for insert
  with check (couple_id = public.my_couple_id());

create policy "couple can update links"
  on public.links for update
  using (couple_id = public.my_couple_id());

create policy "couple can delete links"
  on public.links for delete
  using (couple_id = public.my_couple_id());

-- question_of_the_day
create policy "couple can read questions"
  on public.question_of_the_day for select
  using (couple_id = public.my_couple_id());

create policy "couple can insert questions"
  on public.question_of_the_day for insert
  with check (couple_id = public.my_couple_id());

create policy "couple can update questions"
  on public.question_of_the_day for update
  using (couple_id = public.my_couple_id());
