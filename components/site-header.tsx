export function SiteHeader() {
  return (
    <header className="fixed top-0 w-full z-50 bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/60">
      <div className="container flex h-20 items-center justify-between">
        <Link href="/" className="font-bold text-xl">
          АНАЛИЗ УГОЛОВНЫХ ДЕЛ
        </Link>
        <nav className="flex items-center gap-6">
          <Link href="#home" className="text-sm font-medium">
            Главная
          </Link>
          <Link href="#about" className="text-sm font-medium">
            О нас
          </Link>
          <Link href="#services" className="text-sm font-medium">
            Услуги
          </Link>
          <Link href="#how-it-works" className="text-sm font-medium">
            Как работает
          </Link>
          <Link href="#upload" className="text-sm font-medium">
            Загрузить
          </Link>
          <Link href="#subscription" className="text-sm font-medium">
            Подписка
          </Link>
          <Button variant="outline" className="border-2">
            Контакты
          </Button>
        </nav>
      </div>
    </header>
  );
}
