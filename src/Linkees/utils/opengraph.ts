export async function getOpenGraphImage(url: string): Promise<string | null> {
  try {
    const response = await fetch(`https://api.microlink.io?url=${encodeURIComponent(url)}`);
    const data = await response.json();

    if (data.status === 'success') {
      // Helper function to validate image URL
      const validateImageUrl = async (imageUrl: string): Promise<string | null> => {
        try {
          const response = await fetch(imageUrl, { method: 'HEAD' });
          if (response.ok && response.headers.get('content-type')?.startsWith('image/')) {
            return imageUrl;
          }
          return null;
        } catch (error) {
          return null;
        }
      };

      // Primary source: data.image
      if (data.data.image?.url) {
        const validatedUrl = await validateImageUrl(data.data.image.url);
        if (validatedUrl) return validatedUrl;
      }

      // Fallback 1: og:image
      if (data.data.og?.image?.url) {
        const validatedUrl = await validateImageUrl(data.data.og.image.url);
        if (validatedUrl) return validatedUrl;
      }

      // Fallback 2: screenshot
      if (data.data.screenshot?.url) {
        const validatedUrl = await validateImageUrl(data.data.screenshot.url);
        if (validatedUrl) return validatedUrl;
      }

      // Fallback 3: logo
      if (data.data.logo?.url) {
        const validatedUrl = await validateImageUrl(data.data.logo.url);
        if (validatedUrl) return validatedUrl;
      }
    }
    return null;
  } catch (error) {
    return null;
  }
}
