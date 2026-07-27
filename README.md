# Blog (Zola + roadcore)

Quiet tech blog theme: Catppuccin Mocha, green accent, IBM Plex, Roadster-style layout. Ready for GitHub Pages.

## Local

```bash
zola serve
```

Open http://127.0.0.1:1111

## Look & feel

- **Default:** Catppuccin Mocha + green (`#a6e3a1`)
- **Toggle:** Latte (light)
- **Fonts:** IBM Plex Sans / IBM Plex Mono
- **Sidebar widgets:** search, recent, tags (configure in `config.toml`)
- **Posts:** ISO dates, reading time, optional TOC (`extra.toc = true`), code copy buttons

## Configure

Edit `config.toml`:

- `base_url` — e.g. `https://you.github.io/repo`
- `title`, `description`, `extra.author`, `extra.tagline`
- `extra.menu`, `extra.social`, `extra.widgets`
- `extra.highlight_color` (default green)

## Content

Posts live in `content/posts/`:

```toml
+++
title = "My post"
date = 2026-07-26
description = "Short summary"
[taxonomies]
categories = ["Notes"]
tags = ["rust", "security"]
[extra]
toc = true
+++
```

Use `<!-- more -->` for list summaries. GitHub alerts work if `github_alerts = true`.

## GitHub Pages

1. Push this repo
2. Settings → Pages → Source: **GitHub Actions**
3. Set `base_url` correctly for user or project site

## Theme

`themes/roadcore/` — templates, Sass, and small JS (menu, theme toggle, code copy).
