// derive base URL from environment variable, falls back to localhost
const BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000';

export const getGuideImageUrls = (guide) => {
  if (!guide || !guide.guideImage) return [];
  
  let images = [];
  
  try {
    images = typeof guide.guideImage === 'string' 
      ? JSON.parse(guide.guideImage) 
      : guide.guideImage;
  } catch (e) {
    images = [guide.guideImage];
  }
  
  return images.map(image => {
    if (image && image.startsWith('guides/')) {
      return `${BASE_URL}/storage/${image}`;
    } else if (image) {
      return `${BASE_URL}/storage/guides/${image}`;
    }
    return "/default-guide.jpg";
  });
};

export const getMainGuideImage = (guide) => {
  const urls = getGuideImageUrls(guide);
  return urls[0] || "/default-guide.jpg";
};

export const getShopImageUrls = (shop) => {
  if (!shop || !shop.shopImage) return [];
  
  let images = [];
  
  try {
    images = typeof shop.shopImage === 'string' 
      ? JSON.parse(shop.shopImage) 
      : shop.shopImage;
  } catch (e) {
    images = [shop.shopImage];
  }
  
  return images.map(image => {
    if (image && image.startsWith('shops/')) {
      return `${BASE_URL}/storage/${image}`;
    } else if (image) {
      return `${BASE_URL}/storage/shops/${image}`;
    }
    return "/default-shop.jpg";
  });
};

export const getMainShopImage = (shop) => {
  const urls = getShopImageUrls(shop);
  return urls[0] || "/default-shop.jpg";
};

export const getHotelImageUrls = (hotel) => {
  if (!hotel) return [];
  
  // Use new backend `images` relation if available
  if (hotel.images && Array.isArray(hotel.images) && hotel.images.length > 0) {
    return hotel.images.map(img => {
      const path = img.image_path;
      if (path && path.startsWith('hotels/')) {
        return `${BASE_URL}/storage/${path}`;
      } else if (path) {
        return `${BASE_URL}/storage/hotels/${path}`;
      }
      return "/default-hotel.jpg";
    });
  }

  // Fallback to old property
  if (!hotel.hotelImage) return [];
  
  let images = [];
  
  try {
    images = typeof hotel.hotelImage === 'string' 
      ? JSON.parse(hotel.hotelImage) 
      : hotel.hotelImage;
  } catch (e) {
    images = [hotel.hotelImage];
  }
  
  return images.map(image => {
    if (image && image.startsWith('hotels/')) {
      return `${BASE_URL}/storage/${image}`;
    } else if (image) {
      return `${BASE_URL}/storage/hotels/${image}`;
    }
    return "/default-hotel.jpg";
  });
};

export const getMainHotelImage = (hotel) => {
  const urls = getHotelImageUrls(hotel);
  return urls[0] || "/default-hotel.jpg";
};

export const getVehicleImageUrls = (vehicle) => {
  if (!vehicle) return [];
  
  // Handle new format (array of objects with image_path)
  if (vehicle.images && Array.isArray(vehicle.images) && vehicle.images.length > 0) {
    return vehicle.images.map(img => {
      const path = img.image_path;
      if (path && path.startsWith('vehicles/')) {
        return `${BASE_URL}/storage/${path}`;
      } else if (path) {
        return `${BASE_URL}/storage/vehicles/${path}`;
      }
      return "/default-vehicle.jpg";
    });
  }

  // Handle old format (stringified JSON array or array of strings in vehicleImage)
  if (!vehicle.vehicleImage) return [];
  
  let images = [];
  try {
    images = typeof vehicle.vehicleImage === 'string' 
      ? JSON.parse(vehicle.vehicleImage) 
      : vehicle.vehicleImage;
  } catch (e) {
    images = [vehicle.vehicleImage];
  }
  
  // Ensure images is an array before mapping
  if (!Array.isArray(images)) {
     images = [images];
  }
  
  return images.map(image => {
    if (image && typeof image === 'string' && image.startsWith('vehicles/')) {
      return `${BASE_URL}/storage/${image}`;
    } else if (image && typeof image === 'string') {
      return `${BASE_URL}/storage/vehicles/${image}`;
    }
    return "/default-vehicle.jpg";
  });
};

export const getMainVehicleImage = (vehicle) => {
  const urls = getVehicleImageUrls(vehicle);
  return urls[0] || "/default-vehicle.jpg";
};