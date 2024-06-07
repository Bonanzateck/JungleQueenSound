if (window.performance) {
    if (performance.navigation.type == 1) {
        localStorage.setItem("isReload", true);
    } else {
        localStorage.setItem("isReload", false);
    }
}

WebFont.load({
    custom: {
        families: ['MYP Regular', 'MYP Bold'], // specify your font family name
        urls: ['./fonts/MYRIADPRO-BOLD.woff'] // specify the path to your font CSS file
    },
});
