/*
 Navicat Premium Data Transfer

 Source Server         : 前端
 Source Server Type    : MySQL
 Source Server Version : 80020
 Source Host           : localhost:3306
 Source Schema         : admin

 Target Server Type    : MySQL
 Target Server Version : 80020
 File Encoding         : 65001

 Date: 29/06/2020 18:31:25
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for comstalls
-- ----------------------------
DROP TABLE IF EXISTS `comstalls`;
CREATE TABLE `comstalls`  (
  `id` int(0) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `carnm` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `startdate` datetime(0) DEFAULT NULL,
  `enddate` datetime(0) DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of comstalls
-- ----------------------------
INSERT INTO `comstalls` VALUES (1, '张良', '渝A11557', '2020-06-01 13:21:43', '2020-08-01 13:20:48');
INSERT INTO `comstalls` VALUES (2, '刘备', '渝B216A8', '2020-05-01 13:21:57', '2020-06-01 13:21:57');
INSERT INTO `comstalls` VALUES (3, '程咬金', '渝D56789', '2020-04-01 14:17:49', '2020-10-01 14:17:56');
INSERT INTO `comstalls` VALUES (4, '张三', '渝B12345', '2020-06-29 15:01:43', '2020-09-01 10:00:00');
INSERT INTO `comstalls` VALUES (5, '李四', '渝H78944', '2020-06-29 15:07:06', '2020-06-10 14:00:00');
INSERT INTO `comstalls` VALUES (6, '王麻子', '渝C11111', '2020-06-29 15:11:27', '2020-07-01 00:00:00');

-- ----------------------------
-- Table structure for dispose
-- ----------------------------
DROP TABLE IF EXISTS `dispose`;
CREATE TABLE `dispose`  (
  `id` int(0) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `date` datetime(0) DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP(0),
  `floor` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `info` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `result` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 7 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of dispose
-- ----------------------------
INSERT INTO `dispose` VALUES (1, '鲁班', '2020-06-28 13:55:00', '2-8-8', '物业服务不实在2', '0');
INSERT INTO `dispose` VALUES (3, '白起', '2020-06-28 13:55:03', '1-17-9', '物业服务不实在3', '0');
INSERT INTO `dispose` VALUES (4, '张良', '2020-06-28 13:57:29', '5-9-9', '保安不厚道啊', '0');
INSERT INTO `dispose` VALUES (5, '曹操', '2020-06-28 14:11:20', '6-6-6', '保安太野了', '0');
INSERT INTO `dispose` VALUES (6, '刘备', '2020-06-28 15:54:07', '6-6-7', '没什么想说的,就是来投诉一哈', '0');

-- ----------------------------
-- Table structure for equipment
-- ----------------------------
DROP TABLE IF EXISTS `equipment`;
CREATE TABLE `equipment`  (
  `id` int(0) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `date` timestamp(0) DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP(0),
  `state` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `floor` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `img` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 8 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of equipment
-- ----------------------------
INSERT INTO `equipment` VALUES (1, '吹风机', '2020-06-26 13:48:02', '0', '1-6-6', 'http://localhost:3000/uploads/upload_6c80b382c9c283e8f4e7eeb79fedf39a.jpg');
INSERT INTO `equipment` VALUES (4, '全自动清洁车', '2020-06-25 17:31:07', '0', '5', 'http://localhost:3000/uploads/upload_11785190e1b5abfbd1d27c0e34d185ae.jpg');
INSERT INTO `equipment` VALUES (5, '清洁车', '2020-06-28 15:56:04', '0', '6', 'http://localhost:3000/uploads/upload_dd3b97a33247e16e2fd3ef7142bfad3b.jpg');
INSERT INTO `equipment` VALUES (7, '灭火器', '2020-06-25 18:20:26', '0', '每层都有', 'http://localhost:3000/uploads/upload_2acc962c66eadc845d71fd5e3cd4cb69.jpg');

-- ----------------------------
-- Table structure for homeusers
-- ----------------------------
DROP TABLE IF EXISTS `homeusers`;
CREATE TABLE `homeusers`  (
  `id` int(0) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `date` datetime(0) DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP(0),
  `floor` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `phone` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 11 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of homeusers
-- ----------------------------
INSERT INTO `homeusers` VALUES (1, '王麻', '2020-06-24 18:34:19', '5-7-8', '13256894857');
INSERT INTO `homeusers` VALUES (3, '王昭君', '2020-06-25 18:35:09', '5-7-9', '45845665456');
INSERT INTO `homeusers` VALUES (4, '白起', '2020-06-24 18:36:37', '1-17-9', '14524555122');
INSERT INTO `homeusers` VALUES (5, '鲁班', '2020-06-24 18:37:00', '2-8-8', '65651554544');
INSERT INTO `homeusers` VALUES (6, '韩信', '2020-06-19 18:37:22', '2-7-8', '41494154444');
INSERT INTO `homeusers` VALUES (7, '刘备', '2020-06-25 18:37:43', '3-7-8', '15454115145');
INSERT INTO `homeusers` VALUES (8, '程咬金', '2020-06-24 18:38:43', '7-8-9', '13256895555');
INSERT INTO `homeusers` VALUES (9, '孙尚香', '2020-06-24 18:39:35', '7-8-5', '14685254912');
INSERT INTO `homeusers` VALUES (10, '妖姬', '2020-06-11 16:59:07', '6-5-6', '48545454541');

-- ----------------------------
-- Table structure for maintaininfo
-- ----------------------------
DROP TABLE IF EXISTS `maintaininfo`;
CREATE TABLE `maintaininfo`  (
  `id` int(0) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `date` datetime(0) DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP(0),
  `info` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 9 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of maintaininfo
-- ----------------------------
INSERT INTO `maintaininfo` VALUES (1, '清洁车nb', '2020-06-26 00:02:00', 'nb的清洁车');
INSERT INTO `maintaininfo` VALUES (2, '吹风机啊啊1111', '2020-06-27 16:35:13', '吹风机(出风口发出异响)打豆豆');

-- ----------------------------
-- Table structure for menueq
-- ----------------------------
DROP TABLE IF EXISTS `menueq`;
CREATE TABLE `menueq`  (
  `id` int(0) NOT NULL AUTO_INCREMENT,
  `authName` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `path` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 17 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of menueq
-- ----------------------------
INSERT INTO `menueq` VALUES (15, '设备列表', 'eqlist');
INSERT INTO `menueq` VALUES (16, '设备维护记录', 'eqinfo');

-- ----------------------------
-- Table structure for menuhomeuser
-- ----------------------------
DROP TABLE IF EXISTS `menuhomeuser`;
CREATE TABLE `menuhomeuser`  (
  `id` int(0) NOT NULL AUTO_INCREMENT,
  `authName` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `path` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of menuhomeuser
-- ----------------------------
INSERT INTO `menuhomeuser` VALUES (12, '楼栋住户统计', 'homeall');
INSERT INTO `menuhomeuser` VALUES (13, '所有住户列表', 'homelist');

-- ----------------------------
-- Table structure for menuqu
-- ----------------------------
DROP TABLE IF EXISTS `menuqu`;
CREATE TABLE `menuqu`  (
  `id` int(0) NOT NULL AUTO_INCREMENT,
  `authName` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `path` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 56 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of menuqu
-- ----------------------------
INSERT INTO `menuqu` VALUES (54, '未处理列表', 'quList');
INSERT INTO `menuqu` VALUES (55, '已处理列表', 'solvelist');

-- ----------------------------
-- Table structure for menus
-- ----------------------------
DROP TABLE IF EXISTS `menus`;
CREATE TABLE `menus`  (
  `id` int(0) NOT NULL AUTO_INCREMENT,
  `authName` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 7 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of menus
-- ----------------------------
INSERT INTO `menus` VALUES (1, '用户管理');
INSERT INTO `menus` VALUES (2, '住户信息管理');
INSERT INTO `menus` VALUES (3, '物业设备管理');
INSERT INTO `menus` VALUES (4, '投诉建议管理');
INSERT INTO `menus` VALUES (5, '停车场车位管理');

-- ----------------------------
-- Table structure for menustall
-- ----------------------------
DROP TABLE IF EXISTS `menustall`;
CREATE TABLE `menustall`  (
  `id` int(0) NOT NULL AUTO_INCREMENT,
  `authName` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `path` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 56 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of menustall
-- ----------------------------
INSERT INTO `menustall` VALUES (34, '公共停车卡管理', 'allstall');
INSERT INTO `menustall` VALUES (35, '私有车位', 'mystall');

-- ----------------------------
-- Table structure for menuuser
-- ----------------------------
DROP TABLE IF EXISTS `menuuser`;
CREATE TABLE `menuuser`  (
  `id` int(0) NOT NULL AUTO_INCREMENT,
  `authName` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `path` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 9 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of menuuser
-- ----------------------------
INSERT INTO `menuuser` VALUES (7, '用户列表', 'user');

-- ----------------------------
-- Table structure for ownstall
-- ----------------------------
DROP TABLE IF EXISTS `ownstall`;
CREATE TABLE `ownstall`  (
  `id` int(0) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `carnm` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `floor` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `stallname` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `phone` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of ownstall
-- ----------------------------
INSERT INTO `ownstall` VALUES (1, '鲁班', '渝A66666', '2-8-8', 'LJ-001', '65651554544');
INSERT INTO `ownstall` VALUES (2, '白起', '渝A99999', '1-17-9', 'LJ-002', '14524555122');

-- ----------------------------
-- Table structure for querulous
-- ----------------------------
DROP TABLE IF EXISTS `querulous`;
CREATE TABLE `querulous`  (
  `id` int(0) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `floor` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `date` datetime(0) DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP(0),
  `info` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `result` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 6 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of querulous
-- ----------------------------
INSERT INTO `querulous` VALUES (2, '李白', '6-9-5', '2020-06-28 13:58:47', '扫地大妈抢我酒', '1');
INSERT INTO `querulous` VALUES (3, '夏侯惇', '7-9-8', '2020-06-28 13:58:50', '扫地大妈太秀了', '1');

-- ----------------------------
-- Table structure for user
-- ----------------------------
DROP TABLE IF EXISTS `user`;
CREATE TABLE `user`  (
  `id` int(0) NOT NULL AUTO_INCREMENT,
  `username` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `password` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `restrict` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 20 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of user
-- ----------------------------
INSERT INTO `user` VALUES (1, 'admin', '123456', '0');
INSERT INTO `user` VALUES (13, '沈腾', '123456', '1');
INSERT INTO `user` VALUES (14, '蒙毅', '123456789', '1');
INSERT INTO `user` VALUES (15, '贾玲', '123456', '1');
INSERT INTO `user` VALUES (17, '王昭君', '456123', '0');
INSERT INTO `user` VALUES (18, '秦始皇', '123456', '0');

SET FOREIGN_KEY_CHECKS = 1;
