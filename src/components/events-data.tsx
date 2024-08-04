// import { sleep } from "@/lib/utils";
import { getEvents } from "@/lib/server-utils";
import EventsList from "./events-list";

type EventsDataProps = {
  city: string;
  page?: number;
};

async function EventsData({ city, page = 1 }: EventsDataProps) {
  //   await sleep(2000);

  const { events, totalCount } = await getEvents(city, page);

  const previousPath = page > 1 ? `/events/${city}?page=${page - 1}` : ``;
  const nextPath =
    page < totalCount / 6 ? `/events/${city}?page=${page + 1}` : "";

  return (
    <EventsList
      events={events}
      previousPath={previousPath}
      nextPath={nextPath}
    />
  );
}

export default EventsData;
