import classNames from 'classnames';

type Props = {
  size?: 'sm' | 'md' | 'lg' | 'xl';
  children: React.ReactNode;
  bgColor?: 'light' | 'dark';
};
export const Layout: React.VFC<Props> = ({ children, size = 'md', bgColor }) => (
  <div
    className={classNames('max-w-6xl mx-auto', {
      'px-8 md:px-24 py-6': size === 'sm',
      'px-8 md:px-32 py-8': size === 'md',
      'px-8 md:px-40 py-10': size === 'lg',
      'px-8 md:px-64 py-12': size === 'xl',
      'bg-color-background-light': bgColor === 'light',
      'bg-color-background-dark': bgColor === 'dark',
    })}
  >
    {children}
  </div>
);
