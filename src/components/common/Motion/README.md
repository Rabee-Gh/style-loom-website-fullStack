# Reveal (Master Motion System)

The `Reveal` component is the core of StyleLoom's animation system. It provides a unified, reusable, and highly flexible way to implement premium "Reveal on Scroll" animations.

## Core Concepts
Instead of writing complex motion logic for every element, you wrap your component with `Reveal` and choose a `variant`.

## Props API

| Prop | Type | Default | Description |
| :--- | :--- | :--- | :--- |
| `variant` | `RevealVariant` | `"fade-up"` | The preset animation type. |
| `duration` | `number` | `1.2` | Duration in seconds. |
| `delay` | `number` | `0` | Start delay in seconds. |
| `ease` | `any` | `[...]` | Custom easing (Bezier or string). |
| `distance` | `number` | `50` | Travel distance for fade variants (px). |
| `scaleInitial` | `number` | `0.95` | Starting scale for zoom variants. |
| `blurInitial` | `number` | `10` | Starting blur for the `blur` variant. |

## Available Variants
- `fade-up` | `fade-down` | `fade-left` | `fade-right`
- `zoom-in` | `zoom-out`
- `blur` (Cinematic lens focus effect)
- `rotate-right` | `rotate-left`

## Examples

### 1. Luxury Product Fade (Standard)
```tsx
<Reveal variant="fade-up" duration={1.5}>
  <ProductCard />
</Reveal>
```

### 2. Cinematic Blur Entry
```tsx
<Reveal variant="blur" blurInitial={20} duration={2}>
  <h1>Luxury Collection</h1>
</Reveal>
```

### 3. Dynamic Zoom (Depth effect)
```tsx
<Reveal variant="zoom-in" scaleInitial={0.8} ease="backOut">
  <FeaturedImage />
</Reveal>
```

### 4. Custom Distance Slide
```tsx
<Reveal variant="fade-right" distance={300}>
  <div className="side-banner" />
</Reveal>
```

## Why use this?
- **Consistency**: All animations in the site will have the same "feel".
- **Performance**: Managed through a single optimized component.
- **Maintainability**: Change the global `ease` or `duration` in one place to update the entire site.
