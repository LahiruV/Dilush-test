import './section-main-base.css';

export interface SectionMainBaseProps {
  main: React.ReactNode;
  header?: React.ReactNode;
  footer?: React.ReactNode;
  mainClassName?: string;
}

export const SectionMainBase: React.FC<SectionMainBaseProps> = ({ header, main, footer, mainClassName }) => (
  <section className='section-main-base'>
    {header && <header>{header}</header>}
    <main className={mainClassName}>{main}</main>
    {footer && <footer>{footer}</footer>}
  </section>
);

export default SectionMainBase;
