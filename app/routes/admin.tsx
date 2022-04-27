import { Outlet } from '@remix-run/react'

import { AdminHeader } from '~/shared/admin-header.component'

export default function ScheduleRoute () {
  return (
    <section>
      <AdminHeader />
      <Outlet />
    </section>
  )
}
