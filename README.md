# rbmsilver33 - phpBB Style

**rbmsilver33** is a modern, lightweight, and high-performance phpBB style. It is designed as a child of the core `prosilver` style, ensuring full compatibility with phpBB 3.3.15 and future updates while providing a unique and polished aesthetic.

Originally based on the Damaio template, **rbmsilver33** has been extensively refactored and optimized for speed, maintainability, and a clean user experience.

## Key Features

- **Child of prosilver**: Inherits core functionality and security from the official phpBB style.
- **Modern Typography**: Powered by the **Rubik** font family for superior readability.
- **Native Dark Mode**: Full support for system-wide dark mode preferences and manual switching.
- **Performance Optimized**: 
  - Monolithic CSS architecture (`base.css`) to minimize HTTP requests.
  - Thousands of redundant CSS rules and selectors consolidated or removed.
  - Zero dependencies on heavy third-party color picking libraries (Spectrum).
- **Responsive Design**: Fluid layout that adapts perfectly to desktops, tablets, and smartphones.
- **Rich Interaction**: Interactive hover effects, smooth transitions, and FontAwesome integration.
- **Customization**: Los botones que aparecen en el cuadro de edición de mensajes se pueden recolocar en posting_buttons.html. Es necesario poner todos los bbcodes como visibles en «Mostrar en mensajes» en la pestaña «MENSAJES» del panel de administración.

## Style Configuration

You can customize the style's behavior in `template/config.html`.

## Social Integration

Pre-configured social media icons in the footer for:
- Facebook, Telegram, GitHub, Twitter/X, and YouTube.
- Configurable via `template/config.html`.

## Optimization Details

This style represents a significant technical debt reduction from its predecessor:
- **CSS Consolidation**: `colours.css`, `plupload.css`, and `light_dark.css` have been merged into a single, optimized `base.css`.
- **Selector Merging**: Redundant definitions for links, panels, buttons, and forum lists were combined to reduce stylesheet size and browser parsing time.
- **Refactored JavaScript**: Cleaned up `functions.js` to remove unused features and improve execution speed.

## Licensing

Licensed under **GPL-2.0-only**.
Special thanks to **© Mazeltof & cabot** for the original Damaio foundation.
Maintained by **RebeldeMule**.

---
*For a detailed list of version changes, please see the [CHANGELOG.md](CHANGELOG.md).*
