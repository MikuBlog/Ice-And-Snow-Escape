"use strict";
cc._RF.push(module, '398f39hLvFGtoKnLfKF4/k2', 'Start');
// scripts/Start.js

'use strict';

cc.Class({
    extends: cc.Component,

    properties: {},

    // LIFE-CYCLE CALLBACKS:

    onLoad: function onLoad() {
        var _this = this;
        this.node.on('touchstart', function () {
            cc.director.loadScene('game');
            _this.node.destroy();
        });
    },
    start: function start() {}
}

// update (dt) {},
);

cc._RF.pop();