import { RainbowButton } from "@/components/magicui/rainbow-button";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";

export default function LandingPage() {
  return (
    <div className="container mx-auto px-4 md:px-8 py-12">
      {/* Hero Section */}
      <div className="min-h-screen flex items-center justify-center px-4">
        <section className="flex flex-col justify-center">
          <h1 className="text-4xl md:text-6xl font-extrabold tracking-tighter text-center md:text-left">
            Empowering Indian Agriculture with{" "}
            <span className="text-primary">Blockchain</span>
          </h1>
          <h2 className="text-2xl font-normal tracking-tight text-muted-foreground mt-4 text-center">
            Unlocking investment potential in Indian farms and agritech
          </h2>
          <div className="flex flex-row gap-4 mt-6 justify-center">
            <Link href="/farm">
            <RainbowButton variant="default" size="lg">
              Tokenize Your Farm
            </RainbowButton>
            </Link>
            <Link href="/explore">
            <RainbowButton variant="outline" size="lg">
              Invest in India&apos;s Future
            </RainbowButton>
            </Link>
          </div>
        </section>
      </div>

      {/* S.P.I.N. Sections */}
      <div className="mt-20">
        <h2 className="text-4xl font-bold mb-12 text-center">
          Transforming Indian Agriculture
        </h2>

        {/* Situation */}
        <div className="mb-12">
          <p className="text-xs italic px-4 md:px-12 text-center">
            'India&apos;s agricultural sector supports over 50% of the workforce
            and plays a critical role in food security. With abundant land and
            diverse crops, the potential for growth and innovation is vast.'
          </p>
        </div>

        {/* Challenges */}
        <div className="mb-12">
          <section className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center border rounded-lg p-6">
            <div className="aspect-[3/2] relative overflow-hidden rounded-lg">
              <Image
                src="https://res.cloudinary.com/dgbreoalg/image/upload/v1729426259/jj-transformed_slds2s.webp"
                alt="Indian Agriculture Challenges"
                layout="fill"
                objectFit="cover"
              />
            </div>
            <div className="flex flex-col justify-center space-y-8 h-full py-4">
              <div className="flex flex-col justify-center items-center">
                <h3 className="text-xl font-semibold text-center text-primary">
                  Challenges Facing Indian Farmers
                </h3>
                <span className="text-sm text-center italic">
                  Key issues impacting growth:
                </span>
              </div>
              <ul className="list-disc list-inside text-base space-y-8">
                <li className="pl-4">
                  Inadequate access to institutional credit and insurance
                </li>
                <li className="pl-4">
                  Supply chain inefficiencies and market disconnects
                </li>
                <li className="pl-4">
                  Outdated technology and limited access to agritech
                </li>
                <li className="pl-4">
                  Vulnerability to erratic monsoons and pricing instability
                </li>
              </ul>
            </div>
          </section>
        </div>

        {/* Implication */}
        <div className="mb-12">
          <section className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center border rounded-lg p-6">
            <div className="flex flex-col justify-center space-y-8 h-full py-4">
              <div className="flex flex-col justify-center items-center">
                <h3 className="text-xl font-semibold text-center text-primary">
                  The Cost of Inaction
                </h3>
                <span className="text-sm text-center italic">
                  If these issues remain unresolved:
                </span>
              </div>
              <ul className="list-disc list-inside text-base space-y-8">
                <li className="pl-4">
                  Indian farmers may struggle to adopt sustainable practices
                </li>
                <li className="pl-4">
                  Increasing migration from villages to cities in search of work
                </li>
                <li className="pl-4">
                  India could lose competitiveness in agri-exports
                </li>
                <li className="pl-4">
                  Food inflation and rural distress could deepen
                </li>
              </ul>
            </div>
            <div className="aspect-[3/2] relative overflow-hidden rounded-lg">
              <Image
                src="https://res.cloudinary.com/dgbreoalg/image/upload/v1729425137/kk-transformed_fh3fwa.webp"
                alt="Cost of Inaction in Indian Agriculture"
                layout="fill"
                objectFit="cover"
              />
            </div>
          </section>
        </div>

        {/* Need-payoff */}
        <div className="mb-12">
          <section className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center border rounded-lg p-6">
            <div className="aspect-[3/2] relative overflow-hidden rounded-lg">
              <Image
                src="https://res.cloudinary.com/dgbreoalg/image/upload/v1729425629/corre_xzpwee.webp"
                alt="Blockchain Solution for Indian Agriculture"
                layout="fill"
                objectFit="cover"
              />
            </div>
            <div className="flex flex-col justify-center space-y-8 h-full py-4">
              <div className="flex flex-col justify-center items-center">
                <h3 className="text-xl font-semibold text-center text-primary">
                  Our Blockchain Solution
                </h3>
                <span className="text-sm text-center italic">
                  Tokenizing India&apos;s agricultural potential:
                </span>
              </div>
              <ul className="list-disc list-inside text-base space-y-8">
                <li className="pl-4">
                  Bring global investments to Indian farmlands and agri-projects
                </li>
                <li className="pl-4">
                  Enable micro-financing for farmers via tokenized assets
                </li>
                <li className="pl-4">
                  Ensure transparency and traceability in agri-supply chains
                </li>
                <li className="pl-4">
                  Promote sustainable practices through data-driven insights
                </li>
              </ul>
            </div>
          </section>
        </div>
      </div>

      {/* How It Works */}
      <div className="mt-20">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold">How It Works</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="text-center border p-6 rounded-md">
            <h3 className="text-2xl font-semibold mb-4">1. Tokenize</h3>
            <p className="text-base">
              Indian farmers tokenize their assets on our secure blockchain
              platform.
            </p>
          </div>
          <div className="text-center border p-6 rounded-md">
            <h3 className="text-2xl font-semibold mb-4">2. Invest</h3>
            <p className="text-base">
              Indian and global investors purchase tokens to support
              agricultural growth.
            </p>
          </div>
          <div className="text-center border p-6 rounded-md">
            <h3 className="text-2xl font-semibold mb-4">3. Grow</h3>
            <p className="text-base">
              Farmers access funding to boost productivity, while investors gain
              from agri-prosperity.
            </p>
          </div>
        </div>
      </div>

      {/* Call to Action */}
      <div className="mt-20 text-center">
        <h2 className="text-4xl font-bold mb-8">
          Join the Indian Agricultural Revolution
        </h2>
        <div className="flex justify-center gap-4">
          <Link href="/farm">
            <RainbowButton variant="default" size="lg">
              Tokenize Your Farm
            </RainbowButton>
          </Link>
          <Link href="/explore">
            <RainbowButton variant="outline" size="lg">
              Invest in India&apos;s Future
            </RainbowButton>
          </Link>
        </div>
      </div>
    </div>
  );
}
