$(document).ready(function(){
	$('ul.campaign-objective-options li').click(function(){
        if ($(this).hasClass('active') === false) {
            $('ul.campaign-objective-options li').removeClass('active');
            $(this).addClass('active');
            var material = $(this).find('.material-icons').text();
            $('.campaign-details').find('.material-icons').html(material);
            
            var campaignName = $(this).find('span').text();
            $('.campaign-details').find('.selected-campaign').html(campaignName);
            $('.campaign-details').slideDown();
        } else {
            $('ul.campaign-objective-options li').addClass('active');
            $('ul.campaign-objective-options li').removeClass('active');
            $('.campaign-details').slideUp();
        }
    });

    $('td.segment-name').click(function() {
        $(this).toggleClass('active');
        $(this).prev().find('.check-active-icon').toggleClass('active');
    })

    $('.audience-available').click(function () {
        $(this).toggleClass('active');
        $(this).find('.section-icon').toggleClass('deactive');
        $(this).find('.check-active-icon').toggleClass('active');
    })

    $('.check-label').click(function () {
        $(this).parent().find('.check-label').removeClass('selected');
        $(this).addClass('selected');
    })

    $('.create-campaign-btn').click(function () {
        $('.campaign-section').removeClass('content-active');
        $('.set-objective-block').removeClass('active');
        $('.set-objective-block').addClass('done');
        $('.select-audience-block').addClass('active');
        $('.audience-section').addClass('content-active');
    })

    $('.select-audience-btn').click(function () {
        $('.audience-section').removeClass('content-active');
        $('.select-audience-block').removeClass('active');
        $('.select-audience-block').addClass('done');
        $('.configure-channels-block').addClass('active');
        $('.configure-channels-section').addClass('content-active');
    })

    $('.continue-marketing-channel-btn').click(function () {
        $('.configure-channels-section').removeClass('content-active');
        $('.configure-channels-block').removeClass('active');
        $('.configure-channels-block').addClass('done');
        $('.activate-campaign-block').addClass('active');
        $('.activate-campaign-section').addClass('content-active');
    })

    $('.continue-review-btn').click(function () {
        $('.activate-campaign-section').removeClass('content-active');
        $('.activate-campaign-block').removeClass('active');
        $('.activate-campaign-block').addClass('done');
        $('.activated-campaign-section').addClass('content-active');
    })

    $('.new-campaign-btn').click(function () {
        $('.activated-campaign-section').removeClass('content-active');

        $('.set-objective-block').addClass('active');

        $('.select-audience-block').removeClass('active');
        $('.select-audience-block').removeClass('done');
        

        $('.configure-channels-block').removeClass('active');
        $('.configure-channels-block').removeClass('done');

        $('.activate-campaign-block').removeClass('active');
        $('.activate-campaign-block').removeClass('done');

        $('.campaign-section').addClass('content-active');
    })

    $('.create-audience-btn').click(function () {
        $('.audience-section').removeClass('content-active');
        $('.create-audience-section').addClass('content-active');
    })

    $('.continue-audience-group-btn').click(function () {
        $('.database-marketplace-options').addClass('content-showcase');
        $('.set-audience-parameters').addClass('content-active');
    })

    $('.continue-targetting-btn').click(function () {
        $('.create-audience-section').addClass('content-showcase');
        $('.create-audience-section').removeClass('content-active');
        $('.audience-section').addClass('content-active');
    })
});