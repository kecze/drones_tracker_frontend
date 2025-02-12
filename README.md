# Airspace Visualizer Frontend  

## Description  

The Airspace Visualizer Frontend is a web application that displays real-time positions of aircraft on a map, along with detailed flight data, including speed, altitude, latitude, longitude, and timestamp. The application generates artificial data to simulate an ADS-B feed and provides multiple views, including tables and a map, to present this information.  

## Features  

1. **Data Generation**  
   - Utilizes a custom service, `PlanesFrameGenerator`, to simulate ADS-B data for 5 aircraft with randomly generated ICAO identifiers.  
   - Generates a new data frame every second for each aircraft, including:  
     - `icao`: Aircraft identifier (4 alphanumeric characters, uppercase).  
     - `speed`: Speed in km/h (floating-point number).  
     - `lat`: Latitude in degrees (floating-point number).  
     - `lon`: Longitude in degrees (floating-point number).  
     - `alt`: Altitude in meters (integer).  
     - `timestamp`: Frame generation timestamp.  

2. **Flight History**  
   - Implements `PlanesHistoryService` to collect and store the last 20 frames for each aircraft. That data is also used to display the planes path on the map. 

3. **Main Component**  
   - Integrates the following sub-components:  
     - **PlanesTabKph**: Displays the latest data for all aircraft in a table with speed in km/h. Includes a filter by ICAO.  
     - **PlanesTabMph**: Displays the latest data for all aircraft in a table with speed in mph.  
     - **PlanesMap**: Shows real-time positions of aircraft on an interactive map using a map library (e.g., Leaflet, OpenLayers, or MapLibre).  
     - **AlternativePlanesTab**: Displays aircraft data from a separate instance of the data generator and history service.  

4. **Service Dependency**  
   - `PlanesTabKph`, `PlanesTabMph`, and `PlanesMap` share the same instances of `PlanesFrameGenerator` and `PlanesHistoryService`.  
   - `AlternativePlanesTab` uses independent instances of the same services.  

## Running the Application  

1. **Clone the repository**  
   ```bash
   git clone https://github.com/kecze/drones_tracker_frontend.git
   cd airspace_visualizer_frontend/my-angular-app'
   ng serve
The page will be availabale on: http://localhost:4200/ 
