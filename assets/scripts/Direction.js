const direction = require('Global')
cc.Class({
    extends: cc.Component,

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        const _this = this
        this.node.on('touchstart', function(event) {
            _this.node.name === "arrow_left" ? direction.accLeft = true : direction.accRight = true
        })
        this.node.on('touchend', function(event) {
                direction.accRight = false
                direction.accLeft = false
        })
    },

    start () {

    },

    // update (dt) {},
});
