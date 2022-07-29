import express from "express";
import { ApolloServer, gql } from "apollo-server-express";
import { ApolloServerPluginDrainHttpServer } from "apollo-server-core";
import http from "http";
import cors from "cors";

import { getCoursesData } from "./fetchCourses";

let courses;

async function run() {
  courses = await getCoursesData();
}

run()

const typeDefs = gql`

type Course {
    _class: String
    id: Int
    title: String
    url: String
    is_paid: Boolean
    price: String
    price_detail: String
    price_serve_tracking_id: String
    visible_instructors: [[String]]
    image_125_H: String
    image_240x135: String
    is_practice_test_course: Boolean
    image_480x270: String
    published_title: String
    tracking_id: String
    predictive_score: String
    relevancy_score: String
    input_features: String
    lecture_search_result: String
    curriculum_lectures: [String]
    order_in_results: String
    curriculum_items: [String]
    headline: String
    instructor_name: String
}

input CourseInput {
    _class: String
    id: Int
    title: String
    url: String
    is_paid: Boolean
    price: String
    price_detail: String
    price_serve_tracking_id: String
    visible_instructors: [[String]]
    image_125_H: String
    image_240x135: String
    is_practice_test_course: Boolean
    image_480x270: String
    published_title: String
    tracking_id: String
    predictive_score: String
    relevancy_score: String
    input_features: String
    lecture_search_result: String
    curriculum_lectures: [String]
    order_in_results: String
    curriculum_items: [String]
    headline: String
    instructor_name: String
}
    
  type Query {
    course(id: Int!): Course
    courses: [Course]!
  }

  type Mutation {
    createCourse(course: CourseInput!): Course
  }
`;

const resolvers = {
  Query: {
    course: (_, { id }, __) => courses.find((course) => course.id === id),
    courses: (_, __, ___) => courses,
  },
  Mutation: {
    createCourse: (_, { course }, __) => {
      courses.push(course);
      return course;
    },
  },
};

const app = express();
app.use(cors());
app.use(express.json());
const httpServer = http.createServer(app);

const startApolloServer = async (app, httpServer) => {
  const server = new ApolloServer({
    typeDefs,
    resolvers,
    plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
  });

  await server.start();
  server.applyMiddleware({ app });
}

startApolloServer(app, httpServer);

export default httpServer;
