import { useEffect, useState } from 'react';
import './features-base.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import * as fa from '@fortawesome/free-solid-svg-icons';
import { useLocation } from 'react-router-dom';

export interface FeaturesBaseProps {
  main: React.ReactNode;
  aside?: React.ReactNode;
  article?: React.ReactNode;
  filters?: React.ReactNode;
  cssClass?: React.ReactNode;
  isDefaultCollapsed?: boolean;
  isNoScrollX?: boolean;
}

export const FeaturesBase: React.FC<FeaturesBaseProps> = ({ aside, main, article,filters,cssClass,isDefaultCollapsed = true, isNoScrollX = false }) => {
  const [isCollapsed, setIsCollapsed] = useState(isDefaultCollapsed);
  const location = useLocation();
  const [currentPath, setCurrentPath] = useState(window.location.pathname); 

  const toggleCollapse = () => setIsCollapsed(!isCollapsed);

  useEffect(() => {
    if (location.pathname !== currentPath) {
      if (filters) {
        setIsCollapsed(false); 
      }
      setCurrentPath(location.pathname); 
    }
  }, [location, currentPath, filters]);

  return (
    <section className='features-base'>
      {aside && <aside>{aside}</aside>}
      <main className={isNoScrollX ? "component-no-scroll-x" : ""}>{main}</main>
      {article && <article className={`${cssClass}`}>{article}</article>}

      {filters && (
        <>
          <button
            className="toggle-filters-btn"
            onClick={toggleCollapse}
            aria-label="Toggle Filters"
          >
            <FontAwesomeIcon icon={isCollapsed ? fa.faFilter : fa.faClose} />
          </button>
          <div
            className={`filters-overlay ${isCollapsed ? 'collapsed' : ''}`}
          >
            <button
              className="close-filters-btn"
              onClick={toggleCollapse}
              aria-label="Close Filters"
            >
              <FontAwesomeIcon icon={fa.faTimes} />
            </button>

            <div className="filters-content">{filters}</div>
          </div>
        </>
      )}
    </section>
  );
};

export default FeaturesBase;
