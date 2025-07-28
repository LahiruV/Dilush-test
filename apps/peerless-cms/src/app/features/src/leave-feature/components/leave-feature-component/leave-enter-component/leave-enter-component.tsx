import { z } from "zod";
import {
    CustomToastMessage,
    DatePickerWithLeaveColors,
    FormInput,
    ValidationModal,
} from "@peerless/controls";
import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import React, { useEffect, useRef, useState } from "react";
import { Button } from "react-bootstrap";
import { GetPublicHolidaysCount, InsertLeave } from "@peerless/queries";
import {
    RootState,
    setIsFetchingLeaveEntryList,
    setIsFetchingShowLeaveList,
} from "@peerless-cms/store";
import { useDispatch, useSelector } from "react-redux";
import { documentService } from "@peerless/services";
import "./leave-enter-component.css";
import { InputText } from "primereact/inputtext";
import { toast } from "sonner";

type LeaveStateKeys = "annual" | "personal" | "long" | "leaveWithout" | "other";

const LEAVE_TYPES = [
    {
        key: "AnnualLeave",
        flag: "isAnnualLeave",
        start: "annual_startDate",
        end: "annual_endDate",
        days: "annual_no_of_days",
        hours: "annual_no_of_hrs",
        label: "Annual Leave",
        state: "annual",
    },
    {
        key: "PersonalLeave",
        flag: "isPersonalLeave",
        start: "personal_startDate",
        end: "personal_endDate",
        days: "personal_no_of_days",
        hours: "personal_no_of_hrs",
        label: "Personal Leave",
        state: "personal",
    },
    {
        key: "LongServiceLeave",
        flag: "isLongServiceLeave",
        start: "long_startDate",
        end: "long_endDate",
        days: "long_no_of_days",
        hours: "long_no_of_hrs",
        label: "Long Service Leave",
        state: "long",
    },
    {
        key: "LeaveWithoutPay",
        flag: "isLeaveWithoutPay",
        start: "leave_without_startDate",
        end: "leave_without_endDate",
        days: "leave_without_no_of_days",
        hours: "leave_without_no_of_hrs",
        label: "Leave Without Pay",
        state: "leaveWithout",
    },
    {
        key: "OtherStateTypebelow",
        flag: "isOtherStateTypebelow",
        start: "other_startDate",
        end: "other_endDate",
        days: "other_no_of_days",
        hours: "other_no_of_hrs",
        label: "Other-State Type Below",
        state: "other",
    },
] as const;

const LeaveSubmitFormSchema = z.object({
    isAnnualLeave: z.boolean(),
    isPersonalLeave: z.boolean(),
    isLongServiceLeave: z.boolean(),
    isLeaveWithoutPay: z.boolean(),
    isOtherStateTypebelow: z.boolean(),

    annual_startDate: z.string(),
    personal_startDate: z.string(),
    long_startDate: z.string(),
    leave_without_startDate: z.string(),
    other_startDate: z.string(),

    annual_endDate: z.string(),
    personal_endDate: z.string(),
    long_endDate: z.string(),
    leave_without_endDate: z.string(),
    other_endDate: z.string(),

    annual_no_of_days: z.string(),
    personal_no_of_days: z.string(),
    long_no_of_days: z.string(),
    leave_without_no_of_days: z.string(),
    other_no_of_days: z.string(),

    annual_no_of_hrs: z.string(),
    personal_no_of_hrs: z.string(),
    long_no_of_hrs: z.string(),
    leave_without_no_of_hrs: z.string(),
    other_no_of_hrs: z.string(),

    reason: z.string(),
    total_working_hours: z.number(),
});

const defaultFormValues = {
    isAnnualLeave: false,
    isPersonalLeave: false,
    isLongServiceLeave: false,
    isLeaveWithoutPay: false,
    isOtherStateTypebelow: false,

    annual_startDate: "",
    personal_startDate: "",
    long_startDate: "",
    leave_without_startDate: "",
    other_startDate: "",

    annual_endDate: "",
    personal_endDate: "",
    long_endDate: "",
    leave_without_endDate: "",
    other_endDate: "",

    annual_no_of_days: "",
    personal_no_of_days: "",
    long_no_of_days: "",
    leave_without_no_of_days: "",
    other_no_of_days: "",

    annual_no_of_hrs: "",
    personal_no_of_hrs: "",
    long_no_of_hrs: "",
    leave_without_no_of_hrs: "",
    other_no_of_hrs: "",

    reason: "",
    total_working_hours: 0,
};

type FormFields = z.infer<typeof LeaveSubmitFormSchema>;

export function LeaveEnter({
    leaveListViewData,
    closeAddLeaveModal,
    onClose
}: {
    leaveListViewData: any;
    closeAddLeaveModal: () => void;
    onClose: () => void;
}) {
    const dispatch = useDispatch();
    const { loggedUser } = useSelector((state: RootState) => state.header);

    const formRef = useRef<HTMLFormElement | null>(null);

    const [toggle, setToggle] = useState<Record<string, boolean>>({
        isAnnualLeave: false,
        isPersonalLeave: false,
        isLongServiceLeave: false,
        isLeaveWithoutPay: false,
        isOtherStateTypebelow: false,
    });

    const [dates, setDates] = useState<Record<string, string>>({
        annual_startDate: "",
        personal_startDate: "",
        long_startDate: "",
        leave_without_startDate: "",
        other_startDate: "",
        annual_endDate: "",
        personal_endDate: "",
        long_endDate: "",
        leave_without_endDate: "",
        other_endDate: "",
    });

    const [leaveTotals, setLeaveTotals] = useState<
        Record<LeaveStateKeys, { days: number; hours: number }>
    >({
        annual: { days: 0, hours: 0 },
        personal: { days: 0, hours: 0 },
        long: { days: 0, hours: 0 },
        leaveWithout: { days: 0, hours: 0 },
        other: { days: 0, hours: 0 },
    });

    const [grandTotal, setGrandTotal] = useState({ days: 0, hours: 0 });

    const [file, setFile] = useState<File | null>(null);
    const [fileUrl, setFileUrl] = useState<string | null>(null);
    const fileInputRef = useRef<HTMLInputElement | null>(null);
    const [isDisable, setIsDisable] = useState(true);

    const [visible, setVisible] = useState(false);
    const [hourValidate, setHourValidate] = useState(false);
    const [validationMessage, setValidationMessage] = useState("");
    const [newValidationMessage, setNewValidationMessage] = useState("");
    const [status, setStatus] = useState<string>("");
    const [labelText, setLabelText] = useState<string>("");
    const [triggerKey, setTriggerKey] = useState(0);
    const [isSave, setIsSave] = useState(false);
    const [open, setOpen] = useState(false);
    const [confirmPastDate, setConfirmPastDate] = useState(false);
    const [pendingSubmitData, setPendingSubmitData] = useState<FormFields | null>(null);

    const methods = useForm<FormFields>({
        defaultValues: defaultFormValues,
        resolver: zodResolver(LeaveSubmitFormSchema),
    });
    const { setValue, getValues, reset } = methods;
    const { getPublicHolidaysCountMutate } = GetPublicHolidaysCount();
    const { saveLeaveMutate } = InsertLeave();

    useEffect(() => {
        const totalDays = Object.values(leaveTotals).reduce(
            (sum, leave) => sum + leave.days,
            0
        );
        const totalHours = Object.values(leaveTotals).reduce(
            (sum, leave) => sum + leave.hours,
            0
        );
        setGrandTotal({ days: totalDays, hours: totalHours });
    }, [leaveTotals]);

    const handleReset = (isWithCheckBox: boolean) => {
        setDates({
            annual_startDate: "",
            personal_startDate: "",
            long_startDate: "",
            leave_without_startDate: "",
            other_startDate: "",
            annual_endDate: "",
            personal_endDate: "",
            long_endDate: "",
            leave_without_endDate: "",
            other_endDate: "",
        });
        if (isWithCheckBox) {
            setToggle({
                isAnnualLeave: false,
                isPersonalLeave: false,
                isLongServiceLeave: false,
                isLeaveWithoutPay: false,
                isOtherStateTypebelow: false,
            });
            reset(defaultFormValues);
        } else {
            setValue("reason", "");
        }
        clearFile();
        setGrandTotal({ days: 0, hours: 0 });
        setLeaveTotals({
            annual: { days: 0, hours: 0 },
            personal: { days: 0, hours: 0 },
            long: { days: 0, hours: 0 },
            leaveWithout: { days: 0, hours: 0 },
            other: { days: 0, hours: 0 },
        });
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const selectedFile = e.target.files?.[0] || null;
        setFile(selectedFile);
        setFileUrl(selectedFile ? URL.createObjectURL(selectedFile) : null);
    };

    const openFile = () => {
        if (file) {
            const url = URL.createObjectURL(file);
            const a = document.createElement('a');
            a.href = url;
            a.download = file.name;
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
            URL.revokeObjectURL(url);
        }
    };

    const clearFile = () => {
        setFile(null);
        setFileUrl(null);
        if (fileInputRef.current) fileInputRef.current.value = "";
    };

    const toggleTurnInOut = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, checked } = event.target;
        if (checked) {
            const newToggles: Record<string, boolean> = {};
            Object.keys(toggle).forEach((key) => {
                newToggles[key] = key === name;
                if (key !== name) {
                    const leaveType = LEAVE_TYPES.find((t) => t.flag === key);
                    if (leaveType) {
                        setValue(leaveType.start, "");
                        setValue(leaveType.end, "");
                        setValue(leaveType.days, "");
                        setValue(leaveType.hours, "");
                    }
                }
            });
            setToggle(newToggles);
            Object.keys(newToggles).forEach((key) => setValue(key as keyof FormFields, newToggles[key]));
            if (name === "isPersonalLeave") setIsDisable(false);
            else setIsDisable(true);
        } else {

            setToggle((prev) => ({ ...prev, [name]: false }));
            setValue(name as keyof FormFields, false);

            const leaveType = LEAVE_TYPES.find((t) => t.flag === name);
            if (leaveType) {
                setValue(leaveType.start, "");
                setValue(leaveType.end, "");
                setValue(leaveType.days, "");
                setValue(leaveType.hours, "");
            }
            if (name === "isPersonalLeave") setIsDisable(true);
        }
    };

    const isWorkingDaysEnabled = (t: typeof LEAVE_TYPES[number]) =>
        !!toggle[t.flag] && !!dates[t.start] && !!dates[t.end];

    const isHoursEnabled = isWorkingDaysEnabled;

    const handleDateChange = (name: string, value: string) => {
        setDates((prev) => ({ ...prev, [name]: value }));
        setValue(name as keyof FormFields, value);

        const leaveType = LEAVE_TYPES.find((t) => t.start === name || t.end === name);
        if (!leaveType) return;

        if (leaveType.start === name) {
            setDates((prev) => ({ ...prev, [leaveType.end]: value, [name]: value }));
            setValue(leaveType.end as keyof FormFields, value);
        }

        const start = getValues(leaveType.start);
        const end = getValues(leaveType.end);

        if (start && end) {
            const s = new Date(start);
            const e = new Date(end);
            // if (e < s) {
            //     setValidationMessage(
            //         "Date To Field Cannot Be Less Than Leave Starting Date"
            //     );
            //     setVisible(true);
            //     setDates((prev) => ({ ...prev, [leaveType.end]: "" }));
            //     setValue(leaveType.end as keyof FormFields, "");
            //     return;
            // }

            const holidaySet = new Set(
                (leaveListViewData || []).map((leave: any) =>
                    new Date(leave.date).toISOString().slice(0, 10)
                )
            );
            let current = new Date(s);
            let validDays = 0;
            while (current <= e) {
                const dayOfWeek = current.getDay();
                const isoDate = current.toISOString().slice(0, 10);
                if (dayOfWeek !== 0 && dayOfWeek !== 6 && !holidaySet.has(isoDate)) {
                    validDays++;
                }
                current.setDate(current.getDate() + 1);
            }
            const hours = validDays * 8;
            setValue(leaveType.days, validDays.toString());
            setValue(leaveType.hours, hours.toFixed(2));
            setLeaveTotals((prev) => ({
                ...prev,
                [leaveType.state]: { days: validDays, hours },
            }));
        }
    };


    const calculateEndDate = async (leaveType: typeof LEAVE_TYPES[number], noOfDays: number, startDate: string) => {
        if (!startDate || isNaN(new Date(startDate).getTime()) || !noOfDays) return;

        let current = new Date(startDate);
        let daysCounted = 0;

        while (daysCounted < noOfDays) {
            const day = current.getDay();
            let isHoliday = false;
            if (day !== 0 && day !== 6) {
                const payload = { startDate: current, endDate: current };
                isHoliday = await new Promise<boolean>((resolve) => {
                    getPublicHolidaysCountMutate(payload, {
                        onSuccess: (res: any) => resolve(parseInt(res.data) > 0),
                        onError: () => resolve(false),
                    });
                });
                if (!isHoliday) {
                    daysCounted++;
                }
            }
            if (daysCounted < noOfDays) {
                current.setDate(current.getDate() + 1);
            }
        }
        const endISO = current.toISOString();
        setValue(leaveType.end, endISO);
        setDates((prev) => ({ ...prev, [leaveType.end]: endISO }));
    };


    const handleNoOfDays = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        setValue(name as keyof FormFields, value);

        const leaveType = LEAVE_TYPES.find((t) => t.days === name);
        if (!leaveType) return;

        const noOfDays = parseInt(value) || 0;
        const hours = noOfDays * 8;
        setValue(leaveType.hours, hours.toFixed(2));
        setLeaveTotals((prev) => ({
            ...prev,
            [leaveType.state]: { days: noOfDays, hours },
        }));

        const start = getValues(leaveType.start);
        if (!start || isNaN(new Date(start).getTime())) return;
        calculateEndDate(leaveType, noOfDays, start);
    };

    const handleNoOfHours = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        setValue(name as keyof FormFields, value);

        const leaveType = LEAVE_TYPES.find((t) => t.hours === name);
        if (!leaveType) return;

        const noOfHours = parseInt(value) || 0;
        const noOfDays = Math.ceil(noOfHours / 8);
        setValue(leaveType.days, noOfDays.toString());
        setLeaveTotals((prev) => ({
            ...prev,
            [leaveType.state]: { days: noOfDays, hours: noOfHours },
        }));

        const start = getValues(leaveType.start);
        if (!start || isNaN(new Date(start).getTime())) return;
        calculateEndDate(leaveType, noOfDays, start);
    };


    const ValidateLeaveHrs = (
        no_of_hr: string,
        no_of_days: string,
        leave_type: string
    ) => {
        const no_of_hours = parseFloat(no_of_hr) || 0;
        const no_of_working_days = parseInt(no_of_days) || 0;
        const Li_No_of_hours = Math.floor(no_of_hours);
        const Lf_decimal = parseFloat((no_of_hours - Li_No_of_hours).toFixed(2));
        if (no_of_hours > 8.0 && no_of_working_days === 1) {
            setValidationMessage(
                "Invalid " +
                leave_type +
                " - No of Working Hours for 1 Working Day should be less than or equal to 8"
            );
            setVisible(true);
            return;
        }
        if (no_of_hours < 8.0 && no_of_working_days === 1) {
            if (![0.0, 0.25, 0.5, 0.75].includes(Lf_decimal)) {
                setValidationMessage(
                    "Invalid Decimals on " +
                    leave_type +
                    ", Decimals are limited to .25, .50 or .75"
                );
                setVisible(true);
                return;
            }
        }
        if (no_of_working_days > 1 && Lf_decimal !== 0.0) {
            setValidationMessage(
                leave_type + " - No of Working Days does not match with Working Hours."
            );
            setVisible(true);
            return;
        }
    };
    const ValidateAnnualLeave = (data: FormFields) => {
        const annualHours = parseFloat(data.annual_no_of_hrs);
        const annualDays = parseInt(data.annual_no_of_days);
        const Lf_decimal = annualHours % 1;
        if (annualHours > 8.0 && annualDays === 1) {
            setValidationMessage(
                "Invalid Annual Leave - No of Working Hours should be less than or equal to 8 for 1 day"
            );
            setVisible(true);
            return;
        } else if (annualHours < 8.0 && annualDays === 1) {
            const validDecimals = [0.0, 0.25, 0.5, 0.75];
            const roundedDecimal = Number(Lf_decimal.toFixed(2));
            if (!validDecimals.includes(roundedDecimal)) {
                setValidationMessage(
                    "Invalid Decimals - Only .25, .50, or .75 are allowed"
                );
                setVisible(true);
                return;
            }
        } else if (annualDays > 1 && Lf_decimal !== 0.0) {
            setValidationMessage(
                "Invalid Annual Leave - No of Working Days does not match with Working Hours"
            );
            setVisible(true);
            return;
        }
    };

    const validateLeaveData = (data: FormFields, leaveTypes: typeof LEAVE_TYPES) => {
        let totalHours = 0;
        for (const type of leaveTypes) {
            if ((data as any)[type.flag]) {
                if (type.key === "AnnualLeave") {
                    ValidateAnnualLeave(data);
                } else {
                    ValidateLeaveHrs(
                        (data as any)[type.hours],
                        (data as any)[type.days],
                        type.label
                    );
                }
                if (
                    !(data as any)[type.start] ||
                    !(data as any)[type.end] ||
                    !(data as any)[type.days] ||
                    !(data as any)[type.hours]
                ) {
                    return { totalHours, error: `Please fill in the ${type.label} details.` };
                }
                totalHours += parseFloat((data as any)[type.hours] || "0");
            }
        }
        const noLeaveSelected = leaveTypes.every((type) => !(data as any)[type.flag]);
        if (noLeaveSelected) {
            return { totalHours, error: "Please select at least one leave type." };
        }
        const requireReason =
            (data.isPersonalLeave || data.isLeaveWithoutPay || data.isOtherStateTypebelow);
        if (requireReason && !(data as any).reason) {
            return { totalHours, error: "Please fill in the reason for leave." };
        }
        return { totalHours, error: null };
    };

    const handleExternalSubmit = () => {
        if (formRef.current) {
            formRef.current.dispatchEvent(
                new Event("submit", { cancelable: true, bubbles: true })
            );
        }
    };
    const onSubmit = async (data: FormFields) => {
        const today = new Date();
        const dateObj = new Date(data.annual_startDate);
        const { totalHours, error } = validateLeaveData(data, LEAVE_TYPES);
        const selectedFlag = LEAVE_TYPES.find((t) => (data as any)[t.flag]);
        if (!selectedFlag) {
            // No leave type selected, skip further validation
            return;
        }

        const start = getValues(selectedFlag.start);
        const end = getValues(selectedFlag.end);

        if (start && end) {
            const s = new Date(start);
            const e = new Date(end);
            if (e < s) {
                setValidationMessage(
                    "Date To Field Cannot Be Less Than Leave Starting Date"
                );
                setVisible(true);
                setDates((prev) => ({ ...prev, [selectedFlag.end]: "" }));
                setValue(selectedFlag.end as keyof FormFields, "");
                return;
            }
        }

        if (totalHours < 8) {
            setHourValidate(true);
            setNewValidationMessage("Total Working Hours must be at least 8 hours.");
            return;
        }

        if (error) {
            setValidationMessage(error);
            setVisible(true);
            return;
        }
        if (data.isAnnualLeave && dateObj < today) {
            setValidationMessage("Leave start date entered has passed. Do you wish to continue?");
            setConfirmPastDate(true);
            setPendingSubmitData(data);
            return;
        }
        let base64String = "";
        if (file) {
            base64String = await documentService.readAndConvertFileToBase64(file);
        }
        const payload: any = {
            OriginatorId: loggedUser.originatorId,
            Originator: loggedUser.userName,
            Reason: (data as any).reason,
            TotalWorkingHours: totalHours,
            MedicalFile: base64String,
        };

        function formatDate(dateInput: any) {
            const date = new Date(dateInput);
            if (isNaN(date.getTime())) return null;
            date.setDate(date.getDate() + 1);
            return date.toISOString().slice(0, 10);
        }

        for (const type of LEAVE_TYPES) {
            payload[`Is${type.key}`] = (data as any)[type.flag];
            const startDateRaw = (data as any)[type.start];
            const endDateRaw = (data as any)[type.end];
            payload[`${type.key.replace('Typebelow', '')}StartDate`] = startDateRaw ? formatDate(startDateRaw) : null;
            payload[`${type.key.replace('Typebelow', '')}EndDate`] = endDateRaw ? formatDate(endDateRaw) : null;
            payload[`${type.key.replace("Typebelow", "")}NoOfDays`] =
                parseInt((data as any)[type.days]) || 0;
            payload[`${type.key.replace("Typebelow", "")}NoOfHours`] =
                parseInt((data as any)[type.hours]) || 0;
        }
        setIsSave(true);
        saveLeaveMutate(payload, {
            onSuccess: () => {
                setIsSave(false);
                handleReset(true);
                closeAddLeaveModal();
                toast.success(`Leave request has been forwarded to ${loggedUser.parentOriginator.toLocaleUpperCase()} for approval`)
                // onClose?.();
                dispatch(setIsFetchingLeaveEntryList(true));
                dispatch(setIsFetchingShowLeaveList(true));
            },
            onError: (error) => {
                console.error(error.message);
                toast.error("Leave request failed");
                setIsSave(false);
            },
        });
    };

    const proceedWithSubmit = async (data: FormFields) => {
        const { totalHours } = validateLeaveData(data, LEAVE_TYPES);

        let base64String = "";
        if (file) {
            base64String = await documentService.readAndConvertFileToBase64(file);
        }

        const payload: any = {
            OriginatorId: loggedUser.originatorId,
            Originator: loggedUser.userName,
            Reason: (data as any).reason,
            TotalWorkingHours: totalHours,
            MedicalFile: base64String,
        };

        function formatDate(dateInput: any) {
            const date = new Date(dateInput);
            if (isNaN(date.getTime())) return null;
            date.setDate(date.getDate() + 1);
            return date.toISOString().slice(0, 10);
        }

        for (const type of LEAVE_TYPES) {
            payload[`Is${type.key}`] = (data as any)[type.flag];
            const startDateRaw = (data as any)[type.start];
            const endDateRaw = (data as any)[type.end];
            payload[`${type.key.replace('Typebelow', '')}StartDate`] = startDateRaw ? formatDate(startDateRaw) : null;
            payload[`${type.key.replace('Typebelow', '')}EndDate`] = endDateRaw ? formatDate(endDateRaw) : null;
            payload[`${type.key.replace("Typebelow", "")}NoOfDays`] =
                parseInt((data as any)[type.days]) || 0;
            payload[`${type.key.replace("Typebelow", "")}NoOfHours`] =
                parseFloat((data as any)[type.hours]) || 0;
        }

        setIsSave(true);
        saveLeaveMutate(payload, {
            onSuccess: () => {
                setIsSave(false);
                handleReset(true);
                closeAddLeaveModal();
                toast.success(`Leave request has been forwarded to ${loggedUser.parentOriginator.toLocaleUpperCase()} for approval`);
                // onClose?.();
                dispatch(setIsFetchingLeaveEntryList(true));
                dispatch(setIsFetchingShowLeaveList(true));
            },
            onError: (error) => {
                console.error(error.message);
                toast.error("Leave request failed");
                setIsSave(false);
            },
        });
    };

    const handleConfirmPastDate = async () => {
        setConfirmPastDate(false);
        if (pendingSubmitData) {
            await proceedWithSubmit(pendingSubmitData);
            setPendingSubmitData(null);
        }
    };

    useEffect(() => {
        if (
            !toggle.isAnnualLeave ||
            !toggle.isPersonalLeave ||
            !toggle.isLongServiceLeave ||
            !toggle.isLeaveWithoutPay ||
            !toggle.isOtherStateTypebelow
        ) {
            handleReset(false);
        }

    }, [
        toggle.isAnnualLeave,
        toggle.isPersonalLeave,
        toggle.isLongServiceLeave,
        toggle.isLeaveWithoutPay,
        toggle.isOtherStateTypebelow,
    ]);

    useEffect(() => {
        LEAVE_TYPES.forEach((t) => {
            if (dates[t.start]) {
                setValue(t.start, dates[t.start]);
            }
            if (dates[t.end]) {
                setValue(t.end, dates[t.end]);
            }
        });

    }, [dates]);

    return (
        <div className="content margin-top-20">
            <form
                className="lead-customer-contact-detail-form"
                onSubmit={methods.handleSubmit(onSubmit)}
                ref={formRef}
            >
                <FormProvider {...methods}>
                    <div className="form-group-container">
                        <div className="form-group">
                            <span>I apply for</span>
                            <div
                                className="form-horizontal-group"
                                style={{ display: "flex", flexDirection: "column", gap: "13px" }}
                            >
                                {LEAVE_TYPES.map((t) => (
                                    <FormInput
                                        key={t.flag}
                                        label={t.label}
                                        name={t.flag}
                                        type="checkBox"
                                        onChangeCallBack={toggleTurnInOut}
                                    />
                                ))}
                            </div>
                        </div>
                        <div>
                            <span className="form-group-span-custom">Date From</span>
                            <div className="form-horizontal-group">
                                {LEAVE_TYPES.map((t) => (
                                    <div
                                        key={t.start}
                                        style={{
                                            width: "150px",
                                            marginTop: t.state === "annual" ? "-1px" : "16px",
                                        }}
                                    >
                                        <DatePickerWithLeaveColors
                                            id="from-date-picker-leaves"
                                            value={dates[t.start]}
                                            onChange={(e: any) =>
                                                handleDateChange(t.start, e ? e.toISOString() : null)
                                            }
                                            leaves={leaveListViewData || []}
                                            isDisabled={!toggle[t.flag]}
                                        />
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div style={{ paddingLeft: "20px" }}>
                            <span className="form-group-span-custom">Date To</span>
                            <div className="form-horizontal-group">
                                {LEAVE_TYPES.map((t) => (
                                    <div
                                        key={t.end}
                                        style={{
                                            width: "150px",
                                            marginTop: t.state === "annual" ? "-1px" : "16px",
                                        }}
                                    >
                                        <DatePickerWithLeaveColors
                                            id="to-date-picker-leaves"
                                            value={dates[t.end]}
                                            onChange={(e: any) =>
                                                handleDateChange(t.end, e ? e.toISOString() : null)
                                            }
                                            leaves={leaveListViewData || []}
                                            isDisabled={!toggle[t.flag]}
                                        />
                                    </div>
                                ))}
                                <label className="form-group-label-custom" style={{ marginTop: "20px", marginLeft: "114px" }}>
                                    <span className="total-leave-enter">Totals</span>
                                </label>
                            </div>
                        </div>
                        <div className="form-group">
                            <span>No of Working Days</span>
                            <div className="form-horizontal-group">
                                {LEAVE_TYPES.map((t) => (
                                    <FormInput
                                        key={t.days}
                                        label=""
                                        name={t.days}
                                        type="numberWithOutString"
                                        min={1}
                                        max={365}
                                        onChangeCallBack={handleNoOfDays}
                                        isDisabled={!isWorkingDaysEnabled(t)}
                                    />
                                ))}
                                <div style={{ fontSize: "15px !important" }}>
                                    <InputText value={grandTotal.days.toString()} readOnly />
                                </div>
                            </div>
                        </div>
                        <div className="form-group">
                            <span>No of Hours</span>
                            <div className="form-horizontal-group">
                                {LEAVE_TYPES.map((t) => (
                                    <FormInput
                                        key={t.hours}
                                        label=""
                                        name={t.hours}
                                        type="decimal"
                                        min={1}
                                        max={2920}
                                        isDisabled={!isHoursEnabled(t)}
                                        onChangeCallBack={handleNoOfHours}
                                    />
                                ))}
                                <div style={{ fontSize: "15px !important" }}>
                                    <InputText value={grandTotal.hours.toFixed(2).toString()} readOnly />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="form-group">
                        <br />
                        <div style={{ fontSize: "15px !important" }}>
                            <label>
                                <b>
                                    If Personal Leave or Leave of Absence - Please state Circumstances If Other,
                                    Please state type
                                </b>
                            </label>
                        </div>
                        <div className="form-horizontal-group">
                            <FormInput label="" name="reason" type="textarea" />
                        </div>
                    </div>
                    <div className="form-group">
                        <div style={{ fontSize: "15px !important" }}>
                            <label>
                                <b>Attach Medical Certificate</b>
                            </label>
                        </div>
                        <input
                            id="file-input"
                            type="file"
                            onChange={handleFileChange}
                            ref={fileInputRef}
                            disabled={isDisable}
                        />
                        <Button
                            id="file-clear-button"
                            type="button"
                            variant="outline-dark"
                            className="btn-submit"
                            onClick={clearFile}
                            disabled={isDisable}
                        >
                            {"Clear File"}
                        </Button>
                        <Button
                            id="file-view-button"
                            type="button"
                            variant="outline-dark"
                            className="btn-submit"
                            onClick={openFile}
                            disabled={isDisable}
                        >
                            {"View"}
                        </Button>
                        <Button
                            id="clear-button"
                            type="button"
                            variant="outline-dark"
                            className="btn-submit"
                            onClick={() => handleReset(true)}
                        >
                            {"Clear"}
                        </Button>
                    </div>
                </FormProvider>
            </form>
            <footer style={{ marginTop: "20px" }}>
                <div className="form-button-container">
                    <span>Make sure you have verified all your changes before save</span>
                    <Button
                        id="submit-button"
                        disabled={isSave}
                        type="button"
                        variant="outline-dark"
                        className="btn-submit"
                        onClick={handleExternalSubmit}
                    >
                        {isSave ? "Saving..." : "Save Leave"}
                    </Button>
                </div>
            </footer>
            {visible && (
                <ValidationModal
                    title={"Please Check"}
                    message={validationMessage}
                    setState={setVisible}
                />
            )}
            {confirmPastDate && (
                <ValidationModal
                    title={"Please Check"}
                    message={validationMessage}
                    setState={setConfirmPastDate}
                    onSubmit={handleConfirmPastDate}
                />
            )}
            {hourValidate && (
                <ValidationModal
                    title={"Please Check"}
                    message={newValidationMessage}
                    setState={setHourValidate}
                />
            )}
        </div>
    );
}

export default LeaveEnter;
