import { CommonProps } from '@peerless/models';
import { useAppStateContext } from '@peerless/providers';
import { ColorPicker } from '@progress/kendo-react-inputs';
import { FC, useState } from 'react';
export const AboutPage: FC<CommonProps> = () => {
  const { AppName, currentPage } = useAppStateContext();

  const [value, setValue] = useState('rgba(237, 126, 50, 1)');
  const handleOnChange = (event: any) => setValue(event.value);

  return (
    <div className='bg-gray-100'>
      <div className='max-w-7xl mx-auto py-6 sm:px-6 lg:px-8'>
        Aboutn Page Page | {AppName} | {currentPage} |
        <hr />
        <ColorPicker value={value} onChange={handleOnChange} />
      </div>
    </div>
  );
};
