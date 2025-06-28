"use client";

import { usePrivy } from "@privy-io/react-auth";
import { Button } from "@/components/ui/button";
import { ArrowUpRight } from "lucide-react";
import Image from "next/image";
import { SiteHeader } from "@/components/site-header";

export default function LandingPage() {
  const { ready, authenticated, login } = usePrivy();

  return (
    <div className="relative min-h-screen w-full">
      {/* Navbar */}
      <div className="absolute top-0 left-0 w-full z-20">
        <SiteHeader />
      </div>

      {/* Hero Section */}
      <div className="relative h-screen w-full overflow-hidden">
        <Image
          src="/farmer.jpg"
          alt="Farmer in field"
          fill
          className="object-cover opacity-60 z-0"
          style={{ objectPosition: "top" }}
        />

        {/* Hero Content */}
        <div className="relative z-10 flex flex-col items-center justify-center h-full px-4 text-center">
          <section className="bg-opacity-75 p-8 rounded-lg max-w-4xl">
            <h1 className="text-4xl md:text-6xl font-bold tracking-tighter">
              Empowering Indian Agriculture with{" "}
              <span className="text-primary">Blockchain</span>
            </h1>
            <p className="font-md font-normal text-muted-foreground mt-4">
              Unlocking investment potential in Indian farms and agritech
            </p>
            <div className="flex flex-row gap-4 mt-6 justify-center">
              <Button
                size="lg"
                className="cursor-pointer"
                onClick={login}
                disabled={!ready || authenticated}
              >
                Create Your Farm
                <ArrowUpRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </section>
        </div>
      </div>

      {/* Content Sections */}
      <div className="mt-20 px-4 md:px-12">
        {/* Section: Situation */}
        <h2 className="text-4xl font-bold mb-12 text-center">
          Transforming Indian Agriculture
        </h2>
        <div className="mb-12">
          <p className="text-xs italic text-center">
            "India's agricultural sector supports over 50% of the workforce and plays a critical role in food security. With abundant land and diverse crops, the potential for growth and innovation is vast."
          </p>
        </div>

        {/* Section: Challenges */}
        <div className="mb-12">
          <section className="grid grid-cols-1 md:grid-cols-2 gap-8 border rounded-lg p-6 items-center">
            <div className="aspect-[3/2] relative overflow-hidden rounded-lg">
              <Image
                src="https://res.cloudinary.com/dgbreoalg/image/upload/v1729426259/jj-transformed_slds2s.webp"
                alt="Indian Agriculture Challenges"
                fill
                className="object-cover"
              />
            </div>
            <div className="space-y-6">
              <h3 className="text-xl font-semibold text-primary text-center">
                Challenges Facing Indian Farmers
              </h3>
              <span className="text-sm italic text-center block">
                Key issues impacting growth:
              </span>
              <ul className="list-disc list-inside text-base space-y-3">
                <li>Inadequate access to institutional credit and insurance</li>
                <li>Supply chain inefficiencies and market disconnects</li>
                <li>Outdated technology and limited access to agritech</li>
                <li>Vulnerability to erratic monsoons and pricing instability</li>
              </ul>
            </div>
          </section>
        </div>

        {/* Section: Implication */}
        <div className="mb-12">
          <section className="grid grid-cols-1 md:grid-cols-2 gap-8 border rounded-lg p-6 items-center">
            <div className="space-y-6">
              <h3 className="text-xl font-semibold text-primary text-center">
                The Cost of Inaction
              </h3>
              <span className="text-sm italic text-center block">
                If these issues remain unresolved:
              </span>
              <ul className="list-disc list-inside text-base space-y-3">
                <li>Indian farmers may struggle to adopt sustainable practices</li>
                <li>Increasing migration from villages to cities in search of work</li>
                <li>India could lose competitiveness in agri-exports</li>
                <li>Food inflation and rural distress could deepen</li>
              </ul>
            </div>
            <div className="aspect-[3/2] relative overflow-hidden rounded-lg">
              <Image
                src="https://res.cloudinary.com/dgbreoalg/image/upload/v1729425137/kk-transformed_fh3fwa.webp"
                alt="Cost of Inaction in Indian Agriculture"
                fill
                className="object-cover"
              />
            </div>
          </section>
        </div>

        {/* Section: Solution */}
        <div className="mb-12">
          <section className="grid grid-cols-1 md:grid-cols-2 gap-8 border rounded-lg p-6 items-center">
            <div className="aspect-[3/2] relative overflow-hidden rounded-lg">
              <Image
                src="https://res.cloudinary.com/dgbreoalg/image/upload/v1729425629/corre_xzpwee.webp"
                alt="Blockchain Solution for Indian Agriculture"
                fill
                className="object-cover"
              />
            </div>
            <div className="space-y-6">
              <h3 className="text-xl font-semibold text-primary text-center">
                Our Blockchain Solution
              </h3>
              <span className="text-sm italic text-center block">
                Tokenizing India's agricultural potential:
              </span>
              <ul className="list-disc list-inside text-base space-y-3">
                <li>Bring global investments to Indian farmlands and agri-projects</li>
                <li>Enable micro-financing for farmers via tokenized assets</li>
                <li>Ensure transparency and traceability in agri-supply chains</li>
                <li>Promote sustainable practices through data-driven insights</li>
              </ul>
            </div>
          </section>
        </div>

        {/* Section: How It Works */}
        <div className="mt-20">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold">How It Works</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center border p-6 rounded-md">
              <h3 className="text-2xl font-semibold mb-4">1. Tokenize</h3>
              <p className="text-base">
                Indian farmers tokenize their assets on our secure blockchain platform.
              </p>
            </div>
            <div className="text-center border p-6 rounded-md">
              <h3 className="text-2xl font-semibold mb-4">2. Invest</h3>
              <p className="text-base">
                Indian and global investors purchase tokens to support agricultural growth.
              </p>
            </div>
            <div className="text-center border p-6 rounded-md">
              <h3 className="text-2xl font-semibold mb-4">3. Grow</h3>
              <p className="text-base">
                Farmers access funding to boost productivity, while investors gain from agri-prosperity.
              </p>
            </div>
          </div>
        </div>

        {/* Final CTA */}
        <div className="mt-20 text-center">
          <h2 className="text-4xl font-bold mb-8">
            Join the Indian Agricultural Revolution
          </h2>
          {/* You can uncomment this if you later want additional call-to-action buttons */}
          {/* <div className="flex justify-center gap-4">
            <Link href="/farm">
              <RainbowButton variant="default" size="lg">
                Tokenize Your Farm
              </RainbowButton>
            </Link>
            <Link href="/explore">
              <RainbowButton variant="outline" size="lg">
                Invest in India's Future
              </RainbowButton>
            </Link>
          </div> */}
        </div>
      </div>
    </div>
  );
}
