# VisionAI - AI-Powered Vision Board Generator

## Overview

VisionAI is a bilingual (Hebrew/English) web application that allows users to create personalized vision boards using AI. Users describe their dreams and goals in natural language, and the system uses a two-step AI pipeline: first generating a detailed image prompt via OpenAI's text model (GPT-4), then creating the actual vision board image. The app supports digital downloads and physical print ordering with a one-time payment model.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
- **Framework**: React 18 with TypeScript
- **Routing**: Wouter (lightweight React router)
- **State Management**: TanStack React Query for server state
- **Styling**: Tailwind CSS v4 with CSS variables for theming
- **UI Components**: shadcn/ui component library (New York style) with Radix UI primitives
- **Animations**: Framer Motion for page transitions and micro-interactions
- **Build Tool**: Vite with custom plugins for meta images and Replit integration

### Backend Architecture
- **Runtime**: Node.js with Express
- **Language**: TypeScript compiled with tsx
- **API Pattern**: RESTful endpoints under `/api/*`
- **AI Integration**: OpenAI API for both text (GPT-4o) and image generation
- **Session**: In-memory storage (MemStorage class) for development

### Localization System
- **Default Language**: Hebrew (RTL layout)
- **Secondary Language**: English (LTR layout)
- **Implementation**: Custom React context (`LocalizationProvider`) with translation dictionary
- **Persistence**: Language preference stored in localStorage

### Design System
- **Color Palette**: Warm luxury theme with sunset gold primary, ocean blue secondary, sand beige backgrounds
- **Typography**: DM Sans (body), Outfit (display/headings)
- **Components**: Rounded cards, soft shadows, mobile-first responsive design

### Key User Flows
1. **Vision Board Creation**: Dream input → AI prompt generation (backend) → AI image generation → Result display
2. **Digital Purchase**: One-time payment (₪39) for high-quality download
3. **Print + Digital**: Combined package (₪89) with A3 print shipping
4. **Print Existing**: Upload custom image (₪59) for professional printing

### Database Schema
- Uses Drizzle ORM with PostgreSQL
- Currently minimal schema with `users` table (id, username, password)
- Schema location: `shared/schema.ts`

## External Dependencies

### AI Services
- **OpenAI API**: GPT-4o for prompt generation, DALL-E for image generation
- Environment variable: `OPENAI_API_KEY`

### Database
- **PostgreSQL**: Via Drizzle ORM
- Environment variable: `DATABASE_URL`
- Migrations stored in `/migrations` directory

### Third-Party Libraries
- **Payment**: Stripe (dependency present but not yet integrated)
- **Forms**: React Hook Form with Zod validation
- **Date Handling**: date-fns

### Development Tools
- **Replit Plugins**: Runtime error overlay, cartographer, dev banner
- **Build**: esbuild for server bundling, Vite for client