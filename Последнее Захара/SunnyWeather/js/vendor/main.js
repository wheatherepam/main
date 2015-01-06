define("vendor" , ['vendor/core','utils/util'], function (core, utils) {
    return {
        '$': core.$,
        '_':core._,
        'Hammer': core.Hammer,
        'UI': core.UI,
        'UITouch': core.UITouch,
        'm':core.m,
        'mTz':core.mTz,
        'utils': utils
    };
});