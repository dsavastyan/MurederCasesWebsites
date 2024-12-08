import Link from "next/link"
import { Button } from "@/components/ui/button"

export function SiteHeader() {
  return (
    <header className="fixed top-0 w-full z-50 bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/60">
      <div className="container flex h-20 items-center justify-between">
        <Link href="/" className="font-bold text-xl">
          MURDER CASE ANALYSIS
        </Link>
        <nav className="flex items-center gap-6">
          <Link href="/" className="text-sm font-medium">
            Home
          </Link>
          <Link href="/about" className="text-sm font-medium">
            About
          </Link>
          <Link href="/services" className="text-sm font-medium">
            Services
          </Link>
          <Link href="/how-it-works" className="text-sm font-medium">
            How it Works
          </Link>
          <Button variant="outline" className="border-2">
            CONTACT
          </Button>
        </nav>
      </div>
    </header>
  )
}

