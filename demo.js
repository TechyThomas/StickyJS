var asd = jQuery.noConflict();

asd(document).ready(function($) {
    $(".box").sticky({
        mode: "triggerStart"
    });
});