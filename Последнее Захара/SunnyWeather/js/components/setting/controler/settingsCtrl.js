define(['components/setting/view/settingsView','utils/settingSlider'], function (view) {
    var $sliderDays = $("#weather-for-days"),
        $sliderUpdate = $("#update-time");
    view.resizer();
    /**
     * Settings sliders initiating
     */
    $sliderDays.find(".slider-box").settingsSlider("days",{
        min: 1,
        max: 7,
        step: 1,
        indicator: $sliderDays.find(".value")
    });
    $sliderUpdate.find(".slider-box").settingsSlider("min",{
        min: 1,
        max: 60,
        step: 1,
        indicator: $sliderUpdate.find(".value")
    });
    return {};
});