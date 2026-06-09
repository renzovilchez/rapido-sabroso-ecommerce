SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";

CREATE TABLE `admin` (
  `id_admin` int(11) NOT NULL,
  `nombre` varchar(100) NOT NULL,
  `apellidos` varchar(100) DEFAULT '',
  `email` varchar(100) NOT NULL,
  `password` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

CREATE TABLE `categoria` (
  `id_categoria` int(11) NOT NULL,
  `nombre` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

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

CREATE TABLE `menu` (
  `id_menu` int(11) NOT NULL,
  `nombre` varchar(100) NOT NULL,
  `descripcion` text DEFAULT NULL,
  `imagen` varchar(255) DEFAULT NULL,
  `precio` decimal(10,2) NOT NULL,
  `tipo_menu` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

CREATE TABLE `menu_producto` (
  `id_menu` int(11) NOT NULL,
  `id_producto` int(11) NOT NULL,
  `cantidad` int(11) DEFAULT 1
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

CREATE TABLE `metodo_pago` (
  `id_metodo_pago` int(11) NOT NULL,
  `id_cliente` int(11) NOT NULL,
  `nombre` varchar(100) DEFAULT NULL,
  `numero` varchar(50) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

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

CREATE TABLE `producto` (
  `id_producto` int(11) NOT NULL,
  `nombre` varchar(100) NOT NULL,
  `descripcion` text DEFAULT NULL,
  `imagen` varchar(255) DEFAULT NULL,
  `precio` decimal(10,2) NOT NULL,
  `stock` int(11) DEFAULT 0,
  `id_tipo_producto` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

CREATE TABLE `tipo_producto` (
  `id_tipo_producto` int(11) NOT NULL,
  `nombre` varchar(100) NOT NULL,
  `imagen` varchar(255) DEFAULT NULL,
  `id_categoria` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- Datos: admin (password: 123456)
INSERT INTO `admin` (`id_admin`, `nombre`, `apellidos`, `email`, `password`) VALUES
(1, 'Renzo', 'Vilchez', 'renzo@gmail.com', '$2b$10$833YMoNtSuXyncgbptIROuGRWY8cW.Y6mT/nXdWPibJYZsGgvunSa');

-- Datos: categorias
INSERT INTO `categoria` (`id_categoria`, `nombre`) VALUES
(1, 'Hamburguesas'),
(2, 'Bebidas');

-- Datos: tipos de producto
INSERT INTO `tipo_producto` (`id_tipo_producto`, `nombre`, `imagen`, `id_categoria`) VALUES
(1, 'Hamburguesas Clásicas', 'HamburguesasClasicas.jpg', 1),
(2, 'Hamburguesas Especiales', 'HamburguesasEspeciales.jpg', 1),
(3, 'Hamburguesas Veganas', 'HamburguesasVeganas.jpg', 1),
(4, 'Hamburguesas Gourmet', 'hamburguesasGourmet.jpg', 1),
(5, 'Refrescos', 'refrescos.jpg', 2),
(6, 'Jugos Naturales', 'jugosNaturales.jpg', 2),
(7, 'Agua', 'agua.jpg', 2),
(8, 'Bebidas Tradicionales', 'bebidasTradicionales.jpg', 2);

-- Datos: productos
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

-- Datos: combos
INSERT INTO `menu` (`id_menu`, `nombre`, `descripcion`, `imagen`, `precio`, `tipo_menu`) VALUES
(1, 'Menú Personal', 'Una hamburguesa a elección con bebida', 'menuPersonal.jpg', 18.00, 'personal'),
(2, 'Menú Familiar', 'Combo familiar con 3 hamburguesas y 3 bebidas', 'menuFamiliar.jpg', 49.00, 'familiar'),
(3, 'Menú Ejecutivo', 'Hamburguesa gourmet con bebida y acompañamiento', 'menuEjecutivo.jpg', 28.00, 'ejecutivo');

-- Datos: productos de cada combo
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

-- Indices
ALTER TABLE `admin` ADD PRIMARY KEY (`id_admin`), ADD UNIQUE KEY `email` (`email`);
ALTER TABLE `categoria` ADD PRIMARY KEY (`id_categoria`);
ALTER TABLE `cliente` ADD PRIMARY KEY (`id_cliente`), ADD UNIQUE KEY `email` (`email`);
ALTER TABLE `comprobante` ADD PRIMARY KEY (`id_comprobante`), ADD KEY `id_pedido` (`id_pedido`);
ALTER TABLE `detalle_pedido` ADD PRIMARY KEY (`id_detalle_pedido`), ADD KEY `id_pedido` (`id_pedido`), ADD KEY `id_producto` (`id_producto`), ADD KEY `id_menu` (`id_menu`);
ALTER TABLE `menu` ADD PRIMARY KEY (`id_menu`);
ALTER TABLE `menu_producto` ADD PRIMARY KEY (`id_menu`,`id_producto`), ADD KEY `id_producto` (`id_producto`);
ALTER TABLE `metodo_pago` ADD PRIMARY KEY (`id_metodo_pago`), ADD KEY `id_cliente` (`id_cliente`);
ALTER TABLE `pedido` ADD PRIMARY KEY (`id_pedido`), ADD KEY `id_cliente` (`id_cliente`), ADD KEY `fk_pedido_metodo_pago` (`id_metodo_pago`);
ALTER TABLE `producto` ADD PRIMARY KEY (`id_producto`), ADD KEY `id_tipo_producto` (`id_tipo_producto`);
ALTER TABLE `tipo_producto` ADD PRIMARY KEY (`id_tipo_producto`), ADD KEY `id_categoria` (`id_categoria`);

-- Auto-increment
ALTER TABLE `admin` MODIFY `id_admin` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;
ALTER TABLE `categoria` MODIFY `id_categoria` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;
ALTER TABLE `cliente` MODIFY `id_cliente` int(11) NOT NULL AUTO_INCREMENT;
ALTER TABLE `comprobante` MODIFY `id_comprobante` int(11) NOT NULL AUTO_INCREMENT;
ALTER TABLE `detalle_pedido` MODIFY `id_detalle_pedido` int(11) NOT NULL AUTO_INCREMENT;
ALTER TABLE `menu` MODIFY `id_menu` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;
ALTER TABLE `metodo_pago` MODIFY `id_metodo_pago` int(11) NOT NULL AUTO_INCREMENT;
ALTER TABLE `pedido` MODIFY `id_pedido` int(11) NOT NULL AUTO_INCREMENT;
ALTER TABLE `producto` MODIFY `id_producto` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=33;
ALTER TABLE `tipo_producto` MODIFY `id_tipo_producto` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

-- Foreign keys
ALTER TABLE `comprobante` ADD CONSTRAINT `comprobante_ibfk_1` FOREIGN KEY (`id_pedido`) REFERENCES `pedido` (`id_pedido`);
ALTER TABLE `detalle_pedido` ADD CONSTRAINT `detalle_pedido_ibfk_1` FOREIGN KEY (`id_pedido`) REFERENCES `pedido` (`id_pedido`), ADD CONSTRAINT `detalle_pedido_ibfk_2` FOREIGN KEY (`id_producto`) REFERENCES `producto` (`id_producto`), ADD CONSTRAINT `detalle_pedido_ibfk_3` FOREIGN KEY (`id_menu`) REFERENCES `menu` (`id_menu`);
ALTER TABLE `menu_producto` ADD CONSTRAINT `menu_producto_ibfk_1` FOREIGN KEY (`id_menu`) REFERENCES `menu` (`id_menu`), ADD CONSTRAINT `menu_producto_ibfk_2` FOREIGN KEY (`id_producto`) REFERENCES `producto` (`id_producto`);
ALTER TABLE `metodo_pago` ADD CONSTRAINT `metodo_pago_ibfk_1` FOREIGN KEY (`id_cliente`) REFERENCES `cliente` (`id_cliente`);
ALTER TABLE `pedido` ADD CONSTRAINT `fk_pedido_metodo_pago` FOREIGN KEY (`id_metodo_pago`) REFERENCES `metodo_pago` (`id_metodo_pago`), ADD CONSTRAINT `pedido_ibfk_1` FOREIGN KEY (`id_cliente`) REFERENCES `cliente` (`id_cliente`);
ALTER TABLE `producto` ADD CONSTRAINT `producto_ibfk_1` FOREIGN KEY (`id_tipo_producto`) REFERENCES `tipo_producto` (`id_tipo_producto`);
ALTER TABLE `tipo_producto` ADD CONSTRAINT `tipo_producto_ibfk_1` FOREIGN KEY (`id_categoria`) REFERENCES `categoria` (`id_categoria`);

COMMIT;
