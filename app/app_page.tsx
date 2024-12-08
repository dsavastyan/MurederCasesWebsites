import { SiteHeader } from "@/components/site-header"
import Image from "next/image"
import Link from "next/link"

export default function Home() {
  return (
    <>
      <SiteHeader />
      <main>
        <section className="relative h-screen">
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
              Unlocking justice
            </h1>
            <p className="text-xl md:text-2xl text-white/90">
              Analyze murder cases effectively
            </p>
          </div>
        </section>

        <section className="py-24 bg-white" id="about">
          <div className="container">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div className="space-y-6">
                <div className="text-green-600 font-medium">MURDER CASE INSIGHTS</div>
                <h2 className="text-3xl md:text-4xl font-bold">
                  Unlocking the truth behind cases
                </h2>
                <p className="text-gray-600 leading-relaxed">
                  Murder Case Analysis revolutionizes the way we understand court decisions related to murder in Russia. By utilizing advanced text mining techniques, we empower users to upload court decision files for in-depth analysis. Our platform processes these documents in the cloud, using a sophisticated large language model (LLM) to extract essential features. With our clear and concise tables, we provide valuable insights that enhance legal comprehension and promote justice in Khimki and beyond.
                </p>
                <Link 
                  href="/contact" 
                  className="inline-block text-gray-600 hover:text-gray-900 underline"
                >
                  Get in touch
                </Link>
              </div>
              <div className="relative h-[400px] md:h-[500px]">
                <Image
                  src="/legal-documents.jpg"
                  alt="Legal documents and gavel"
                  fill
                  className="object-cover rounded-lg"
                />
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  )
}

