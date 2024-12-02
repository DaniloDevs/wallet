import { FastifyInstance } from "fastify";
import { z } from 'zod'
import { ZodTypeProvider } from "fastify-type-provider-zod";
import { prisma } from "../connection/prisma";
import dayjs from "dayjs";


export async function CreateOrder(server: FastifyInstance) {
     server
          .withTypeProvider<ZodTypeProvider>()
          .post('/create-order', {
               schema: {
                    body: z.object({
                         name: z.string(),
                         code: z.string().toUpperCase(),
                         price: z.number(),
                         amountOrder: z.number()
                    })
               }
          }, async (request, reply) => {
               const {
                    name,
                    code,
                    price,
                    amountOrder
               } = request.body


               await prisma.orders.create({
                    data: {
                         name,
                         price,
                         amount: amountOrder,
                         createdAt: dayjs().format('DD/MM/YYYY'),
                         code: {
                              connectOrCreate: {
                                   where: { name: code },
                                   create: { name: code }
                              }
                         }
                    }
               })

               return reply.code(201).send({
                    Message: "Seu investimento foi registrado com sucesso",
                    Order: {
                         Enterprise: name,
                         Code: code,
                         AmountOrder: amountOrder,
                         Total_Price: `R$ ${price}`,
                         Price_Order: `R$ ${price / amountOrder}`
                    } 
               })
          })
}