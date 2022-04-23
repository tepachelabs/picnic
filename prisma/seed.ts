import { PrismaClient } from '@prisma/client'

const db = new PrismaClient()

const players = [
  {
    id: 'player-seed-1',
    name: 'MafiaSheer',
    thumbnail: 'https://i.imgur.com/zENruvB.png',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque in dapibus neque. Mauris sed nibh scelerisque, euismod risus sit amet, facilisis orci. Cras et felis justo.',
  },
  {
    id: 'player-seed-2',
    name: 'LegendFirst',
    thumbnail: 'https://i.imgur.com/s6DRgxG.png',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque in dapibus neque. Mauris sed nibh scelerisque, euismod risus sit amet, facilisis orci. Cras et felis justo.',
  },
  {
    id: 'player-seed-3',
    name: 'Divisionsys',
    thumbnail: 'https://i.imgur.com/YXzPqkt.png',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque in dapibus neque. Mauris sed nibh scelerisque, euismod risus sit amet, facilisis orci. Cras et felis justo.',
  },
  {
    id: 'player-seed-4',
    name: 'Humailan',
    thumbnail: 'https://i.imgur.com/SxfBgvM.png',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque in dapibus neque. Mauris sed nibh scelerisque, euismod risus sit amet, facilisis orci. Cras et felis justo.',
  },
  {
    id: 'player-seed-5',
    name: 'Fixwarz',
    thumbnail: 'https://i.imgur.com/npxTDeU.png',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque in dapibus neque. Mauris sed nibh scelerisque, euismod risus sit amet, facilisis orci. Cras et felis justo.',
  },
]

const networks = [
  {
    playerId: 'player-seed-1',
    title: 'twitter',
    handler: 'MafiaSheer',
  },
  {
    playerId: 'player-seed-1',
    title: 'instagram',
    handler: 'MafiaSheer',
  },
  {
    playerId: 'player-seed-1',
    title: 'tiktok',
    handler: 'MafiaSheerTV',
  },
  {
    playerId: 'player-seed-2',
    title: 'tiktok',
    handler: 'LegendFirst',
  },
  {
    playerId: 'player-seed-3',
    title: 'twitter',
    handler: 'Divisionsys',
  },
  {
    playerId: 'player-seed-3',
    title: 'facebook',
    handler: 'whiteblackdog99',
  },
  {
    playerId: 'player-seed-4',
    title: 'twitch',
    handler: 'onlyvalorant',
  },
]

const games = [
  {
    id: 'game-seed-1',
    slug: 'elden-ring',
    title: 'Elden Ring',
    thumbnail: 'https://media.rawg.io/media/games/5ec/5ecac5cb026ec26a56efcc546364e348.jpg',
    released: new Date('2022-02-25'),
  },
  {
    id: 'game-seed-2',
    slug: 'super-mario-world',
    title: 'Super Mario World',
    thumbnail: 'https://media.rawg.io/media/games/3bb/3bb2c8d774c3a83eb2c17d0d3d51f020.jpg',
    released: new Date('1990-11-21'),
  },
  {
    id: 'game-seed-3',
    slug: 'minecraft',
    title: 'Minecraft',
    thumbnail: 'https://media.rawg.io/media/games/b4e/b4e4c73d5aa4ec66bbf75375c4847a2b.jpg',
    released: new Date('2009-05-10'),
  },
  {
    id: 'game-seed-4',
    slug: 'tunic',
    title: 'Tunic',
    thumbnail: 'https://media.rawg.io/media/games/2c1/2c1984e128ac48b89953ed4de4904a3b.jpg',
    released: new Date('2022-03-16'),
  },
  {
    id: 'game-seed-5',
    slug: 'overcooked',
    title: 'Overcooked',
    thumbnail: 'https://media.rawg.io/media/games/270/270b412b66688081497b3d70c100b208.jpg',
    released: new Date('2016-08-01'),
  },
  {
    id: 'game-seed-6',
    slug: 'mario-kart-8-deluxe',
    title: 'Mario Kart 8 Deluxe',
    thumbnail: 'https://media.rawg.io/media/games/6f8/6f846e941c78cfbabe53cd67e55ced83.jpg',
    released: new Date('2017-04-27'),
  },
  {
    id: 'game-seed-7',
    slug: 'cuphead',
    title: 'Cuphead',
    thumbnail: 'https://media.rawg.io/media/games/226/2262cea0b385db6cf399f4be831603b0.jpg',
    released: new Date('2017-09-29'),
  },
]

const timeslots = [
  {
    playerId: 'player-seed-1',
    gameId: 'game-seed-1',
    date: new Date('2022-12-03T16:00:00.0Z'),
  },
  {
    playerId: 'player-seed-2',
    gameId: 'game-seed-2',
    date: new Date('2022-12-03T18:00:00.0Z'),
  },
  {
    playerId: 'player-seed-3',
    gameId: 'game-seed-3',
    date: new Date('2022-12-03T19:00:00.0Z'),
  },
  {
    playerId: 'player-seed-4',
    gameId: 'game-seed-4',
    date: new Date('2022-12-03T20:00:00.0Z'),
  },
  {
    playerId: 'player-seed-1',
    gameId: 'game-seed-5',
    date: new Date('2022-12-04T17:00:00.0Z'),
  },
  {
    playerId: 'player-seed-2',
    gameId: 'game-seed-6',
    date: new Date('2022-12-04T18:00:00.0Z'),
  },
  {
    playerId: 'player-seed-3',
    gameId: 'game-seed-7',
    date: new Date('2022-12-04T19:00:00.0Z'),
  },
]

async function seed () {
  await Promise.all(
    players.map((player) => db.player.create({ data: player })),
  )

  await Promise.all(
    networks.map((network) => db.network.create({ data: network })),
  )

  await Promise.all(
    games.map((game) => db.game.create({ data: game })),
  )

  await Promise.all(
    timeslots.map((timeslot) => db.timeSlot.create({ data: timeslot })),
  )
}

seed()
