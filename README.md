
# 🌾 Crop Classification and Area Estimation using Sentinel-2 and NDVI on Google Earth Engine

## 📝 Overview

This project performs **temporal crop classification and area estimation** in the **Bikaner district** using Sentinel-2 imagery and **machine learning classifiers** (Random Forest, SVM, and Naïve Bayes) on **Google Earth Engine (GEE)**. NDVI time-series data is used to distinguish between crops and other land types.

---

## 📂 Dataset

* **Satellite**: [Sentinel-2 SR Harmonized](https://developers.google.com/earth-engine/datasets/catalog/COPERNICUS_S2_SR_HARMONIZED)
* **Region of Interest**: Bikaner district (`NAME_2 = "Bikaner"`)
* **Time Period**: October 2021 – March 2022
* **Bands Used**:

  * B2 (Blue), B3 (Green), B4 (Red), B8 (NIR), B11, B12
  * NDVI (Normalized Difference Vegetation Index)
  * NDWI (Normalized Difference Water Index)

---

## 🛠️ Preprocessing

1. **Cloud Masking** using QA60 band.
2. **NDVI & NDWI Calculation** per image.
3. **Temporal Composition**: 12 bi-monthly composites using `qualityMosaic('NDVI')` to get the greenest pixels.
4. **NDVI Stacking**: NDVI bands from each period are stacked and scaled to range \[100, 200] for visualization and classification.

---

## 📊 Classification

### Ground Truth Inputs

* `crop`, `crop_val`: Training and validation points for crop class.
* `other`, `other_val`: Training and validation points for non-crop class.

### Classifiers Used

1. **Random Forest (53 trees)**
2. **Support Vector Machine (SVM)**
3. **Naïve Bayes**

Each classifier is:

* Trained on stacked NDVI time-series
* Applied to the entire study area
* Post-processed with focal filters to remove noise
* Evaluated on training and validation sets

---

## 📈 Accuracy Metrics

For each classifier, the following metrics are printed:

* **Confusion Matrix**
* **Overall Accuracy**
* **Kappa Coefficient**

---

## 📐 Area Calculation

After classification and masking, area per class (in square meters) is computed using:

```js
ee.Image.pixelArea().addBands(classified).reduceRegion(...)
```

---

## 📉 NDVI Temporal Profile Visualization

A scatter line chart is generated using:

* `ui.Chart.image.byClass(...)`
* Displays average NDVI over time for each class
* Helps visualize temporal crop behavior

---

## 📌 Layers Displayed on Map

* `Stacked_ndvi`: RGB composite using selected NDVI bands
* `Sen_Feb1FN`: Greenest composite from Feb 1–15
* `RandomForest`, `SVM`, `Naïve Bayes`: Class-wise maps post classification and filtering

---

## 🧪 Optional Preprocessing Notes

* Scaling reflectance (`.divide(10000)`) is implemented but commented out.
* NDWI is calculated and added to bands, but not used in classification.

---

## 📎 How to Run

1. Open the [Google Earth Engine Code Editor](https://code.earthengine.google.com/)
2. Paste this code into the editor.
3. Add your `crop`, `crop_val`, `other`, and `other_val` feature collections to the Assets and import them accordingly.
4. Run the script and inspect the map, console outputs, and accuracy metrics.

---

## ✅ Output

* Classified maps for Random Forest, SVM, and Naïve Bayes
* Area estimation per class
* NDVI profile chart per class
* Training and validation accuracy results

---

## 📘 Dependencies

* Google Earth Engine JavaScript API
* Sentinel-2 Surface Reflectance dataset (`COPERNICUS/S2_SR_HARMONIZED`)
* Labeled ground truth feature collections

---

Let me know if you want a version customized for GitHub with embedded images or a shorter version for documentation!
