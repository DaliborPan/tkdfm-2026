# Repository Conventions

## DTO Schemas

- For this repository, keep DTO schemas minimal and use only basic types such as `z.string()`, `z.number()`, `z.number().int()`, `z.boolean()`, and `nullable()` when needed.
- Do not add extra validation constraints like `nonnegative()`, `positive()`, `min()`, `max()`, `email()`, `datetime()`, `url()`, or similar refinements unless explicitly requested.

## TypeScript Typing

- Do not explicitly annotate function return types when TypeScript can infer them.
- Prefer inferred return types for repository, service, mapper, and similar internal functions unless an explicit return type is necessary for a specific public contract.

## Module Exports

- Do not export mappers from package module entrypoints.
- Export backend module public API via explicit subpaths such as `@repo/backend/<module>/schema` and `@repo/backend/<module>/service`.
- Do not rely on backend module `index.ts` entrypoints when separate `schema` and `service` exports are sufficient.

## Repository Methods

- When adding a new backend module, add only `findAll()` by default.
- Add other repository and service query methods only when explicitly requested.

## Service Layer And App Callers

- Backend service methods should accept already validated, correctly typed input. Request body validation belongs to a higher app-layer or route-layer caller.
- Backend service methods should accept the current authenticated user as part of their input params, even if the first iteration does not use it yet.
- App-layer user mapping lives in the app, not in `@repo/backend`. Map auth session user to backend `CurrentUserType` shape in the app layer.
- Do not call `headers()`, `cookies()`, `auth.api.getSession()`, or other framework/auth request APIs directly inside backend services.
- For backoffice modules, prefer per-module server callers in `apps/backoffice/src/modules/<module>/server/` over one global caller.
- Keep module callers execution-focused. Do not store DTO schemas in callers; keep schemas in backend schema modules and wire validation in the route/registry layer.
- Prefer composing module callers from small operation helpers (`browse`, `detail`, `create`, `update`) so readonly modules can expose only the operations they actually support.
- API routes and Server Components should call those module callers instead of talking to backend services directly.
- If an API route needs validation, keep parsing in the route layer or module caller layer, before calling the backend service.
- Reuse request context through an app-level request-context helper so auth/session lookup is centralized and not repeated across every Server Component.
- Generic API route registries should allow partial operation support and return `405 Method Not Allowed` when an entity exists but the requested operation is not implemented.

## iqf-web Packages

- Do not modify `iqf-web-*` packages in this repository unless the user explicitly requests it.
- Treat `iqf-web-*` packages as imported upstream code; adapt local apps/packages around them instead of changing them.
