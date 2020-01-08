-- phpMyAdmin SQL Dump
-- version 4.7.7
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jan 08, 2020 at 08:12 AM
-- Server version: 10.1.30-MariaDB
-- PHP Version: 7.2.2

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `boomershub`
--

-- --------------------------------------------------------

--
-- Table structure for table `properties`
--

CREATE TABLE `properties` (
  `id` int(11) NOT NULL,
  `name` varchar(50) NOT NULL,
  `address` varchar(50) NOT NULL,
  `city` varchar(50) NOT NULL,
  `state` varchar(50) NOT NULL,
  `zip_code` varchar(20) NOT NULL,
  `country` varchar(30) NOT NULL,
  `phone` varchar(20) NOT NULL,
  `type` varchar(30) NOT NULL,
  `capacity` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `properties`
--

INSERT INTO `properties` (`id`, `name`, `address`, `city`, `state`, `zip_code`, `country`, `phone`, `type`, `capacity`) VALUES
(87, 'BANYAN_PLACE - 11968683', '2950_NW 5TH AVE', 'BOCA_RATON', 'FL', '33431', '', '(561)_571-0303', 'Assisted_Living Facility', 125),
(88, 'BANYAN_PLACE-LANTANA - 11969358', '1021_RIDGE RD', 'LANTANA', 'FL', '33462', '', '(561)_571-0303', 'Assisted_Living Facility', 39),
(89, 'Brookdale Creekside', '2000 W Spring Creek Pkwy', 'Plano', 'Texas', '75023', '972-312-9993', 'Assisted Living', 'Collin', 56),
(90, 'The Isle At Watermere', '101 Watermere Dr', 'Southlake', 'Texas', '76092', '817-748-4000', 'Assisted Living', 'Tarrant', 120),
(91, 'EMERALD_PARK OF HOLLYWOOD - 11964990', '5770_STIRLING RD', 'HOLLYWOOD', 'FL', '33021-1549', '', '(954)_987-5400', 'Assisted_Living Facility', 100),
(92, 'EMERALD_PARK OF HOLLYWOOD - 26989479', '5770_STIRLING ROAD', 'HOLLYWOOD', 'FL', '33021', '', '(954)_987-5400', 'Clinical_Laboratory', 0),
(93, 'LEGACY_AT HIGHWOODS PRESERVE - 11968854', '18600_HIGHWOODS PRESERVE PKWY', 'TAMPA', 'FL', '33647', '', '(813)_375-9858', 'Assisted_Living Facility', 88),
(94, 'LEGACY_AT HIGHWOODS PRESERVE - 26990036', '18600_HIGHWOODS PRESERVE PKWY', 'TAMPA', 'FL', '33647', '', '(813)_375-9858', 'Clinical_Laboratory', 0);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `properties`
--
ALTER TABLE `properties`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `properties`
--
ALTER TABLE `properties`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=95;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
