import { RootState, setIsDocumentTblDeletePopupOpen, setSelectedDocument } from "@peerless-cms/store";
import { useDispatch, useSelector } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import * as fa from '@fortawesome/free-solid-svg-icons';
import SectionMainBase from "../../../lib/section-main-base";
import FeaturesBase from "../../../lib/features-base";
import './leed-customer-documents.css';
import React, { useEffect, useRef } from "react";
import { documentService } from "@peerless/services";
import { useMutation } from "@tanstack/react-query";
import { getLeadCustomerDocumentList, saveDocument, deleteDocument, downloadDocument } from "@peerless/queries";
import { useInView } from "react-intersection-observer";
import { contactId, contactTypeEnum, contactTypeName } from "@peerless/utils";
import { DocumentGrid } from "@peerless/common";
import { DataGrid, ToastManager } from "@peerless/controls";
import { Dialog } from "primereact/dialog";
import ToastMessages from "libs/controls/src/toasts-message/messages";
import { RenderStatusContentTable } from "@peerless/models";
import { ConfirmDialog } from "primereact/confirmdialog";

export interface LeedCustomerDocumentsProps { }

export function LeedCustomerDocuments(props: LeedCustomerDocumentsProps) {
  const dispatch = useDispatch();
  const { ref, inView } = useInView({ triggerOnce: false });
  const messagesRef = useRef<any>(null);
  const messageMgr = new ToastManager(messagesRef);

  const [dragging, setDragging] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);
  const [message, setMessage] = React.useState<string | null>(null);
  const [isProcessing, setIsProcessing] = React.useState(false);

  const { selectedLeedOrCustomer, originator, loggedUser, selectedDocument, childOriginators, isDocumentTblDeletePopupOpen, contactType } = useSelector((state: RootState) => ({
    selectedLeedOrCustomer: state.leedsAndCustomers.selectedLeedOrCustomer,
    originator: state.header.selectedOriginator,
    loggedUser: state.header.loggedUser,
    selectedDocument: state.leedsAndCustomers.selectedDocument,
    childOriginators: state.header.childOriginators,
    isDocumentTblDeletePopupOpen: state.modal.isDocumentTblDeletePopupOpen,
    contactType: state.leedsAndCustomers.selectedContactType,
  }));

  const mutationSaveFile = useMutation<any, Error, any>({
    mutationFn: saveDocument
  });

  const mutationDeleteFile = useMutation<any, Error, any>({
    mutationFn: deleteDocument
  });

  const mutationDownloadFile = useMutation<any, Error, any>({
    mutationFn: downloadDocument
  });

  const openConfirmModel = (type: string, row: any) => {
    dispatch(setSelectedDocument(row));
    dispatch(setIsDocumentTblDeletePopupOpen(true));
  };

  const closeModal = () => {
    dispatch(setIsDocumentTblDeletePopupOpen(false));
  };

  const deleteSelectedDocument = async () => {
    setIsProcessing(true);
    let documentID = selectedDocument.documentID
    let response = await mutationDeleteFile.mutateAsync(documentID);
    dispatch(setIsDocumentTblDeletePopupOpen(false));
    setIsProcessing(false);
    refetch();
    if (response) {
      messageMgr.showMessage('success', 'Success: ', 'Document deleted');
    }
    else {
      messageMgr.showMessage('error', 'Error: ', 'Error occurred while deleting the document');
    }
  }

  const handleDragOver = (event: any) => {
    event.preventDefault();
    setDragging(true);
  };

  const handleDragLeave = () => {
    setDragging(false);
  };

  const allowedExtensions = /\.(pdf|doc|docx|ppt|pptx|xls|xlsx|txt)$/i;

  const handleDrop = (event: any) => {
    event.preventDefault();
    setDragging(false);
    setError(null);

    const files = Array.from(event.dataTransfer.files);

    const validFiles = files.filter((file: any) => {
      if (!allowedExtensions.test(file.name)) {
        setError(`File ${file.name} is not an allowed type.`);
        return false;
      }
      return true;
    });

    if (validFiles.length) {
      uploadFiles(validFiles);
    }
  };

  const handleFileUpload = (event: any) => {
    setError(null);
    const files = Array.from(event.target.files);

    const validFiles = files.filter((file: any) => {
      if (!allowedExtensions.test(file.name)) {
        setError(`File ${file.name} is not an allowed type.`);
        return false;
      }
      return true;
    });

    if (validFiles.length) {
      uploadFiles(validFiles);
    }
  };

  const uploadFiles = async (validFiles: any) => {
    try {
      const uploadedFiles = []; // To collect successfully uploaded file names

      for (const file of validFiles) {
        const base64String = await documentService.readAndConvertFileToBase64(file);

        const lastDotIndex = file.name.lastIndexOf('.');
        const fileName = lastDotIndex !== -1 ? file.name.substring(0, lastDotIndex) : file.name;
        const extension = lastDotIndex !== -1 ? file.name.substring(lastDotIndex + 1) : '';

        const filePayload = {
          fileContent: base64String,
          Content: base64String,
          AttachedDate: new Date().toISOString(),
          LastModifiedDate: new Date().toISOString(),
          DocumentID: 0,
          LeadID: contactType == contactTypeEnum.lead ? selectedLeedOrCustomer?.[contactId[contactType]] : 0,
          AttachedBy: loggedUser.userName,
          CustCode: contactType != contactTypeEnum.lead ? selectedLeedOrCustomer.customerCode : '',
          fileName: fileName,
          DocumentName: fileName,
          LastModifiedBy: loggedUser.userName,
          Path: `tmp_${new Date().getMinutes().toString()}_${fileName.trim()}_${selectedLeedOrCustomer?.[contactId[contactType]].toString()}.${extension}`,
          Extention: extension,
          TempFileName: `tmp_${new Date().getMinutes().toString()}_${fileName.trim()}_${selectedLeedOrCustomer?.[contactId[contactType]].toString()}.${extension}`,
          FileLocation: '',
          EnduserCode: contactType == contactTypeEnum.enduser ? selectedLeedOrCustomer.endUserCode : '',
          CustomerType: '',
          Originator: originator.userName,
          ChildOriginators: childOriginators,
          DefaultDepartmentId: loggedUser.defaultDepartmentId
        };

        // Upload file and wait for completion
        setMessage(`Uploading ${file.name}...`);
        messageMgr.showMessage('success', '', `Uploading ${file.name}...`);
        await mutationSaveFile.mutateAsync(filePayload);

        uploadedFiles.push(file.name); // Add to successful uploads
      }

      // After all uploads
      refetch();
      messageMgr.showMessage('success', 'Success: ', 'Files uploaded');
      setMessage(`${uploadedFiles.join(', ')} ${uploadedFiles.length > 1 ? 'are' : 'is'} successfully uploaded.`);
    } catch (error) {
      console.error('Error uploading files');
    }
  };

  let args: any = {
    LeadId: selectedLeedOrCustomer?.sourceId,
    CustomerType: 'Lead',
    DefaultDepartmentId: loggedUser.defaultDepartmentId,
    //AdditionalParams:'',
    //ChildOriginators: ` (originator = '${originator.userName}')`, 
    OrderBy: "attached_date desc",
    StartIndex: 1,
    RowCount: 50
  }

  if (contactType != contactTypeEnum.lead) {
    args = {
      ChildOriginators: childOriginators,
      DefaultDepartmentId: loggedUser.defaultDepartmentId,
      Originator: loggedUser.userName,
      CustomerCode: selectedLeedOrCustomer.customerCode,
      EnduserCode: contactType == contactTypeEnum.enduser ? selectedLeedOrCustomer.endUserCode : '',
      ManagerMode: true,
      CustomerType: contactType == contactTypeEnum.customer ? 'Customer' : 'EndUser',
      OrderBy: "attached_date desc",
      StartIndex: 1,
      RowCount: 50
    }
  }

  const payload = { args, path: 'dummyPath', sessionID: new Date().getMinutes().toString(), isSavedDocs: true };
  const { leadCustomerDocumentData, error: err, status, isLoading, fetchNextPage, isFetchingNextPage, hasNextPage, refetch } = getLeadCustomerDocumentList(payload);

  useEffect(() => {
    if (inView && hasNextPage && !isFetchingNextPage) {
      fetchNextPage().then(result => {
      }).catch(error => {
        console.error("Error fetching next page");
      });
    }
  }, [fetchNextPage, inView]);

  useEffect(() => {
    // Clear the error message after 5 seconds if there's an error
    if (error || message) {
      const timer = setTimeout(() => {
        setError(null);
        setMessage(null);
      }, 5000);

      // Clean up the timer if the component unmounts or error changes
      return () => clearTimeout(timer);
    }
  }, [error, message]);


  const downloadFile = async (rowData: any) => {
    try {
      let documentID = rowData.documentID;

      // Resolve the promise and get the documentEntity
      const documentEntity = await mutationDownloadFile.mutateAsync(documentID);

      // Get the file extension from the extension property
      const extention = documentEntity.extention || ''; // Use the extension property, default to empty if unavailable

      // If content is available, decode it, otherwise create an empty Blob
      let blob: Blob;
      if (documentEntity && documentEntity.content) {
        // Decode base64 content into a Blob
        const byteCharacters = atob(documentEntity.content); // Decode base64
        const byteNumbers = Array.from(byteCharacters, (char) => char.charCodeAt(0));
        const byteArray = new Uint8Array(byteNumbers);

        blob = new Blob([byteArray], { type: "application/octet-stream" });
      } else {
        // Create an empty Blob if there is no content
        blob = new Blob([], { type: "application/octet-stream" });
      }

      // Create a URL for the Blob
      const url = window.URL.createObjectURL(blob);

      // Create an anchor element to trigger the download
      const a = document.createElement("a");
      a.href = url;
      a.download = `${documentEntity.documentName || "downloaded_file"}${extention ? extention : ''}`; // Append the extension
      document.body.appendChild(a);
      a.click();

      // Clean up
      window.URL.revokeObjectURL(url);
      a.remove();
    } catch (error) {
      console.error("Error downloading file");
    }
  };

  const renderStatusContent = {
    isRenderStatusContentTable: true,
    status: status,
    isFetch: isLoading,
    error: error,
    isStatusOutput: true
  } as RenderStatusContentTable;

  let documentGrid = new DocumentGrid(openConfirmModel, downloadFile);

  const header = (
    <div className="lead-customer-detail-section-header-container">
      <span className="center-align section-title">
        {contactTypeName[contactType]}
        <FontAwesomeIcon icon={fa.faChevronRight} className="breadcrumb-separator" />
        <span className="center-align"><FontAwesomeIcon className="header-icon" icon={fa.faFileAlt} size='1x' />Documents</span>
        <span className="font-light">&nbsp; | &nbsp;</span>
        <span className="center-align section-title font-light">{`(${selectedLeedOrCustomer?.name})`}</span>
      </span>
    </div>
  );

  const mainContent = (
    <>
      <ToastMessages ref={messagesRef} />
      <DataGrid dataTable={documentGrid} data={leadCustomerDocumentData} renderStatusContent={renderStatusContent} />
      <div ref={ref} style={{ height: '1px' }} />
      <ConfirmDialog
        visible={isDocumentTblDeletePopupOpen}
        onHide={closeModal}
        message="Are you sure you want to delete this document?"
        header="Confirmation"
        icon="pi pi-exclamation-triangle"
        acceptLabel={isProcessing ? 'Deleting...' : 'Yes'}
        accept={deleteSelectedDocument}  // Function to call on accept
        reject={closeModal}  // Function to call on reject
        className="confirm-dialog-btn-swap" // Custom class to swap yes/no buttons
      />
    </>
  );

  const article = (
    <div className={`upload-container ${dragging ? "dragging" : ""}`}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}>
      <div className="upload-icon">
        <FontAwesomeIcon icon={fa.faArrowUpFromBracket} size="4x" />
      </div>
      <div className="upload-text">
        <p>Upload Documents</p>
        <p className="instruction">Select or drag and drop here</p>
        {error && <p className="error-message">{error}</p>}
        {message && <p className="success-message">{message}</p>}
      </div>
      <input
        type="file"
        multiple
        className="file-input"
        onChange={handleFileUpload}
        accept=".pdf, .doc, .docx, .ppt, .pptx, .xls, .xlsx, .txt"
      />
    </div>
  );

  const sectionMain = (
    <FeaturesBase main={mainContent} article={article} ></FeaturesBase>
  );

  return <SectionMainBase header={header} main={sectionMain}></SectionMainBase>;

}