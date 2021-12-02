
-- ----------------------------
-- Table structure for ent_sys_user
-- ----------------------------
DROP TABLE IF EXISTS `db_instance`;
CREATE TABLE `db_instance`  (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `host` varchar(50) NOT NULL,
  `port` varchar(100) NOT NULL,
  `username` varchar(50) NOT NULL,
  `password` varchar(50) NOT NULL,
  `kind` varchar(50) NOT NULL,
  `description` varchar(255) NULL,
  `created_date` timestamp(6) NULL DEFAULT CURRENT_TIMESTAMP(6),
  `created_user` varchar(36)  NULL DEFAULT NULL,
  `modified_date` timestamp(6) NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
  `modified_user` varchar(36)  NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE
);
