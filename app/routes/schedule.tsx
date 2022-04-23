import type { LoaderFunction } from '@remix-run/node'
import { json } from '@remix-run/node'
import { useLoaderData } from '@remix-run/react'
import { format } from 'date-fns'

import { db } from '~/utils/db.server'
import { Header } from '~/shared/header.component'
import type { TimeSlot } from '~/models'

type LoaderData = {
  first: TimeSlot[];
  second: TimeSlot[];
}

const schedulePayloadReducer = (
  prev: LoaderData,
  curr: TimeSlot,
): LoaderData => {
  const date = new Date(curr.date)

  return date.getDate() === 3 ? {
    first: [...prev.first, curr],
    second: [...prev.second],
  } : {
    first: [...prev.first],
    second: [...prev.second, curr],
  }
}

export const loader: LoaderFunction = async () => {
  const timeSlots = await db.timeSlot.findMany({
    orderBy: {
      date: 'asc',
    },
    include: {
      player: {
        include: {
          networks: true,
        },
      },
      game: true,
    },
  })

  const payload: LoaderData = timeSlots.reduce<LoaderData>(
    schedulePayloadReducer,
    { first: [], second: [] },
  )

  return json(payload)
}

const EventCard = ({ timeSlot }: { timeSlot: TimeSlot }) => {
  const { networks } = timeSlot.player
  const eventDate = format(new Date(timeSlot.date), 'Ha')
  const gameReleased = format(new Date(timeSlot.game.released), 'yyyy')

  return (
    <li>
      <details>
        <summary>
          <b>{eventDate}</b> {timeSlot.game.title}
        </summary>
        <fieldset>
          <img
            width={420}
            src={timeSlot.game.thumbnail}
            alt={timeSlot.game.title}
          />
          <p>{timeSlot.game.title} ({gameReleased})</p>
          <hr/>
          <p>
            <img
              width={40}
              src={timeSlot.player.thumbnail}
              alt={timeSlot.player.name}
            />
            {timeSlot.player.name}
          </p>
          {networks && (
            <ul>
              {networks.map((network) => (
                <li key={network.id}>
                  {network.title} - {network.handler}
                </li>
              ))}
            </ul>
          )}
        </fieldset>
      </details>
    </li>
  )
}

export default function ScheduleRoute () {
  const data = useLoaderData<LoaderData>()

  return (
    <main>
      <Header/>
      <h1>Horarios</h1>
      <h3>Sábado 3 de Diciembre</h3>
      <ul>
        {data.first.map((timeSlot) => (
          <EventCard key={timeSlot.id} timeSlot={timeSlot}/>
        ))}
      </ul>
      <h3>Domingo 4 de Diciembre</h3>
      <ul>
        {data.second.map((timeSlot) => (
          <EventCard key={timeSlot.id} timeSlot={timeSlot}/>
        ))}
      </ul>
    </main>
  )
}
