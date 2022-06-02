import useAuth from '@/lib/useAuth';
import React from 'react';
import DLoading from '@/components/generic/DLoading';

type GuestRequiredProps = {
  children: React.ReactChild | React.ReactChild[],
};

const GuestRequired : React.FC<GuestRequiredProps> = ({
  children,
}: GuestRequiredProps) => {
  const { authorized } = useAuth();

  if (authorized) return <DLoading />;

  return (
    // eslint-disable-next-line react/jsx-no-useless-fragment
    <>{children}</>
  );
};

export default GuestRequired;
