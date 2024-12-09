'use client'

import { SiteHeader } from "@/components/site-header"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Image from "next/image"
import Link from "next/link"
import { UploadSection } from "@/components/upload-section"
import { TableauEmbed } from "@/components/upload-tableau" // Named import

export default function Page() {
  return (
    <>
      <section className="py-24 bg-gray-50" id="tableau">
        <TableauEmbed />
      </section>
      
export default function Home() {
  return (
    <>
      <SiteHeader />
      <main>
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
                  href="#contact" 
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

        <section className="py-24 bg-gray-50" id="services">
          <div className="container">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <div className="text-green-600 font-medium mb-4">IN-DEPTH CASE ANALYSIS</div>
              <h2 className="text-3xl md:text-4xl font-bold">
                Unlock insights from murder cases
              </h2>
            </div>
            
            <div className="grid md:grid-cols-3 gap-8">
              <Card className="bg-white shadow-lg hover:shadow-xl transition-shadow">
                <CardContent className="p-0">
                  <Image
                    src="/case-analysis.jpg"
                    alt="Grid of legal documents"
                    width={400}
                    height={300}
                    className="w-full h-48 object-cover"
                  />
                  <div className="p-6">
                    <h3 className="text-xl font-bold mb-2 flex items-center">
                      Murder Case Analysis
                      <span className="ml-2">›</span>
                    </h3>
                    <p className="text-gray-600">
                      Utilize advanced text mining to analyze murder case court decisions.
                    </p>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-white shadow-lg hover:shadow-xl transition-shadow">
                <CardContent className="p-0">
                  <Image
                    src="/feature-extraction.jpg"
                    alt="Collage of gavel images"
                    width={400}
                    height={300}
                    className="w-full h-48 object-cover"
                  />
                  <div className="p-6">
                    <h3 className="text-xl font-bold mb-2 flex items-center">
                      Feature extraction
                      <span className="ml-2">›</span>
                    </h3>
                    <p className="text-gray-600">
                      Extract essential features from murder case court decisions.
                    </p>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-white shadow-lg hover:shadow-xl transition-shadow">
                <CardContent className="p-0">
                  <Image
                    src="/cloud-processing.jpg"
                    alt="Cloud above desk with books"
                    width={400}
                    height={300}
                    className="w-full h-48 object-cover"
                  />
                  <div className="p-6">
                    <h3 className="text-xl font-bold mb-2 flex items-center">
                      Cloud processing
                      <span className="ml-2">›</span>
                    </h3>
                    <p className="text-gray-600">
                      Harness cloud technology for efficient data processing.
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        <section className="py-24 bg-white" id="how-it-works">
          <div className="container">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <div className="text-green-600 font-medium mb-4">PROCESS</div>
              <h2 className="text-3xl md:text-4xl font-bold">
                How It Works
              </h2>
            </div>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="w-16 h-16 bg-green-600 text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">1</div>
                <h3 className="text-xl font-bold mb-2">Upload Documents</h3>
                <p className="text-gray-600">Submit your court decision documents through our secure platform.</p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-green-600 text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">2</div>
                <h3 className="text-xl font-bold mb-2">AI Analysis</h3>
                <p className="text-gray-600">Our advanced AI processes and analyzes the uploaded documents.</p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-green-600 text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">3</div>
                <h3 className="text-xl font-bold mb-2">Receive Insights</h3>
                <p className="text-gray-600">Get comprehensive insights and analysis results for your case.</p>
              </div>
            </div>
          </div>
        </section>

        <section className="py-24 bg-gray-50" id="upload">
          <UploadSection />
        </section>

          <section className="py-24 bg-white" id="contact">
        <div className="container text-center">
          <div className="text-green-600 font-medium mb-4">GET IN TOUCH</div>
          <h2 className="text-3xl md:text-4xl font-bold mb-8">
            We are here to assist you with your inquiries.
          </h2>
          <Button size="lg" className="bg-green-600 hover:bg-green-700 text-white">
            Contact Us
          </Button>
        </div>
      </section>

        <section className="py-24 bg-white" id="contact">
          <div className="container text-center">
            <div className="text-green-600 font-medium mb-4">GET IN TOUCH</div>
            <h2 className="text-3xl md:text-4xl font-bold mb-8">
              We are here to assist you with your inquiries.
            </h2>
            <Button size="lg" className="bg-green-600 hover:bg-green-700 text-white">
              Contact Us
            </Button>
          </div>
        </section>
      </main>
    </>
  )
}
