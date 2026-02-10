## MADE BY HEBA MOMAR

### MainButton Component

A versatile and highly customizable button component used throughout the StyleLoom application. It supports various styles (primary, secondary, dark), behaviors (links vs. actions), and decorative elements like the "Golden Radius" border.

**Features:**
- **Dual Mode:** Functions as a navigation link (`NavLink`) if a `to` prop is provided, or as a standard executable button if `onClick` is used.
- **Style Variants:**
  - `shopNowButton`: Applies specific styling for CTA buttons.
  - `cartCheckoutButton`: Styling optimized for cart actions.
  - `isPrimaryButtton`: Standard primary color scheme.
  - `hasDarkBack`: Variant for dark backgrounds.
- **Decorative Elements:**
  - **Golden Radius:** Optional integration with the `GoldenRadius` component for premium borders (`hasBorder={true}`).
  - **Icons:** Supports an optional arrow icon (`arrowIcon`).
- **Responsive Sizing:** Adapts width and height based on screen size (`largerWidth`, `hasFullWidthInCard`, etc.).

**Key Props:**
- `label`: Text to display.
- `to`: Destination URL (makes it a link).
- `onClick`: Click handler function.
- `hasBorder`: Enables the decorative golden border.
- `loading`: Shows a loading spinner state.
