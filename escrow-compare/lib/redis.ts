import { createClient } from 'redis'

const redis = createClient({
  url: process.env.REDIS_URL || 'redis://localhost:6379',
})

redis.on('error', (err) => console.error('Redis Client Error', err))

if (!redis.isOpen) {
  redis.connect().catch(console.error)
}

export { redis }

// Helper functions for common operations
export async function getCachedData<T>(key: string): Promise<T | null> {
  try {
    const data = await redis.get(key)
    return data ? JSON.parse(data) : null
  } catch (error) {
    console.error(`Error getting cached data for ${key}:`, error)
    return null
  }
}

export async function setCachedData<T>(
  key: string,
  data: T,
  ttl: number = 60
): Promise<void> {
  try {
    await redis.setEx(key, ttl, JSON.stringify(data))
  } catch (error) {
    console.error(`Error setting cached data for ${key}:`, error)
  }
}

export async function invalidateCache(pattern: string): Promise<void> {
  try {
    const keys = await redis.keys(pattern)
    if (keys.length > 0) {
      await redis.del(keys)
    }
  } catch (error) {
    console.error(`Error invalidating cache for pattern ${pattern}:`, error)
  }
}