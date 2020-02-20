import gql from 'graphql-tag';
import {ApolloCache} from 'apollo-cache';
import {Resolvers} from 'apollo-client';
import {GET_KEYWORDS_BY_CATEGORY, GET_CATEGORIES} from './App';

export const typeDefs = gql`
    extend type Query {
        categories: Array
    }
`;

type ResolverFn = (
    parent: any,
    args: any,
    {cache}: {cache: ApolloCache<any>}
) => any;

interface ResolverMap {
    [field: string]: ResolverFn
}

interface AppResolvers extends Resolvers {
    Mutation: ResolverMap;
  }

export const resolvers: AppResolvers = {
    Mutation: {

    }
}