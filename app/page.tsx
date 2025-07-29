import React from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { 
  Phone,
  HeartHandshake,
  Quote,
  MessageCircle,
  UserRound,
  Scale,
  Heart,
  PhoneCall,
  Shield,
  UserCog,
  BadgeHelp,
  ShieldCheck,
  UserPlus,
  HandHeart,
  UserCircle2,
  UserCircle,
  Users
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";

const quotes = [
  {
    text: "Every child deserves to feel safe, loved, and protected.",
    author: "Child Rights Advocate"
  },
  {
    text: "Protecting children is not a choice, it's a responsibility.",
    author: "UNICEF"
  },
  {
    text: "The future of every community lies in the safety of its children.",
    author: "Child Protection Expert"
  }
];

const processSteps = [
  {
    title: "Report & Support",
    icon: MessageCircle,
    description: "Immediate response and support through CHILDLINE (1098)"
  },
  {
    title: "Child-Friendly Process",
    icon: UserRound,
    description: "Special officers and comfortable environment for the child"
  },
  {
    title: "Legal Protection",
    icon: Scale,
    description: "Swift legal action and child's rights protection"
  },
  {
    title: "Rehabilitation & Care",
    icon: Heart,
    description: "Continuous support and rehabilitation services"
  }
];

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-purple-100 via-pink-100 to-purple-100">
      {/* Hero Section */}
      <section className="relative py-20 px-4">
        <div className="max-w-6xl mx-auto text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-purple-600 to-pink-600 text-transparent bg-clip-text">
            Protecting Every Child's Right to Safety
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Understanding POCSO Act and creating a safer environment for our children
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Button size="lg" className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white">
              Learn About POCSO
            </Button>
            <Link href="/report">
              <Button size="lg" variant="outline" className="border-2 border-purple-400 hover:bg-gradient-to-r hover:from-purple-600 hover:to-pink-600 hover:text-white transition-all duration-300">
                Report an Incident
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* POCSO Response Process */}
      <section className="py-16 px-4 bg-white/50 backdrop-blur-sm">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12 bg-gradient-to-r from-purple-600 to-pink-600 text-transparent bg-clip-text">
            How POCSO Responds
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {processSteps.map((step, index) => (
              <Card key={index} className="p-6 bg-white/70 backdrop-blur-sm hover:shadow-lg transition-all duration-300 group">
                <div className="mb-6 flex justify-center">
                  <step.icon className="w-12 h-12 text-purple-600" />
                </div>
                <div className="flex items-center gap-3 mb-3">
                  <h3 className="text-xl font-semibold">{step.title}</h3>
                </div>
                <p className="text-muted-foreground">{step.description}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Story Illustration Section */}
      <section className="py-20 px-4 bg-white/50 backdrop-blur-sm">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12 bg-gradient-to-r from-purple-600 to-pink-600 text-transparent bg-clip-text">
            Riya's Story: Finding Strength
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Panel 1: The Call */}
            <Card className="p-6 bg-white/70 backdrop-blur-sm hover:shadow-lg transition-all duration-300">
              <div className="h-64 mb-4 relative flex items-center justify-center">
                <Image
                  src="https://img.freepik.com/free-vector/international-day-elimination-violence-against-women-background-with-female_23-2148702310.jpg?t=st=1738561971~exp=1738565571~hmac=b5e5244480b8af4814905a38865d3a41aca1231e4b3874593a6a2f7a8c29ae52&w=740"
                  alt="A girl making a brave call"
                  width={200}
                  height={200}
                  className="transform transition-transform duration-300 hover:scale-105"
                />
                <div className="absolute bottom-4 right-4 bg-white rounded-full p-2 shadow-lg">
                  <p className="text-2xl font-bold text-pink-600">1098</p>
                </div>
              </div>
              <h3 className="text-xl font-semibold mb-2 text-purple-600">Chapter 1: The Brave Call</h3>
              <p className="text-muted-foreground">With trembling hands but determined heart, Riya dials 1098</p>
            </Card>

            {/* Panel 2: The Support */}
            <Card className="p-6 bg-white/70 backdrop-blur-sm hover:shadow-lg transition-all duration-300">
              <div className="h-64 mb-4 relative flex items-center justify-center">
                <Image
                  src="https://img.freepik.com/free-vector/shadow-personality-concept-illustration_114360-21241.jpg?ga=GA1.1.993837949.1726666215&semt=ais_hybrid"
                  alt="Support and care from professionals"
                  width={200}
                  height={200}
                  className="transform transition-transform duration-300 hover:scale-105"
                />
                <div className="absolute bottom-4 right-4">
                  <Shield className="w-8 h-8 text-purple-600" />
                </div>
              </div>
              <h3 className="text-xl font-semibold mb-2 text-purple-600">Chapter 2: A Safe Haven</h3>
              <p className="text-muted-foreground">Caring professionals create a protective shield around Riya</p>
            </Card>

            {/* Panel 3: The Resolution */}
            <Card className="p-6 bg-white/70 backdrop-blur-sm hover:shadow-lg transition-all duration-300">
              <div className="h-64 mb-4 relative flex items-center justify-center">
                <Image
                  src="https://img.freepik.com/free-vector/jiu-jitsu-concept-illustration_114360-6355.jpg?t=st=1738563166~exp=1738566766~hmac=c8fdfb09929e584000b0f71fbfb87f98d80ee91ec7190d09a4d1721d0f2b76ab&w=740"
                  alt="A confident and strong woman"
                  width={200}
                  height={200}
                  className="transform transition-transform duration-300 hover:scale-105"
                />
                <div className="absolute bottom-4 right-4">
                  <Heart className="w-8 h-8 text-pink-600" />
                </div>
              </div>
              <h3 className="text-xl font-semibold mb-2 text-purple-600">Chapter 3: Rising Strong</h3>
              <p className="text-muted-foreground">Protected by law, Riya stands tall with newfound strength</p>
            </Card>
          </div>

          <div className="mt-12 text-center">
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Every story of courage deserves support. POCSO ensures that brave children like Riya find their strength 
              and voice through immediate help and protection.
            </p>
          </div>
        </div>
      </section>

      {/* Quotes Section */}
      <section className="py-16 px-4 relative overflow-hidden">
        <div className="max-w-4xl mx-auto">
          <div className="grid gap-6">
            {quotes.map((quote, index) => (
              <Card key={index} className="p-6 bg-white/70 backdrop-blur-sm hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1">
                <div className="flex gap-4">
                  <Quote className="w-8 h-8 text-purple-600 flex-shrink-0" />
                  <div>
                    <p className="text-lg font-medium italic text-gray-800 mb-2">{quote.text}</p>
                    <p className="text-sm text-muted-foreground">— {quote.author}</p>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Emergency Contact */}
      <section className="py-16 px-4 bg-gradient-to-r from-purple-100 to-pink-100">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-8 bg-gradient-to-r from-purple-600 to-pink-600 text-transparent bg-clip-text">Emergency Contacts</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <Card className="p-6 flex items-center justify-center gap-4 bg-white/70 backdrop-blur-sm hover:shadow-lg transition-all duration-300">
              <Phone className="w-8 h-8 text-purple-600" />
              <div className="text-left">
                <h3 className="font-semibold">CHILDLINE</h3>
                <p className="text-2xl font-bold text-pink-600">1098</p>
              </div>
            </Card>
            <Card className="p-6 flex items-center justify-center gap-4 bg-white/70 backdrop-blur-sm hover:shadow-lg transition-all duration-300">
              <Phone className="w-8 h-8 text-purple-600" />
              <div className="text-left">
                <h3 className="font-semibold">Women Helpline</h3>
                <p className="text-2xl font-bold text-pink-600">1091</p>
              </div>
            </Card>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-white/50 backdrop-blur-sm py-8 px-4">
        <div className="max-w-6xl mx-auto text-center">
          <p className="text-muted-foreground">
            © {new Date().getFullYear()} POCSO Awareness Initiative. All rights reserved.
          </p>
          <div className="mt-4">
            <Link href="/privacy" className="text-purple-600 hover:text-pink-600 hover:underline mx-2 transition-colors duration-300">
              Privacy Policy
            </Link>
            <Link href="/contact" className="text-purple-600 hover:text-pink-600 hover:underline mx-2 transition-colors duration-300">
              Contact Us
            </Link>
          </div>
        </div>
      </footer>
    </main>
  );
}