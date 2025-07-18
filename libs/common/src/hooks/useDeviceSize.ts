import { DEVICE_SIZE, getDeviceSize } from '@peerless/utils';
import { useEffect, useLayoutEffect, useState } from 'react';

export const useDeviceSize = () => {
  const [device, setDevice] = useState<DEVICE_SIZE>(
    getDeviceSize(window.innerWidth)
  );

  useLayoutEffect(() => {
    setDevice(getDeviceSize(window.innerWidth));
  }, []);

  useEffect(() => {
    const onResize = () => {
      setDevice(getDeviceSize(window.innerWidth));
    };

    window.addEventListener('resize', onResize);

    return () => {
      window.removeEventListener('resize', onResize);
    };
  }, []);

  const isSmallMobile = device === DEVICE_SIZE.SMALL_MOBILE;
  const isMobile = device === DEVICE_SIZE.MOBILE || isSmallMobile;
  const isTablet = device === DEVICE_SIZE.TABLET;
  const isLargerDesktop = device === DEVICE_SIZE.LARGER_DESKTOP;
  const isLargeDesktop =
    device === DEVICE_SIZE.LARGE_DESKTOP || isLargerDesktop;
  const isDesktop =
    device === DEVICE_SIZE.DESKTOP || isLargeDesktop || isLargerDesktop;
  const isTabletOrSmaller = isMobile || isTablet || isSmallMobile;

  return {
    device,
    isSmallMobile,
    isMobile,
    isTablet,
    isDesktop,
    isLargeDesktop,
    isTabletOrSmaller,
    isLargerDesktop,
  };
};
