
export const getPiIconName = (label: any): string => {
  switch (label) {
    case 'Customer Details': return 'info-circle';
    case 'Sales History': return 'chart-line';
    case 'Contact Details': return 'id-card';
    case 'Address': return 'map-marker';
    case 'Contact Person': return 'user';
    case 'End User': return 'user pi-user-circle';
    case 'EU List Price': return 'receipt';
    case 'Activity': return 'clipboard';
    case 'Document': return 'file';
    case 'Opportunities': return 'bullseye';
    case 'Customer Price': return 'tag';
    case 'Pantry List': return 'list';
    case 'CRM Orders': return 'shopping-cart';
    case 'Lead Details': return 'info-circle';
    case 'Addresses': return 'map-marker';
    case 'Enduser Details': return 'info-circle';
    case 'Enduser Price': return 'receipt';
    case 'Sales': return 'database';
    case 'TIO List': return 'box';
    case 'Organisation': return 'building';
    case 'Distributor': return 'truck';
    case 'Organisation Details': return 'info-circle';
    case 'Call Cycle Details': return 'info-circle';
    case 'Call Cycle Planner': return 'map-marker';
    case 'Call Cycle Activities': return 'clipboard';
    case 'Delete': return 'minus-circle';
    default: return 'ellipsis-h';
  }
}    