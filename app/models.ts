import type {
  Game,
  Network,
  Player as PrismaPlayer,
  TimeSlot as PrismaTimeSlot,
} from '@prisma/client'

export type Player = PrismaPlayer & {
  networks?: Network[]
}

export type TimeSlot = PrismaTimeSlot & {
  game: Game
  player: Player
}
