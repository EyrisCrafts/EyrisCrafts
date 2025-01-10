import type { Metadata } from "next";
import { ThemeProvider } from 'next-themes'

export const metadata: Metadata = {
    title: 'Running free firebase notifications using cloudflare workers',
    description: 'Because free is always better',
    keywords: ['firebase', 'cloudflare', 'workers', 'notifications'],
    creator: 'Eyriscrafts',
    openGraph: {
      title: 'Running free firebase notifications using cloudflare workers',
      description: 'Because free is always better',
      type: 'website',
      url: 'https://eyriscrafts.com/blog/firebase-notifications-with-cloudflare-workers',
      images: [
          'https://eyriscrafts.com/blogs/Cloudflare-Workers-The-Free-Cron-Hack/image.png'
      ],
    },
    
  }

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning className="dark">
        <head>
            <title>
                Running free firebase notifications using cloudflare workers
            </title>
            <meta name="description" content="Because free is always better" />
            <meta name="keywords" content="firebase, cloudflare, workers, notifications" />
            <meta name="creator" content="Eyriscrafts" />
            <meta property="og:title" content="Running free firebase notifications using cloudflare workers" />
            <meta property="og:description" content="Because free is always better" />
            <meta property="og:type" content="website" />
            <meta property="og:url" content="https://eyriscrafts.com/blog/firebase-notifications-with-cloudflare-workers" />
            <meta property="og:image" content="https://eyriscrafts.com/blogs/Cloudflare-Workers-The-Free-Cron-Hack/image.png" />
        </head>
      <body className="bg-grey-3 dark:bg-dark-1 transition duration-300">
      <ThemeProvider attribute="class">{children}</ThemeProvider>
      </body>
    </html>
  );
}
