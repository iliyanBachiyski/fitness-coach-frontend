# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Build Commands

```bash
pnpm dev       # Start Vite dev server with HMR
pnpm build     # TypeScript check + Vite production build
pnpm lint      # Run ESLint
pnpm preview   # Preview production build
```

## Architecture

**Tech Stack:** React 19 + TypeScript + Vite + Tailwind CSS v4 + ShadcnUI + React Router

**Directory Structure:**

- `src/components/ui/` - Foundational UI components (Button, Input, GlassCard, Toast)
- `src/components/common/` - Shared utility components (BottomNavigation, EmptyState, SkeletonCard)
- `src/components/{feature}/` - Feature-specific components (dashboard, nutrition, workout-mode)
- `src/pages/` - Route-level page components
- `src/hooks/` - Custom React hooks
- `src/types/` - TypeScript type definitions
- `src/lib/utils/` - Utility functions (cn.ts for Tailwind class merging)
- `src/styles/globals.css` - Theme system and design tokens

**Key Patterns:**

- Path alias `@/` maps to `src/` - always use this for imports

- Components use variant props pattern (e.g., `variant="primary"`, `size="lg"`)
- Toast notifications via React Context - wrap components with `ToastProvider`, use `useToast()` hook
- All components are functional with TypeScript interfaces extending HTML element attributes

**Design System:**

- Dark mode only with glassmorphism design (backdrop-blur, semi-transparent surfaces)
- Custom theme defined in `@theme` block in globals.css (Tailwind v4 syntax)
- Brand colors: Primary (green #00E676), Secondary (blue #2979FF), Warning (orange #FF3D00)
- Use `cn()` utility from `@/lib/utils/cn` for conditional class merging
- When adding shadcn components, always update their styles to match the project theme in globals.css (use project color tokens like `bg-primary`, `text-background`, `bg-warning`, `text-text-secondary` instead of shadcn defaults)

**Routing:**

- Main routes defined in `App.tsx` using React Router
- `/theme/*` contains component showcase with nested routes for development reference
- All route paths are defined in `src/constants/routes.ts` - never use hardcoded route strings, always import and use route constants from this file

**Component Development Rules:**

- Always check `src/components/ui/` and `src/components/common/` for existing shared components before creating new ones - prioritize reusing shared components
- Split large components into smaller, reusable pieces - extract common patterns into `src/components/common/` or `src/components/ui/`
- Check `src/styles/globals.css` for theme tokens and existing styles before adding inline styles or new CSS - use design tokens from the `@theme` block
- Follow latest React 19 and React Router best practices: use functional components, hooks, proper data fetching patterns (loaders/actions), and avoid deprecated APIs
- When creating/editing/deleting components, place custom hooks in `src/hooks/` folder
- When creating/editing/deleting components, place TypeScript types in `src/types/` folder - check for existing type files first and add to them; only create new type files if no relevant file exists

## Tasks

Task files are stored in `tasks/` directory as Markdown documents:

- Files follow naming convention: `REQ-{FEATURE}-{NUMBER}-{description}.md`
- Each file contains detailed requirements, UI specifications, acceptance criteria, and technical guidelines
- Read task files to understand implementation requirements before starting work

**After completing each task:**

1. Run `pnpm lint` and verify no new errors
2. Run `pnpm build` and verify successful build
3. Mark the task as completed

## TypeScript Configuration

Strict mode enabled with additional checks:

- `noUnusedLocals` and `noUnusedParameters` - no dead code allowed
- `noFallthroughCasesInSwitch` - switch exhaustiveness required
- React Compiler enabled via Babel plugin for optimized rendering
