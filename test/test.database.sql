DROP TABLE IF EXISTS `item`;
DROP TABLE IF EXISTS `item`;
CREATE TABLE `wr_itemfield` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(100) NOT NULL,
  `descr` varchar(200) NOT NULL,
  `locked` tinyint(1) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8;
DROP TABLE IF EXISTS `item`;
INSERT INTO `item` VALUES 
(1,'name1','descr1',0),
(2,'name2','descr2',0);
