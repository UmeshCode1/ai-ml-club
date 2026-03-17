# StatusIndicator Component

A flexible, reusable status indicator component for displaying status states throughout the AI/ML Club application. Built with Framer Motion for smooth animations and fully typed with TypeScript.

## Features

- ✨ **Multiple Visual Styles**: Dots, badges, and icon-only variants
- 🎨 **9 Status Variants**: ongoing, completed, upcoming, idle, success, error, loading, pending, past
- 📏 **4 Size Options**: sm, md, lg, xl
- 🎭 **Animated Effects**: Pulse, ping, and scale animations
- 🎯 **Type-Safe**: Full TypeScript support with proper type exports
- 🎨 **Theme-Aware**: Works with both light and dark modes
- 🔧 **Customizable**: Accepts custom className props for full styling control

## Installation

The component is already installed in the project. Simply import it:

```tsx
import { StatusIndicator, StatusBadge, StatusDot } from "@/components/ui/status-indicator";
```

## Components

### StatusIndicator (Main Component)

The main component that can render as a dot, badge, or icon based on props.

```tsx
<StatusIndicator
  variant="ongoing"
  size="md"
  showLabel={false}
  showIcon={true}
  showPing={true}
/>
```

### StatusDot

Helper component for rendering just the status dot.

```tsx
<StatusDot variant="completed" size="sm" showPing={false} />
```

### StatusBadge

Helper component for rendering badge with icon and label.

```tsx
<StatusBadge variant="loading" label="Processing..." size="md" />
```

## Props

### StatusIndicator Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `variant` | `StatusVariant` | required | The status type to display |
| `size` | `StatusSize` | `"md"` | Size of the indicator |
| `label` | `string` | - | Label text (only shown if showLabel is true) |
| `showIcon` | `boolean` | `true` | Whether to show the icon |
| `showLabel` | `boolean` | `false` | Whether to show the label as a badge |
| `showPing` | `boolean` | `true` | Whether to show ping animation for animated variants |
| `className` | `string` | - | Additional CSS classes for container |
| `iconClassName` | `string` | - | Additional CSS classes for icon |
| `labelClassName` | `string` | - | Additional CSS classes for label |

### StatusVariant Types

```typescript
type StatusVariant =
  | "completed"  // Green checkmark, for finished events/tasks
  | "ongoing"    // Neon lime play icon, for active events/tasks
  | "upcoming"   // Neutral circle, for future events/tasks
  | "idle"       // Gray circle, for inactive states
  | "success"    // Green checkmark, for successful operations
  | "error"      // Red alert icon, for error states
  | "loading"    // Spinning loader, for loading states
  | "pending"    // Clock icon, for pending states
  | "past";      // Green checkmark, for past events (alias for completed)
```

### StatusSize Types

```typescript
type StatusSize = "sm" | "md" | "lg" | "xl";
```

## Usage Examples

### 1. Simple Status Dots (Timeline)

Perfect for event timelines and progress indicators:

```tsx
<div className="flex items-center gap-4">
  <StatusIndicator variant="completed" />
  <StatusIndicator variant="ongoing" />
  <StatusIndicator variant="upcoming" />
</div>
```

### 2. Status Badges (Event Cards)

Great for displaying status with labels:

```tsx
<StatusIndicator
  variant="ongoing"
  showLabel
  label="Live Now"
  size="md"
/>
```

### 3. Loading States (Forms)

Show loading or submission states:

```tsx
<div className="flex items-center gap-3">
  <StatusIndicator variant="loading" size="sm" />
  <span>Submitting your form...</span>
</div>
```

### 4. Success/Error Messages

Display operation results:

```tsx
{submitStatus === "success" && (
  <div className="flex items-center gap-2">
    <StatusIndicator variant="success" size="md" />
    <span>Form submitted successfully!</span>
  </div>
)}

{submitStatus === "error" && (
  <div className="flex items-center gap-2">
    <StatusIndicator variant="error" size="md" />
    <span>Submission failed. Please try again.</span>
  </div>
)}
```

### 5. Timeline with Dots

Create vertical timelines:

```tsx
<div className="flex items-start gap-4">
  <div className="flex flex-col items-center">
    <StatusDot variant="completed" />
    <div className="w-0.5 h-12 bg-neutral-200 dark:bg-neutral-700" />
    <StatusDot variant="ongoing" />
    <div className="w-0.5 h-12 bg-neutral-200 dark:bg-neutral-700" />
    <StatusDot variant="upcoming" />
  </div>
  <div className="space-y-12">
    <div>
      <p className="font-bold">Registration Opened</p>
      <p className="text-sm text-neutral-500">Jan 15, 2026</p>
    </div>
    <div>
      <p className="font-bold">Workshop In Progress</p>
      <p className="text-sm text-neutral-500">Mar 16, 2026</p>
    </div>
    <div>
      <p className="font-bold">Certificates Distribution</p>
      <p className="text-sm text-neutral-500">Mar 30, 2026</p>
    </div>
  </div>
</div>
```

### 6. Custom Styling

Override styles with custom classes:

```tsx
<StatusIndicator
  variant="success"
  showLabel
  label="Verified"
  className="border-2"
  iconClassName="w-6 h-6"
  labelClassName="font-extrabold"
/>
```

### 7. Different Sizes

```tsx
<StatusIndicator variant="ongoing" size="sm" />   {/* Small */}
<StatusIndicator variant="ongoing" size="md" />   {/* Medium (default) */}
<StatusIndicator variant="ongoing" size="lg" />   {/* Large */}
<StatusIndicator variant="ongoing" size="xl" />   {/* Extra Large */}
```

### 8. Control Animations

Disable ping animation when needed:

```tsx
{/* With animation */}
<StatusIndicator variant="ongoing" showPing={true} />

{/* Without animation */}
<StatusIndicator variant="ongoing" showPing={false} />
```

## Visual Reference

### Status Colors & Icons

| Variant | Color | Icon | Animation | Use Case |
|---------|-------|------|-----------|----------|
| `ongoing` | Neon Lime | PlayCircle | Ping + Scale | Active events, live sessions |
| `completed` | Green | CheckCircle2 | - | Finished events, completed tasks |
| `past` | Green | CheckCircle2 | - | Past events (same as completed) |
| `upcoming` | Gray | Circle | - | Future events, scheduled tasks |
| `pending` | Amber | Clock | - | Waiting states, pending approval |
| `loading` | Electric Cyan | Loader2 (spinning) | Spin | Loading data, processing |
| `success` | Green | CheckCircle2 | - | Successful operations |
| `error` | Red | AlertCircle | Ping | Failed operations, errors |
| `idle` | Light Gray | Circle | - | Inactive, dormant states |

## Integration Examples

### Event Timeline (EventsPageClient.tsx)

```tsx
const isPast = event.status === "completed" || event.status === "past";
const isOngoing = event.status === "ongoing";
const variant = isOngoing ? "ongoing" : isPast ? "completed" : "upcoming";

<StatusDot variant={variant} size="md" />
```

### Event Card Badge

```tsx
<StatusBadge
  variant={event.status as StatusVariant}
  label={event.status}
  size="sm"
/>
```

### Form Submission Status

```tsx
{isSubmitting && (
  <StatusIndicator variant="loading" size="sm" />
)}

{submitStatus === "success" && (
  <StatusIndicator variant="success" size="md" />
)}

{submitStatus === "error" && (
  <StatusIndicator variant="error" size="md" />
)}
```

## Demo Page

To see all variants and usage examples, check out the demo file:

```
src/components/ui/status-indicator-demo.tsx
```

You can create a demo page to showcase the component:

```tsx
import { StatusIndicatorDemo } from "@/components/ui/status-indicator-demo";

export default function StatusPage() {
  return <StatusIndicatorDemo />;
}
```

## Design System

The component follows the project's design system:

- **Neon Lime** (`--neon-lime`): `#D4FF00` - Active/Ongoing states
- **Electric Cyan** (`--electric-cyan`): `#00F0FF` - Secondary active states
- **Green**: `#22C55E` - Success/Completed states
- **Red**: `#EF4444` - Error states
- **Amber**: `#F59E0B` - Pending states
- **Neutral**: Various shades for idle/upcoming states

## Animation Details

### Ping Effect
Used for `ongoing` and `error` variants to draw attention:
```css
animate-ping /* Pulsing scale animation */
```

### Scale Effect
The `ongoing` variant has a subtle scale increase:
```css
scale-110 /* 110% of original size */
```

### Spin Effect
The `loading` variant spins continuously:
```css
animate-spin /* 360° rotation */
```

## Accessibility

- All icons have proper semantic meaning
- Colors are complemented by icons for color-blind users
- High contrast ratios for readability
- Supports dark mode out of the box

## Browser Support

Works in all modern browsers that support:
- CSS Grid/Flexbox
- CSS Custom Properties (CSS Variables)
- CSS Animations
- ES6+ JavaScript

## Contributing

When adding new status variants:

1. Add the variant to the `StatusVariant` type
2. Add configuration to `variantConfig` with icon, colors, and animation settings
3. Update this documentation
4. Add examples to the demo file

## License

Part of the AI/ML Club project.
