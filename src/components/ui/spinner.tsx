// src/components/ui/full-page-spinner.tsx

import { cn } from "@/lib/utils"

function FullPageSpinner({ className }: { className?: string }) {
    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-background/30">
            <div className={cn("relative w-16 h-16", className)}>
                <div className="absolute inset-0 rounded-full border-4 border-muted animate-spin border-t-primary"></div>
                <div className="absolute inset-2 rounded-full border-4 border-muted opacity-20"></div>
            </div>
        </div>
    )
}

export default FullPageSpinner
