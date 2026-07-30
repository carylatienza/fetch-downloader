import { Sora, Outfit, JetBrains_Mono } from 'next/font/google';
import ScrollObserverProvider from '@/components/Providers/ScrollObserverProvider';
import './globals.css';

const sora = Sora({
  subsets: ['latin'],
  variable: '--font-sora',
  display: 'swap',
});

const outfit = Outfit({
  subsets: ['latin'],
  variable: '--font-outfit',
  display: 'swap',
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-jetbrains-mono',
  display: 'swap',
});

export const metadata = {
  title: 'Fetch — Download Videos & Images from Any Platform',
  description: 'Download videos and images from YouTube, Facebook, Instagram, and X in maximum available quality. Free, fast, ad-free.',
  openGraph: {
    title: 'Fetch — Download Videos & Images from Any Platform',
    description: 'The all-in-one media downloader. Grab videos and images from YouTube, Facebook, Instagram, and X.',
    type: 'website',
  },
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={`${sora.variable} ${outfit.variable} ${jetbrainsMono.variable}`}
    >
      <body>
        <div className="bg-noise" aria-hidden="true" />
        <div className="bg-atmosphere" />
        <div className="bg-spotlight" aria-hidden="true" />
        <ScrollObserverProvider>
          <div style={{ position: 'relative', zIndex: 1, minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
            {children}
          </div>
        </ScrollObserverProvider>
      </body>
    </html>
  );
}
