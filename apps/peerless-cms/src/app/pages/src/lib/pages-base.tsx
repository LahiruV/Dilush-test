import './pages-base.css';

export interface PagesBaseProps {
  main: React.ReactNode;
  header?: React.ReactNode;
  footer?: React.ReactNode;
}

export const PagesBase: React.FC<PagesBaseProps> = ({ header, main, footer }) => (
  <section className='pages-base'>
    {header && <header>{header}</header>}
    <main>{main}</main>
    {footer && <footer>{footer}</footer>}
  </section>
);

export default PagesBase;
