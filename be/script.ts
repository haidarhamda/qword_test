import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
    const user = await prisma.user.create({
        data: {
          name: '6',
          email: '6@mail.com',
          password: '123456',
          payments: {
            create: [
              {
                description: 'payment 1',
                amount: 100000,
              },
              {
                description: 'payment 2',
                amount: 200000,
              }
            ],
          },
        },
      })
      console.log(user)
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })