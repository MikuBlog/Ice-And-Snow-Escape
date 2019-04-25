(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/scripts/Game.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, '4331b+sPUtLEJAdZjBPGdGG', 'Game', __filename);
// scripts/Game.js

'use strict';

var direction = require('Global');
cc.Class({
    extends: cc.Component,

    properties: {
        // 引用了星星预制资源
        starPrefab: {
            default: null,
            type: cc.Prefab
        },
        // 星星产生后消失时间的随机范围
        maxStarDuration: 0,
        minStarDuration: 0,
        // 地面节点，用于确定星星生成的高度
        ground: {
            default: null,
            type: cc.Node
        },
        // 用于获取主角弹跳的高度，和控制主角行动开关
        player: {
            default: null,
            type: cc.Node
        },
        // score label的引用
        scoreDisplay: {
            default: null,
            type: cc.Label
        },
        scoreAudio: {
            default: null,
            type: cc.AudioClip
        },
        left: {
            default: null,
            type: cc.Node
        },
        right: {
            default: null,
            type: cc.Node
        },
        hastart: {
            default: null,
            type: cc.Prefab
        },
        smallcanvas: {
            default: null,
            type: cc.Node
        },
        jump: {
            default: null,
            type: cc.Node
        },
        flower: {
            default: null,
            type: cc.Node
        },
        board: {
            default: null,
            type: cc.Prefab
        }
    },
    onLoad: function onLoad() {
        // cc.view.setFrameSize(document.body.clientWidth,document.body.clientHeight);
        // 开启碰撞检测
        cc.director.getCollisionManager().enabled = true;
        // 获取地面的y轴坐标
        this.groundY = this.ground.y + this.ground.height / 2;
        this.timer = 0;
        this.starDuration = 0;
        // 初始化计分
        this.score = 0;
        this.spawnNewStar();
    },
    spawnNewStar: function spawnNewStar() {
        // 使用给定的模板再场景中生成一个新的节点
        var newStar = cc.instantiate(this.starPrefab);
        // 将新增的节点添加到Canvas节点下面
        this.node.addChild(newStar);
        // 为星星设置一个随机位置
        newStar.setPosition(this.getNewStarPosition());
        // 在星星组件上暂存Game对象的引用
        newStar.getComponent('Star').game = this;
        this.player.getComponent('Player').jump = this.jump;
        this.flower.getComponent('Button').game = this;
        // 重置计时器，根据消失事件范围随机取一个值
        this.starDuration = this.minStarDuration + Math.random() * (this.maxStarDuration - this.minStarDuration);
        this.timer = 0;
    },

    // 生成游戏规则
    spawnNewBoard: function spawnNewBoard() {
        // 使用给定的模板再场景中生成一个新的节点
        var newBoard = cc.instantiate(this.board);
        // 将新增的节点添加到Canvas节点下面
        this.node.addChild(newBoard);
    },
    getNewStarPosition: function getNewStarPosition() {
        var randY = this.groundY + Math.random() * this.player.getComponent('Player').jumpHeight + 40;
        var maxX = this.smallcanvas.width / 2;
        var randX = (Math.random() - 0.5) * 2 * maxX;
        return cc.v2(randX, randY);
    },
    gainScore: function gainScore() {
        this.score += 1;
        // 更新 scoreDisplay Label 的文字
        this.scoreDisplay.string = 'Torch: ' + this.score;
        cc.audioEngine.play();
    },
    update: function update(dt) {
        if (this.timer > this.starDuration) {
            this.gameOver();
            return;
        }
        this.timer += dt;
    },
    gameOver: function gameOver() {
        var hastart = cc.instantiate(this.hastart);
        // 停止player节点的跳跃动作
        this.player.stopAllActions(); //停止 player 节点的跳跃动作
        hastart.getComponent('Start').game = this;
        hastart.setPosition(cc.v2(0, -250));
        this.node.addChild(hastart);
        direction.xSpeed = 0;
    },

    // 横屏显示
    setLandscape: function setLandscape() {
        if (cc.sys.isNative && cc.sys.os === cc.sys.OS_ANDROID) {
            jsb.reflection.callStaticMethod("org/cocos2dx/javascript/AppActivity", "changeOrientation", "(I)V", 0); //0横1竖
        } else if (cc.sys.isNative && cc.sys.os === cc.sys.OS_IOS) {
            jsb.reflection.callStaticMethod("IOSHelper", "changeOrientation:", 0);
        } else {
            cc.view.setOrientation(cc.macro.ORIENTATION_LANDSCAPE);
        }
        // cc.view.setFrameSize(document.body.clientWidth,document.body.clientHeight);
        //     let width = cc.view.getFrameSize().height < cc.view.getFrameSize().width ?
        //     cc.view.getFrameSize().width : cc.view.getFrameSize().height;
        //     let height = cc.view.getFrameSize().height > cc.view.getFrameSize().width ?
        //     cc.view.getFrameSize().width : cc.view.getFrameSize().height;
        //     cc.view.setFrameSize(width, height);
        //     cc.view.setDesignResolutionSize(width, height, cc.ResolutionPolicy.FIXED_WIDTH);
    },

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},

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
        //# sourceMappingURL=Game.js.map
        