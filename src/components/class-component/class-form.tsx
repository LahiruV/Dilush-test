import { Card } from "@mui/material";
import { DataArray } from "@zenra/model";
import { BasicButton, InputField, SelectBasic } from "@zenra/widgets";

export interface ClassFormComponentProps {
    name: string;
    setName: Function;
    description: string;
    setDescription: Function;
    grade: string;
    setGrade: Function;
    count: number;
    setCount: Function;
    isLoading: boolean;
    handleSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
    dataArray: DataArray[];
    address: string;
    setAddress: Function;
}

export const ClassFormComponent: React.FC<ClassFormComponentProps> = ({
    name,
    setName,
    description,
    setDescription,
    grade,
    setGrade,
    count,
    setCount,
    isLoading,
    handleSubmit,
    dataArray,
    address,
    setAddress
}) => {

    return (
        <div>
            <Card className='width-max'>
                <form onSubmit={handleSubmit} className="padding-20">
                    <div className="flex justify-content-between padding-20">
                        <div style={{ width: '243px' }}>
                            <InputField
                                id='name'
                                classNameHelperText='font-12'
                                className='font-12 light-background'
                                value={name}
                                setState={(value: string | number) => setName(String(value))}
                                label='Name'
                                placeholder='Full Name'
                                type='text'
                                required
                                variant='outlined'
                                size='md'
                                isFullWidth
                                labelFontSize={12} name={""} description={""}
                            />
                        </div>
                        <div style={{ width: '243px' }}>
                            <InputField
                                id='description'
                                classNameHelperText='font-12'
                                className='font-12 light-background'
                                value={description}
                                setState={(value: string | number) => setDescription(String(value))}
                                label='Description'
                                placeholder='Description'
                                type='text'
                                required
                                variant='outlined'
                                size='md'
                                isFullWidth
                                labelFontSize={12} name={""} description={""}
                            />
                        </div>
                        <div style={{ width: '243px' }}>
                            <InputField
                                id='address'
                                classNameHelperText='font-12'
                                className='font-12 light-background'
                                value={address}
                                setState={(value: string | number) => setAddress(String(value))}
                                label='Address'
                                placeholder='Address'
                                type='text'
                                required
                                variant='outlined'
                                size='md'
                                isFullWidth
                                labelFontSize={12} name={""} description={""}
                            />
                        </div>
                        <div style={{ width: '243px' }}>
                            <SelectBasic
                                color='neutral'
                                classNameOption='font-12'
                                value={grade}
                                onChange={(_, value) => setGrade((value))}
                                dataList={dataArray}
                                size="md"
                                placeholder="Select"
                                label="Select Grade"
                                classNameHelperText='font-12'
                                className='font-12 light-background'
                                variant='outlined'
                                labelFontSize={12}
                                classNameLabel="bold"
                                labelColor="#171a1c"
                            />
                        </div>
                        <div style={{ width: '243px' }}>
                            <InputField
                                id='count'
                                classNameHelperText='font-12'
                                className='font-12 light-background'
                                value={count}
                                setState={(value: string | number) => setCount(Number(value))}
                                label='Student Count'
                                placeholder='Student Count'
                                type='number'
                                required
                                variant='outlined'
                                size='md'
                                isFullWidth
                                labelFontSize={12} name={""} description={""}
                            />
                        </div>
                    </div>
                    <div className="flex justify-content-between">
                        <div></div>
                        <BasicButton
                            id='login'
                            className='margin-top-20 width-100 font-12'
                            label='Submit'
                            variant='solid'
                            size='sm'
                            type="submit"
                            isFullWidth
                            colors='primary'
                            isLoading={isLoading}
                        />
                    </div>
                </form>
            </Card>
        </div>
    );
};

export default ClassFormComponent