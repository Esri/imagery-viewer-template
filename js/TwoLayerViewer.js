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
    "dojo/_base/declare",
    "dojo/_base/lang", "dojo/Evented",
    "dijit/registry",
    "dojo/html",
    "dojo/dom-class",
    "dojo/dom",
    "esri/layers/MosaicRule",
    "esri/tasks/query",
    "esri/tasks/QueryTask",
    "esri/geometry/Extent",
    "dojo/date/locale",
    "dojo/html",
    "esri/dijit/LayerSwipe",
    "dojo/dom-construct",
    "dijit/form/HorizontalSlider",
    "dijit/form/HorizontalRule",
    "dijit/form/HorizontalRuleLabels",
    "esri/graphic",
    "esri/symbols/SimpleLineSymbol",
    "esri/symbols/SimpleFillSymbol",
    "esri/Color",
    "esri/InfoTemplate",
    "esri/geometry/mathUtils",
    "dojo/dom-style",
    "esri/layers/ArcGISImageServiceLayer",
    "esri/layers/ImageServiceParameters",
    "esri/tasks/ImageServiceIdentifyTask",
    "esri/tasks/ImageServiceIdentifyParameters",
    "esri/layers/RasterFunction",
    "esri/geometry/Polygon",
    "esri/geometry/Point",
    "esri/request", "dijit/Tooltip",
    "dijit/form/Select",
    "dijit/form/Button",
    "dijit/form/NumberSpinner",
    "dijit/form/CheckBox",
    "dijit/form/TextBox",
    "dijit/form/DropDownButton",
    "dijit/TooltipDialog",
], function (declare, lang, Evented, registry,
        html,
        domClass,
        dom,
        MosaicRule,
        Query, QueryTask, Extent, locale, html, LayerSwipe, domConstruct, HorizontalSlider, HorizontalRule, HorizontalRuleLabels, Graphic, SimpleLineSymbol, SimpleFillSymbol, Color, InfoTemplate, mathUtils, domStyle, ArcGISImageServiceLayer, ImageServiceParameters, ImageServiceIdentifyTask, ImageServiceIdentifyParameters, RasterFunction, Polygon, Point, esriRequest, Tooltip) {

    return declare("application.TwoLayerViewer", [Evented], {
        constructor: function (parameters) {
            var defaults = {
                map: null,
                config: null,
                layers: null,
                i18n: null,
                main: ""
            };
            lang.mixin(this, defaults, parameters);
        },
        primaryLayer: null,
        secondaryLayer: null,
        orderedDates: null,
        sliderRules: null,
        sliderLabels: null,
        slider: null,
        features: null,
        sliderValue: null,
        featureIds: [],
        responseAlert: false,
        defaultMosaicRule: null,
        mapZoomFactor: 2.0,
        previousValue: null,
        mapWidthPanFactor: 0.75,
        previousLayerInfo: {primary: {id: null, mosaicRule: null}, secondary: {id: null, mosaicRule: null}},
        swipePosition: null,
        postCreate: function () {
            domConstruct.place('<img id="loadingTwoLayerViewer" style="position: absolute;top:0;bottom: 0;left: 0;right: 0;margin:auto;z-index:100;" src="images/loading.gif">', "layerViewerNode");
            domStyle.set("loadingTwoLayerViewer", "display", "none");
            this.layerInfos = this.layers;
            window.addEventListener("resize", lang.hitch(this, this.resizeBtn));
            registry.byId("dropDownImageList").on("click", lang.hitch(this, this.imageDisplayFormat));
            registry.byId("dropDownImageListRight").on("click", lang.hitch(this, this.imageDisplayFormatRight));
            registry.byId("imageSelectorDropDown").on("change", lang.hitch(this, this.sliderDropDownSelection, "dropDown"));
            registry.byId("imageSelectorDropDownRight").on("change", lang.hitch(this, this.sliderDropDownSelectionRight, "dropDown"));
            registry.byId("leftLayerRenderer").on("change", lang.hitch(this, this.setRenderingRule));
            registry.byId("rightLayerRenderer").on("change", lang.hitch(this, this.setRenderingRuleRight));
            registry.byId("subtractValue").on("change", lang.hitch(this, function (value) {
                this.leftLayerInfos[this.primaryLayer.id].age = value;
                this.sliderChange();
            }));
            registry.byId("subtractValueRight").on("change", lang.hitch(this, function (value) {
                this.rightLayerInfos[this.secondaryLayer.id].age = value;
                this.sliderChangeRight();
            }));
            registry.byId("subtractDateString").on("change", lang.hitch(this, function (value) {
                this.leftLayerInfos[this.primaryLayer.id].ageString = value;
                this.sliderChange();
            }));
            registry.byId("subtractDateStringRight").on("change", lang.hitch(this, function (value) {
                this.rightLayerInfos[this.secondaryLayer.id].ageString = value;
                this.sliderChangeRight();
            }));
            registry.byId("show").on("change", lang.hitch(this, function (value) {
                this.leftLayerInfos[this.primaryLayer.id].type = value;
                if (value === "image") {
                    if (!this.primaryLayer.visible)
                        this.primaryLayer.show();
                } else
                    this.primaryLayer.hide();
                this.valueSelected = registry.byId("imageSelectorDropDown").get("value");
                this.sliderChange();
            }));
            registry.byId("showRight").on("change", lang.hitch(this, function (value) {
                this.rightLayerInfos[this.secondaryLayer.id].type = value;
                if (value === "image") {
                    if (!this.secondaryLayer.visible)
                        this.secondaryLayer.show();
                } else
                    this.secondaryLayer.hide();
                this.valueSelectedRight = registry.byId("imageSelectorDropDownRight").get("value");
                this.sliderChangeRight();
            }));
            registry.byId("imageSelector").on("change", lang.hitch(this, this.setFilterDiv));
            registry.byId("imageSelectorRight").on("change", lang.hitch(this, this.setFilterDivRight));
            registry.byId("leftLayerSelector").on("change", lang.hitch(this, this.selectLeftLayer));
            registry.byId("rightLayerSelector").on("change", lang.hitch(this, this.selectRightLayer));
            registry.byId("refreshImageSliderBtn").on("click", lang.hitch(this, this.imageSliderRefresh));
            registry.byId("refreshImageSliderBtnRight").on("click", lang.hitch(this, this.imageSliderRefreshRight));
            registry.byId("leftLayer").on("click", lang.hitch(this, function () {
                if (this.layerSwipe) {
                    this.moveSwipe(this.map.width - 40, this.layerSwipe.invertPlacement, this.layerSwipe.layers);
                }
                domStyle.set("rightLayerDiv", "display", "none");
                domStyle.set("leftLayerDiv", "display", "block");
                this.currentLayerProp = registry.byId("leftLayerSelector").get("value") !== "none" ? this.leftLayerInfos[registry.byId("leftLayerSelector").get("value")] : null;
            }));
            registry.byId("rightLayer").on("click", lang.hitch(this, function () {
                if (this.layerSwipe) {
                    this.moveSwipe(document.getElementById("toolsContentContainer").clientWidth ? document.getElementById("toolsContentContainer").clientWidth + 15 : 40, this.layerSwipe.invertPlacement, this.layerSwipe.layers);
                }
                domStyle.set("leftLayerDiv", "display", "none");
                domStyle.set("rightLayerDiv", "display", "block");
                this.currentLayerPropRight = registry.byId("rightLayerSelector").get("value") !== "none" ? this.rightLayerInfos[registry.byId("rightLayerSelector").get("value") + "_RightLayer"] : null;
            }));
            this.fillLayerSelector();
            if (this.map) {
                this.map.on("extent-change", lang.hitch(this, this.mapExtentChange));
                this.map.on("update-start", lang.hitch(this, this.showLoading));
                this.map.on("update-end", lang.hitch(this, this.hideLoading));
                this.addLayerHandler = this.map.on("layer-add", lang.hitch(this, function () {
                    this.currentLayerPropRight = this.rightLayerInfos[registry.byId("rightLayerSelector").get("value") + "_RightLayer"];
                    this.checkLayerPropRight();
                }));
            }
            this.setTooltips();
            this.resizeBtn();
            if (this.config.display === "both") {

                domStyle.set("imageSelectContainer", "display", "inline-block");
                domStyle.set("imageSelectContainerRight", "display", "inline-block");
            } else {
                if (this.config.display === "dropdown") {
                    this.imageDisplayFormat();
                    this.imageDisplayFormatRight();
                }
                domStyle.set("imageSelectContainer", "display", "none");
                domStyle.set("imageSelectContainerRight", "display", "none");
            }

            var layer;
            for (var a in this.map.layerIds) {
                layer = this.map.getLayer(this.map.layerIds[a]);
                if ((layer.type && layer.type === 'ArcGISImageServiceLayer') || (layer.serviceDataType && layer.serviceDataType.substr(0, 16) === "esriImageService")) {
                    this.secondaryLayerIndex = a;
                    break;
                }
            }

            for (var a in this.layerInfos) {
                if (a === this.config.comparisonLayer) {
                    this.map.getLayer(a).hide();
                    break;
                }
            }
            if (this.config.comparisonLayer) {
                registry.byId("rightLayerSelector").set("value", this.config.comparisonLayer);
            }
            if (this.config.defaultLayer) {
                registry.byId("leftLayerSelector").set("value", this.config.defaultLayer);

            }
            if(this.config.showFootprint){
                domStyle.set("showImageFootprint","display","block");
                domStyle.set("showImageFootprintRight","display","block");
            }
            this.main.resizeTemplate();
            setTimeout(lang.hitch(this, function () {
                this.refreshSwipe();
            }), 500);

        },
        fillLayerSelector: function () {
            registry.byId("leftLayerSelector").addOption({label: "Basemap", value: "none"});
            registry.byId("rightLayerSelector").addOption({label: "Basemap", value: "none"});
            var layer;
            this.leftLayerInfos = [], this.rightLayerInfos = [];
            for (var a in this.layerInfos) {
                layer = this.map.getLayer(a);
                registry.byId("leftLayerSelector").addOption({label: this.layerInfos[a].title, value: a});
                registry.byId("rightLayerSelector").addOption({label: this.layerInfos[a].title, value: a});
                this.layerInfos[a].defaultMosaicRule = (layer.mosaicRule || layer.defaultMosaicRule || null);
                this.layerInfos[a].defaultRenderer = layer.renderer;
                this.layerInfos[a].defaultRenderingRule = layer.renderingRule;
                this.layerInfos[a].defaultBandIds = layer.bandIds;
                this.layerInfos[a].state = false;
                this.layerInfos[a].age = 0;
                this.layerInfos[a].ageString = "days";
                this.layerInfos[a].type = "image";
                this.layerInfos[a].currentValue = null;
                this.leftLayerInfos[a] = lang.clone(this.layerInfos[a]);
                this.rightLayerInfos[a + "_RightLayer"] = lang.clone(this.layerInfos[a]);
            }
        },
        setTooltips: function () {
            this.switchDisplayTooltip = new Tooltip({
                connectId: ['dropDownImageList'],
                position: ['below'],
                label: this.i18n.dropDown
            });
            this.switchDisplayTooltipRight = new Tooltip({
                connectId: ['dropDownImageListRight'],
                position: ['below'],
                label: this.i18n.dropDown
            });
            new Tooltip({
                connectId: ["imageSelector", "imageSelectorRight"],
                position: ['below'],
                label: this.i18n.tooltip
            });
            new Tooltip({
                connectId: ["refreshImageSliderBtn", "refreshImageSliderBtnRight"],
                position: ['after', 'below'],
                label: this.i18n.refreshTooltip
            });
        },
        resizeBtn: function () {
            var subtractValue = [registry.byId("subtractValue").domNode, registry.byId("subtractValueRight").domNode];
            for (var a in subtractValue) {
                if (window.innerWidth > 1200) {
                    domStyle.set(subtractValue[a], "width", "60px");
                    domStyle.set(subtractValue[a], "height", "28px");
                } else if (window.innerWidth > 1000) {
                    domStyle.set(subtractValue[a], "width", "50px");
                    domStyle.set(subtractValue[a], "height", "25px");
                } else if (window.innerWidth > 800) {
                    domStyle.set(subtractValue[a], "width", "40px");
                    domStyle.set(subtractValue[a], "height", "22px");
                } else if (window.innerWidth > 600) {
                    domStyle.set(subtractValue[a], "width", "35px");
                    domStyle.set(subtractValue[a], "height", "19px");
                } else if (window.innerWidth > 400) {
                    domStyle.set(subtractValue[a], "width", "30px");
                    domStyle.set(subtractValue[a], "height", "17px");
                } else {
                    domStyle.set(subtractValue[a], "width", "25px");
                    domStyle.set(subtractValue[a], "height", "15px");
                }
            }

        },
        onOpen: function () {
            if (!this.previousInfo) {
                this.previousInfo = {
                    extent: this.map.extent,
                    level: this.map.getLevel()
                };
                this.previousExtentChangeLevel = this.previousInfo.level;
            }

            if (!this.addLayerHandler) {
                this.addLayerHandler = this.map.on("layer-add", lang.hitch(this, function () {
                    this.currentLayerPropRight = registry.byId("rightLayerSelector").get("value") !== "none" ? this.rightLayerInfos[registry.byId("rightLayerSelector").get("value") + "_RightLayer"] : null;
                    this.checkLayerPropRight();
                }));
            }
            this.refreshHandler = this.map.on("update-end", lang.hitch(this, this.refreshSwipe));

            this.refreshSwipe();
            if (this.map.getLevel() < this.config.zoomLevel) {
                this.turnOffSelector();
                this.turnOffSelectorRight();
            }
        },
        selectLeftLayer: function (value) {

            if (this.primaryLayer)
                this.primaryLayer.hide();

            if (value === "none") {
                this.clearGraphics();
                this.primaryLayer = null;
                domStyle.set("imageSelectCheckBox", "display", "none");
                registry.byId("imageSelector").set("checked", false);
                domStyle.set("leftRenderer", "display", "none");
                this.refreshSwipe();
            } else {
                this.currentLayerProp = value !== "none" ? this.leftLayerInfos[value] : null;
                this.valueSelected = null;
                this.primaryLayer = this.map.getLayer(value);
                if(this.config.showRendering)
                this.populateRendererList();
                this.primaryLayer.show();
                this.checkLayerProp();
            }
        },
        populateRendererList: function () {
            registry.byId("leftLayerRenderer").removeOption(registry.byId("leftLayerRenderer").getOptions());
            var currentRenderer = this.primaryLayer.renderingRule ? this.primaryLayer.renderingRule : null;
            for (var a in this.primaryLayer.rasterFunctionInfos) {
                if (this.currentLayerProp.defaultRenderer || this.currentLayerProp.defaultBandIds)
                    var rendererExist = true;
                if (currentRenderer && currentRenderer.functionName && this.primaryLayer.rasterFunctionInfos[a].name === currentRenderer.functionName)
                    var setRenderer = true;
                registry.byId("leftLayerRenderer").addOption({label: this.primaryLayer.rasterFunctionInfos[a].name, value: this.primaryLayer.rasterFunctionInfos[a].name});
            }
            if (registry.byId("leftLayerRenderer").getOptions().length > 0) {
                if (rendererExist) {
                    registry.byId("leftLayerRenderer").addOption({label: this.i18n.default, value: "default"});
                    this.defaultRenderer = this.currentLayerProp.defaultRenderer;
                    this.defaultBandIds = this.currentLayerProp.defaultBandIds;
                    this.defaultRenderingRule = this.currentLayerProp.defaultRenderingRule;
                }
                if (setRenderer) {
                    registry.byId("leftLayerRenderer").set("value", currentRenderer.functionName);
                } else
                    registry.byId("leftLayerRenderer").set("value", "default");
                domStyle.set("leftRenderer", "display", "block");
            } else {
                domStyle.set("leftRenderer", "display", "none");
            }
        },
        setRenderingRule: function (value) {
            if (this.primaryLayer) {
                if (value === "default") {
                    this.primaryLayer.setBandIds(this.defaultBandIds, true);
                    this.primaryLayer.setRenderingRule(this.defaultRenderingRule, true);
                    this.primaryLayer.setRenderer(this.defaultRenderer);
                } else {
                    this.primaryLayer.setBandIds([], true);
                    this.primaryLayer.setRenderer(null);
                    this.primaryLayer.setRenderingRule(new RasterFunction({"rasterFunction": value}));
                }
            }
        },
        selectRightLayer: function (value) {
            if (this.secondaryLayer) {
                this.secondaryLayer.suspend();
                this.map.removeLayer(this.secondaryLayer);
            }
            if (value === "none") {
                this.clearGraphicsRight();
                this.secondaryLayer = null;
                domStyle.set("imageSelectCheckBoxRight", "display", "none");
                registry.byId("imageSelectorRight").set("checked", false);
                domStyle.set("rightRenderer", "display", "none");
                this.refreshSwipe();
            } else {

                this.valueSelectedRight = null;
                var layer = this.map.getLayer(value);
                var params = new ImageServiceParameters();
                this.currentLayerPropRight = value !== "none" ? this.rightLayerInfos[value + "_RightLayer"] : null;
                if(this.config.showRendering)
                this.populateRendererListRight(layer);
                params.mosaicRule = this.rightLayerInfos[value + "_RightLayer"].defaultMosaicRule;

                if (layer.renderingRule) {
                    params.renderingRule = layer.renderingRule;
                }
                if (layer.bandIds) {
                    params.bandIds = layer.bandIds;
                }
                if (layer.format) {
                    params.format = layer.format;
                }
                if (layer.interpolation) {
                    params.interpolation = layer.interpolation;
                }
                if (layer.compressionQuality)
                    params.compressionQuality = layer.compressionQuality;
                if (layer.timeInfo && layer.timeInfo.timeExtent)
                    params.timeExtent = layer.timeInfo.timeExtent;
                var popupInfo = "";
                if (layer.popupInfo) {
                    popupInfo = new PopupTemplate(layer.popupInfo);
                }

                this.secondaryLayer = new ArcGISImageServiceLayer(
                        layer.url,
                        {
                            id: layer.id + "_RightLayer",
                            imageServiceParameters: params,
                            visible: true,
                            infoTemplate: popupInfo,
                            opacity: layer.opacity,
                            useMapTime: layer.useMapTime,
                            useMapImage: layer.useMapImage
                        });
                this.map.addLayer(this.secondaryLayer, this.secondaryLayerIndex);
            }
        },
        populateRendererListRight: function (layer) {
            registry.byId("rightLayerRenderer").removeOption(registry.byId("rightLayerRenderer").getOptions());
            var currentRenderer = layer.renderingRule ? layer.renderingRule : null;
            for (var a in layer.rasterFunctionInfos) {
                if (this.currentLayerPropRight.defaultRenderer || this.currentLayerPropRight.defaultBandIds)
                    var rendererExist = true;
                if (currentRenderer && currentRenderer.functionName && layer.rasterFunctionInfos[a].name === currentRenderer.functionName)
                    var setRenderer = true;
                registry.byId("rightLayerRenderer").addOption({label: layer.rasterFunctionInfos[a].name, value: layer.rasterFunctionInfos[a].name});
            }
            if (registry.byId("rightLayerRenderer").getOptions().length > 0) {
                if (rendererExist) {
                    registry.byId("rightLayerRenderer").addOption({label: this.i18n.default, value: "default"});
                    this.defaultRendererRight = this.currentLayerPropRight.defaultRenderer;
                    this.defaultBandIdsRight = this.currentLayerPropRight.defaultBandIds;
                    this.defaultRenderingRuleRight = this.currentLayerPropRight.defaultRenderingRule;
                }
                if (setRenderer) {
                    registry.byId("rightLayerRenderer").set("value", currentRenderer.functionName);
                } else
                    registry.byId("rightLayerRenderer").set("value", "default");
                domStyle.set("rightRenderer", "display", "block");
            } else {
                domStyle.set("rightRenderer", "display", "none");
            }
        },
        setRenderingRuleRight: function (value) {
            if (this.secondaryLayer) {
                if (value === "default") {
                    this.secondaryLayer.setBandIds(this.defaultBandIdsRight, true);
                    this.secondaryLayer.setRenderingRule(this.defaultRenderingRuleRight, true);
                    this.secondaryLayer.setRenderer(this.defaultRendererRight);
                } else {
                    this.secondaryLayer.setBandIds([], true);
                    this.secondaryLayer.setRenderer(null);
                    this.secondaryLayer.setRenderingRule(new RasterFunction({"rasterFunction": value}));
                }
            }
        },
        checkLayerProp: function () {
            if (!this.currentLayerProp.imageSelector) {
                domStyle.set("imageSelectCheckBox", "display", "none");
                registry.byId("imageSelector").set("checked", false);
            } else {
                domStyle.set("imageSelectCheckBox", "display", "block");
                this.defaultMosaicRule = this.currentLayerProp.defaultMosaicRule;
                if (this.primaryLayer.currentVersion)
                {
                    var currentVersion = this.primaryLayer.currentVersion;
                    this.checkField(currentVersion);
                } else {

                    var layersRequest = esriRequest({
                        url: this.primaryLayer.url,
                        content: {f: "json"},
                        handleAs: "json",
                        callbackParamName: "callback"
                    });
                    layersRequest.then(lang.hitch(this, function (data) {
                        var currentVersion = data.currentVersion;
                        this.checkField(currentVersion);
                    }));
                }
            }
        },
        checkField: function (currentVersion)
        {
            if (currentVersion >= 10.21) {
                if (this.map.getLevel() >= this.config.zoomLevel) {
                    if (this.currentLayerProp.imageField && this.currentLayerProp.objectID && this.currentLayerProp.category) {
                        this.imageField = this.currentLayerProp.imageField;
                        for (var a in this.primaryLayer.fields) {
                            if (this.imageField === this.primaryLayer.fields[a].name) {
                                this.imageFieldType = this.primaryLayer.fields[a].type;
                                break;
                            }
                        }
                        if (this.imageFieldType === "esriFieldTypeDate" && this.config.showRange)
                            domStyle.set("ageDiv", "display", "block");
                        else
                            domStyle.set("ageDiv", "display", "none");
                        this.objectID = this.currentLayerProp.objectID;
                        this.categoryField = this.currentLayerProp.category;
                        registry.byId("imageSelector").set("disabled", false);
                        html.set(document.getElementById("errorDiv"), "");
                        this.setSavedState();
                    } else {
                        registry.byId("imageSelector").set("checked", false);
                        registry.byId("imageSelector").set("disabled", true);
                        if (!this.currentLayerProp.imageField) {
                            html.set(document.getElementById("errorDiv"), this.i18n.error1);
                        } else if (!this.currentLayerProp.objectID) {
                            html.set(document.getElementById("errorDiv"), this.i18n.error2);
                        } else {
                            html.set(document.getElementById("errorDiv"), this.i18n.error3);
                        }
                    }
                } else {
                    this.turnOffSelector();

                }
            } else {
                registry.byId("imageSelector").set("checked", false);
                registry.byId("imageSelector").set("disabled", true);
                html.set(document.getElementById("errorDiv"), this.i18n.error5);
            }
        },
        checkLayerPropRight: function () {
            if (!this.currentLayerPropRight.imageSelector) {
                domStyle.set("imageSelectCheckBoxRight", "display", "none");
                registry.byId("imageSelectorRight").set("checked", false);
            } else {
                domStyle.set("imageSelectCheckBoxRight", "display", "block");
                this.defaultMosaicRule = this.currentLayerPropRight.defaultMosaicRule;
                if (this.secondaryLayer.currentVersion)
                {
                    var currentVersion = this.secondaryLayer.currentVersion;
                    this.checkFieldRight(currentVersion);
                } else {

                    var layersRequest = esriRequest({
                        url: this.secondaryLayer.url,
                        content: {f: "json"},
                        handleAs: "json",
                        callbackParamName: "callback"
                    });
                    layersRequest.then(lang.hitch(this, function (data) {
                        var currentVersion = data.currentVersion;
                        this.checkFieldRight(currentVersion);
                    }));
                }
            }
        },
        checkFieldRight: function (currentVersion)
        {
            if (currentVersion >= 10.21) {
                if (this.map.getLevel() >= this.config.zoomLevel) {
                    if (this.currentLayerPropRight.imageField && this.currentLayerPropRight.objectID && this.currentLayerPropRight.category) {
                        this.imageFieldRight = this.currentLayerPropRight.imageField;
                        for (var a in this.secondaryLayer.fields) {
                            if (this.imageFieldRight === this.secondaryLayer.fields[a].name) {
                                this.imageFieldTypeRight = this.secondaryLayer.fields[a].type;
                                break;
                            }
                        }
                        if (this.imageFieldTypeRight === "esriFieldTypeDate" && this.config.showRange)
                            domStyle.set("ageDivRight", "display", "block");
                        else
                            domStyle.set("ageDivRight", "display", "none");
                        this.objectIDRight = this.currentLayerPropRight.objectID;
                        this.categoryFieldRight = this.currentLayerPropRight.category;
                        registry.byId("imageSelectorRight").set("disabled", false);
                        html.set(document.getElementById("errorDivRight"), "");
                        this.setSavedStateRight();
                    } else {
                        registry.byId("imageSelectorRight").set("checked", false);
                        registry.byId("imageSelectorRight").set("disabled", true);
                        if (!this.currentLayerPropRight.imageField) {
                            html.set(document.getElementById("errorDivRight"), this.i18n.error1);
                        } else if (!this.currentLayerPropRight.objectID) {
                            html.set(document.getElementById("errorDivRight"), this.i18n.error2);
                        } else {
                            html.set(document.getElementById("errorDivRight"), this.i18n.error3);
                        }
                    }
                } else {
                    this.turnOffSelectorRight();

                }
            } else {
                registry.byId("imageSelectorRight").set("checked", false);
                registry.byId("imageSelectorRight").set("disabled", true);
                html.set(document.getElementById("errorDivRight"), this.i18n.error5);
            }
        },
        turnOffSelector: function () {
            if (registry.byId("imageSelector").checked)
                registry.byId("imageSelector").set("checked", false);
            else
                this.setFilterDiv();
            registry.byId("imageSelector").set("disabled", true);
            html.set(document.getElementById("errorDiv"), this.i18n.zoom);
        },
        turnOffSelectorRight: function () {
            if (registry.byId("imageSelectorRight").checked)
                registry.byId("imageSelectorRight").set("checked", false);
            else
                this.setFilterDivRight();
            registry.byId("imageSelectorRight").set("disabled", true);
            html.set(document.getElementById("errorDivRight"), this.i18n.zoom);
        },
        setSavedState: function () {
            registry.byId("show").set("value", this.currentLayerProp.type);
            registry.byId("subtractDateString").set("value", this.currentLayerProp.ageString);
            registry.byId("subtractValue").set("value", this.currentLayerProp.age);
            if (registry.byId("imageSelector").checked !== this.currentLayerProp.state)
                registry.byId("imageSelector").set("checked", this.currentLayerProp.state);
            else if (this.currentLayerProp.state)
                this.setFilterDiv();
        },
        setSavedStateRight: function () {
            registry.byId("showRight").set("value", this.currentLayerPropRight.type);
            registry.byId("subtractDateStringRight").set("value", this.currentLayerPropRight.ageString);
            registry.byId("subtractValueRight").set("value", this.currentLayerPropRight.age);
            if (registry.byId("imageSelectorRight").checked !== this.currentLayerPropRight.state)
                registry.byId("imageSelectorRight").set("checked", this.currentLayerPropRight.state);
            else if (this.currentLayerPropRight.state)
                this.setFilterDivRight();
        },
        mapExtentChange: function (evt) {
            if (evt.lod.level >= this.config.zoomLevel) {
                if (registry.byId("imageSelector").get("disabled")) {
                    registry.byId("imageSelector").set("disabled", false);
                    html.set(document.getElementById("errorDiv"), "");
                }
                if (registry.byId("imageSelectorRight").get("disabled")) {
                    registry.byId("imageSelectorRight").set("disabled", false);
                    html.set(document.getElementById("errorDivRight"), "");
                }
                var needsUpdate = false;
                if (evt.levelChange) {
                    var zoomLevelChange = Math.abs(evt.lod.level - this.previousInfo.level);
                    if (zoomLevelChange >= this.mapZoomFactor) {
                        console.info("LARGE zoom: ", evt);
                        needsUpdate = true;
                    } else {
                        if (this.previousExtentChangeLevel < this.config.zoomLevel) {
                            console.info("THRESHOLD zoom: ", evt);
                            needsUpdate = true;
                        }
                    }
                }

                var panDistance = Math.abs(mathUtils.getLength(evt.extent.getCenter(), this.previousInfo.extent.getCenter()));
                var previousMapWidth = (this.previousInfo.extent.getWidth() * this.mapWidthPanFactor);
                if (panDistance > previousMapWidth) {
                    console.info("LARGE pan: ", evt);
                    needsUpdate = true;
                }

                if (needsUpdate && this.config.autoRefresh) {
                    this.imageSliderRefresh();
                    this.imageSliderRefreshRight();
                }
            } else {
                this.turnOffSelector();
                this.turnOffSelectorRight();
            }

            this.previousExtentChangeLevel = evt.lod.level;
        },
        setFilterDiv: function () {
            if (registry.byId("imageSelector").get("checked")) {
                if (!this.slider) {
                    this.imageSliderShow();
                } else {
                    this.imageSliderRefresh();
                }
                domStyle.set("selectorDiv", "display", "block");
                this.leftLayerInfos[this.primaryLayer.id].state = true;
            } else {
                domStyle.set("selectorDiv", "display", "none");
                this.clearGraphics();
                if (this.primaryLayer) {
                    var mr = new MosaicRule(this.currentLayerProp.defaultMosaicRule);
                    this.primaryLayer.setMosaicRule(mr);
                    this.leftLayerInfos[this.primaryLayer.id].state = false;
                }
            }
        },
        setFilterDivRight: function () {
            if (registry.byId("imageSelectorRight").get("checked")) {

                if (!this.sliderRight) {
                    this.imageSliderShowRight();
                } else {
                    this.imageSliderRefreshRight();
                }
                domStyle.set("selectorDivRight", "display", "block");
                this.rightLayerInfos[this.secondaryLayer.id].state = true;
            } else {
                domStyle.set("selectorDivRight", "display", "none");
                this.clearGraphicsRight();
                if (this.secondaryLayer) {
                    var mr = new MosaicRule(this.currentLayerPropRight.defaultMosaicRule);
                    this.secondaryLayer.setMosaicRule(mr);
                    this.rightLayerInfos[this.secondaryLayer.id].state = false;
                }
            }
        },
        imageDisplayFormat: function () {
            if (domClass.contains("dropDownImageList", "dropDownSelected")) {
                domClass.remove("dropDownImageList", "dropDownSelected");
                this.switchDisplayTooltip.set("label", this.i18n.dropDown);
                document.getElementById("switchDisplayImage").src = "images/dropdownlist.png";
            } else {
                domClass.add("dropDownImageList", "dropDownSelected");
                this.switchDisplayTooltip.set("label", this.i18n.slider);
                document.getElementById("switchDisplayImage").src = "images/slider.png";
            }
            this.imageDisplayFormat2();
        },
        imageDisplayFormat2: function () {
            if (!domClass.contains("dropDownImageList", "dropDownSelected")) {
                domStyle.set("imageRange", "display", "inline-block");
                domStyle.set("dropDownOption", "display", "none");
                if (this.featureLength > 1) {
                    domStyle.set(this.slider.domNode, "display", "block");
                    domStyle.set(this.sliderRules.domNode, "display", "block");
                    domStyle.set(this.sliderLabels.domNode, "display", "block");
                } else {
                    domStyle.set(this.slider.domNode, "display", "none");
                    domStyle.set(this.sliderRules.domNode, "display", "none");
                    domStyle.set(this.sliderLabels.domNode, "display", "none");
                }
            } else {
                if (this.slider) {
                    domStyle.set(this.slider.domNode, "display", "none");
                    domStyle.set(this.sliderRules.domNode, "display", "none");
                    domStyle.set(this.sliderLabels.domNode, "display", "none");
                }
                domStyle.set("dropDownOption", "display", "inline-block");
            }
        },
        imageDisplayFormatRight: function () {
            if (domClass.contains("dropDownImageListRight", "dropDownSelected")) {
                domClass.remove("dropDownImageListRight", "dropDownSelected");
                this.switchDisplayTooltipRight.set("label", this.i18n.dropDown);
                document.getElementById("switchDisplayImageRight").src = "images/dropdownlist.png";
            } else {
                domClass.add("dropDownImageListRight", "dropDownSelected");
                this.switchDisplayTooltipRight.set("label", this.i18n.slider);
                document.getElementById("switchDisplayImageRight").src = "images/slider.png";
            }
            this.imageDisplayFormatRight2();
        },
        imageDisplayFormatRight2: function () {
            if (!domClass.contains("dropDownImageListRight", "dropDownSelected")) {
                domStyle.set(document.getElementById("imageRangeRight"), "display", "inline-block");
                domStyle.set("dropDownOptionRight", "display", "none");
                if (this.featureLengthRight > 1) {
                    domStyle.set(this.sliderRight.domNode, "display", "block");
                    domStyle.set(this.sliderRulesRight.domNode, "display", "block");
                    domStyle.set(this.sliderLabelsRight.domNode, "display", "block");
                } else {
                    domStyle.set(this.sliderRight.domNode, "display", "none");
                    domStyle.set(this.sliderRulesRight.domNode, "display", "none");
                    domStyle.set(this.sliderLabelsRight.domNode, "display", "none");
                }
            } else {
                if (this.sliderRight) {
                    domStyle.set(this.sliderRight.domNode, "display", "none");
                    domStyle.set(this.sliderRulesRight.domNode, "display", "none");
                    domStyle.set(this.sliderLabelsRight.domNode, "display", "none");
                }
                domStyle.set("dropDownOptionRight", "display", "inline-block");
            }
        },
        onClose: function () {
            if (this.addLayerHandler) {
                this.addLayerHandler.remove();
                this.addLayerHandler = null;
            }
            if (this.refreshHandler) {
                this.refreshHandler.remove();
                this.refreshHandler = null;
            }
            if (this.layerSwipe) {
                this.swipePosition = this.layerSwipe.domNode.children[0].offsetLeft;
                this.layerSwipe.destroy();
                this.layerSwipe = null;
            }
            this.previousLayerInfo = {primary: {id: null, mosaicRule: null}, secondary: {id: null, mosaicRule: null}};
        },
        imageSliderShow: function () {
            if (this.primaryLayer && registry.byId("imageSelector").get("checked")) {
                domStyle.set("selectorDiv", "display", "block");
                var extent = this.map.extent;
                var xminnew = ((extent.xmax + extent.xmin) / 2) - ((extent.xmax - extent.xmin) * this.config.searchExtent / 200);
                var xmaxnew = ((extent.xmax + extent.xmin) / 2) + ((extent.xmax - extent.xmin) * this.config.searchExtent / 200);
                var yminnew = ((extent.ymax + extent.ymin) / 2) - ((extent.ymax - extent.ymin) * this.config.searchExtent / 200);
                var ymaxnew = ((extent.ymax + extent.ymin) / 2) + ((extent.ymax - extent.ymin) * this.config.searchExtent / 200);
                var extentnew = new Extent(xminnew, yminnew, xmaxnew, ymaxnew, extent.spatialReference);
                var query = new Query();
                query.geometry = extentnew;
                query.outFields = [this.imageField];

                if (this.currentLayerProp.defaultMosaicRule && this.currentLayerProp.defaultMosaicRule.where)
                    var layerFilter = this.currentLayerProp.defaultMosaicRule.where;
                query.where = layerFilter ? this.categoryField + " = 1 AND " + layerFilter : this.categoryField + " = 1";
                query.orderByFields = [this.imageField];
                query.returnGeometry = true;
                this.showLoading();
                var queryTask = new QueryTask(this.primaryLayer.url);
                queryTask.execute(query, lang.hitch(this, function (result) {
                    this.previousInfo = {
                        extent: this.map.extent,
                        level: this.map.getLevel()
                    };

                    this.orderedFeatures = result.features;

                    if (this.orderedFeatures.length > 0) {
                        html.set(document.getElementById("errorDiv"), "");
                        this.orderedDates = [];
                        for (var a in this.orderedFeatures) {
                            if (this.config.distinctImages) {
                                if (parseInt(a) < 1)
                                    this.orderedDates.push({value: this.orderedFeatures[a].attributes[this.imageField], id: this.orderedFeatures[a].attributes[this.objectID]});
                                else {
                                    if (this.imageFieldType === "esriFieldTypeDate") {
                                        var tempValue = locale.format(new Date(this.orderedDates[this.orderedDates.length - 1].value), {selector: "date", formatLength: "short"});
                                        var tempCurrentValue = locale.format(new Date(this.orderedFeatures[a].attributes[this.imageField]), {selector: "date", formatLength: "short"});
                                        if (tempValue !== tempCurrentValue)
                                            this.orderedDates.push({value: this.orderedFeatures[a].attributes[this.imageField], id: this.orderedFeatures[a].attributes[this.objectID]});
                                    } else {
                                        if (this.orderedDates[this.orderedDates.length - 1].value !== this.orderedFeatures[a].attributes[this.imageField])
                                            this.orderedDates.push({value: this.orderedFeatures[a].attributes[this.imageField], id: this.orderedFeatures[a].attributes[this.objectID]});
                                    }
                                }
                            } else {
                                this.orderedDates.push({value: this.orderedFeatures[a].attributes[this.imageField], id: this.orderedFeatures[a].attributes[this.objectID]});
                            }
                        }

                        this.featureLength = this.orderedDates.length;
                        this.imageSliderHide();
                        var sliderNode = domConstruct.create("div", {}, "imageSliderDiv", "first");

                        var rulesNode = domConstruct.create("div", {}, sliderNode, "first");
                        this.sliderRules = new HorizontalRule({
                            container: "bottomDecoration",
                            count: this.featureLength,
                            style: "height:5px;"
                        }, rulesNode);

                        var labels = [];

                        if (this.imageFieldType === "esriFieldTypeDate") {

                            for (var i = 0; i < this.orderedDates.length; i++) {
                                labels[i] = locale.format(new Date(this.orderedDates[i].value), {selector: "date", formatLength: "short"});
                            }
                        } else {

                            for (var i = 0; i < this.orderedDates.length; i++) {
                                labels[i] = this.orderedDates[i].value;
                            }
                        }

                        var labelsNode = domConstruct.create("div", {}, sliderNode, "second");
                        this.sliderLabels = new HorizontalRuleLabels({
                            container: "bottomDecoration",
                            labelStyle: "height:1em;font-size:75%;color:gray;",
                            labels: [labels[0], labels[this.orderedDates.length - 1]]
                        }, labelsNode);

                        this.slider = new HorizontalSlider({
                            name: "slider",
                            value: 0,
                            minimum: 0,
                            maximum: this.featureLength - 1,
                            discreteValues: this.featureLength,
                            onChange: lang.hitch(this, this.sliderDropDownSelection, "slider")
                        }, sliderNode);
                        this.slider.startup();
                        this.sliderRules.startup();
                        this.sliderLabels.startup();

                        this.imageDisplayFormat2();
                        this.main.resizeTemplate();

                        registry.byId("imageSelectorDropDown").removeOption(registry.byId("imageSelectorDropDown").getOptions());

                        for (var v = this.orderedDates.length - 1; v >= 0; v--) {
                            registry.byId("imageSelectorDropDown").addOption({label: (this.imageFieldType === "esriFieldTypeDate" ? locale.format(new Date(this.orderedDates[v].value), {selector: "date", formatLength: "long"}) : this.orderedDates[v].value.toString()), value: "" + v + ""});
                        }

                        if (this.currentLayerProp.currentValue) {
                            var index = null;
                            for (var i in this.orderedDates) {
                                if (this.orderedDates[i].value === this.currentLayerProp.currentValue.value && this.orderedDates[i].id === this.currentLayerProp.currentValue.id) {
                                    var index = i;
                                    break;
                                } else if (this.orderedDates[i].value <= this.currentLayerProp.currentValue.value) {
                                    var index = i;
                                }
                            }
                            if (index)
                                this.setSliderValue(index);
                            else
                                this.selectDisplayedImage();
                        } else {
                            this.selectDisplayedImage();
                        }
                    } else {
                        html.set(document.getElementById("errorDiv"), this.i18n.error6);
                        domStyle.set("selectorDiv", "display", "none");
                        html.set(document.getElementById("imageRange"), "");
                        html.set(document.getElementById("imageCount"), "");
                        this.hideLoading();
                    }
                }));
            }
        },
        imageSliderShowRight: function () {
            if (this.secondaryLayer && registry.byId("imageSelectorRight").get("checked")) {
                domStyle.set("selectorDivRight", "display", "block");
                var extent = this.map.extent;
                var xminnew = ((extent.xmax + extent.xmin) / 2) - ((extent.xmax - extent.xmin) * this.config.searchExtent / 200);
                var xmaxnew = ((extent.xmax + extent.xmin) / 2) + ((extent.xmax - extent.xmin) * this.config.searchExtent / 200);
                var yminnew = ((extent.ymax + extent.ymin) / 2) - ((extent.ymax - extent.ymin) * this.config.searchExtent / 200);
                var ymaxnew = ((extent.ymax + extent.ymin) / 2) + ((extent.ymax - extent.ymin) * this.config.searchExtent / 200);
                var extentnew = new Extent(xminnew, yminnew, xmaxnew, ymaxnew, extent.spatialReference);
                var query = new Query();
                query.geometry = extentnew;
                query.outFields = [this.imageFieldRight];

                if (this.currentLayerPropRight.defaultMosaicRule && this.currentLayerPropRight.defaultMosaicRule.where)
                    var layerFilter = this.currentLayerPropRight.defaultMosaicRule.where;
                query.where = layerFilter ? this.categoryFieldRight + " = 1 AND " + layerFilter : this.categoryFieldRight + " = 1";
                query.orderByFields = [this.imageFieldRight];
                query.returnGeometry = true;
                this.showLoading();
                var queryTask = new QueryTask(this.secondaryLayer.url);
                queryTask.execute(query, lang.hitch(this, function (result) {
                    this.previousInfo = {
                        extent: this.map.extent,
                        level: this.map.getLevel()
                    };

                    this.orderedFeaturesRight = result.features;

                    if (this.orderedFeaturesRight.length > 0) {
                        html.set(document.getElementById("errorDivRight"), "");
                        this.orderedDatesRight = [];
                        for (var a in this.orderedFeaturesRight) {
                            if (this.config.distinctImages) {
                                if (parseInt(a) < 1)
                                    this.orderedDatesRight.push({value: this.orderedFeaturesRight[a].attributes[this.imageFieldRight], id: this.orderedFeaturesRight[a].attributes[this.objectIDRight]});
                                else {
                                    if (this.imageFieldTypeRight === "esriFieldTypeDate") {
                                        var tempValue = locale.format(new Date(this.orderedDatesRight[this.orderedDatesRight.length - 1].value), {selector: "date", formatLength: "short"});
                                        var tempCurrentValue = locale.format(new Date(this.orderedFeaturesRight[a].attributes[this.imageFieldRight]), {selector: "date", formatLength: "short"});
                                        if (tempValue !== tempCurrentValue)
                                            this.orderedDatesRight.push({value: this.orderedFeaturesRight[a].attributes[this.imageFieldRight], id: this.orderedFeaturesRight[a].attributes[this.objectIDRight]});
                                    } else {
                                        if (this.orderedDatesRight[this.orderedDatesRight.length - 1].value !== this.orderedFeaturesRight[a].attributes[this.imageFieldRight])
                                            this.orderedDatesRight.push({value: this.orderedFeaturesRight[a].attributes[this.imageFieldRight], id: this.orderedFeaturesRight[a].attributes[this.objectIDRight]});
                                    }
                                }
                            } else {
                                this.orderedDatesRight.push({value: this.orderedFeaturesRight[a].attributes[this.imageFieldRight], id: this.orderedFeaturesRight[a].attributes[this.objectIDRight]});
                            }
                        }

                        this.featureLengthRight = this.orderedDatesRight.length;
                        this.imageSliderHideRight();
                        var sliderNode = domConstruct.create("div", {}, "imageSliderDivRight", "first");

                        var rulesNode = domConstruct.create("div", {}, sliderNode, "first");
                        this.sliderRulesRight = new HorizontalRule({
                            container: "bottomDecoration",
                            count: this.featureLengthRight,
                            style: "height:5px;"
                        }, rulesNode);

                        var labels = [];

                        if (this.imageFieldTypeRight === "esriFieldTypeDate") {

                            for (var i = 0; i < this.orderedDatesRight.length; i++) {
                                labels[i] = locale.format(new Date(this.orderedDatesRight[i].value), {selector: "date", formatLength: "short"});
                            }
                        } else {

                            for (var i = 0; i < this.orderedDatesRight.length; i++) {
                                labels[i] = this.orderedDatesRight[i].value;
                            }
                        }

                        var labelsNode = domConstruct.create("div", {}, sliderNode, "second");
                        this.sliderLabelsRight = new HorizontalRuleLabels({
                            container: "bottomDecoration",
                            labelStyle: "height:1em;font-size:75%;color:gray;",
                            labels: [labels[0], labels[this.orderedDatesRight.length - 1]]
                        }, labelsNode);

                        this.sliderRight = new HorizontalSlider({
                            name: "slider",
                            value: 0,
                            minimum: 0,
                            maximum: this.featureLengthRight - 1,
                            discreteValues: this.featureLengthRight,
                            onChange: lang.hitch(this, this.sliderDropDownSelectionRight, "slider")
                        }, sliderNode);
                        this.sliderRight.startup();
                        this.sliderRulesRight.startup();
                        this.sliderLabelsRight.startup();
                        this.imageDisplayFormatRight2();
                        this.main.resizeTemplate();
                        registry.byId("imageSelectorDropDownRight").removeOption(registry.byId("imageSelectorDropDownRight").getOptions());
                        for (var v = this.orderedDatesRight.length - 1; v >= 0; v--) {
                            registry.byId("imageSelectorDropDownRight").addOption({label: (this.imageFieldTypeRight === "esriFieldTypeDate" ? locale.format(new Date(this.orderedDatesRight[v].value), {selector: "date", formatLength: "long"}) : this.orderedDatesRight[v].value.toString()), value: "" + v + ""});
                        }
                        if (this.currentLayerPropRight.currentValue) {
                            var index = null;
                            for (var i in this.orderedDatesRight) {
                                if (this.orderedDatesRight[i].value === this.currentLayerPropRight.currentValue.value && this.orderedDatesRight[i].id === this.currentLayerPropRight.currentValue.id) {
                                    var index = i;
                                    break;
                                } else if (this.orderedDatesRight[i].value <= this.currentLayerPropRight.currentValue.value) {
                                    var index = i;
                                }
                            }
                            if (index)
                                this.setSliderValueRight(index);
                            else
                                this.selectDisplayedImageRight();
                        } else {
                            this.selectDisplayedImageRight();
                        }
                    } else {
                        html.set(document.getElementById("errorDivRight"), this.i18n.error6);
                        domStyle.set("selectorDivRight", "display", "none");
                        html.set(document.getElementById("imageRangeRight"), "");
                        html.set(document.getElementById("imageCountRight"), "");
                        this.hideLoading();
                    }
                }));
            }
        },
        setSliderValue: function (index) {
            this.imageDisplayFormat2();
            registry.byId("imageSelectorDropDown").set("value", index);
            this.slider.set("value", index);
            if (this.imageFieldType === "esriFieldTypeDate")
                html.set(document.getElementById("imageRange"), this.i18n.date + ": <b>" + locale.format(new Date(this.orderedDates[index].value), {selector: "date", formatLength: "long"}) + "</b>");
            else
                html.set(document.getElementById("imageRange"), this.imageField + ": <b>" + this.orderedDates[index].value + "</b>");
            html.set(document.getElementById("imageCount"), "1 " + this.i18n.imageLabel);
            this.hideLoading();
        },
        setSliderValueRight: function (index) {
            this.imageDisplayFormatRight2();
            registry.byId("imageSelectorDropDownRight").set("value", index);
            this.sliderRight.set("value", index);
            if (this.imageFieldTypeRight === "esriFieldTypeDate")
                html.set(document.getElementById("imageRangeRight"), this.i18n.date + ": <b>" + locale.format(new Date(this.orderedDatesRight[index].value), {selector: "date", formatLength: "long"}) + "</b>");
            else
                html.set(document.getElementById("imageRangeRight"), this.imageFieldRight + ": <b>" + this.orderedDatesRight[index].value + "</b>");
            html.set(document.getElementById("imageCountRight"), "1 " + this.i18n.imageLabel);
            this.hideLoading();
        },
        selectDisplayedImage: function () {
            var request = new esriRequest({
                url: this.primaryLayer.url + "/getSamples",
                content: {
                    geometry: JSON.stringify(this.map.extent.getCenter()),
                    geometryType: "esriGeometryPoint",
                    returnGeometry: false,
                    sampleCount: 1,
                    mosaicRule: this.currentLayerProp.defaultMosaicRule ? JSON.stringify(this.currentLayerProp.defaultMosaicRule.toJson()) : null,
                    outFields: this.imageField,
                    f: "json"
                },
                handleAs: "json",
                callbackParamName: "callback"
            });
            request.then(lang.hitch(this, function (bestScene) {
                var maxVisible = bestScene.samples[0].attributes[this.imageField];
                var index = null;
                for (var z in this.orderedDates) {
                    if (this.orderedDates[z].value === maxVisible) {
                        index = z;
                        break;
                    }
                }
                if (!index)
                    var index = this.orderedDates.length - 1;
                this.setSliderValue(index);
            }), lang.hitch(this, function () {
                var imageTask = new ImageServiceIdentifyTask(this.primaryLayer.url);
                var imageParams = new ImageServiceIdentifyParameters();
                imageParams.geometry = this.map.extent.getCenter();
                imageParams.mosaicRule = this.currentLayerProp.defaultMosaicRule;
                imageParams.returnGeometry = false;
                imageTask.execute(imageParams, lang.hitch(this, function (data) {
                    var index;
                    if (/*!index && */data.catalogItems.features[0]) {
                        var maxVisible = data.catalogItems.features[0].attributes[this.imageField];
                        for (var z in this.orderedDates) {
                            if (this.orderedDates[z].value === maxVisible) {
                                index = z;
                            }
                        }
                    }
                    if (!index)
                        var index = this.orderedDates.length - 1;
                    this.setSliderValue(index);
                }), lang.hitch(this, function (error) {
                    this.setSliderValue(this.orderedDates.length - 1);
                }));
            }));
        },
        selectDisplayedImageRight: function () {
            var request = new esriRequest({
                url: this.secondaryLayer.url + "/getSamples",
                content: {
                    geometry: JSON.stringify(this.map.extent.getCenter()),
                    geometryType: "esriGeometryPoint",
                    returnGeometry: false,
                    sampleCount: 1,
                    mosaicRule: this.currentLayerPropRight.defaultMosaicRule ? JSON.stringify(this.currentLayerPropRight.defaultMosaicRule.toJson()) : null,
                    outFields: this.imageFieldRight,
                    f: "json"
                },
                handleAs: "json",
                callbackParamName: "callback"
            });
            request.then(lang.hitch(this, function (bestScene) {
                var maxVisible = bestScene.samples[0].attributes[this.imageFieldRight];
                var index = null;
                for (var z in this.orderedDatesRight) {
                    if (this.orderedDatesRight[z].value === maxVisible) {
                        index = z;
                        break;
                    }
                }
                if (!index)
                    var index = this.orderedDatesRight.length - 1;
                this.setSliderValueRight(index);
            }), lang.hitch(this, function () {
                var imageTask = new ImageServiceIdentifyTask(this.secondaryLayer.url);
                var imageParams = new ImageServiceIdentifyParameters();
                imageParams.geometry = this.map.extent.getCenter();
                imageParams.mosaicRule = this.currentLayerPropRight.defaultMosaicRule;
                imageParams.returnGeometry = false;
                imageTask.execute(imageParams, lang.hitch(this, function (data) {
                    var index;
                    if (/*!index && */data.catalogItems.features[0]) {
                        var maxVisible = data.catalogItems.features[0].attributes[this.imageFieldRight];
                        for (var z in this.orderedDatesRight) {
                            if (this.orderedDatesRight[z].value === maxVisible) {
                                index = z;
                            }
                        }
                    }
                    if (!index)
                        var index = this.orderedDatesRight.length - 1;
                    this.setSliderValueRight(index);
                }), lang.hitch(this, function (error) {
                    this.setSliderValueRight(this.orderedDatesRight.length - 1);
                }));
            }));
        },
        imageSliderHide: function () {
            if (this.slider) {
                this.sliderRules.destroy();
                this.sliderLabels.destroy();
                this.slider.destroy();
            }
            this.sliderRules = null;
            this.sliderLabels = null;
            this.slider = null;
        },
        imageSliderHideRight: function () {
            if (this.sliderRight) {
                this.sliderRulesRight.destroy();
                this.sliderLabelsRight.destroy();
                this.sliderRight.destroy();
            }
            this.sliderRulesRight = null;
            this.sliderLabelsRight = null;
            this.sliderRight = null;
        },
        sliderDropDownSelection: function (value) {
            if (!domClass.contains("dropDownImageList", "dropDownSelected") && value === "slider") {
                this.valueSelected = this.slider.get("value");
                registry.byId("imageSelectorDropDown").set("value", this.valueSelected);
                this.sliderChange();
            } else if (domClass.contains("dropDownImageList", "dropDownSelected") && value === "dropDown") {
                this.valueSelected = registry.byId("imageSelectorDropDown").get("value");
                this.slider.set("value", this.valueSelected);
                this.sliderChange();
            }
        },
        sliderDropDownSelectionRight: function (value) {
            if (!domClass.contains("dropDownImageListRight", "dropDownSelected") && value === "slider") {
                this.valueSelectedRight = this.sliderRight.get("value");
                registry.byId("imageSelectorDropDownRight").set("value", this.valueSelectedRight);
                this.sliderChangeRight();
            } else if (domClass.contains("dropDownImageListRight", "dropDownSelected") && value === "dropDown") {
                this.valueSelectedRight = registry.byId("imageSelectorDropDownRight").get("value");
                this.sliderRight.set("value", this.valueSelectedRight);
                this.sliderChangeRight();
            }
        },
        sliderChange: function () {
            if (registry.byId("imageSelector").get("checked")) {
                if (this.valueSelected || this.valueSelected === 0) {
                    var aqDate = this.orderedDates[this.valueSelected].value;
                    this.leftLayerInfos[this.primaryLayer.id].currentValue = this.orderedDates[this.valueSelected];
                    var featureSelect = [];
                    var featureIds = [];
                    if (this.imageFieldType === "esriFieldTypeDate") {
                        var compareDate = new Date(aqDate);
                        var compareValue = registry.byId("subtractValue").get("value");
                        if (compareValue !== 0) {
                            switch (registry.byId("subtractDateString").get("value")) {
                                case "days" :
                                {
                                    compareDate.setDate(compareDate.getDate() - compareValue);
                                    break;
                                }
                                case "weeks" :
                                {
                                    compareDate.setDate(compareDate.getDate() - (compareValue * 7));
                                    break;
                                }
                                case "months" :
                                {
                                    compareDate.setMonth(compareDate.getMonth() - compareValue);
                                    break;
                                }
                                case  "years" :
                                {
                                    compareDate.setFullYear(compareDate.getFullYear() - compareValue);
                                    break;
                                }
                            }
                            if (compareValue < 0) {
                                var temp = aqDate;
                                aqDate = compareDate;
                                compareDate = new Date(temp);
                            }
                            for (var i = this.orderedFeatures.length - 1; i >= 0; i--) {
                                if ((locale.format(new Date(this.orderedFeatures[i].attributes[this.imageField]), {selector: "date", datePattern: "yyyy/MM/dd"}) <= locale.format(new Date(aqDate), {selector: "date", datePattern: "yyyy/MM/dd"})) && (locale.format(new Date(this.orderedFeatures[i].attributes[this.imageField]), {selector: "date", datePattern: "yyyy/MM/dd"}) >= locale.format(compareDate, {selector: "date", datePattern: "yyyy/MM/dd"}))) {
                                    featureSelect.push(this.orderedFeatures[i]);
                                    featureIds.push(this.orderedFeatures[i].attributes[this.objectID]);
                                }
                            }
                            html.set(document.getElementById("imageRange"), this.i18n.date + ": <b>" + locale.format(compareDate, {selector: "date", formatLength: "long"}) + " - " + locale.format(new Date(aqDate), {selector: "date", formatLength: "long"}) + "</b>");
                        } else {
                            if (this.config.distinctImages) {
                                for (var c in this.orderedFeatures) {
                                    var tempValue = locale.format(new Date(this.orderedDates[this.valueSelected].value), {selector: "date", formatLength: "short"});
                                    var tempCurrentValue = locale.format(new Date(this.orderedFeatures[c].attributes[this.imageField]), {selector: "date", formatLength: "short"});
                                    if (tempValue === tempCurrentValue) {
                                        featureSelect.push(this.orderedFeatures[c]);
                                        featureIds.push(this.orderedFeatures[c].attributes[this.objectID]);
                                    }
                                }
                            } else {
                                featureSelect.push(this.orderedFeatures[this.valueSelected]);
                                featureIds.push(this.orderedFeatures[this.valueSelected].attributes[this.objectID]);
                            }
                            html.set(document.getElementById("imageRange"), this.i18n.date + ": <b>" + locale.format(new Date(aqDate), {selector: "date", formatLength: "long"}) + "</b>");
                        }
                    } else
                    {
                        if (this.config.distinctImages) {
                            for (var c in this.orderedFeatures) {
                                if (this.orderedFeatures[c].attributes[this.imageField] === this.orderedDates[this.valueSelected].value) {
                                    featureSelect.push(this.orderedFeatures[c]);
                                    featureIds.push(this.orderedFeatures[c].attributes[this.objectID]);
                                }
                            }
                        } else {
                            featureSelect.push(this.orderedFeatures[this.valueSelected]);
                            featureIds.push(this.orderedFeatures[this.valueSelected].attributes[this.objectID]);
                        }
                        html.set(document.getElementById("imageRange"), this.imageField + ": <b>" + aqDate + "</b>");
                    }
                    this.clearGraphics();
                    var count = 0;
                    for (var i = 0; i < featureSelect.length; i++) {
                        if (registry.byId("show").get("value") === "footprint") {
                            var geometry = featureSelect[i].geometry;
                            var sms = new SimpleFillSymbol(SimpleFillSymbol.STYLE_SOLID, new SimpleLineSymbol(SimpleLineSymbol.STYLE_SOLID, new Color([0, 255, 255]), 2), new Color([0, 255, 255, 0.2]));
                            var attr = featureSelect[i].attributes;
                            attr.imagePosition = "left";
                            if (this.imageFieldType === "esriFieldTypeDate")
                                attr[this.imageField] = locale.format(new Date(attr[this.imageField]), {selector: "date", formatLength: "long"});
                            var infoTemplate = new InfoTemplate("Attributes", "${*}");
                            var graphic = new Graphic(geometry, sms, attr, infoTemplate);
                            this.map.graphics.add(graphic);
                            if (count === 19) {
                                if (!this.responseAlert) {
                                    this.responseAlert = confirm(this.i18n.error7);
                                }
                                count++;
                                break;
                            }
                        }
                        count++;
                    }
                    html.set(document.getElementById("imageCount"), "" + count + " " + this.i18n.imageLabel);
                    if (registry.byId("show").get("value") === "image") {
                        var mr = new MosaicRule();
                        mr.method = MosaicRule.METHOD_LOCKRASTER;
                        mr.ascending = true;
                        mr.operation = "MT_FIRST";
                        mr.lockRasterIds = featureIds;
                        this.primaryLayer.setMosaicRule(mr);
                    } else
                        this.primaryLayer.hide();
                }
            }
        },
        sliderChangeRight: function () {
            if (registry.byId("imageSelectorRight").get("checked")) {
                if (this.valueSelectedRight || this.valueSelectedRight === 0) {
                    var aqDate = this.orderedDatesRight[this.valueSelectedRight].value;
                    this.rightLayerInfos[this.secondaryLayer.id].currentValue = this.orderedDatesRight[this.valueSelectedRight];
                    var featureSelect = [];
                    var featureIds = [];
                    if (this.imageFieldTypeRight === "esriFieldTypeDate") {
                        var compareDate = new Date(aqDate);
                        var compareValue = registry.byId("subtractValueRight").get("value");
                        if (compareValue !== 0) {
                            switch (registry.byId("subtractDateStringRight").get("value")) {
                                case "days" :
                                {
                                    compareDate.setDate(compareDate.getDate() - compareValue);
                                    break;
                                }
                                case "weeks" :
                                {
                                    compareDate.setDate(compareDate.getDate() - (compareValue * 7));
                                    break;
                                }
                                case "months" :
                                {
                                    compareDate.setMonth(compareDate.getMonth() - compareValue);
                                    break;
                                }
                                case  "years" :
                                {
                                    compareDate.setFullYear(compareDate.getFullYear() - compareValue);
                                    break;
                                }
                            }
                            if (compareValue < 0) {
                                var temp = aqDate;
                                aqDate = compareDate;
                                compareDate = new Date(temp);
                            }
                            for (var i = this.orderedFeaturesRight.length - 1; i >= 0; i--) {

                                if ((locale.format(new Date(this.orderedFeaturesRight[i].attributes[this.imageFieldRight]), {selector: "date", datePattern: "yyyy/MM/dd"}) <= locale.format(new Date(aqDate), {selector: "date", datePattern: "yyyy/MM/dd"})) && (locale.format(new Date(this.orderedFeaturesRight[i].attributes[this.imageFieldRight]), {selector: "date", datePattern: "yyyy/MM/dd"}) >= locale.format(compareDate, {selector: "date", datePattern: "yyyy/MM/dd"}))) {
                                    featureSelect.push(this.orderedFeaturesRight[i]);
                                    featureIds.push(this.orderedFeaturesRight[i].attributes[this.objectIDRight]);
                                }
                            }
                            html.set(document.getElementById("imageRangeRight"), this.i18n.date + ": <b>" + locale.format(compareDate, {selector: "date", formatLength: "long"}) + " - " + locale.format(new Date(aqDate), {selector: "date", formatLength: "long"}) + "</b>");
                        } else {
                            if (this.config.distinctImages) {
                                for (var c in this.orderedFeaturesRight) {
                                    var tempValue = locale.format(new Date(this.orderedDatesRight[this.valueSelectedRight].value), {selector: "date", formatLength: "short"});
                                    var tempCurrentValue = locale.format(new Date(this.orderedFeaturesRight[c].attributes[this.imageFieldRight]), {selector: "date", formatLength: "short"});
                                    if (tempValue === tempCurrentValue) {
                                        featureSelect.push(this.orderedFeaturesRight[c]);
                                        featureIds.push(this.orderedFeaturesRight[c].attributes[this.objectIDRight]);
                                    }
                                }
                            } else {
                                featureSelect.push(this.orderedFeaturesRight[this.valueSelectedRight]);
                                featureIds.push(this.orderedFeaturesRight[this.valueSelectedRight].attributes[this.objectIDRight]);
                            }
                            html.set(document.getElementById("imageRangeRight"), this.i18n.date + ": <b>" + locale.format(new Date(aqDate), {selector: "date", formatLength: "long"}) + "</b>");
                        }
                    } else
                    {
                        if (this.config.distinctImages) {
                            for (var c in this.orderedFeaturesRight) {
                                if (this.orderedFeaturesRight[c].attributes[this.imageFieldRight] === this.orderedDatesRight[this.valueSelectedRight].value) {
                                    featureSelect.push(this.orderedFeaturesRight[c]);
                                    featureIds.push(this.orderedFeaturesRight[c].attributes[this.objectIDRight]);
                                }
                            }
                        } else {
                            featureSelect.push(this.orderedFeaturesRight[this.valueSelectedRight]);
                            featureIds.push(this.orderedFeaturesRight[this.valueSelectedRight].attributes[this.objectIDRight]);
                        }
                        html.set(document.getElementById("imageRangeRight"), this.imageField + ": <b>" + aqDate + "</b>");
                    }
                    this.clearGraphicsRight();
                    var count = 0;
                    for (var i = 0; i < featureSelect.length; i++) {
                        if (registry.byId("showRight").get("value") === "footprint") {
                            var geometry = featureSelect[i].geometry;
                            var sms = new SimpleFillSymbol(SimpleFillSymbol.STYLE_SOLID, new SimpleLineSymbol(SimpleLineSymbol.STYLE_SOLID, new Color([0, 255, 255]), 2), new Color([0, 255, 255, 0.2]));
                            var attr = featureSelect[i].attributes;
                            attr.imagePosition = "right";
                            if (this.imageFieldTypeRight === "esriFieldTypeDate")
                                attr[this.imageFieldRight] = locale.format(new Date(attr[this.imageFieldRight]), {selector: "date", formatLength: "long"});
                            var infoTemplate = new InfoTemplate("Attributes", "${*}");
                            var graphic = new Graphic(geometry, sms, attr, infoTemplate);
                            this.map.graphics.add(graphic);
                            if (count === 19) {
                                if (!this.responseAlert) {
                                    this.responseAlert = confirm(this.i18n.error7);
                                }
                                count++;
                                break;
                            }
                        }
                        count++;
                    }
                    html.set(document.getElementById("imageCountRight"), "" + count + " " + this.i18n.imageLabel);
                    if (registry.byId("showRight").get("value") === "image") {
                        var mr = new MosaicRule();
                        mr.method = MosaicRule.METHOD_LOCKRASTER;
                        mr.ascending = true;
                        mr.operation = "MT_FIRST";
                        mr.lockRasterIds = featureIds;
                        this.secondaryLayer.setMosaicRule(mr);
                    } else
                        this.secondaryLayer.hide();
                }
            }
        },
        imageSliderRefresh: function () {
            this.imageSliderHide();
            this.imageSliderShow();
        },
        imageSliderRefreshRight: function () {
            this.imageSliderHideRight();
            this.imageSliderShowRight();
        },
        refreshSwipe: function () {
            if (this.primaryLayer || this.secondaryLayer) {
                if (this.primaryLayer && this.secondaryLayer && this.primaryLayer.id === this.secondaryLayer.id.split("_RightLayer")[0] && (JSON.stringify(this.primaryLayer.mosaicRule) === JSON.stringify(this.secondaryLayer.mosaicRule) || (!this.primaryLayer.mosaicRule && JSON.stringify(this.primaryLayer.defaultMosaicRule) === JSON.stringify(this.secondaryLayer.mosaicRule)))) {
                    document.getElementById("errorSwipeDiv").innerHTML = this.i18n.identicalLayerError;
                    if (this.layerSwipe) {
                        this.swipePosition = this.layerSwipe.domNode.children[0].offsetLeft;
                        this.layerSwipe.destroy();
                        this.layerSwipe = null;
                    }
                    this.previousLayerInfo = {primary: this.primaryLayer ? {id: this.primaryLayer.id, mosaicRule: this.primaryLayer.mosaicRule} : {id: null, mosaicRule: null}, secondary: this.secondaryLayer ? {id: this.secondaryLayer.id, mosaicRule: this.secondaryLayer.mosaicRule} : {id: null, mosaicRule: null}};
                } else {
                    document.getElementById("errorSwipeDiv").innerHTML = "";
                    if ((this.primaryLayer && (this.primaryLayer.id !== this.previousLayerInfo.primary.id || JSON.stringify(this.primaryLayer.mosaicRule) !== JSON.stringify(this.previousLayerInfo.primary.mosaicRule))) || (this.secondaryLayer && (this.secondaryLayer.id !== this.previousLayerInfo.secondary.id || JSON.stringify(this.secondaryLayer.mosaicRule) !== JSON.stringify(this.previousLayerInfo.secondary.mosaicRule))) || (!this.primaryLayer && this.previousLayerInfo.primary.id) || (!this.secondaryLayer && this.previousLayerInfo.secondary.id)) {
                        if (this.layerSwipe) {
                            this.swipePosition = this.layerSwipe.domNode.children[0].offsetLeft;
                            this.layerSwipe.destroy();
                            this.layerSwipe = null;
                        }
                        domConstruct.place("<div id='swipewidget'></div>", "mapDiv_root", "first");
                        if (!this.primaryLayer && this.secondaryLayer) {
                            var invert = true;
                            var layer = this.secondaryLayer;
                        } else {
                            var invert = false;
                            var layer = this.primaryLayer;
                        }
                        if (!this.swipePosition) {
                            if (registry.byId("leftLayer").checked)
                                this.swipePosition = this.map.width - 40;
                            else
                                this.swipePosition = document.getElementById("toolsContentContainer").clientWidth ? document.getElementById("toolsContentContainer").clientWidth + 15 : 40;
                        }
                        this.layerSwipe = new LayerSwipe({
                            type: "vertical",
                            map: this.map,
                            left: this.swipePosition,
                            invertPlacement: invert,
                            layers: [layer]
                        }, dom.byId("swipewidget"));
                        this.layerSwipe.startup();
                        this.previousLayerInfo = {primary: this.primaryLayer ? {id: this.primaryLayer.id, mosaicRule: this.primaryLayer.mosaicRule} : {id: null, mosaicRule: null}, secondary: this.secondaryLayer ? {id: this.secondaryLayer.id, mosaicRule: this.secondaryLayer.mosaicRule} : {id: null, mosaicRule: null}};
                    }
                }
            } else if (this.layerSwipe) {
                document.getElementById("errorSwipeDiv").innerHTML = "";
                this.layerSwipe.destroy();
                this.layerSwipe = null;
                this.previousLayerInfo = {primary: {id: null, mosaicRule: null}, secondary: {id: null, mosaicRule: null}};
            } else {
                document.getElementById("errorSwipeDiv").innerHTML = "";
                this.previousLayerInfo = {primary: {id: null, mosaicRule: null}, secondary: {id: null, mosaicRule: null}};
            }
        },
        moveSwipe: function (value, invertPlacement, layers) {
            this.layerSwipe.destroy();
            this.layerSwipe = null;
            domConstruct.place("<div id='swipewidget'></div>", "mapDiv_root", "first");
            this.layerSwipe = new LayerSwipe({
                type: "vertical",
                map: this.map,
                left: value,
                invertPlacement: invertPlacement,
                layers: layers
            }, dom.byId("swipewidget"));
            this.layerSwipe.startup();
        },
        clearGraphics: function () {
            if (this.primaryLayer) {
                var imagePosition = "left";
                for (var s = this.map.graphics.graphics.length - 1; s >= 0; s--) {
                    if (this.map.graphics.graphics[s].symbol && this.map.graphics.graphics[s].symbol.style === "solid" && this.map.graphics.graphics[s].symbol.outline.color.g === 255 && this.map.graphics.graphics[s].symbol.outline.color.b === 255 && this.map.graphics.graphics[s].attributes.imagePosition === imagePosition) {
                        this.map.graphics.remove(this.map.graphics.graphics[s]);
                    }
                }
            }
        },
        clearGraphicsRight: function () {
            if (this.secondaryLayer) {
                var imagePosition = "right";
                for (var s = this.map.graphics.graphics.length - 1; s >= 0; s--) {
                    if (this.map.graphics.graphics[s].symbol && this.map.graphics.graphics[s].symbol.style === "solid" && this.map.graphics.graphics[s].symbol.outline.color.g === 255 && this.map.graphics.graphics[s].symbol.outline.color.b === 255 && this.map.graphics.graphics[s].attributes.imagePosition === imagePosition) {
                        this.map.graphics.remove(this.map.graphics.graphics[s]);
                    }
                }
            }
        },
        showLoading: function () {
            domStyle.set("loadingTwoLayerViewer", "display", "block");
        },
        hideLoading: function () {
            domStyle.set("loadingTwoLayerViewer", "display", "none");
        }
    });
});