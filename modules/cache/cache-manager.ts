 
/**
 * Use the standards of node-cache API
 * https://www.npmjs.com/package/node-cache
 */
export class DataCacheManager {
  get(key: string) {
    return '';
  }

  mget(keys: string[]) {
    return [];
  }

  take(key: string) {

  }

  has(key: string) {
    return false;
  }

  del(key: string) {
    return;
  }

  ttl(key: string, timeMs: number) {
    return;
  }

  getTtl(key: string): number {
    return 0;
  }

  keys(): string[] {
    return [];
  }

  set() {

  }

  getStatus() {
    return {};
  }

  flushAll() {
    return {};
  }

  flushStatus() {
    return {};
  }

  close() {
    return;
  }

  // TODO: on('eventName', callback) will implement later while need to be used
}
