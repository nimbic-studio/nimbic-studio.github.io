# Nimbic brand

The wordmark is drawn, not typed: every letter of "nimbic" is built from stems, round humps and circles in one
rounded stroke, with the two i-dots in sky blue. The mark is the "n" hump (a small cloud, from *nimbus*) with its dot,
on a charcoal tile. SVGs are the masters; the PNGs are exports of them.

## Colours

| Role | Hex |
|---|---|
| Charcoal (text, tile) | `#1F1F1F` |
| Off-white (dark-mode text, light background) | `#F7F7F5` |
| Sky (dots, accent) | `#4DA8FF` |

## Files

| File | Use |
|---|---|
| `nimbic-logo.svg` / `.png` | Mark + wordmark, for light backgrounds |
| `nimbic-logo-dark.svg` / `.png` | Mark + wordmark, for dark backgrounds |
| `nimbic-wordmark.svg`, `nimbic-wordmark-dark.svg` | Wordmark only |
| `nimbic-mark.svg` | The app/avatar icon (works on any background) |
| `nimbic-mark-512.png` | Play Console developer icon, avatars |
| `nimbic-mark-192.png`, `nimbic-mark-180.png` | Android / iOS home-screen icons |
| `nimbic-mark-32.png` | Favicon fallback |
| `nimbic-social.png` | 1200x630 link-preview image (Open Graph) |

## Rules

- Keep the dots sky on both backgrounds; don't outline them, recolour the letters, or set the name in a font instead.
- Leave clear space around the logo of at least the height of an i-dot's gap (about a quarter of the mark's height).
- Smallest sizes: mark 16 px, full logo 24 px tall.

## Re-exporting PNGs

The PNGs were rendered from the SVGs with headless Edge, e.g. for the 512 icon:

```bash
"/c/Program Files (x86)/Microsoft/Edge/Application/msedge.exe" --headless=new --hide-scrollbars --default-background-color=00000000 --window-size=512,512 --screenshot=nimbic-mark-512.png page.html
```

where `page.html` is `<body style="margin:0">` containing the SVG with `width="512" height="512"`.
