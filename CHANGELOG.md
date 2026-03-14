# Changelog

All notable changes to the **rbmsilver33** phpBB style will be documented in this file.

## [1.0.13] - 2026-03-06

### Added
- Created the **rbmsilver33** style as a child of `prosilver`, based on Damaio 3.3.15.

### Changed
- **Style Identity**: Renamed the style across `style.cfg` and template files.
- **Copyright**: Updated copyright holders and license information in `style.cfg`.
- **HTML Structure**: Updated the main `html` class name to `rbmsilver33` in `overall_header.html`.
- **Styling Architecture**: Centralized all CSS variables and configuration at the top of `theme/base.css`.

### Removed
- **Color Picker**: Completely removed the Spectrum color picker asset, scripts, and container elements.
- **Redundant Scripting**: Cleaned up `template/functions.js` by removing dynamic color switching logic.
- **Unnecessary Assets**: Deleted the `theme/spectrum/` directory.
- **Redundant Stylesheets**: Deleted `colours.css`, `plupload.css`, and `light_dark.css` after consolidating their rules.

### Optimized
- **CSS Monolith**: Merged all core styling into a single `theme/base.css` file to reduce HTTP requests.
- **Selector Consolidation**: Analyzed and merged hundreds of duplicate CSS selectors and properties (body, links, containers, buttons, etc.) into unified declarations.
- **Variable Cleanup**: Removed redundant and circular CSS variable definitions.
- **Performance**: Optimized the internal style hierarchy to ensure efficient loading and cleaner code maintainability.
