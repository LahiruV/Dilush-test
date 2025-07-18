import { zodResolver } from "@hookform/resolvers/zod";
import { pageModeEnum, RootState, setcustomerEUPriceList, setIsCustomerEUPriceListTblPopupOpen, setIsEnduserPriceListHistoryOpen, setSelectedCustomerEUPrice } from "@peerless-cms/store";
import { ButtonWidget, FormInput, MultiColumnComboBoxWidget, ToastManager } from "@peerless/controls";
import { ReadOnlyProvider } from "@peerless/providers";
import MessageBox from "apps/peerless-cms/src/app/features-common-components/src/message-box/message-box";
import { useEffect, useRef, useState } from "react";
import { Button } from "react-bootstrap";
import { FormProvider, useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { z } from "zod";
import './customer-eu-price-list-form.css';
import { format } from "date-fns";
import { getDate } from "@peerless/common";
import { CustomerEUPriceListTable, EnduserPriceListHistory } from "@peerless-cms/features";
import { getEnduserPriceList, saveCustomerPriceList, saveEnduserPricelist, useProductsLookupData } from "@peerless/queries";
import { contactId, contactTypeEnum } from "@peerless/utils";
import { useMutation } from "@tanstack/react-query";
import { Dialog } from "primereact/dialog";
import ToastMessages from "libs/controls/src/toasts-message/messages";

//save enduser price list
//enduser price history


export interface CustomerEUPriceListFormProps { }

export function CustomerEUPriceListForm(props: CustomerEUPriceListFormProps) {
  const dispatch = useDispatch();

  type FormFields = z.infer<typeof customerEUPriceListFormSchema>;
  const formRef = useRef<HTMLFormElement | null>(null);
  const messagesRef = useRef<any>(null);
  const messageMgr = new ToastManager(messagesRef);

  const { selectedLeedOrCustomer, originator, loggedUser, customerEUListPricePageMode,
    customerEUPriceList, childOriginators, contactType, selectedDistributor, isEnduserPriceListHistoryOpen } = useSelector((state: RootState) => ({
      selectedLeedOrCustomer: state.leedsAndCustomers.selectedLeedOrCustomer,
      originator: state.header.selectedOriginator,
      loggedUser: state.header.loggedUser,
      customerEUListPricePageMode: state.leedsAndCustomers.customerEUListPricePageMode,
      customerEUPriceList: state.leedsAndCustomers.customerEUPriceList,
      childOriginators: state.header.childOriginators,
      contactType: state.leedsAndCustomers.selectedContactType,
      selectedDistributor: state.enduserPriceFilters.selectedDistributor,
      isEnduserPriceListHistoryOpen: state.modal.isEnduserPriceListHistoryOpen
    }));

  const [selectedProduct, setSelectedProduct] = useState<{ label: string; value: string } | null>(null);
  const [loading, setLoading] = useState(false);
  const [searchText, setSearchText] = useState('');
  const [productsLocalList, setProductsLocalList] = useState<any>(customerEUPriceList);
  const [formErrorMessage, setFormErrorMessage] = useState<string | null>(null);
  const [isSaving, setIsSaving] = useState(false);
  const [effectiveDate, setEffectiveDate] = useState<any>(null);
  const [enableRefetch, setEnableRefetch] = useState(false);

  let enduserArgs = {
    ChildOriginators: childOriginators,
    DefaultDepartmentId: originator.defaultDepartmentId,
    Originator: originator.userName,
    CustomerCode: selectedDistributor.value,
    EnduserCode: selectedLeedOrCustomer.endUserCode,
    ManagerMode: true,
    CustomerType: 'EndUser',
    EffectiveDate: format(new Date(), 'dd-MMM-yyyy'),
    StartIndex: 1,
    RowCount: 1000,
    OrderBy: 'catlog_code ASC',
  }

  const { data: enduserPriceListData, status: enduserStatus, error: enduserPriceListDataError, refetch, isLoading: isEnduserPriceListDataLoading } = getEnduserPriceList(enduserArgs, enableRefetch);

  useEffect(() => {
    if (enduserPriceListData) {
      setProductsLocalList(enduserPriceListData);
      setEnableRefetch(false);
    }
  }, [enduserPriceListData]);

  let productList: any = [];

  const mutation = useMutation<any, Error, any>({
    mutationFn: saveCustomerPriceList
  });

  const mutationEnduserPriceList = useMutation<any, Error, any>({
    mutationFn: saveEnduserPricelist
  });

  const customerEUPriceListFormSchema = z.object({
    effectiveDate: z.string(),
    lastUpdated: z.string(), //.min(1, { message: 'City is required' }),
    originator: z.string(),
    catlogCode: z.string(),
    custCode: z.string().optional(),
    enduserCode: z.string().optional(),
  });

  let customerEUPriceItem = customerEUPriceList && customerEUPriceList.length > 0 ? customerEUPriceList[0] : null;

  useEffect(() => {
    if (customerEUPriceItem != null) {
      setEffectiveDate(customerEUPriceItem?.effectiveDate);
    }
  }, [customerEUPriceItem])

  const methods = useForm<FormFields>({
    defaultValues: {
      effectiveDate: getDate(customerEUPriceItem?.effectiveDate),
      lastUpdated: customerEUPriceItem?.lastUpdatedString ?? '',
      originator: loggedUser.userName,
      catlogCode: '',
      custCode: contactType == contactTypeEnum.enduser ? selectedDistributor.text : '',
      enduserCode: contactType == contactTypeEnum.enduser ? selectedLeedOrCustomer.name : '',
    },
    resolver: zodResolver(customerEUPriceListFormSchema),
  });

  const saveCustPriceList = (data: FormFields) => {
    const updatedProductsLocalList = productsLocalList.map((product: any) => ({
      ...product,
      effectiveDate: data.effectiveDate,
      status: '1',
    }));
    const payload = {
      EndUserPricelist: updatedProductsLocalList,
      CustomerCode: selectedLeedOrCustomer.customerCode,
      EffectiveDate: data.effectiveDate,
      Status: '1',
      Originator: originator.userName,
      EnduserCode: ''
    }
    setIsSaving(true);
    mutation.mutate(payload, {
      onSuccess: (response: any) => {
        setIsSaving(false);
        if (response) {
          dispatch(setcustomerEUPriceList(productsLocalList));
          messageMgr.showMessage('success', 'Success: ', 'Price list updated');
          setEnableRefetch(true);
        }
      },
      onError: (error: any) => {
        setIsSaving(false);
        messageMgr.showMessage('error', 'Error: ', 'Error occured while updating Price list');
        console.error('Failed to update');
      }
    });
  }

  const saveEUPriceList = (data: FormFields) => {
    setIsSaving(true);
    const updatedProductsLocalList = productsLocalList.map((product: any) => ({
      ...product,
      status: '1',
    }));
    const payload = {
      // Args:{
      //     ChildOriginators: childOriginators,
      //     DefaultDepartmentId: originator.defaultDepartmentId,
      //     Originator: originator.userName,
      //     CustomerCode: selectedDistributor.value,
      //     EnduserCode: selectedLeedOrCustomer.endUserCode,
      //     ManagerMode: true,
      //     CustomerType: 'EndUser',
      //     StartIndex: 1,
      //     RowCount: 1000,
      //     OrderBy: 'catlog_code ASC',
      //     Status: (updatedProductsLocalList != null && updatedProductsLocalList.length > 0 ? (Number(updatedProductsLocalList[0].version) + 1).toString() : '1')
      // },
      EndUserPricelist: updatedProductsLocalList,
      EffectiveDate: data.effectiveDate,
      CustomerCode: selectedLeedOrCustomer.customerCode,
      Status: (updatedProductsLocalList != null && updatedProductsLocalList.length > 0 ? (Number(updatedProductsLocalList[0].version) + 1).toString() : '1'),
      Originator: originator.userName,
      EnduserCode: selectedLeedOrCustomer.endUserCode
    }
    mutationEnduserPriceList.mutate(payload, {
      onSuccess: (response: any) => {
        setIsSaving(false);
        if (response) {
          messageMgr.showMessage("success", "Success", "Price list updated");
          setEffectiveDate(data.effectiveDate);
          setEnableRefetch(true);
        }
      },
      onError: (error: any) => {
        setIsSaving(false);
        messageMgr.showMessage("error", "Error", "Error occured while updating price list");
        console.error('Failed to update');
      }
    });
  }

  const onSubmit = (data: FormFields) => {
    if (contactType == contactTypeEnum.customer) {
      saveCustPriceList(data);
    }
    else {
      saveEUPriceList(data);
    }
  }

  const handleExternalSubmit = () => {
    if (formRef.current) {
      formRef.current.dispatchEvent(new Event('submit', { cancelable: true, bubbles: true }));
    }
  };

  let args = {
    ChildOriginators: childOriginators,
    DefaultDepartmentId: loggedUser.defaultDepartmentId,
    Originator: loggedUser.userName,
    AdditionalParams: '',
    OrderBy: 'catlog_code ASC',
    StartIndex: 1,
    RowCount: 1000
  }

  const { data: productData, error: producttDataError, isLoading: isProductDataLoading } = useProductsLookupData(args);

  if (isProductDataLoading)
    productList = [{ label: 'Loading...', value: '' }];

  if (productData) {
    productList = productData.map((item: any) => ({
      label: item.description,
      value: item.catlogCode,
    }));
  }

  const handleCustomerSearch = async (event: any) => {
    setLoading(true);
    try {
      setSearchText(event.filter.value);
    } catch (error) {
      console.error('Error fetching data');
    } finally {
      setLoading(false);
    }
  };

  const onClickAddProduct = (e: any) => {
    e.preventDefault();

    if (selectedProduct) {
      // Check if the productCode already exists in productData
      const productExists = productsLocalList.some((product: any) => product.catlogCode.trim() === selectedProduct.value.trim());

      if (!productExists) {
        // Create a new product object
        const newProduct = {
          catlogCode: selectedProduct.value,
          description: selectedProduct.label,
          units: 0,
          price: 0,
          Market: '',
          DelFlag: '',
          Originator: '',
          ChildOriginators: '',
          DeliveryFrequency: '',
          DefaultDepartmentId: '',
          custCode: selectedLeedOrCustomer?.[contactId[contactType]],
          endUserCode: '',
          effectiveDate: new Date().toISOString(),
          lastUpdated: new Date().toISOString(),
          originator: originator.userName,
          version: 1,
          customerName: null,
          endUserName: null,
          effectiveDateString: format(new Date(), 'dd MMM yyyy'),
          lastUpdatedString: format(new Date(), 'dd MMM yyyy'),
          status: 1,
          isDirty: false,
          isNew: false,
          createdBy: null,
          createdDate: new Date().toISOString(),
          lastModifiedBy: null,
          lastModifiedDate: new Date().toISOString(),
          primaryDist: null,
          rowCount: 0
        };

        // Update the productData state
        setProductsLocalList((prevProductData: any) => [...prevProductData, newProduct]);
        setSelectedProduct(null);
        setFormErrorMessage(null);
      } else {
        setFormErrorMessage('Product already exists.');
      }
    }
  };

  const handleDeleteSelected = (type: string, rowData: any) => {
    const newProductData = productsLocalList.filter(
      (product: any) => !rowData?.catlogCode.includes(product.catlogCode)
    );
    setProductsLocalList(newProductData);
    dispatch(setSelectedCustomerEUPrice(null));
    dispatch(setIsCustomerEUPriceListTblPopupOpen(false));
  };

  const handleProductOnChange = (e: any) => {
    setSelectedProduct(e);
    setFormErrorMessage(null);
  }

  const handleViewPriceListHistory = () => {
    dispatch(setIsEnduserPriceListHistoryOpen(true));
  };

  const closeEnduserPriceListHistoryModal = () => {
    setEnableRefetch(true);
    refetch();
    dispatch(setIsEnduserPriceListHistoryOpen(false));
  }

  const onCellEdit = (e: any) => {
    let { rowData, newValue, field, originalEvent: event } = e;
    switch (field) {
      case 'price':
        if (newValue >= 0)
          rowData[field] = Number(newValue);
        else
          event.preventDefault();
        break;
      default:
        if (newValue.trim().length > 0)
          rowData[field] = newValue;
        else
          event.preventDefault();
        break;
    }

    setProductsLocalList((prevData: any) =>
      prevData.map((item: any) =>
        item.catlogCode === rowData.catlogCode ? { ...item, ...rowData } : item
      )
    );
  };

  return (
    <div className='content margin-top-20'>
      <ToastMessages ref={messagesRef} />
      <ReadOnlyProvider readOnly={false} section='contactDetailForm'>
        <form className='lead-customer-contact-detail-form' onSubmit={methods.handleSubmit(onSubmit)} ref={formRef}>
          <FormProvider {...methods}>
            <div className='form-group-container'>
              <div className="form-single-section">
                {contactType == contactTypeEnum.enduser && <FormInput label='Customer' name='custCode' isDisabled={true} />}
                {contactType == contactTypeEnum.enduser && <FormInput label='Enduser' name='enduserCode' isDisabled={true} />}
                <FormInput label='Effective Date' name='effectiveDate' type="date" />
                <FormInput label='Last Updated' name='lastUpdated' isDisabled={true} />
                <FormInput label='Originator' name='originator' isDisabled={true} />
              </div>
            </div>
            <div className='form-group-container table-form'>
              <div className="form-single-section table-single-form no-ff-margin-bottom">
                <MultiColumnComboBoxWidget
                  id={"customer-eu-price-list-products"}
                  className={"ddl-default"}
                  setValue={(e: any) => (handleProductOnChange(e))}
                  value={selectedProduct}
                  datalist={productList}
                  isFilterable={true}
                  textField={"value"}
                  isClearFilter={selectedProduct == null}
                  columns={[{ field: 'value', header: 'Product Code', width: '122px' }, { field: 'label', header: 'Product Name', width: '300px' }]} />
                <button className="btn-default" onClick={onClickAddProduct}>Add</button>
                {formErrorMessage && (
                  <span className="error-message-no-margin-top margin-left-10">{formErrorMessage}</span>
                )}
              </div>
            </div>
          </FormProvider>
        </form>
      </ReadOnlyProvider>

      <CustomerEUPriceListTable isShowDelete={true} dataList={productsLocalList} onCellEditCallback={onCellEdit}
        isEditable={true} rowPopupClickCallback={handleDeleteSelected} />

      <footer>
        <div className='form-button-container footer-content'>
          <span className='footer-span-content'>Make sure you have verified all your changes before update</span>
          {customerEUListPricePageMode === pageModeEnum.New ? (
            <ButtonWidget
              id='customer-end-user-list-price-save-button'
              classNames='k-button-md k-rounded-md k-button-solid k-button-solid-primary footer-save-button'
              Function={() => handleExternalSubmit()}
              name={isSaving ? 'Saving...' : 'Save Details'}
            />
          ) :
            (<ButtonWidget
              id='customer-end-user-list-price-update-button'
              classNames='k-button-md k-rounded-md k-button-solid k-button-solid-primary footer-save-button'
              Function={() => handleExternalSubmit()}
              name={isSaving ? 'Saving...' : 'Save Details'}
            />)}
          {contactType == contactTypeEnum.enduser ? (
            <ButtonWidget
              id='customer-end-user-list-price-list-history-button'
              classNames='k-button-md k-rounded-md k-button-solid k-button-solid-primary footer-save-button-extended'
              Function={() => handleViewPriceListHistory()}
              name={isSaving ? 'Price List History' : 'Price List History'}
            />
          ) : <></>}
        </div>
      </footer>
      <MessageBox />

      <Dialog visible={isEnduserPriceListHistoryOpen} onHide={closeEnduserPriceListHistoryModal} header='Price List History'>
        {(
          <div>
            <EnduserPriceListHistory msgMgr={messageMgr} effectiveDate={effectiveDate} />
          </div>
        )}
      </Dialog>
    </div>
  )
}