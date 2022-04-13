//DATA

//load AOIs
var regions = ee.FeatureCollection('projects/ee-afhughes/assets/regions_mol_dissolve');
var sites = ee.FeatureCollection('projects/ee-afhughes/assets/IWC_Sites_combi1_mol_regions_join');

//show detections for all months in last 3 years 2018-2020

var mh_2018_2020 = ee.ImageCollection('JRC/GSW1_3/MonthlyHistory')
  .filter(ee.Filter.gte('year', 2018))
  //.map(function(image){return image})
  
var mh_2008_2010 = ee.ImageCollection('JRC/GSW1_3/MonthlyHistory')
  .filter(ee.Filter.gte('year', 2008))
  .filter(ee.Filter.lte('year', 2010))
  //.map(function(image){return image})
  
  
var mh_1998_2000 = ee.ImageCollection('JRC/GSW1_3/MonthlyHistory')
  .filter(ee.Filter.gte('year', 1998))
  .filter(ee.Filter.lte('year', 2000))
  //.map(function(image){return image})
  
  
var reclassified = function(img) {
  return img.remap([2, 1], [1, 0]);
};

var mh_2018_2020_reclass = mh_2018_2020.map(reclassified);
var mh_2008_2010_reclass = mh_2008_2010.map(reclassified);
var mh_1998_2000_reclass = mh_1998_2000.map(reclassified);



// Get the number of images (should be 36).
var count = mh_1998_2000_reclass.size();
print('Count: ', count);
//print(mh_2008_2010)
// create layer which is sum of detections and clip to regions
var mh_2018_2020_sum = mh_2018_2020_reclass.sum().clip(regions);
var mh_2008_2010_sum = mh_2008_2010_reclass.sum().clip(regions);
var mh_1998_2000_sum = mh_1998_2000_reclass.sum().clip(regions);


//create layer where there was water dectection in 50% of occasions (in 18 of the 36 months)
var mh_2018_2020_50percent = mh_2018_2020_sum.gte(18);
var mh_2008_2010_50percent = mh_2008_2010_sum.gte(18);
var mh_1998_2000_50percent = mh_1998_2000_sum.gte(18)

//create area layer
var mh_2018_2020_50percent_area = mh_2018_2020_50percent.multiply(ee.Image.pixelArea().divide(1000000));
var mh_2008_2010_50percent_area = mh_2008_2010_50percent.multiply(ee.Image.pixelArea().divide(1000000));
var mh_1998_2000_50percent_area = mh_1998_2000_50percent.multiply(ee.Image.pixelArea().divide(1000000));

//summarise for each region
var mh_2018_2020_50percent_area_regions = mh_2018_2020_50percent_area.reduceRegions({
  reducer: ee.Reducer.sum(),
  collection: regions,
  scale: 30
  });
  
//summarise for each region uisng different projection method

// Project the image to Mollweide.
var wkt = ' \
  PROJCS["World_Mollweide", \
    GEOGCS["GCS_WGS_1984", \
      DATUM["WGS_1984", \
        SPHEROID["WGS_1984",6378137,298.257223563]], \
      PRIMEM["Greenwich",0], \
      UNIT["Degree",0.017453292519943295]], \
    PROJECTION["Mollweide"], \
    PARAMETER["False_Easting",0], \
    PARAMETER["False_Northing",0], \
    PARAMETER["Central_Meridian",0], \
    UNIT["Meter",1], \
    AUTHORITY["EPSG","54009"]]';

var proj_mollweide = ee.Projection(wkt);

// var mh_2018_2020_50percent_area_regions_proj2 = mh_2018_2020_50percent.reduceRegions({
//   reducer: ee.Reducer.sum(),
//   collection: regions,
//   scale:30,
//   crs: proj_mollweide
//   });

//print(mh_2018_2020_50percent_area_regions_proj2);
  
//summarise for each site
var mh_2018_2020_50percent_area_sites = mh_2018_2020_50percent_area.reduceRegions({
  reducer: ee.Reducer.sum(),
  collection: sites,
  scale: 30
  });
  
var mh_2008_2010_50percent_area_sites = mh_2008_2010_50percent_area.reduceRegions({
  reducer: ee.Reducer.sum(),
  collection: sites,
  scale: 30
  });
  
var mh_1998_2000_50percent_area_sites = mh_2008_2010_50percent_area.reduceRegions({
  reducer: ee.Reducer.sum(),
  collection: sites,
  scale: 30
  });
  
//Test layers
var mh_test = ee.Image('JRC/GSW1_3/MonthlyHistory/2018_05');

//EXPORTS

// Export the FeatureCollections to a CSV files.
Export.table.toDrive({
  collection: mh_2018_2020_50percent_area_regions,
  description:'mh_2018_2020_50percent_area_regions',
  fileFormat: 'CSV'
});


Export.table.toDrive({
  collection: mh_2018_2020_50percent_area_sites,
  description:'mh_2018_2020_50percent_area_sites',
  fileFormat: 'CSV'
});

Export.table.toDrive({
  collection: mh_2008_2010_50percent_area_sites,
  description:'mh_2008_2010_50percent_area_sites',
  fileFormat: 'CSV'
});
  
  
//MAPPING


var visualisation = {
  bands: ['remapped'],
  min: 0.0,
  max: 1.0,
  palette: ['ffffff', 'fffcb8', '0905ff']
};

var visualisationraw = {
  bands: ['water'],
  min: 0.0,
  max: 2.0,
  palette: ['ffffff', 'fffcb8', '0905ff']
};
var visualisationreclass = {
  bands: ['remapped'],
  min: 0.0,
  max: 2.0,
  palette: ['ffffff', 'fffcb8', '0905ff']
};
var visualisationsum = {
  bands: ['remapped'],
  min: 0.0,
  max: 36.0,
  palette: ['ffffff', 'fffcb8', '0905ff']
};


Map.addLayer(mh_2018_2020_50percent, visualisation, 'mh_2018_2020_50percent');
//Map.addLayer(mh_2008_2010_50percent, visualisation, 'mh_2008_2010_50percent');
//Map.addLayer(mh_1998_2000_50percent, visualisation, 'mh_1998_2000_50percent');
//Map.addLayer(mh_2008_2010_sum, visualisationsum, 'mh_2008_2010_sum');
//Map.addLayer(mh_2018_2020_sum, visualisationsum, 'mh_2018_2020_sum');
//Map.addLayer(mh_1998_2000_sum, visualisationsum, 'mh_1988_2000_sum');
//Map.addLayer(mh_2018_2020_reclass, visualisationreclass, 'mh_2018_2020_reclass');
//Map.addLayer(mh_2008_2010_reclass, visualisationreclass, 'mh_2008_2010_reclass');
//Map.addLayer(mh_1998_2000_reclass, visualisationreclass, 'mh_1998_2000_reclass');
//Map.addLayer(mh_2018_2020_50percent_area_regions_proj2, {}, 'mh_2018_2020_50percent_area_regions_proj2');
//Map.addLayer(regions, {}, 'regions');
Map.addLayer(sites, {}, 'sites');
 


