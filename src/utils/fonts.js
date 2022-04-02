import {extendTheme} from "native-base";
import React from "react";

const Fonts = extendTheme({
    fontConfig: {
        Raleway: {
            400: {
                normal: "Raleway-Regular"
            },
            700: {
                normal: "Raleway-Bold"
            },
        },
        Oswald: {
            400: {
                normal: "Oswald-Regular"
            },
            700: {
                normal: "Oswald-Bold"
            },
        },
    },

    fonts: {
        font_a: "Raleway",
        font_b: "Oswald",
    },

    components: {
        Text: {
            baseStyle: {
                fontFamily: "font_a",
            },
        },
        Input: {
            baseStyle: {
                fontFamily: "font_a",
            },
        },
    },
});

export default Fonts;
