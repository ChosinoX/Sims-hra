# ✦ LumaLife

LumaLife je originální responzivní 2D webový simulátor života. Hráč vytvoří postavu, plynule ji vede po ilustrovaném domově, pečuje o sedm potřeb, pracuje, nakupuje vybavení a rozvíjí příběh. Nevyužívá aktiva ani názvy jiné herní značky.

## Technologie a funkce

- Next.js 14, React, TypeScript, CSS animace a procedurální SVG/CSS grafika
- PostgreSQL + Prisma; serverově autoritativní mince, inventář, XP, odměny a platby
- Argon-compatible bcrypt hash (cost 12), podepsané HTTP-only session cookies, Zod validace, bezpečnostní hlavičky a role
- Vytvoření postavy, klikací místnost, animovaný pohyb, předmětové interakce, potřeby/nálada, herní čas a den/noc
- Město, kariéry, obchod, inventář, questy, 20 achievementů, denní odměna, NPC a vztahové UI
- Stripe Checkout a podpisem ověřený idempotentní webhook; admin API chráněné rolí
- PWA manifest, dotykové/responzivní ovládání, právní stránky a připravené CZ/EN datové sloupce

## Lokální spuštění

```bash
cp .env.example .env
docker compose up -d db
npm install
npx prisma migrate dev --name init
npm run db:seed
npm run dev
```

Otevřete `http://localhost:3000`. Produkčně spusťte `npm run build && npm start`, nebo `docker compose up --build`. V produkci použijte dlouhý náhodný `SESSION_SECRET`, TLS a spravovanou PostgreSQL. Prisma migrace se nasazují příkazem `npm run db:migrate`.

## Stripe

V Stripe vytvořte opakovaný Premium produkt a doplňte `STRIPE_SECRET_KEY`, `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY` a `STRIPE_PREMIUM_PRICE_ID`. Webhook nasměrujte na `https://VAS-DOMEN/api/stripe/webhook`, poslouchejte `checkout.session.completed` a jeho signing secret uložte jako `STRIPE_WEBHOOK_SECRET`. Server ignoruje klientské ceny, ověřuje podpis a deduplikuje události přes unikátní `stripeEventId`.

## Administrátor a provoz

Registrace adresy `chose20@seznam.cz` bezpečně přidělí roli `ADMIN`; heslo se nikdy neseeduje ani neukládá otevřeně. `/api/admin/users` poskytuje serverově chráněné hledání, blokaci, úpravu mincí a premium stavu. Před veřejným provozem doplňte e-mailový transport pro reset hesla, reverzní proxy rate limiting/WAF, observabilitu, zálohy a právní revizi textů.

Klíčové části: `app/game/game.tsx` (herní klient), `app/api` (autorita), `prisma/schema.prisma` (model), `prisma/seed.ts` (obsah), `lib/game.ts` (pravidla), `tests` (testy).
