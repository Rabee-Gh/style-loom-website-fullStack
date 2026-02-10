## MADE BY WADAH DAHI

### GoldenRadius Component

This component adds decorative "Golden Corners" overlays to UI elements (primarily buttons) to enhance their aesthetics with a premium feel.

**Features:**
- **Responsive Scaling:** Automatically toggles between different corner asset sizes based on the screen width:
  - Uses **12px corners** (`CORNER_12px`) for large screens (`≥ 1536px` / `2xl`).
  - Uses **8px corners** (`CORNER_8px`) for smaller screens regarding to the Figma Design.
- **Positioning:** Places 4 corner images absolutely within the parent container to create a custom border-radius effect.

**Usage:**
```tsx
import GoldenRadius from "@/components/common/UI/GoldenRadius/GoldenRadius";

// Usage in a component
return (
  <div className="relative">
    <GoldenRadius />
    {/* Your content */}
  </div>
);
```
