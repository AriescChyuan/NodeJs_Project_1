-- phpMyAdmin SQL Dump
-- version 5.0.3
-- https://www.phpmyadmin.net/
--
-- 主機： localhost
-- 產生時間： 2020 年 11 月 27 日 04:06
-- 伺服器版本： 10.4.14-MariaDB
-- PHP 版本： 7.4.11

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- 資料庫： `RiceFactory`
--

-- --------------------------------------------------------

--
-- 資料表結構 `ChaffArea`
--
USE heroku_01a96fa5657592f;

CREATE TABLE `ChaffArea` (
  `Id` int(11) NOT NULL,
  `狀態` int(11) NOT NULL,
  `重量(噸)` float NOT NULL,
  `溫度` float NOT NULL,
  `濕度` float NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- 傾印資料表的資料 `ChaffArea`
--

INSERT INTO `ChaffArea` (`Id`, `狀態`, `重量(噸)`, `溫度`, `濕度`) VALUES
(1, 1, 17.2, 28.4, 40.3),
(2, 1, 17.5, 27.2, 38.5),
(3, 1, 18.3, 28.6, 40.9),
(4, 1, 18.5, 28.7, 37.6),
(5, 1, 17.9, 27.8, 34.1),
(6, 1, 17, 28.9, 37.8);

-- --------------------------------------------------------

--
-- 資料表結構 `Dryer`
--

CREATE TABLE `Dryer` (
  `Id` int(11) NOT NULL,
  `狀態` int(11) NOT NULL,
  `重量(噸)` float NOT NULL,
  `溫度` float NOT NULL,
  `濕度` float NOT NULL,
  `火力段數` int(11) NOT NULL,
  `氧氣量` float NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- 傾印資料表的資料 `Dryer`
--

INSERT INTO `Dryer` (`Id`, `狀態`, `重量(噸)`, `溫度`, `濕度`, `火力段數`, `氧氣量`) VALUES
(1, 1, 18.3, 88.4, 20.1, 2, 70.3),
(2, 1, 19.1, 89.8, 14.2, 2, 73.4),
(3, 1, 18.5, 92.3, 10.4, 3, 78.3),
(4, 1, 19.8, 70.3, 23.6, 1, 66.5),
(5, 1, 18.5, 71.3, 28.2, 1, 60.3),
(6, 1, 18.4, 92.5, 8.9, 3, 82.8),
(7, 0, 0, 0, 0, 0, 0),
(8, 1, 18.6, 85.6, 18.4, 2, 72.6),
(9, 1, 19.5, 92.3, 13.2, 3, 89.1),
(10, 1, 17.9, 82.9, 18.6, 3, 78.9),
(11, 1, 18.9, 88.8, 22.3, 2, 78.3),
(12, 1, 18.7, 88.3, 25.1, 2, 70.3),
(13, 1, 18.3, 84.2, 17.7, 2, 72.9),
(14, 1, 19.5, 93.4, 13.2, 3, 88.2);

-- --------------------------------------------------------

--
-- 資料表結構 `FeedingArea`
--

CREATE TABLE `FeedingArea` (
  `Id` int(11) DEFAULT NULL,
  `狀態` int(11) DEFAULT NULL,
  `重量(噸)` float DEFAULT NULL,
  `溫度` float DEFAULT NULL,
  `濕度` float DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- 傾印資料表的資料 `FeedingArea`
--

INSERT INTO `FeedingArea` (`Id`, `狀態`, `重量(噸)`, `溫度`, `濕度`) VALUES
(1, 1, 27.5, 30.1, 60.5),
(2, 1, 27.1, 29.8, 59.1),
(3, 1, 26.9, 30.4, 61.2),
(4, 1, 28.1, 31.2, 61.8),
(5, 1, 27.1, 30.4, 58.9),
(6, 1, 26.4, 30.1, 60.2),
(7, 1, 26.6, 29.4, 57.2),
(8, 1, 27.1, 30.1, 61.4),
(9, 1, 27.5, 31.4, 62.6);

-- --------------------------------------------------------

--
-- 資料表結構 `FlowMeter`
--

CREATE TABLE `FlowMeter` (
  `Id` int(11) NOT NULL,
  `狀態` int(11) NOT NULL,
  `流量` float NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- 傾印資料表的資料 `FlowMeter`
--

INSERT INTO `FlowMeter` (`Id`, `狀態`, `流量`) VALUES
(1, 1, 80.21),
(2, 1, 77.98),
(3, 1, 81.42),
(4, 1, 91.34);

-- --------------------------------------------------------

--
-- 資料表結構 `member_info`
--

CREATE TABLE `member_info` (
  `id` int(11) NOT NULL,
  `name` varchar(30) NOT NULL,
  `email` varchar(30) NOT NULL,
  `password` varchar(200) NOT NULL,
  `img` longblob DEFAULT NULL,
  `img_name` varchar(20) DEFAULT NULL,
  `update_date` datetime DEFAULT NULL,
  `create_date` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- 傾印資料表的資料 `member_info`
--

INSERT INTO `member_info` (`id`, `name`, `email`, `password`, `img`, `img_name`, `update_date`, `create_date`) VALUES
(1, 'Bruce', 'jetliayu@gmail.com', '2ca8ab9f3f30d1be5bb2481ae9f17600d2598b46', NULL, NULL, NULL, '2020-11-19 11:40:11'),
(2, 'bitch', 'jetliayu1@gmail.com', '40bd001563085fc35165329ea1ff5c5ecbdbbeef', NULL, NULL, NULL, '2020-11-23 15:38:29');

-- --------------------------------------------------------

--
-- 資料表結構 `PreDryingArea`
--

CREATE TABLE `PreDryingArea` (
  `Id` int(11) NOT NULL,
  `狀態` int(11) NOT NULL,
  `重量(噸)` float NOT NULL,
  `溫度` float NOT NULL,
  `濕度` float NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- 傾印資料表的資料 `PreDryingArea`
--

INSERT INTO `PreDryingArea` (`Id`, `狀態`, `重量(噸)`, `溫度`, `濕度`) VALUES
(1, 1, 18.9, 30.1, 59.2),
(2, 1, 18.9, 31.1, 58.9),
(3, 1, 18.9, 31.1, 58.9),
(4, 1, 19.1, 29.8, 61.3),
(5, 1, 20.5, 32.3, 54.6),
(6, 1, 18.4, 29.3, 59.2),
(7, 0, 0, 0, 0),
(8, 1, 18.2, 30.3, 60.7);

-- --------------------------------------------------------

--
-- 資料表結構 `RoughingMachine`
--

CREATE TABLE `RoughingMachine` (
  `Id` int(10) NOT NULL,
  `狀態` int(10) NOT NULL,
  `重量(噸)` float NOT NULL,
  `溫度` float NOT NULL,
  `濕度` float NOT NULL,
  `雜質量` float NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- 傾印資料表的資料 `RoughingMachine`
--

INSERT INTO `RoughingMachine` (`Id`, `狀態`, `重量(噸)`, `溫度`, `濕度`, `雜質量`) VALUES
(1, 1, 18.2, 29.8, 60.1, 40),
(2, 1, 18.6, 30.2, 60.4, 42.2),
(3, 1, 18.2, 27.3, 59.6, 53.2),
(4, 1, 19.3, 30.4, 61.3, 25.8),
(5, 1, 18.7, 33.1, 60.8, 14.2),
(6, 1, 19.2, 29.2, 59.3, 76);

--
-- 已傾印資料表的索引
--

--
-- 資料表索引 `member_info`
--
ALTER TABLE `member_info`
  ADD PRIMARY KEY (`id`);

--
-- 在傾印的資料表使用自動遞增(AUTO_INCREMENT)
--

--
-- 使用資料表自動遞增(AUTO_INCREMENT) `member_info`
--
ALTER TABLE `member_info`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
