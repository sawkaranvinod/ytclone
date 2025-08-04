import Redis from "ioredis";


class RedisCache{
    constructor(){
        this.redis = null;
    }
    connectRedis({port,host,username,password}){
        this.redis = new Redis(
            {
                port,
                host,
                username,
                password,
            }
        )
    }
    getCache(){
        return this.redis;
    }

    disconnectRedis(){
        this.redis.disconnect();
    }
};

export let dataCache = new RedisCache();