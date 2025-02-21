import {
    Client,
    Account,
    ID,
    Databases,
    OAuthProvider,
    Avatars,
    Query,
    Storage,
  } from "react-native-appwrite";

  
  export const config = {
    platform: "com.jsm.restate",
    endpoint: process.env.EXPO_PUBLIC_APPWRITE_ENDPOINT,
    projectId: process.env.EXPO_PUBLIC_APPWRITE_PROJECT_ID,
    databaseId: process.env.EXPO_PUBLIC_APPWRITE_DATABASE_ID,
    galleriesCollectionId:
      process.env.EXPO_PUBLIC_APPWRITE_GALLERIES_COLLECTION_ID,
    reviewsCollectionId: process.env.EXPO_PUBLIC_APPWRITE_REVIEWS_COLLECTION_ID,
    agentsCollectionId: process.env.EXPO_PUBLIC_APPWRITE_AGENTS_COLLECTION_ID,
    propertiesCollectionId:
      process.env.EXPO_PUBLIC_APPWRITE_PROPERTIES_COLLECTION_ID,
    bucketId: process.env.EXPO_PUBLIC_APPWRITE_BUCKET_ID,
  };
  
  export const client = new Client();
  client
    .setEndpoint(config.endpoint!)
    .setProject(config.projectId!)
    .setPlatform(config.platform!);
  
  export const avatar = new Avatars(client);
  export const account = new Account(client);
  export const databases = new Databases(client);
  export const storage = new Storage(client);
  
  
  export const getLatestProperties = async () => {
    try {
      const result = await databases.listDocuments(
        config.databaseId!,
        config.propertiesCollectionId!,
        [Query.orderAsc("$createdAt"), Query.limit(5)]
      )
      return  result.documents
    } catch (error) {
      console.error(error);
      return [];
    }
  }

  export const getProperties = async ({filter, query, limit}: {
    filter: string,
    query: string, 
    limit?: number
  }) => {
    try {
      const buildQuery = [Query.orderDesc("$createdAt")]
      if(filter && filter!== 'All'){
        buildQuery.push(Query.equal('type', filter))
      }
      if(query && query.length > 0){
        buildQuery.push(
          Query.or([
            Query.search('name', query),
            Query.search('address', query),
            Query.search('type', query)
          ])
        )
      }
      if(limit) buildQuery.push(Query.limit(limit))
      const result = databases.listDocuments(
        config.databaseId!,
        config.propertiesCollectionId!,
        buildQuery
      )
      return (await result).documents
    } catch (error) {
      console.error(error);
      return [];
    }
  }

  
  // write function to get property by id
  export async function getPropertyById({ id }: { id: string }) {
    try {
      const result = await databases.getDocument(
        config.databaseId!,
        config.propertiesCollectionId!,
        id
      );
      return result;
    } catch (error) {
      console.error(error);
      return null;
    }
  }