import express from 'express'
import { ApolloServer, gql } from 'apollo-server-express'

const persons = [
  {
    id: 1,
    name: 'Ash Ketchum',
    phone_number: '+440000000000',
    email: 'ash@gmail.com',
  },
  {
    id: 2,
    name: 'Professor Oak',
    phone_number: '+441111111111',
    email: 'proak@gmail.com',
  },
  {
    id: 3,
    name: 'Gary Oak',
    phone_number: '+442222222222',
  },
]

const typeDefs = gql`
  type Person {
    id: Int!
    name: String!
    email: String
  }
  type Query {
    person(id: Int!): Person
    persons: [Person]!
  }
  input PersonInput {
    id: Int!
    name: String!
    email: String
  }
  type Mutation {
    createPerson(person: PersonInput!): Person
  }
`

const resolvers = {
  Query: {
    person: (_, { id }, __) => persons.find((person) => person.id === id),
    persons: (_, __, ___) => persons,
  },
  Mutation: {
    createPerson: (_, { person }, __) => {
      persons.push(person)
      return person
    },
  },
}

const server = new ApolloServer({ typeDefs, resolvers })

const app = express()
server.applyMiddleware({ app })

app.listen({ port: 4001 }, () =>
  console.log(`🚀 Server ready at http://localhost:4001${server.graphqlPath}`)
)
