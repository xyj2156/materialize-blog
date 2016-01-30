var oldActive = $(".collapsible-header.active");
var processDiv = '<div class="white"><div class="preloader-wrapper small active" id="progressDiv" style="left: 45%"> <div class="spinner-layer spinner-blue"> <div class="circle-clipper left"> <div class="circle"></div> </div><div class="gap-patch"> <div class="circle"></div> </div><div class="circle-clipper right"> <div class="circle"></div> </div> </div> <div class="spinner-layer spinner-red"> <div class="circle-clipper left"> <div class="circle"></div> </div><div class="gap-patch"> <div class="circle"></div> </div><div class="circle-clipper right"> <div class="circle"></div> </div> </div> <div class="spinner-layer spinner-yellow"> <div class="circle-clipper left"> <div class="circle"></div> </div><div class="gap-patch"> <div class="circle"></div> </div><div class="circle-clipper right"> <div class="circle"></div> </div> </div> <div class="spinner-layer spinner-green"> <div class="circle-clipper left"> <div class="circle"></div> </div><div class="gap-patch"> <div class="circle"></div> </div><div class="circle-clipper right"> <div class="circle"></div> </div> </div> </div></div>';

$(function () {
    var showPostList = function (listParent) {
        var time = 0;
        $(listParent).find('a').velocity(
            {translateX: "-100px"},
            {duration: 0});
        $(listParent).find('a').each(function () {
            $(this).velocity(
                {opacity: "1", translateX: "0"},
                {duration: 800, delay: time, easing: [60, 10]});
            time += 120;
        });
    };

    var hidePostList = function(listParent) {
        $(listParent).find('a').css('opacity', 0);
    };


    var clickToShow = function(old, target){

        if (old.length > 0) {
            if (target.css('display') == 'block') {
                old.removeClass('active').stop(true, false).fadeOut(400, hidePostList(target.find('ul')));
            } else {
                old.removeClass('active').stop(true, false).fadeOut(400, function () {
                    hidePostList(target.find('ul'));
                    target.addClass('active').fadeIn(0, showPostList(target.find('ul')));
                });
            }
        } else {
            target.addClass('active').fadeIn(0, showPostList(target.find('ul')));
        }
    };

    $(document).click(function (e) {

        var active = $(".collapsible-header.active");

        if (oldActive.attr("id") != active.attr("id")) {
            if (oldActive.length > 0) {
                oldActive.children(".summary").removeClass("slideup").stop(true, false).slideDown();
            }
            oldActive = active;
        }

        var activeLi = active.parent();
        var activeLiPosition = activeLi.position();

        // When an article is active, slide up it's summary.
        if (active.length > 0) {
            var articleOpened = true;
            var summary = active.children(".summary");

            // Once click at the range out of active article, remove active.
            if (e.pageY < activeLiPosition.top ||
                e.pageY > activeLiPosition.top + activeLi.height() ||
                e.pageX < activeLiPosition.left ||
                e.pageX > activeLiPosition.left + activeLi.width()) {

                active.removeClass("active").parent().removeClass("active").children('.collapsible-body').stop(true, false).slideUp(
                    {
                        duration: 350,
                        easing: "easeOutQuart",
                        queue: false,
                        complete: function () {
                            $(this).css('height', '');
                        }
                    });
                summary.removeClass("slideup").stop(true, false).slideDown();
                articleOpened = false;
            }

            if (articleOpened) {
                if (!summary.hasClass("slideup")) {
                    summary.addClass("slideup");
                    summary.stop(true, false).slideUp();
                }
            }
        }
    });

    // Add pageY attribute on collapsible header used to scroll up at the correct position
    $('.collapsible-header').each(function () {
        $(this).attr('pageY', $(this).offset().top);
    });

    // Scroll up
    $(document).on('click', '.collapsible-header', function () {
        var pageY = $('#' + $(this).attr('id')).attr('pageY');
        var pxToTop = pageY < 200 ? 0 : pageY - 100;
        $('html, body').animate({
            scrollTop: pxToTop
        }, 100);
    });


    // tag-chip click event
    $(document).on('click', '.tag-chip', function () {
        var old = $('.post-list.active');
        var clickedTag = $(this);
        var target = $('#' + clickedTag.html());

        clickToShow(old, target);
    });



    // date-month click event
    $(document).on('click', '.date-month', function () {
        var old = $('.post-list.active');
        var clickedMonth = $(this);
        var target = $('#' + clickedMonth.attr('target-list'));

        clickToShow(old, target);
    });
});


$(function () {
    runPreview = function () {
        var replyContent = $("#reply_content");
        var oldContent = replyContent.val();
        console.log(oldContent);

        if (oldContent) {
            marked(oldContent, function (err, content) {
                $('#preview-box').html(content);
            });
        }
    };

    $("#reply_content").on("keyup", function () {
        runPreview();
    });

    $("#reply_content").focus(function (event) {
        $("#preview-box").css("display", 'block');
    });


});