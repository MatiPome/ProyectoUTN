-- phpMyAdmin SQL Dump
-- version 5.1.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1:3306
-- Generation Time: Aug 22, 2022 at 12:43 AM
-- Server version: 5.7.36
-- PHP Version: 7.4.26

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `users`
--

-- --------------------------------------------------------

--
-- Table structure for table `news`
--

DROP TABLE IF EXISTS `news`;
CREATE TABLE IF NOT EXISTS `news` (
  `id` int(10) NOT NULL AUTO_INCREMENT,
  `title` varchar(250) NOT NULL,
  `subtitle` varchar(250) NOT NULL,
  `modalBody` text NOT NULL,
  `img_id` varchar(250) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=20 DEFAULT CHARSET=utf8;

--
-- Dumping data for table `news`
--

INSERT INTO `news` (`id`, `title`, `subtitle`, `modalBody`, `img_id`) VALUES
(2, 'Obra pública: Cristina Kirchner recusó a otro de los jueces, que le respondió en pleno juicio eterno', 'Se trata de Jorge Gorini. Fue por dos reuniones con Patricia Bullrich cuando era ministra de Seguridad. La verdad!', 'La defensa de la vicepresidenta de la Nación, Cristina Kirchner, recusó hoy a otro de los jueces del Tribunal Oral Federal 2 que juzga el caso de las obras públicas que recibió el empresario Lázaro Báez. Se trata de Jorge Gorini y se suma al planteo que a comienzo de la semana hizo sobre Rodrigo Giménez Uriburu y el fiscal Diego Luciani.\r\nEn el inicio de la audiencia, Beraldi pidió la palabra para expresar que iba a ampliar la recusación sobre Giménez Uriburu y una nueva sobre Gorini. Fue tras la publicación de hoy del diario Pagina/12 que dio cuenta que ambos jueces tuvieron reuniones en 2017 y 2018 con la entonces ministra de Seguridad Patricia Bullrich.', 'zybnyxyzisfr6x5i0cat'),
(19, 'Gabriel Batistuta fue embargado en $71 millones por no pagar el impuesto a la riqueza aprobado durante la pandemia', 'La resolución afecta a tres inmuebles del exintegrante del seleccionado argentino; un juzgado federal de Corrientes declaró la inconstitucionalidad de este gravamen por “confiscatorio”', 'Gabriel Batistuta fue embargado en $71 millones por la Justicia Federal de Reconquista, Santa Fe, luego de una demanda de la Administración Federal de Ingresos Públicos (AFIP) por incumplimientos en el pago del Aporte Solidario y Extraordinario de las Grandes Fortunas -conocido como impuesto a la riqueza-, aprobado por el Congreso para paliar los efectos de la pandemia de Covid-19.\r\n\r\nEl embargo no se había ejecutado hasta ahora porque en mayo el exjugador de fútbol interpuso una medida cautelar y recién el 29 de junio un Tribunal de Alzada de Chaco -con jurisdicción en el caso- falló a favor del juez de primera instancia.', 'ljfwkdw4mmk25aypl4ly');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
CREATE TABLE IF NOT EXISTS `users` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(50) NOT NULL,
  `password` varchar(250) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=4 DEFAULT CHARSET=utf8;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `name`, `password`) VALUES
(1, 'matias', '2bd12a930c3012f9bb4e0ea9bec9a3fc'),
(3, 'victor', '5583413443164b56500def9a533c7c70');
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
