import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"

export default function Contact() {
  return (
    <section id="contact" className="w-full py-12 md:py-24 lg:py-32">
      <div className="container px-4 md:px-6">
        <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl text-center mb-12">Get in Touch</h2>
        <div className="max-w-2xl mx-auto">
          <form className="space-y-4">
            <Input type="text" placeholder="Name" required />
            <Input type="email" placeholder="Email" required />
            <Textarea placeholder="Message" required />
            <Button type="submit" className="w-full">Send Message</Button>
          </form>
          <div className="mt-8 text-center">
            <p className="mb-2">Email: john.doe@example.com</p>
            <p className="mb-2">Location: East Africa (UTC+3)</p>
            <div className="flex justify-center space-x-4 mt-4">
              <Button variant="outline" asChild>
                <a href="https://linkedin.com/in/johndoe" target="_blank" rel="noopener noreferrer">LinkedIn</a>
              </Button>
              <Button variant="outline" asChild>
                <a href="https://github.com/johndoe" target="_blank" rel="noopener noreferrer">GitHub</a>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

