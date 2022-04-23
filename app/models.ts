import type {
  Game,
  Network,
  Player as PrismaPlayer,
  TimeSlot as PrismaTimeSlot,
} from '@prisma/client'

type Player = PrismaPlayer & {
  networks?: Network[]
}

export type TimeSlot = PrismaTimeSlot & {
  game: Game
  player: Player
}
