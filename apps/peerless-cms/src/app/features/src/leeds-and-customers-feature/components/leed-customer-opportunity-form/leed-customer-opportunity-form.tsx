import { zodResolver } from "@hookform/resolvers/zod";
import { pageModeEnum, RootState, setSelectedOpportunity } from "@peerless-cms/store";
import { ButtonWidget, DataGrid, FormInput, MultiColumnComboBoxWidget, ToastManager } from "@peerless/controls";
import { ReadOnlyProvider } from "@peerless/providers";
import { useEffect, useRef, useState } from "react";
import { Button } from "react-bootstrap";
import { FormProvider, useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { z } from "zod";
import './leed-customer-opportunity-form.css';
import SectionMainBase from "../../../lib/section-main-base";
import { Slider, SliderLabel } from "@progress/kendo-react-inputs";
import { getLeadCustomerOpportunityProductList, saveLeadOpportunity, usePipelineStageData, useQueryBasedLookupData } from "@peerless/queries";
import { getDate, OpportunityEditGrid } from "@peerless/common";
import { useInView } from "react-intersection-observer";
import { useMutation } from "@tanstack/react-query";
import { contactId, contactTypeEnum, sectionPathMap } from "@peerless/utils";
import ToastMessages from "libs/controls/src/toasts-message/messages";
import { toast } from "sonner";

export interface LeedCustomerOpportunityFormProps { }

export function LeedCustomerOpportunityForm(props: LeedCustomerOpportunityFormProps) {
  const formRef = useRef<HTMLFormElement | null>(null);
  const messagesRef = useRef<any>(null);
  const dispatch = useDispatch();
  type FormFields = z.infer<typeof leedCustomerOpportunityFormSchema>;
  const navigate = useNavigate();
  const { ref, inView } = useInView({ triggerOnce: false });
  const [isSaving, setIsSaving] = useState(false);
  const messageMgr = new ToastManager(messagesRef);
  const [olQueryEnabled, setOlQueryEnabled] = useState(false);

  const { selectedLeedOrCustomer, originator, loggedUser, opportunityPageMode, selectedOpportunity, childOriginators, contactType } = useSelector((state: RootState) => ({
    selectedLeedOrCustomer: state.leedsAndCustomers.selectedLeedOrCustomer,
    originator: state.header.selectedOriginator,
    loggedUser: state.header.loggedUser,
    opportunityPageMode: state.leedsAndCustomers.opportunityPageMode,
    selectedOpportunity: state.leedsAndCustomers.selectedOpportunity,
    childOriginators: state.header.childOriginators,
    contactType: state.leedsAndCustomers.selectedContactType,
  }));

  const mutation = useMutation<any, Error, any>({
    mutationFn: saveLeadOpportunity
  });

  let originatorList: any = [];
  let pipelineStageList: any = [];

  let lookupSqlKey = 'OriginatorLookup';
  let whereCls = childOriginators;
  let parameters: any = null;
  let hasArgs = false;
  let args = {
    StartIndex: 1,
    RowCount: 1000,
    RepCode: ''
  }

  let payload = { lookupSqlKey, whereCls, parameters, args, hasArgs };

  useEffect(() => {
    if (childOriginators) {
      whereCls = childOriginators;
      payload = { lookupSqlKey, whereCls, parameters, args, hasArgs };
      setOlQueryEnabled(true);
    }
    else {
      setOlQueryEnabled(false);
    }
  }, [childOriginators]);


  const { data: originatorListData, error: originatorListError, isLoading: isOriginatorsLoading } = useQueryBasedLookupData(payload, olQueryEnabled);

  if (isOriginatorsLoading)
    originatorList = [{ label: 'Loading...', value: '' }];

  if (originatorListData) {
    originatorList = originatorListData.map((item: { description: any; code: any; }) => ({
      label: item.description,
      value: item.code,
    }));
  }

  let pipelineStagePayload = { defaultDepartmentId: originator.defaultDepartmentId };
  const { data: pipelineStageListData, error: pipelineStageListError, isLoading: isPipelineStageListLoading } = usePipelineStageData(pipelineStagePayload);

  if (isPipelineStageListLoading)
    pipelineStageList = [{ label: 'Loading...', value: '' }];

  if (pipelineStageListData) {
    pipelineStageList = pipelineStageListData.map((item: { pipelineStageName: any; pipelineStageID: any; }) => ({
      label: item.pipelineStageName,
      value: item.pipelineStageID,
    }));
  }

  const [productList, setProductList] = useState<{ label: string; value: string }[]>([]);
  const [selectedProduct, setSelectedProduct] = useState<{ label: string; value: string } | null>(null);
  const [formErrorMessage, setFormErrorMessage] = useState<string | null>(null);
  lookupSqlKey = 'CatalogLookup';
  whereCls = " AND rm.rep_code = '" + loggedUser.repCode + "'";;
  parameters = null;
  hasArgs = false;
  args = {
    StartIndex: 1,
    RowCount: 1000,
    RepCode: loggedUser.repCode
  }
  payload = { lookupSqlKey, whereCls, parameters, args, hasArgs };
  const { data: productListData, error: productListError, isLoading: isProductLoading } = useQueryBasedLookupData(payload);

  useEffect(() => {
    let products = [];
    if (isProductLoading) {
      // Set loading state
      products = [{ label: 'Loading...', value: '' }];
    } else if (productListData) {
      // Map data to the format required for the ComboBox
      products = productListData.map((item: { description: string; code: string }) => ({
        label: item.description + ' - ' + item.code,
        value: item.code,
      }));
    }

    // Update state with new products
    setProductList(products);
  }, [isProductLoading, productListData]);

  const handleProductComboChange = (event: any) => {
    setSelectedProduct(event);
    setFormErrorMessage(null);
  };

  const leedCustomerOpportunityFormSchema = z.object({
    name: z.coerce.string().min(1, { message: 'Opportunity is required' }),
    organisation: z.coerce.string(),
    customer: z.coerce.string(),
    endUser: z.coerce.string(),
    assignedTo: z.coerce.string(),
    description: z.coerce.string(),
    colseDate: z.coerce.string(),
    stage: z.coerce.string(),
    probability: z.coerce.number(),
    amount: z.coerce.number().positive()
  });

  const methods = useForm<FormFields>({
    defaultValues: {
      name: opportunityPageMode === pageModeEnum.New ? '' : selectedOpportunity.name,
      organisation: contactType == contactTypeEnum.lead ? selectedLeedOrCustomer.name : '',
      customer: contactType == contactTypeEnum.customer ? selectedLeedOrCustomer.name : contactType == contactTypeEnum.enduser ? selectedLeedOrCustomer.customerName : '',
      endUser: contactType == contactTypeEnum.enduser ? selectedLeedOrCustomer.name : '',
      assignedTo: opportunityPageMode === pageModeEnum.New ? loggedUser.userName : selectedOpportunity.originator,
      description: opportunityPageMode === pageModeEnum.New ? '' : selectedOpportunity.description,
      colseDate: (opportunityPageMode === pageModeEnum.New ? getDate() : (selectedOpportunity.closeDate ? getDate(selectedOpportunity.closeDate) : '')),
      stage: opportunityPageMode === pageModeEnum.New ? '1' : selectedOpportunity.stage.toString(),
      probability: opportunityPageMode === pageModeEnum.New ? 0 : (Number(selectedOpportunity.probability)),
      amount: opportunityPageMode === pageModeEnum.New ? 0 : Number(selectedOpportunity.amount),
    },
    resolver: zodResolver(leedCustomerOpportunityFormSchema),
  });

  const onSubmit = (data: FormFields) => {
    setIsSaving(true);
    const payload = {
      StartDate: new Date().toISOString(),
      EndDate: new Date().toISOString(),
      AdditionalParams: "",
      StartIndex: 0,
      RowCount: 0,
      RepType: "",
      IsNew: true,
      ChildOriginators: "",
      DefaultDepartmentId: "",
      OpportunityID: opportunityPageMode === pageModeEnum.New ? 0 : selectedOpportunity.opportunityID,
      LeadID: contactType == contactTypeEnum.lead ? selectedLeedOrCustomer?.[contactId[contactType]] : 0,
      Originator: data.assignedTo,
      RepGroupID: 0,
      Name: data.name,
      CloseDate: data.colseDate,
      Stage: data.stage,
      Probability: Number(probability),
      Amount: Number(data.amount),
      Description: data.description,
      CreatedDate: new Date().toISOString(),
      CreatedBy: loggedUser.userName,
      LastModifiedDate: new Date().toISOString(),
      LastModifiedBy: loggedUser.userName,
      CustCode: contactType != contactTypeEnum.lead ? selectedLeedOrCustomer.customerCode : '',
      PipelineStage: "",
      OpportunityCount: 0,
      Units: 0,
      LeadName: "",
      Business: "",
      Industry: "",
      IndustryDescription: "",
      Address: "",
      City: "",
      State: "",
      PostCode: "",
      LeadStage: "",
      PipelineStageCount: 0,
      PipelineStageId: 0,
      LastActivityDate: new Date().toISOString(),
      UnitString: "",
      Tonnes: 0,
      EndUserCode: contactType == contactTypeEnum.enduser ? selectedLeedOrCustomer.endUserCode : '',
      Products: productData
    }
    mutation.mutate(payload, {
      onSuccess: (response: any) => {
        setIsSaving(false);
        if (response.isSuccess) {
          if (opportunityPageMode == pageModeEnum.Edit) {
            let updatedOpportunity = {
              ...selectedOpportunity,
              name: data.name,
              organisation: selectedLeedOrCustomer.name,
              customer: '',
              endUser: '',
              assignedTo: data.assignedTo,
              description: data.description,
              colseDate: data.colseDate,
              stage: data.stage,
              probability: probability,
              amount: data.amount
            }
            dispatch(setSelectedOpportunity(updatedOpportunity));
            toast.success('Opportunity updated successfully');
          }
          else {
            toast.success('Opportunity created successfully');
            navigate(`${sectionPathMap[contactType]}${selectedLeedOrCustomer?.[contactId[contactType]]}/opportunity`);
          }
        }
      },
      onError: (error: any) => {
        setIsSaving(false);
        toast.error('Failed to update lead');
        console.error(error.message);
      }
    });
  };

  const handleExternalSubmit = () => {
    if (!productData || productData.length == 0) {
      setFormErrorMessage('Please add products.');
      return;
    }
    if (formRef.current) {
      formRef.current.dispatchEvent(new Event('submit', { cancelable: true, bubbles: true }));
    }
  };

  const handleSliderChange = (event: any) => {
    setValue(Math.round(event.value));
  };
  const [probability, setValue] = useState(Math.round(Number(methods.formState.defaultValues?.probability)));
  const customLabels = [0, 10, 20, 30, 40, 50, 60, 70, 80, 90, 100];

  const [selectedRows, setSelectedRows] = useState<string[]>([]);

  const handleDeleteSelected = () => {
    const newProductData = productData.filter(
      (product) => !selectedRows.some((row: any) => row.catlogCode === product.catlogCode)
    );
    setProductData(newProductData);
    setSelectedRows([]); // Clear selected rows after deletion
  };

  const [productData, setProductData] = useState<{
    catlogCode: string, description: string, units: number,
    price: number, Market: string, DelFlag: string, Originator: string, ChildOriginators: string,
    DeliveryFrequency: string, DefaultDepartmentId: string
  }[]>([]);

  let prodArgs = {
    StartIndex: 1,
    RowCount: 50
  }

  const opportunityId = selectedOpportunity?.opportunityID ?? 0;
  const payloadProd = { args: prodArgs, opportunityId };
  const { leadCustomerOpportunityProductsData, error, status, fetchNextPage, isFetchingNextPage, hasNextPage } = getLeadCustomerOpportunityProductList(payloadProd);

  const onClickAddProduct = () => {
    if (selectedProduct) {
      // Check if the productCode already exists in productData
      const productExists = productData.some(product => product.catlogCode === selectedProduct.value);

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
          DefaultDepartmentId: ''
        };

        // Update the productData state
        setProductData(prevProductData => [...prevProductData, newProduct]);
        setSelectedProduct(null);
        setFormErrorMessage(null);
      } else {
        setFormErrorMessage('Product already exists');
      }
    }
  };

  const onError = (errors: any) => {
    console.log('Validation errors');
  };

  useEffect(() => {
    if (inView && hasNextPage && !isFetchingNextPage) {
      fetchNextPage().then(result => {
      }).catch(error => {
        console.error("Error fetching next page");
      });
    }
  }, [fetchNextPage, inView]);

  const addedProductCodes = useRef<Set<string>>(new Set());

  useEffect(() => {
    if (status === 'success' && leadCustomerOpportunityProductsData) {
      // Filter products that have already been added
      const newProducts = leadCustomerOpportunityProductsData
        .filter(newProduct => {
          if (!addedProductCodes.current.has(newProduct.catlogCode)) {
            addedProductCodes.current.add(newProduct.catlogCode);
            return true;
          }
          return false;
        })
        .map(newProduct => ({
          ...newProduct,
          Market: '',
          DelFlag: '',
          Originator: '',
          ChildOriginators: '',
          DeliveryFrequency: '',
          DefaultDepartmentId: ''
        }));

      if (newProducts.length > 0) {
        setProductData(prevProductData => [...prevProductData, ...newProducts]);
      }
    }
  }, [status, leadCustomerOpportunityProductsData]);

  if (status === 'pending') {
    return <div>Loading...</div>;
  }

  if (status === 'error') {
    return <div>{error?.message}</div>;
  }

  const onCellEdit = (e: any) => {
    let { rowData, newValue, field, originalEvent: event } = e;

    switch (field) {
      case 'units':
        if (newValue >= 0)
          rowData[field] = Number(newValue);
        else
          event.preventDefault();
        break;
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

    setProductData((prevData: any) =>
      prevData.map((item: any) =>
        item.catlogCode === rowData.catlogCode ? { ...item, ...rowData } : item
      )
    );

  };

  const handleSelectionChange = (val: any) => {
    setSelectedRows(val);
  };

  let opportunityEditGrid = new OpportunityEditGrid(onCellEdit);
  const main = (
    <div className='content margin-top-20'>
      <ToastMessages ref={messagesRef} />
      <ReadOnlyProvider readOnly={false} section='contactDetailForm'>
        <form className='lead-customer-contact-detail-form' onSubmit={methods.handleSubmit(onSubmit, onError)} ref={formRef}>
          <FormProvider {...methods}>
            <div className='form-group-container'>
              <div className='form-group'>
                <span>Opportunity Details</span>
                <FormInput label='Opportunity' name='name' required={true} />
                <FormInput label='Organisation' name='organisation' isDisabled={true} />
                <FormInput label='Customer' name='customer' isDisabled={true} />
                <FormInput label='End User' name='endUser' isDisabled={true} />
                <FormInput label='Assigned To' name='assignedTo' type="select" comboBoxOptions={originatorList} />
              </div>
              <div className='form-group'>
                <span>Probability</span>
                <FormInput label='Stage' name='stage' type="select" comboBoxOptions={pipelineStageList} />
                <div className="slider-container">
                  <label className="value-display">Probability: {probability}</label>
                  <Slider
                    value={probability}
                    onChange={handleSliderChange}
                    min={0}
                    max={100}
                    step={10}
                    buttons={false}>
                    {customLabels.map((label) => (
                      <SliderLabel key={label} position={probability} title={probability.toString()}>
                        <span className="slider-label">{label}</span>
                      </SliderLabel>
                    ))}
                  </Slider>
                </div>
                <FormInput label='Amount $' name='amount' type="number" required={true} />
              </div>
              <div className='form-group'>
                <span>Other</span>
                <FormInput label='Close Date' name='colseDate' type="date" />
                <FormInput label='Description' name='description' type="textarea" />
              </div>
            </div>
          </FormProvider>
        </form>
      </ReadOnlyProvider>

      <div className="products-container">
        <div className="form-group-horizontal">
          <label>Products</label>
          <div className="inline-container">
            <MultiColumnComboBoxWidget
              id={"customer-eu-price-list-products"}
              className={"cmb-products width-medium-ddl"}
              setValue={(e: any) => (handleProductComboChange(e))}
              value={selectedProduct}
              datalist={productList}
              isFilterable={true}
              textField={"value"}
              isClearFilter={selectedProduct == null}
              columns={[{ field: 'value', header: 'Product Code', width: '122px' }, { field: 'label', header: 'Product Name', width: '300px' }]} />
            <input type="button" value="Add" className="btn-default" onClick={onClickAddProduct} />
            {selectedRows.length > 0 && (
              <button className="btn-delete" onClick={handleDeleteSelected}>Delete</button>
            )}
            {formErrorMessage && (
              <span className="error-message margin-left-10 margin-top-0">{formErrorMessage}</span>
            )}
          </div>
        </div>
        <div className="opportunity-products-container">
          <DataGrid dataTable={opportunityEditGrid} data={productData} editMode={'cell'} selectionMode={'multiple'} selectedRow={selectedRows} setSelectedRow={handleSelectionChange} />
          <div ref={ref} style={{ height: '1px' }} />
        </div>
      </div>
    </div>
  )

  const footer = (
    <div className='form-button-container footer-content'>
      <span className='footer-span-content'>Make sure you have verified all your changes before update</span>
      <ButtonWidget
        id='customer-opportunities-save-button'
        classNames='k-button-md k-rounded-md k-button-solid k-button-solid-primary footer-save-button'
        Function={() => handleExternalSubmit()}
        name={opportunityPageMode === pageModeEnum.New ? (isSaving ? 'Saving...' : 'Save Details') : (isSaving ? 'Updating...' : 'Update Details')}
      />
    </div>
  )

  return (<SectionMainBase main={main} footer={footer}></SectionMainBase>)
}
