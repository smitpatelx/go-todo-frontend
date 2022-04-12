import {
  Head, Html, Main, NextScript,
} from 'next/document';

const Document = () => (
  <Html>
    <Head>
      <meta
        content='
        We are a car buying concierge service.
        We do two things:
        - Help you figure out the perfect type of vehicle to meet your needs.
        - Match you to options available for purchase across Canada.
        '
        name='description'
      />
      <link
        href='/favicon.ico'
        rel='icon'
      />
      <link
        href='https://fonts.googleapis.com'
        rel='preconnect'
      />
      <link
        href='https://fonts.gstatic.com'
        rel='preconnect'
      />
      <link
        href='https://fonts.googleapis.com/css2?family=Raleway:wght@400;500;600;700&display=swap'
        rel='stylesheet'
      />
    </Head>
    <body>
      <Main />
      <NextScript />
    </body>
  </Html>
);

export default Document;
