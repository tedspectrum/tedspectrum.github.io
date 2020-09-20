var Core = (function () {
    function Core() {
    }
    Core.addEruda = function () {
        var initEruda = function () {
            eruda.init();
        };
        if (document.getElementById('eruda-script') === null) {
            var el = document.createElement('script');
            if (el !== null && document.body) {
                el.id = 'eruda-script';
                el.src = '//cdn.jsdelivr.net/npm/eruda';
                el.onload = initEruda;
                document.body.appendChild(el);
            }
        }
        else {
            initEruda();
        }
    };
    Core.addFullScreen = function (id) {
        var el = document.getElementById(id);
        if (el !== null && document.fullscreenEnabled && document.fullscreenElement === null) {
            el.requestFullscreen();
        }
    };
    Core.addStyle = function (id, content) {
        if (document.getElementById(id) === null) {
            var el = document.createElement('style');
            if (el !== null && document.head) {
                el.id = id;
                el.innerHTML = content;
                document.head.appendChild(el);
            }
        }
    };
    Core.removeElementById = function (id) {
        var el = document.getElementById(id);
        if (el !== null && el.parentNode !== null) {
            el.parentNode.removeChild(el);
        }
    };
    Core.removeEruda = function () {
        Core.removeElementById('eruda-script');
        if (eruda) {
            eruda.destroy();
        }
    };
    Core.removeStyle = function (id) {
        Core.removeElementById(id);
    };
    Core.removeFullScreen = function () {
        if (document.fullscreenEnabled && document.fullscreenElement) {
            document.exitFullscreen();
        }
    };
    return Core;
}());
export { Core };
