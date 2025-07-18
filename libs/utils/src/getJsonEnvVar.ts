import { getEnvVar } from './getEnvVar';

export const getJsonEnvVar = (name: string) => JSON.parse(getEnvVar(name));
