export function getOsEnv(key: string, fallback: string = ''): string {
  return process.env[key] || fallback
}

export function getOsEnvNumber(key: string, fallback: number): number {
  const value = parseInt(getOsEnv(key) || '', 10)

  if (isNaN(value)) {
    return fallback
  }

  return value
}
