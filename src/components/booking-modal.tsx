'use client'

import { Dialog, DialogContent, DialogTitle, DialogDescription } from '@/components/ui/dialog'
import { BookingForm } from '@/components/booking-form'

// Header "Book Now" overlay. Wraps the multi-step booking form (5-step modal
// variant) so visitors can book without leaving the page they're on. Radix
// unmounts the content when closed, so the form resets cleanly on every reopen.
export function BookingModal({
  open,
  onOpenChange,
}: {
  open: boolean
  onOpenChange: (open: boolean) => void
}) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-h-[92vh] overflow-y-auto p-6 sm:max-w-md sm:p-8">
        <div className="mb-2">
          <DialogTitle className="text-2xl font-black uppercase tracking-tight text-foreground">
            Book Your Car In
          </DialogTitle>
          <DialogDescription className="mt-1">
            Quick, easy and no obligation, we&apos;ll confirm your appointment with honest advice
            and a clear price.
          </DialogDescription>
        </div>
        <BookingForm variant="modal" />
      </DialogContent>
    </Dialog>
  )
}
