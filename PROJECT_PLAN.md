# Enter the Dragon - Backend Architecture Plan

## Overview
Online coaching platform for fitness/nutrition. Built with **Next.js** + **Supabase**.

**Live frontend:** https://enterthedragon.netlify.app/

---

## Current State
### What's Built (UI/Frontend)
- Landing page with application CTA
- Client dashboard (home, workout, nutrition, progress, community tabs)
- Coach dashboard (clients, programs, import, broadcast, settings)
- Session flow (start workout -> log exercises -> complete)
- Nutrition view (food log, AI scan, Ask AI placeholders)
- Check-in form, PR logger, community feed

### What Needs to Be Built (Backend)
- No Supabase project connected
- No auth system (coach vs client login)
- No database schema or real data
- No API routes / Edge Functions
- All data is hardcoded (sample workouts, etc.)
- AI features are placeholder only
- No payments/subscriptions
- No real-time functionality

---

## Architecture

### Five Layers

1. **Client Layer** — Three Next.js entry points: client app, coach dashboard, public application form. All talk to the same Supabase backend.

2. **Auth** — Supabase Auth with JWTs and role-based access. Three roles: `client`, `coach`, `admin`. Row Level Security (RLS) ensures clients see only their data, coaches see only their assigned clients.

3. **API Layer** — Edge Functions for business logic (assigning programs, AI requests, notifications). Realtime subscriptions for live workout sessions. Supabase Storage for progress photos and video replays.

4. **Database** — Eight core table groups in PostgreSQL: users/profiles, programs, sessions/logs, nutrition, check-ins, progress/PRs, community content, and applications.

5. **External Services** — AI for food scanning and "Ask AI" feature, video solution for coaching calls/replays, Stripe for subscription payments. Supabase cron for streaks and reminders.

---

## Phased Implementation

### Phase 1: Foundation (Weeks 1-2)
- [ ] Create Supabase project
- [ ] Set up auth with email/password + role-based access
- [ ] Deploy complete database schema (see migration file)
- [ ] Configure RLS policies for all tables
- [ ] Connect Next.js frontend to Supabase
- [ ] Set up environment variables

### Phase 2: Core Features (Weeks 3-4)
- [ ] Wire client dashboard to real data
- [ ] Wire coach dashboard to real data
- [ ] Implement workout logging (start session -> log sets/reps -> complete)
- [ ] Implement nutrition tracking with food log
- [ ] Implement check-in form submission and coach review
- [ ] PR tracking and progress photos

### Phase 3: AI + Integrations (Weeks 5-6)
- [ ] Food scanner via AI vision API
- [ ] "Ask AI" chatbot for nutrition/training questions
- [ ] Stripe payments for subscription tiers
- [ ] Video call integration for coaching sessions
- [ ] Community feed with Q&A and video replays

### Phase 4: Polish + Launch (Weeks 7-8)
- [ ] Cron jobs for streak calculations and reminders
- [ ] Email/push notifications
- [ ] Security audit and penetration testing
- [ ] Performance optimization
- [ ] Beta testing with real users

---

## Key Decisions to Make
- **Pricing tiers:** What subscription levels? (e.g., Basic, Premium, Elite)
- **Single vs multi-coach:** Supporting one coach or multiple coaches with their own client rosters?
- **AI provider:** OpenAI GPT-4 Vision for food scanning, or alternative?
- **Video platform:** Daily.co, Twilio, or another provider for coaching calls?
- **Deployment:** Keep Netlify for frontend, or move to Vercel for better Next.js integration?

---

## Database Schema
See `supabase/migrations/00001_initial_schema.sql` for the complete schema.

## Tech Stack
- **Frontend:** Next.js (React), TypeScript, Tailwind CSS
- **Backend:** Supabase (PostgreSQL, Auth, Edge Functions, Realtime, Storage)
- **AI:** OpenAI API (food scanning, chatbot)
- **Payments:** Stripe
- **Hosting:** Netlify/Vercel (frontend), Supabase (backend)
