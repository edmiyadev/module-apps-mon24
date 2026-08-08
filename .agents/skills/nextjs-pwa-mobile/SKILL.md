---
name: nextjs-pwa-mobile
description: Applies Mobile-First development and Progressive Web App (PWA) architecture for Next.js projects. Use this skill when creating layouts, UI components, or optimizing the application for mobile installation.
---

### Goal
Ensure that all frontend development in Next.js is prioritized and optimized for mobile devices (Mobile-First) and meets the architectural and performance standards required to be an installable PWA.

### Instructions
1. **Mandatory Mobile-First:** Start all layout styling (e.g., using Tailwind CSS) with base classes for mobile devices. Apply breakpoints (`sm:`, `md:`, `lg:`) incrementally, only scaling the interface up when the screen size demands it.
2. **Structure and Routing:** Rely strictly on Next.js's native file-based routing system, structuring views and layouts within the file system rather than relying on raw React configurations.
3. **Touch-Friendly Optimization:** Buttons, links, and all interactive elements must have a minimum touch target area of 44x44 pixels.
4. **Fluid Layouts and Safe Areas:** Use relative units (`rem`, `vh`, `vw`, `%`) and layouts based on Flexbox or CSS Grid. It is mandatory to respect `safe-area-insets` (e.g., using variables like `env(safe-area-inset-top)`) to prevent content from colliding with the iOS notch or Android system navigation bars.
5. **Navigation Ergonomics:** Main navigation menus should preferably be placed at the bottom (Bottom Navigation Bar) or designed to be easily accessible with the thumb.
6. **PWA Performance and States:** Maximize the use of Server Components in Next.js to reduce the JavaScript payload sent to the client. Design skeleton loaders for data fetching and ensure the UI behaves in a controlled and aesthetically pleasing manner if the user goes offline.

### Examples
**Input:** "Create a top header for the application."
**Output:** The agent will generate a header component that uses adapted spacing `pt-[env(safe-area-inset-top)]`, touch-friendly icons of adequate size (minimum `w-11 h-11`), and a structure that stacks by default for mobile and uses `md:flex-row` to expand on desktop.

### Constraints
* Do not rely on visual "hover" interactions for critical actions, as these do not exist natively on touch screens.
* Do not use fixed pixel widths that could break the layout on smaller screens.
* Permanently exclude the design concept "Architectural Noir" from any interface structuring, optimization, or planning frameworks.