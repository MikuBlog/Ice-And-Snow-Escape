"use strict";
cc._RF.push(module, 'dd701+oE81Ewbfa5F4dcwWP', 'Direction');
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