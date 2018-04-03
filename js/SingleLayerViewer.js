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
        html,
        domClass,
        dom,
        MosaicRule,
        Query, QueryTask, Extent, locale, html, domConstruct, HorizontalSlider, HorizontalRule, HorizontalRuleLabels, Graphic, SimpleLineSymbol, SimpleFillSymbol, Color, InfoTemplate, mathUtils, domStyle, ArcGISImageServiceLayer, ImageServiceParameters, ImageServiceIdentifyTask, ImageServiceIdentifyParameters, Polygon, Point, esriRequest, Tooltip) {

    return declare("application.SingleLayerViewer", [Evented], {
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
        postCreate: function () {
            domConstruct.place('<img id="loadingSingleLayerViewer" style="position: absolute;top:0;bottom: 0;left: 0;right: 0;margin:auto;z-index:100;" src="images/loading.gif">', "layerViewerNode");
            domStyle.set("loadingSingleLayerViewer", "display", "none");
            this.layerInfos = this.layers;
            window.addEventListener("resize", lang.hitch(this, this.resizeBtn));
            registry.byId("dropDownImageList").on("click", lang.hitch(this, this.imageDisplayFormat));
            registry.byId("imageSelectorDropDown").on("change", lang.hitch(this, this.sliderDropDownSelection, "dropDown"));
            registry.byId("subtractValue").on("change", lang.hitch(this, function (value) {
                this.layerInfos[this.primaryLayer.id].age = value;
                this.sliderChange();
            }));
            registry.byId("subtractDateString").on("change", lang.hitch(this, function (value) {
                this.layerInfos[this.primaryLayer.id].ageString = value;
                this.sliderChange();
            }));
            registry.byId("show").on("change", lang.hitch(this, function (value) {
                this.layerInfos[this.primaryLayer.id].type = value;
                if(value === "image"){
                if(!this.primaryLayer.visible)
                    this.primaryLayer.show();
            }else
                this.primaryLayer.hide();
                this.sliderChange();
            }));
            registry.byId("refreshImageSliderBtn").on("click", lang.hitch(this, this.imageSliderRefresh));
            registry.byId("imageSelector").on("change", lang.hitch(this, this.setFilterDiv));
            registry.byId("layerSelector").on("change", lang.hitch(this, this.selectLayer));
            this.fillLayerSelector();
            if (this.map) {
                this.map.on("extent-change", lang.hitch(this, this.mapExtentChange));
                this.map.on("update-start", lang.hitch(this, this.showLoading));
                this.map.on("update-end", lang.hitch(this, this.hideLoading));
            }
            this.setTooltips();
            if (this.config.display === "both") {

                domStyle.set("imageSelectContainer", "display", "inline-block");
            } else {
                if (this.config.display === "dropdown")
                    this.imageDisplayFormat();
                domStyle.set("imageSelectContainer", "display", "none");
            }

            this.resizeBtn();
            if (this.config.defaultLayer)
                registry.byId("layerSelector").set("value", this.config.defaultLayer);
            this.symbol = new SimpleFillSymbol();
            this.symbol.setStyle(SimpleFillSymbol.STYLE_SOLID);
            this.symbol.setOutline(new SimpleLineSymbol(SimpleLineSymbol.STYLE_SOLID, new Color([0, 255, 255]), 2));
            this.symbol.setColor(new Color([0, 255, 255, 0.2]));
                                
        },
        fillLayerSelector: function () {
            registry.byId("layerSelector").addOption({label: "Basemap", value: "none"});
            var layer;
            for (var a in this.layerInfos) {
                layer = this.map.getLayer(a);
                registry.byId("layerSelector").addOption({label: this.layerInfos[a].title, value: a});
                this.layerInfos[a].defaultMosaicRule = (layer.mosaicRule || layer.defaultMosaicRule || null);

                this.layerInfos[a].state = false;
                this.layerInfos[a].age = 0;
                this.layerInfos[a].ageString = "days";
                this.layerInfos[a].type = "image";
                this.layerInfos[a].currentValue = null;
            }
        },
        setTooltips: function () {
            this.switchDisplayTooltip = new Tooltip({
                connectId: ['dropDownImageList'],
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
        },
        resizeBtn: function () {
            var subtractValue = registry.byId("subtractValue").domNode;
            if (window.innerWidth > 1200) {
                domStyle.set(subtractValue, "width", "60px");
                domStyle.set(subtractValue, "height", "28px");
            } else if (window.innerWidth > 1000) {
                domStyle.set(subtractValue, "width", "50px");
                domStyle.set(subtractValue, "height", "25px");
            } else if (window.innerWidth > 800) {
                domStyle.set(subtractValue, "width", "40px");
                domStyle.set(subtractValue, "height", "22px");
            } else if (window.innerWidth > 600) {
                domStyle.set(subtractValue, "width", "35px");
                domStyle.set(subtractValue, "height", "19px");
            } else if (window.innerWidth > 400) {
                domStyle.set(subtractValue, "width", "30px");
                domStyle.set(subtractValue, "height", "17px");
            } else {
                domStyle.set(subtractValue, "width", "25px");
                domStyle.set(subtractValue, "height", "15px");
            }
            if (this.config.display === "both") {
                //  document.getElementById("imageSliderDiv").style.width = "85%";
            } else if (this.config.display === "slider") {
                //   document.getElementById("imageSliderDiv").style.width = "95%";
                //   document.getElementById("imageSliderDiv").style.marginBottom = "13px";
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
            if (this.map.getLevel() < this.config.zoomLevel) {
                registry.byId("imageSelector").set("checked", false);
                registry.byId("imageSelector").set("disabled", true);
                html.set(document.getElementById("errorDiv"), this.i18n.zoom);
            }
        },
        selectLayer: function (value) {
            if (this.primaryLayer)
                this.primaryLayer.hide();
            if (value === "none") {
                this.primaryLayer = null;
                domStyle.set("imageSelectCheckBox", "display", "none");
                registry.byId("imageSelector").set("checked", false);
            } else {
                this.valueSelected = null;
                this.primaryLayer = this.map.getLayer(value);
                this.primaryLayer.show();
                if (!this.layerInfos[value].imageSelector) {
                    domStyle.set("imageSelectCheckBox", "display", "none");
                    registry.byId("imageSelector").set("checked", false);
                } else {
                    domStyle.set("imageSelectCheckBox", "display", "block");
                    this.defaultMosaicRule = this.layerInfos[value].defaultMosaicRule;
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
            }
        },
        checkField: function (currentVersion)
        {
            if (currentVersion >= 10.21) {
                if (this.map.getLevel() >= this.config.zoomLevel) {
                    if (this.layerInfos[this.primaryLayer.id].imageField && this.layerInfos[this.primaryLayer.id].objectID && this.layerInfos[this.primaryLayer.id].category) {
                        this.imageField = this.layerInfos[this.primaryLayer.id].imageField;
                        for (var a in this.primaryLayer.fields) {
                            if (this.imageField === this.primaryLayer.fields[a].name) {
                                this.imageFieldType = this.primaryLayer.fields[a].type;
                                break;
                            }
                        }
                        if (this.imageFieldType === "esriFieldTypeDate")
                            domStyle.set("ageDiv", "display", "inline-block");
                        else
                            domStyle.set("ageDiv", "display", "none");
                        this.objectID = this.layerInfos[this.primaryLayer.id].objectID;
                        this.categoryField = this.layerInfos[this.primaryLayer.id].category;
                        registry.byId("imageSelector").set("disabled", false);
                        html.set(document.getElementById("errorDiv"), "");
                        this.setSavedState();

                    } else {
                        registry.byId("imageSelector").set("checked", false);
                        registry.byId("imageSelector").set("disabled", true);
                        if (!this.layerInfos[this.primaryLayer.id].imageField) {
                            html.set(document.getElementById("errorDiv"), this.i18n.error1);
                        } else if (!this.layerInfos[this.primaryLayer.id].objectID) {
                            html.set(document.getElementById("errorDiv"), this.i18n.error2);
                        } else {
                            html.set(document.getElementById("errorDiv"), this.i18n.error3);
                        }
                    }

                } else {
                    registry.byId("imageSelector").set("checked", false);
                    registry.byId("imageSelector").set("disabled", true);
                    this.setFilterDiv();
                    html.set(document.getElementById("errorDiv"), this.i18n.zoom);
                }
            } else {
                registry.byId("imageSelector").set("checked", false);
                registry.byId("imageSelector").set("disabled", true);
                html.set(document.getElementById("errorDiv"), this.i18n.error5);
            }

        },
        setSavedState: function () {
            var layerProp = this.layerInfos[this.primaryLayer.id];
            registry.byId("show").set("value", layerProp.type);
            registry.byId("subtractDateString").set("value", layerProp.ageString);
            registry.byId("subtractValue").set("value", layerProp.age);
            if (registry.byId("imageSelector").checked !== layerProp.state)
                registry.byId("imageSelector").set("checked", layerProp.state);
            else if (layerProp.state)
                this.setFilterDiv();
        },
        mapExtentChange: function (evt) {

            if (evt.lod.level >= this.config.zoomLevel) {
                if (registry.byId("imageSelector").get("disabled")) {
                    registry.byId("imageSelector").set("disabled", false);
                    html.set(document.getElementById("errorDiv"), "");
                }

                var needsUpdate = false;
                if (evt.levelChange) {
                    var zoomLevelChange = Math.abs(evt.lod.level - this.previousInfo.level);
                    if (zoomLevelChange >= this.mapZoomFactor) {
                        console.info("LARGE zoom: ", evt);
                        needsUpdate = true;
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
                }

            } else {
                registry.byId("imageSelector").set("checked", false);
                registry.byId("imageSelector").set("disabled", true);
                html.set(document.getElementById("errorDiv"), this.i18n.zoom);
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
                this.layerInfos[this.primaryLayer.id].state = true;
            } else {

                domStyle.set("selectorDiv", "display", "none");
                this.map.graphics.clear();
                if (this.primaryLayer) {
                    var mr = new MosaicRule(this.layerInfos[this.primaryLayer.id].defaultMosaicRule);
                    this.primaryLayer.setMosaicRule(mr);
                    this.layerInfos[this.primaryLayer.id].state = false;
                }
            }
        },
        imageDisplayFormat: function () {
            if (domClass.contains(registry.byId("dropDownImageList").domNode, "dropDownSelected")) {

                domClass.remove(registry.byId("dropDownImageList").domNode, "dropDownSelected");
                this.switchDisplayTooltip.set("label", this.i18n.dropDown);
                document.getElementById("switchDisplayImage").src = "images/dropdownlist.png";
            } else {
                domClass.add(registry.byId("dropDownImageList").domNode, "dropDownSelected");
                this.switchDisplayTooltip.set("label", this.i18n.slider);
                document.getElementById("switchDisplayImage").src = "images/slider.png";
            }
            this.imageDisplayFormat2();
        },
        imageDisplayFormat2: function () {
            if (!domClass.contains(registry.byId("dropDownImageList").domNode, "dropDownSelected")) {
                domStyle.set(document.getElementById("imageRange"), "display", "inline-block");
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
        onClose: function () {

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
                if (this.layerInfos[this.primaryLayer.id].defaultMosaicRule && this.layerInfos[this.primaryLayer.id].defaultMosaicRule.where)
                    var layerFilter = this.layerInfos[this.primaryLayer.id].defaultMosaicRule.where;
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

                        if (this.layerInfos[this.primaryLayer.id].currentValue) {
                            var index = null;
                            for (var i in this.orderedDates) {
                                if (this.orderedDates[i].value === this.layerInfos[this.primaryLayer.id].currentValue.value && this.orderedDates[i].id === this.layerInfos[this.primaryLayer.id].currentValue.id) {
                                    var index = i;
                                    break;
                                } else if (this.orderedDates[i].value <= this.layerInfos[this.primaryLayer.id].currentValue.value) {
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
        selectDisplayedImage: function () {
            var request = new esriRequest({
                url: this.primaryLayer.url + "/getSamples",
                content: {
                    geometry: JSON.stringify(this.map.extent.getCenter()),
                    geometryType: "esriGeometryPoint",
                    returnGeometry: false,
                    sampleCount: 1,
                    mosaicRule: this.layerInfos[this.primaryLayer.id].defaultMosaicRule ? JSON.stringify(this.layerInfos[this.primaryLayer.id].defaultMosaicRule.toJson()) : null,
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

                imageParams.mosaicRule = this.layerInfos[this.primaryLayer.id].defaultMosaicRule;
                imageParams.returnGeometry = false;
                imageTask.execute(imageParams, lang.hitch(this, function (data) {
                    var index;

                    if (data.catalogItems.features[0]) {
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
            if (!domClass.contains(registry.byId("dropDownImageList").domNode, "dropDownSelected") && value === "slider") {
                this.valueSelected = this.slider.get("value");
                registry.byId("imageSelectorDropDown").set("value", this.valueSelected);
                this.sliderChange();
            } else if (domClass.contains(registry.byId("dropDownImageList").domNode, "dropDownSelected") && value === "dropDown") {
                this.valueSelected = registry.byId("imageSelectorDropDown").get("value");
                this.slider.set("value", this.valueSelected);
                this.sliderChange();
            }
        },
        sliderChange: function () {
            if (registry.byId("imageSelector").get("checked")) {
                if (this.valueSelected || this.valueSelected === 0) {
                    var aqDate = this.orderedDates[this.valueSelected].value;
                    this.layerInfos[this.primaryLayer.id].currentValue = this.orderedDates[this.valueSelected];
                    var featureSelect = [];
                    this.featureIds = [];
                    this.featureNames = [];
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
                            for (var i = this.orderedFeatures.length - 1; i >= 0; i--) {

                                if ((locale.format(new Date(this.orderedFeatures[i].attributes[this.imageField]), {selector: "date", datePattern: "yyyy/MM/dd"}) <= locale.format(new Date(aqDate), {selector: "date", datePattern: "yyyy/MM/dd"})) && (locale.format(new Date(this.orderedFeatures[i].attributes[this.imageField]), {selector: "date", datePattern: "yyyy/MM/dd"}) >= locale.format(compareDate, {selector: "date", datePattern: "yyyy/MM/dd"}))) {
                                    featureSelect.push(this.orderedFeatures[i]);
                                    this.featureIds.push(this.orderedFeatures[i].attributes[this.objectID]);

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
                                        this.featureIds.push(this.orderedFeatures[c].attributes[this.objectID]);

                                    }

                                }
                            } else {
                                featureSelect.push(this.orderedFeatures[this.valueSelected]);
                                this.featureIds.push(this.orderedFeatures[this.valueSelected].attributes[this.objectID]);
                            }
                            html.set(document.getElementById("imageRange"), this.i18n.date + ": <b>" + locale.format(new Date(aqDate), {selector: "date", formatLength: "long"}) + "</b>");

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
                        html.set(document.getElementById("imageRange"), this.imageField + ": <b>" + aqDate + "</b>");
                    }
                    this.map.graphics.clear();
                    var count = 0;

                    
                        for (var i = 0; i < featureSelect.length; i++) {
                            if (registry.byId("show").get("value") === "footprint") {
                                var geometry = new Polygon(featureSelect[i].geometry.toJson());
                                var attr = featureSelect[i].attributes;
                                if (this.imageFieldType === "esriFieldTypeDate")
                                    attr[this.imageField] = locale.format(new Date(attr[this.imageField]), {selector: "date", formatLength: "long"});
                                
                                var infoTemplate = new InfoTemplate("Attributes", "${*}");
                                var graphic = new Graphic(geometry, this.symbol, attr, infoTemplate);
                                console.log(graphic);
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
                        mr.lockRasterIds = this.featureIds;
                        this.primaryLayer.setMosaicRule(mr);
                    } else {
                        //var mr = new MosaicRule(this.layerInfos[this.primaryLayer.id].defaultMosaicRule);
                        //this.primaryLayer.setMosaicRule(mr);
                         this.primaryLayer.hide();
                    }
                }
            }
        },
        imageSliderRefresh: function () {
            if (this.slider) {
                this.imageSliderHide();
                this.imageSliderShow();
            }
        },
        showLoading: function () {
            domStyle.set("loadingSingleLayerViewer", "display", "block");
        },
        hideLoading: function () {
            domStyle.set("loadingSingleLayerViewer", "display", "none");
        }
    });
});