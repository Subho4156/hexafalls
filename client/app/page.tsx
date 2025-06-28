"use client";

import { Button } from "@/components/ui/button";
import { ChevronRight } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { usePrivy } from "@privy-io/react-auth";

export default function LandingPage() {
  const { authenticated, login } = usePrivy();
  const router = useRouter();

  const handleRedirect = (path: string) => {
    if (authenticated) {
      router.push(path);
    } else {
      login();
    }
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-7xl">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center py-16">
        <section className="space-y-6">
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight leading-tight text-primary">
            Empowering Indian{" "}
            <span className="bg-gradient-to-r from-green-300 via-green-500 to-green-700 text-transparent bg-clip-text">
              Agriculture{" "}
            </span>
            — with Blockchain
          </h1>
          <p className="text-lg text-muted-foreground">
            Investing in the roots of India — crops, livestock, and the future
            of sustainable agriculture.
          </p>
          <div className="flex flex-wrap gap-4">
            <Button
              variant="default"
              size="lg"
              onClick={() => handleRedirect("/farm")}
              className="group"
            >
              Tokenize Your Farm
              <ChevronRight className="ml-2 transition-transform group-hover:translate-x-1" />
            </Button>
            <Button
              variant="outline"
              size="lg"
              onClick={() => handleRedirect("/explore")}
              className="group"
            >
              Invest in India
              <ChevronRight className="ml-2 transition-transform group-hover:translate-x-1" />
            </Button>
          </div>
        </section>
        <section className="flex items-center justify-center">
          <Image
            src="/farmer-1.jpg"
            alt="Farmer"
            width={680}
            height={680}
            className="w-full rounded-lg object-cover"
          />
        </section>
      </div>

      <div className="py-16 space-y-16">
        <h2 className="text-4xl font-bold text-center">
          Transforming Indian Agriculture
        </h2>

        <p className="text-center text-sm italic max-w-3xl mx-auto px-4">
          "India's agricultural sector is the backbone of the continent's
          economy, employing over 60% of the population. With vast arable land
          and a growing population, the potential for agricultural growth is
          immense."
        </p>

        <section className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center border rounded-xl p-6 shadow-md">
          <div className="relative aspect-[3/2] w-full overflow-hidden rounded-lg">
            <Image
              src="/farmer-2.jpg"
              alt="Farmer"
              width={680}
              height={680}
              className="w-full rounded-lg object-cover"
            />
          </div>
          <div className="space-y-6">
            <div className="text-center md:text-left">
              <h3 className="text-xl font-semibold text-primary">
                Challenges Facing Indian Farmers
              </h3>
              <p className="text-sm italic">Vulnerability & challenges:</p>
            </div>
            <ul className="list-disc list-inside space-y-4">
              <li>
                Limited access to capital for farm improvements and expansion
              </li>
              <li>
                Difficulty in connecting with global markets and investors
              </li>
              <li>Lack of modern technology and infrastructure</li>
              <li>Vulnerability to climate change and market fluctuations</li>
            </ul>
          </div>
        </section>

        <section className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center border rounded-xl p-6 shadow-md">
          <div className="space-y-6">
            <div className="text-center md:text-left">
              <h3 className="text-xl font-semibold text-primary">
                The Cost of Inaction
              </h3>
              <p className="text-sm italic">
                Without addressing these challenges:
              </p>
            </div>
            <ul className="list-disc list-inside space-y-4">
              <li>Indian farmers may struggle to meet growing food demands</li>
              <li>Rural poverty could increase, leading to urban migration</li>
              <li>
                India might miss out on global agricultural trade potential
              </li>
              <li>Food security and economic growth could be compromised</li>
            </ul>
          </div>
          <div className="relative aspect-[3/2] w-full overflow-hidden rounded-lg">
            <Image
              src="/farmer-3.jpg"
              alt="Farmer"
              width={680}
              height={680}
              className="w-full rounded-lg object-cover"
            />
          </div>
        </section>

        <section className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center border rounded-xl p-6 shadow-md">
          <div className="relative aspect-[3/2] w-full overflow-hidden rounded-lg">
            <Image
              src="/farmer-4.jpg"
              alt="Farmer"
              width={680}
              height={680}
              className="w-full rounded-lg object-cover"
            />
          </div>
          <div className="space-y-6">
            <div className="text-center md:text-left">
              <h3 className="text-xl font-semibold text-primary">
                Our Blockchain Solution
              </h3>
              <p className="text-sm italic">
                By tokenizing Indian agricultural assets, we can:
              </p>
            </div>
            <ul className="list-disc list-inside space-y-4">
              <li>Attract global investments to modernize Indian farms</li>
              <li>Provide farmers with access to capital for growth</li>
              <li>Create a transparent and efficient marketplace</li>
              <li>Empower smallholder farmers globally</li>
            </ul>
          </div>
        </section>
      </div>

      <div className="py-16">
        <h2 className="text-4xl font-bold text-center mb-12">How It Works</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            {
              title: "1. Tokenize",
              text: "Indian farmers tokenize their crops and livestock on our secure blockchain platform.",
            },
            {
              title: "2. Invest",
              text: "Global investors purchase tokens representing shares in Indian agricultural projects.",
            },
            {
              title: "3. Grow",
              text: "Farmers access capital to improve yields, while investors benefit from India's potential.",
            },
          ].map((step, idx) => (
            <div
              key={idx}
              className="border p-6 rounded-xl text-center shadow-md"
            >
              <h3 className="text-2xl font-semibold mb-4">{step.title}</h3>
              <p className="text-base">{step.text}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="py-16 text-center space-y-6">
        <h2 className="text-4xl font-bold">
          Join the Indian Agricultural Revolution
        </h2>
        <div className="flex flex-wrap justify-center gap-4">
          <Button
            variant="default"
            size="lg"
            onClick={login}
            className="group cursor-pointer"
          >
            Get Started
            <ChevronRight className="ml-2 transition-transform group-hover:translate-x-1" />
          </Button>
        </div>
      </div>
    </div>
  );
}
