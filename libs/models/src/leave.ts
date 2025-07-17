export interface Leave {
    leave_id?: number;
    name?: string;
    from_date?: string;
    to_date?: string;
    deptId: string;
    origator: string;
    originatorId: number;
    year: number;
    leaveType: string;
    showRejected: boolean;
};

export interface OriginatorsByDep {
    originatorId: number;
    name: string;
    origator: string;
};


export interface Departments {
    tableCode: string;
    tableDescription: string;
};

export interface LeaveEntryParameters {
    OriginatorId: number;
    IsAnnualLeave: boolean;
    IsPersonalLeave: boolean;
    IsLongServiceLeave: boolean;
    IsLeaveWithoutPay: boolean;
    IsOtherStateTypebelow: boolean;

    AnnualStartDate: string;
    PersonalStartDate: string;
    LongStartDate: string;
    LeaveWithoutStartDate: string;
    OtherStartDate: string;

    AnnualEndDate: string;
    PersonalEndDate: string;
    LongEndDate: string;
    LeaveWithoutEndDate: string;
    OtherEndDate: string;

    AnnualNoOfDays: string;
    PersonalNoOfDays: string;
    LongNoOfDays: string;
    LeaveWithoutNoOfDays: string;
    OtherNoOfDays: string;

    AnnualNoOfHours: string;
    PersonalNoOfHours: string;
    LongNoOfHours: string;
    LeaveWithoutNoOfHours: string;
    OtherNoOfHours: string;

    Reason: string;
};