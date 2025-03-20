// Utility function to delay execution
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

// Queue for managing requests
let requestQueue: Promise<any> = Promise.resolve();

export async function getOpenGraphImage(url: string): Promise<string | null> {
  try {
    // Add this request to the queue with delay to handle rate limiting
    requestQueue = requestQueue.then(() => delay(500)); // 500ms delay between requests
    await requestQueue;

    // First get image URL from microlink
    const response = await fetch(`https://api.microlink.io?url=${encodeURIComponent(url)}`);
    const data = await response.json();

    if (data.status === 'success') {
      // Function to convert image URL to base64 using allorigins with retries
      const getBase64Image = async (imageUrl: string, retryCount = 0): Promise<string | null> => {
        try {
          // Add delay between retries
          if (retryCount > 0) {
            await delay(1000 * retryCount); // Exponential backoff
          }

          // Try different proxy services in order
          const proxyUrls = [
            `https://api.allorigins.win/raw?url=${encodeURIComponent(imageUrl)}`,
            `https://cors-anywhere.herokuapp.com/${imageUrl}`,
            `https://api.codetabs.com/v1/proxy?quest=${encodeURIComponent(imageUrl)}`,
          ];

          for (const proxyUrl of proxyUrls) {
            try {
              const response = await fetch(proxyUrl, {
                mode: 'cors',
                headers: {
                  Origin: window.location.origin,
                },
              });

              if (response.ok) {
                const blob = await response.blob();
                return new Promise(resolve => {
                  const reader = new FileReader();
                  reader.onloadend = () => resolve(reader.result as string);
                  reader.readAsDataURL(blob);
                });
              }
            } catch (proxyError) {
              console.log(`Proxy ${proxyUrl} failed, trying next...`);
              continue;
            }
          }

          // If all proxies fail and we haven't retried too many times, try again
          if (retryCount < 3) {
            return getBase64Image(imageUrl, retryCount + 1);
          }

          // Last resort: try direct fetch with no-cors
          try {
            const response = await fetch(imageUrl, { mode: 'no-cors' });
            const blob = await response.blob();
            return new Promise(resolve => {
              const reader = new FileReader();
              reader.onloadend = () => resolve(reader.result as string);
              reader.readAsDataURL(blob);
            });
          } catch (directError) {
            console.error('Direct fetch failed:', directError);
            return null;
          }
        } catch (error) {
          console.error('Error fetching image:', error);
          return null;
        }
      };

      // Try each possible image source in order
      const imageSources = [
        data.data.image?.url,
        data.data.og?.image?.url,
        data.data.screenshot?.url,
        data.data.logo?.url,
      ].filter(Boolean); // Remove null/undefined values

      for (const imageUrl of imageSources) {
        const base64Image = await getBase64Image(imageUrl);
        if (base64Image && base64Image.startsWith('data:image/')) {
          return base64Image;
        }
      }
    }
    return null;
  } catch (error) {
    console.error('Error in getOpenGraphImage:', error);
    return null;
  }
}
