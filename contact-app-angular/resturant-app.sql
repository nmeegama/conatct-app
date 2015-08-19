

CREATE TABLE IF NOT EXISTS `resturant` (

  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `home_banner` varchar(255) NOT NULL,
  `promotion_banner` varchar(255) NOT NULL,
  `type` varchar(100) NOT NULL,
  `address` varchar(100) NOT NULL,
  `phone` varchar(255) DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  `web` varchar(255) DEFAULT NULL,
  `position_lng` float(50) DEFAULT NULL,
  `position_lat` float(50) DEFAULT NULL, 
  PRIMARY KEY (`id`)
  
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=0 ;

