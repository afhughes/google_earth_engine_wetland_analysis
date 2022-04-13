
//2014-2016 version 1.1
var intertidal_20142016_v1_1= ee.Image('UQ/murray/Intertidal/v1_1/global_intertidal/2014-2016').clip(regions);
 
  
//New version 1.2 1999-2019 dataset , access provided by Nick Murray
var intertidal_20142016_v1_2 = ee.Image('projects/UQ_intertidal/global_intertidal_v1_2/L5_final_masked/global_intertidal_2014106_v1_2');
var intertidal_20172019_v1_2 = ee.Image('projects/UQ_intertidal/global_intertidal_v1_2/L5_final_masked/global_intertidal_20172019_v1_2').clip(regions);

//create area layers
var intertidal_20142016_v1_1_area = intertidal_20142016_v1_1.multiply(ee.Image.pixelArea().divide(1000000));
var intertidal_20172019_v1_2_area = intertidal_20172019_v1_2.multiply(ee.Image.pixelArea().divide(1000000));


//summarise for each region
var intertidal_20142016_v1_1_area_regions = intertidal_20142016_v1_1_area.reduceRegions({
  reducer: ee.Reducer.sum(),
  collection: regions,
  scale: 300,
  });

print(intertidal_20172019_v1_2_area_regions);
var intertidal_20172019_v1_2_area_regions = intertidal_20172019_v1_2_area.reduceRegions({
  reducer: ee.Reducer.sum(),
  collection: regions,
  scale: 300,
  });

print(intertidal_20172019_v1_2_area_regions);
//print(intertidal_20142016_v1_1_area_regions)

//summarise for sites
var intertidal_20172019_v1_2_area_sites = intertidal_20172019_v1_2_area.reduceRegions({
  reducer: ee.Reducer.sum(),
  collection: sites,
  scale: 300,
  });
//Exports

// Export the image, specifying scale and region.
Export.image.toDrive({
  image: intertidal_20142016_v1_2,
  description: 'intertidal_20172019_v1_2_regions',
  scale: 100000,
  maxPixels: 3784216672400,
  region: regions
});

Export.table.toDrive({
  collection: intertidal_20172019_v1_2_area_sites,
  description:'intertidal_20172019_v1_2_area_sites',
  fileFormat: 'CSV'
});



//Mapping


Map.addLayer(intertidal,{}, 'intertidal version 1.1')
//Map.addLayer(intertidal_data_mask,{}, 'intertidal_data_mask')
//Map.addLayer(intertidal_qa_mask,{}, 'intertidal_qa_mask')

//Map.addLayer(intertidal_20172019_v1_2_area_regions);
Map.addLayer(intertidal_20172019_v1_2, {}, 'intertidal_20172019_v1_2');
Map.addLayer(intertidal_20142016_v1_1, {}, 'intertidal_20142016_v1_1');

