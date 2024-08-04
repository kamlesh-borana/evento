import "server-only";

// import { BASE_API_URL } from "./constants";
import prisma from "./db";
import { notFound } from "next/navigation";
// import { EventoEvent } from "./types";
// import { EventoEvent, PrismaClient } from "@prisma/client";
import { unstable_cache } from "next/cache";
import { capitalizeWord } from "./utils";

// const prisma = new PrismaClient();

export const getEvents = unstable_cache(async (city: string, page = 1) => {
  // const response = await fetch(`${BASE_API_URL}?city=${city}`, {
  //   next: {
  //     revalidate: 300,
  //   },
  // });
  // const events: EventoEvent[] = await response.json();

  const events = await prisma.eventoEvent.findMany({
    where: {
      city: city === "all" ? undefined : capitalizeWord(city),
    },
    orderBy: {
      date: "asc",
    },
    take: 6,
    skip: (page - 1) * 6,
  });

  let totalCount;
  if (city === "all") {
    totalCount = await prisma.eventoEvent.count();
  } else {
    totalCount = await prisma.eventoEvent.count({
      where: {
        city: capitalizeWord(city),
      },
    });
  }

  return { events, totalCount };
});

export const getEvent = unstable_cache(async (slug: string) => {
  // const response = await fetch(`${BASE_API_URL}/${slug}`);
  // const event: EventoEvent = await response.json();

  const event = await prisma.eventoEvent.findUnique({
    where: {
      slug: slug,
    },
  });

  if (!event) {
    return notFound();
  }

  return event;
});
