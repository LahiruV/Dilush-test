import { pageModeEnum, RootState, setActivityPageMode, setIsActivityTblPopupOpen, setSelectedActivity } from "@peerless-cms/store";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getLeadCustomerActivityList, InsertAppointment } from "@peerless/queries";
import { useInView } from "react-intersection-observer";
import { useEffect, useRef, useState } from "react";
import { contactId, contactTypeEnum, sectionPathMap } from "@peerless/utils";
import './leed-customer-activity-list.css'
import { DataGrid, ToastManager } from "@peerless/controls";
import { ActivityGrid } from "@peerless/common";
import { useMutation } from "@tanstack/react-query";
import ToastMessages from "libs/controls/src/toasts-message/messages";
import { RenderStatusContentTable } from "@peerless/models";
import { toast } from "sonner";

export interface LeedCustomerActivityListProps { }

export function LeedCustomerActivityList(props: LeedCustomerActivityListProps) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const messagesRef = useRef<any>(null);
  const messageMgr = new ToastManager(messagesRef);

  const { ref, inView } = useInView({ triggerOnce: false });
  const { selectedLeedOrCustomer, loggedUser, originator, contactType, selectedOrganisation } = useSelector((state: RootState) => ({
    selectedLeedOrCustomer: state.leedsAndCustomers.selectedLeedOrCustomer,
    loggedUser: state.header.loggedUser,
    originator: state.header.selectedOriginator,
    contactType: state.leedsAndCustomers.selectedContactType,
    selectedOrganisation: state.organisations.selectedOrganisation,
  }));

  const mutationAppointment = useMutation<any, Error, any>({
    mutationFn: InsertAppointment
  });

  useEffect(() => {
    if (dispatch) {
      dispatch(setActivityPageMode(pageModeEnum.List));
    }
  }, [dispatch])

  const closeModal = () => {
    dispatch(setIsActivityTblPopupOpen(false));
  };

  let args: any = { //lead
    LeadId: selectedLeedOrCustomer?.[contactId[contactType]],
    DefaultDepartmentId: loggedUser.defaultDepartmentId,
    AdditionalParams: '',
    ChildOriginators: ` (originator = '${originator.userName}')`,
    OrderBy: "start_date desc",
    StartIndex: 1,
    RowCount: 50
  }

  if (contactType == contactTypeEnum.customer) { //customer
    args = {
      ChildOriginators: ` (originator = '${originator.userName}')`,
      DefaultDepartmentId: loggedUser.defaultDepartmentId,
      Originator: originator.userName,
      RepCode: loggedUser.repCode,
      CustomerCode: selectedLeedOrCustomer?.[contactId[contactType]],
      ManagerMode: true,
      OrderBy: "start_date desc",
      StartIndex: 1,
      RowCount: 50
    }
  }

  if (contactType == contactTypeEnum.enduser) { //enduser
    args = {
      ChildOriginators: ` (originator = '${originator.userName}')`,
      DefaultDepartmentId: loggedUser.defaultDepartmentId,
      Originator: originator.userName,
      CustomerCode: selectedLeedOrCustomer.customerCode,
      EnduserCode: selectedLeedOrCustomer?.[contactId[contactType]],
      ManagerMode: true,
      OrderBy: "start_date desc",
      StartIndex: 1,
      RowCount: 50
    }
  }

  if (contactType == contactTypeEnum.organisation) { //organisation
    args = {
      OrganisationId: selectedOrganisation.orgnaisationID,
      OrderBy: "start_date desc",
      AddParams: '',
      ChildReps: '',
      DefaultDepartmentId: loggedUser.defaultDepartmentId,
      OrgName: '',
      originator: originator.userName,
      ColumnFilter: '',
      StartIndex: 1,
      RowCount: 50
    }
  }

  const payload = { args };
  const { leadCustomerRelatedActivityData, error, status, isLoading, fetchNextPage, isFetchingNextPage, hasNextPage, refetch } = getLeadCustomerActivityList(payload, contactType, 100);

  const handleRowPopupClick = (type: string, rowData: any) => {
    if (type == 'edit') {
      dispatch(setSelectedActivity(rowData));
      dispatch(setActivityPageMode(pageModeEnum.Edit));
      navigate(`${sectionPathMap[contactType]}${contactType == contactTypeEnum.organisation ? selectedOrganisation?.[contactId[contactType]] : selectedLeedOrCustomer?.[contactId[contactType]]}/activity/update`);
    }
    else if (type == 'sendToCalendar') {
      let appointmentRequest = {
        Appointment: {
          Subject: rowData.subject,
          Body: rowData.comments,
          StartTime: rowData.startDate,
          EndTime: rowData.endDate,
          Category: rowData.activityType,
          CreatedBy: loggedUser.userName
        },
        IsUpdateActivity: true,
        ActivityId: rowData.activityID

      }
      mutationAppointment.mutate(appointmentRequest, {
        onSuccess: (response) => {
          refetch();
          // messageMgr.showMessage('success', 'Success: ', 'Sent to calendar');
          toast.success('Sent to calendar');
        },
        onError: (error) => {
          // messageMgr.showMessage('error', 'Error: ', 'Error occured');
          toast.error('Failed to send to calendar');
        }
      });
    }
    closeModal();
  };

  const rowStyle = (rowData: any) => {
    return rowData.appointmentID != 0 ? 'row-highlight-calendar' : '';
  }

  useEffect(() => {
    if (inView && hasNextPage && !isFetchingNextPage) {
      fetchNextPage().then(result => {
      }).catch(error => {
        console.error("Error fetching next page");
      });
    }
  }, [fetchNextPage, inView]);

  const renderStatusContent = {
    isRenderStatusContentTable: true,
    status: status,
    isFetch: isLoading,
    error: error,
    isStatusOutput: true
  } as RenderStatusContentTable;

  let activityGrid = new ActivityGrid(handleRowPopupClick, contactType);
  return (
    <div>
      <ToastMessages ref={messagesRef} />
      <div className="indicator-container">
        <span className="appointment-indicator-color"></span>
        <span className="appointment-indicator-text">Sent To Calendar</span>
      </div>
      <DataGrid
        dataTable={activityGrid}
        data={leadCustomerRelatedActivityData}
        rowClassName={rowStyle}
        renderStatusContent={renderStatusContent}
        enablePagination={true}
        isScrollable={true}
        isAutoScrollHeight={true}
        cssClasses={'sticky-header'}
        pageSize={10}
      />
    </div>
  );
}