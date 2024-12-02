import dayjs from "dayjs";
import fastify from "fastify"
import { serializerCompiler, validatorCompiler, ZodTypeProvider } from "fastify-type-provider-zod";
import { CreateOrder } from "./routes/create-order";

export const server = fastify()


// => Confifurações 
server.setValidatorCompiler(validatorCompiler);
server.setSerializerCompiler(serializerCompiler);

// => Rotas Da Api
server.register(CreateOrder)

// Inicialização do servidor
server.listen({
     port: 3000
}).then(() => console.log(`Server Running!!`))

