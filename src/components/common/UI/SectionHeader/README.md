## MADE BY MOAMEN MOHAMAD

### SectionHeader Component

A reusable, responsive header component designed for section titles across the application. It supports a title, subtitle, optional background image, and slots for extra content or buttons.

**Features:**
- **Flexible Layout:** Supports different positioning and dimension props for the background image.
- **Customizable:** Accepts `children` and `extraComponent` for extending functionality (e.g., adding buttons or filters).
- **Responsive Typography:** Uses fluid font sizes (`text-[28px]` to `2xl:text-[48px]`) to ensure readability on all devices.
- **Theme Aware:** Fully compatible with Dark Mode using Tailwind's `dark:` classes.
- **Dashed Border Support:** Includes logic for custom dashed borders (`custom-dashed-b`) to match the application's design system.

**Props:**
- `title`: The main heading text.
- `subtitle`: Optional descriptive text below the title.
- `imageSrc`: URL for the decorative background image.
- `hasBorder`: Boolean to enable the bottom dashed separator.
- `position` & `dimensions`: CSS classes to control the image placement and size.
