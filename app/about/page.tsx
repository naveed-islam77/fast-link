import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import Link from 'next/link';

export const metadata = {
  title: 'About FastLink - Premium Mobile Devices',
  description: 'Learn about FastLink and our commitment to delivering premium mobile devices and tablets with innovative technology and exceptional value.',
};

export default function AboutPage() {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />

      <main className="flex-1">
        {/* Hero Section */}
        <section className="py-16 md:py-24 px-4 bg-gradient-to-b from-primary/10 to-background">
          <div className="container mx-auto max-w-3xl">
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6 text-balance">
              About FastLink
            </h1>
            <p className="text-xl text-muted-foreground text-balance">
              We&apos;re passionate about delivering premium mobile devices and tablets that combine innovative technology with exceptional value.
            </p>
          </div>
        </section>

        {/* Mission Section */}
        <section className="py-12 md:py-16 px-4">
          <div className="container mx-auto max-w-3xl">
            <div className="space-y-8">
              {/* Mission */}
              <Card className="p-8 border-l-4 border-l-primary">
                <h2 className="text-2xl font-bold text-foreground mb-4">Our Mission</h2>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  At FastLink, our mission is to make cutting-edge mobile technology accessible to everyone. We believe that premium devices shouldn&apos;t come with premium price tags. Through careful engineering and thoughtful design, we create smartphones and tablets that empower users to do more.
                </p>
              </Card>

              {/* Vision */}
              <Card className="p-8 border-l-4 border-l-accent">
                <h2 className="text-2xl font-bold text-foreground mb-4">Our Vision</h2>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  We envision a world where technology serves everyone equally. Our vision is to be a global leader in mobile innovation, recognized for delivering devices that are powerful, reliable, and beautifully designed—all at prices that don&apos;t compromise on quality.
                </p>
              </Card>

              {/* Values */}
              <Card className="p-8">
                <h2 className="text-2xl font-bold text-foreground mb-6">Our Values</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h3 className="font-semibold text-foreground mb-2">Innovation</h3>
                    <p className="text-muted-foreground text-sm">We continuously push the boundaries of mobile technology to deliver cutting-edge features and performance.</p>
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground mb-2">Quality</h3>
                    <p className="text-muted-foreground text-sm">Every device is rigorously tested to ensure it meets our high standards of durability and reliability.</p>
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground mb-2">Accessibility</h3>
                    <p className="text-muted-foreground text-sm">We believe technology should be available to all, regardless of budget. Premium quality at fair prices.</p>
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground mb-2">Sustainability</h3>
                    <p className="text-muted-foreground text-sm">We&apos;re committed to minimizing our environmental impact through responsible manufacturing and recycling programs.</p>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-12 md:py-16 px-4 bg-primary/5 border-y border-border">
          <div className="container mx-auto max-w-2xl text-center space-y-6">
            <h2 className="text-3xl font-bold text-foreground">Explore Our Products</h2>
            <p className="text-muted-foreground">
              Discover our range of premium smartphones and tablets designed with you in mind.
            </p>
            <Link href="/products">
              <Button size="lg">
                Browse All Products
              </Button>
            </Link>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
