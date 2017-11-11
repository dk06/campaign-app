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
});