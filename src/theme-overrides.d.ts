// Import necessary types from MUI
import type { Components } from '@mui/material/styles';
import type { Theme } from '@mui/material';

// Declare module augmentation for '@mui/material/styles'
declare module '@mui/material/styles' {
    interface Components {
        MuiDataGrid?: Components['MuiDataGrid'];
    }
}