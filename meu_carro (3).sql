-- phpMyAdmin SQL Dump
-- version 5.1.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Tempo de geração: 15-Jul-2022 às 04:32
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
  `fk_cliente` varchar(50) NOT NULL,
  `aviso` int(11) NOT NULL,
  `foto` varchar(200) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Extraindo dados da tabela `agendamento`
--

INSERT INTO `agendamento` (`id`, `fk_placa`, `obeservacao`, `km`, `oleo`, `filtro_oleo`, `filtro_ar`, `filtro_arcondicionado`, `filtro_gasolina`, `filtro_hidraulico`, `filtro_racor`, `data`, `realizado`, `fk_cliente`, `aviso`, `foto`) VALUES
(4, 13, 'asd', '', 'Lubrax', '<i class=\"bi bi-check-lg\"></i>', '<i class=\"bi bi-check-lg\"></i>', '', '', '', '<i class=\"bi bi-check-lg\"></i>', '2022-07-14T09:45', 1, '5074273056025925', 0, ''),
(5, 13, 'adasdasdasd', '', 'asdasd', 'teste', 'teste', 'teste', 'teste', 'teste', 'teste', '2022-07-15T10:35', 1, '5074273056025925', 0, '55074273056025925.jpg'),
(6, 13, 'teste wpp', '', '', '<i class=\"bi bi-check-lg\"></i>', '<i class=\"bi bi-check-lg\"></i>', '', '', '', '<i class=\"bi bi-check-lg\"></i>', '2022-06-11T11:33', 0, '5074273056025925', 0, ''),
(7, 13, '22222', '', 'Castrol', 'fram', 'fram', 'fream', 'fram', 'fram', 'fram', '2022-06-27T11:37', 1, '5074273056025925', 1, '75074273056025925.jpg'),
(8, 12, 'a', 'a', 'a', 'a', 'a', 'a', 'a', 'a', 'a', '2022-06-20T11:40', 1, '5074273056025925', 1, '85074273056025925.jpg'),
(9, 9, '111111', '11111', '111', '', '', '', '', '', '', '2022-07-01T11:42', 1, '5074273056025925', 1, '95074273056025925.jpg');

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
  `endereco` varchar(500) NOT NULL,
  `foto` varchar(500) NOT NULL,
  `fidelidade` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Extraindo dados da tabela `cliente`
--

INSERT INTO `cliente` (`id`, `nome`, `telefone`, `sessionid`, `permicao`, `email`, `endereco`, `foto`, `fidelidade`) VALUES
(1, 'Douglas Eduardo Machado', '42999750210', '', 1, 'douglas060401@gmail.com', 'Rua Eduardo de Carvalho', 'https://scontent.fxap4-1.fna.fbcdn.net/v/t1.6435-9/83547733_2544347319018524_6769433203745751040_n.jpg?_nc_cat=111&ccb=1-7&_nc_sid=09cbfe&_nc_ohc=i41xOHmaiPgAX-e_bVp&_nc_ht=scontent.fxap4-1.fna&oh=00_AT-eXWtkx5k4RqWkKqU4eHQ4IAAWeqgQvBwyXlVZn0phrg&oe=62C740A9', 5),
(2, 'Isabella Tonial', '4235232485', '', 0, 'isah.tonial@gmail.com', '', '', 0),
(4, 'Isabella Tonial', '42998655154', '$2a$08$TjZ8o2/rnykjoOrlOonMyuuqyyTmlRrnhtEHJ9XFQGcHLryhoPohW', 0, 'isabella.tonial@gmail.com', '', '', 0),
(10, 'Douglas Eduardo', '4235232485', '5074273056025925', 0, 'douglas060401@gmail.com', 'teste1', 'https://platform-lookaside.fbsbx.com/platform/profilepic/?asid=5074273056025925&height=50&width=50&ext=1659443659&hash=AeQAY6peol4_k_KN2Bc', 5);

-- --------------------------------------------------------

--
-- Estrutura da tabela `fidelidade`
--

CREATE TABLE `fidelidade` (
  `id` int(11) NOT NULL,
  `cupom` int(11) NOT NULL,
  `fk_cliente` varchar(50) NOT NULL,
  `utilizado` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Extraindo dados da tabela `fidelidade`
--

INSERT INTO `fidelidade` (`id`, `cupom`, `fk_cliente`, `utilizado`) VALUES
(7, 348091, '5074273056025925', 0);

-- --------------------------------------------------------

--
-- Estrutura da tabela `ultimosagendamentos`
--

CREATE TABLE `ultimosagendamentos` (
  `id` int(11) NOT NULL,
  `fk_placa` varchar(50) NOT NULL,
  `fk_cliente` varchar(200) NOT NULL,
  `dataultimo` date NOT NULL,
  `avisado` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Extraindo dados da tabela `ultimosagendamentos`
--

INSERT INTO `ultimosagendamentos` (`id`, `fk_placa`, `fk_cliente`, `dataultimo`, `avisado`) VALUES
(2, '0', '5074273056025925', '2022-07-14', 0),
(3, '0', '5074273056025925', '2022-07-14', 0),
(4, '0', '5074273056025925', '2022-07-14', 0),
(5, 'AVA5566', '5074273056025925', '2021-07-13', 1);

-- --------------------------------------------------------

--
-- Estrutura da tabela `veiculo`
--

CREATE TABLE `veiculo` (
  `id` int(11) NOT NULL,
  `placa` varchar(10) NOT NULL,
  `modelo` varchar(50) NOT NULL,
  `fk_cliente` varchar(50) NOT NULL,
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
(3, '1234561', 'carro', '1', 3, '', '', '', '', ''),
(5, '123123', 'carro', '1', 1, '', '', '', '', ''),
(9, 'ava5566', 'Fiat STRADA FIRE FLEX', '5074273056025925', 1, '', '', '', '', ''),
(11, 'akw8g33', 'VW - VolksWagen GOLF 2.0', '1', 1, '', '', '', '', ''),
(12, 'amd5810', 'VW - VolksWagen GOL 1.0', '1', 1, '', '', '', '', ''),
(13, 'avw3003', 'GM - Chevrolet CORSA CLASSIC', '1', 1, '2004/2004', 'Gasolina', '1.0', '64', 'Prata'),
(14, 'amd5810', 'VW - VolksWagen GOL 1.0', '5074273056025925', 1, '2004/2005', 'Gasolina', '10.0', '62', 'Branca');

--
-- Índices para tabelas despejadas
--

--
-- Índices para tabela `agendamento`
--
ALTER TABLE `agendamento`
  ADD PRIMARY KEY (`id`);

--
-- Índices para tabela `cliente`
--
ALTER TABLE `cliente`
  ADD PRIMARY KEY (`id`);

--
-- Índices para tabela `fidelidade`
--
ALTER TABLE `fidelidade`
  ADD PRIMARY KEY (`id`);

--
-- Índices para tabela `ultimosagendamentos`
--
ALTER TABLE `ultimosagendamentos`
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
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=17;

--
-- AUTO_INCREMENT de tabela `cliente`
--
ALTER TABLE `cliente`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT de tabela `fidelidade`
--
ALTER TABLE `fidelidade`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT de tabela `ultimosagendamentos`
--
ALTER TABLE `ultimosagendamentos`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT de tabela `veiculo`
--
ALTER TABLE `veiculo`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=15;

--
-- Restrições para despejos de tabelas
--

--
-- Limitadores para a tabela `agendamento`
--
ALTER TABLE `agendamento`
  ADD CONSTRAINT `agendamento_ibfk_1` FOREIGN KEY (`fk_placa`) REFERENCES `veiculo` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
