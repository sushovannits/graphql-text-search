import { ApolloServer, gql, IResolvers } from "apollo-server";
import {
  search,
  submitResult
} from "./api";

const typeDefs = gql`
  type Subtext
  {
    subtexts: [String!]!
  }
  type SubtextResult
  {
    subtext: String!
    result : String!
  }
  input SubtextResultInput
  {
    subtext: String!
    result : String!
  }
  type TextToSearch
  {
    text: String!
  }
  type TextSearchResult
  {
    text: TextToSearch!
    subtext: Subtext!
    results: [SubtextResult!]!
  }
  input SubmitResultsInput
  {
    candidate : String!
    text : String!
    results : [SubtextResultInput!]!
  }
  type Query {
    searchResult: TextSearchResult
  }
  type Mutation {
    submitResults(results : SubmitResultsInput): Boolean
  }
`;

const resolvers: IResolvers = {
  Query: {
    searchResult: () => {
      return search();
    }
  },
  Mutation: {
    submitResults: (_, args) => {
      return submitResult(args.results);
    }
  }
};

const server = new ApolloServer({ typeDefs, resolvers });

server.listen().then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`);
});
