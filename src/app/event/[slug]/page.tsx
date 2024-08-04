import H1 from "@/components/h1";
import { getEvent } from "@/lib/server-utils";
// import { sleep } from "@/lib/utils";
import { Metadata } from "next";
import Image from "next/image";

type Props = {
  params: {
    slug: string;
  };
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = params;

  const event = await getEvent(slug);

  return {
    title: event.name,
  };
}

export async function generateStaticParams() {
  return [{ slug: "dj-practice-session" }, { slug: "comedy-extravaganza" }];
}

async function EventPage({ params }: Props) {
  const { slug } = params;

  // await sleep(2000);

  const event = await getEvent(slug);

  return (
    <>
      <section className="relative overflow-hidden flex justify-center items-center py-14 md:py-20">
        <Image
          src={event.imageUrl}
          alt="Event Background Image"
          fill
          sizes="(max-width: 1280px) 100vw, 1280px"
          quality={50}
          priority
          className="object-cover blur-3xl z-0"
        />

        <div className="relative z-1 flex flex-col lg:flex-row gap-6 lg:gap-16">
          <Image
            src={event.imageUrl}
            alt={event.name}
            width={300}
            height={201}
            className="rounded-xl border-2 border-white/50 object-cover"
          />

          <div className="flex flex-col">
            <p className="text-white/75">
              {new Date("2030-10-12T00:00:00.000Z").toLocaleDateString(
                undefined,
                {
                  weekday: "long",
                  day: "2-digit",
                  month: "long",
                  // year: "numeric",
                }
              )}
            </p>

            <H1 className="mb-2 mt-1 whitespace-nowrap lg:text-5xl">
              {event.name}
            </H1>

            <p className="whitespace-nowrap text-xl text-white/75">
              Organised by <span className="italic">{event.organizerName}</span>
            </p>

            <button className="bg-white/20 text-lg capitalize py-2 w-[95vw] sm:w-full rounded-md border-white/10 border-2 mt-5 lg:mt-auto state-effects">
              Get tickets
            </button>
          </div>
        </div>
      </section>

      <div className="text-center px-5 py-16 min-h-[75vh]">
        <Section>
          <SectionHeading>About this event</SectionHeading>
          <SectionContent>{event.description}</SectionContent>
        </Section>

        <Section>
          <SectionHeading>Location</SectionHeading>
          <SectionContent>{event.location}</SectionContent>
        </Section>
      </div>
    </>
  );
}

export default EventPage;

function Section({ children }: { children: React.ReactNode }) {
  return <section className="mb-12">{children}</section>;
}

function SectionHeading({ children }: { children: React.ReactNode }) {
  return <h2 className="text-2xl mb-8">{children}</h2>;
}

function SectionContent({ children }: { children: React.ReactNode }) {
  return (
    <p className="text-lg leading-8 text-white/75 max-w-4xl mx-auto">
      {children}
    </p>
  );
}
