// src/components/ui/deleting-spinner.tsx

import { cn } from "@/lib/utils"

export function DeletingSpinner({ className }: { className?: string }) {
    return (
        <div
            className={cn(
                "absolute inset-0 z-10 flex flex-col items-center justify-center bg-background/80 text-muted-foreground",
                className
            )}
        >
            <svg
                className="w-10 h-10 mb-3 animate-spin text-destructive"
                viewBox="0 0 24 24"
                fill="none"
            >
                <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                />
                <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                />
            </svg>
            <p className="text-base font-medium">Deleting book...</p>
        </div>
    )
}
