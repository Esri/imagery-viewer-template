/*global define */
/*
 | Copyright 2018 Esri
 |
 | Licensed under the Apache License, Version 2.0 (the "License");
 | you may not use this file except in compliance with the License.
 | You may obtain a copy of the License at
 |
 |    http://www.apache.org/licenses/LICENSE-2.0
 |
 | Unless required by applicable law or agreed to in writing, software
 | distributed under the License is distributed on an "AS IS" BASIS,
 | WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 | See the License for the specific language governing permissions and
 | limitations under the License.
 */
define({
    root: ({
        map: {
            error: "Unable to create map",
			licenseError: {
				message: "Your account is not licensed to use Configurable Apps that are not public. Please ask your organization administrator to assign you a user type that includes Essential Apps or an add-on Essential Apps license.",
				title: "Not Licensed"
			}
        },
        nav: {
            "close": "Close"
        },
        basemap: {
          title: "Basemap Gallery"
          
        },
        operationalLayers: {
          title: "Operational Layers",
          error: "No operational layers in the map."
        },
        singleLayerViewer: {
            title: "Imagery Layer Selector",
            enable: "Search for individual images",
            tooltip: "Enable to search for specific images.",
            secondary: "Set Active as Comparison Layer.",
            dropDown: "Show images in drop down list.",
            refresh: "Refresh Button",
            refreshTooltip: "Refresh query based on current extent.",
            renderer: "Rendering",
            layer: "Layer",
            show: "Show",
            age: "Search range",
            zoom: "Zoom in to select images.",
            error: "No visible Imagery Layers in the map.",
            error1: "Field is not specified.",
            error2: "No OBJECTID field.",
            error3: "No Category field.",
            error4: "Cannot perform action for layer.",
            error5: "Services pre 10.2.1 not supported.",
            error6: "No scenes in current extent.",
            error7: "Number of footprints selected exceed 20. Only first 20 will be displayed. Press OK not to warn again.",
            error8: "Image data only available between ",
            error9: "Invalid date range: Start Date must be less than End Date.",
            slider: "Show images on slider.",
            ageOption1: "Day(s)",
            ageOption2: "Week(s)",
            ageOption3: "Month(s)",
            ageOption4: "Year(s)",
            showOption1: "Image",
            showOption2: "Footprint",
            date:"Date(s)",
            imageLabel: "image(s)",
            default: "Default"
        },
        twoLayerViewer: {
            title: "Layer Selector",
            enable: "Search for individual images",
            tooltip: "Enable to search for specific images.",
            secondary: "Set Active as Comparison Layer.",
            dropDown: "Show images in drop down list.",
            refresh: "Refresh Button",
            refreshTooltip: "Refresh query based on current extent.",
            renderer: "Rendering",
            layer: "Layer",
            show: "Show",
            age: "Search range",
            zoom: "Zoom in to select images.",
            error: "No visible Imagery Layers in the map.",
            error1: "Field is not specified.",
            error2: "No OBJECTID field.",
            error3: "No Category field.",
            error4: "Cannot perform action for layer.",
            error5: "Services pre 10.2.1 not supported.",
            error6: "No scenes in current extent.",
            error7: "Number of footprints selected exceed 20. Only first 20 will be displayed. Press OK not to warn again.",
            error8: "Image data only available between ",
            error9: "Invalid date range: Start Date must be less than End Date.",
            slider: "Show images on slider.",
            ageOption1: "Day(s)",
            ageOption2: "Week(s)",
            ageOption3: "Month(s)",
            ageOption4: "Year(s)",
            showOption1: "Image",
            showOption2: "Footprint",
            left: "Left Image",
            right: "Right Image",
            identicalLayerError: "Left and Right Image are identical.",
            date: "Date(s)",
            imageLabel: "image(s)",
            default: "Default"
        },
       
        editor: {
            title: "Editor",
            error: "No Edit Layer found.",
            error1: "Access denied. Layers cannot be edited.",
            text:"Select a symbol and click on the map."
        },
        measurement: {
            title: "Image Measurement",
            error: "Mensuration Capabilities not supported."
        },
        export: {
            title: "Export",
            mode: "Save location",
            titleText: "Title(required)",
            description: "Description",
            tags: "Tags(required)",
            preview: "Preview",
            submit: "Save",
            cancel: "Cancel",
            pixel: "Pixel Size",
            outsr: "Output Spatial Reference",
            renderer: "TIFF download options",
            formatText1: "As displayed",
            formatText2: "Raw data(all bands)",
            extent: "Draw polygon to define extent",
            drawText:"(click image to start)",
            text: "The raw data can't be displayed with standard photo viewers. Open with ArcGIS Pro.",
            error: "No visible imagery layers on the map.",
            error1: "Title is required.",
            error2: "Tag(s) is required.",
            error3: "PixelSize of export is restricted to",
            error4: "for this extent.",
            error5: "Please enter a valid numeric value.",
            error6: "Your image can't be exported at this time.",
            thumbnailError: "No thumbnail available",
            advance: "Advanced save options",
            modeOption1: "Save to portal",
            modeOption2: "Save to disk",
            default:"Default",
            utm: "WGS84 UTM Zone",
            layer: "Layer",
            mercator: "WebMercatorAS",
            folder: "Select folder"
        },
        imageDate: {
            label: "Image Date"
        },
        about: {
            title: "About"
        },
        bookmark: {
            title: "Bookmarks",
            selectBookmark: "Select bookmarks",
            default: "Default",
            add: "Add Bookmarks",
            addTitle: "Enter title",
            addBtn: "Add temporary"
        },
        coordinate: {
            _widgetLabel: "Coordinate",
    hintMessage: "Click the map to get coordinates",
    defaultLabel: "Default",
    realtimeLabel: "Move mouse to get coordinates",
    computing: "Computing...",
    latitudeLabel: "Latitude",
    longitudeLabel: "Longitude",
    loading: "loading...",
    enableClick: "Click to enable clicking map to get coordinates",
    disableClick: "Click to disable clicking map to get coordinates",

    Default: "Default",
    Inches: "Inches",
    Foot: "Feet",
    Foot_US: "Feet_US",
    Yards: "Yards",
    Miles: "Miles",
    Nautical_Miles: "Nautical miles",
    Millimeters: "Millimeters",
    Centimeters: "Centimeters",
    Meter: "Meters",
    Kilometers: "Kilometers",
    Decimeters: "Decimeters",
    Decimal_Degrees: "Degrees",
    Degree_Minutes_Seconds: "Degrees minutes seconds",
    MGRS: "MGRS",
    USNG: "USNG"
        }
        
    }),
    "ar": 1,
	"bs": 1,
	"ca": 1,
	"cs": 1,
	"da": 1,
	"de": 1,
	"el": 1,
	"es": 1,
	"et": 1,
	"fi": 1,
	"fr": 1,
	"he": 1,
	"hr": 1,
	"hu": 1,
	"id": 1,
	"it": 1,
	"ja": 1,
	"ko": 1,
	"lt": 1,
	"lv": 1,
	"nl": 1,
	"nb": 1,
	"pl": 1,
	"pt-br": 1,
	"pt-pt": 1,
	"ro": 1,
	"ru": 1,
	"sl": 1,
	"sr": 1,
	"sv": 1,
	"th": 1,
	"tr": 1,
	"uk": 1,
	"vi": 1,
	"zh-cn": 1,
	"zh-hk": 1,
	"zh-tw": 1
});
