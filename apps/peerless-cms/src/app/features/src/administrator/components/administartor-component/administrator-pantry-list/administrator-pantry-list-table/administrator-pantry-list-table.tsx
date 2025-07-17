import { useState, useEffect } from 'react';
import { RootState, setAdministratorBusinessTemplate, setAdministratorPantryList } from "@peerless-cms/store";
import { AdministratorPantryListDistributer, dropDownDataConverter } from "@peerless/common";
import { ButtonWidget, DataGrid, DropDown } from "@peerless/controls";
import { GetPlistTemplate, GetPlistTemplateDetail, useProductsLookupData } from "@peerless/queries";
import { useDispatch, useSelector } from "react-redux";
import { GetPlistTemplateDetailParameters } from '@peerless/models';

const AdministratorPantryListTable = () => {
    const dispatch = useDispatch();
    const { loggedUser, childOriginators } = useSelector((state: RootState) => state.header);
    const { administratorBusinessTemplate } = useSelector((state: RootState) => state.administrator);
    const [selectedProduct, setSelectedProduct] = useState<any>(null);
    const [productDataList, setProductDataList] = useState<any[]>([]);
    const [formErrorMessage, setFormErrorMessage] = useState<string | null>(null);
    const popUpSettings = {
        width: '250px',
    };
    const popUpSettingsType = {
        width: '100px',
    };
    const args = {
        ChildOriginators: childOriginators || [],
        DefaultDepartmentId: loggedUser?.defaultDepartmentId || null,
        Originator: loggedUser?.userName || '',
        AdditionalParams: '',
        OrderBy: 'catlog_code ASC',
        StartIndex: 1,
        RowCount: 200
    };
    const payload: GetPlistTemplateDetailParameters = {
        searchTerm: administratorBusinessTemplate?.value || ""
    };
    const { data } = useProductsLookupData(args);
    const { data: plistTemplateDetailData } = GetPlistTemplateDetail(payload, true);
    const { data: plistTemplateData } = GetPlistTemplate(true);
    const productData = dropDownDataConverter.dropDownDataConverter(data || [], 'description', 'catlogCode');
    const templateData = (plistTemplateData || []).map((item: any) => ({
        id: item.templateId,
        text: item.type,
        value: item.templateId.toString(),
        name: item.name,
        type: item.type,
        businessType: item.businessType,
    }));

    useEffect(() => {
        if (!administratorBusinessTemplate && templateData.length > 0) {
            dispatch(setAdministratorBusinessTemplate(templateData[1]));
        }
    }, [templateData, administratorBusinessTemplate, dispatch]);

    useEffect(() => {
        setProductDataList(plistTemplateDetailData || []);
        dispatch(setAdministratorPantryList(plistTemplateDetailData || []));
    }, [plistTemplateDetailData, dispatch, administratorBusinessTemplate]);

    useEffect(() => {
        if (data && data.length) {
            setSelectedProduct(productData[0] || null);
        }
    }, [data]);

    const addSelectedProductFunction = () => {
        if (selectedProduct) {
            const productExists = productDataList.some((product: any) => product.catalogCode === selectedProduct.value);
            if (!productExists) {
                const newProduct = {
                    templateId: 0,
                    catalogCode: selectedProduct.value,
                    description: selectedProduct.text,
                };
                const updatedProductDataList = [...productDataList, newProduct];
                setProductDataList(updatedProductDataList);
                dispatch(setAdministratorPantryList(updatedProductDataList));
                setSelectedProduct(null);
                setFormErrorMessage(null);
            } else {
                setFormErrorMessage('Product already exists.');
            }
        }
    };

    const removeProductFunction = (optionType: any, row: any) => {
        const updatedProductDataList = productDataList.filter(
            (product: any) => product.catalogCode !== row?.catalogCode
        );
        setProductDataList(updatedProductDataList);
        dispatch(setAdministratorPantryList(updatedProductDataList));
    };

    const administratorPantryList = new AdministratorPantryListDistributer(removeProductFunction);

    return (
        <div>
            <div className='pantry-type-template'>
                <span>Template Name : </span>
                <DropDown
                    id={"pantry-type-dropdown"}
                    className={"pantry-type-dropdown"}
                    isClearable={false}
                    setValue={(e) => dispatch(setAdministratorBusinessTemplate(e))}
                    value={administratorBusinessTemplate}
                    datalist={templateData}
                    textField={"text"}
                    dataItemKey={"value"}
                    fillMode={"solid"}
                    size={"small"}
                    popupSettings={popUpSettingsType}
                />
            </div>
            <div className="pantry-list-products-content">
                <span>Catalog</span>
                <span className='catalog-title'>:</span>
                <DropDown
                    id={"pantry-list-products-dropdown"}
                    className={"pantry-list-products-dropdown"}
                    isClearable={false}
                    setValue={(e) => setSelectedProduct(e)}
                    value={selectedProduct}
                    datalist={productData}
                    textField={"text"}
                    dataItemKey={"value"}
                    fillMode={"solid"}
                    size={"small"}
                    popupSettings={popUpSettings}
                />
                <ButtonWidget
                    id='administrator-rep-market-save-button'
                    classNames='k-button-md k-rounded-md k-button-solid k-button-solid-primary footer-save-button pantry-list-products-add-button'
                    Function={() => addSelectedProductFunction()}
                    name='Add'
                />
                {formErrorMessage && (
                    <span className="pantry-error-message margin-left-10">{formErrorMessage}</span>
                )}
            </div>
            <DataGrid
                dataTable={administratorPantryList}
                data={productDataList}
                sortMode='multiple'
                isScrollable={true}
                isAutoScrollHeight={true}
                cssClasses={'sticky-header'}
                heightOffset={120}
            />
        </div>
    );
};

export default AdministratorPantryListTable;
