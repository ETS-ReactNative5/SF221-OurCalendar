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
            }
        },
        Oswald: {
            400: {
                normal: "Oswald-Regular"
            },
            700: {
                normal: "Oswald-Bold"
            }
        },
        ChakraPetch: {
            400: {
                normal: "ChakraPetch-Regular"
            },
            700: {
                normal: "ChakraPetch-Bold"
            }
        },
        Inconsolata: {
            400: {
                normal: "Inconsolata-Regular"
            },
            700: {
                normal: "Inconsolata-Bold"
            }
        },
        KaiseiOpti: {
            400: {
                normal: "KaiseiOpti-Regular"
            },
            700: {
                normal: "KaiseiOpti-Bold"
            }
        },
        Mali: {
            400: {
                normal: "Mali-Regular"
            },
            700: {
                normal: "Mali-Bold"
            }
        },
        NotoSansJP: {
            400: {
                normal: "NotoSansJP-Regular"
            },
            700: {
                normal: "NotoSansJP-Bold"
            }
        },
        NunitoSans: {
            400: {
                normal: "NunitoSans-Regular"
            },
            700: {
                normal: "NunitoSans-Bold"
            }
        },
        ZenOldMincho: {
            400: {
                normal: "ZenOldMincho-Regular"
            },
            700: {
                normal: "ZenOldMincho-Bold"
            }
        },
        ConcertOne: {
            400: {
                normal: "ConcertOne-Regular"
            },
        },
        Lobster: {
            400: {
                normal: "Lobster-Regular"
            },
        },
        PatrickHand: {
            400: {
                normal: "PatrickHand-Regular"
            },
        },
    },

    fonts: {
        raleway: "Raleway",
        oswald: "Oswald",
        chakraPetch: "ChakraPetch",
        inconsolata: "Inconsolata",
        kaiseiOpti: "KaiseiOpti",
        mali: "Mali",
        notoSansJP: "NotoSansJP",
        nunitoSans: "NunitoSans",
        zenOldMincho: "ZenOldMincho",
        concertOne: "ConcertOne",
        lobster: "Lobster",
        patrickHand: "PatrickHand",
    },

    components: {
        Text: {
            baseStyle: {
                fontFamily: "raleway",
            },
        },
        Input: {
            baseStyle: {
                fontFamily: "raleway",
            },
        },
    },
});

export default Fonts;
