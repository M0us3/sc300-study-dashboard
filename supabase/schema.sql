create table if not exists public.study_progress (
 user_id uuid not null references auth.users(id) on delete cascade,
 item_id text not null check (char_length(item_id) between 1 and 100),
 completed_at timestamptz not null default now(),
 primary key(user_id,item_id)
);
alter table public.study_progress enable row level security;
create policy "Users read their progress" on public.study_progress for select to authenticated using ((select auth.uid())=user_id);
create policy "Users insert their progress" on public.study_progress for insert to authenticated with check ((select auth.uid())=user_id);
create policy "Users update their progress" on public.study_progress for update to authenticated using ((select auth.uid())=user_id) with check ((select auth.uid())=user_id);
create policy "Users delete their progress" on public.study_progress for delete to authenticated using ((select auth.uid())=user_id);
revoke all on public.study_progress from anon;
grant select,insert,update,delete on public.study_progress to authenticated;