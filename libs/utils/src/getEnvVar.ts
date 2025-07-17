import { readEnvVar } from './readEnvVar';

export function getEnvVar(name: string) {
  const envVar = readEnvVar(name);
  if (!envVar) {
    throw new Error(`getEnvVar not found: '${name}'`);
  }
  return envVar;
}
