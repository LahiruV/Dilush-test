import { readEnvVar } from './readEnvVar';

export function getBooleanEnvVar(name: string): boolean {
  const value = readEnvVar(name);
  if (!value) {
    return false;
  }
  return value.toLowerCase() === 'true';
}
