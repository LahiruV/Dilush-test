import { statusRenderFunction } from '@peerless/common';
import { PDFViewer } from '@progress/kendo-react-pdf-viewer';
import IndeterminateSpinner from '../indeterminate-spinner/indeterminate-spinner';
import { RenderStatusContentTable } from '@peerless/models';

export interface PdfViewProps {
    height?: string;
    zoom?: number;
    data: string;
    renderStatusContent?: RenderStatusContentTable;
}

/**
 *  The PdfView component is a wrapper around the KendoReact PDFViewer component.
 *
 * @param {PdfViewProps} { height } The height of the PDF viewer.
 * @param {number} { zoom } The zoom level of the PDF viewer.
 * @param {string} { data } The base64 encoded PDF data to be displayed.
 * @param {RenderStatusContentTable} { renderStatusContent } The status content rendering configuration.
 * @returns {JSX.Element} The PDF viewer component.
 * @author @LahiruV 🐺
 * @date 2024-10-05
 * 
 */

export function PdfView({ height, zoom, data, renderStatusContent }: PdfViewProps) {

    if (renderStatusContent?.isRenderStatusContentTable) {
        const statusOutput = statusRenderFunction.renderStatusContentTable(renderStatusContent.status, renderStatusContent.isFetch, renderStatusContent.error, renderStatusContent.setStateFunction || (() => { }));
        if (renderStatusContent.isStatusOutput && statusOutput) {
            if (statusOutput === 'Loading...') {
                return (
                    <div className="status-output">
                        <IndeterminateSpinner />
                    </div>
                );
            }
            return (
                <div className="status-output" style={{ display: 'flex', justifyContent: 'center', marginTop: '15px', fontSize: '12px' }}>
                    {statusOutput}
                </div>
            );
        }
    }

    return (
        <div>
            <PDFViewer
                data={data || ''}
                defaultZoom={zoom ? zoom : 1}
                style={{ height: height ? height : 'auto' }}
            />
        </div>
    );
}

export default PdfView;
