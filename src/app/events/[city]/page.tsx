import EventsData from "@/components/events-data";
import H1 from "@/components/h1";
import { Suspense } from "react";
import Loading from "./loading";
import { Metadata } from "next";
import { capitalizeWord } from "@/lib/utils";
import { z } from "zod";

type Props = {
  params: {
    city: string;
  };
  searchParams: { [key: string]: string | string[] | undefined };
};

export function generateMetadata({ params }: Props): Metadata {
  return {
    title:
      params.city === "all"
        ? "All Events"
        : `Events in ${capitalizeWord(params.city)}`,
  };
}

const pageNumberSchema = z.coerce.number().int().positive().optional();

async function EventsPage({ params, searchParams }: Props) {
  const { city } = params;
  // const page = searchParams.page || 1;
  const parsedResult = pageNumberSchema.safeParse(searchParams.page);
  if (!parsedResult.success) {
    throw new Error("Invalid Page Number");
  }
  const page = parsedResult.data;

  return (
    <div className="flex flex-col items-center py-24 px-5 min-h-[110vh]">
      <H1 className="mb-28">
        {city === "all" ? "All Events" : `Events in ${capitalizeWord(city)}`}
      </H1>

      <Suspense key={city + page} fallback={<Loading />}>
        <EventsData city={city} page={page} />
      </Suspense>
    </div>
  );
}

export default EventsPage;
