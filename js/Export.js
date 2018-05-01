///////////////////////////////////////////////////////////////////////////
// Copyright 2018 Esri. All Rights Reserved.
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//    http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.
///////////////////////////////////////////////////////////////////////////
define([
    'dojo/_base/declare', "dojo/Evented",
    "dojo/html",
    "dijit/registry",
    "dojo/_base/lang",
    "dojo/dom-style", "esri/geometry/webMercatorUtils",
    "esri/request", "esri/symbols/SimpleLineSymbol",
    "dojo/i18n!esri/nls/jsapi",
    'dojo/dom-construct', "esri/arcgis/Portal", "esri/Color", "esri/toolbars/draw", "dojo/dom-attr", "esri/layers/RasterFunction", "dijit/form/SimpleTextarea", "dijit/form/TextBox", "dijit/form/CheckBox"


],
        function (
                declare, Evented,
                html,
                registry,
                lang, domStyle, webMercatorUtils, esriRequest, SimpleLineSymbol, bundle, domConstruct, arcgisPortal, Color, Draw, domAttr, RasterFunction) {
            return declare("application.Export", [Evented], {
                constructor: function (parameters) {
                    var defaults = {
                        map: null,
                        exportMode: null,
                        i18n: null,
                        portalUrl: "www.arcgis.com"
                    };
                    lang.mixin(this, defaults, parameters);
                },
                postCreate: function () {

                    this.setSavingType();
                    domConstruct.place('<img id="loadingExport" style="position: absolute;top:0;bottom: 0;left: 0;right: 0;margin:auto;z-index:100;" src="images/loading.gif">', "exportNode");
                    this.hideLoading();
                    window.addEventListener("resize", lang.hitch(this, this.resizeContainer));
                    registry.byId("saveAndExportOption").on("change", lang.hitch(this, function (value) {
                        if (value === "agol") {
                            domStyle.set("saveAgolContainer", "display", "block");
                            domStyle.set("exportSaveContainer", "display", "none");
                            registry.byId("defineExtent").set("checked", false);
                            if (registry.byId("defineAgolExtent").checked) {
                                this.toolbarForExport.activate(Draw.POLYGON);
                                this.map.setInfoWindowOnClick(false);
                            }
                            for (var k in this.map.graphics.graphics)
                            {
                                if (this.map.graphics.graphics[k].geometry.type === "polygon") {
                                    if (this.map.graphics.graphics[k].symbol.color.r === 200)
                                    {
                                        this.map.graphics.remove(this.map.graphics.graphics[k]);
                                        break;
                                    }
                                }
                            }
                            this.geometry = null;
                        } else {

                            registry.byId("defineAgolExtent").set("checked", false);
                            if (registry.byId("defineExtent").checked) {
                                this.toolbarForExport.activate(Draw.POLYGON);
                                this.map.setInfoWindowOnClick(false);
                            }
                            domStyle.set("saveAgolContainer", "display", "none");
                            domStyle.set("exportSaveContainer", "display", "block");
                        }
                    }));
                    registry.byId("submitAgolBtn").on("click", lang.hitch(this, function () {
                        if (registry.byId("itemTitle").get("value") && registry.byId("itemTags").get("value"))
                            this.saveLayerToArcGIS();
                        else if (!registry.byId("itemTitle").get("value"))
                            html.set(document.getElementById("successNotification"), this.i18n.error1);
                        else if (!registry.byId("itemTags").get("value"))
                            html.set(document.getElementById("successNotification"), this.i18n.error2);
                    }));
                    registry.byId("exportBtn").on("click", lang.hitch(this, this.exportLayer));
                    registry.byId("defineExtent").on("change", lang.hitch(this, this.activatePolygon));
                    registry.byId("defineAgolExtent").on("change", lang.hitch(this, this.activatePolygon));
                    if (this.map) {
                        this.map.on("update-start", lang.hitch(this, this.showLoading));
                        this.map.on("update-end", lang.hitch(this, this.hideLoading));
                    }
                    if (this.exportMode !== "agol")
                    {
                        this.toolbarForExport = new Draw(this.map);
                        dojo.connect(this.toolbarForExport, "onDrawComplete", lang.hitch(this, this.getExtent));
                    }
                    this.resizeContainer();
                },
                resizeContainer: function () {
                    if (window.innerWidth > 1200) {

                        document.getElementById("itemTitle").style.width = "200px";
                        document.getElementById("itemTags").style.width = "200px";
                        document.getElementById("itemDescription").style.width = "200px";
                        document.getElementById("itemDescription").style.height = "80px";
                        document.getElementById("itemTitle").style.height = "40px";
                        document.getElementById("itemTags").style.height = "40px";
                        document.getElementById("pixelSize").style.width = "100px";
                    } else if (window.innerWidth > 1000) {
                        document.getElementById("itemTitle").style.width = "180px";
                        document.getElementById("itemTags").style.width = "180px";
                        document.getElementById("itemDescription").style.width = "180px";
                        document.getElementById("itemDescription").style.height = "70px";
                        document.getElementById("itemTitle").style.height = "36px";
                        document.getElementById("itemTags").style.height = "36px";
                        document.getElementById("pixelSize").style.width = "90px";
                    } else if (window.innerWidth > 800) {
                        document.getElementById("itemTitle").style.width = "160px";
                        document.getElementById("itemTags").style.width = "160px";
                        document.getElementById("itemDescription").style.width = "160px";
                        document.getElementById("itemDescription").style.height = "60px";
                        document.getElementById("itemTitle").style.height = "32px";
                        document.getElementById("itemTags").style.height = "32px";
                        document.getElementById("pixelSize").style.width = "80px";
                    } else if (window.innerWidth > 600) {
                        document.getElementById("itemTitle").style.width = "140px";
                        document.getElementById("itemTags").style.width = "140px";
                        document.getElementById("itemDescription").style.width = "140px";
                        document.getElementById("itemDescription").style.height = "50px";
                        document.getElementById("itemTitle").style.height = "28px";
                        document.getElementById("itemTags").style.height = "28px";
                        document.getElementById("pixelSize").style.width = "70px";
                    } else {
                        document.getElementById("itemTitle").style.width = "120px";
                        document.getElementById("itemTags").style.width = "120px";
                        document.getElementById("itemDescription").style.width = "120px";
                        document.getElementById("itemDescription").style.height = "40px";
                        document.getElementById("itemTitle").style.height = "24px";
                        document.getElementById("itemTags").style.height = "24px";
                        document.getElementById("pixelSize").style.width = "60px";
                    }
                },
                setSavingType: function () {
                    if (this.exportMode === "both") {
                        domStyle.set("selectExportDisplay", "display", "block");
                        if (registry.byId("saveAndExportOption").get("value") === "agol")
                            domStyle.set("saveAgolContainer", "display", "block");
                        else
                            domStyle.set("exportSaveContainer", "display", "block");
                    } else if (this.exportMode === "agol") {
                        domStyle.set("selectExportDisplay", "display", "none");
                        domStyle.set("saveAgolContainer", "display", "block");
                        domStyle.set("exportSaveContainer", "display", "none");
                    } else {
                        domStyle.set("selectExportDisplay", "display", "none");
                        domStyle.set("saveAgolContainer", "display", "none");
                        domStyle.set("exportSaveContainer", "display", "block");
                    }
                },
                onOpen: function () {
                    if (this.exportMode !== "agol") {
                        var info = {};
                        info.levelChange = true;
                        this.updateValues(info);
                        this.extentchangeHandler = this.map.on("extent-change", lang.hitch(this, this.updateValues));
                    }

                },
                onClose: function () {
                    registry.byId("defineExtent").set("checked", false);
                    registry.byId("defineAgolExtent").set("checked", false);
                },
                saveLayerToArcGIS: function () {

                    domStyle.set("loadingExport", "display", "block");
                    this.refreshData();
                    html.set(document.getElementById("successNotification"), "");
                    if (this.imageServiceLayer) {
                        var extent = this.map.geographicExtent.xmin + "," + this.map.geographicExtent.ymin + "," + this.map.geographicExtent.xmax + "," + this.map.geographicExtent.ymax;
                        var spatialReference = this.map.extent.spatialReference.wkid;
                        var mosaicRule = this.imageServiceLayer.mosaicRule ? this.imageServiceLayer.mosaicRule.toJson() : null;
                        var bandIds = this.imageServiceLayer.bandIds ? [this.imageServiceLayer.bandIds] : [];
                        if (registry.byId("defineAgolExtent").checked) {

                            var rasterClip = new RasterFunction();
                            rasterClip.functionName = "Clip";
                            var clipArguments = {};
                            clipArguments.ClippingGeometry = this.geometryClip;
                            clipArguments.ClippingType = 1;
                            if (this.imageServiceLayer.renderingRule)
                                clipArguments.Raster = this.imageServiceLayer.renderingRule;
                            else
                                clipArguments.Raster = "$$";
                            rasterClip.functionArguments = clipArguments;

                            var renderingRule = rasterClip.toJson();
                        } else {
                            var renderingRule = this.imageServiceLayer.renderingRule ? this.imageServiceLayer.renderingRule.toJson() : null;
                        }
                        var opacity = this.imageServiceLayer.opacity ? this.imageServiceLayer.opacity : 1;
                        var interpolation = this.imageServiceLayer.interpolation ? this.imageServiceLayer.interpolation : "RSP_BilinearInterpolation";
                        var format = this.imageServiceLayer.format ? this.imageServiceLayer.format : "jpgpng";
                        var compressionQuality = this.imageServiceLayer.compressionQuality ? this.imageServiceLayer.compressionQuality : 100;
                        var itemData = {
                            "id": this.imageServiceLayer.id,
                            "visibility": true,
                            "bandIds": bandIds,
                            "opacity": opacity,
                            "title": registry.byId("itemTitle").get("value"),
                            "timeAnimation": false,
                            "renderingRule": renderingRule,
                            "mosaicRule": mosaicRule,
                            "interpolation": interpolation,
                            "format": format,
                            "compressionQuality": compressionQuality
                        };
                        var portalUrl = this.portalUrl.indexOf("arcgis.com") !== -1 ? "http://www.arcgis.com" : this.portalUrl;
                        var portal = new arcgisPortal.Portal(portalUrl);
                        bundle.identity.lblItem = "Account";
                        var tempText = (bundle.identity.info).split("access the item on");
                        bundle.identity.info = tempText[0] + tempText[1];

                        portal.signIn().then(lang.hitch(this, function (loggedInUser) {

                            var url = loggedInUser.userContentUrl;
                            var addItemRequest = esriRequest({
                                url: url + "/addItem",
                                content: {f: "json",
                                    title: registry.byId("itemTitle").get("value"),
                                    type: "Image Service",
                                    url: this.imageServiceLayer.url,
                                    description: registry.byId("itemDescription").get("value"),
                                    tags: registry.byId("itemTags").get("value"),
                                    extent: extent,
                                    spatialReference: spatialReference,
                                    text: JSON.stringify(itemData)
                                },
                                handleAs: "json",
                                callbackParamName: "callback"
                            }, {usePost: true});
                            addItemRequest.then(lang.hitch(this, function (result) {
                                html.set(document.getElementById("successNotification"), "<br />Layer saved.");
                                setTimeout(lang.hitch(this, function () {
                                    html.set(document.getElementById("successNotification"), "");
                                }), 4000);
                                domStyle.set("loadingExport", "display", "none");

                            }), lang.hitch(this, function (error) {
                                html.set(document.getElementById("successNotification"), "Error! " + error);
                                domStyle.set("loadingExport", "display", "none");
                            }));
                        }));
                    } else {
                        html.set(document.getElementById("successNotification"), this.i18n.error);
                    }
                },
                updateValues: function (info) {
                    if (info.levelChange && !this.geometry) {
                        this.refreshData();
                        var widthMax = this.map.width;

                        var width = (this.map.extent.xmax - this.map.extent.xmin);
                        var height = (this.map.extent.ymax - this.map.extent.ymin);

                        var psx = width / widthMax;
                        var psy = height / widthMax;
                        var servicePixel = (this.imageServiceLayer && this.imageServiceLayer.pixelSizeX) ? this.imageServiceLayer.pixelSizeX : 0;
                        var ps = Math.max(psx, psy, servicePixel);
                        var ps = parseFloat(ps) + 0.001;
                        registry.byId("pixelSize").set("value", ps.toFixed(3));
                    }
                    this.previousSpatialReference = registry.byId("outputSp").get("value");
                    this.getUTMZones();
                },
                activatePolygon: function () {
                    if (registry.byId("defineExtent").checked || registry.byId("defineAgolExtent").checked) {
                        this.map.setInfoWindowOnClick(false);
                        if (registry.byId("defineExtent").checked) {
                            registry.byId("exportBtn").set("disabled", true);
                            domStyle.set(document.getElementById("exportBtn"), "color", "grey");
                        }
                        if (registry.byId("defineAgolExtent").checked) {
                            registry.byId("submitAgolBtn").set("disabled", true);
                            domStyle.set(document.getElementById("submitAgolBtn"), "color", "grey");
                        }
                        this.toolbarForExport.activate(Draw.POLYGON);
                    } else {
                        registry.byId("exportBtn").set("disabled", false);
                        registry.byId("submitAgolBtn").set("disabled", false);
                        domStyle.set(document.getElementById("exportBtn"), "color", "#333");
                        domStyle.set(document.getElementById("submitAgolBtn"), "color", "#333");
                        this.toolbarForExport.deactivate();
                        this.map.setInfoWindowOnClick(true);
                        for (var k in this.map.graphics.graphics)
                        {
                            if (this.map.graphics.graphics[k].geometry.type === "polygon") {
                                if (this.map.graphics.graphics[k].symbol.color.r === 200)
                                {
                                    this.map.graphics.remove(this.map.graphics.graphics[k]);
                                    break;
                                }
                            }
                        }
                        this.geometry = null;
                    }
                },
                getExtent: function (geometry) {
                    registry.byId("exportBtn").set("disabled", false);
                    registry.byId("submitAgolBtn").set("disabled", false);
                    domStyle.set(document.getElementById("exportBtn"), "color", "#333");
                    domStyle.set(document.getElementById("submitAgolBtn"), "color", "#333");
                    var geometry = geometry.geometry;
                    for (var k in this.map.graphics.graphics)
                    {
                        if (this.map.graphics.graphics[k].geometry.type === "polygon") {
                            if (this.map.graphics.graphics[k].symbol.color.r === 200)
                            {
                                this.map.graphics.remove(this.map.graphics.graphics[k]);
                                break;
                            }
                        }
                    }
                    var symbol = new SimpleLineSymbol(SimpleLineSymbol.STYLE_SOLID, new Color([200, 0, 0]), 2);
                    var graphic = new esri.Graphic(geometry, symbol);
                    this.map.graphics.add(graphic);
                    this.geometryClip = geometry;
                    this.geometry = geometry.getExtent();
                    var width = (this.geometry.xmax - this.geometry.xmin);
                    var height = (this.geometry.ymax - this.geometry.ymin);
                    var psx = width / this.map.width;
                    var psy = height / this.map.width;
                    var servicePixel = (this.imageServiceLayer && this.imageServiceLayer.pixelSizeX) ? this.imageServiceLayer.pixelSizeX : 0;
                    var ps = Math.max(psx, psy, servicePixel);
                    var ps = parseFloat(ps) + 0.001;
                    registry.byId("pixelSize").set("value", ps.toFixed(3));
                },
                getUTMZones: function () {
                    var mapCenter = this.map.extent.getCenter();
                    if (this.map.extent.spatialReference.wkid !== 102100 && this.map.extent.spatialReference.wkid !== 3857) {
                        var mapCenter = webMercatorUtils.project(mapCenter, new SpatailReference({wkid: 102100}));
                    }

                    var y = Math.pow(2.718281828, (mapCenter.y / 3189068.5));

                    var sinvalue = (y - 1) / (y + 1);
                    var y1 = Math.asin(sinvalue) / 0.017453292519943295;

                    var x = mapCenter.x / 6378137.0;
                    x = x / 0.017453292519943295;
                    var utm = parseInt((x + 180) / 6) + 1;
                    if (y1 > 0)
                        var wkid = 32600 + utm;
                    else
                        var wkid = 32500 + utm;
                    if (registry.byId("outputSp").getOptions())
                        registry.byId("outputSp").removeOption(registry.byId('outputSp').getOptions());
                    if (utm !== 1) {
                        registry.byId("outputSp").addOption({label: this.i18n.utm + " " + (utm - 1) + "", value: wkid - 1});
                    } else
                        registry.byId("outputSp").addOption({label: this.i18n.utm + " " + (utm + 59) + "", value: wkid + 59});
                    registry.byId("outputSp").addOption({label: this.i18n.utm + " " + utm + "", value: wkid});
                    if (utm !== 60)
                        registry.byId("outputSp").addOption({label: this.i18n.utm + " " + (utm + 1) + "", value: wkid + 1});
                    else
                        registry.byId("outputSp").addOption({label: this.i18n.utm + " " + utm - 59 + "", value: wkid - 59});

                    registry.byId("outputSp").addOption({label: this.i18n.mercator, value: 102100});

                    if (this.imageServiceLayer.hasOwnProperty("spatialReference") && this.imageServiceLayer.spatialReference.wkid !== 102100)
                        registry.byId("outputSp").addOption({label: this.i18n.default, value: this.imageServiceLayer.spatialReference.wkid});
                    var srsList = registry.byId("outputSp").getOptions();
                    var temp;
                    for (var a in srsList) {
                        if (this.previousSpatialReference === srsList[a].value)
                        {
                            temp = this.previousSpatialReference;
                            break;
                        } else
                            temp = wkid;
                    }
                    registry.byId("outputSp").set("value", temp);
                },
                exportLayer: function () {
                    this.refreshData();
                    this.showLoading();
                    if (this.imageServiceLayer) {
                        if (registry.byId("defineExtent").checked)
                        {
                            var bbox = (this.geometry.xmin + ", " + this.geometry.ymin + ", " + this.geometry.xmax + ", " + this.geometry.ymax).toString();
                            var width = (this.geometry.xmax - this.geometry.xmin);
                            var height = (this.geometry.ymax - this.geometry.ymin);
                            var bboxSR = this.geometry.spatialReference;

                        } else
                        {
                            var bbox = (this.map.extent.xmin + ", " + this.map.extent.ymin + ", " + this.map.extent.xmax + ", " + this.map.extent.ymax).toString();
                            var width = (this.map.extent.xmax - this.map.extent.xmin);
                            var height = (this.map.extent.ymax - this.map.extent.ymin);
                            var bboxSR = this.map.spatialReference;
                        }

                        var pixelsize = parseFloat(registry.byId("pixelSize").get("value"));

                        var widthMax = this.map.width;
                        var heightMax = this.map.height;

                        var psx = width / widthMax;
                        var psy = height / widthMax;

                        if (pixelsize === "")
                            pixelsize = psx;
                        var ps = Math.max(psx, psy, pixelsize);

                        if ((width / pixelsize) > widthMax || (height / pixelsize) > widthMax) {
                            var size = "";
                            document.getElementById("errorPixelSize").innerHTML = this.i18n.error3 + " " + ps.toFixed(3) + " " + this.i18n.error4;
                            domStyle.set("loadingExport", "display", "none");
                        } else {
                            var size = (parseInt(width / ps)).toString() + ", " + (parseInt(height / ps)).toString();
                            document.getElementById("errorPixelSize").innerHTML = "";

                            if (this.imageServiceLayer.renderingRule) {
                                var raster = registry.byId("renderer").checked ? this.imageServiceLayer.renderingRule : new RasterFunction({"rasterFunction": "None"});
                                var renderingRule = raster;
                            } else
                                var renderingRule = null;
                            if (registry.byId("defineExtent").checked) {

                                var rasterClip = new RasterFunction();
                                rasterClip.functionName = "Clip";
                                var clipArguments = {};
                                clipArguments.ClippingGeometry = this.geometryClip;
                                clipArguments.ClippingType = 1;
                                if (raster)
                                    clipArguments.Raster = raster;
                                rasterClip.functionArguments = clipArguments;

                                var renderingRule = JSON.stringify(rasterClip.toJson());
                            } else {
                                var renderingRule = renderingRule ? JSON.stringify(renderingRule.toJson()) : null;
                            }

                            var format = "tiff";
                            var compression = "LZ77";
                            var mosaicRule = this.imageServiceLayer.mosaicRule ? JSON.stringify(this.imageServiceLayer.mosaicRule.toJson()) : null;
                            var band = this.imageServiceLayer.bandIds ? (this.imageServiceLayer.bandIds).toString() : "";
                            var noData = "";

                            var layersRequest = esriRequest({
                                url: this.imageServiceLayer.url + "/exportImage",
                                content: {
                                    f: "json",
                                    bbox: bbox,
                                    bboxSR: JSON.stringify(bboxSR),
                                    size: size,
                                    compression: compression,
                                    format: format,
                                    //interpolation: this.imageServiceLayer.interpolation ? this.imageServiceLayer.interpolation : "RSP_BilinearInterpolation",
                                    renderingRule: renderingRule,
                                    mosaicRule: mosaicRule,
                                    bandIds: band,
                                    imageSR: registry.byId("outputSp").get("value"),
                                    noData: noData
                                },
                                handleAs: "json",
                                callbackParamName: "callback"
                            });

                            layersRequest.then(lang.hitch(this, function (data) {

                                domAttr.set("linkDownload", "href", data.href);

                                domAttr.set("linkDownload", "target", "_self");
                                (document.getElementById("linkDownload")).click();
                                this.hideLoading();

                            }), lang.hitch(this, function (error) {
                                this.hideLoading();
                            }));
                        }
                    } else {
                        document.getElementById("errorPixelSize").innerHTML = this.i18n.error;
                    }
                },
                refreshData: function () {
                    if (this.map.layerIds) {
                        this.imageServiceLayer = null;
                        if ((this.map.resultLayer && this.map.getLayer(this.map.resultLayer).visible) || (this.map.getLayer("resultLayer") && this.map.getLayer("resultLayer").visible)) {
                            this.imageServiceLayer = this.map.resultLayer ? this.map.getLayer(this.map.resultLayer) : this.map.getLayer("resultLayer");
                        } else if (this.map.primaryLayer && this.map.getLayer(this.map.primaryLayer).visible && this.map.getLayer(this.map.primaryLayer).serviceDataType && this.map.getLayer(this.map.primaryLayer).serviceDataType.substr(0, 16) === "esriImageService") {
                            this.imageServiceLayer = this.map.getLayer(this.map.primaryLayer);
                        } else if (this.map.secondaryLayer && this.map.getLayer(this.map.secondaryLayer).visible && this.map.getLayer(this.map.secondaryLayer).serviceDataType && this.map.getLayer(this.map.secondaryLayer).serviceDataType.substr(0, 16) === "esriImageService") {
                            this.imageServiceLayer = this.map.getLayer(this.map.secondaryLayer);
                        } else {
                            for (var a = this.map.layerIds.length - 1; a >= 0; a--) {
                                var layerObject = this.map.getLayer(this.map.layerIds[a]);
                                if (layerObject && layerObject.serviceDataType && layerObject.serviceDataType.substr(0, 16) === "esriImageService" && layerObject.visible) {
                                    this.imageServiceLayer = layerObject;
                                    break;
                                }
                            }

                        }
                    }
                    if (this.imageServiceLayer) {
                        html.set(document.getElementById("exportLayerTitle"), "Layer: <b>" + (this.imageServiceLayer.arcgisProps ? this.imageServiceLayer.arcgisProps.title : (this.imageServiceLayer.title || this.imageServiceLayer.name || this.imageServiceLayer.id)) + "</b>");
                        document.getElementById("exportLayerTitle").style.color = "black";
                        this.setSavingType();

                    } else {
                        html.set(document.getElementById("exportLayerTitle"), this.i18n.error);
                        document.getElementById("exportLayerTitle").style.color = "#ee0000";
                        domStyle.set("exportSaveContainer", "display", "none");
                        domStyle.set("saveAgolContainer", "display", "none");
                        domStyle.set("selectExportDisplay", "display", "none");
                    }
                },
                showLoading: function () {
                    domStyle.set("loadingExport", "display", "block");
                },
                hideLoading: function () {
                    domStyle.set("loadingExport", "display", "none");
                }
            });


        });