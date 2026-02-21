import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Link from "next/link";
import { ChevronRight, Search } from "lucide-react";

export const metadata = {
  title: "Help Center - FastLink",
  description:
    "Find answers to common questions about FastLink products, shipping, returns, and more.",
};

export default function HelpPage() {
  const faqCategories = [
    {
      name: "Getting Started",
      faqs: [
        {
          question: "How do I set up my new FastLink device?",
          answer:
            "Visit our Getting Started guide or watch our setup video on YouTube. Most FastLink devices come with a quick start guide in the box. Power on your device, follow the on-screen prompts, and connect to WiFi to begin.",
        },
        {
          question: "What is included in the box?",
          answer:
            "Each FastLink device comes with the device itself, a USB-C cable, power adapter, quick start guide, and safety information. Premium models may include additional accessories.",
        },
        {
          question: "How long does battery last?",
          answer:
            "Battery life varies by model and usage. Most FastLink devices offer 12-24 hours of typical usage. Check your device specifications for exact details.",
        },
      ],
    },
    {
      name: "Orders & Shipping",
      faqs: [
        {
          question: "How long does shipping take?",
          answer:
            "Standard shipping takes 5-7 business days. Express shipping is available for 2-3 business day delivery. International orders may take 10-14 business days.",
        },
        {
          question: "Can I track my order?",
          answer:
            "Yes! You&apos;ll receive a tracking number via email once your order ships. You can use this number to track your package in real-time.",
        },
        {
          question: "What is your return policy?",
          answer:
            "We offer a 30-day money-back guarantee on all devices. If you&apos;re not satisfied, contact our support team for a return authorization.",
        },
      ],
    },
    {
      name: "Technical Support",
      faqs: [
        {
          question: "My device is not turning on. What should I do?",
          answer:
            "Try charging your device for at least 30 minutes. If it still doesn&apos;t turn on, press and hold the power button for 10 seconds. If the issue persists, contact our support team.",
        },
        {
          question: "How do I reset my device?",
          answer:
            "To perform a factory reset, go to Settings > System > Reset > Factory Reset. Note: This will erase all data on your device. Back up your data first!",
        },
        {
          question: "Is my device waterproof?",
          answer:
            "Most FastLink devices are water-resistant up to IP67 rating. Check your device specifications for exact water resistance details. Waterproof protection does not cover intentional submersion.",
        },
      ],
    },
    {
      name: "Warranty & Support",
      faqs: [
        {
          question: "How long is the warranty?",
          answer:
            "All FastLink devices come with a 1-year limited warranty covering manufacturing defects. Extended warranties are available for purchase.",
        },
        {
          question: "What does the warranty cover?",
          answer:
            "The warranty covers hardware defects, battery issues, and software problems. It does not cover damage from accidental drops, water damage, or unauthorized repairs.",
        },
        {
          question: "How do I claim a warranty?",
          answer:
            "Contact our support team with your device serial number and proof of purchase. We&apos;ll guide you through the warranty claim process.",
        },
      ],
    },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />

      <main className="flex-1">
        {/* Hero Section */}
        <section className="py-16 md:py-24 px-4 bg-gradient-to-b from-primary/10 to-background">
          <div className="container mx-auto max-w-3xl">
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6 text-balance">
              Help Center
            </h1>
            <p className="text-xl text-muted-foreground mb-8 text-balance">
              Find answers to your questions about FastLink products and
              services.
            </p>
            <div className="flex gap-3">
              <Link href="/contact">
                <Button variant="outline" className="bg-transparent">
                  Contact Support
                </Button>
              </Link>
              <Button>Browse FAQs</Button>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-12 md:py-16 px-4">
          <div className="container mx-auto max-w-4xl">
            <Tabs defaultValue="Getting Started" className="w-full">
              <TabsList className="grid w-full grid-cols-2 md:grid-cols-4 mb-8">
                {faqCategories.map((category) => (
                  <TabsTrigger key={category.name} value={category.name}>
                    {category.name}
                  </TabsTrigger>
                ))}
              </TabsList>

              {faqCategories.map((category) => (
                <TabsContent
                  key={category.name}
                  value={category.name}
                  className="space-y-4"
                >
                  {category.faqs.map((faq, index) => (
                    <Card key={index} className="p-6">
                      <h3 className="font-semibold text-foreground mb-3 text-lg">
                        {faq.question}
                      </h3>
                      <p className="text-muted-foreground leading-relaxed">
                        {faq.answer}
                      </p>
                    </Card>
                  ))}
                </TabsContent>
              ))}
            </Tabs>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-12 md:py-16 px-4 border-t border-border">
          <div className="container mx-auto max-w-2xl text-center space-y-6">
            <h2 className="text-3xl font-bold text-foreground">
              Still need help?
            </h2>
            <p className="text-muted-foreground">
              Can&apos;t find what you&apos;re looking for? Our support team is
              here to help.
            </p>
            <Link href="/contact">
              <Button size="lg">Contact Support</Button>
            </Link>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
