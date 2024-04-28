import AntdProviders from '@/components/antdProviders/AntdProviders';
import ReduxProviders from '@/components/reduxProviders/ReduxProviders';
import '@/styles/util.css';

export const metadata = {
  title: 'Rent A Car',
  description: 'Find your car',
};

export default function RootLayout({ children }) {
  return (
    <html lang='en'>
      <head>
        <link rel='stylesheet' href='https://cdn.jsdelivr.net/npm/remixicon@3.4.0/fonts/remixicon.css' />
      </head>
      <body>
        <ReduxProviders>
          <AntdProviders>{children}</AntdProviders>
        </ReduxProviders>
      </body>
    </html>
  );
}
