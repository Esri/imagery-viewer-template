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
    "dojo/html", "dojo/Deferred",
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
        html, Deferred,
        domClass,
        dom,
        MosaicRule,
        Query, QueryTask, Extent, locale, html, LayerSwipe, domConstruct, HorizontalSlider, HorizontalRule, HorizontalRuleLabels, Graphic, SimpleLineSymbol, SimpleFillSymbol, Color, InfoTemplate, mathUtils, domStyle, ArcGISImageServiceLayer, ImageServiceParameters, ImageServiceIdentifyTask, ImageServiceIdentifyParameters, Polygon, Point, esriRequest, Tooltip) {

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
        sliderDomNodes: {left: {slider: null, rules: null, labels: null}, right: {slider: null, rules: null, labels: null}},
        sliderValues: {left: [], right: []},
        records: {left: [], right: []},
        swipePosition: null,
        postCreate: function () {
            domConstruct.place('<img id="loadingTwoLayerViewer" style="position: absolute;top:0;bottom: 0;left: 0;right: 0;margin:auto;z-index:100;" src="images/loading.gif">', "layerViewerNode");
            domStyle.set("loadingTwoLayerViewer", "display", "none");
            this.layerInfos = this.layers;
            window.addEventListener("resize", lang.hitch(this, this.resizeBtn));
            registry.byId("dropDownImageList").on("click", lang.hitch(this, this.imageDisplayFormat));
            registry.byId("dropDownImageListRight").on("click", lang.hitch(this, this.imageDisplayFormat));
            registry.byId("imageSelectorDropDown").on("change", lang.hitch(this, this.sliderDropDownSelection, "dropDown"));
            registry.byId("imageSelectorDropDownRight").on("change", lang.hitch(this, this.sliderDropDownSelection, "dropDown"));
            registry.byId("subtractValue").on("change", lang.hitch(this, function (value) {
                this.leftLayerInfos[this.activeLayer.id].age = value;
                this.sliderChange();
            }));
            registry.byId("subtractValueRight").on("change", lang.hitch(this, function (value) {
                this.rightLayerInfos[this.activeLayer.id].age = value;
                this.sliderChange();
            }));
            registry.byId("subtractDateString").on("change", lang.hitch(this, function (value) {
                this.leftLayerInfos[this.activeLayer.id].ageString = value;
                this.sliderChange();
            }));
            registry.byId("subtractDateStringRight").on("change", lang.hitch(this, function (value) {
                this.rightLayerInfos[this.activeLayer.id].ageString = value;
                this.sliderChange();
            }));
            registry.byId("show").on("change", lang.hitch(this, function (value) {
                this.leftLayerInfos[this.activeLayer.id].type = value;
                if (value === "image") {
                    if (!this.activeLayer.visible)
                        this.activeLayer.show();
                } else
                    this.activeLayer.hide();
                this.valueSelected = this.nodeList.imageSelectorDropDown.get("value");
                this.sliderChange();
            }));
            registry.byId("showRight").on("change", lang.hitch(this, function (value) {
                this.rightLayerInfos[this.activeLayer.id].type = value;
                if (value === "image") {
                    if (!this.activeLayer.visible)
                        this.activeLayer.show();
                } else
                    this.activeLayer.hide();
                this.valueSelected = this.nodeList.imageSelectorDropDown.get("value");
                this.sliderChange();
            }));
            registry.byId("imageSelector").on("change", lang.hitch(this, this.setFilterDiv));
            registry.byId("imageSelectorRight").on("change", lang.hitch(this, this.setFilterDiv));
            registry.byId("leftLayerSelector").on("change", lang.hitch(this, this.selectLeftLayer));
            registry.byId("rightLayerSelector").on("change", lang.hitch(this, this.selectRightLayer));
            registry.byId("refreshImageSliderBtn").on("click", lang.hitch(this, this.imageSliderRefresh));
            registry.byId("refreshImageSliderBtnRight").on("click", lang.hitch(this, this.imageSliderRefresh));
            registry.byId("leftLayer").on("click", lang.hitch(this, function () {
                if (this.layerSwipe) {
                    this.moveSwipe(this.map.width - 40, this.layerSwipe.invertPlacement, this.layerSwipe.layers);
                }
                this.setLayerProp("left");
            }));
            registry.byId("rightLayer").on("click", lang.hitch(this, function () {
                if (this.layerSwipe) {
                    this.moveSwipe(40, this.layerSwipe.invertPlacement, this.layerSwipe.layers);
                }
                this.setLayerProp("right");
            }));
            this.fillLayerSelector();

            if (this.map) {


                this.map.on("extent-change", lang.hitch(this, this.mapExtentChange));
                this.map.on("update-start", lang.hitch(this, this.showLoading));
                this.map.on("update-end", lang.hitch(this, this.hideLoading));
                this.addLayerHandler = this.map.on("layer-add", lang.hitch(this, function () {

                    this.currentLayerProp = this.rightLayerInfos[registry.byId("rightLayerSelector").get("value") + "_RightLayer"];
                    this.activeLayer = this.secondaryLayer;
                    this.checkLayerProp();
                      if (this.config.defaultLayer) {
                     this.setCurrentNodes("left");
                     registry.byId("leftLayerSelector").set("value", this.config.defaultLayer);
                     this.config.defaultLayer = null;
                     }
                }));
            }
            this.setTooltips();
            this.resizeBtn();
            if (this.config.display === "both") {

                domStyle.set("imageSelectContainer", "display", "inline-block");
                domStyle.set("imageSelectContainerRight", "display", "inline-block");
            } else {
                if (this.config.display === "dropdown")
                    this.imageDisplayFormat();
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
                this.setCurrentNodes("Right");
                registry.byId("rightLayerSelector").set("value", this.config.comparisonLayer);
            } else if (this.config.defaultLayer) {
                this.setCurrentNodes("left");
                registry.byId("leftLayerSelector").set("value", this.config.defaultLayer);
                this.config.defaultLayer = null;
            } else
                this.setCurrentNodes("left");
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
                connectId: ['dropDownImageList', "dropDownImageListRight"],
                position: ['below'],
                label: this.i18n.dropDown
            });
            new Tooltip({
                connectId: ["imageSelector"],
                position: ['below'],
                label: this.i18n.tooltip
            });
            new Tooltip({
                connectId: ["refreshImageSliderBtn"],
                position: ['after', 'below'],
                label: this.i18n.refreshTooltip
            });
            new Tooltip({
                connectId: ["imageSelectorRight"],
                position: ['below'],
                label: this.i18n.tooltip
            });
            new Tooltip({
                connectId: ["refreshImageSliderBtnRight"],
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
            /*  if (this.config.display === "both") {
             document.getElementById("imageSliderDiv").style.width = "85%";
             document.getElementById("imageSliderDivRight").style.width = "85%";
             } else if (this.config.display === "slider") {
             document.getElementById("imageSliderDiv").style.width = "95%";
             document.getElementById("imageSliderDiv").style.marginBottom = "13px";
             document.getElementById("imageSliderDivRight").style.width = "95%";
             document.getElementById("imageSliderDivRight").style.marginBottom = "13px";
             }*/
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

                    this.currentLayerProp = this.rightLayerInfos[registry.byId("rightLayerSelector").get("value") + "_RightLayer"];
                    this.activeLayer = this.secondaryLayer;
                    this.checkLayerProp();
                }));
            }
            this.refreshHandler = this.map.on("update-end", lang.hitch(this, this.refreshSwipe));

            this.refreshSwipe();
            if (this.map.getLevel() < this.config.zoomLevel) {
                this.turnOffSelector();
            }
        },
        setLayerProp: function (value) {
            if (value === "left") {
                this.setCurrentNodes("left");
                domStyle.set("rightLayerDiv", "display", "none");
                domStyle.set("leftLayerDiv", "display", "block");
                this.currentLayerProp = registry.byId("leftLayerSelector").get("value") !== "none" ? this.leftLayerInfos[registry.byId("leftLayerSelector").get("value")] : null;
                this.activeLayer = this.primaryLayer;
                this.orderedDates = this.sliderValues.left;
                this.orderedFeatures = this.records.left;
            } else {
                this.setCurrentNodes("Right");
                domStyle.set("leftLayerDiv", "display", "none");
                domStyle.set("rightLayerDiv", "display", "block");
                this.currentLayerProp = registry.byId("rightLayerSelector").get("value") !== "none" ? this.rightLayerInfos[registry.byId("rightLayerSelector").get("value") + "_RightLayer"] : null;
                this.activeLayer = this.secondaryLayer;
                this.orderedDates = this.sliderValues.right;
                this.orderedFeatures = this.records.right;
            }
        },
        setCurrentNodes: function (value) {
            this.slider = this.sliderDomNodes[value.toLowerCase()].slider;
            this.sliderRules = this.sliderDomNodes[value.toLowerCase()].rules;
            this.sliderLabels = this.sliderDomNodes[value.toLowerCase()].labels;
            if (value === "left")
                value = "";
            this.nodeList = {
                imageSelector: registry.byId("imageSelector" + value),
                imageSelectCheckBox: "imageSelectCheckBox" + value,
                imageSelectorDropDown: registry.byId("imageSelectorDropDown" + value),
                show: registry.byId("show" + value),
                subtractValue: registry.byId("subtractValue" + value),
                subtractDateString: registry.byId("subtractDateString" + value),
                selectorDiv: "selectorDiv" + value,
                imageRange: "imageRange" + value,
                imageCount: "imageCount" + value,
                dropDownImageList: registry.byId("dropDownImageList" + value).domNode,
                switchDisplayImage: "switchDisplayImage" + value,
                dropDownOption: "dropDownOption" + value,
                ageDiv: "ageDiv" + value,
                imageSliderDiv: "imageSliderDiv" + value,
                errorDiv: "errorDiv" + value

            };
        },
        selectLeftLayer: function (value) {

            if (this.primaryLayer)
                this.primaryLayer.hide();

            if (value === "none") {
                this.clearGraphics();
                this.primaryLayer = null;
                this.activeLayer = null;
                domStyle.set(this.nodeList.imageSelectCheckBox, "display", "none");
                this.nodeList.imageSelector.set("checked", false);
                this.refreshSwipe();
            } else {
                this.valueSelected = null;

                this.primaryLayer = this.map.getLayer(value);
                this.primaryLayer.show();
                this.currentLayerProp = this.leftLayerInfos[value];
                this.activeLayer = this.primaryLayer;
                this.checkLayerProp();
            }
        },
        selectRightLayer: function (value) {
            if (this.secondaryLayer) {
                this.secondaryLayer.suspend();
                this.map.removeLayer(this.secondaryLayer);
            }
            if (value === "none") {
                this.clearGraphics();
                this.secondaryLayer = null;
                this.activeLayer = null;
                domStyle.set(this.nodeList.imageSelectCheckBox, "display", "none");
                this.nodeList.imageSelector.set("checked", false);
                this.refreshSwipe();
            } else {

                this.valueSelected = null;
                var layer = this.map.getLayer(value);
                var params = new ImageServiceParameters();

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
        checkLayerProp: function () {
            if (!this.currentLayerProp.imageSelector) {
                domStyle.set(this.nodeList.imageSelectCheckBox, "display", "none");
                this.nodeList.imageSelector.set("checked", false);
            } else {
                domStyle.set(this.nodeList.imageSelectCheckBox, "display", "block");
                this.defaultMosaicRule = this.currentLayerProp.defaultMosaicRule;
                if (this.activeLayer.currentVersion)
                {
                    var currentVersion = this.activeLayer.currentVersion;
                    this.checkField(currentVersion);
                } else {

                    var layersRequest = esriRequest({
                        url: this.activeLayer.url,
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
                        for (var a in this.activeLayer.fields) {
                            if (this.imageField === this.activeLayer.fields[a].name) {
                                this.imageFieldType = this.activeLayer.fields[a].type;
                                break;
                            }
                        }
                        if (this.imageFieldType === "esriFieldTypeDate")
                            domStyle.set(this.nodeList.ageDiv, "display", "inline-block");
                        else
                            domStyle.set(this.nodeList.ageDiv, "display", "none");
                        this.objectID = this.currentLayerProp.objectID;
                        this.categoryField = this.currentLayerProp.category;
                        this.nodeList.imageSelector.set("disabled", false);
                        html.set(document.getElementById(this.nodeList.errorDiv), "");
                        this.setSavedState();
                    } else {
                        this.nodeList.imageSelector.set("checked", false);
                        this.nodeList.imageSelector.set("disabled", true);
                        if (!this.currentLayerProp.imageField) {
                            html.set(document.getElementById(this.nodeList.errorDiv), this.i18n.error1);
                        } else if (!this.currentLayerProp.objectID) {
                            html.set(document.getElementById(this.nodeList.errorDiv), this.i18n.error2);
                        } else {
                            html.set(document.getElementById(this.nodeList.errorDiv), this.i18n.error3);
                        }
                    }
                } else {
                    this.turnOffSelector();

                }
            } else {
                this.nodeList.imageSelector.set("checked", false);
                this.nodeList.imageSelector.set("disabled", true);
                html.set(document.getElementById(this.nodeList.errorDiv), this.i18n.error5);
            }
        },
        turnOffSelector: function () {

            if (!registry.byId("leftLayer").checked)
                this.setLayerProp("left");
            if (registry.byId("imageSelector").checked)
                registry.byId("imageSelector").set("checked", false);
            else
                this.setFilterDiv();
            registry.byId("imageSelector").set("disabled", true);
            html.set(document.getElementById("errorDiv"), this.i18n.zoom);
            setTimeout(lang.hitch(this, function () {
                this.setLayerProp("right");
                if (registry.byId("imageSelectorRight").checked)
                    registry.byId("imageSelectorRight").set("checked", false);
                else
                    this.setFilterDiv();
                registry.byId("imageSelectorRight").set("disabled", true);
                html.set(document.getElementById("errorDivRight"), this.i18n.zoom);
                setTimeout(lang.hitch(this, function () {
                    if (registry.byId("leftLayer").checked)
                        this.setLayerProp("left");
                }), 500);

            }), 1500);

        },
        setSavedState: function () {
            this.nodeList.show.set("value", this.currentLayerProp.type);
            this.nodeList.subtractDateString.set("value", this.currentLayerProp.ageString);
            this.nodeList.subtractValue.set("value", this.currentLayerProp.age);
            if (this.nodeList.imageSelector.checked !== this.currentLayerProp.state)
                this.nodeList.imageSelector.set("checked", this.currentLayerProp.state);
            else if (this.currentLayerProp.state)
                this.setFilterDiv();


        },
        mapExtentChange: function (evt) {
            if (evt.lod.level >= this.config.zoomLevel) {
                if (registry.byId("imageSelector").get("disabled")) {
                    registry.byId("imageSelector").set("disabled", false);
                    html.set(document.getElementById("errorDiv"), "");
                }
                setTimeout(lang.hitch(this, function () {
                    if (registry.byId("imageSelectorRight").get("disabled")) {
                        registry.byId("imageSelectorRight").set("disabled", false);
                        html.set(document.getElementById("errorDivRight"), "");
                    }
                }), 1500);
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
                    if (this.refreshDeferred && !this.refreshDeferred.isResolved())
                        this.refreshDeferred.reject("newupdate");
                    this.refreshDeferred = new Deferred();
                    if (registry.byId("leftLayer").checked) {
                        var activeImage = {value: "left", layerInfo: registry.byId("leftLayerSelector").get("value") !== "none" ? this.leftLayerInfos[registry.byId("leftLayerSelector").get("value")] : null};
                        var nonactiveImage = {value: "Right", layerInfo: registry.byId("rightLayerSelector").get("value") !== "none" ? this.rightLayerInfos[registry.byId("rightLayerSelector").get("value") + "_RightLayer"] : null};

                    } else {
                        var activeImage = {value: "Right", layerInfo: registry.byId("rightLayerSelector").get("value") !== "none" ? this.rightLayerInfos[registry.byId("rightLayerSelector").get("value") + "_RightLayer"] : null};
                        var nonactiveImage = {value: "left", layerInfo: registry.byId("leftLayerSelector").get("value") !== "none" ? this.leftLayerInfos[registry.byId("leftLayerSelector").get("value")] : null};
                    }

                    if (nonactiveImage.layerInfo && nonactiveImage.layerInfo.state) {
                        this.setCurrentNodes(nonactiveImage.value);
                        this.currentLayerProp = nonactiveImage.layerInfo;
                        this.activeLayer = nonactiveImage.value === "left" ? this.primaryLayer : this.secondaryLayer;
                        this.imageField = this.currentLayerProp.imageField;
                        for (var a in this.activeLayer.fields) {
                            if (this.imageField === this.activeLayer.fields[a].name) {
                                this.imageFieldType = this.activeLayer.fields[a].type;
                                break;
                            }
                        }
                        this.imageSliderRefresh().then(lang.hitch(this, function () {
                            this.currentLayerProp = activeImage.layerInfo;
                            this.activeLayer = activeImage.value === "left" ? this.primaryLayer : this.secondaryLayer;
                            this.imageField = this.currentLayerProp.imageField;
                            for (var a in this.activeLayer.fields) {
                                if (this.imageField === this.activeLayer.fields[a].name) {
                                    this.imageFieldType = this.activeLayer.fields[a].type;
                                    break;
                                }
                            }
                            this.setCurrentNodes(activeImage.value);
                            if (activeImage.layerInfo && activeImage.layerInfo.state)
                                this.imageSliderRefresh();
                            this.refreshDeferred.resolve(true);
                        }));
                    } else {
                        this.imageSliderRefresh();
                        this.refreshDeferred.resolve(true);
                    }
                }
            } else {
                this.turnOffSelector();
            }

            this.previousExtentChangeLevel = evt.lod.level;
        },
        setFilterDiv: function () {
            if (this.nodeList.imageSelector.get("checked")) {

                if (!this.slider) {
                    this.imageSliderShow();
                } else {
                    this.imageSliderRefresh();
                }
                domStyle.set(this.nodeList.selectorDiv, "display", "block");

                if (this.nodeList.selectorDiv === "selectorDiv")
                    this.leftLayerInfos[this.activeLayer.id].state = true;
                else
                    this.rightLayerInfos[this.activeLayer.id].state = true;
            } else {

                domStyle.set(this.nodeList.selectorDiv, "display", "none");
                this.clearGraphics();


                if (this.activeLayer) {
                    var mr = new MosaicRule(this.currentLayerProp.defaultMosaicRule);
                    this.activeLayer.setMosaicRule(mr);
                    if (this.nodeList.selectorDiv === "selectorDiv") {
                        this.leftLayerInfos[this.activeLayer.id].state = false;
                    } else {
                        var id = this.activeLayer.id;
                        this.rightLayerInfos[id].state = false;
                    }
                }

            }
        },
        imageDisplayFormat: function () {
            if (domClass.contains(this.nodeList.dropDownImageList, "dropDownSelected")) {

                domClass.remove(this.nodeList.dropDownImageList, "dropDownSelected");
                this.switchDisplayTooltip.set("label", this.i18n.dropDown);
                document.getElementById(this.nodeList.switchDisplayImage).src = "images/dropdownlist.png";
            } else {
                domClass.add(this.nodeList.dropDownImageList, "dropDownSelected");
                this.switchDisplayTooltip.set("label", this.i18n.slider);
                document.getElementById(this.nodeList.switchDisplayImage).src = "images/slider.png";
            }
            this.imageDisplayFormat2();
        },
        imageDisplayFormat2: function () {
            if (!domClass.contains(this.nodeList.dropDownImageList, "dropDownSelected")) {
                domStyle.set(document.getElementById(this.nodeList.imageRange), "display", "inline-block");
                domStyle.set(this.nodeList.dropDownOption, "display", "none");
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
                domStyle.set(this.nodeList.dropDownOption, "display", "inline-block");
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
            if (this.activeLayer && this.nodeList.imageSelector.get("checked")) {
                if (this.activeLayer.id.indexOf("_RightLayer") === -1)
                    registry.byId("rightLayer").set('disabled', true);
                else
                    registry.byId("leftLayer").set('disabled', true);
                domStyle.set(this.nodeList.selectorDiv, "display", "block");
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
                var queryTask = new QueryTask(this.activeLayer.url);
                queryTask.execute(query, lang.hitch(this, function (result) {
                    this.previousInfo = {
                        extent: this.map.extent,
                        level: this.map.getLevel()
                    };

                    this.orderedFeatures = result.features;

                    if (this.orderedFeatures.length > 0) {
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
                        if (this.activeLayer.id.indexOf("_RightLayer") === -1) {
                            this.sliderValues["left"] = this.orderedDates;
                            this.records["left"] = this.orderedFeatures;
                        } else {
                            this.sliderValues["right"] = this.orderedDates;
                            this.records["right"] = this.orderedFeatures;

                        }
                        this.featureLength = this.orderedDates.length;
                        this.imageSliderHide();
                        var sliderNode = domConstruct.create("div", {}, this.nodeList.imageSliderDiv, "first");

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
                        if (this.activeLayer.id.indexOf("_RightLayer") === -1) {
                            this.sliderDomNodes.left = {slider: this.slider, rules: this.sliderRules, labels: this.sliderLabels};
                        } else
                            this.sliderDomNodes.right = {slider: this.slider, rules: this.sliderRules, labels: this.sliderLabels};
                        this.imageDisplayFormat2();
                        this.main.resizeTemplate();

                        this.nodeList.imageSelectorDropDown.removeOption(this.nodeList.imageSelectorDropDown.getOptions());

                        for (var v = this.orderedDates.length - 1; v >= 0; v--) {
                            this.nodeList.imageSelectorDropDown.addOption({label: (this.imageFieldType === "esriFieldTypeDate" ? locale.format(new Date(this.orderedDates[v].value), {selector: "date", formatLength: "long"}) : this.orderedDates[v].value.toString()), value: "" + v + ""});
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
                        html.set(document.getElementById(this.nodeList.errorDiv), this.i18n.error6);
                        domStyle.set(this.nodeList.selectorDiv, "display", "none");
                        html.set(document.getElementById(this.nodeList.imageRange), "");
                        html.set(document.getElementById(this.nodeList.imageCount), "");
                        this.hideLoading();
                    }
                }));

            }
        },
        setSliderValue: function (index) {
            this.imageDisplayFormat2();
            this.nodeList.imageSelectorDropDown.set("value", index);
            this.slider.set("value", index);
            if (this.imageFieldType === "esriFieldTypeDate")
                html.set(document.getElementById(this.nodeList.imageRange), this.i18n.date + ": <b>" + locale.format(new Date(this.orderedDates[index].value), {selector: "date", formatLength: "long"}) + "</b>");
            else
                html.set(document.getElementById(this.nodeList.imageRange), this.imageField + ": <b>" + this.orderedDates[index].value + "</b>");
            html.set(document.getElementById(this.nodeList.imageCount), "1 " + this.i18n.imageLabel);
            this.hideLoading();
        },
        selectDisplayedImage: function () {
            var request = new esriRequest({
                url: this.activeLayer.url + "/getSamples",
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


                var imageTask = new ImageServiceIdentifyTask(this.activeLayer.url);
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
        sliderDropDownSelection: function (value) {
            if (!domClass.contains(this.nodeList.dropDownImageList, "dropDownSelected") && value === "slider") {
                this.valueSelected = this.slider.get("value");
                this.nodeList.imageSelectorDropDown.set("value", this.valueSelected);
                this.sliderChange();
            } else if (domClass.contains(this.nodeList.dropDownImageList, "dropDownSelected") && value === "dropDown") {
                this.valueSelected = this.nodeList.imageSelectorDropDown.get("value");
                this.slider.set("value", this.valueSelected);
                this.sliderChange();
            }
        },
        sliderChange: function () {
            if (this.nodeList.imageSelector.get("checked")) {
                if (this.valueSelected || this.valueSelected === 0) {
                    var aqDate = this.orderedDates[this.valueSelected].value;
                    if (this.activeLayer.id.indexOf("_RightLayer") === -1) {//(registry.byId("leftLayer").checked)
                        this.leftLayerInfos[this.activeLayer.id].currentValue = this.orderedDates[this.valueSelected];

                    } else {
                        this.rightLayerInfos[this.activeLayer.id].currentValue = this.orderedDates[this.valueSelected];

                    }
                    var featureSelect = [];
                    this.featureIds = [];
                    if (this.imageFieldType === "esriFieldTypeDate") {

                        var compareDate = new Date(aqDate);
                        var compareValue = this.nodeList.subtractValue.get("value");
                        if (compareValue !== 0) {
                            switch (this.nodeList.subtractDateString.get("value")) {
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
                            for (var i = this.orderedFeatures.length - 1; i >= 0; i--) {

                                if ((locale.format(new Date(this.orderedFeatures[i].attributes[this.imageField]), {selector: "date", datePattern: "yyyy/MM/dd"}) <= locale.format(new Date(aqDate), {selector: "date", datePattern: "yyyy/MM/dd"})) && (locale.format(new Date(this.orderedFeatures[i].attributes[this.imageField]), {selector: "date", datePattern: "yyyy/MM/dd"}) >= locale.format(compareDate, {selector: "date", datePattern: "yyyy/MM/dd"}))) {
                                    featureSelect.push(this.orderedFeatures[i]);
                                    this.featureIds.push(this.orderedFeatures[i].attributes[this.objectID]);

                                }
                            }

                            html.set(document.getElementById(this.nodeList.imageRange), this.i18n.date + ": <b>" + locale.format(compareDate, {selector: "date", formatLength: "long"}) + " - " + locale.format(new Date(aqDate), {selector: "date", formatLength: "long"}) + "</b>");
                        } else {
                            if (this.config.distinctImages) {
                                for (var c in this.orderedFeatures) {

                                    var tempValue = locale.format(new Date(this.orderedDates[this.valueSelected].value), {selector: "date", formatLength: "short"});
                                    var tempCurrentValue = locale.format(new Date(this.orderedFeatures[c].attributes[this.imageField]), {selector: "date", formatLength: "short"});

                                    if (tempValue === tempCurrentValue) {
                                        featureSelect.push(this.orderedFeatures[c]);
                                        this.featureIds.push(this.orderedFeatures[c].attributes[this.objectID]);

                                    }

                                }
                            } else {
                                featureSelect.push(this.orderedFeatures[this.valueSelected]);
                                this.featureIds.push(this.orderedFeatures[this.valueSelected].attributes[this.objectID]);
                            }
                            html.set(document.getElementById(this.nodeList.imageRange), this.i18n.date + ": <b>" + locale.format(new Date(aqDate), {selector: "date", formatLength: "long"}) + "</b>");

                        }
                    } else
                    {

                        if (this.config.distinctImages) {
                            for (var c in this.orderedFeatures) {
                                if (this.orderedFeatures[c].attributes[this.imageField] === this.orderedDates[this.valueSelected].value) {
                                    featureSelect.push(this.orderedFeatures[c]);
                                    this.featureIds.push(this.orderedFeatures[c].attributes[this.objectID]);

                                }
                            }
                        } else {
                            featureSelect.push(this.orderedFeatures[this.valueSelected]);
                            this.featureIds.push(this.orderedFeatures[this.valueSelected].attributes[this.objectID]);
                        }
                        html.set(document.getElementById(this.nodeList.imageRange), this.imageField + ": <b>" + aqDate + "</b>");
                    }
                    this.clearGraphics();
                    var count = 0;

                    //  if (this.activeLayer.visible) {
                    for (var i = 0; i < featureSelect.length; i++) {
                        if (this.nodeList.show.get("value") === "footprint") {
                            var geometry = featureSelect[i].geometry;
                            var sms = new SimpleFillSymbol(SimpleFillSymbol.STYLE_SOLID, new SimpleLineSymbol(SimpleLineSymbol.STYLE_SOLID, new Color([0, 255, 255]), 2), new Color([0, 255, 255, 0.2]));
                            var attr = featureSelect[i].attributes;
                            attr.imagePosition = this.activeLayer.id.indexOf("_RightLayer") === -1 ? "left" : "right";
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
                    //  }

                    html.set(document.getElementById(this.nodeList.imageCount), "" + count + " " + this.i18n.imageLabel);

                    if (this.nodeList.show.get("value") === "image") {
                        var mr = new MosaicRule();
                        mr.method = MosaicRule.METHOD_LOCKRASTER;
                        mr.ascending = true;
                        mr.operation = "MT_FIRST";
                        mr.lockRasterIds = this.featureIds;
                        this.activeLayer.setMosaicRule(mr);

                    } else {

                        /*var mr = new MosaicRule(this.currentLayerProp.defaultMosaicRule);
                         
                         this.activeLayer.setMosaicRule(mr);*/
                        this.activeLayer.hide();

                    }
                    if (this.dfd)
                        this.dfd.resolve(true);
                    registry.byId("rightLayer").set('disabled', false);
                    registry.byId("leftLayer").set('disabled', false);
                }
            }
        },
        imageSliderRefresh: function () {
            this.dfd = new Deferred();
            if (this.slider) {
                this.imageSliderHide();
                this.imageSliderShow();
            }
            return  this.dfd.promise;
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
                                this.swipePosition = 40;
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
            if (this.activeLayer) {
                var imagePosition = this.activeLayer.id.indexOf("_RightLayer") === -1 ? "left" : "right";
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