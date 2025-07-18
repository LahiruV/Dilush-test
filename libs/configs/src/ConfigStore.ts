import { getBooleanEnvVar, getEnvVar, getJsonEnvVar } from '@peerless/utils';

export interface Options {
  isProd: boolean;
  uniqueKey: string;
  adsKeywords: string[];
  apiPath: string;
  crystalApiPath: string;
}

class ConfigStore implements Options {
  private readonly NX_PEERLESS_KEY = getEnvVar('NX_PEERLESS_KEY');

  private readonly NX_PEERLESS_PROD: boolean =
    getBooleanEnvVar('NX_PEERLESS_PROD');

  private readonly NX_PEERLESS_KEYWORDS: string[] = getJsonEnvVar(
    'NX_PEERLESS_KEYWORDS'
  );

  private readonly NX_PEERLESS_API_PATH = getEnvVar(`NX_PEERLESS_API_PATH`);

  private readonly NX_PEERLESS_CRYSTAL_API_PATH = getEnvVar(`NX_PEERLESS_CRYSTAL_API_PATH`);

  public readonly uniqueKey: string;
  public readonly isProd: boolean;
  public readonly adsKeywords: string[];
  public readonly apiPath: string;
  public readonly crystalApiPath: string;

  constructor() {
    this.uniqueKey = this.NX_PEERLESS_KEY;

    this.isProd = this.NX_PEERLESS_PROD;

    this.apiPath = this.NX_PEERLESS_API_PATH;

    this.crystalApiPath = this.NX_PEERLESS_CRYSTAL_API_PATH;

    this.adsKeywords = this.NX_PEERLESS_KEYWORDS;
  }
}

export const configStore = new ConfigStore();
