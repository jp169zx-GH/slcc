# SLCC Admin Dashboard

Senior Living Care Center — Next.js admin dashboard connected to Supabase.

**Live site:** https://jp169zx-gh.github.io/slcc

---

## Quick Start

### 1. Clone & Install

```bash
git clone https://github.com/jp169zx-gh/slcc.git
cd slcc
npm install
```

### 2. Configure Environment

```bash
cp .env.local.example .env.local
```

Edit `.env.local`:
```
NEXT_PUBLIC_SUPABASE_URL=https://txvyplfaaisrzbwpoqcd.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=<your-anon-key>
```

Get your anon key from:  
https://supabase.com/dashboard/project/txvyplfaaisrzbwpoqcd/settings/api

### 3. Run Locally

```bash
npm run dev
```
Open http://localhost:3000

---

## Deploy to GitHub Pages

### One-time GitHub Setup

1. Go to your repository → **Settings** → **Pages**
2. Set Source to **GitHub Actions**

3. Go to **Settings** → **Secrets and variables** → **Actions**
4. Add two repository secrets:
   - `NEXT_PUBLIC_SUPABASE_URL` = `https://txvyplfaaisrzbwpoqcd.supabase.co`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY` = your anon key

### Deploy

Push to `main` branch — GitHub Actions builds and deploys automatically:

```bash
git add .
git commit -m "Initial SLCC dashboard"
git push origin main
```

---

## Pages

| Route | Table | Description |
|-------|-------|-------------|
| `/` | — | Dashboard with all table counts |
| `/members` | `slcc_members` | Member directory |
| `/memberships` | `slcc_memberships` | Active subscriptions |
| `/membership-plans` | `slcc_membership_plans` | Plan tiers & pricing |
| `/health-records` | `slcc_health_records` | Medical records |
| `/care-services` | `slcc_care_services` | Available services |
| `/care-bookings` | `slcc_care_bookings` | Scheduled appointments |
| `/billing` | `slcc_billing` | Invoices & payments |
| `/insurance-claims` | `slcc_insurance_claims` | NHI / insurance claims |
| `/iot-devices` | `slcc_iot_devices` | MQTT sensors |
| `/iot-events` | `slcc_iot_events` | Sensor alerts & data |
| `/staff` | `slcc_staff` | Personnel |
| `/facilities` | `slcc_facilities` | Rooms & amenities |
| `/settings` | — | Connection & config |

---

## Supabase Project

- **Project ID:** `txvyplfaaisrzbwpoqcd`
- **Dashboard:** https://supabase.com/dashboard/project/txvyplfaaisrzbwpoqcd
- **SQL Editor:** https://supabase.com/dashboard/project/txvyplfaaisrzbwpoqcd/sql
