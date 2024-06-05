import { Controller } from "@hotwired/stimulus"
import MapboxGeocoder from "@mapbox/mapbox-gl-geocoder"

// Connects to data-controller="address-autocomplete"
export default class extends Controller {
  static targets = ['input']
  static values = {
    apiKey: String
  }
  connect() {
    console.log(this.inputTarget)
    this.geocoder = new MapboxGeocoder({
      accessToken: this.apiKeyValue,
      types: "country,region,place,postcode,locality,neighborhood,address",
    })
    this.geocoder.addTo(this.element)

    this.geocoder.on("result", event => this.inputTarget.value = event.result["place_name"])
    this.geocoder.on("clear", () => this.inputTarget.value = '')
  }
}
