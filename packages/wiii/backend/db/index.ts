/**
 * @description
 * DB 관련 로직 구현
 * - typeorm - connections
 */

import { MongoDBConnOptions, RedisConnOptions } from '../config/db';
import { Connection, createConnection } from 'typeorm';
import { createClient } from 'redis';

export const getMongoConnection = async () => {
  try {
    const conn = await createConnection(MongoDBConnOptions);
    return conn;
  } catch (e) {
    return console.error(e);
  }
};

const { host, port } = RedisConnOptions;
export const getRedisConnection = () => {
  try {
    const client = createClient(port, host);
    console.info(`[DB] Redis Connected`);
    return client;
  } catch (e) {
    return console.error(e);
  }
};
