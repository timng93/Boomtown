import gql from 'graphql-tag';

const ItemFields = gql`
  fragment ItemFields on Item {
    # @TODO: Create a fragment to query the following fields for an item:
    #
    id
    title
    imageurl
    description
    created
    tags {
      id
      title
    }
    itemowner {
      id
      fullname
      email
      bio
    }
    borrower {
      id
      fullname
      email
      bio
    }
  }
`;

export const ITEM_QUERY = gql`
  query item($id: ID!) {
    item(id: $id) {
      ...ItemFields
    }
  }
  ${ItemFields}
`;

export const ALL_ITEMS_QUERY = gql`
  query items($filter: ID) {
    items(filter: $filter) {
      ...ItemFields
    }
  }
  ${ItemFields}
`;

export const ALL_USER_ITEMS_QUERY = gql`
  query user($id: ID!) {
    user(id: $id) {
      bio
      email
      fullname
      items {
        ...ItemFields
      }
      borrowed {
        ...ItemFields
      }
    }
  }
  ${ItemFields}
`;

export const ALL_TAGS_QUERY = gql`
  query {
    tags {
      id
      title
    }
  }
`;

export const ADD_ITEM_MUTATION = gql`
  mutation addItem($item: NewItemInput!) {
    addItem(item: $item) {
  
        id
        title
        description
      tags {
        id
        title
      }
    }
  }
`;

export const SIGNUP_MUTATION = gql`
  mutation signup($user: NewUser!) {
    signup(user: $user)
  }
`;

export const LOGIN_MUTATION = gql`
  mutation login($user: Login!) {
    login(user: $user)
  }
`;

export const VIEWER_QUERY = gql`
  query viewerQuery {
    viewer {
      id
      email
      fullname
      bio
    }
  }
`;

export const LOGOUT_MUTATION = gql`
  mutation {
    logout
  }
`;
