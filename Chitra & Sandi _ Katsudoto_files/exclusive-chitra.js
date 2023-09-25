var rsvp_data = null;
var rsvpAllContents = null;

// RSVP Request
var rsvp_request = function(e) {
    e.preventDefault();

    var me = this;
    var req = $(me).attr('data-rsvp-request');
    var meText = $(me).html();
    var bodytemplate = $('body').attr('data-template');
    var data = new FormData();

    var sendRequest = false;    

    // Update Status
    if (req == 'update_status') {

        // confirm going button 
        if ($(me).hasClass("rsvp-chitra__confirm-btn") && $(me).hasClass("going")){
            if (rsvpAllContents.amount && rsvpAllContents.amount != '') {
                $('.rsvp-chitra__step-content-wrap').html(rsvpAllContents.amount);
                $('.rsvp-chitra__step-btn[data-step]').removeClass('active enabled');
    
                $('.rsvp-chitra__step-btn[data-step="2"]').addClass('active');
                return rsvp_step_handler();
            }
        }

        var status = $(me).attr('data-status');
        data.append('rsvp_status', status);
        sendRequest = true;
    }

    // Update Amount
    if (req == 'update_amount') {
        var amount = $( $(me).attr('data-amount') ).val();
        data.append('rsvp_amount', amount);
        sendRequest = true;
    }

    // Is Send Request
    if (sendRequest) {
        data.append('post', 'rsvp_request');
        data.append('request', req);
        data.append('template', bodytemplate);

        var onSuccess = function(res) {
            
            var template = res.template ? res.template : '';
            var contentType = res.rsvp_content_type ? res.rsvp_content_type : '';

            // RSVP Content
            if (res.rsvp_content && res.rsvp_content != '' && template != '') {
                $('.rsvp-chitra__step-content-wrap').html(res.rsvp_content);
                $('.rsvp-chitra__step-btn[data-step]').removeClass('active enabled');

                // URLify
                $('.rsvp-chitra__step-content-wrap').find('p').each(function(i, el) {
                    if (typeof urlify === 'function') el.innerHTML = urlify(el.innerHTML);
                });

                if (contentType == 'rsvp_form') $('.rsvp-chitra__step-btn[data-step="1"]').addClass('active');
                if (contentType == 'rsvp_amount') $('.rsvp-chitra__step-btn[data-step="2"]').addClass('active');
                if (contentType == 'rsvp_message') {
                    $('.rsvp-chitra__step-btn[data-step="3"]').addClass('active');
                    $('.rsvp-chitra__step-btn[data-step="1"]').addClass('enabled');
                }

                rsvp_step_handler();
            }

            afterSend();
        }

        var onError = function(res=null) { afterSend(); }   

        var afterSend = function() {
            $('[data-rsvp-request]').prop('disabled', false);
            $(me).html( meText );
        }

        var beforeSend = function() {
            $('[data-rsvp-request]').prop('disabled', true);
            $(me).html( meText + " <i class='fas fa-spinner fa-spin'></i>" );
        }

        postData(data, onSuccess, onError, beforeSend);
    }

}

$(document).on('click', '[data-rsvp-request]', rsvp_request);



// Gallery Slider
var init_gallery__slider = function() {

    var galleryWrap = $('.gallery-chitra__slider-wrap');

    if (galleryWrap.length) {

        var sliderForOptions = {
                            slidesToShow: 1,
                            slidesToScroll: 1,
                            fade: true,
                            arrows: false,
                            adaptiveHeight: true,
                            variableWidth: true,
                            infinite: true,
                            useTransform: true,
                            speed: 300,
                            cssEase: 'cubic-bezier(0.77, 0, 0.18, 1)',
                            accessibility: false,
                            draggable: false,
                            swipe: false,
                            touchMove: false
                        }

        var sliderNavOptions = {
                            slidesToShow: 1,
                            slidesToScroll: 1,
                            dots: false,
                            variableWidth: true,
                            focusOnSelect: false,
                            infinite: false,
                            speed: 300,
                            arrows: false,
                            touchThreshold: 10000,
                            swipeToSlide: true
                        }

                        
        // Sliders
        var sliderForWrap = $('.gallery-chitra__slider-for');
        var sliderNavWrap = $('.gallery-chitra__slider-nav');

        $(sliderForWrap)
            .on('init', function(event, slick) {
                var width = $(this).find('.img-wrap').width();
                var height = width + (width / 3);

                $('.gallery-chitra__slider-for').css('height', height + 'px');
            })
            .slick(sliderForOptions);

        $(sliderNavWrap)
            .on('init', function(event, slick) {
                $('.gallery-chitra__slider-nav .slick-slide.slick-current').addClass('is-active');
            })
            .slick(sliderNavOptions);
        
        $(sliderForWrap).on('afterChange', function(event, slick, currentSlide) {
            // $(sliderNavWrap).slick('slickGoTo', currentSlide);
            var currrentNavSlideElem = '.gallery-chitra__slider-nav .slick-slide[data-slick-index="' + currentSlide + '"]';
            $('.gallery-chitra__slider-nav .slick-slide.is-active').removeClass('is-active');
            $(currrentNavSlideElem).addClass('is-active');
        });
        
        $(sliderNavWrap).on('click', '.slick-slide', function(event) {
            event.preventDefault();
            var goToSingleSlide = $(this).data('slick-index');
        
            $(sliderForWrap).slick('slickGoTo', goToSingleSlide);
        });

    }

}    


// Love Story
var init_love_story = function() {

    var galleryWrap = $('.story-chitra__slider-wrap');

    if (galleryWrap.length) {

        var sliderForOptions = {
                            slidesToShow: 1,
                            slidesToScroll: 1,
                            fade: true,
                            arrows: true,
                            adaptiveHeight: true,
                            infinite: false,
                            useTransform: true,
                            speed: 300,
                            cssEase: 'cubic-bezier(0.77, 0, 0.18, 1)',
                            prevArrow: '.story-chitra__arrow-btn.prev',
                            nextArrow: '.story-chitra__arrow-btn.next'
                        }
                        
        // Sliders
        var sliderForWrap = $('.story-chitra__slider-for');

        $(sliderForWrap)
            .on('init', function(event, slick) {                
                $('.story-chitra__slider-nav__item__manual').eq(0).addClass('is-active');            

                var width = $(this).find('.story-chitra__slider-for__item').width();
                var height = width + (width / 3);

                $('.story-chitra__slider-for__item').css('height', height + 'px');
            })
            .slick(sliderForOptions);
        
        $(sliderForWrap).on('afterChange', function(event, slick, currentSlide) {
            var manualNav = $('.story-chitra__slider-nav__item__manual');
            for (var i = 0; i < manualNav.length; i++) {                
                var slickIndex = $(manualNav[i]).attr('data-slick-index');            
                if (slickIndex <= currentSlide) $(manualNav[i]).addClass('is-active')
                if (slickIndex > currentSlide) $(manualNav[i]).removeClass('is-active')
            }        
        });    

    }

}



// Get RSVP Data
var getRSVP_data = {
    post: 'rsvp_request',
    request: 'get_rsvp',
    content: ''
}

// Get RSVP
var get_rsvp = function() {
    // Data
    var data = new FormData();
    data.append('post', getRSVP_data.post);
    data.append('request', getRSVP_data.request);
    data.append('content', getRSVP_data.content);
    data.append('template', $('body').attr('data-template'));
    
    var changeRSVPText = $('#changeRSVP').html();

    var onSuccess = function(res) {

        var contentType = res.rsvp_content_type ? res.rsvp_content_type : '';

        rsvpAllContents = typeof res.rsvp_all_contents !== 'undefined' ? res.rsvp_all_contents : '';
        rsvp_data = typeof res.rsvp_data !== 'undefined' ? res.rsvp_data : '';

        if (res.rsvp_content && res.rsvp_content != '') {
            $('.rsvp-chitra__step-content-wrap').html(res.rsvp_content);
            $('.rsvp-chitra__step-btn[data-step]').removeClass('active enabled');
            
            // URLify
            $('.rsvp-chitra__step-content-wrap').find('p').each(function(i, el) {
                if (typeof urlify === 'function') el.innerHTML = urlify(el.innerHTML);
            });

            if (contentType == 'rsvp_form') $('.rsvp-chitra__step-btn[data-step="1"]').addClass('active');
            if (contentType == 'rsvp_amount') $('.rsvp-chitra__step-btn[data-step="2"]').addClass('active');
            if (contentType == 'rsvp_message') {
                $('.rsvp-chitra__step-btn[data-step="3"]').addClass('active');
                $('.rsvp-chitra__step-btn[data-step="1"]').addClass('enabled');
            }

            rsvp_step_handler();
        }

        $('#changeRSVP').html(changeRSVPText).prop('disabled', false);            
    }

    var onError = function(res=null) {
        $('#changeRSVP').html(changeRSVPText).prop('disabled', false);
    }

    var beforeSend = function() {
        $('#changeRSVP').html(changeRSVPText + " <i class='fas fa-spinner fa-spin'></i>").prop('disabled', true);
    }

    postData(data, onSuccess, onError, beforeSend);
}


// RSVP Step Handler
var rsvp_step_handler = function() {
    var btn = $('.rsvp-chitra__step-btn.active');

    if ($(btn).length) {
        var parent = $('.rsvp-chitra__step-btn-wrap');
        var pos = $(btn).offset();
        var parentPos = $(parent).offset();

        var width = $(btn).innerWidth();
        var height = $(btn).innerHeight();

        var top = pos.top - parentPos.top;
        var left = pos.left - parentPos.left;

        $('.rsvp-chitra__step-btn-focus')
            .css('top', top)
            .css('left', left)
            .css('width', width)
            .css('height', height);
    }
}


// Change RSVP Status
var change_rsvp_status = function (e) {
    e.preventDefault();
    if (!$(this).hasClass('active')) {
        getRSVP_data.content = 'rsvp_form';
        get_rsvp();
    }
}

$(document).on('click', '.rsvp-chitra__step-btn[data-step="1"].enabled', change_rsvp_status);


// Change RSVP
var change_rsvp = function(e) {
    e.preventDefault();

    getRSVP_data.content = 'rsvp_form';
    get_rsvp();
}

$(document).on('click', '#changeRSVP', change_rsvp);


// $(document)
//     .on('keyup', 'textarea.guest-comment', function(e){
//         if (this.value != '') {
//             $('.chitra-comment-box-wrap').addClass('focus');
//             this.style.height = (50 + this.scrollHeight) + 'px';
//         }
//     })
//     .on('focus', 'textarea.guest-comment', function(e){
//         e.preventDefault();
//         $('.chitra-comment-box-wrap').addClass('focus');
//         this.style.height = (50 + this.scrollHeight) + 'px';
//     })
//     .on('focusout', 'textarea.guest-comment', function(e){
//         e.preventDefault();
//         if ($(this).val() == '') {
//             $('.chitra-comment-box-wrap').removeClass('focus');
//             this.style.height = this.scrollHeight + 'px';
//         }
//     });


// Ready
$(document).ready(function(){

    get_rsvp();

    init_love_story();

    init_gallery__slider();

});