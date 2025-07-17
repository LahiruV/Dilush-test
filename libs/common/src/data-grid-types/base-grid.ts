export type gridColumn = {
    columns: any[];
    idColumn: string;
    multiSortMeta?: any;
    onSortCallback?: any;
}

export type gridFilter = {
    [prop: string]: filterProp;    
}

type filterProp = {
    value: any;
    matchMode: 'equals' | 'contains' | 'startsWith' | 'endsWith' | 'in' | 'notIn';
}

export type rowExpansion = {
    columns: any[];
    title?: string;
    addDataInTitle?: boolean;
    displayColumn?: string;
    idColumn: string;
}


export abstract class BaseGrid{
    abstract hasRowExpansionTemplate(): boolean;
    abstract getColumns(): gridColumn;
    abstract getColumnDefaultFilters(): gridFilter|null;
    abstract getRowExpansionTemplate(): rowExpansion|null;
    abstract getColumnDefaultFiltersForInnerTable(): gridFilter|null;
}