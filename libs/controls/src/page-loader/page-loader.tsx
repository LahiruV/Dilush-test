
import { Loader } from '@progress/kendo-react-indicators';

export const PageLoader = () => {
    return <div
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor: 'rgba(255, 255, 255, 0.8)',
              zIndex: 9999,
            }}
          >
            <Loader size="large" type="infinite-spinner" />
          </div>
}