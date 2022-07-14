const request = require('request')

const geoCode = (address,callback)=>{
    const geo = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(address) + '.json?access_token=pk.eyJ1IjoidGVzdC11c2VyMDAwMSIsImEiOiJjbDVobXpjd3owYjB2M2VwdTlzN2NkYXR5In0.u7vQL7omuZBq9VZvzUNXqw&limit=1'

    request({url:geo,json:true},(err,res)=>{
            if(err){
                callback('unable to reach Geoservice',undefined)
            }else if(res.body.features.length === 0){
                callback('unable to find this Location. Try Searching Again!',undefined)
            }else{
                const lat = res.body.features[0].center[1];
                const long = res.body.features[0].center[0];
                callback(undefined,{
                    lat: lat,
                    long: long,
                    Place: res.body.features[0].place_name
                })
            }
        })
}

module.exports = geoCode