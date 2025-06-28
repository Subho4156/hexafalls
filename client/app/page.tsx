import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";

export default function LandingPage() {
  return (
    <div className="container mx-auto py-8">
      {/* Hero Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center py-4">
        <section className="flex flex-col justify-center">
          <h1 className="text-6xl font-extrabold tracking-tighter md:text-6xl">
            Empowering African Agriculture with{" "}
            <span className="text-primary">Blockchain</span>
          </h1>
          <h2 className="text-2xl font-normal tracking-tight text-muted-foreground mt-4">
            Unlocking investment potential in African crops and livestock
          </h2>
          <div className="flex flex-row gap-4 mt-6">
            <Link href="/farm">
              <Button variant="default" size="lg">
                Tokenize Your Farm
              </Button>
            </Link>
            <Link href="/explore">
              <Button variant="secondary" size="lg">
                Invest in Africa
              </Button>
            </Link>
          </div>
        </section>
        <section className="flex items-center justify-center">
          <Image
            src="https://res.cloudinary.com/dgbreoalg/image/upload/v1729336883/florida_dxdoek.jpg"
            alt="African Agriculture"
            width={680}
            height={680}
            className="w-full rounded-lg object-cover"
          />
        </section>
      </div>

      {/* S.P.I.N. Sections */}
      <div className="mt-16">
        <h2 className="text-4xl font-bold mb-8 text-center">
          Transforming African Agriculture
        </h2>

        {/* Situation */}
        <div className="mb-8">
          <p className="text-xs italic px-8 text-center">
            {
              "'Africa's agricultural sector is the backbone of the continent's economy, employing over 60% of the population. With vast arable land and a growing population, the potential for agricultural growth is immense.'"
            }
          </p>
        </div>

        {/* Challenges */}
        <div className="mb-8">
          <section className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center py-4 border rounded-lg p-2">
            <div className="aspect-[3/2] relative overflow-hidden rounded-lg">
              <Image
                src="https://res.cloudinary.com/dgbreoalg/image/upload/v1729426259/jj-transformed_slds2s.webp"
                alt="African Agriculture Challenges"
                layout="fill"
                objectFit="cover"
              />
            </div>
            <div className="flex flex-col justify-center space-y-8 h-full py-4">
              <div className="flex flex-col justify-center items-center">
                <h3 className="text-xl font-semibold text-center text-primary">
                  Challenges Facing African Farmers
                </h3>
                <span className="text-sm text-center italic">
                  Vulnerability & challenges:
                </span>
              </div>

              <ul className="list-disc list-inside text-base space-y-8">
                <li className="pl-4">
                  Limited access to capital for farm improvements and expansion
                </li>
                <li className="pl-4">
                  Difficulty in connecting with global markets and investors
                </li>
                <li className="pl-4">
                  Lack of modern technology and infrastructure
                </li>
                <li className="pl-4">
                  Vulnerability to climate change and market fluctuations
                </li>
              </ul>
            </div>
          </section>
        </div>

        {/* Implication */}
        <div className="mb-8">
          <section className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center py-4 border rounded-lg p-2">
            <div className="flex flex-col justify-center space-y-8 h-full py-4">
              <div className="flex flex-col justify-center items-center">
                <h3 className="text-xl font-semibold text-center text-primary">
                  The Cost of Inaction
                </h3>
                <span className="text-sm text-center italic">
                  Without addressing these challenges:
                </span>
              </div>

              <ul className="list-disc list-inside text-base space-y-8">
                <li className="pl-4">
                  African farmers may struggle to meet growing food demands
                </li>
                <li className="pl-4">
                  Rural poverty could increase, leading to urban migration
                </li>
                <li className="pl-4">
                  The continent might miss out on the global agricultural trade
                  potential
                </li>
                <li className="pl-4">
                  Food security and economic growth in Africa could be
                  compromised
                </li>
              </ul>
            </div>
            <div className="aspect-[3/2] relative overflow-hidden rounded-lg">
              <Image
                src="https://res.cloudinary.com/dgbreoalg/image/upload/v1729425137/kk-transformed_fh3fwa.webp"
                alt="Cost of Inaction in African Agriculture"
                layout="fill"
                objectFit="cover"
              />
            </div>
          </section>
        </div>

        {/* Need-payoff */}
        <div className="mb-8">
          <section className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center py-4 border rounded-lg p-2">
            <div className="aspect-[3/2] relative overflow-hidden rounded-lg">
              <Image
                src="https://res.cloudinary.com/dgbreoalg/image/upload/v1729425629/corre_xzpwee.webp"
                alt="Blockchain Solution for African Agriculture"
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
                  By tokenizing African agricultural assets, we can:
                </span>
              </div>
              <ul className="list-disc list-inside text-base space-y-8">
                <li className="pl-4">
                  Attract global investments to modernize African farms
                </li>
                <li className="pl-4">
                  Provide farmers with access to capital for growth and
                  innovation
                </li>
                <li className="pl-4">
                  Create a transparent and efficient marketplace for
                  agricultural products
                </li>
                <li className="pl-4">
                  Empower smallholder farmers to compete in the global market
                </li>
              </ul>
            </div>
          </section>
        </div>
      </div>

      {/* How It Works */}
      <div className="mt-16">
        <div className="flex justify-center items-center">
          <h2 className="text-4xl font-bold mb-8">How It Works</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 ">
          <div className="text-center border p-4 rounded-md ">
            <h3 className="text-2xl font-semibold mb-4">1. Tokenize</h3>
            <p className="text-base">
              African farmers tokenize their crops and livestock on our secure
              blockchain platform.
            </p>
          </div>
          <div className="text-center border  p-4 rounded-md">
            <h3 className="text-2xl font-semibold mb-4">2. Invest</h3>
            <p className="text-base">
              Global investors purchase tokens representing shares in African
              agricultural projects.
            </p>
          </div>
          <div className="text-center border  p-4 rounded-md">
            <h3 className="text-2xl font-semibold mb-4">3. Grow</h3>
            <p className="text-base">
              Farmers access capital to improve yields, while investors benefit
              from Africa`&apos;`s agricultural potential.
            </p>
          </div>
        </div>
      </div>

      {/* Call to Action */}
      <div className="mt-16 text-center">
        <h2 className="text-4xl font-bold mb-8">
          Join the African Agricultural Revolution
        </h2>
        <div className="flex justify-center gap-4">
          <Link href="/farm">
            <Button variant="default" size="lg">
              Tokenize Your Farm
            </Button>
          </Link>
          <Link href="/explore">
            <Button variant="secondary" size="lg">
              Invest in Africa&apos;s Future
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
