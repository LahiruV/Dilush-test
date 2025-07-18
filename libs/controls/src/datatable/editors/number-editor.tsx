import { InputText } from 'primereact/inputtext';

export const NumberEditor = (options: any) => {
    function selectText(id: any) {
        if (options.isSelectText) {
            const input = document.getElementById(id) as HTMLInputElement | null;
            if (input) {
                input.focus();
                input.select();
            }
        }
    }

    return (
        <InputText
            id={options.id ?? "text-box"}
            type="number"
            value={options.value}
            onFocus={() => selectText(options.id ?? "text-box")}
            onChange={(e) => { options.editorCallback({ rowIndex: options.rowIndex, rowData: options.rowData, field: options.field, newValue: e.target.value, originalEvent: e }) }}
            onKeyDown={(e) => e.stopPropagation()}
            className={options.className}
            style={{ ...options.style }}
        />
    );
};