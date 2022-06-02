import useAuth from '@/lib/useAuth';
import React from 'react';
import DLoading from '@/components/generic/DLoading';

type LogInRequiredProps = {
  children: React.ReactChild | React.ReactChild[],
};

const LogInRequired : React.FC<LogInRequiredProps> = ({
  children,
}: LogInRequiredProps) => {
  const { authorized } = useAuth();

  if (!authorized) return <DLoading />;

  return (
    // eslint-disable-next-line react/jsx-no-useless-fragment
    <>{children}</>
  );
};

export default LogInRequired;
