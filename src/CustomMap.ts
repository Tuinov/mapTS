// Instructions to other classes how be an argument for 'addMarker'
export interface Mappable {
  location: {
    lat: number;
    lng: number;
  };

  color: string;

  markerContent(): string;
}


export class CustomMap {
  private googleMap: google.maps.Map;

  constructor(mapDivId: string) {
    this.googleMap = new google.maps.Map(document.getElementById(mapDivId), {
      zoom: 1,
      center: {
        lat: 0,
        lng: 0
      }
    });
  }

  addMarker(mappable: Mappable): void {
    const image =
    "https://developers.google.com/maps/documentation/javascript/examples/full/images/beachflag.png";
    const marker = new google.maps.Marker({
      
      map: this.googleMap,
      position: {
        lat: mappable.location.lat,
        lng: mappable.location.lng
      },
      
      icon: image,
    });

    marker.addListener('click', () => {
      const infoWindow = new google.maps.InfoWindow({
        content: mappable.markerContent()
      });

      infoWindow.open(this.googleMap, marker);
    });

  }
}