# 🎨 UI Component Reference Guide

Quick reference for all UI components and their current implementation.

## 📐 Layout Structure

```
┌─────────────────────────────────────────────────────────────┐
│  SIDEBAR (280px)    │  MAIN CONTENT (flex)                  │
├─────────────────────┼───────────────────────────────────────┤
│                      │  ┌─────────────────────────────────┐ │
│  💧 AI Farm          │  │  Server Room 01 Live Monitoring │ │
│                      │  │  [Legend: 🟢🟡🟠🔴🔵]          │ │
│  System Mode         │  └─────────────────────────────────┘ │
│  ○ Standard Reactive │                                       │
│  ● AI Predictive     │  ┌─────────────────────────────────┐ │
│                      │  │                                 │ │
│  [Toggle] Auto-Spikes│  │     3D VISUALIZATION           │ │
│                      │  │     (Three.js Canvas)           │ │
│  ─────────────────   │  │     [4 Racks × 6 Servers]      │ │
│                      │  │                                 │ │
│  Actions             │  │     Overlay: Active Cooling: 0  │ │
│  ▶ Start Simulation  │  │                                 │ │
│  ⏹ Stop             │  └─────────────────────────────────┘ │
│  🔥 Trigger Spike    │                                       │
│  🧠 Retrain Model    │  ┌─────────────────────────────────┐ │
│                      │  │  SERVER GRID (24 Cards)         │ │
│  ─────────────────   │  │  ┌────┐ ┌────┐ ┌────┐ ┌────┐  │ │
│                      │  │  │SRV-│ │SRV-│ │SRV-│ │SRV-│  │ │
│  Global Status       │  │  │ 00 │ │ 01 │ │ 02 │ │ 03 │  │ │
│  Simulation: Running │  │  │72°F│ │75°F│ │88°F│ │70°F│  │ │
│  Confidence: 85.2%  │  │  └────┘ └────┘ └────┘ └────┘  │ │
│  Total Spikes: 42    │  │  ... (20 more cards)           │ │
│                      │  └─────────────────────────────────┘ │
└─────────────────────┴───────────────────────────────────────┘
```

## 🧩 Component Breakdown

### 1. Sidebar Components

#### Brand Section
- **Logo Icon**: 💧 (40×40px, gradient background)
- **Title**: "AI Farm" (1.25rem, bold)

#### System Mode Toggles
- **Type**: Radio buttons (hidden, styled labels)
- **Options**:
  - Standard Reactive (default, white background when selected)
  - AI Predictive (gradient background when selected)
- **Styling**: Card-like buttons with borders

#### Auto-Spikes Toggle
- **Type**: Checkbox (styled as iOS-style toggle)
- **Default**: Checked (enabled)
- **Visual**: Slider with blue background when ON

#### Action Buttons
- **Start Simulation**: Green button (#22c55e)
- **Stop**: Gray button (disabled when stopped)
- **Trigger Spike**: Red outline button
- **Retrain Model**: Blue outline button (shows progress)

#### Global Status Section
- **Container**: Card with border
- **Items**: Key-value pairs
  - Simulation: Badge (stopped/running)
  - Model Confidence: Percentage
  - Total Spikes: Count

### 2. Main Content Components

#### Top Bar
- **Title**: "Server Room 01" + "Live Monitoring" (subtitle)
- **Legend**: 5 colored dots with labels
  - 🟢 Normal
  - 🟡 Warm
  - 🟠 Hot
  - 🔴 Critical
  - 🔵 Cooling Active

#### 3D Visualization
- **Container**: Full-width, 60% of main height
- **Background**: Dark radial gradient
- **Overlay Stats**: Top-right corner
  - Active Cooling Units: Large number display

#### Server Grid
- **Layout**: Responsive grid (auto-fill, min 140px per card)
- **Cards**: 24 total
- **Card Structure**:
  ```
  ┌─────────────────────┐
  │ ❄ (cooling overlay) │
  │ SRV-00    72.5°F    │
  │ Pred: 73.2°  15%    │
  └─────────────────────┘
  ```

## 🎨 Color System

### Temperature Colors
| Range | Color | Hex | Usage |
|-------|-------|-----|-------|
| <80°F | Green | #22c55e | Normal |
| 80-85°F | Yellow | #eab308 | Warm |
| 85-90°F | Orange | #f97316 | Hot |
| >90°F | Red | #ef4444 | Critical |
| Cooling | Blue | #3b82f6 | Active cooling |

### Probability Colors
| Range | Color | Usage |
|-------|-------|-------|
| ≤40% | Green | Low risk |
| 40-70% | Yellow | Medium risk |
| >70% | Red | High risk |

### UI Colors
- **Background Dark**: #0f172a (sidebar)
- **Background Darker**: #020617 (main)
- **Card Background**: #1e293b
- **Text Primary**: #f8fafc
- **Text Secondary**: #94a3b8
- **Border**: #334155

## 📊 Server Card Details

### Card States

#### Normal State
```
┌─────────────────────┐
│ SRV-00    72.5°F    │ ← Green text
│ Pred: 73.2°  15%    │ ← Green probability
└─────────────────────┘
Border: #334155 (gray)
```

#### Warm State
```
┌─────────────────────┐
│ SRV-00    82.3°F    │ ← Yellow text
│ Pred: 84.1°  45%    │ ← Yellow probability
└─────────────────────┘
Border: #334155
```

#### Hot State
```
┌─────────────────────┐
│ SRV-00    87.8°F    │ ← Orange text
│ Pred: 89.2°  65%    │ ← Yellow probability
└─────────────────────┘
Border: #334155
```

#### Critical State
```
┌─────────────────────┐
│ SRV-00    92.5°F    │ ← Red text
│ Pred: 94.1°  85%    │ ← Red probability
└─────────────────────┘
Border: #334155
```

#### Cooling Active State
```
┌─────────────────────┐
│ ❄ (blue overlay)   │ ← Visible
│ SRV-00    68.2°F    │ ← Blue text
│ Pred: 67.8°  5%     │ ← Green probability
└─────────────────────┘
Border: #3b82f6 (blue)
```

## 🔄 Interactive States

### Buttons
- **Hover**: Slight color change, cursor pointer
- **Disabled**: Opacity 0.5, cursor not-allowed
- **Active**: Pressed state (if applicable)

### Cards
- **Hover**: Border color changes to #94a3b8
- **Click**: (Future: Open detail modal)

### Toggles
- **Checked**: Blue background, white slider
- **Unchecked**: Gray background, gray slider

## 📱 Responsive Behavior

### Current Layout
- **Sidebar**: Fixed 280px width
- **Main**: Flex (remaining space)
- **Server Grid**: Auto-fill, min 140px per card

### Breakpoints (Future)
- **Mobile**: Stack sidebar below main
- **Tablet**: Reduce sidebar width
- **Desktop**: Current layout

## 🎯 Data Display Patterns

### Temperature Display
- **Format**: `XX.X°F`
- **Color**: Based on temperature range
- **Update**: Every 2 seconds

### Prediction Display
- **Format**: `Pred: XX.X°` (predicted temp)
- **Probability**: `XX%` (spike probability)
- **Color**: Based on probability range

### Status Badges
- **Running**: Green background, green text
- **Stopped**: Gray background, gray text

### Counters
- **Format**: Integer
- **Update**: Every 5 seconds (total spikes)

## 🚀 Animation & Transitions

### Transitions
- **Buttons**: 0.2s ease
- **Cards**: 0.2s ease (border, hover)
- **Cooling Overlay**: 0.3s ease (opacity)

### Animations
- **Progress Bar**: Pulse (1.5s infinite)
- **Fade In**: 0.3s ease-in (retrain progress)

## 📋 Component Hierarchy

```
app-container
├── sidebar
│   ├── brand
│   ├── control-panel
│   │   ├── mode-toggles
│   │   ├── action-buttons
│   │   └── status-section
│   └── (auto-spikes toggle)
└── main-content
    ├── top-bar
    │   └── legend
    └── dashboard-grid
        ├── visualization-container
        │   ├── canvas-container (Three.js)
        │   └── canvas-overlay
        └── server-grid-container
            └── server-controls-grid
                └── server-card (×24)
```

## 🎨 Design Tokens

### Spacing
- **Small**: 0.5rem (8px)
- **Medium**: 1rem (16px)
- **Large**: 1.5rem (24px)
- **XLarge**: 2rem (32px)

### Border Radius
- **Small**: 4px (badges)
- **Medium**: 8px (cards, buttons)
- **Large**: 12px (status section)

### Shadows
- **Logo**: `0 4px 12px rgba(59, 130, 246, 0.3)`
- **Progress Bar**: `0 2px 4px rgba(76, 175, 80, 0.3)`

### Typography Scale
- **XS**: 0.75rem (12px) - Labels, small text
- **SM**: 0.85rem (13.6px) - Card headers
- **Base**: 0.9rem (14.4px) - Body text
- **LG**: 1.1rem (17.6px) - Section headers
- **XL**: 1.25rem (20px) - Brand title
- **2XL**: 1.5rem (24px) - Large values

---

**Use this reference when designing UI improvements!** 🎨


