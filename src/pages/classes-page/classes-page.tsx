import { BasicButton } from "@zenra/widgets";
import { NavLink } from "react-router-dom";
import React, { useState } from 'react';
import { ClassFormComponent } from "@zenra/components";
import { DataArray } from "@zenra/model";

export const titleComponentClassesList =
    <NavLink style={{ textDecoration: 'none' }} className='height-auto' to='#'>
        <BasicButton className='top-header-button log-out-button' size='sm' label='Add Classes' />
    </NavLink>

export const Classes: React.FC = () => {
    const [name, setName] = useState<string>('');
    const [description, setDescription] = useState<string>('');
    const [grade, setGrade] = useState<string>('');
    const [count, setCount] = useState<number>(0);
    const [address, setAddress] = useState<string>('');
    const dataArray: DataArray[] = [{ value: 'a', label: 'Grade A' },
    { value: 'b', label: 'Grade B' },
    { value: 'c', label: 'Grade C' },
    { value: 'd', label: 'Grade D' },];

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const payload: any = {
            name,
            description,
            grade,
            noOfStudents: count,
            address
        }
        console.log(payload);

    }

    return (
        <>
            <ClassFormComponent
                name={name}
                setName={setName}
                description={description}
                setDescription={setDescription}
                grade={grade}
                setGrade={setGrade}
                count={count}
                setCount={setCount}
                isLoading={false}
                handleSubmit={handleSubmit}
                dataArray={dataArray}
                address={address}
                setAddress={setAddress}

            />
        </>
    );
};
