// import Image from 'next/image'
"use client";
import { Button } from "@/components/ui/button"
import { CldImage } from 'next-cloudinary'

export default function Hero() {
  return (
    <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48">
      <div className="container px-4 md:px-6">
        <div className="grid gap-6 lg:grid-cols-[1fr_400px] lg:gap-12 xl:grid-cols-[1fr_600px]">
          <div className="flex flex-col justify-center space-y-4">
            <div className="space-y-2">
              <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none">
                Nardos Tilahun
              </h1>
              <p className="max-w-[600px] text-gray-500 md:text-xl dark:text-gray-400">
                Full Stack Developer specializing in MERN stack. Building innovative web solutions with a focus on user experience and performance.
              </p>
            </div>
            <div className="flex flex-col gap-2 min-[400px]:flex-row">
              <Button size="lg" asChild>
                <a href="#projects">View Projects</a>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <a href="#contact">Contact Me</a>
              </Button>
            </div>
          </div>
          <div className="flex items-center justify-center">
          <CldImage
              alt="Nardos"
              src="rjxusgiyd1nqqdygitai" // Use this sample image or upload your own via the Media Explorer
              width="300" // Transform the image: auto-crop to square aspect_ratio
              height="300"
              className="aspect-square rounded-full object-cover border-2 border-gray-200"
              
            />
            {/* <Image
              src="/placeholder.svg?height=300&width=300"
              alt="Nardos"
              width={300}
              height={300}
              className="aspect-square rounded-full object-cover border-2 border-gray-200"
              priority
            /> */}
          </div>
        </div>
      </div>
    </section>
  )
}

