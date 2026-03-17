# Contributing Guide

Thank you for your interest in contributing to AI & Machine Learning Club projects.

## Development Setup

1. Fork and clone the repository.
2. Install dependencies:

```bash
npm install
```

3. Copy environment template:

```bash
cp .env.example .env.local
```

4. Start local server:

```bash
npm run dev
```

## Branching and Commits

- Create a feature branch from `main`.
- Use clear commit messages (prefer conventional style such as `feat:`, `fix:`, `docs:`).
- Keep pull requests focused and small when possible.

## Quality Requirements

Before opening a pull request, run:

```bash
npm run lint
npm run test
npm run build
```

## Pull Request Checklist

- Code compiles and passes lint.
- Tests added or updated where relevant.
- Documentation updated if behavior or setup changed.
- PR description explains what changed and why.

## Reporting Issues

Please use issue templates and include:

- Clear reproduction steps.
- Expected vs actual behavior.
- Screenshots/logs where helpful.
