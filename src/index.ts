import { ApolloServer, gql, IResolvers } from "apollo-server";
import {
  getText,
  search,
  submitResult
} from "./api";

const typeDefs = gql`
  type Subtext
  {
    subtexts: [String!]!
  }
  input SubtextInput
  {
    subtexts: [String!]!
  }
  input SearchInput
  {
    textToSearch: String!
    subtextToSearch: SubtextInput
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
  type TextSearchResult
  {
    text: String!
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
    textToSearch: String! 
    search(searchInput: SearchInput): TextSearchResult!
  }
  type Mutation {
    submitResults(results : SubmitResultsInput): Boolean
  }
`;

const resolvers: IResolvers = {
  Query: {
    textToSearch: () => getText(),
    search: (_, args) => {
      return search(args.searchInput.textToSearch, args.searchInput.subtextToSearch)
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
