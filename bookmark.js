javascript: (function () {
    var lpRepeatLoadJQ = function () {
        var script = document.createElement("SCRIPT");
        script.src = 'https://ajax.googleapis.com/ajax/libs/jquery/1.7.1/jquery.min.js';
        script.type = 'text/javascript';
        document.getElementsByTagName("head")[0].appendChild(script);
        var checkReady = function (callback) {
            if (window.jQuery) {
                callback(jQuery);
            } else {
                window.setTimeout(function () {
                    checkReady(callback);
                }, 100);
            }
        };
        checkReady(function ($) {
            $('#eow-title').append('<button id="lpRepeatAMinus" class="yt-uix-button yt-uix-button-text">A -</button>');
            $('#eow-title').append('<button id="lpRepeatAPlus" class="yt-uix-button yt-uix-button-text">A +</button>');
            $('#lpRepeatAMinus').click(function () {
                window.lpRepeatATime -= 0.5;
            });
            $('#lpRepeatAPlus').click(function () {
                window.lpRepeatATime += 0.5;
            });
        });
    };
    var lpRepeatFunction = function () {
        var player = yt.player.getPlayerByElement(document.getElementById('player-api'));
        var txt = document.getElementById('masthead-search-term');
        if (!('lpRepeatStatus' in window)) {
            lpRepeatLoadJQ();
        }
        if (window.lpRepeatStatus == 2) /* clean timer */ {
            clearInterval(window.lpRepeatTimerId);
            txt.value = 'repeat %E7%B5%90%E6%9D%9F';
            window.lpRepeatStatus = 0;
        } else if (window.lpRepeatStatus == 1) {
            window.leRepeatBTime = player.getCurrentTime();
            window.lpRepeatStatus = 2;
            window.lpRepeatTimerId = setInterval(window.checkerTimer, 500);
            txt.value = '%E8%A8%AD%E5%AE%9A repeat B %E6%99%82%E9%96%93%E9%BB%9E; repeat start';
            player.seekTo(window.lpRepeatATime);
        } else /* init */ {
            window.lpRepeatATime = player.getCurrentTime() - 0.5;
            txt.value = '%E8%A8%AD%E5%AE%9A repeat A %E6%99%82%E9%96%93%E9%BB%9E';
            window.lpRepeatStatus = 1;
        }
        window.checkerTimer = function () {
            console.log('called');
            player = yt.player.getPlayerByElement(document.getElementById('player-api'));
            if (player.getCurrentTime() >= window.leRepeatBTime) {
                player.seekTo(window.lpRepeatATime);
            }
        };
    };
    lpRepeatFunction();
})();