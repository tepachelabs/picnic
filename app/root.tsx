import type { MetaFunction } from '@remix-run/node'
import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from '@remix-run/react'
import type { LinksFunction } from '@remix-run/node'

import stylesUrl from '~/styles/global.css'

export const meta: MetaFunction = () => ({
  charset: 'utf-8',
  title: 'Juegathon 2022',
  viewport: 'width=device-width,initial-scale=1',
})

export const links: LinksFunction = () => {
  return [
    { rel: 'stylesheet', href: stylesUrl },
  ]
}

export default function App () {
  return (
    <html lang="es">
      <head>
        <Meta/>
        <Links/>
      </head>
      <body>
        <Outlet/>
        <ScrollRestoration/>
        <Scripts />
        {process.env.NODE_ENV === 'development' && <LiveReload/>}
      </body>
    </html>
  )
}
