define(['jquery',
        'hammer',
        'jqueryUi',
        'jqueryUiTouch',
        'lodash',
        'moment',
        'moment_tz'
], function ($, Hammer, UI, UITouch ,lodash, moment, moment_tz) {
    return {
        '$':$,
        'Hammer':Hammer,
        'UI':UI,
        'UITouch':UITouch,
        '_':lodash,
        'm':moment,
        'mTz':moment_tz
    };
});