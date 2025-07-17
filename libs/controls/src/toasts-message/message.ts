export class ToastManager {
    private ref;

    constructor(ref: any) {
        this.ref = ref;
    }

    showMessage(severity: 'error'|'success', summary: 'Error' | 'Success' | any, detail: any) {
        if (this.ref.current) {
            this.ref.current.show([
                { severity: severity, summary: summary, detail: detail },
            ]);
        }
    }
}