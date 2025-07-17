import { CommonProps } from '@peerless/models';

import { FC } from 'react';
import { Outlet } from 'react-router-dom';
import { PagesBase } from './lib';

export const LeedsAndCustomersPage: FC<CommonProps> = () => {
  return <PagesBase header={''} main={<Outlet />} />;
};
