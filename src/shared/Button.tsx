import classNames from 'classnames';

type Props = JSX.IntrinsicElements['button'] & {
  children: React.ReactNode;
  theme?: 'primary' | 'secondary' | 'danger';
  inProgress?: boolean;
};

export const Button: React.VFC<Props> = ({ children, theme = 'primary', inProgress = false, ...props }) => {
  return (
    <button
      className={classNames({
        'inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500':
          theme === 'primary',
        'bg-white py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500':
          theme === 'secondary',
        'w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-red-600 text-base font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:w-auto sm:text-sm':
          theme === 'danger',
        'cursor-not-allowed': !!props?.disabled,
      })}
      style={{ minWidth: 'fit-content' }}
      {...props}
    >
      {inProgress && <ButtonLoader />}
      {children}
    </button>
  );
};

const ButtonLoader: React.VFC = () => (
  <svg
    className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
  >
    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
    <path
      className="opacity-75"
      fill="currentColor"
      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
    ></path>
  </svg>
);
