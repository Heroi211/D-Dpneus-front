// Serviço de geocodificação com cache local para otimizar uso da API do Google
// Cache evita re-geocodificar endereços já processados

const CACHE_KEY = "google_maps_geocoding_cache";
const CACHE_EXPIRY_DAYS = 30; // Cache válido por 30 dias

// Obter cache do localStorage
const getCache = () => {
  try {
    const cached = localStorage.getItem(CACHE_KEY);
    if (cached) {
      const parsed = JSON.parse(cached);
      // Filtrar itens expirados
      const now = Date.now();
      const valid = parsed.filter(item => {
        return item.expiry && item.expiry > now;
      });
      return valid.reduce((acc, item) => {
        acc[item.address] = item;
        return acc;
      }, {});
    }
  } catch (error) {
    console.error("Erro ao ler cache de geocodificação:", error);
  }
  return {};
};

// Salvar no cache
const saveCache = (address, lat, lng) => {
  try {
    const cache = getCache();
    const expiry = Date.now() + (CACHE_EXPIRY_DAYS * 24 * 60 * 60 * 1000);
    
    cache[address] = {
      address,
      lat,
      lng,
      expiry,
      cachedAt: Date.now(),
    };

    const cacheArray = Object.values(cache);
    localStorage.setItem(CACHE_KEY, JSON.stringify(cacheArray));
  } catch (error) {
    console.error("Erro ao salvar cache de geocodificação:", error);
  }
};

// Limpar cache expirado (opcional, pode ser chamado periodicamente)
export const clearExpiredCache = () => {
  const cache = getCache();
  const cacheArray = Object.values(cache);
  localStorage.setItem(CACHE_KEY, JSON.stringify(cacheArray));
};

// Geocodificar endereço (com cache)
export const geocodeAddress = async (address) => {
  if (!address || !address.trim()) {
    return null;
  }

  // Normalizar endereço para usar como chave do cache
  const normalizedAddress = address.trim().toLowerCase();

  // Verificar cache primeiro
  const cache = getCache();
  if (cache[normalizedAddress]) {
    const cached = cache[normalizedAddress];
    return {
      lat: cached.lat,
      lng: cached.lng,
      fromCache: true,
    };
  }

  // Se não estiver no cache e não tiver Google Maps carregado, retornar null
  if (!window.google || !window.google.maps) {
    console.warn("Google Maps API não está disponível para geocodificação");
    return null;
  }

  // Fazer geocodificação via API (usa créditos)
  return new Promise((resolve) => {
    const geocoder = new window.google.maps.Geocoder();
    
    geocoder.geocode({ address }, (results, status) => {
      if (status === "OK" && results && results[0]) {
        const location = results[0].geometry.location;
        const lat = location.lat();
        const lng = location.lng();
        
        // Salvar no cache
        saveCache(normalizedAddress, lat, lng);
        
        resolve({
          lat,
          lng,
          fromCache: false,
        });
      } else {
        console.warn(`Geocodificação falhou para "${address}":`, status);
        resolve(null);
      }
    });
  });
};

// Geocodificar múltiplos endereços em batch (com delay para evitar rate limit)
export const geocodeAddresses = async (addresses, delayMs = 200) => {
  const results = [];
  
  for (const address of addresses) {
    // Verificar cache primeiro
    const cached = await geocodeAddress(address);
    if (cached) {
      results.push(cached);
      // Se veio do cache, não precisa de delay
      if (cached.fromCache) {
        continue;
      }
    } else {
      results.push(null);
    }
    
    // Delay apenas entre chamadas reais à API (não entre cache hits)
    if (!cached || !cached.fromCache) {
      await new Promise(resolve => setTimeout(resolve, delayMs));
    }
  }
  
  return results;
};

// Construir endereço completo a partir dos dados do cliente
export const buildFullAddress = (cliente) => {
  const parts = [];
  
  if (cliente.endereco) parts.push(cliente.endereco);
  if (cliente.numero) parts.push(cliente.numero);
  if (cliente.bairro) parts.push(cliente.bairro);
  if (cliente.cidade) parts.push(cliente.cidade);
  if (cliente.estado) parts.push(cliente.estado);
  if (cliente.cep) parts.push(cliente.cep);
  
  return parts.join(", ");
};

export default {
  geocodeAddress,
  geocodeAddresses,
  buildFullAddress,
  clearExpiredCache,
  getCache,
};
