import * as fa2 from '@fortawesome/free-solid-svg-icons';
import ContainerHeader from '../../../../dashboard-feature/components/container-header/container-header';
import SectionMainBase from '../../../../lib/section-main-base';
import FeaturesBase from '../../../../lib/features-base';
import { ButtonWidget, CustomToastMessage } from '@peerless/controls';
import { useSelector } from 'react-redux';
import { RootState } from '@peerless-cms/store';
import AdministratorPantryListTable from './administrator-pantry-list-table/administrator-pantry-list-table';
import './administrator-pantry-list.css';
import { InsertPlistTemplateHeader } from '@peerless/queries';
import { InsertPlistTemplateHeaderParameters } from '@peerless/models';
import { useState } from 'react';
import { randomKeyFunction } from '@peerless/common';

export function AdministratorPantryList() {
    const { insertPlistTemplateHeaderMutate } = InsertPlistTemplateHeader();
    const { administratorPantryList, administratorBusinessTemplate } = useSelector((state: RootState) => state.administrator);
    const payload = {
        templateId: administratorBusinessTemplate.value,
        name: administratorBusinessTemplate.name,
        type: administratorBusinessTemplate.type,
        businessType: administratorBusinessTemplate.businessType,
        templateDetails: administratorPantryList
    } as InsertPlistTemplateHeaderParameters
    const [status, setStatus] = useState<string>('');
    const [labelText, setLabelText] = useState<string>('');
    const [triggerKey, setTriggerKey] = useState(0);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [open, setOpen] = useState(false);

    const saveMutateFunction = () => {
        setIsLoading(true);
        insertPlistTemplateHeaderMutate(payload, {
            onSuccess: () => {
                setStatus('success-notification-color');
                setLabelText('Save Successfully');
                setTriggerKey((prevKey) => prevKey + 1);
                setIsLoading(false);
            },
            onError: () => {
                setStatus('error-notification-color');
                setLabelText('Save Not Successfully');
                setTriggerKey((prevKey) => prevKey + 1);
                setIsLoading(false);
            }
        }
        )
    }

    const header = (
        <>
            <ContainerHeader icon={fa2.faListAlt} name={`Pantry List - ${administratorBusinessTemplate.name}`} />
        </>
    )
    const main = (
        <div className='content'>
            <AdministratorPantryListTable />
        </div>
    );
    const footer = (
        <div className='form-button-container footer-content'>
            <span className='footer-span-content'>! Make sure you have verified all your changes before save</span>
            <ButtonWidget
                id='administrator-rep-market-save-button'
                classNames='k-button-md k-rounded-md k-button-solid k-button-solid-primary footer-save-button'
                Function={() => saveMutateFunction()}
                name={isLoading ? 'Saving...' : 'Save'}
            />
            <CustomToastMessage status={status || ''} labelText={labelText} state={open} setState={setOpen} triggerKey={triggerKey} />
        </div>
    );

    const mainContent = <SectionMainBase mainClassName="overflow-hidden" header={header} main={main} footer={footer}></SectionMainBase>;

    return <FeaturesBase main={mainContent} cssClass='remove-margin-top-article' />;
}

export default AdministratorPantryList;