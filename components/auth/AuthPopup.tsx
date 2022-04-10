import { mdiGoogle } from '@mdi/js';
import React from 'react';
import DIcon from '../generic/DIcon';
import DLink from '../generic/DLink';

type AuthPopupProps = {
  provider: string,
};

const AuthPopup: React.FunctionComponent<AuthPopupProps> = ({
  provider,
}: AuthPopupProps) => {
  const [disabled, setDisabled] = React.useState(false);
  const [popup, setPopup] = React.useState<Window | null>(null);

  const checkPopup = () => {
    const check = setInterval(() => {
      if (!popup || popup.closed || popup.closed === undefined) {
        clearInterval(check);
        setDisabled(false);
      }
    }, 1000);
  };

  const openPopup = () => {
    const width = 600; const
      height = 600;
    const left = (window.innerWidth / 2) - (width / 2);
    const top = (window.innerHeight / 2) - (height / 2);
    const url = `${process.env.NEXT_PUBLIC_BACKEND_URL || ''}/auth/login/${provider}`;

    return window.open(
      url,
      'blank',
      `toolbar=no, location=no, directories=no, status=no, menubar=no, 
      scrollbars=no, resizable=no, copyhistory=no, width=${width}, 
      height=${height}, top=${top}, left=${left}`,
    );
  };

  const startAuth = () => {
    if (!disabled) {
      const popupX = openPopup();
      setPopup(popupX);
      checkPopup();
      setDisabled(true);
    }
  };

  return (
    <DLink
      href='http://127.0.0.1:3001/auth/login/google'
      size='base'
      theme='accent'
      title='login'
    >
      <DIcon
        className='w-5 h-5 mr-2 text-yellow-500'
        icon={mdiGoogle}
      />
      Login with Google
    </DLink>
  );
};

export default AuthPopup;
