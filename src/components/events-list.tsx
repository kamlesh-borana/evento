// import { EventoEvent } from "@/lib/types";
import { EventoEvent } from "@prisma/client";
import EventCard from "./event-card";
import PaginationControls from "./pagination-controls";

type EventsListProps = {
  events: EventoEvent[];
  previousPath: string;
  nextPath: string;
};

function EventsList({ events, previousPath, nextPath }: EventsListProps) {
  return (
    <section className="flex flex-wrap gap-10 max-w-[1100px] px-[20px]">
      {events.map((event) => (
        <EventCard key={event.id} event={event} />
      ))}

      <PaginationControls previousPath={previousPath} nextPath={nextPath} />
    </section>
  );
}

export default EventsList;
