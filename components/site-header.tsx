import Link from "next/link"
import { Button } from "@/components/ui/button"

export function SiteHeader() {
  return (
    <header className="fixed top-0 w-full z-50 bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/60">
      <div className="container flex h-20 items-center justify-between">
        <Link href="/" className="font-bold text-xl">
          АНАЛИЗ СУДЕБНЫХ ДЕЛ ОБ УБИЙСТВЕ
        </Link>
        <nav className="flex items-center gap-6">
          <Link href="#home" className="text-sm font-medium">
            Домой
          </Link>
          <Link href="#about" className="text-sm font-medium">
            О сайте
          </Link>
          <Link href="#services" className="text-sm font-medium">
            Услуги
          </Link>
          <Link href="#how-it-works" className="text-sm font-medium">
            Как это работает
          </Link>
          <Link href="#upload" className="text-sm font-medium">
            Загрузить дело
          </Link>
          <Button variant="outline" className="border-2">
            КОНТАКТЫ
          </Button>
        </nav>
      </div>
    </header>
  )
}
