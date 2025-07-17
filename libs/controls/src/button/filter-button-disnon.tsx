export interface FilterNonButtonProps {
    type?: 'button' | 'submit' | 'reset';
}

export function FilterNonButton({ type }: FilterNonButtonProps) {

    return (
        <div>
            <button
                type={type}
                style={{ display: 'none' }}
            />
        </div>
    );
}

export default FilterNonButton;
