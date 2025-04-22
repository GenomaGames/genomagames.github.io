# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands
- Build: `npm run build`
- Lint: `npm run lint`
- Lint and fix: `npm run lint:fix`
- Type check: `npm run typecheck`
- Development server: `npm start`
- Production server: `npm run start:prod`
- Test: `npm run test`

## Code Style
- Use TypeScript for type safety
- Follow ESLint rules with `simple-import-sort` plugin
- Use Prettier for formatting (80 char width, 2 space indent)
- Organize imports using simple-import-sort
- Follow domain-driven design patterns with clear separation of concerns
- Use Next.js App Router patterns for page components
- Error handling with explicit types, prefer early returns
- Naming: PascalCase for components/classes, camelCase for variables/functions
- Use async/await for asynchronous code
- Follow clean architecture with domain/application/infrastructure layers