import { createClient, RedisClientType } from 'redis'

class RedisService {
    private client: RedisClientType;

    async setupRedis() {
        const { REDIS_URL } = process.env;
        this.client = createClient({
            url: REDIS_URL
        })

        this.client.on('error', (err) => console.error('Redis Client Error', err));
    }

    async connect() {
        await this.client.connect();
    }

    async storeData(key: string, value: any) {
        await this.client.setEx(key, 900, JSON.stringify(value));
    }

    async getData(key: string): Promise<string | {}> {
        return await this.client.get(key);
    }

    async removeData(key: string) {
        return await this.client.del(key);
    }
    
    async disconnect() {
        await this.client.quit();
    }
}

export default new RedisService();