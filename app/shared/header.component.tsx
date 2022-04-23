import { Link } from '@remix-run/react'

interface MenuItem {
  title: string;
  to: string;
}

const menuItems: MenuItem[] = [
  {
    title: 'Inicio',
    to: '/',
  },
  {
    title: 'Horarios',
    to: '/schedule',
  },
]

export const Header = () => (
  <header>
    <h1>Juegathon</h1>
    <nav>
      <ul>
        {menuItems.map((menuItem) => (
          <li key={menuItem.title}>
            <Link
              to={menuItem.to}
              title={menuItem.title}
            >
              <span>{menuItem.title}</span>
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  </header>
)
