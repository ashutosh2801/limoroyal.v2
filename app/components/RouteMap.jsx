"use client";

import { useEffect, useRef } from "react";
import { useSelector } from "react-redux";

export default function RouteMap() {
  const mapRef = useRef(null);
  const movingMarkerRef = useRef(null);
  const routePathRef = useRef([]);
  const indexRef = useRef(0);
  const { data } = useSelector((state) => state.search);

  useEffect(() => {
    const interval = setInterval(() => {
        if (window.google && mapRef.current) {
            clearInterval(interval);
            initMap();
        }
    }, 100);

    return () => clearInterval(interval);
    }, [data]);

  function initMap() {

    if (
    !data ||
    !data.from?.lat ||
    !data.from?.lng ||
    !data.to?.lat ||
    !data.to?.lng
    ) {
        return;
    }

    const pointA = { lat: data?.from?.lat, lng: data?.from?.lng };
    const pointB = { lat: data?.to?.lat, lng: data?.to?.lng };

    // data.additionalStops = [
    //   { lat: xx.x, lng: yy.y },
    //   { lat: aa.a, lng: bb.b }
    // ];

    const stops = Array.isArray(data.additionalStops)
    ? data.additionalStops.filter(s => s?.lat && s?.lng)
    : [];

    const map = new window.google.maps.Map(mapRef.current, {
      zoom: 14,
      center: pointA,

      // Remove UI & interaction
      disableDefaultUI: true,
      zoomControl: false,
      mapTypeControl: false,
      scaleControl: false,
      streetViewControl: false,
      rotateControl: false,
      fullscreenControl: false,
      draggable: false,
      scrollwheel: false,
      gestureHandling: "none",

      // Plain map (no POIs / labels)
      styles: [
        {
          featureType: "poi",
          stylers: [{ visibility: "off" }],
        },
        {
          featureType: "transit",
          stylers: [{ visibility: "on" }],
        },
        {
          featureType: "road",
          elementType: "labels",
          stylers: [{ visibility: "on" }],
        },
        {
          featureType: "administrative",
          elementType: "labels",
          stylers: [{ visibility: "on" }],
        },
      ],
    });

    // Marker A
    new window.google.maps.Marker({
      position: pointA,
      map,
      label: "A",
    });

    // Stop Markers
    stops.forEach((stop, i) => {
      new window.google.maps.Marker({
        position: stop,
        map,
        label: `${i + 1}`,
      });
    });

    // Marker B
    new window.google.maps.Marker({
      position: pointB,
      map,
      label: "B",
    });

    const directionsService = new window.google.maps.DirectionsService();

    directionsService.route(
      {
        origin: pointA,
        destination: pointB,
        waypoints: stops.map((s) => ({
          location: s,
          stopover: true,
        })),
        optimizeWaypoints: false,
        travelMode: window.google.maps.TravelMode.DRIVING,
      },
      (result, status) => {
        if (status === "OK") {
          const route = result.routes[0];
          routePathRef.current = route.overview_path;

          // ✅ Center map to route
          const bounds = new window.google.maps.LatLngBounds();
          routePathRef.current.forEach((p) => bounds.extend(p));
          map.fitBounds(bounds);

          // Draw route
          new window.google.maps.Polyline({
            path: routePathRef.current,
            map,
            strokeColor: "#008000",
            strokeOpacity: 1,
            strokeWeight: 6,
          });

          // Moving marker
          movingMarkerRef.current = new window.google.maps.Marker({
            position: routePathRef.current[0],
            map,
            icon: {
              url: "https://maps.gstatic.com/mapfiles/ms/icons/cabs.png",
              scaledSize: new window.google.maps.Size(25, 25),
            },
          });

          indexRef.current = 0;
          animate();
        }
      }
    );

    function animate() {
      const path = routePathRef.current;
      if (!path.length) return;

      movingMarkerRef.current.setPosition(path[indexRef.current]);
      indexRef.current++;

      // 🔁 Loop A → B repeatedly
      if (indexRef.current >= path.length) {
        indexRef.current = 0;
      }

      setTimeout(animate, 120);
    }
  };

  return (
    <div
      ref={mapRef}
      style={{ width: "100%", height: "350px" }}
      className="rounded-sm overflow-hidden"
    />
  );
}
