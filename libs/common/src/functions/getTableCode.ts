
export const findTableCodeByDescription = (dataList: any, description: string): string | undefined => {
    const dataObj = dataList.find((item: any) => item.label === description);
    return dataObj ? dataObj.value : undefined;
};