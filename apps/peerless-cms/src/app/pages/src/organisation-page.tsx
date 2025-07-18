import { CommonProps } from '@peerless/models';
import { OrganisationFeature } from '@peerless-cms/features';

import { FC } from 'react';
import { PagesBase } from './lib';
import { Outlet } from 'react-router-dom';

export const OrganisationPage: FC<CommonProps> = () => {
  // return <OrganisationFeature />;
  
  return <PagesBase header={''} main={<Outlet />} />;
};
