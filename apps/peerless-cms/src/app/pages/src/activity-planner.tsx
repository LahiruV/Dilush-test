import { CommonProps } from '@peerless/models';
import { FC } from 'react';
import { PagesBase } from './lib';
import { Outlet } from 'react-router-dom';

export const ActivityPlannerPage: FC<CommonProps> = () => {
  return <PagesBase header={''} main={<Outlet />} />;
};
