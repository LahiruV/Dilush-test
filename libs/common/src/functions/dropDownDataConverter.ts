/**
 * Converts an array of objects into a format suitable for dropdown menus.
 * 
 * @param id - Optional. The key in each object to be used as the id. If not provided, the index + 1 will be used.
 * @param data - The array of objects to be converted.
 * @param text - The key in each object to be used as the display text.
 * @param value - The key in each object to be used as the value.
 * @param isExtendedText - Optional. If true, the text will be formatted as `value - text`.
 * @param extraItems - Optional. An array of additional keys to include in the output objects.
 * @param type - Optional. The type of the data, used for additional processing if needed.
 * @param date - Optional. The key in each object to be used as the date. If provided, the date will be formatted.
 * @param leaveStatus - Optional. The key in each object to be used as the leave status.
 * @param description - Optional. The key in each object to be used as the description.
 * @returns An array of objects formatted for dropdown menus, each containing `id`, `text`, and `value` properties.
 * 
 * @author Lahiru Vimukthi 🐺
 * @date 2024-10-05	
 */
export const dropDownDataConverter = <T>(data: any, text: string, value: string, id?: string, isExtendedText?: boolean, extraItems?: string[]) => {
    if (isExtendedText) {
        return data.map((item: any, index: any) => ({
            id: id == null || '' ? index + 1 : item[id || ''],
            text: (item[value] != null ? item[value].toString().trim() : '') + ' - ' + item[text],
            value: item[value]
        }));
    }
    if (extraItems) {
        return data.map((item: any, index: any) => ({
            id: id == null || '' ? index + 1 : item[id || ''],
            text: item[text],
            value: item[value],
            ...extraItems.reduce((acc: any, extraItem: any) => {
                acc[extraItem] = item[extraItem];
                return acc;
            }, {})
        }))
    }
    return data.map((item: any, index: any) => ({
        id: id == null || '' ? index + 1 : item[id || ''],
        text: item[text] + '',
        value: item[value]
    }));
}

export const commonDataConverter = <T>(data: any, items: string[], id?: string,) => {
    if (items) {
        return data.map((item: any, index: any) => ({
            id: id == null || '' ? index + 1 : item[id || ''],
            ...items.reduce((acc: any, items: any) => {
                acc[items] = item[items];
                return acc;
            }, {})
        }))
    }
}

export const leaveDataConverter = <T>(data: any, date: string, type: string, description: string, leaveStatus: string, id?: string,) => {
    return data.map((item: any, index: any) => ({
        id: id == null || '' ? index + 1 : item[id || ''],
        date: new Date(item[date]) + '',
        type: item[type] + '',
        leaveStatus: item[leaveStatus] + '',
        description: item[description] + ''
    }));
}

export const publicLeaveDataConverter = <T>(data: any, date: string, type: string, description: string, leaveStatus: string, id?: string,) => {
    return data
        .filter((item: any) => item[type] === 'Public')
        .map((item: any, index: any) => ({
            id: id == null || '' ? index + 1 : item[id || ''],
            date: new Date(item[date]) + '',
            type: item[type] + '',
            leaveStatus: item[leaveStatus] + '',
            description: item[description] + ''
        }));
}
