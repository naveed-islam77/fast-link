import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { Card } from '@/components/ui/card';

export const metadata = {
  title: 'Privacy Policy - FastLink',
  description: 'FastLink privacy policy. Learn how we collect, use, and protect your personal information.',
};

export default function PrivacyPage() {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />

      <main className="flex-1">
        {/* Hero Section */}
        <section className="py-16 md:py-24 px-4 bg-gradient-to-b from-primary/10 to-background">
          <div className="container mx-auto max-w-3xl">
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6 text-balance">
              Privacy Policy
            </h1>
            <p className="text-lg text-muted-foreground mb-4">
              Last Updated: January 2026
            </p>
            <p className="text-muted-foreground text-balance">
              At FastLink, we value your privacy and are committed to being transparent about how we collect and use your information.
            </p>
          </div>
        </section>

        {/* Content Section */}
        <section className="py-12 md:py-16 px-4">
          <div className="container mx-auto max-w-3xl space-y-8">
            {/* Introduction */}
            <Card className="p-8">
              <h2 className="text-2xl font-bold text-foreground mb-4">Introduction</h2>
              <p className="text-muted-foreground leading-relaxed">
                FastLink (&quot;we&quot;, &quot;us&quot;, &quot;our&quot;, or &quot;Company&quot;) operates the www.fastlink.com website and the FastLink mobile application (collectively, the &quot;Service&quot;).
              </p>
              <p className="text-muted-foreground leading-relaxed mt-4">
                This page informs you of our policies regarding the collection, use, and disclosure of personal data when you use our Service and the choices you have associated with that data. We use your data to provide and improve the Service. By using the Service, you agree to the collection and use of information in accordance with this policy.
              </p>
            </Card>

            {/* Information Collection */}
            <Card className="p-8">
              <h2 className="text-2xl font-bold text-foreground mb-4">Information We Collect</h2>
              <div className="space-y-4">
                <div>
                  <h3 className="font-semibold text-foreground mb-2">Personal Information</h3>
                  <p className="text-muted-foreground">
                    When you place an order or contact us, we collect personal information such as your name, email address, phone number, shipping address, and payment information.
                  </p>
                </div>
                <div>
                  <h3 className="font-semibold text-foreground mb-2">Device Information</h3>
                  <p className="text-muted-foreground">
                    We automatically collect certain information about your device when you use our Service, including IP address, browser type, operating system, and pages visited.
                  </p>
                </div>
                <div>
                  <h3 className="font-semibold text-foreground mb-2">Cookies and Similar Technologies</h3>
                  <p className="text-muted-foreground">
                    We use cookies, web beacons, and similar technologies to enhance your experience, understand how you use our Service, and deliver personalized content.
                  </p>
                </div>
              </div>
            </Card>

            {/* How We Use Information */}
            <Card className="p-8">
              <h2 className="text-2xl font-bold text-foreground mb-4">How We Use Your Information</h2>
              <div className="space-y-3 text-muted-foreground">
                <p>We use the information we collect for various purposes:</p>
                <ul className="list-disc list-inside space-y-2 ml-2">
                  <li>To provide, maintain, and improve our Service</li>
                  <li>To process transactions and send related information</li>
                  <li>To send promotional communications (with your consent)</li>
                  <li>To monitor and analyze trends and usage</li>
                  <li>To detect, prevent, and address fraud and security issues</li>
                  <li>To comply with legal obligations</li>
                </ul>
              </div>
            </Card>

            {/* Data Security */}
            <Card className="p-8">
              <h2 className="text-2xl font-bold text-foreground mb-4">Data Security</h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                The security of your data is important to us but remember that no method of transmission over the Internet or method of electronic storage is 100% secure. While we strive to use commercially acceptable means to protect your personal information, we cannot guarantee its absolute security.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                We implement appropriate technical and organizational measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction.
              </p>
            </Card>

            {/* Third Party Services */}
            <Card className="p-8">
              <h2 className="text-2xl font-bold text-foreground mb-4">Third-Party Services</h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                Our Service may contain links to third-party websites and services that are not operated by FastLink. This Privacy Policy does not apply to third-party services, and we are not responsible for their privacy practices.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                We encourage you to review the privacy policies of any third-party services before providing your personal information.
              </p>
            </Card>

            {/* User Rights */}
            <Card className="p-8">
              <h2 className="text-2xl font-bold text-foreground mb-4">Your Rights</h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                You have the right to:
              </p>
              <ul className="list-disc list-inside space-y-2 text-muted-foreground ml-2">
                <li>Access your personal information</li>
                <li>Correct inaccurate information</li>
                <li>Request deletion of your information</li>
                <li>Opt-out of marketing communications</li>
                <li>Data portability</li>
              </ul>
              <p className="text-muted-foreground leading-relaxed mt-4">
                To exercise these rights, please contact us at privacy@fastlink.com.
              </p>
            </Card>

            {/* Changes to Policy */}
            <Card className="p-8">
              <h2 className="text-2xl font-bold text-foreground mb-4">Changes to This Privacy Policy</h2>
              <p className="text-muted-foreground leading-relaxed">
                FastLink may update this Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page and updating the &quot;Last Updated&quot; date above.
              </p>
            </Card>

            {/* Contact Us */}
            <Card className="p-8 bg-primary/5 border-primary/20">
              <h2 className="text-2xl font-bold text-foreground mb-4">Contact Us</h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                If you have any questions about this Privacy Policy, please contact us at:
              </p>
              <div className="space-y-2 text-muted-foreground">
                <p><strong>Email:</strong> privacy@fastlink.com</p>
                <p><strong>Address:</strong> FastLink Privacy Team, 123 Tech Street, San Francisco, CA 94105</p>
                <p><strong>Phone:</strong> +1 (234) 567-890</p>
              </div>
            </Card>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
