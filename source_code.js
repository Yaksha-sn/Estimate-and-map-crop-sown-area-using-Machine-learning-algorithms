var  crop = crop2, other = other2, crop_val = crop_val2, other_val = other_val2;
var dt = table.filter(ee.Filter.eq('NAME_2','Bikaner'));

function scaleImage(image) { //Reflectance Scaling
  return image.divide(10000); // Convert 0-10000 → 0-1 reflectance
}

function maskClouds(image) {
    var cloudMask = image.select('QA60').bitwiseAnd(1 << 10).eq(0);
    return image.updateMask(cloudMask);
}

// Function to preprocess Sentinel-2 images
function preprocessCollection(collection) {
    return collection
        .map(maskClouds)
       // .map(scaleImage)// Apply cloud masking
        .map(function(image) {
            var ndvi = image.normalizedDifference(['B8', 'B4']).rename('NDVI'); // NDVI
            var ndwi = image.normalizedDifference(['B3', 'B8']).rename('NDWI'); // NDWI
            return image.addBands([ndvi, ndwi]); // Add NDVI and NDWI bands
        });
}
var coll1 = preprocessCollection(ee.ImageCollection("COPERNICUS/S2_SR_HARMONIZED").filterDate('2021-10-01','2021-10-15').filterBounds(dt));
var coll2 = preprocessCollection(ee.ImageCollection("COPERNICUS/S2_SR_HARMONIZED").filterDate('2021-10-16','2021-10-31').filterBounds(dt));
var coll3 = preprocessCollection(ee.ImageCollection("COPERNICUS/S2_SR_HARMONIZED").filterDate('2021-11-01','2021-11-15').filterBounds(dt));
var coll4 = preprocessCollection(ee.ImageCollection("COPERNICUS/S2_SR_HARMONIZED").filterDate('2021-11-16','2021-11-30').filterBounds(dt));
var coll5 = preprocessCollection(ee.ImageCollection("COPERNICUS/S2_SR_HARMONIZED").filterDate('2021-12-01','2021-12-15').filterBounds(dt));
var coll6 = preprocessCollection(ee.ImageCollection("COPERNICUS/S2_SR_HARMONIZED").filterDate('2021-12-16','2021-12-31').filterBounds(dt));
var coll7 = preprocessCollection(ee.ImageCollection("COPERNICUS/S2_SR_HARMONIZED").filterDate('2022-01-01','2022-01-15').filterBounds(dt));
var coll8 = preprocessCollection(ee.ImageCollection("COPERNICUS/S2_SR_HARMONIZED").filterDate('2022-01-16','2022-01-31').filterBounds(dt));
var coll9 = preprocessCollection(ee.ImageCollection("COPERNICUS/S2_SR_HARMONIZED").filterDate('2022-02-01','2022-02-15').filterBounds(dt));
var coll10 = preprocessCollection(ee.ImageCollection("COPERNICUS/S2_SR_HARMONIZED").filterDate('2022-02-16','2022-02-28').filterBounds(dt));
var coll11 = preprocessCollection(ee.ImageCollection("COPERNICUS/S2_SR_HARMONIZED").filterDate('2022-03-01','2022-03-15').filterBounds(dt));
var coll12 = preprocessCollection(ee.ImageCollection("COPERNICUS/S2_SR_HARMONIZED").filterDate('2022-03-16','2022-03-31').filterBounds(dt));

print(coll1);

var addNDVI = function(img){
  var ndvi = img.normalizedDifference(['B8','B4']).rename('NDVI')
  return img.addBands(ndvi);
}

var withNDVI1 = coll1.map(addNDVI);
var withNDVI2 = coll2.map(addNDVI);
var withNDVI3 = coll3.map(addNDVI);
var withNDVI4 = coll4.map(addNDVI);
var withNDVI5 = coll5.map(addNDVI);
var withNDVI6 = coll6.map(addNDVI);
var withNDVI7 = coll7.map(addNDVI);
var withNDVI8 = coll8.map(addNDVI);
var withNDVI9 = coll9.map(addNDVI);
var withNDVI10 = coll10.map(addNDVI);
var withNDVI11 = coll11.map(addNDVI);
var withNDVI12 = coll12.map(addNDVI);



//print(withNDVI1);

var greenest1 = withNDVI1.qualityMosaic('NDVI').select(['B2','B3','B4','B8','B11','B12']).clip(dt);
var greenest2 = withNDVI2.qualityMosaic('NDVI').select(['B2','B3','B4','B8','B11','B12']).clip(dt);
var greenest3 = withNDVI3.qualityMosaic('NDVI').select(['B2','B3','B4','B8','B11','B12']).clip(dt);
var greenest4 = withNDVI4.qualityMosaic('NDVI').select(['B2','B3','B4','B8','B11','B12']).clip(dt);
var greenest5 = withNDVI5.qualityMosaic('NDVI').select(['B2','B3','B4','B8','B11','B12']).clip(dt);
var greenest6 = withNDVI6.qualityMosaic('NDVI').select(['B2','B3','B4','B8','B11','B12']).clip(dt);
var greenest7 = withNDVI7.qualityMosaic('NDVI').select(['B2','B3','B4','B8','B11','B12']).clip(dt);
var greenest8 = withNDVI8.qualityMosaic('NDVI').select(['B2','B3','B4','B8','B11','B12']).clip(dt);
var greenest9 = withNDVI9.qualityMosaic('NDVI').select(['B2','B3','B4','B8','B11','B12']).clip(dt);
var greenest10 = withNDVI10.qualityMosaic('NDVI').select(['B2','B3','B4','B8','B11','B12']).clip(dt);
var greenest11 = withNDVI11.qualityMosaic('NDVI').select(['B2','B3','B4','B8','B11','B12']).clip(dt);
var greenest12 = withNDVI12.qualityMosaic('NDVI').select(['B2','B3','B4','B8','B11','B12']).clip(dt);


//print(greenest1)

var ndvi1 = greenest1.normalizedDifference(['B8','B4']).rename('NDVI1');
var ndvi2 = greenest2.normalizedDifference(['B8','B4']).rename('NDVI2');
var ndvi3 = greenest3.normalizedDifference(['B8','B4']).rename('NDVI3');
var ndvi4 = greenest4.normalizedDifference(['B8','B4']).rename('NDVI4');
var ndvi5 = greenest5.normalizedDifference(['B8','B4']).rename('NDVI5');
var ndvi6 = greenest6.normalizedDifference(['B8','B4']).rename('NDVI6');
var ndvi7 = greenest7.normalizedDifference(['B8','B4']).rename('NDVI7');
var ndvi8 = greenest8.normalizedDifference(['B8','B4']).rename('NDVI8');
var ndvi9 = greenest9.normalizedDifference(['B8','B4']).rename('NDVI9');
var ndvi10 = greenest10.normalizedDifference(['B8','B4']).rename('NDVI10');
var ndvi11 = greenest11.normalizedDifference(['B8','B4']).rename('NDVI11');
var ndvi12 = greenest12.normalizedDifference(['B8','B4']).rename('NDVI12');

var stacked_ndvi = ndvi1.addBands([ndvi2,ndvi3,ndvi4,ndvi5,ndvi6,ndvi7,ndvi8,ndvi9,ndvi10,ndvi11,ndvi12]);
var stacked_ndvi_scaled = stacked_ndvi.multiply(100).add(100).uint8();

Map.addLayer(stacked_ndvi_scaled,{bands:['NDVI10','NDVI7','NDVI5'],min:100,max:200},'Stacked_ndvi');
//Map.centerObject(dt);
Map.addLayer(greenest9,{bands:['B8','B4','B3'],min:0,max:5000},'Sen_Feb1FN');
//Map.addLayer(greenest10,{bands:['B8','B4','B3'],min:0,max:5000},'Sen_Feb2FN');
//print(ndvi1)

var gt = crop.merge(other);

var training_data = stacked_ndvi_scaled.sampleRegions({
  collection:gt, 
  properties:['class'], 
  scale:10, 
  });
  
  var classifier = ee.Classifier.smileRandomForest(53)
                  .train({
                    features:training_data , 
                    classProperty: 'class'
                    
                  });

var classified = stacked_ndvi_scaled.classify(classifier, 'RandomForest');
var classified_clean = classified.updateMask(classified.eq(1));
Map.addLayer(classified_clean,{palette:['yellow'],min:0,max:1},'RandomForest');

var classified1 = classified_clean
  .focalMode({radius: 1, iterations: 2})
  .updateMask(classified.eq(1));



var areaImage = ee.Image.pixelArea().addBands(classified1);

var areas = areaImage.reduceRegion({
  reducer: ee.Reducer.sum().group({
    groupField: 1,
    groupName: 'class',
  }),
  geometry: dt,
  scale: 10,
  maxPixels: 1e13,
  //tileScale: 8
});

// Print the area calculations.
print('##### CLASS AREA SQ. METERS #####');
print(areas);

var trainAccuracy = classifier.confusionMatrix();
print('Resubstitution error matrix: ', trainAccuracy);
print('Training overall accuracy: ', trainAccuracy.accuracy());
print('Training Kappa Coefficient: ', trainAccuracy.kappa());

var gt_val = crop_val.merge(other_val);

var validation = stacked_ndvi_scaled.sampleRegions({
  collection: gt_val,
  properties: ['class'],
  scale: 10
});

// Classify the validation data.
var validated = validation.classify(classifier);

// Get a confusion matrix representing expected accuracy.
var testAccuracy = validated.errorMatrix('class', 'classification');
print('Validation error matrix: ', testAccuracy);
print('Validation overall accuracy: ', testAccuracy.accuracy());

var bandInfo = {
  'NDVI': {v: 1, f: 'NDVI'},
  'NDVI1': {v: 2, f: 'NDVI1'},
  'NDVI2': {v: 3, f: 'NDVI2'},
  'NDVI3': {v: 4, f: 'NDVI3'},
  'NDVI4': {v: 5, f: 'NDVI4'},
  'NDVI5': {v: 6, f: 'NDVI5'},
  'NDVI6': {v: 7, f: 'NDVI6'},
  'NDVI7': {v: 8, f: 'NDVI7'},
  'NDVI8': {v: 9, f: 'NDVI8'},
  'NDVI9': {v: 10, f: 'NDVI9'},
  'NDVI10': {v: 11, f: 'NDVI10'},
  'NDVI11': {v: 12, f: 'NDVI11'}
  
};

var xPropVals = [];    // List to codify x-axis band names as values.
var xPropLabels = [];  // Holds dictionaries that label codified x-axis values.
for (var key in bandInfo) {
  xPropVals.push(bandInfo[key].v);
  xPropLabels.push(bandInfo[key]);
}
var regionsBand =
    gt
        .reduceToImage({properties: ['class'], reducer: ee.Reducer.first()})
         .rename('class');

var sentinelSrClass = stacked_ndvi_scaled.addBands(regionsBand);
       // print(sentinelSrClass);
var chart = ui.Chart.image
                .byClass({
                  image: sentinelSrClass,
                  classBand: 'class',
                  region: gt,
                  reducer: ee.Reducer.mean(),
                  scale: 10,
                //  classLabels: ['Mustard', 'Wheat'],
                  xLabels: xPropVals
                })
                .setChartType('ScatterChart')
                .setOptions({
                  title: 'Temporal NDVI',
                  hAxis: {
                    title: 'Fortnight',
                    titleTextStyle: {italic: false, bold: true},
                    //viewWindow: {min: bands[0], max: bands[11]},
                    ticks: xPropLabels
                  },
                  vAxis: {
                    title: 'NDVI(Scaled ((NDVI*100)+100)',
                    titleTextStyle: {italic: false, bold: true},
                    viewWindow: {min: 100, max: 180},
                  },
                  colors: ['red', 'blue', 'grey', 'green', 'yellow', 'magenta', 'cyan'],
                  pointSize: 0,
                  lineSize: 2,
                  curveType: 'function'
                });
print(chart);  

var svm_classifier = ee.Classifier.libsvm()
                  .train({
                    features: training_data, 
                    classProperty: 'class'
                  });

var classified_svm = stacked_ndvi_scaled.classify(svm_classifier, 'SVM');
var classified_cleaned = classified_svm.updateMask(classified_svm.eq(1));
Map.addLayer(classified_cleaned, {palette: ['blue'], min: 0, max: 1}, 'SVM');

var classified_svm_masked = classified_cleaned
  .focalMode({radius: 1.5, iterations: 1})  // Slightly larger radius
  .updateMask(classified_svm.eq(1));


var areaImage_svm = ee.Image.pixelArea().addBands(classified_svm_masked);

var areas_svm = areaImage_svm.reduceRegion({
  reducer: ee.Reducer.sum().group({
    groupField: 1,
    groupName: 'class',
  }),
  geometry: dt,
  scale: 10,
  maxPixels: 1e13,
});


print('##### CLASS AREA SQ. METERS (SVM) #####');
print(areas_svm);

var svm_trainAccuracy = svm_classifier.confusionMatrix();
print('SVM - Resubstitution error matrix:', svm_trainAccuracy);
print('SVM - Training overall accuracy:', svm_trainAccuracy.accuracy());
print('SVM - Training Kappa Coefficient: ', testAccuracy.kappa());

var validated = validation.classify(svm_classifier);

var testAccuracy = validated.errorMatrix('class', 'classification');
print('Validation error matrix: ', testAccuracy);
print('Validation overall accuracy: ', testAccuracy.accuracy());
// Kappa coefficient from the validation error matrix
print('Validation Kappa Coefficient: ', testAccuracy.kappa());




//


// Train Naïve Bayes Classifier
var nb_classifier = ee.Classifier.smileNaiveBayes()
                  .train({
                    features: training_data, 
                    classProperty: 'class'
                  });

// Classify the Image using Naïve Bayes
var classified_nb = stacked_ndvi_scaled.classify(nb_classifier, 'NaiveBayes');
var nb_cleaned = classified_nb.updateMask(classified_nb.eq(1));
Map.addLayer(nb_cleaned, {palette: ['green'], min: 0, max: 1}, 'Naïve Bayes');



var classified_nb_masked = nb_cleaned
  .focal_min(1)  // Erosion first to remove noise
  .focal_max(1)  // Dilation to restore shapes
  .updateMask(classified_nb.eq(1));


// Calculate Area for Naïve Bayes Classification
var areaImage_nb = ee.Image.pixelArea().addBands(classified_nb_masked);
var areas_nb = areaImage_nb.reduceRegion({
  reducer: ee.Reducer.sum().group({
    groupField: 1,
    groupName: 'class',
  }),
  geometry: dt,
  scale: 10,
  maxPixels: 1e13,
});

// Print Area Results
print('##### CLASS AREA SQ. METERS (Naïve Bayes) #####');
print(areas_nb);


// Compute Training Accuracy (Resubstitution Error)
var nb_trainAccuracy = nb_classifier.confusionMatrix();
print('Naïve Bayes - Training Resubstitution error matrix:', nb_trainAccuracy);
print('Naïve Bayes - Training overall accuracy:', nb_trainAccuracy.accuracy());
print('Naïve Bayes - Training Kappa coefficient:', nb_trainAccuracy.kappa());

// Validate the Naïve Bayes Model
var validated_nb = validation.classify(nb_classifier);

// Compute the error/confusion matrix between actual class and predicted class
var nb_testAccuracy = validated_nb.errorMatrix('class', 'classification');
print('Naïve Bayes - Validation error matrix:', nb_testAccuracy);
print('Naïve Bayes - Validation overall accuracy:', nb_testAccuracy.accuracy());
print('Naïve Bayes - Validation Kappa coefficient:', nb_testAccuracy.kappa());
