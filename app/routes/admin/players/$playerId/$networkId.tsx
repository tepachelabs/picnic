import type { ActionFunction, LoaderFunction } from '@remix-run/node'
import { json, redirect } from '@remix-run/node'
import { useLoaderData } from '@remix-run/react'
import type { Network } from '@prisma/client'

import { db } from '~/utils/db.server'
import { NETWORKS } from '~/config'

type LoaderData = { network: Network }

export const loader: LoaderFunction = async ({ params }) => {
  const network = await db.network.findUnique({
    where: { id: params.networkId },
  })
  if (!network) {
    throw new Error('Page not found')
  }
  const data: LoaderData = { network }
  return json(data)
}

export const action: ActionFunction = async ({ request, params }) => {
  const form = await request.formData()
  const title = form.get('title') as string
  const handler = form.get('handler') as string
  const fields = { title, handler }

  const network = await db.network.update({
    where: {
      id: params.networkId,
    },
    data: fields,
  })
  return redirect(`${network.id}`)
}

export default function NetworkEditRoute () {
  const { network } = useLoaderData<LoaderData>()

  return (
    <div>
      <h4>Update network</h4>

      <form method="post">
        <select name="title" defaultValue={network.title} key={network.title}>
          {NETWORKS.map(network => (
            <option
              key={network}
              value={network}
            >
              {network}
            </option>
          ))}
        </select>
        <input name="handler" defaultValue={network.handler}/>

        <input type="submit"/>
      </form>
    </div>
  )
}
