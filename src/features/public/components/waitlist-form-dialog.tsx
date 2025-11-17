import { Button } from "../../../components/ui/button"
import { Input } from "../../../components/ui/input"
import { Label } from "../../../components/ui/label"
import { Textarea } from "../../../components/ui/textarea"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../../../components/ui/dialog"

interface WaitlistFormDialogProps {
  trigger?: React.ReactNode
}

export const WaitlistFormDialog = ({ trigger }: WaitlistFormDialogProps) => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        {trigger || (
          <Button className="bg-[#E4B68A] hover:bg-[#D4A67A] text-black font-medium">
            Join the Waitlist
          </Button>
        )}
      </DialogTrigger>
      <DialogContent className="sm:max-w-2xl bg-white rounded-[23px]">
        <DialogHeader className="text-center">
          <div className="mx-auto mb-4">
            <span className="bg-[#3A9BA5]/20 text-[#3A9BA5] px-3 py-1 rounded-full text-sm font-medium">
              Join the Waitlist
            </span>
          </div>
          <DialogTitle className="text-3xl font-bold text-gray-900 mb-2 w-full text-center">
            Be the First to Experience the Future of Dermatology
          </DialogTitle>
        </DialogHeader>

        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="fullName" className="text-gray-700">
                Full Name
              </Label>
              <Input
                id="fullName"
                placeholder="Enter your full name"
                className="border-gray-300"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email" className="text-gray-700">
                Email Address
              </Label>
              <Input
                id="email"
                type="email"
                placeholder="Enter your email"
                className="border-gray-300"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="skinConcern" className="text-gray-700">
              Skin Concern / Interest <span className="text-red-400 text-xs">*optional</span>
            </Label>
            <Textarea
              id="skinConcern"
              placeholder="Tell us about your skin concerns or interests..."
              className="border-gray-300 min-h-[100px]"
            />
          </div>
        </div>

        <div className="space-y-4">
          <Button className="w-full bg-[#E4B68A] hover:bg-[#D4A67A] text-black font-medium py-3">
            Join the Waitlist
          </Button>

          <p className="text-center text-sm text-gray-600">
            For enquiries and support{" "}
            <a href="#" className="text-[#5DADE2] hover:underline">
              Contact Us
            </a>
          </p>
        </div>
      </DialogContent>
    </Dialog>
  )
}

