app.factory('loaderEvent', function(){
    var dataFactory = {};

    dataFactory.loaderActivate= function(){            
        var current_effect = 'win8_linear';
        run_waitMe($('.containerBlock > div'), 1, current_effect);
        function run_waitMe(el, num, effect){
            text = '';
            fontSize = '';
            switch (num) {
                case 1:
                maxSize = '';
                textPos = 'vertical';
                break;
                case 2:
                text = '';
                maxSize = 30;
                textPos = 'vertical';
                break;
                case 3:
                maxSize = 30;
                textPos = 'horizontal';
                fontSize = '18px';
                break;
            }
            console.log(effect)
            el.waitMe({
                effect: effect,
                text: text,
                bg: 'rgba(255,255,255,0.7)',
                color: '#000',
                maxSize: maxSize,
                source: 'img.svg',
                textPos: textPos,
                fontSize: fontSize,
                onClose: function() {}
            });
        }
    };

    dataFactory.loaderDeactivate= function(){            
        $('.containerBlock > div').waitMe('hide');
    };
        
    return dataFactory;
  })