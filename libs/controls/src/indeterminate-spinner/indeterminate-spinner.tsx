
import { ProgressBar } from 'primereact/progressbar';

export interface IndeterminateSpinnerProps {
    width?: string;
}

export function IndeterminateSpinner({ width }: IndeterminateSpinnerProps) {
    return (
        <div className="card primary-green-bg" style={{ border: 'none' }}>
            <ProgressBar mode="indeterminate" style={{ height: '2px', width: `${width}px` }}></ProgressBar>
        </div>
    );
}
export default IndeterminateSpinner;