import React from 'react';
import { Header, Sidebar } from '@zenra/components';
import './main-base-layout.css';
import { useSelector } from 'react-redux';
import { RootState } from '@zenra/store';

interface LayoutProps {
    children: React.ReactNode;
    showSidebar?: boolean;
    showTitlebar: boolean;
    titleComponent?: React.ReactNode;
}

const MainBaseLayout: React.FC<LayoutProps> = ({ children, showSidebar = true, titleComponent, showTitlebar }) => {
    const theme = useSelector((state: RootState) => state.theme.theme);
    const { isAuthenticated } = useSelector((state: RootState) => state.auth);

    return (
        <div id='main-base-layout' className='main-base-layout flex'>
            <div className={`dark-background dark-border-right-sidebar`}>
                {showSidebar && <Sidebar isAuthenticated={isAuthenticated} />}
            </div>
            <div className='flex-1 flex flex-direction-column'>
                {showSidebar && <Header isAuthenticated={isAuthenticated} />}
                {showTitlebar &&
                    <div className={`main-header-routes bolder ${theme}-content-background ${theme}-main-header font-16 padding-10`}>
                        <div>
                            {/* {routeTitle} */}
                        </div>
                        <div className='font-12'>
                            {titleComponent}
                        </div>
                    </div>
                }
                <div id='main-base-layout-children' className={`flex-1 padding-10 ${theme}-content-background main-base-layout-children`}>
                    {children}
                </div>
            </div>
        </div>
    );
};

export default MainBaseLayout;
