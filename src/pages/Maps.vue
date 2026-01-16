<template>
  <card type="plain" title="Mapa de Clientes">
    <div id="map" class="map"></div>
    <div v-if="!mapLoaded" class="map-loading" style="padding: 20px; text-align: center; color: #fff;">
      Carregando mapa...
    </div>
  </card>
</template>
<script>
import { clientesApi, useMocks } from "@/services/api";
import { mockClientes } from "@/services/mocks";
import geocodingService, { buildFullAddress } from "@/services/geocoding";
import logger from "@/utils/logger";

export default {
  data() {
    return {
      mapLoaded: false,
      map: null,
      markers: [],
      clientes: [],
    };
  },
  methods: {
    loadGoogleMapsScript() {
      return new Promise((resolve, reject) => {
        // Verificar se já está carregado
        if (window.google && window.google.maps) {
          resolve();
          return;
        }

        // Verificar se já existe um script carregando
        const existingScript = document.querySelector('script[src*="maps.googleapis.com"]');
        if (existingScript) {
          existingScript.addEventListener('load', resolve);
          existingScript.addEventListener('error', reject);
          return;
        }

        // Obter chave da API do ambiente ou usar uma padrão
        const apiKey = process.env.VUE_APP_GOOGLE_MAPS_API_KEY || "YOUR_KEY_HERE";
        
        if (apiKey === "YOUR_KEY_HERE") {
          console.warn("⚠️ Chave do Google Maps não configurada. Configure VUE_APP_GOOGLE_MAPS_API_KEY no .env");
        }

        // Criar e adicionar script
        const script = document.createElement('script');
        script.src = `https://maps.googleapis.com/maps/api/js?key=${apiKey}`;
        script.async = true;
        script.defer = true;
        script.onload = resolve;
        script.onerror = reject;
        document.head.appendChild(script);
      });
    },
    async loadClientes() {
      if (useMocks()) {
        this.clientes = [...mockClientes];
      } else {
        try {
          const dados = await clientesApi.getAll();
          this.clientes = dados || [];
        } catch (error) {
          logger.error("Erro ao carregar clientes:", error);
        }
      }
    },
    async initMap() {
      // Carregar clientes primeiro
      await this.loadClientes();
      
      // Determinar centro do mapa baseado nos clientes ou usar padrão
      let centerLat = -23.5505; // São Paulo
      let centerLng = -46.6333;
      let zoom = 12;
      
      // Se houver clientes, calcular centro médio
      const clientesComCoordenadas = this.clientes.filter(c => c.latitude && c.longitude);
      if (clientesComCoordenadas.length > 0) {
        const sumLat = clientesComCoordenadas.reduce((sum, c) => sum + parseFloat(c.latitude), 0);
        const sumLng = clientesComCoordenadas.reduce((sum, c) => sum + parseFloat(c.longitude), 0);
        centerLat = sumLat / clientesComCoordenadas.length;
        centerLng = sumLng / clientesComCoordenadas.length;
        
        if (clientesComCoordenadas.length === 1) {
          zoom = 15;
        } else if (clientesComCoordenadas.length < 5) {
          zoom = 13;
        }
      }
      
      let myLatlng = new window.google.maps.LatLng(centerLat, centerLng);
    let mapOptions = {
      zoom: zoom,
      center: myLatlng,
      scrollwheel: false, //we disable de scroll over the map, it is a really annoing when you scroll through page
      mapTypeControl: false, // Remove controle de tipo de mapa
      streetViewControl: false, // Remove controle do Street View
      fullscreenControl: false, // Remove controle de tela cheia
      styles: [
        {
          elementType: "geometry",
          stylers: [
            {
              color: "#1d2c4d",
            },
          ],
        },
        {
          elementType: "labels.text.fill",
          stylers: [
            {
              color: "#8ec3b9",
            },
          ],
        },
        {
          elementType: "labels.text.stroke",
          stylers: [
            {
              color: "#1a3646",
            },
          ],
        },
        {
          featureType: "administrative.country",
          elementType: "geometry.stroke",
          stylers: [
            {
              color: "#4b6878",
            },
          ],
        },
        {
          featureType: "administrative.land_parcel",
          elementType: "labels.text.fill",
          stylers: [
            {
              color: "#64779e",
            },
          ],
        },
        {
          featureType: "administrative.province",
          elementType: "geometry.stroke",
          stylers: [
            {
              color: "#4b6878",
            },
          ],
        },
        {
          featureType: "landscape.man_made",
          elementType: "geometry.stroke",
          stylers: [
            {
              color: "#334e87",
            },
          ],
        },
        {
          featureType: "landscape.natural",
          elementType: "geometry",
          stylers: [
            {
              color: "#023e58",
            },
          ],
        },
        {
          featureType: "poi",
          stylers: [
            {
              visibility: "off",
            },
          ],
        },
        {
          featureType: "poi.park",
          stylers: [
            {
              visibility: "off",
            },
          ],
        },
        {
          featureType: "poi.business",
          stylers: [
            {
              visibility: "off",
            },
          ],
        },
        {
          featureType: "poi.attraction",
          stylers: [
            {
              visibility: "off",
            },
          ],
        },
        {
          featureType: "road",
          elementType: "geometry",
          stylers: [
            {
              color: "#304a7d",
            },
          ],
        },
        {
          featureType: "road",
          elementType: "labels.text.fill",
          stylers: [
            {
              color: "#98a5be",
            },
          ],
        },
        {
          featureType: "road",
          elementType: "labels.text.stroke",
          stylers: [
            {
              color: "#1d2c4d",
            },
          ],
        },
        {
          featureType: "road.highway",
          elementType: "geometry",
          stylers: [
            {
              color: "#2c6675",
            },
          ],
        },
        {
          featureType: "road.highway",
          elementType: "geometry.fill",
          stylers: [
            {
              color: "#9d2a80",
            },
          ],
        },
        {
          featureType: "road.highway",
          elementType: "geometry.stroke",
          stylers: [
            {
              color: "#9d2a80",
            },
          ],
        },
        {
          featureType: "road.highway",
          elementType: "labels.text.fill",
          stylers: [
            {
              color: "#b0d5ce",
            },
          ],
        },
        {
          featureType: "road.highway",
          elementType: "labels.text.stroke",
          stylers: [
            {
              color: "#023e58",
            },
          ],
        },
        {
          featureType: "transit",
          elementType: "labels.text.fill",
          stylers: [
            {
              color: "#98a5be",
            },
          ],
        },
        {
          featureType: "transit",
          elementType: "labels.text.stroke",
          stylers: [
            {
              color: "#1d2c4d",
            },
          ],
        },
        {
          featureType: "transit.line",
          elementType: "geometry.fill",
          stylers: [
            {
              color: "#283d6a",
            },
          ],
        },
        {
          featureType: "transit.station",
          elementType: "geometry",
          stylers: [
            {
              color: "#3a4762",
            },
          ],
        },
        {
          featureType: "water",
          elementType: "geometry",
          stylers: [
            {
              color: "#0e1626",
            },
          ],
        },
        {
          featureType: "water",
          elementType: "labels.text.fill",
          stylers: [
            {
              color: "#4e6d70",
            },
          ],
        },
      ],
    };
      // Verificar se o Google Maps está carregado
      if (!window.google || !window.google.maps) {
        logger.error("Google Maps API não foi carregada. Verifique a chave da API.");
        return;
      }

      this.map = new window.google.maps.Map(
        document.getElementById("map"),
        mapOptions
      );
      
      // Adicionar marcadores para cada cliente
      await this.addClientMarkers();
      
      this.mapLoaded = true;
    },
    async addClientMarkers() {
      if (!this.map) return;
      
      // Limpar marcadores existentes
      this.markers.forEach(marker => marker.setMap(null));
      this.markers = [];
      
      // Processar cada cliente
      for (const cliente of this.clientes) {
        // Pular clientes inativos (opcional)
        if (cliente.ativo === false) continue;
        
        let lat = cliente.latitude;
        let lng = cliente.longitude;
        
        // Se não tiver coordenadas, tentar geocodificar
        if (!lat || !lng) {
          const fullAddress = buildFullAddress(cliente);
          if (fullAddress) {
            try {
              const geocodeResult = await geocodingService.geocodeAddress(fullAddress);
              if (geocodeResult) {
                lat = geocodeResult.lat;
                lng = geocodeResult.lng;
                // Se não veio do cache, esperar um pouco para evitar rate limit
                if (!geocodeResult.fromCache) {
                  await new Promise(resolve => setTimeout(resolve, 200));
                }
              }
            } catch (error) {
              logger.error(`Erro ao geocodificar endereço do cliente ${cliente.nome}:`, error);
              continue; // Pular este cliente
            }
          } else {
            continue; // Sem endereço, pular
          }
        }
        
        // Criar marcador com ícone de alfinete
        if (lat && lng) {
          // Ícone SVG de alfinete personalizado
          const pinIcon = {
            path: window.google.maps.SymbolPath.CIRCLE,
            scale: 8,
            fillColor: "#FF0000",
            fillOpacity: 1,
            strokeColor: "#FFFFFF",
            strokeWeight: 2,
            // Usar ícone de pin customizado via SVG
          };
          
          // Alternativa: usar ícone de pin SVG como imagem
          const pinImage = {
            url: "data:image/svg+xml;charset=UTF-8," + encodeURIComponent(`
              <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="#FF0000">
                <path d="M12 0C8.13 0 5 3.13 5 7c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
              </svg>
            `),
            scaledSize: new window.google.maps.Size(32, 32),
            anchor: new window.google.maps.Point(16, 32),
          };
          
          const marker = new window.google.maps.Marker({
            position: { lat: parseFloat(lat), lng: parseFloat(lng) },
            map: this.map,
            title: `${cliente.nome} ${cliente.sobrenome || ""}`,
            icon: pinImage,
            animation: window.google.maps.Animation.DROP,
          });
          
          // Info Window ao clicar no marcador
          const infoContent = this.buildInfoWindowContent(cliente);
          const infoWindow = new window.google.maps.InfoWindow({
            content: infoContent,
          });
          
          marker.addListener("click", () => {
            infoWindow.open(this.map, marker);
          });
          
          this.markers.push(marker);
        }
      }
      
      // Ajustar zoom se necessário para mostrar todos os marcadores
      logger.debug(`Total de marcadores criados: ${this.markers.length}`);
      
      if (this.markers.length > 0) {
        const bounds = new window.google.maps.LatLngBounds();
        this.markers.forEach(marker => {
          bounds.extend(marker.getPosition());
        });
        this.map.fitBounds(bounds);
      } else {
        logger.warn("Nenhum marcador foi criado. Verifique se os clientes têm coordenadas (latitude/longitude) ou endereço completo.");
      }
    },
    buildInfoWindowContent(cliente) {
      const nome = `${cliente.nome} ${cliente.sobrenome || ""}`.trim();
      const endereco = buildFullAddress(cliente);
      
      return `
        <div style="padding: 10px; min-width: 200px;">
          <h4 style="margin: 0 0 10px 0; color: #333;">${nome}</h4>
          ${cliente.telefone ? `<p style="margin: 5px 0; color: #666;"><strong>Telefone:</strong> ${cliente.telefone}</p>` : ''}
          ${endereco ? `<p style="margin: 5px 0; color: #666;"><strong>Endereço:</strong> ${endereco}</p>` : ''}
          ${cliente.bairro ? `<p style="margin: 5px 0; color: #666;"><strong>Bairro:</strong> ${cliente.bairro}</p>` : ''}
        </div>
      `;
    },
  },
  async mounted() {
    try {
      await this.loadGoogleMapsScript();
      this.$nextTick(async () => {
        await this.initMap();
      });
    } catch (error) {
      logger.error("Erro ao carregar Google Maps API:", error);
      const mapDiv = document.getElementById("map");
      if (mapDiv) {
        mapDiv.innerHTML = '<div style="padding: 20px; text-align: center; color: #fff;">Erro ao carregar o mapa. Verifique a chave da API do Google Maps.</div>';
      }
    }
  },
};
</script>
<style></style>
