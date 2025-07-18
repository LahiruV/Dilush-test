import * as fa2 from '@fortawesome/free-solid-svg-icons';

export interface Navigation {
  id: number;
  title: string;
  path: string;
  icon: string;
  subNavData?: {
    id: string;
    path: string;
    icon: fa2.IconDefinition;
    label: string;
  }[]
}
