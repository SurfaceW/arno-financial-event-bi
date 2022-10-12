export interface IRequestCacheDocumentModel {
  /**
   * key for index
   * each unique request identifier
   * e.g. JSON.stringify({ requestPath: 'xxx', requestParams: 'xxx'});
   */
  queryParams: string;
  /**
   * cache ttl
   */
  ttl: number;
  /**
   * Serialized Response Content
   */
  responseContent: string;
}

export const REQUEST_CACHE_COLLECTION_VALIDATION_JSON_SCHEMA = {
  bsonType: "object",
  title: "Request Query Cache Validator Schema",
  required: ["queryParams", "responseContent", "ttl"],
  properties: {
    queryParams: {
      bsonType: "string",
      description: "'queryParams' must be a string and is required"
    },
    ttl: {
      bsonType: "int",
      minimum: 1,
      maximum: 10 * 365 * 24 * 60 * 60 * 1000,
      description: "'ttl' must be an integer in [ 1, 10year ] and is required"
    },
    responseContent: {
      bsonType: ["string"],
      description: "'responseContent' must be a double if the field exists"
    }
  }
};


