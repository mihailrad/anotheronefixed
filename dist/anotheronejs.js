/*!
 * anotheronefixed.js 0.0.3
 * Fix elements. What else do you need?
 *
 *
 **/

;(function($, window) {

    var fixedBlock;
    var options;
    var $win = $(window);
    var $fixedBlock = this;
    var defaults = {
        // Blocks
        parentElem: '.fix-this-block__parent',
        topBorder: '.fix-this-block__header',
        bottomBorder: '.fix-this-block__footer',

        // Styles Default
        defaultPosition: 'static',

        // Styles Fixed
        fixedTop: 0
    };

    var optionsElementsSet = function(options) {
        console.log(defaults);
        options = $.extend(options, defaults);

        optionsElements = [
            'parentElem',
            'topBorder',
            'bottomBorder',
        ];

        $.each(optionsElements, function(index, value) {
          options[value] = $(options[value]);
        });

        return options;
    }

    var getElemDistanceToTop = function(elem) {
        var scrollTop = $(window).scrollTop(),
        elementOffset = elem.offset().top,
        distance = (elementOffset - scrollTop);
        return distance;
    }

    var getElementBottomDistanceToTop = function(elem) {
        return getElemDistanceToTop(elem) + elem.outerHeight(true);
    }

    var getElemDistanceToRight = function(elem) {
        position = elem.position();
        return $win.width() - position.left - elem.outerWidth(true);
    }

    var isWindowOnBlock = function(elem) {
        return getElemDistanceToTop(elem) < 0 ? true : false
    }

    var isWindowOnBottomBlock = function (elem) {
        return getElementBottomDistanceToTop(elem) < 0 ? true : false
    }

    var isElemFixed = function(elem) {
        return elem.data('fixed');
    }

    var unfixBlock = function(options) {
        console.log(options.defaultPosition);
        console.log(fixedBlock);
        fixedBlock.css({
            position: options.defaultPosition
        }).data({
            'fixed': false
        });
    }

    var fixBlockToTop = function(options) {
        fixedBlock.css({
            position: 'fixed',
            top: options.fixedTop,
            right: getElemDistanceToRight(options['parentElem'])
        }).data({
            'fixed': true
        });
    }

    $.fn.anotherOneFixed = function(options) {
        options = optionsElementsSet(options);
        fixedBlock = this;
        console.log(options.topBorder);
        console.log(options.bottomBorder);

        $win.on('scroll', function() {
            if(isWindowOnBlock(fixedBlock) || isElemFixed(fixedBlock)) {
                if(!isWindowOnBottomBlock(options.topBorder)) {
                    unfixBlock(options);
                    return;
                }
                fixBlockToTop(options);
            }
        });
    };

}(jQuery, this));