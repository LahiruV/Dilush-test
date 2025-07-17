
import { ProgressSpinner } from 'primereact/progressspinner';

export default function ProgressSpinnerWidget() {
    return (
        <div className="card flex justify-content-center" style={{ border: '0px solid red' }}>
            <ProgressSpinner style={{ width: '30px' }} />
        </div>
    );
}
