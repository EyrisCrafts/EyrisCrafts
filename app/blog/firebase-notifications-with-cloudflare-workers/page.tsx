import SyntaxHighlighter from 'react-syntax-highlighter';
import ButtonPersonal from "@/components/ButtonPersonal";
import { IoMdHome } from "react-icons/io";
import { agate } from 'react-syntax-highlighter/dist/esm/styles/hljs';

export async function generateMetadata({ params }: { params: { blogId: string } }) {

    return {
        title: "Running free firebase notifications using cloudflare workers",
        description: "Because free is always better",
        openGraph: {
            title: "Running free firebase notifications using cloudflare workers",
            description: "Because free is always better",
            url: `https://eyriscrafts.com/blog/firebase-notifications-with-cloudflare-workers`,
            images: [
                {
                    url: "/blogs/Cloudflare-Workers-The-Free-Cron-Hack/image.png", // Ensure this is a full URL
                    alt: "Running free firebase notifications using cloudflare workers",
                },
            ],
        },
    };
}

export default function Page() {
    const privateKeySample = `
    -----BEGIN PRIVATE KEY-----
    MIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQDMS6tdnoxUght7.......
    -----END PRIVATE KEY-----
    `
    const pemArrayToBuffer = `
    // utility.ts file
    function pemToArrayBuffer(pem: string): ArrayBuffer {
    const pemHeader = "-----BEGIN PRIVATE KEY-----";
    const pemFooter = "-----END PRIVATE KEY-----";
    const pemContents = pem
        .replace(pemHeader, "")
        .replace(pemFooter, "")
        .replace(/\\n/g, "");

    const binaryString = atob(pemContents);
    const binaryLength = binaryString.length;
    const bytes = new Uint8Array(binaryLength);

    for (let i = 0; i < binaryLength; i++) {
        bytes[i] = binaryString.charCodeAt(i);
    }

    return bytes.buffer;
    }`

    const importPrivateKey = `
    async function importPrivateKey(pem: string): Promise<CryptoKey> {
    const keyBuffer = pemToArrayBuffer(pem);

    return await crypto.subtle.importKey(
        "pkcs8",
        keyBuffer,
        {
            name: "RSASSA-PKCS1-v1_5",
            hash: { name: "SHA-256" },
        },
        false,
        ["sign"]
    );
    }`
    const generateJWT = `
    async function createJWT(payload: any, privateKey: string): Promise<string> {
    const encoder = new TextEncoder();

    const encodeBase64Url = (data: string): string => {
        return btoa(data)
            .replace(/\+/g, "-")
            .replace(/\//g, "_")
            .replace(/=+$/, "");
    };

    const header = {
        alg: "RS256",
        typ: "JWT",
    };

    const headerJson = JSON.stringify(header);
    const payloadJson = JSON.stringify(payload);

    const headerBase64Url = encodeBase64Url(headerJson);
    const payloadBase64Url = encodeBase64Url(payloadJson);

    const unsignedToken = \`\${headerBase64Url}.\${payloadBase64Url}\`;

    const cryptoKey = await importPrivateKey(privateKey);

    const signature = await crypto.subtle.sign(
        {
            name: "RSASSA-PKCS1-v1_5",
            hash: { name: "SHA-256" },
        },
        cryptoKey,
        encoder.encode(unsignedToken)
    );

    const signatureBase64Url = encodeBase64Url(
        String.fromCharCode(...new Uint8Array(signature))
    );

    return \`\${unsignedToken}.\${signatureBase64Url}\`;
    }`

    const generateAccessToken = `
    async function getAccessToken(client_email: string, private_key:string ): Promise<string> {
   
    // Generate a new JWT
    const now = Math.floor(Date.now() / 1000);
    const ttl = 3600; // 1 hour
    const payload = {
      iss: client_email,
      scope: "https://www.googleapis.com/auth/firebase.messaging",
      aud: "https://oauth2.googleapis.com/token",
      exp: now + ttl,
      iat: now,
    };

    try {
      const jwt = await createJWT(
        payload,
        private_key
      );

      const response = await fetch("https://oauth2.googleapis.com/token", {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: \`grant_type=urn:ietf:params:oauth:grant-type:jwt-bearer&assertion=\${jwt}\`,
      });

      if (!response.ok) {
        throw new Error(\`HTTP error! status: \${response.status}\`);
      }

      const data = (await response.json()) as FcmTokenResponse;
      const newAccessToken = data.access_token;

      return newAccessToken;
    } catch (error) {
      console.error("Error getting access token:", error);
      throw error;
    }
  }


  export { getAccessToken };
    `;

    const combined = `
    const serviceAccount = {
        type: "service_account",
        project_id: PROJECT_ID,
        private_key_id: PRIVATEKEY_ID,
        private_key:
            "-----BEGIN PRIVATE KEY-----\nMIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQDMS6tdnoxUght7....-----END PRIVATE KEY-----\n",
        client_email: "firebase-adminsdk-stkat@paknews-593a9.iam.gserviceaccount.com",
        client_id: CLIENT_ID,
        auth_uri: "https://accounts.google.com/o/oauth2/auth",
        token_uri: "https://oauth2.googleapis.com/token",
        auth_provider_x509_cert_url: "https://www.googleapis.com/oauth2/v1/certs",
        client_x509_cert_url: CERT_URL,
        universe_domain: "googleapis.com",
    };
    
    const PROJECT_ID = serviceAccount.project_id;
    async function sendFcmMessage(title: string, imageUrl: string) {
    const accessToken = await getAccessToken(serviceAccount.client_email, serviceAccount.private_key);
    console.log("Access token:", accessToken);
    const TOPIC = "production";
    const response = await fetch(
        \`https://fcm.googleapis.com/v1/projects/\${PROJECT_ID}/messages:send\`,
        {
            method: "POST",
            headers: {
                Authorization: \`Bearer \${accessToken}\`,
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                message: {
                    topic: TOPIC,
                    notification: {
                        title: title,
                        image: imageUrl,
                    },
                },
            }),
        }
    );

    if (!response.ok) {
        console.error("Failed to send FCM message:", await response.text());
    } else {
        console.log("FCM message sent successfully. Response:", await response.json());
    }
    }
    `;

    return (
        <div className="max-w-screen-2xl px-4 md:px-16 mx-auto dark:bg-dark-1 bg-grey-3 flex flex-col py-10">

            <ButtonPersonal
                text="Home"
                link="https://eyriscrafts.com"
                icon={<IoMdHome size={24} />}
                shouldOpenNewTab={false}
            />
            <div className="flex justify-center mt-5">
                <img src="/blogs/Cloudflare-Workers-The-Free-Cron-Hack/image.png" className="max-w-screen-lg h-64 lg:h-130" />
            </div>

            <div className="flex justify-center font-bold text-xl md:text-3xl mb-3  mt-10">
                <div className="w-130 text-center">
                    Running free firebase notifications using cloudflare workers
                </div>
            </div>
            <div className="flex justify-center text-lg md:text-xl text-grey-2">
                <div className="w-130 text-center ">
                    Because free is always better
                </div>
            </div>
            <div className='md:max-w-screen-lg mx-auto mt-16'>
                <div className='text-2xl font-bold'>The main issue</div>

                <div className='mt-4'>
                    It used to be much simpler with Firebase FCM APIs. Just sending a single POST request to <SyntaxHighlighter language="bash" style={agate} customStyle={
                        {
                            display: 'inline',
                            backgroundColor: '#121212',
                            padding: '0.2rem',
                        }
                    }>POST https://fcm.googleapis.com/fcm/send</SyntaxHighlighter> with the payload and the server key was enough to send a notification to all the devices subscribed to the topic.
                </div>
                <div className='mt-4'>Unfortunately, with the recent updates by the firebase team for security reasons, they have shifted away from the server key. And instead now use an oAuth Token. The main issue that I faced is that the cloudflare edge given to all cloudlfare workers do not support a lot of important nodeJS libraries such as fs, path or crypto.</div>

                <div className='mt-4'>
                    Here the main issue is that to generate an oAuth token a lot of cryptographic functions are necessary. And the cloudflare workers do not support the crypto library and as such the firebase admin SDK is not supported. So, I had to find a workaround for this. The workaround involves manually implementing the cryptographic functions necessary for generating the oAuth token.
                </div>
                <div className='text-2xl font-bold mt-4'>The workaround</div>
                <div className='mt-4 mb-2'>
                    Firstly, we will need some utility functions to parse the Firebase Private key which has the following format
                </div>
                <div className='overflow-x-auto w-[calc(100vw-2rem)] md:w-full'>
                    <SyntaxHighlighter language="javascript" style={agate} customStyle={
                        {
                            backgroundColor: '#121212',
                            padding: '0.1rem',
                        }
                    }>
                        {privateKeySample}
                    </SyntaxHighlighter>

                </div>
                <div className='mt-2 mb-2'>
                    Create a function called pemArrayToBuffer which will convert the pem key to a buffer
                </div>
                <div className='overflow-x-auto w-[calc(100vw-2rem)] md:w-full'>
                    <SyntaxHighlighter language="typescript" style={agate} customStyle={
                        {
                            backgroundColor: '#121212',
                            padding: '0.1rem',
                        }
                    }>
                        {pemArrayToBuffer}
                    </SyntaxHighlighter>

                </div>
                <div className='mt-2 mb-2'>
                    Then we need a function to import the private key into to a CryptoKey object
                </div>
                <div className='overflow-x-auto w-[calc(100vw-2rem)] md:w-full'>
                    <SyntaxHighlighter language="typescript" style={agate} customStyle={
                        {
                            backgroundColor: '#121212',
                            padding: '0.1rem',
                        }
                    }>
                        {importPrivateKey}
                    </SyntaxHighlighter>

                </div>

                <div className='mt-2 mb-2'>
                    Now we just generate the JWT token using the cryptoKey object
                </div>
                <div className='overflow-x-auto w-[calc(100vw-2rem)] md:w-full'>
                    <SyntaxHighlighter language="typescript" style={agate} customStyle={
                        {
                            backgroundColor: '#121212',
                            padding: '0.1rem',
                        }
                    }>
                        {generateJWT}
                    </SyntaxHighlighter>

                </div>
                <div className='mt-2 mb-2'>
                    Finally, we generate the access token using the JWT token
                </div>
                <div className='overflow-x-auto w-[calc(100vw-2rem)] md:w-full'>
                    <SyntaxHighlighter language="typescript" style={agate} customStyle={
                        {
                            backgroundColor: '#121212',
                            padding: '0.1rem',
                        }
                    }>
                        {generateAccessToken}
                    </SyntaxHighlighter>

                </div>
                <div className='mt-4 text-bold text-2xl'> How to use this in cloudflare worker</div>
                <div className='mt-2 mb-2'>
                    Finally, combining everything, you can easily use the functions in the cloudflare worker to generate the access token and send the notification to the firebase server.
                </div>
                <div className='overflow-x-auto w-[calc(100vw-2rem)] md:w-full'>
                    <SyntaxHighlighter language="typescript" style={agate} customStyle={
                        {
                            backgroundColor: '#121212',
                            padding: '0.1rem',
                        }
                    }>
                        {combined}
                    </SyntaxHighlighter>

                </div>
                <div className='text-bold text-2xl mt-4'>
                    Conclusion
                </div>
                <div className='mt-2'>
                    The main issue was that the cloudflare workers do not support the crypto library and as such the firebase admin SDK is not supported. But by manually implementing the cryptographic functions necessary for generating the oAuth token, we can easily send notifications to the firebase server.
                    The biggest benefit of this is that since firebase made the firebase functions part of the paid tier, this workaround allows us to send notifications for free. And since cloudflare workers are free, this is a great workaround for setting up a cronjob
                </div>
            </div>
            <br />
            <br />
            <br />
            <br />
        </div>
    );
}
