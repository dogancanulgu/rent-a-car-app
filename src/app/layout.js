import AntdProviders from '@/components/AntdProviders';
import "@/styles/util.css"

export const metadata = {
  title: 'Rent A Car',
  description: 'Find your car',
};

export default function RootLayout({ children }) {
  return (
    <html lang='en'>
      <body>
        <AntdProviders>{children}</AntdProviders>
      </body>
    </html>
  );
}
