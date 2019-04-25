cc.Class({
    extends: cc.Component,

    properties: {
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        const _this = this
        this.node.on('touchstart', function() {
            cc.director.loadScene('game')
            _this.node.destroy()
        })
    },

    start () {

    },

    // update (dt) {},
});
