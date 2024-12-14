'use client'

import Link from "next/link"; 
import { SiteHeader } from "@/components/site-header"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Image from "next/image"
import Link from "next/link"
import { UploadSection } from "@/components/upload-section"
import { TableauEmbed } from "@/components/upload-tableau" // Named import

export const maxDuration = 60

export default function Home() {
  return (
    <>
      <SiteHeader />
      <main>
        {/* Главная секция */}
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
              Раскрывая правосудие
            </h1>
            <p className="text-xl md:text-2xl text-white/90">
              Эффективно анализируйте дела об убийствах
            </p>
          </div>
        </section>

        {/* Секция "О проекте" */}
        <section className="py-24 bg-white" id="about">
          <div className="container">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div className="space-y-6">
                <div className="text-green-600 font-medium">ОБЗОР ДЕЛ ОБ УБИЙСТВАХ</div>
                <h2 className="text-3xl md:text-4xl font-bold">
                  Раскрывая правду о делах
                </h2>
                <p className="text-gray-600 leading-relaxed">
                  Murder Case Analysis меняет представление о том, как мы понимаем судебные решения по делам об убийствах в России. Используя передовые методы текстового анализа, платформа позволяет загружать файлы судебных решений для углубленного изучения. Документы обрабатываются в облаке с применением сложной языковой модели (LLM) для извлечения ключевых признаков. Четкие и понятные таблицы предоставляют ценные инсайты, повышающие юридическую осведомленность и способствующие справедливости в России.
                </p>
                <Link 
                  href="#contact" 
                  className="inline-block text-gray-600 hover:text-gray-900 underline"
                >
                  Связаться с нами
                </Link>
              </div>
              <div className="relative h-[400px] md:h-[500px]">
                <Image
                  src="/legal-documents.jpg"
                  alt="Юридические документы и молоток судьи"
                  fill
                  className="object-cover rounded-lg"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Секция "Услуги" */}
        <section className="py-24 bg-gray-50" id="services">
          <div className="container">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <div className="text-green-600 font-medium mb-4">ГЛУБОКИЙ АНАЛИЗ ДЕЛ</div>
              <h2 className="text-3xl md:text-4xl font-bold">
                Получайте инсайты из дел об убийствах
              </h2>
            </div>
            
            <div className="grid md:grid-cols-3 gap-8">
              <Card className="bg-white shadow-lg hover:shadow-xl transition-shadow">
                <CardContent className="p-0">
                  <Image
                    src="/case-analysis.jpg"
                    alt="Сетка юридических документов"
                    width={400}
                    height={300}
                    className="w-full h-48 object-cover"
                  />
                  <div className="p-6">
                    <h3 className="text-xl font-bold mb-2 flex items-center">
                      Анализ дел об убийствах
                      <span className="ml-2">›</span>
                    </h3>
                    <p className="text-gray-600">
                      Используйте передовой текстовый анализ для исследования судебных решений по убийствам.
                    </p>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-white shadow-lg hover:shadow-xl transition-shadow">
                <CardContent className="p-0">
                  <Image
                    src="/feature-extraction.jpg"
                    alt="Коллаж изображений молотков судьи"
                    width={400}
                    height={300}
                    className="w-full h-48 object-cover"
                  />
                  <div className="p-6">
                    <h3 className="text-xl font-bold mb-2 flex items-center">
                      Извлечение признаков
                      <span className="ml-2">›</span>
                    </h3>
                    <p className="text-gray-600">
                      Извлекайте ключевые признаки из судебных решений по убийствам.
                    </p>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-white shadow-lg hover:shadow-xl transition-shadow">
                <CardContent className="p-0">
                  <Image
                    src="/cloud-processing.jpg"
                    alt="Облако над столом с книгами"
                    width={400}
                    height={300}
                    className="w-full h-48 object-cover"
                  />
                  <div className="p-6">
                    <h3 className="text-xl font-bold mb-2 flex items-center">
                      Облачная обработка
                      <span className="ml-2">›</span>
                    </h3>
                    <p className="text-gray-600">
                      Используйте облачные технологии для эффективной обработки данных.
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Секция "Как это работает" */}
        <section className="py-24 bg-white" id="how-it-works">
          <div className="container">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <div className="text-green-600 font-medium mb-4">ПРОЦЕСС</div>
              <h2 className="text-3xl md:text-4xl font-bold">
                Как это работает
              </h2>
            </div>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="w-16 h-16 bg-green-600 text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">1</div>
                <h3 className="text-xl font-bold mb-2">Загрузите документы</h3>
                <p className="text-gray-600">Отправьте судебные решения через нашу защищенную платформу.</p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-green-600 text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">2</div>
                <h3 className="text-xl font-bold mb-2">Анализ с помощью ИИ</h3>
                <p className="text-gray-600">Наш продвинутый ИИ обрабатывает и анализирует загруженные документы.</p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-green-600 text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">3</div>
                <h3 className="text-xl font-bold mb-2">Получите инсайты</h3>
                <p className="text-gray-600">Получите полный анализ и инсайты по вашему делу.</p>
              </div>
            </div>
          </div>
        </section>

        {/* Секция загрузки документов */}
        <section className="py-24 bg-gray-50" id="upload">
          <UploadSection />
        </section>
            
        {/* Секция Tableau */}
        <section className="py-24 bg-gray-50" id="tableau">
          <TableauEmbed />
        </section>

        {/* Секция контактов */}
        <section className="py-24 bg-white" id="contact">
          <div className="container text-center">
            <div className="text-green-600 font-medium mb-4">СВЯЖИТЕСЬ С НАМИ</div>
            <h2 className="text-3xl md:text-4xl font-bold mb-8">
              Мы готовы помочь вам с вашими вопросами.
            </h2>
            <Button size="lg" className="bg-green-600 hover:bg-green-700 text-white">
              Связаться с нами
            </Button>
          </div>
        </section>
      </main>
    </>
  )
}
