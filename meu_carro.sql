-- phpMyAdmin SQL Dump
-- version 5.1.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Tempo de geração: 12-Jun-2022 às 22:52
-- Versão do servidor: 10.4.22-MariaDB
-- versão do PHP: 8.0.13

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Banco de dados: `meu_carro`
--

-- --------------------------------------------------------

--
-- Estrutura da tabela `agendamento`
--

CREATE TABLE `agendamento` (
  `id` int(11) NOT NULL,
  `fk_placa` int(11) NOT NULL,
  `obeservacao` varchar(300) NOT NULL,
  `km` varchar(20) NOT NULL,
  `oleo` varchar(30) NOT NULL,
  `filtro_oleo` varchar(30) NOT NULL,
  `filtro_ar` varchar(30) NOT NULL,
  `filtro_arcondicionado` varchar(30) NOT NULL,
  `filtro_gasolina` varchar(30) NOT NULL,
  `filtro_hidraulico` varchar(30) NOT NULL,
  `filtro_racor` varchar(30) NOT NULL,
  `data` varchar(30) NOT NULL,
  `realizado` smallint(6) NOT NULL,
  `fk_cliente` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Extraindo dados da tabela `agendamento`
--

INSERT INTO `agendamento` (`id`, `fk_placa`, `obeservacao`, `km`, `oleo`, `filtro_oleo`, `filtro_ar`, `filtro_arcondicionado`, `filtro_gasolina`, `filtro_hidraulico`, `filtro_racor`, `data`, `realizado`, `fk_cliente`) VALUES
(3, 9, 'teste', '', '', '<i class=\"bi bi-check-lg\"></i>', '', '', '', '', '', '2022-06-14T15:02', 0, 1);

-- --------------------------------------------------------

--
-- Estrutura da tabela `cliente`
--

CREATE TABLE `cliente` (
  `id` int(11) NOT NULL,
  `nome` varchar(100) NOT NULL,
  `telefone` varchar(11) NOT NULL,
  `sessionid` varchar(200) NOT NULL,
  `permicao` smallint(6) NOT NULL,
  `email` varchar(50) NOT NULL,
  `senha` varchar(200) NOT NULL,
  `endereco` varchar(500) NOT NULL,
  `foto` varchar(500) NOT NULL,
  `fidelidade` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Extraindo dados da tabela `cliente`
--

INSERT INTO `cliente` (`id`, `nome`, `telefone`, `sessionid`, `permicao`, `email`, `senha`, `endereco`, `foto`, `fidelidade`) VALUES
(1, 'Douglas Eduardo Machado', '42999750210', '', 1, 'douglas060401@gmail.com', '123456', 'Rua Eduardo de Carvalho', 'https://scontent.fxap4-1.fna.fbcdn.net/v/t1.6435-9/83547733_2544347319018524_6769433203745751040_n.jpg?_nc_cat=111&ccb=1-7&_nc_sid=09cbfe&_nc_ohc=i41xOHmaiPgAX-e_bVp&_nc_ht=scontent.fxap4-1.fna&oh=00_AT-eXWtkx5k4RqWkKqU4eHQ4IAAWeqgQvBwyXlVZn0phrg&oe=62C740A9', 5),
(2, 'Isabella Tonial', '42998655154', '', 0, 'isah.tonial@gmail.com', 'teste123', '', '', 0);

-- --------------------------------------------------------

--
-- Estrutura da tabela `veiculo`
--

CREATE TABLE `veiculo` (
  `id` int(11) NOT NULL,
  `placa` varchar(10) NOT NULL,
  `modelo` varchar(50) NOT NULL,
  `fk_cliente` int(11) NOT NULL,
  `tipo` int(11) NOT NULL,
  `AnoModelo` varchar(50) NOT NULL,
  `Combustivel` varchar(50) NOT NULL,
  `cilindradas` varchar(50) NOT NULL,
  `potencia` varchar(50) NOT NULL,
  `cor` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Extraindo dados da tabela `veiculo`
--

INSERT INTO `veiculo` (`id`, `placa`, `modelo`, `fk_cliente`, `tipo`, `AnoModelo`, `Combustivel`, `cilindradas`, `potencia`, `cor`) VALUES
(3, '1234561', 'carro', 1, 3, '', '', '', '', ''),
(5, '123123', 'carro', 1, 1, '', '', '', '', ''),
(9, 'ava5566', 'Fiat STRADA FIRE FLEX', 1, 1, '', '', '', '', ''),
(11, 'akw8g33', 'VW - VolksWagen GOLF 2.0', 1, 1, '', '', '', '', ''),
(12, 'amd5810', 'VW - VolksWagen GOL 1.0', 1, 1, '', '', '', '', ''),
(13, 'avw3003', 'GM - Chevrolet CORSA CLASSIC', 1, 1, '2004/2004', 'Gasolina', '1.0', '64', 'Prata');

--
-- Índices para tabelas despejadas
--

--
-- Índices para tabela `agendamento`
--
ALTER TABLE `agendamento`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_cliente` (`fk_cliente`);

--
-- Índices para tabela `cliente`
--
ALTER TABLE `cliente`
  ADD PRIMARY KEY (`id`);

--
-- Índices para tabela `veiculo`
--
ALTER TABLE `veiculo`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT de tabelas despejadas
--

--
-- AUTO_INCREMENT de tabela `agendamento`
--
ALTER TABLE `agendamento`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT de tabela `cliente`
--
ALTER TABLE `cliente`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT de tabela `veiculo`
--
ALTER TABLE `veiculo`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=14;

--
-- Restrições para despejos de tabelas
--

--
-- Limitadores para a tabela `agendamento`
--
ALTER TABLE `agendamento`
  ADD CONSTRAINT `agendamento_ibfk_1` FOREIGN KEY (`fk_placa`) REFERENCES `veiculo` (`id`),
  ADD CONSTRAINT `fk_cliente` FOREIGN KEY (`fk_cliente`) REFERENCES `cliente` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
