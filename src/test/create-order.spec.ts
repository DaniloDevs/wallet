import { expect, test } from "vitest"
import { server } from ".."


test('Deve ser possivel criar um investimento', async () => {
     const response = await server.inject({
          method: 'POST',
          url: '/create-order',
          body: {
               name: "Vale",
               code: "vale3",
               price: 118.36,
               amountOrder: 2
          }
     })
     
     const { Message, Order } = JSON.parse(response.body)
     console.log(Order)

     expect(Message).toBe('Seu investimento foi registrado com sucesso')
})