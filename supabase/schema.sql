-- Del Mar Artesanías · esquema del catálogo administrable
-- Pegar completo en Supabase → SQL Editor → Run. Se puede ejecutar dos veces sin romper nada.

create table if not exists public.products (
  id           text primary key,
  name         text not null,
  card_name    text,
  category     text not null,
  price        integer not null check (price >= 0),
  tag          text,
  images       jsonb not null default '[]'::jsonb,
  short_desc   text,
  description  text,
  technique    text,
  origin       text,
  details      jsonb not null default '[]'::jsonb,
  status       text not null default 'disponible' check (status in ('disponible', 'agotado', 'oculto')),
  featured     boolean not null default false,
  sort_order   integer not null default 0,
  created_at   timestamptz not null default now(),
  updated_at   timestamptz not null default now()
);

create index if not exists products_category_idx on public.products (category);
create index if not exists products_order_idx    on public.products (sort_order, name);

-- La fecha de edición se mantiene sola
create or replace function public.touch_updated_at()
returns trigger language plpgsql as $$
begin
  new.updated_at = now();
  return new;
end $$;

drop trigger if exists products_touch_updated_at on public.products;
create trigger products_touch_updated_at
  before update on public.products
  for each row execute function public.touch_updated_at();

-- ── Permisos ────────────────────────────────────────────────────────────────
alter table public.products enable row level security;

drop policy if exists "catalogo publico" on public.products;
create policy "catalogo publico"
  on public.products for select
  using (status <> 'oculto' or auth.role() = 'authenticated');

drop policy if exists "solo admin escribe" on public.products;
create policy "solo admin escribe"
  on public.products for all
  to authenticated
  using (true) with check (true);

-- ── Fotos ───────────────────────────────────────────────────────────────────
insert into storage.buckets (id, name, public)
values ('productos', 'productos', true)
on conflict (id) do nothing;

drop policy if exists "fotos lectura publica" on storage.objects;
create policy "fotos lectura publica"
  on storage.objects for select
  using (bucket_id = 'productos');

drop policy if exists "fotos sube el admin" on storage.objects;
create policy "fotos sube el admin"
  on storage.objects for insert
  to authenticated
  with check (bucket_id = 'productos');

drop policy if exists "fotos borra el admin" on storage.objects;
create policy "fotos borra el admin"
  on storage.objects for delete
  to authenticated
  using (bucket_id = 'productos');
