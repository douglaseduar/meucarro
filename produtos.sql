-- phpMyAdmin SQL Dump
-- version 5.0.2
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Tempo de geração: 23-Mar-2022 às 00:58
-- Versão do servidor: 10.4.14-MariaDB
-- versão do PHP: 7.4.9

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Banco de dados: `bdnodejs`
--
-- --------------------------------------------------------

--
-- Estrutura da tabela `produtos`
--

CREATE TABLE `produtos` (
  `id` int(11) NOT NULL,
  `titulo` varchar(50) NOT NULL,
  `descricao` varchar(200) NOT NULL,
  `img` varchar(200) NOT NULL,
  `preco` float NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Índices para tabelas despejadas
--

--
-- Índices para tabela `produtos`
--
ALTER TABLE `produtos`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT de tabelas despejadas
--

--
-- AUTO_INCREMENT de tabela `produtos`
--
ALTER TABLE `produtos`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;


INSERT INTO `produtos` (`id`, `titulo`, `descricao`, `img`, `preco`) VALUES 
(NULL, 'Tênis Adidas', 'um tênis muito lindo', 'https://assets.adidas.com/images/h_840,f_auto,q_auto,fl_lossy,c_fill,g_auto/a10e46a2baba4f149b49adcb010ac9fb_9366/Tenis_Ultraboost_Web_DNA_Branco_GZ1593_01_standard.jpg', '250'), 
(NULL, 'Teclado Mecanico', 'teclado com led', 'https://m.media-amazon.com/images/I/6171brX+s5L._AC_SY450_.jpg', '320'),
(NULL, 'Corolla 2020', 'motor 2.0 / vermelho', 'https://toyota.itavema.com.br/media/catalog/product/cache/1/thumbnail/640x450/9df78eab33525d08d6e5fb8d27136e95/n/o/novo_corolla_h_brido_altis_premium_1.8_2020-vermelho.jpg', '30500'),
(NULL, 'Mesa de sinuca', 'tamanho profissional', 'https://m.media-amazon.com/images/I/61r4nGuMBoL._AC_SY450_.jpg', '12')
