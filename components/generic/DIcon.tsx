import type { FunctionComponent } from 'react';
import classNames from 'classnames';

type DIconProps = {
  icon: string,
  className?: string,
};

const DIcon: FunctionComponent<DIconProps> = ({
  icon,
  className,
}: DIconProps) => (
  <svg
    className={classNames(
      'fill-current inline-block',
      className,
    )}
    fill='currentcolor'
    viewBox='0 0 24 24'
  >
    <path d={icon} />
  </svg>
);

DIcon.defaultProps = {
  className: '',
};

export default DIcon;
