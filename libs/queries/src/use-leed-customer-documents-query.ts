import { getAxiosInstance } from "@peerless/services";
import { DocumentAPI } from "@peerless/utils";
import {  useInfiniteQuery, useQuery } from "@tanstack/react-query";
import axios from "axios";
import path from "path";
import { Attributes } from "react";

const SaveDocumentUrl =  DocumentAPI.Save_document;
const GetDocumentListUrl =  DocumentAPI.Get_Documents_For_Entry_Pages;
const DeleteLeadDocumentUrl = DocumentAPI.Delete_Lead_Document;
const GetDocumentUrl = DocumentAPI.Get_Document;

const fetchLeadCustomerDocumentata = async ({ pageParam }: { pageParam: { startIndex: number, rowCount: number,payload: { args: any, path: string, sessionID: string, isSavedDocs: boolean} } }): 
        Promise<{ data: any, nextPageParam: { startIndex: number, rowCount: number, payload: { args: any, path: string, sessionID: string, isSavedDocs: boolean } } | null }> => {
  const { startIndex, rowCount, payload } = pageParam;  
  payload.args.StartIndex = startIndex;
  payload.args.RowCount = rowCount;
  
  try {    
    const response = await getAxiosInstance().post<any>(
      GetDocumentListUrl + '?path=' + payload.path + '&sessionID=' + payload.sessionID + '&issavedocument=' + payload.isSavedDocs, 
      payload.args
    );

    const  items = response.data;
    const nextStartIndex = startIndex + 1;     
    const hasMoreData = items.length === rowCount; 

    return {
      data: items,
      nextPageParam: hasMoreData ? { startIndex: nextStartIndex, rowCount, payload } : null,  
    };
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error('Request failed with status:', error.response?.status);
      console.error('Response data:', error.response?.data);
    } else {
      console.error('An unexpected error occurred:', error);
    }
    throw error; 
  }
};

export const getLeadCustomerDocumentList = (payload: any, initialRowCount = 10) => {  
    const {
      data,
      error,
      status,
      isLoading,
      fetchNextPage,
      isFetchingNextPage,
      hasNextPage, 
      refetch,
    } = useInfiniteQuery({
      queryKey: ['lead-document-list', payload.args],
      queryFn: fetchLeadCustomerDocumentata, 
      initialPageParam: { startIndex: 1, rowCount: initialRowCount, payload }, 
      getNextPageParam: (lastPage) => lastPage.nextPageParam,  
    }); 
      
    const leadCustomerDocumentData = data?.pages.flatMap(page => page.data) || [];
  
    return {
      leadCustomerDocumentData,
      error,
      status,
      isLoading,
      fetchNextPage,
      isFetchingNextPage,
      hasNextPage, 
      refetch
    };
  };

export const saveDocument = async (payload: any): Promise<any> => {
    try {
      const response = await getAxiosInstance().post(SaveDocumentUrl, payload);
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.error('Request failed with status:', error.response?.status);
        console.error('Response data:', error.response?.data);
      } else {
        console.error('An unexpected error occurred:', error);
      }
      throw error;
    }
};

export const deleteDocument = async (payload: any): Promise<any> => {
  try {
    const response = await getAxiosInstance().post(DeleteLeadDocumentUrl, payload);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error('Request failed with status:', error.response?.status);
      console.error('Response data:', error.response?.data);
    } else {
      console.error('An unexpected error occurred:', error);
    }
    throw error;
  }
};

export const downloadDocument = async (payload: any): Promise<any> => {
  try {
    const response = await getAxiosInstance().post(GetDocumentUrl, payload);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error('Request failed with status:', error.response?.status);
      console.error('Response data:', error.response?.data);
    } else {
      console.error('An unexpected error occurred:', error);
    }
    throw error;
  }
};