# Repository Conventions

## DTO Schemas

- For this repository, keep DTO schemas minimal and use only basic types such as `z.string()`, `z.number()`, `z.number().int()`, `z.boolean()`, and `nullable()` when needed.
- Do not add extra validation constraints like `nonnegative()`, `positive()`, `min()`, `max()`, `email()`, `datetime()`, `url()`, or similar refinements unless explicitly requested.

## TypeScript Typing

- Do not explicitly annotate function return types when TypeScript can infer them.
- Prefer inferred return types for repository, service, mapper, and similar internal functions unless an explicit return type is necessary for a specific public contract.

## Module Exports

- Do not export mappers from package module entrypoints.
- Export only service and schema public API from backend modules unless explicitly requested otherwise.

## Repository Methods

- When adding a new backend module, add only `findAll()` by default.
- Add other repository and service query methods only when explicitly requested.
