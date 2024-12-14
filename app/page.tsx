'use client';

import { SiteHeader } from "@/components/site-header";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { UploadSection } from "@/components/upload-section";
import { TableauEmbed } from "@/components/upload-tableau";

export default function Home() {
  return (
    <>
      <SiteHeader />
      <main>
        {/* Home Section */}
        <section className="relative h-screen" id="home">
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{
              backgroundImage: "url('/gavel-documents.jpg')",
            }}
          >
            <div className="absolute inset-0 bg-black/50" />
          </div>
          <div className="relative container h-full flex flex-col items-center justify-center text-center text-white">
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight mb-4">
              Разблокируем правосудие
            </h1>
            <p className="text-xl md:text-2xl text-white/90">
              Эффективно анализируйте уголовные дела
            </p>
          </div>
        </section>

        {/* About Section */}
        <section className="py-24 bg-white" id="about">
          <div className="container">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div className="space-y-6">
                <div className="text-green-600 font-medium">АНАЛИЗ УГОЛОВНЫХ ДЕЛ</div>
                <h2 className="text-3xl md:text-4xl font-bold">
                  Раскройте истину за делами
                </h2>
                <p className="text-gray-600 leading-relaxed">
                  Наш проект революционизирует способ анализа судебных решений по уголовным делам в России. 
                  С помощью современных текстовых технологий мы позволяем пользователям загружать файлы 
                  решений судов для глубокого анализа. Платформа обрабатывает эти документы в облаке, 
                  используя продвинутую языковую модель, чтобы извлекать ключевые данные.
                </p>
                <Link href="#contact" className="inline-block text-gray-600 hover:text-gray-900 underline">
                  Свяжитесь с нами
                </Link>
              </div>
              <div className="relative h-[400px] md:h-[500px]">
                <Image
                  src="/legal-documents.jpg"
                  alt="Юридические документы и молоток"
                  fill
                  className="object-cover rounded-lg"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Subscription Section */}
        <section className="py-24 bg-gray-50" id="subscription">
          <div className="container text-center">
            <div className="text-green-600 font-medium mb-4">ПОДПИСКА</div>
            <h2 className="text-3xl md:text-4xl font-bold mb-8">
              Выберите тариф, подходящий вам
            </h2>
            <div className="grid md:grid-cols-2 gap-8">
              <Card className="bg-white shadow-lg hover:shadow-xl transition-shadow">
                <CardContent className="p-6">
                  <h3 className="text-2xl font-bold mb-4">Премиум</h3>
                  <p className="text-gray-600 mb-4">2500₽ в месяц или 25000₽ в год (скидка).</p>
                  <ul className="text-gray-600 mb-4 text-left list-disc list-inside">
                    <li>Улучшенные аналитические инструменты</li>
                    <li>Вебинары и обучающие материалы</li>
                    <li>Приоритетная поддержка</li>
                  </ul>
                  <Button className="w-full bg-green-600 text-white">Выбрать</Button>
                </CardContent>
              </Card>

              <Card className="bg-white shadow-lg hover:shadow-xl transition-shadow">
                <CardContent className="p-6">
                  <h3 className="text-2xl font-bold mb-4">Профессионал</h3>
                  <p className="text-gray-600 mb-4">5000₽ в месяц или 50000₽ в год (скидка).</p>
                  <ul className="text-gray-600 mb-4 text-left list-disc list-inside">
                    <li>Неограниченные загрузки документов</li>
                    <li>Индивидуальные аналитические отчеты</li>
                    <li>Доступ к новым функциям</li>
                    <li>Консультации с экспертами</li>
                  </ul>
                  <Button className="w-full bg-green-600 text-white">Выбрать</Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Services Section */}
        <section className="py-24 bg-gray-50" id="services">
          <div className="container">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <div className="text-green-600 font-medium mb-4">ИНСТРУМЕНТЫ ДЛЯ АНАЛИЗА</div>
              <h2 className="text-3xl md:text-4xl font-bold">
                Получите детальный анализ
              </h2>
            </div>
            <div className="grid md:grid-cols-3 gap-8">
              <Card className="bg-white shadow-lg hover:shadow-xl transition-shadow">
                <CardContent className="p-6">
                  <h3 className="text-xl font-bold mb-2">Анализ дел</h3>
                  <p className="text-gray-600">Используйте продвинутые технологии для анализа решений судов.</p>
                </CardContent>
              </Card>
              <Card className="bg-white shadow-lg hover:shadow-xl transition-shadow">
                <CardContent className="p-6">
                  <h3 className="text-xl font-bold mb-2">Извлечение данных</h3>
                  <p className="text-gray-600">Получите ключевые данные из текстов решений.</p>
                </CardContent>
              </Card>
              <Card className="bg-white shadow-lg hover:shadow-xl transition-shadow">
                <CardContent className="p-6">
                  <h3 className="text-xl font-bold mb-2">Облачная обработка</h3>
                  <p className="text-gray-600">Обрабатывайте данные быстро и эффективно в облаке.</p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Upload Section */}
        <section className="py-24 bg-gray-50" id="upload">
          <UploadSection />
        </section>

        {/* Tableau Section */}
        <section className="py-24 bg-gray-50" id="tableau">
          <TableauEmbed />
        </section>
      </main>
    </>
  );
}
