# GEMINI CLI – AI Agent Instructions

IMPORTANT:
These instructions override default AI behavior.
Do not introduce new libraries, patterns, or assumptions unless explicitly instructed.
If something is unclear, add a TODO instead of guessing.

---

## Project Overview

This project is a **production-ready educational game** for children (~5 years old) designed to teach reading using the **syllabic method**.

The codebase must be:
- readable and maintainable by human developers,
- concise and technical,
- free from unnecessary overengineering,
- resilient to basic errors and edge cases.

The project should prioritize correctness, simplicity, and clarity.

---

## Technology Stack (MUST USE)

- React (functional components only)
- React Hooks
- TypeScript
- Vite
- Zustand (for global state only when justified)
- React Router (simple, commonly used configuration)
- ESLint + Prettier
- Testing: Vitest + Testing Library (basic tests)

### Forbidden
- React class components
- Overengineered architectures
- Introducing libraries without clear justification

---

## TypeScript Rules

- TypeScript `strict: true`
- Prefer `type` over `interface`
- Avoid `any`
- `any` is allowed only as a last resort and MUST include a TODO explaining why
- Use modern ES module imports only

---

## Code Style & Naming

- Keep code **concise and technical**
- Avoid comments in obvious code
- Comments are allowed only to explain:
  - WHY something exists
  - Important assumptions or non-obvious decisions
- Use **business-oriented, descriptive naming**
- Keep files, components, and functions small and focused

---

## Project Structure

Use a **feature-based structure** appropriate for an educational game.

Example structure:

src/
  features/
    syllables/
      components/
      hooks/
      store.ts
      types.ts
      tests/
  shared/
    components/
    hooks/
    utils/
  routes/
  app/

Rules:
- Components must be small and focused
- Prefer custom hooks for shared logic
- Do not create generic helpers without strong justification

---

## State Management

- Use Zustand only for **global game state**
- Use React state and hooks for local component state
- Zustand stores must remain simple (no unnecessary middleware)
- Separate game logic from UI components

---

## Routing & UI

- Use React Router with the simplest reasonable setup
- UI should be:
  - visually attractive and friendly for children (~5 years old),
  - colorful but clean and well-structured
- Follow modern accessibility standards:
  - semantic HTML
  - basic ARIA where appropriate
- Do not overcomplicate accessibility implementation

---

## Testing Guidelines

- Write basic tests for core game flows
- Test components through rendering and user interactions
- Do not test implementation details
- Tests should be readable and educational, not clever

---

## Documentation & Communication

- Generate a clear README including:
  - project purpose
  - setup instructions
  - high-level structure
- If something is unclear:
  - add a TODO
  - explain the assumption
- Never silently assume missing requirements

---

## Commits (If Applicable)

Use **Conventional Commits** format:

- feat: new functionality
- fix: bug fixes
- refactor: code improvements without behavior change
- test: adding or updating tests
- docs: documentation changes

---

## Guiding Principle

Simplicity > Cleverness  
Readability > Abstraction  
Certainty > Guessing

If something is unclear, stop and add a TODO.
