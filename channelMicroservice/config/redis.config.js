import Redis from "ioredis";

class RedisCache {
    constructor() {
        this.redis = null;
    }
    connectRedis({port,host,username,password}){
        this.redis = new Redis(
            {
                port:port,
                host:host,
                username:username,
                password:password,
            }
        )
    }

    getRedis(){
        return this.redis;
    }

};

export let redis = new RedisCache();