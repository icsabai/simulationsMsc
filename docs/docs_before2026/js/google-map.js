(function() {
    if (typeof google === 'undefined' || !google.maps || !google.maps.event) return;

    function init() {
        var mapElement = document.getElementById('map');
        if (!mapElement || !(mapElement instanceof HTMLElement)) return;
        try {
            var myLatlng = new google.maps.LatLng(40.69847032728747, -73.9514422416687);
            var mapOptions = {
                zoom: 7,
                center: myLatlng,
                scrollwheel: false,
                styles: [
                    {
                        "featureType": "administrative.country",
                        "elementType": "geometry",
                        "stylers": [
                            { "visibility": "simplified" },
                            { "hue": "#ff0000" }
                        ]
                    }
                ]
            };
            var map = new google.maps.Map(mapElement, mapOptions);
    
            var addresses = ['New York'];
            for (var x = 0; x < addresses.length; x++) {
                $.getJSON('http://maps.googleapis.com/maps/api/geocode/json?address=' + addresses[x] + '&sensor=false', null, function (data) {
                    var p = data.results[0].geometry.location;
                    var latlng = new google.maps.LatLng(p.lat, p.lng);
                    new google.maps.Marker({
                        position: latlng,
                        map: map,
                        icon: 'images/loc.png'
                    });
                });
            }
        } catch (e) {
            if (typeof console !== 'undefined' && console.warn) console.warn('Google Map init skipped:', e);
        }
    }
    google.maps.event.addDomListener(window, 'load', init);
})();