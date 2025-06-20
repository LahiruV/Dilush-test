import React from 'react';
import { Link } from 'react-router-dom';
import './sidebar-component.css';
import { company_name } from '@zenra/configs';
import PixIcon from '@mui/icons-material/Pix';
import PaidIcon from '@mui/icons-material/Paid';
import ClassIcon from '@mui/icons-material/Class';
import SettingsIcon from '@mui/icons-material/Settings';
import DashboardIcon from '@mui/icons-material/Dashboard';
import { useSelector } from 'react-redux';
import { RootState, setRouteTitle, setSideBarSelected } from '@zenra/store';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import { ListItemButton } from '@mui/material';
import { ListItemContent, ListItemDecorator } from '@mui/joy';
import { useInitialService } from '@zenra/services';

export interface SidebarProps {
    isAuthenticated: boolean
}

const Sidebar: React.FC<SidebarProps> = ({ isAuthenticated }) => {

    const initialService = useInitialService()
    const { loggedUser } = useSelector((state: RootState) => state.user);
    const { sideBarSelected } = useSelector((state: RootState) => state.common);

    const navItems = [
        // { key: 'home', label: 'Home', path: '/home', icon: <HomeIcon /> },
        // { key: 'about', label: 'About', path: '/about', icon: <InfoIcon /> },
        // { key: 'newhome', label: 'New Home', path: '/new-home', icon: <InfoIcon /> },
        ...(isAuthenticated ? [
            { key: 'dashboard', label: 'Dashboard', path: '/dashboard', icon: <DashboardIcon /> },
            { key: 'income', label: 'Income', path: '/income', icon: <PixIcon /> },
            { key: 'expenses', label: 'Expenses', path: '/expenses', icon: <PaidIcon /> },
            { key: 'classes', label: 'Classes', path: '/classes', icon: <ClassIcon /> },
        ] : []),
        ...(loggedUser.email === 'lavi@gmail.com' ? [
            { key: 'settings', label: 'Settings', path: '/settings', icon: <SettingsIcon /> },
        ] : [])
    ];

    const handleSelect = async (item: { key: string, label: string, path: string, icon: JSX.Element }) => {
        initialService.dispatch(setRouteTitle(item.label));
        initialService.dispatch(setSideBarSelected(item.key));
        initialService.navigate(item.path);
    }

    return (
        <div className={`side-bar-layout padding-20 height-auto flex flex-direction-column justify-content-start dark-background`}>
            <h2 className='padding-10 text-align-center margin-bottom-20 side-bar-header font-18'>{company_name}</h2>
            <nav>
                <List>
                    {navItems.map((item) => (
                        <ListItem key={item.key}>
                            <ListItemButton
                                onClick={() => handleSelect(item)}
                                className={`border-radius-5 ${sideBarSelected === item.key ? `dark-selected-sidebar` : ''} dark-sidebar-hover`}
                                sx={{
                                    borderRadius: '5px',
                                    ":hover": {
                                        backgroundColor: '#635bff9d'
                                    }
                                }}
                            >
                                <ListItemDecorator>
                                    {item.icon}
                                </ListItemDecorator>
                                <ListItemContent>
                                    <Link to={item.path} className={`dark-font font-14`}>
                                        {item.label}
                                    </Link>
                                </ListItemContent>
                            </ListItemButton>
                        </ListItem>
                    ))
                    }
                </List >
            </nav >
        </div >
    );
};

export default Sidebar;
