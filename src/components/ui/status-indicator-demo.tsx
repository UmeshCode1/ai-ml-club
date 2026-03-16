"use client";

import { StatusIndicator, StatusBadge, StatusDot } from "./status-indicator";

/**
 * StatusIndicator Component Demo
 *
 * This file demonstrates all the ways to use the StatusIndicator component.
 * You can use this as a reference for implementing status indicators throughout the app.
 */

export function StatusIndicatorDemo() {
  return (
    <div className="p-8 space-y-12 max-w-6xl mx-auto bg-neutral-50 dark:bg-black">
      <div>
        <h1 className="text-3xl font-black mb-2 text-neutral-900 dark:text-white">
          Status Indicator Component
        </h1>
        <p className="text-neutral-600 dark:text-neutral-400">
          A reusable component for displaying status indicators, dots, and badges throughout the application.
        </p>
      </div>

      {/* Status Dots */}
      <section className="space-y-4">
        <h2 className="text-xl font-bold text-neutral-900 dark:text-white">
          1. Status Dots (Default)
        </h2>
        <div className="flex flex-wrap gap-6 items-center p-6 bg-white dark:bg-neutral-900 rounded-2xl border border-neutral-200 dark:border-neutral-800">
          <div className="flex flex-col items-center gap-2">
            <StatusIndicator variant="ongoing" />
            <span className="text-xs text-neutral-500">Ongoing</span>
          </div>
          <div className="flex flex-col items-center gap-2">
            <StatusIndicator variant="completed" />
            <span className="text-xs text-neutral-500">Completed</span>
          </div>
          <div className="flex flex-col items-center gap-2">
            <StatusIndicator variant="upcoming" />
            <span className="text-xs text-neutral-500">Upcoming</span>
          </div>
          <div className="flex flex-col items-center gap-2">
            <StatusIndicator variant="pending" />
            <span className="text-xs text-neutral-500">Pending</span>
          </div>
          <div className="flex flex-col items-center gap-2">
            <StatusIndicator variant="loading" />
            <span className="text-xs text-neutral-500">Loading</span>
          </div>
          <div className="flex flex-col items-center gap-2">
            <StatusIndicator variant="success" />
            <span className="text-xs text-neutral-500">Success</span>
          </div>
          <div className="flex flex-col items-center gap-2">
            <StatusIndicator variant="error" />
            <span className="text-xs text-neutral-500">Error</span>
          </div>
          <div className="flex flex-col items-center gap-2">
            <StatusIndicator variant="idle" />
            <span className="text-xs text-neutral-500">Idle</span>
          </div>
        </div>
      </section>

      {/* Status Badges */}
      <section className="space-y-4">
        <h2 className="text-xl font-bold text-neutral-900 dark:text-white">
          2. Status Badges (With Labels)
        </h2>
        <div className="flex flex-wrap gap-4 p-6 bg-white dark:bg-neutral-900 rounded-2xl border border-neutral-200 dark:border-neutral-800">
          <StatusIndicator variant="ongoing" showLabel label="ongoing" />
          <StatusIndicator variant="completed" showLabel label="completed" />
          <StatusIndicator variant="upcoming" showLabel label="upcoming" />
          <StatusIndicator variant="pending" showLabel label="pending" />
          <StatusIndicator variant="loading" showLabel label="loading" />
          <StatusIndicator variant="success" showLabel label="success" />
          <StatusIndicator variant="error" showLabel label="error" />
          <StatusIndicator variant="idle" showLabel label="idle" />
        </div>
      </section>

      {/* Different Sizes */}
      <section className="space-y-4">
        <h2 className="text-xl font-bold text-neutral-900 dark:text-white">
          3. Different Sizes
        </h2>
        <div className="space-y-6 p-6 bg-white dark:bg-neutral-900 rounded-2xl border border-neutral-200 dark:border-neutral-800">
          <div className="flex items-center gap-4">
            <span className="text-sm text-neutral-600 dark:text-neutral-400 w-20">Small:</span>
            <StatusIndicator variant="ongoing" size="sm" />
            <StatusIndicator variant="ongoing" size="sm" showLabel label="ongoing" />
          </div>
          <div className="flex items-center gap-4">
            <span className="text-sm text-neutral-600 dark:text-neutral-400 w-20">Medium:</span>
            <StatusIndicator variant="ongoing" size="md" />
            <StatusIndicator variant="ongoing" size="md" showLabel label="ongoing" />
          </div>
          <div className="flex items-center gap-4">
            <span className="text-sm text-neutral-600 dark:text-neutral-400 w-20">Large:</span>
            <StatusIndicator variant="ongoing" size="lg" />
            <StatusIndicator variant="ongoing" size="lg" showLabel label="ongoing" />
          </div>
          <div className="flex items-center gap-4">
            <span className="text-sm text-neutral-600 dark:text-neutral-400 w-20">XL:</span>
            <StatusIndicator variant="ongoing" size="xl" />
            <StatusIndicator variant="ongoing" size="xl" showLabel label="ongoing" />
          </div>
        </div>
      </section>

      {/* Helper Components */}
      <section className="space-y-4">
        <h2 className="text-xl font-bold text-neutral-900 dark:text-white">
          4. Helper Components
        </h2>
        <div className="space-y-4 p-6 bg-white dark:bg-neutral-900 rounded-2xl border border-neutral-200 dark:border-neutral-800">
          <div className="flex flex-col gap-2">
            <span className="text-sm font-bold text-neutral-600 dark:text-neutral-400">
              StatusDot (Dot only):
            </span>
            <div className="flex gap-4 items-center">
              <StatusDot variant="ongoing" />
              <StatusDot variant="completed" />
              <StatusDot variant="error" />
            </div>
          </div>
          <div className="flex flex-col gap-2">
            <span className="text-sm font-bold text-neutral-600 dark:text-neutral-400">
              StatusBadge (Badge only):
            </span>
            <div className="flex gap-4 flex-wrap">
              <StatusBadge variant="ongoing" label="Live Now" />
              <StatusBadge variant="completed" label="Finished" />
              <StatusBadge variant="loading" label="Processing..." />
            </div>
          </div>
        </div>
      </section>

      {/* Without Ping Animation */}
      <section className="space-y-4">
        <h2 className="text-xl font-bold text-neutral-900 dark:text-white">
          5. Control Ping Animation
        </h2>
        <div className="flex gap-6 items-center p-6 bg-white dark:bg-neutral-900 rounded-2xl border border-neutral-200 dark:border-neutral-800">
          <div className="flex flex-col items-center gap-2">
            <StatusIndicator variant="ongoing" showPing={true} />
            <span className="text-xs text-neutral-500">With Ping</span>
          </div>
          <div className="flex flex-col items-center gap-2">
            <StatusIndicator variant="ongoing" showPing={false} />
            <span className="text-xs text-neutral-500">Without Ping</span>
          </div>
        </div>
      </section>

      {/* Real-world Examples */}
      <section className="space-y-4">
        <h2 className="text-xl font-bold text-neutral-900 dark:text-white">
          6. Real-world Usage Examples
        </h2>
        <div className="space-y-4 p-6 bg-white dark:bg-neutral-900 rounded-2xl border border-neutral-200 dark:border-neutral-800">
          {/* Event Card Example */}
          <div className="p-4 border border-neutral-200 dark:border-neutral-700 rounded-xl">
            <div className="flex items-center justify-between mb-3">
              <StatusBadge variant="ongoing" label="ongoing" />
              <span className="text-xs text-neutral-400">WORKSHOP</span>
            </div>
            <h3 className="font-bold text-neutral-900 dark:text-white mb-2">
              Machine Learning Workshop
            </h3>
            <p className="text-sm text-neutral-600 dark:text-neutral-400">
              Join us for an interactive session on ML fundamentals.
            </p>
          </div>

          {/* Form Status Example */}
          <div className="p-4 border border-neutral-200 dark:border-neutral-700 rounded-xl">
            <div className="flex items-center gap-3">
              <StatusIndicator variant="loading" />
              <span className="text-sm text-neutral-600 dark:text-neutral-400">
                Submitting your form...
              </span>
            </div>
          </div>

          {/* Timeline Dot Example */}
          <div className="flex items-start gap-4">
            <div className="flex flex-col items-center">
              <StatusDot variant="completed" />
              <div className="w-0.5 h-12 bg-neutral-200 dark:bg-neutral-700" />
              <StatusDot variant="ongoing" />
              <div className="w-0.5 h-12 bg-neutral-200 dark:bg-neutral-700" />
              <StatusDot variant="upcoming" />
            </div>
            <div className="space-y-12 flex-1">
              <div>
                <p className="text-sm font-bold text-neutral-900 dark:text-white">
                  Registration Opened
                </p>
                <p className="text-xs text-neutral-500">Jan 15, 2026</p>
              </div>
              <div>
                <p className="text-sm font-bold text-neutral-900 dark:text-white">
                  Workshop In Progress
                </p>
                <p className="text-xs text-neutral-500">Mar 16, 2026</p>
              </div>
              <div>
                <p className="text-sm font-bold text-neutral-900 dark:text-white">
                  Certificates Distribution
                </p>
                <p className="text-xs text-neutral-500">Mar 30, 2026</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Usage Code Examples */}
      <section className="space-y-4">
        <h2 className="text-xl font-bold text-neutral-900 dark:text-white">
          7. Code Examples
        </h2>
        <div className="p-6 bg-neutral-900 rounded-2xl border border-neutral-800 overflow-x-auto">
          <pre className="text-xs text-neutral-300 leading-relaxed font-mono">
{`// Import the component
import { StatusIndicator, StatusBadge, StatusDot } from "@/components/ui/status-indicator";

// Simple dot indicator
<StatusIndicator variant="ongoing" />

// Badge with label
<StatusIndicator variant="ongoing" showLabel label="Live Now" />

// Different sizes
<StatusIndicator variant="completed" size="lg" />

// Without ping animation
<StatusIndicator variant="ongoing" showPing={false} />

// Using helper components
<StatusDot variant="completed" size="sm" />
<StatusBadge variant="loading" label="Processing..." size="md" />

// Custom styling
<StatusIndicator
  variant="success"
  showLabel
  label="Done"
  className="custom-class"
  iconClassName="custom-icon"
  labelClassName="custom-label"
/>`}
          </pre>
        </div>
      </section>
    </div>
  );
}
