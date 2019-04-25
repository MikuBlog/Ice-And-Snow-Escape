(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/scripts/Player.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, '1e9f8y+7jlIk7Wn5/j3cJ2v', 'Player', __filename);
// scripts/Player.js

'use strict';

var direction = require('Global');

cc.Class({
    extends: cc.Component,

    properties: {
        jumpHeight: 0,
        jumpDuration: 0,
        maxMoveSpeed: 0,
        accel: 0,
        jumpAudio: {
            default: null,
            type: cc.AudioClip
        }
    },
    // LIFE-CYCLE CALLBACKS:
    sayName: function sayName() {
        console.log("牛B");
    },
    onLoad: function onLoad() {
        var _this = this;
        // 开启碰撞检测
        cc.director.getCollisionManager().enabled = true;
        // 初始化跳跃动作
        this.jumpAction = this.setJumpAction();
        // 加速度方向开关
        this.xSpeed = 0;
        // 初始化键盘输入监听
        cc.systemEvent.on(cc.SystemEvent.EventType.KEY_DOWN, this.onKeyDown, this);
        cc.systemEvent.on(cc.SystemEvent.EventType.KEY_UP, this.onKeyUp, this);
        this.jump.on('touchstart', function () {
            _this.node.y <= -158 && _this.node.runAction(_this.jumpAction);
        });
    },
    onDestroy: function onDestroy() {
        cc.systemEvent.off(cc.SystemEvent.EventType.KEY_DOWN, this.onKeyDown, this);
        cc.systemEvent.off(cc.SystemEvent.EventType.KEY_UP, this.onKeyUp, this);
    },
    onKeyDown: function onKeyDown(event) {
        switch (event.keyCode) {
            case cc.macro.KEY.a:
            case cc.macro.KEY.left:
                direction.accLeft = true;
                break;
            case cc.macro.KEY.d:
            case cc.macro.KEY.right:
                direction.accRight = true;
                break;
            case cc.macro.KEY.w:
            case cc.macro.KEY.up:
                this.node.y <= -158 && this.node.runAction(this.jumpAction);
                break;
        }
    },
    onKeyUp: function onKeyUp(event) {
        switch (event.keyCode) {
            case cc.macro.KEY.a:
            case cc.macro.KEY.left:
                direction.accLeft = false;
                break;
            case cc.macro.KEY.d:
            case cc.macro.KEY.right:
                direction.accRight = false;
                break;
        }
    },
    update: function update(dt) {
        // 根据当前加速度方向美珍更新速度
        if (direction.accLeft) {
            direction.xSpeed -= this.accel * dt;
        } else if (direction.accRight) {
            direction.xSpeed += this.accel * dt;
        }
        // 限制主角的速度不能超过最大值
        if (Math.abs(direction.xSpeed) > direction.maxMoveSpeed) {
            direction.xSpeed = this.maxMoveSpeed * direction.xSpeed / Math.abs(direction.xSpeed);
        }
        // 根据当前速度更新主角的位置
        this.node.x += direction.xSpeed * dt;
        this.changePic();
    },
    setJumpAction: function setJumpAction() {
        // 跳跃上升
        var jumpUp = cc.moveBy(this.jumpDuration, cc.v2(0, this.jumpHeight)).easing(cc.easeCubicActionOut());
        // 下落
        var jumpDown = cc.moveBy(this.jumpDuration, cc.v2(0, -this.jumpHeight)).easing(cc.easeCubicActionIn());
        // 添加一个回调函数，用于在动作结束时调用我们定义的其他方法
        var callback = cc.callFunc(this.playJumpSound, this);
        // 不断重复，而且每次完成落地动作后调用回调来播放声音
        return cc.sequence(jumpUp, jumpDown, callback);
    },
    playJumpSound: function playJumpSound() {
        // 调用声音引擎播放声音
        cc.audioEngine.playEffect(this.jumpAudio, false);
    },

    // 碰撞检测
    onCollisionEnter: function onCollisionEnter(other, self) {
        // console.log('on collision enter');
        if (direction.xSpeed > 100 || direction.xSpeed < -100) direction.xSpeed = -direction.xSpeed / 2;else this.node.x > 0 ? direction.xSpeed = -100 : direction.xSpeed = 100;
        // 碰撞系统会计算出碰撞组件在世界坐标系下的相关的值，并放到 world 这个属性里面
        var world = self.world;
        // 碰撞组件的 aabb 碰撞框
        var aabb = world.aabb;
        // 节点碰撞前上一帧 aabb 碰撞框的位置
        var preAabb = world.preAabb;
        // 碰撞框的世界矩阵
        var t = world.transform;
        // 以下属性为圆形碰撞组件特有属性
        var r = world.radius;
        var p = world.position;
        // 以下属性为 矩形 和 多边形 碰撞组件特有属性
        var ps = world.points;
    },
    changePic: function changePic() {
        var _this = this;
        // 获取当前节点的cc.Sprite
        if (direction.xSpeed < 0 && this.node.y < -158) {
            cc.loader.loadRes('boy_left', cc.SpriteFrame, function (err, spriteFrame) {
                _this.node.getComponent(cc.Sprite).spriteFrame = spriteFrame;
            });
        }
        if (direction.xSpeed > 0 && this.node.y < -158) {
            cc.loader.loadRes('boy_right', cc.SpriteFrame, function (err, spriteFrame) {
                _this.node.getComponent(cc.Sprite).spriteFrame = spriteFrame;
            });
        }
        if (direction.xSpeed == 0 && this.node.y < -158) {
            cc.loader.loadRes('boy_stand', cc.SpriteFrame, function (err, spriteFrame) {
                _this.node.getComponent(cc.Sprite).spriteFrame = spriteFrame;
            });
        }
        if (direction.xSpeed <= 0 && this.node.y >= -158) {
            cc.loader.loadRes('boy_jump_left', cc.SpriteFrame, function (err, spriteFrame) {
                _this.node.getComponent(cc.Sprite).spriteFrame = spriteFrame;
            });
        }
        if (direction.xSpeed > 0 && this.node.y >= -158) {
            cc.loader.loadRes('boy_jump_right', cc.SpriteFrame, function (err, spriteFrame) {
                _this.node.getComponent(cc.Sprite).spriteFrame = spriteFrame;
            });
        }
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
        //# sourceMappingURL=Player.js.map
        