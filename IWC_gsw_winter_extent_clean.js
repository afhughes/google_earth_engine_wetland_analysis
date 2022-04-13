
//DATA

//load AOIs
var regions = ee.FeatureCollection('projects/ee-afhughes/assets/regions_mol_dissolve');
var sites = ee.FeatureCollection('projects/ee-afhughes/assets/IWC_Sites_combi1_mol_regions_join');

//get winter months from most recent 3 years
var mh_2017dec = ee.Image('JRC/GSW1_3/MonthlyHistory/2017_12');
var mh_2018jan = ee.Image('JRC/GSW1_3/MonthlyHistory/2018_01');
var mh_2018feb = ee.Image('JRC/GSW1_3/MonthlyHistory/2018_02');
var mh_2018dec = ee.Image('JRC/GSW1_3/MonthlyHistory/2018_12');
var mh_2019jan = ee.Image('JRC/GSW1_3/MonthlyHistory/2019_01');
var mh_2019feb = ee.Image('JRC/GSW1_3/MonthlyHistory/2019_02');
var mh_2019dec = ee.Image('JRC/GSW1_3/MonthlyHistory/2019_12');
var mh_2020jan = ee.Image('JRC/GSW1_3/MonthlyHistory/2020_01');
var mh_2020feb = ee.Image('JRC/GSW1_3/MonthlyHistory/2020_02');

//get winter months from most recent 2007-2010
var mh_2007dec = ee.Image('JRC/GSW1_3/MonthlyHistory/2007_12')
var mh_2008jan = ee.Image('JRC/GSW1_3/MonthlyHistory/2008_01');
var mh_2008feb = ee.Image('JRC/GSW1_3/MonthlyHistory/2008_02');
var mh_2008dec = ee.Image('JRC/GSW1_3/MonthlyHistory/2008_12');
var mh_2009jan = ee.Image('JRC/GSW1_3/MonthlyHistory/2009_01');
var mh_2009feb = ee.Image('JRC/GSW1_3/MonthlyHistory/2009_02');
var mh_2009dec = ee.Image('JRC/GSW1_3/MonthlyHistory/2009_12');
var mh_2010jan = ee.Image('JRC/GSW1_3/MonthlyHistory/2010_01');
var mh_2010feb = ee.Image('JRC/GSW1_3/MonthlyHistory/2010_02');

//get winter months from most recent 1997 -2000
var mh_1997dec = ee.Image('JRC/GSW1_3/MonthlyHistory/1997_12')
var mh_1998jan = ee.Image('JRC/GSW1_3/MonthlyHistory/1998_01');
var mh_1998feb = ee.Image('JRC/GSW1_3/MonthlyHistory/1998_02');
var mh_1998dec = ee.Image('JRC/GSW1_3/MonthlyHistory/1998_12');
var mh_1999jan = ee.Image('JRC/GSW1_3/MonthlyHistory/1999_01');
var mh_1999feb = ee.Image('JRC/GSW1_3/MonthlyHistory/1999_02');
var mh_1999dec = ee.Image('JRC/GSW1_3/MonthlyHistory/1999_12');
var mh_2000jan = ee.Image('JRC/GSW1_3/MonthlyHistory/2000_01');
var mh_2000feb = ee.Image('JRC/GSW1_3/MonthlyHistory/2000_02');


//create water detection masks
var mh_2017dec_water = mh_2017dec.gte(2);
var mh_2018jan_water = mh_2018jan.gte(2);
var mh_2018feb_water = mh_2018feb.gte(2);
var mh_2018dec_water = mh_2018dec.gte(2);
var mh_2019jan_water = mh_2019jan.gte(2);
var mh_2019feb_water = mh_2019feb.gte(2);
var mh_2019dec_water = mh_2019dec.gte(2);
var mh_2020jan_water = mh_2020jan.gte(2);
var mh_2020feb_water = mh_2020feb.gte(2);

//create water detection masks
var mh_2007dec_water = mh_2007dec.gte(2);
var mh_2008jan_water = mh_2008jan.gte(2);
var mh_2008feb_water = mh_2008feb.gte(2);
var mh_2008dec_water = mh_2008dec.gte(2);
var mh_2009jan_water = mh_2009jan.gte(2);
var mh_2009feb_water = mh_2009feb.gte(2);
var mh_2009dec_water = mh_2009dec.gte(2);
var mh_2010jan_water = mh_2010jan.gte(2);
var mh_2010feb_water = mh_2010feb.gte(2);

//create water detection masks

var mh_1997dec_water = mh_1997dec.gte(2);
var mh_1998jan_water = mh_1998jan.gte(2);
var mh_1998feb_water = mh_1998feb.gte(2);
var mh_1998dec_water = mh_1998dec.gte(2);
var mh_1999jan_water = mh_1999jan.gte(2);
var mh_1999feb_water = mh_1999feb.gte(2);
var mh_1999dec_water = mh_1999dec.gte(2);
var mh_2000jan_water = mh_2000jan.gte(2);
var mh_2000feb_water = mh_2000feb.gte(2);



//calculate summed winter extent in 3 most recent winters
var mh_winter_extent_2017_2020 = mh_2017dec_water.add(mh_2018jan_water).add(mh_2018feb_water).add(mh_2018dec_water).add(mh_2019jan_water).add(mh_2019feb_water).add(mh_2019dec_water).add(mh_2020jan_water).add(mh_2020feb_water);
var mh_winter_extent_2007_2010 = mh_2007dec_water.add(mh_2008jan_water).add(mh_2008feb_water).add(mh_2008dec_water).add(mh_2009jan_water).add(mh_2009feb_water).add(mh_2009dec_water).add(mh_2010jan_water).add(mh_2010feb_water);
var mh_winter_extent_1997_2000 = mh_1997dec_water.add(mh_1998jan_water).add(mh_1998feb_water).add(mh_1998dec_water).add(mh_1999jan_water).add(mh_1999feb_water).add(mh_1999dec_water).add(mh_2000jan_water).add(mh_2000feb_water);

//create mask showing any detection
var mh_winter_extent_2017_2020_mask = mh_winter_extent_2017_2020.gte(1).clip(regions);
var mh_winter_extent_2007_2010_mask = mh_winter_extent_2007_2010.gte(1).clip(regions);
var mh_winter_extent_1997_2000_mask = mh_winter_extent_1997_2000.gte(1).clip(regions);




//create area layer in km2
var mh_winter_extent_2017_2020_mask_area = mh_winter_extent_2017_2020_mask.multiply(ee.Image.pixelArea().divide(1000000));
var mh_winter_extent_2007_2010_mask_area = mh_winter_extent_2007_2010_mask.multiply(ee.Image.pixelArea().divide(1000000));
var mh_winter_extent_1997_2000_mask_area = mh_winter_extent_1997_2000_mask.multiply(ee.Image.pixelArea().divide(1000000));

//summarise periods for each IWC site

var mh_winter_extent_2017_2020_area_sites = mh_winter_extent_2017_2020_mask_area.reduceRegions({
   reducer: ee.Reducer.sum(),
   collection: sites,
   scale: 30
   })
   
var mh_winter_extent_2007_2010_area_sites = mh_winter_extent_2007_2010_mask_area.reduceRegions({
   reducer: ee.Reducer.sum(),
   collection: sites,
   scale: 30
   })
   
var mh_winter_extent_1997_2000_area_sites = mh_winter_extent_1997_2000_mask_area.reduceRegions({
   reducer: ee.Reducer.sum(),
   collection: sites,
   scale: 30
   })
   
//summarise 2017-2020 winter extent for regions
var mh_winter_extent_2017_2020_area_regions = mh_winter_extent_2017_2020_mask_area.reduceRegions({
   reducer: ee.Reducer.sum(),
   collection: regions,
   scale: 30
   })
      
   
   
   

//EXPORTS

// Export the FeatureCollections to a CSV files.
Export.table.toDrive({
  collection: mh_winter_extent_2017_2020_area_sites,
  description:'mh_winter_extent_2017_2020_area_sites',
  fileFormat: 'CSV'
});
Export.table.toDrive({
  collection: mh_winter_extent_2007_2010_area_sites,
  description:'mh_winter_extent_2007_2010_area_sites',
  fileFormat: 'CSV'
});
Export.table.toDrive({
  collection: mh_winter_extent_1997_2000_area_sites,
  description:'mh_winter_extent_1997_2000_area_sites',
  fileFormat: 'CSV'
});

Export.table.toDrive({
  collection: mh_winter_extent_2017_2020_area_regions,
  description:'mh_winter_extent_2017_2020_area_regions',
  fileFormat: 'CSV'
});



//MAPPING

var visualisation = {
  bands: ['water'],
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


Map.addLayer(mh_winter_extent_2017_2020_mask,visualisation, 'mh_winter_extent_2017_2020_mask');
Map.addLayer(mh_winter_extent_2007_2010_mask, visualisation, 'mh_winter_extent_2007_2010_mask');
Map.addLayer(mh_winter_extent_1997_2000_mask, visualisation, 'mh_winter_extent_1997_2000_mask');
Map.addLayer(sites,{},'sites')






