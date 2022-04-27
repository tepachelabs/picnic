import type { LoaderFunction } from '@remix-run/node'
import { json } from '@remix-run/node'
import { Link, Outlet, useLoaderData } from '@remix-run/react'

import { db } from '~/utils/db.server'
import type { Player } from '~/models'

type LoaderData = {
  players: Player[];
}

export const loader: LoaderFunction = async () => {
  const data: LoaderData = {
    players: await db.player.findMany({
      orderBy: {
        createdAt: 'asc',
      },
      include: {
        networks: true,
      },
    }),
  }
  return json(data)
}

export default function ScheduleRoute () {
  const { players } = useLoaderData<LoaderData>()

  return (
    <section>
      <h2>Players</h2>

      <Link to='/admin/players/new'>Add</Link>

      <ul>
        {players.map((player) => (
          <li key={player.id}>
            <Link to={`${player.id}`}>{player.name}</Link>
          </li>
        ))}
      </ul>

      <Outlet/>
    </section>
  )
}
