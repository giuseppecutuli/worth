/**
 * Retrieves the value of an environment variable.
 * If the variable is not set, it returns the provided fallback value.
 *
 * @param key - The name of the environment variable to retrieve.
 * @param fallback - The value to return if the environment variable is not set.
 * @returns The value of the environment variable or the fallback value.
 */
export function getOsEnv(key: string, fallback: string = ''): string {
  return process.env[key] || fallback
}

/**
 * Retrieves the value of an environment variable as a number.
 * If the variable is not set or cannot be parsed as a number, it returns the provided fallback value.
 *
 * @param key - The name of the environment variable to retrieve.
 * @param fallback - The value to return if the environment variable is not set or cannot be parsed.
 * @returns The value of the environment variable as a number or the fallback value.
 */
export function getOsEnvNumber(key: string, fallback: number): number {
  const value = parseInt(getOsEnv(key) || '', 10)

  if (isNaN(value)) {
    return fallback
  }

  return value
}
