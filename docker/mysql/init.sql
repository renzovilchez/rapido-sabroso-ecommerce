-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 22-07-2025 a las 19:25:07
-- Versión del servidor: 10.4.32-MariaDB
-- Versión de PHP: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `rapido_sabroso`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `admin`
--

CREATE TABLE `admin` (
  `id_admin` int(11) NOT NULL,
  `nombre` varchar(100) NOT NULL,
  `apellidos` varchar(100) NOT NULL,
  `email` varchar(100) NOT NULL,
  `password` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `admin`
--

INSERT INTO `admin` (`id_admin`, `nombre`, `apellidos`, `email`, `password`) VALUES
(1, 'Renzo', 'Vilchez', 'renzo@gmail.com', '$2b$10$5/nQJ7A0C/StXgHXHLoarupXKExv.WkEzQGJHaz37S0XZ22Xp644i');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `categoria`
--

CREATE TABLE `categoria` (
  `id_categoria` int(11) NOT NULL,
  `nombre` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `categoria`
--

INSERT INTO `categoria` (`id_categoria`, `nombre`) VALUES
(1, 'Hamburguesas'),
(2, 'Bebidas'),
(3, 'queque');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `cliente`
--

CREATE TABLE `cliente` (
  `id_cliente` int(11) NOT NULL,
  `nombre` varchar(100) NOT NULL,
  `apellidos` varchar(100) NOT NULL,
  `email` varchar(100) NOT NULL,
  `password` varchar(255) NOT NULL,
  `tipo_documento` varchar(10) DEFAULT NULL,
  `dni` varchar(8) DEFAULT NULL,
  `ruc` varchar(11) DEFAULT NULL,
  `razon_social` varchar(255) DEFAULT NULL,
  `direccion` text DEFAULT NULL,
  `direccion_fiscal` text DEFAULT NULL,
  `puntos` decimal(10,2) DEFAULT 0.00
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `cliente`
--

INSERT INTO `cliente` (`id_cliente`, `nombre`, `apellidos`, `email`, `password`, `tipo_documento`, `dni`, `ruc`, `razon_social`, `direccion`, `direccion_fiscal`, `puntos`) VALUES
(1, 'Renzo', 'Vilchez Algalobos', 'renzo@gmail.com', '$2b$10$5/nQJ7A0C/StXgHXHLoarupXKExv.WkEzQGJHaz37S0XZ22Xp644i', 'DNI', '75415418', NULL, NULL, 'Trujillo - El Porvenir - Inca Roca 1123', NULL, 0.00),
(2, 'Pepe', 'Galarga', 'robercraft_20@hotmail.com', 'pepito', 'DNI', '70573886', NULL, NULL, 'Trujillo - El Porvenir - En mi casa', NULL, 0.00),
(3, 'Juan', 'Perez', 'juanperez@gmail.com', '$2b$10$R7tHfy3FWdC/zSaY1hS8O.gPf.iJY9VE2dEn7DybOvQNOdJmgcoiC', 'DNI', '33333333', NULL, NULL, 'Trujillo - Salaverry - siempre libre', NULL, 0.00),
(4, 'Richard', 'Terrones Cahuana', 'richard@gmail.com', '$2b$10$LBa54MFMbh/b4waCcI/dmelZEOoXh.zFzKfahSxV4yFowkI8GJM8a', 'DNI', '77777777', NULL, NULL, 'Trujillo - Trujillo - Cerca a maestro', NULL, 0.00);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `comprobante`
--

CREATE TABLE `comprobante` (
  `id_comprobante` int(11) NOT NULL,
  `id_pedido` int(11) DEFAULT NULL,
  `tipo` varchar(20) NOT NULL,
  `serie` varchar(10) NOT NULL,
  `correlativo` int(11) NOT NULL,
  `dni` varchar(8) DEFAULT NULL,
  `ruc` varchar(11) DEFAULT NULL,
  `razon_social` varchar(255) DEFAULT NULL,
  `direccion` text DEFAULT NULL,
  `direccion_fiscal` text DEFAULT NULL,
  `fecha` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `comprobante`
--

INSERT INTO `comprobante` (`id_comprobante`, `id_pedido`, `tipo`, `serie`, `correlativo`, `dni`, `ruc`, `razon_social`, `direccion`, `direccion_fiscal`, `fecha`) VALUES
(1, 16, 'boleta', 'B001', 1, NULL, NULL, NULL, 'Av. Siempre Viva 742', NULL, '2025-05-25 17:39:39'),
(2, 17, 'boleta', 'B001', 2, NULL, NULL, NULL, 'Trujillo - El Porvenir - Inca Roca 1123', NULL, '2025-05-25 17:43:15'),
(3, 18, 'boleta', 'B001', 3, NULL, NULL, NULL, 'Trujillo - El Porvenir - Inca Roca 1123', NULL, '2025-05-25 17:43:20'),
(4, 19, 'boleta', 'B001', 4, NULL, NULL, NULL, 'Trujillo - El Porvenir - Inca Roca 1123', NULL, '2025-05-25 17:49:10'),
(7, 20, 'boleta', 'B001', 5, NULL, NULL, NULL, 'Trujillo - El Porvenir - Inca Roca 1123', NULL, '2025-05-25 17:54:32'),
(8, 21, 'boleta', 'B001', 6, NULL, NULL, NULL, 'Trujillo - El Porvenir - Inca Roca 1123', NULL, '2025-05-25 17:55:16'),
(9, 22, 'boleta', 'B001', 7, NULL, NULL, NULL, 'Trujillo - El Porvenir - Inca Roca 1123', NULL, '2025-05-25 17:56:01'),
(10, 23, 'boleta', 'B001', 8, NULL, NULL, NULL, 'Trujillo - El Porvenir - Inca Roca 1123', NULL, '2025-05-25 18:21:11'),
(11, 38, 'boleta', 'B001', 9, NULL, NULL, NULL, 'Trujillo - El Porvenir - Inca Roca 1123', NULL, '2025-05-30 01:06:38'),
(12, 41, 'boleta', 'B001', 10, NULL, NULL, NULL, 'Trujillo - El Porvenir - Inca Roca 1123', NULL, '2025-05-30 01:11:54'),
(13, 42, 'boleta', 'B001', 11, NULL, NULL, NULL, 'Trujillo - El Porvenir - Inca Roca 1123', NULL, '2025-05-30 01:17:09'),
(14, 43, 'boleta', 'B001', 12, NULL, NULL, NULL, 'Trujillo - El Porvenir - Inca Roca 1123', NULL, '2025-05-30 21:40:00'),
(15, 44, 'boleta', 'B001', 13, NULL, NULL, NULL, 'Trujillo - El Porvenir - Inca Roca 1123', NULL, '2025-05-30 21:40:24'),
(16, 45, 'boleta', 'B001', 14, '75415418', NULL, NULL, 'Trujillo - El Porvenir - Inca Roca 1123', NULL, '2025-05-30 21:55:59'),
(17, 46, 'boleta', 'B001', 15, '75415418', NULL, NULL, 'Trujillo - El Porvenir - Inca Roca 1123', NULL, '2025-05-30 21:56:11'),
(18, 47, 'boleta', 'B001', 16, '75415418', NULL, NULL, 'Trujillo - El Porvenir - Inca Roca 1123', NULL, '2025-05-30 21:56:22'),
(19, 48, 'boleta', 'B001', 17, '75415418', NULL, NULL, 'Trujillo - El Porvenir - Inca Roca 1123', NULL, '2025-05-30 22:12:51'),
(20, 49, 'boleta', 'B001', 18, '75415418', NULL, NULL, 'Trujillo - El Porvenir - Inca Roca 1123', NULL, '2025-05-30 22:15:35'),
(21, 50, 'boleta', 'B001', 19, '75415418', NULL, NULL, 'Trujillo - El Porvenir - Inca Roca 1123', NULL, '2025-05-30 22:16:23'),
(22, 51, 'boleta', 'B001', 20, '75415418', NULL, NULL, 'Trujillo - El Porvenir - Inca Roca 1123', NULL, '2025-05-30 22:18:04'),
(23, 52, 'boleta', 'B001', 21, '75415418', NULL, NULL, 'Trujillo - El Porvenir - Inca Roca 1123', NULL, '2025-05-30 22:18:30'),
(24, 53, 'boleta', 'B001', 22, '75415418', NULL, NULL, 'Trujillo - El Porvenir - Inca Roca 1123', NULL, '2025-05-30 22:20:56'),
(25, 54, 'boleta', 'B001', 23, '75415418', NULL, NULL, 'Trujillo - El Porvenir - Inca Roca 1123', NULL, '2025-05-30 22:35:33'),
(26, 55, 'boleta', 'B001', 24, '75415418', NULL, NULL, 'Trujillo - El Porvenir - Inca Roca 1123', NULL, '2025-05-30 22:42:03'),
(27, 56, 'boleta', 'B001', 25, '75415418', NULL, NULL, 'Trujillo - El Porvenir - Inca Roca 1123', NULL, '2025-05-30 22:56:28'),
(28, 57, 'boleta', 'B001', 26, '75415418', NULL, NULL, 'Trujillo - El Porvenir - Inca Roca 1123', NULL, '2025-05-30 23:00:36'),
(29, 58, 'boleta', 'B001', 27, '75415418', NULL, NULL, 'Trujillo - El Porvenir - Inca Roca 1123', NULL, '2025-05-31 00:29:06'),
(30, 59, 'boleta', 'B001', 28, '75415418', NULL, NULL, 'Trujillo - El Porvenir - Inca Roca 1123', NULL, '2025-06-01 18:53:49'),
(31, 60, 'boleta', 'B001', 29, '33333333', NULL, NULL, 'Trujillo - Salaverry - siempre libre', NULL, '2025-06-01 19:00:24'),
(32, 61, 'boleta', 'B001', 30, '33333333', NULL, NULL, 'Trujillo - Salaverry - siempre libre', NULL, '2025-06-01 19:05:53'),
(33, 62, 'boleta', 'B001', 31, '33333333', NULL, NULL, 'Trujillo - Salaverry - siempre libre', NULL, '2025-06-03 02:56:14'),
(34, 63, 'boleta', 'B001', 32, '75415418', NULL, NULL, 'Trujillo - El Porvenir - Inca Roca 1123', NULL, '2025-06-13 05:08:38'),
(35, 64, 'boleta', 'B001', 33, '75415418', NULL, NULL, 'Trujillo - El Porvenir - Inca Roca 1123', NULL, '2025-06-30 14:28:25'),
(36, 65, 'boleta', 'B001', 34, '75415418', NULL, NULL, 'Trujillo - El Porvenir - Inca Roca 1123', NULL, '2025-07-01 15:37:02'),
(37, 66, 'boleta', 'B001', 35, '75415418', NULL, NULL, 'Trujillo - El Porvenir - Inca Roca 1123', NULL, '2025-07-14 14:08:37');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `detalle_pedido`
--

CREATE TABLE `detalle_pedido` (
  `id_detalle_pedido` int(11) NOT NULL,
  `id_pedido` int(11) NOT NULL,
  `id_producto` int(11) DEFAULT NULL,
  `id_menu` int(11) DEFAULT NULL,
  `cantidad` int(11) DEFAULT 1,
  `precio` decimal(10,2) DEFAULT NULL,
  `subtotal` decimal(10,2) DEFAULT NULL,
  `igv` decimal(10,2) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `detalle_pedido`
--

INSERT INTO `detalle_pedido` (`id_detalle_pedido`, `id_pedido`, `id_producto`, `id_menu`, `cantidad`, `precio`, `subtotal`, `igv`) VALUES
(1, 16, 3, NULL, 2, 15.50, 31.00, 4.73),
(2, 16, 5, NULL, 1, 8.75, 8.75, 1.33),
(3, 17, 1, NULL, 2, 12.00, 24.00, 3.66),
(4, 17, 29, NULL, 1, 4.00, 4.00, 0.61),
(5, 18, 1, NULL, 2, 12.00, 24.00, 3.66),
(6, 18, 29, NULL, 1, 4.00, 4.00, 0.61),
(7, 19, 1, NULL, 2, 12.00, 24.00, 3.66),
(8, 19, 29, NULL, 1, 4.00, 4.00, 0.61),
(9, 20, 1, NULL, 2, 12.00, 24.00, 3.66),
(10, 20, 29, NULL, 1, 4.00, 4.00, 0.61),
(11, 21, 1, NULL, 2, 12.00, 24.00, 3.66),
(12, 21, 29, NULL, 1, 4.00, 4.00, 0.61),
(13, 22, 1, NULL, 2, 12.00, 24.00, 3.66),
(14, 22, 29, NULL, 1, 4.00, 4.00, 0.61),
(15, 23, 1, NULL, 2, 12.00, 24.00, 3.66),
(16, 23, 29, NULL, 1, 4.00, 4.00, 0.61),
(17, 28, 1, NULL, 2, 12.00, 24.00, 3.66),
(18, 28, 17, NULL, 2, 3.00, 6.00, 0.92),
(19, 28, 2, NULL, 1, 14.00, 14.00, 2.14),
(20, 28, 3, NULL, 1, 15.00, 15.00, 2.29),
(21, 28, 18, NULL, 1, 3.00, 3.00, 0.46),
(22, 28, 19, NULL, 1, 3.00, 3.00, 0.46),
(23, 28, 13, NULL, 1, 22.00, 22.00, 3.36),
(24, 28, 30, NULL, 1, 3.50, 3.50, 0.53),
(25, 29, 1, NULL, 2, 12.00, 24.00, 3.66),
(26, 29, 17, NULL, 2, 3.00, 6.00, 0.92),
(27, 29, 2, NULL, 1, 14.00, 14.00, 2.14),
(28, 29, 3, NULL, 1, 15.00, 15.00, 2.29),
(29, 29, 18, NULL, 1, 3.00, 3.00, 0.46),
(30, 29, 19, NULL, 1, 3.00, 3.00, 0.46),
(31, 29, 13, NULL, 1, 22.00, 22.00, 3.36),
(32, 29, 30, NULL, 1, 3.50, 3.50, 0.53),
(33, 38, 1, NULL, 1, 12.00, 12.00, 1.83),
(34, 41, 1, NULL, 1, 12.00, 12.00, 1.83),
(35, 42, 1, NULL, 1, 12.00, 12.00, 1.83),
(36, 43, 7, NULL, 1, 16.50, 16.50, 2.52),
(37, 44, 1, NULL, 1, 12.00, 12.00, 1.83),
(38, 45, 1, NULL, 2, 12.00, 24.00, 3.66),
(39, 45, 32, NULL, 1, 4.50, 4.50, 0.69),
(40, 45, NULL, 1, 1, 18.00, 18.00, 2.75),
(41, 46, NULL, 1, 1, 18.00, 18.00, 2.75),
(42, 47, 1, NULL, 1, 12.00, 12.00, 1.83),
(43, 48, NULL, 1, 1, 18.00, 18.00, 2.75),
(44, 49, 1, NULL, 1, 12.00, 12.00, 1.83),
(45, 50, NULL, 1, 1, 18.00, 18.00, 2.75),
(46, 51, NULL, 1, 1, 18.00, 18.00, 2.75),
(47, 52, NULL, 1, 1, 18.00, 18.00, 2.75),
(48, 53, NULL, 1, 1, 18.00, 18.00, 2.75),
(49, 54, NULL, 1, 1, 18.00, 18.00, 2.75),
(50, 55, NULL, 1, 1, 18.00, 18.00, 2.75),
(51, 56, 3, NULL, 1, 15.00, 15.00, 2.29),
(52, 56, 31, NULL, 1, 4.00, 4.00, 0.61),
(53, 56, NULL, 1, 1, 18.00, 18.00, 2.75),
(54, 57, 5, NULL, 1, 18.00, 18.00, 2.75),
(55, 57, NULL, 1, 1, 18.00, 18.00, 2.75),
(56, 58, 31, NULL, 6, 4.00, 24.00, 3.66),
(57, 58, NULL, 3, 6, 28.00, 168.00, 25.63),
(58, 58, NULL, 1, 7, 18.00, 126.00, 19.22),
(59, 59, 1, NULL, 1, 12.00, 12.00, 1.83),
(60, 59, 31, NULL, 1, 4.00, 4.00, 0.61),
(61, 59, NULL, 1, 1, 18.00, 18.00, 2.75),
(62, 60, 31, NULL, 1, 4.00, 4.00, 0.61),
(63, 60, 14, NULL, 1, 24.00, 24.00, 3.66),
(64, 60, NULL, 1, 1, 18.00, 18.00, 2.75),
(65, 61, 5, NULL, 1, 18.00, 18.00, 2.75),
(66, 61, 23, NULL, 1, 4.00, 4.00, 0.61),
(67, 61, NULL, 1, 1, 18.00, 18.00, 2.75),
(68, 62, 1, NULL, 1, 12.00, 12.00, 1.83),
(69, 62, 23, NULL, 1, 4.00, 4.00, 0.61),
(70, 62, NULL, 1, 2, 18.00, 36.00, 5.49),
(71, 62, NULL, 2, 2, 49.00, 98.00, 14.95),
(72, 63, 28, NULL, 1, 3.00, 3.00, 0.46),
(73, 63, NULL, 3, 1, 28.00, 28.00, 4.27),
(74, 64, 2, NULL, 1, 14.00, 14.00, 2.14),
(75, 65, 1, NULL, 1, 12.00, 12.00, 1.83),
(76, 65, 2, NULL, 1, 14.00, 14.00, 2.14),
(77, 65, 3, NULL, 1, 15.00, 15.00, 2.29),
(78, 65, 4, NULL, 1, 16.00, 16.00, 2.44),
(79, 66, NULL, 1, 1, 18.00, 18.00, 2.75);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `menu`
--

CREATE TABLE `menu` (
  `id_menu` int(11) NOT NULL,
  `nombre` varchar(100) NOT NULL,
  `descripcion` text DEFAULT NULL,
  `imagen` varchar(255) DEFAULT NULL,
  `precio` decimal(10,2) NOT NULL,
  `tipo_menu` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `menu`
--

INSERT INTO `menu` (`id_menu`, `nombre`, `descripcion`, `imagen`, `precio`, `tipo_menu`) VALUES
(1, 'Menú Personal', 'Una hamburguesa a elección con bebida', 'menuPersonal.jpg', 18.00, 'personal'),
(2, 'Menú Familiar', 'Combo familiar con 3 hamburguesas y 3 bebidas', 'menuFamiliar.jpg', 49.00, 'familiar'),
(3, 'Menú Ejecutivo', 'Hamburguesa gourmet con bebida y acompañamiento', 'menuEjecutivo.jpg', 28.00, 'ejecutivo');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `menu_producto`
--

CREATE TABLE `menu_producto` (
  `id_menu` int(11) NOT NULL,
  `id_producto` int(11) NOT NULL,
  `cantidad` int(11) DEFAULT 1
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `menu_producto`
--

INSERT INTO `menu_producto` (`id_menu`, `id_producto`, `cantidad`) VALUES
(1, 1, 1),
(1, 17, 1),
(2, 1, 1),
(2, 2, 1),
(2, 3, 1),
(2, 17, 1),
(2, 18, 1),
(2, 19, 1),
(3, 13, 1),
(3, 30, 1);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `metodo_pago`
--

CREATE TABLE `metodo_pago` (
  `id_metodo_pago` int(11) NOT NULL,
  `id_cliente` int(11) NOT NULL,
  `nombre` varchar(100) DEFAULT NULL,
  `numero` varchar(50) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `metodo_pago`
--

INSERT INTO `metodo_pago` (`id_metodo_pago`, `id_cliente`, `nombre`, `numero`) VALUES
(1, 1, 'Trjeta Visa', '4111111111111111'),
(2, 1, 'yape', '999999999'),
(3, 1, 'plin', '344543534454'),
(4, 1, 'InterBank', '848489349343');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `pedido`
--

CREATE TABLE `pedido` (
  `id_pedido` int(11) NOT NULL,
  `id_cliente` int(11) DEFAULT NULL,
  `id_metodo_pago` int(11) DEFAULT NULL,
  `fecha` timestamp NOT NULL DEFAULT current_timestamp(),
  `subtotal` decimal(10,2) NOT NULL,
  `igv` decimal(10,2) NOT NULL,
  `descuento` decimal(10,2) DEFAULT 0.00,
  `total` decimal(10,2) NOT NULL,
  `direccion_entrega` text DEFAULT NULL,
  `metodo_envio` varchar(100) DEFAULT NULL,
  `notas` text DEFAULT NULL,
  `puntos_usados` int(11) DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `pedido`
--

INSERT INTO `pedido` (`id_pedido`, `id_cliente`, `id_metodo_pago`, `fecha`, `subtotal`, `igv`, `descuento`, `total`, `direccion_entrega`, `metodo_envio`, `notas`, `puntos_usados`) VALUES
(16, 1, 1, '2025-05-25 17:39:39', 39.75, 6.06, 0.00, 39.75, 'Av. Siempre Viva 742', 'repartidor', 'Por favor, sin cebolla', 0),
(17, 1, 2, '2025-05-25 17:43:15', 28.00, 4.27, 0.00, 28.00, 'Trujillo - El Porvenir - Inca Roca 1123', 'Delivery estándar', NULL, 0),
(18, 1, 2, '2025-05-25 17:43:20', 28.00, 4.27, 0.00, 28.00, 'Trujillo - El Porvenir - Inca Roca 1123', 'Delivery estándar', NULL, 0),
(19, 1, 1, '2025-05-25 17:49:10', 28.00, 4.27, 0.00, 28.00, 'Trujillo - El Porvenir - Inca Roca 1123', 'Delivery estándar', NULL, 0),
(20, 1, 2, '2025-05-25 17:54:32', 28.00, 4.27, 0.00, 28.00, 'Trujillo - El Porvenir - Inca Roca 1123', 'Delivery estándar', NULL, 0),
(21, 1, 2, '2025-05-25 17:55:16', 28.00, 4.27, 0.00, 28.00, 'Trujillo - El Porvenir - Inca Roca 1123', 'Delivery estándar', NULL, 0),
(22, 1, 2, '2025-05-25 17:56:01', 28.00, 4.27, 0.00, 28.00, 'Trujillo - El Porvenir - Inca Roca 1123', 'Delivery estándar', NULL, 0),
(23, 1, 1, '2025-05-25 18:21:11', 28.00, 4.27, 0.00, 28.00, 'Trujillo - El Porvenir - Inca Roca 1123', 'Delivery estándar', NULL, 0),
(24, 1, 1, '2025-05-27 03:18:26', 30.00, 4.58, 0.00, 30.00, 'Trujillo - El Porvenir - Inca Roca 1123', '', '', 0),
(25, 1, 2, '2025-05-27 03:18:51', 30.00, 4.58, 0.00, 30.00, 'Trujillo - El Porvenir - Inca Roca 1123', '', '', 0),
(26, 1, 2, '2025-05-30 00:44:53', 30.00, 4.58, 0.00, 30.00, 'Trujillo - El Porvenir - Inca Roca 1123', '', '', 0),
(27, 1, 1, '2025-05-30 00:45:45', 30.00, 4.58, 0.00, 30.00, 'Trujillo - El Porvenir - Inca Roca 1123', '', '', 0),
(28, 1, 1, '2025-05-30 00:55:05', 106.50, 16.25, 0.00, 106.50, 'Trujillo - El Porvenir - Inca Roca 1123', '', '', 0),
(29, 1, 1, '2025-05-30 00:56:02', 106.50, 16.25, 0.00, 106.50, 'Trujillo - El Porvenir - Inca Roca 1123', '', '', 0),
(30, 1, 1, '2025-05-30 01:19:16', 111.00, 16.93, 0.00, 111.00, 'Trujillo - El Porvenir - Inca Roca 1123', '', '', 0),
(31, 1, 1, '2025-05-30 01:24:49', 34.50, 5.26, 0.00, 34.50, 'Trujillo - El Porvenir - Inca Roca 1123', '', '', 0),
(32, 1, 1, '2025-05-30 01:25:06', 34.50, 5.26, 0.00, 34.50, 'Trujillo - El Porvenir - Inca Roca 1123', '', '', 0),
(33, 1, 1, '2025-05-30 01:38:26', 34.50, 5.26, 0.00, 34.50, 'Trujillo - El Porvenir - Inca Roca 1123', NULL, NULL, 0),
(34, 1, 2, '2025-05-30 01:39:19', 12.00, 1.83, 0.00, 12.00, 'Trujillo - El Porvenir - Inca Roca 1123', NULL, NULL, 0),
(35, 1, 1, '2025-05-30 01:42:02', 12.00, 1.83, 0.00, 12.00, 'Trujillo - El Porvenir - Inca Roca 1123', NULL, NULL, 0),
(36, 1, 1, '2025-05-30 01:00:57', 12.00, 1.83, 0.00, 12.00, 'Trujillo - El Porvenir - Inca Roca 1123', NULL, NULL, 0),
(37, 1, 1, '2025-05-30 01:06:04', 12.00, 1.83, 0.00, 12.00, 'Trujillo - El Porvenir - Inca Roca 1123', NULL, NULL, 0),
(38, 1, 1, '2025-05-30 01:06:38', 12.00, 1.83, 0.00, 12.00, 'Trujillo - El Porvenir - Inca Roca 1123', NULL, NULL, 0),
(39, 1, 1, '2025-05-30 01:07:01', 18.00, 2.75, 0.00, 18.00, 'Trujillo - El Porvenir - Inca Roca 1123', NULL, NULL, 0),
(40, 1, 1, '2025-05-30 01:07:17', 18.00, 2.75, 0.00, 18.00, 'Trujillo - El Porvenir - Inca Roca 1123', NULL, NULL, 0),
(41, 1, 2, '2025-05-30 01:11:54', 12.00, 1.83, 0.00, 12.00, 'Trujillo - El Porvenir - Inca Roca 1123', NULL, NULL, 0),
(42, 1, 2, '2025-05-30 01:17:09', 12.00, 1.83, 0.00, 12.00, 'Trujillo - El Porvenir - Inca Roca 1123', NULL, NULL, 0),
(43, 1, 1, '2025-05-30 21:40:00', 16.50, 2.52, 0.00, 16.50, 'Trujillo - El Porvenir - Inca Roca 1123', NULL, NULL, 0),
(44, 1, 1, '2025-05-30 21:40:24', 12.00, 1.83, 0.00, 12.00, 'Trujillo - El Porvenir - Inca Roca 1123', NULL, NULL, 0),
(45, 1, 1, '2025-05-30 21:55:59', 46.50, 7.09, 0.00, 46.50, 'Trujillo - El Porvenir - Inca Roca 1123', NULL, NULL, 0),
(46, 1, 1, '2025-05-30 21:56:11', 18.00, 2.75, 0.00, 18.00, 'Trujillo - El Porvenir - Inca Roca 1123', NULL, NULL, 0),
(47, 1, 1, '2025-05-30 21:56:22', 12.00, 1.83, 0.00, 12.00, 'Trujillo - El Porvenir - Inca Roca 1123', NULL, NULL, 0),
(48, 1, 3, '2025-05-30 22:12:51', 18.00, 2.75, 0.00, 18.00, 'Trujillo - El Porvenir - Inca Roca 1123', NULL, NULL, 0),
(49, 1, 2, '2025-05-30 22:15:35', 12.00, 1.83, 0.00, 12.00, 'Trujillo - El Porvenir - Inca Roca 1123', NULL, NULL, 0),
(50, 1, 3, '2025-05-30 22:16:23', 18.00, 2.75, 0.00, 18.00, 'Trujillo - El Porvenir - Inca Roca 1123', NULL, NULL, 0),
(51, 1, 3, '2025-05-30 22:18:04', 18.00, 2.75, 0.00, 18.00, 'Trujillo - El Porvenir - Inca Roca 1123', NULL, NULL, 0),
(52, 1, 3, '2025-05-30 22:18:30', 18.00, 2.75, 0.00, 18.00, 'Trujillo - El Porvenir - Inca Roca 1123', NULL, NULL, 0),
(53, 1, 1, '2025-05-30 22:20:56', 18.00, 2.75, 0.00, 18.00, 'Trujillo - El Porvenir - Inca Roca 1123', NULL, NULL, 0),
(54, 1, 1, '2025-05-30 22:35:32', 18.00, 2.75, 0.00, 18.00, 'Trujillo - El Porvenir - Inca Roca 1123', NULL, NULL, 0),
(55, 1, 1, '2025-05-30 22:42:03', 18.00, 2.75, 0.00, 18.00, 'Trujillo - El Porvenir - Inca Roca 1123', NULL, NULL, 0),
(56, 1, 3, '2025-05-30 22:56:28', 37.00, 5.64, 0.00, 37.00, 'Trujillo - El Porvenir - Inca Roca 1123', NULL, NULL, 0),
(57, 1, 2, '2025-05-30 23:00:36', 36.00, 5.49, 0.00, 36.00, 'Trujillo - El Porvenir - Inca Roca 1123', NULL, NULL, 0),
(58, 1, 4, '2025-05-31 00:29:06', 318.00, 48.51, 0.00, 318.00, 'Trujillo - El Porvenir - Inca Roca 1123', NULL, NULL, 0),
(59, 1, 2, '2025-06-01 18:53:49', 27.88, 6.12, 0.00, 34.00, 'Trujillo - El Porvenir - Inca Roca 1123', NULL, NULL, 0),
(60, 3, 4, '2025-06-01 19:00:24', 37.72, 8.28, 0.00, 46.00, 'Trujillo - Salaverry - siempre libre', NULL, NULL, 0),
(61, 3, 3, '2025-06-01 19:05:53', 32.80, 7.20, 0.00, 40.00, 'Trujillo - Salaverry - siempre libre', NULL, NULL, 0),
(62, 3, 2, '2025-06-03 02:56:14', 123.00, 27.00, 0.00, 150.00, 'Trujillo - Salaverry - siempre libre', NULL, NULL, 0),
(63, 1, 4, '2025-06-13 05:08:38', 25.42, 5.58, 0.00, 31.00, 'Trujillo - El Porvenir - Inca Roca 1123', NULL, NULL, 0),
(64, 1, 2, '2025-06-30 14:28:25', 11.48, 2.52, 0.00, 14.00, 'Trujillo - El Porvenir - Inca Roca 1123', NULL, NULL, 0),
(65, 1, 1, '2025-07-01 15:37:02', 46.74, 10.26, 0.00, 57.00, 'Trujillo - El Porvenir - Inca Roca 1123', NULL, NULL, 0),
(66, 1, 1, '2025-07-14 14:08:37', 14.76, 3.24, 0.00, 18.00, 'Trujillo - El Porvenir - Inca Roca 1123', NULL, NULL, 0);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `producto`
--

CREATE TABLE `producto` (
  `id_producto` int(11) NOT NULL,
  `nombre` varchar(100) NOT NULL,
  `descripcion` text DEFAULT NULL,
  `imagen` varchar(255) DEFAULT NULL,
  `precio` decimal(10,2) NOT NULL,
  `stock` int(11) DEFAULT 0,
  `id_tipo_producto` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `producto`
--

INSERT INTO `producto` (`id_producto`, `nombre`, `descripcion`, `imagen`, `precio`, `stock`, `id_tipo_producto`) VALUES
(1, 'Hamburguesa Clásica', 'Carne de res, queso, lechuga, tomate', 'hamburguesaClasica.jpg', 12.00, 0, 1),
(2, 'Hamburguesa con Queso Cheddar', 'Carne de res, queso cheddar, lechuga, tomate', 'hamburguesaQuesoCheddar.jpg', 14.00, 0, 1),
(3, 'Hamburguesa BBQ', 'Carne de res, cebolla caramelizada, salsa barbacoa', 'hamburguesaBBQ.jpg', 15.00, 0, 1),
(4, 'Hamburguesa con Bacon', 'Carne de res, bacon, lechuga, tomate', 'hamburguesaBacon.jpg', 16.00, 0, 1),
(5, 'Hamburguesa Bacon & Cheese', 'Carne de res, bacon, queso cheddar', 'hamburguesaBacon&Chesse.jpg', 18.00, 0, 2),
(6, 'Hamburguesa Mexicana', 'Carne de res, guacamole, jalapeños, salsa picante', 'hamburguesaMexicana.jpg', 17.00, 0, 2),
(7, 'Hamburguesa Hawaiana', 'Carne de res, piña, jamón, queso', 'hamburguesaHawaina.jpg', 16.50, 0, 2),
(8, 'Hamburguesa Picante', 'Carne de res, jalapeños, cebolla morada, salsa picante', 'hamburguesaPicante.jpg', 17.50, 0, 2),
(9, 'Hamburguesa Vegana de Tofu', 'Tofu, aguacate, lechuga, tomate', 'hamburguesaTofu.jpg', 14.00, 0, 3),
(10, 'Hamburguesa Vegana de Garbanzos', 'Garbanzos, vegetales, mayonesa vegana', 'hamburguesaGarbanzo.jpg', 15.00, 0, 3),
(11, 'Hamburguesa Vegana de Quinoa', 'Quinoa, aguacate, cebolla caramelizada', 'hamburguesaQuinoa.jpg', 16.00, 0, 3),
(12, 'Hamburguesa Vegana con Lentejas', 'Lentejas, zanahoria, pepino', 'hamburguesaLentejas.jpg', 15.50, 0, 3),
(13, 'Hamburguesa Truffle', 'Carne de res, queso parmesano, trufa, rúcula', 'hamburguesaTruffle.jpg', 22.00, 0, 4),
(14, 'Hamburguesa con Foie Gras', 'Carne de res, foie gras, cebolla caramelizada', 'hamburguesaFoie.jpg', 24.00, 0, 4),
(15, 'Hamburguesa Gourmet de Res y Pato', 'Res, pato, cebollas rojas', 'hamburguesaRes.jpg', 25.00, 0, 4),
(16, 'Hamburguesa Mediterránea', 'Carne de res, feta, aceitunas, tomate seco', 'hamburguesaMediterranea.jpg', 23.00, 0, 4),
(17, 'Coca-Cola', 'Botella de 500ml de Coca-Cola', 'bebidaCocacola.jpg', 3.00, 0, 5),
(18, 'Sprite', 'Botella de 500ml de Sprite', 'bebidaSprite.jpg', 3.00, 0, 5),
(19, 'Fanta', 'Botella de 500ml de Fanta', 'bebidaFanta.jpg', 3.00, 0, 5),
(20, 'Pepsi', 'Botella de 500ml de Pepsi', 'bebidaPepsi.jpg', 3.00, 0, 5),
(21, 'Jugo de Naranja', 'Vaso de jugo natural de naranja', 'jugoNaranja.jpg', 4.00, 0, 6),
(22, 'Jugo de Manzana', 'Vaso de jugo natural de manzana', 'jugoManzana.jpg', 4.00, 0, 6),
(23, 'Jugo de Piña', 'Vaso de jugo natural de piña', 'jugoPiña.jpg', 4.00, 0, 6),
(24, 'Jugo de Maracuyá', 'Vaso de jugo natural de maracuyá', 'jugoMaracuya.jpg', 4.00, 0, 6),
(25, 'Agua Mineral', 'Botella de agua mineral de 500ml', 'aguaMineral.jpg', 2.00, 0, 7),
(26, 'Agua con Gas', 'Botella de agua con gas de 500ml', 'aguaMineralGas.jpg', 2.50, 0, 7),
(27, 'Agua de Sabor (limón)', 'Botella de agua de sabor limón de 500ml', 'aguaMineralLimon.jpg', 2.50, 0, 7),
(28, 'Agua de Coco', 'Botella de agua de coco de 500ml', 'aguaCoco.jpg', 3.00, 0, 7),
(29, 'Chicha Morada', 'Vaso de chicha morada', 'chichaMorada.jpg', 4.00, 0, 8),
(30, 'Inca Kola', 'Botella de 500ml de Inca Kola', 'incaKola.jpg', 3.50, 0, 8),
(31, 'Emoliente', 'Vaso de emoliente tradicional', 'emoliente.jpg', 4.00, 0, 8),
(32, 'Té Helado Casero', 'Vaso de té helado casero (de hierbas o frutas)', 'teHelado.jpg', 4.50, 0, 8);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `tipo_producto`
--

CREATE TABLE `tipo_producto` (
  `id_tipo_producto` int(11) NOT NULL,
  `nombre` varchar(100) NOT NULL,
  `imagen` varchar(255) DEFAULT NULL,
  `id_categoria` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `tipo_producto`
--

INSERT INTO `tipo_producto` (`id_tipo_producto`, `nombre`, `imagen`, `id_categoria`) VALUES
(1, 'Hamburguesas Clásicas', 'HamburguesasClasicas.jpg', 1),
(2, 'Hamburguesas Especiales', 'HamburguesasEspeciales.jpg', 1),
(3, 'Hamburguesas Veganas', 'HamburguesasVeganas.jpg', 1),
(4, 'Hamburguesas Gourmet', 'hamburguesasGourmet.jpg', 1),
(5, 'Refrescos', 'refrescos.jpg', 2),
(6, 'Jugos Naturales', 'jugosNaturales.jpg', 2),
(7, 'Agua', 'agua.jpg', 2),
(8, 'Bebidas Tradicionales', 'bebidasTradicionales.jpg', 2);

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `admin`
--
ALTER TABLE `admin`
  ADD PRIMARY KEY (`id_admin`),
  ADD UNIQUE KEY `email` (`email`);

--
-- Indices de la tabla `categoria`
--
ALTER TABLE `categoria`
  ADD PRIMARY KEY (`id_categoria`);

--
-- Indices de la tabla `cliente`
--
ALTER TABLE `cliente`
  ADD PRIMARY KEY (`id_cliente`),
  ADD UNIQUE KEY `email` (`email`);

--
-- Indices de la tabla `comprobante`
--
ALTER TABLE `comprobante`
  ADD PRIMARY KEY (`id_comprobante`),
  ADD KEY `id_pedido` (`id_pedido`);

--
-- Indices de la tabla `detalle_pedido`
--
ALTER TABLE `detalle_pedido`
  ADD PRIMARY KEY (`id_detalle_pedido`),
  ADD KEY `id_pedido` (`id_pedido`),
  ADD KEY `id_producto` (`id_producto`),
  ADD KEY `id_menu` (`id_menu`);

--
-- Indices de la tabla `menu`
--
ALTER TABLE `menu`
  ADD PRIMARY KEY (`id_menu`);

--
-- Indices de la tabla `menu_producto`
--
ALTER TABLE `menu_producto`
  ADD PRIMARY KEY (`id_menu`,`id_producto`),
  ADD KEY `id_producto` (`id_producto`);

--
-- Indices de la tabla `metodo_pago`
--
ALTER TABLE `metodo_pago`
  ADD PRIMARY KEY (`id_metodo_pago`),
  ADD KEY `id_cliente` (`id_cliente`);

--
-- Indices de la tabla `pedido`
--
ALTER TABLE `pedido`
  ADD PRIMARY KEY (`id_pedido`),
  ADD KEY `id_cliente` (`id_cliente`),
  ADD KEY `fk_pedido_metodo_pago` (`id_metodo_pago`);

--
-- Indices de la tabla `producto`
--
ALTER TABLE `producto`
  ADD PRIMARY KEY (`id_producto`),
  ADD KEY `id_tipo_producto` (`id_tipo_producto`);

--
-- Indices de la tabla `tipo_producto`
--
ALTER TABLE `tipo_producto`
  ADD PRIMARY KEY (`id_tipo_producto`),
  ADD KEY `id_categoria` (`id_categoria`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `admin`
--
ALTER TABLE `admin`
  MODIFY `id_admin` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT de la tabla `categoria`
--
ALTER TABLE `categoria`
  MODIFY `id_categoria` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT de la tabla `cliente`
--
ALTER TABLE `cliente`
  MODIFY `id_cliente` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT de la tabla `comprobante`
--
ALTER TABLE `comprobante`
  MODIFY `id_comprobante` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=38;

--
-- AUTO_INCREMENT de la tabla `detalle_pedido`
--
ALTER TABLE `detalle_pedido`
  MODIFY `id_detalle_pedido` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=80;

--
-- AUTO_INCREMENT de la tabla `menu`
--
ALTER TABLE `menu`
  MODIFY `id_menu` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT de la tabla `metodo_pago`
--
ALTER TABLE `metodo_pago`
  MODIFY `id_metodo_pago` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT de la tabla `pedido`
--
ALTER TABLE `pedido`
  MODIFY `id_pedido` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=67;

--
-- AUTO_INCREMENT de la tabla `producto`
--
ALTER TABLE `producto`
  MODIFY `id_producto` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=33;

--
-- AUTO_INCREMENT de la tabla `tipo_producto`
--
ALTER TABLE `tipo_producto`
  MODIFY `id_tipo_producto` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `comprobante`
--
ALTER TABLE `comprobante`
  ADD CONSTRAINT `comprobante_ibfk_1` FOREIGN KEY (`id_pedido`) REFERENCES `pedido` (`id_pedido`);

--
-- Filtros para la tabla `detalle_pedido`
--
ALTER TABLE `detalle_pedido`
  ADD CONSTRAINT `detalle_pedido_ibfk_1` FOREIGN KEY (`id_pedido`) REFERENCES `pedido` (`id_pedido`),
  ADD CONSTRAINT `detalle_pedido_ibfk_2` FOREIGN KEY (`id_producto`) REFERENCES `producto` (`id_producto`),
  ADD CONSTRAINT `detalle_pedido_ibfk_3` FOREIGN KEY (`id_menu`) REFERENCES `menu` (`id_menu`);

--
-- Filtros para la tabla `menu_producto`
--
ALTER TABLE `menu_producto`
  ADD CONSTRAINT `menu_producto_ibfk_1` FOREIGN KEY (`id_menu`) REFERENCES `menu` (`id_menu`),
  ADD CONSTRAINT `menu_producto_ibfk_2` FOREIGN KEY (`id_producto`) REFERENCES `producto` (`id_producto`);

--
-- Filtros para la tabla `metodo_pago`
--
ALTER TABLE `metodo_pago`
  ADD CONSTRAINT `metodo_pago_ibfk_1` FOREIGN KEY (`id_cliente`) REFERENCES `cliente` (`id_cliente`);

--
-- Filtros para la tabla `pedido`
--
ALTER TABLE `pedido`
  ADD CONSTRAINT `fk_pedido_metodo_pago` FOREIGN KEY (`id_metodo_pago`) REFERENCES `metodo_pago` (`id_metodo_pago`),
  ADD CONSTRAINT `pedido_ibfk_1` FOREIGN KEY (`id_cliente`) REFERENCES `cliente` (`id_cliente`);

--
-- Filtros para la tabla `producto`
--
ALTER TABLE `producto`
  ADD CONSTRAINT `producto_ibfk_1` FOREIGN KEY (`id_tipo_producto`) REFERENCES `tipo_producto` (`id_tipo_producto`);

--
-- Filtros para la tabla `tipo_producto`
--
ALTER TABLE `tipo_producto`
  ADD CONSTRAINT `tipo_producto_ibfk_1` FOREIGN KEY (`id_categoria`) REFERENCES `categoria` (`id_categoria`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
