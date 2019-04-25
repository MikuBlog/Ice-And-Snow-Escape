(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/scripts/Direction.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, 'dd701+oE81Ewbfa5F4dcwWP', 'Direction', __filename);
// scripts/Direction.js

'use strict';

var direction = require('Global');
cc.Class({
    extends: cc.Component,

    // LIFE-CYCLE CALLBACKS:

    onLoad: function onLoad() {
        var _this = this;
        this.node.on('touchstart', function (event) {
            _this.node.name === "arrow_left" ? direction.accLeft = true : direction.accRight = true;
        });
        this.node.on('touchend', function (event) {
            direction.accRight = false;
            direction.accLeft = false;
        });
    },
    start: function start() {}
}

// update (dt) {},
);

cc._RF.pop();
        }
        if (CC_EDITOR) {
            __define(__module.exports, __require, __module);
        }
        else {
            cc.registerModuleFunc(__filename, function () {
                __define(__module.exports, __require, __module);
            });
        }
        })();
        //# sourceMappingURL=Direction.js.map
        