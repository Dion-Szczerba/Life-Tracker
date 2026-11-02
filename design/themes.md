# Themes

The home screen was designed in three themes. **Blend is the chosen default.** The other two are kept so they can be offered as alternatives in a theme picker later.

- Live mockups (interactive canvas, all three side by side): https://claude.ai/artifact/XQTwohtyXqhy3VNZN96hK2
- Mockup sources: `design/mockups/` (`.dc.html` files for that canvas; not part of the app build)

All themes share the same layout, content and fonts. Only the tokens below change, so a theme in code is a set of CSS variables, for example under `[data-theme="blend"]`.

## Shared

| Token        | Value                                                             |
| ------------ | ----------------------------------------------------------------- |
| Display font | Chakra Petch 500/600/700 (date, numbers, headings)                |
| Body font    | Barlow 400/500/600                                                |
| Numbers      | `font-variant-numeric: tabular-nums`                              |
| Motif        | slanted cells (`skewX(-20deg)`), cut corners, HUD corner brackets |

## Roles

Colours are assigned by **role**, not by hue, so a new theme only has to fill in this table. In Red HUD and Blend, the rule is: red means information, blue means you can tap it.

| Role                         | Neon                  | Red HUD               | Blend                 |
| ---------------------------- | --------------------- | --------------------- | --------------------- |
| `date` (big numeral)         | `#3DF5FF`             | `#F2545B`             | `#FF4D5E`             |
| `date-offset` (colour split) | `#FF3D9A`             | `#4FD1E8`             | `#36D6FF`             |
| `frame` (brackets, grid)     | `#3DF5FF`             | `#F2545B`             | `#FF4D5E`             |
| `ruler` (day progress)       | `#3DF5FF`             | `#F2545B`             | `#FF4D5E`             |
| `now` (ruler marker)         | `#FF3D9A`             | `#4FD1E8`             | `#36D6FF`             |
| `streak`                     | `#FF3D9A`             | `#F2545B`             | `#FF4D5E`             |
| `habit` (tappable)           | `#3DF5FF`             | `#4FD1E8`             | `#36D6FF`             |
| `todo` (tappable)            | `#FF3D9A`             | `#4FD1E8`             | `#36D6FF`             |
| `week` (grid cells)          | `#3DF5FF`             | `#F2545B`             | `#FF4D5E`             |
| `today` (week label)         | `#FF3D9A`             | `#F2545B`             | `#FF4D5E`             |
| `nav-active`                 | `#3DF5FF`             | `#4FD1E8`             | `#36D6FF`             |
| `logo` (two slashes)         | `#3DF5FF` / `#FF3D9A` | `#F2545B` / `#4FD1E8` | `#FF4D5E` / `#36D6FF` |

## Neutrals

| Token                     | Neon      | Red HUD   | Blend                                    |
| ------------------------- | --------- | --------- | ---------------------------------------- |
| `bg`                      | `#0A0820` | `#0B0F14` | `#04050A` plus background layers (below) |
| `panel`                   | `#120E2E` | `#121A22` | `rgba(10, 13, 24, 0.7)` + `blur(8px)`    |
| `nav`                     | `#120E2E` | `#121A22` | `rgba(6, 9, 16, 0.82)` + `blur(10px)`    |
| `text`                    | `#E8E6FF` | `#E6EDF2` | `#E6EDF2`                                |
| `muted` (passes 4.5:1)    | `#9D99CC` | `#8A9AA8` | `#8A9AA8`                                |
| `line`                    | `#2A2558` | `#263340` | `#263340`                                |
| `divider`                 | `#241F4D` | `#1E2A35` | `#1E2A35`                                |
| `inactive` (ticks, cells) | `#3A3570` | `#34444F` | `#34444F`                                |
| `cell-off`                | `#1E1A42` | `#18222B` | `#18222B`                                |
| `habit-frame`             | `#2E2A5C` | `#2B5866` | `rgba(54, 214, 255, 0.32)`               |
| `habit-done` (panel fill) | `#172A47` | `#14394A` | `rgba(18, 72, 100, 0.72)`                |

## Glow and background

| Token            | Neon / Red HUD        | Blend                    |
| ---------------- | --------------------- | ------------------------ |
| Date glow        | `0 0 28px` at 45%     | `0 0 36px` at 70%        |
| Streak cell glow | `0 0 10px` at 70%     | `0 0 14px` at 90%        |
| Done habit glow  | `0 0 16px` at 35%     | `0 0 22px` at 55%        |
| Background       | flat `bg` + scanlines | layers below + scanlines |

Blend background layers, back to front:

1. Vertical blend: `linear-gradient(180deg, #2B0914 0%, #1A0A26 20%, #0B1838 48%, #060B18 74%, #04050A 100%)`
2. Red glow, top left: 480px circle, `radial-gradient(closest-side, rgba(255, 77, 94, 0.5), transparent)` at left -150px, top -170px
3. Blue glow, right: 500px circle, `radial-gradient(closest-side, rgba(40, 120, 255, 0.4), transparent)` at right -190px, top 330px
4. Rain streaks: `repeating-linear-gradient(105deg, rgba(230, 237, 242, 0.04) 0 1px, transparent 1px 28px)`
5. Floor grid, bottom 460px: 26px grid of `rgba(54, 214, 255, 0.12)` lines, faded in with `mask-image: linear-gradient(to bottom, transparent, #000 75%)`
6. Scanlines (all themes): `repeating-linear-gradient(rgba(230, 237, 242, 0.035) 0 1px, transparent 1px 3px)`

## Adding a theme

1. Copy a mockup in `design/mockups/` (or add an artboard to the canvas) and change only the tokens.
2. Fill in a new column in the Roles and Neutrals tables.
3. Check `text` and `muted` against the lightest part of the background for 4.5:1 contrast.
