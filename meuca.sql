-- phpMyAdmin SQL Dump
-- version 5.1.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Tempo de geração: 06-Ago-2022 às 20:42
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
-- Banco de dados: `meuca`
--

-- --------------------------------------------------------

--
-- Estrutura da tabela `agendamento`
--

CREATE TABLE `agendamento` (
  `id_agendamento` int(11) NOT NULL,
  `filtro_ar` varchar(30) DEFAULT NULL,
  `filtro_arcondicionado` varchar(30) DEFAULT NULL,
  `filtro_combustivel` varchar(30) DEFAULT NULL,
  `outro_filtro` varchar(30) DEFAULT NULL,
  `filtro_racor` varchar(30) DEFAULT NULL,
  `aviso` int(11) DEFAULT NULL,
  `foto` varchar(500) DEFAULT NULL,
  `cancelado` int(11) DEFAULT NULL,
  `filtro_oleo` varchar(30) DEFAULT NULL,
  `oleo` varchar(30) DEFAULT NULL,
  `realizado` int(11) DEFAULT NULL,
  `data` varchar(30) DEFAULT NULL,
  `observacao` varchar(200) DEFAULT NULL,
  `km` varchar(30) DEFAULT NULL,
  `lembrete` int(11) DEFAULT NULL,
  `FK_CLIENTE_id_cliente` varchar(200) DEFAULT NULL,
  `FK_VEICULO_id_placa` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Estrutura da tabela `cliente`
--

CREATE TABLE `cliente` (
  `id_cliente` varchar(200) NOT NULL,
  `nome` varchar(100) DEFAULT NULL,
  `telefone` varchar(11) DEFAULT NULL,
  `permissao` int(11) DEFAULT NULL,
  `email` varchar(50) DEFAULT NULL,
  `endereco` varchar(500) DEFAULT NULL,
  `foto` varchar(500) DEFAULT NULL,
  `qtd_fidelidade` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Estrutura da tabela `fidelidade`
--

CREATE TABLE `fidelidade` (
  `id_fidelidade` int(11) NOT NULL,
  `cupom` int(11) DEFAULT NULL,
  `utilizado` int(11) DEFAULT NULL,
  `FK_CLIENTE_id_cliente` varchar(200) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Estrutura da tabela `tipos_veiculo`
--

CREATE TABLE `tipos_veiculo` (
  `id_tipo` int(11) NOT NULL,
  `tipo` varchar(20) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Extraindo dados da tabela `tipos_veiculo`
--

INSERT INTO `tipos_veiculo` (`id_tipo`, `tipo`) VALUES
(1, 'carro'),
(2, 'caminhao'),
(3, 'trator'),
(4, 'moto'),
(5, 'outros');

-- --------------------------------------------------------

--
-- Estrutura da tabela `veiculo`
--

CREATE TABLE `veiculo` (
  `id_placa` int(11) NOT NULL,
  `placa` varchar(7) DEFAULT NULL,
  `modelo` varchar(50) DEFAULT NULL,
  `FK_TIPOS_VEICULO_id_tipo` int(11) DEFAULT NULL,
  `FK_CLIENTE_id_cliente` varchar(200) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Índices para tabelas despejadas
--

--
-- Índices para tabela `agendamento`
--
ALTER TABLE `agendamento`
  ADD PRIMARY KEY (`id_agendamento`),
  ADD KEY `FK_AGENDAMENTO_2` (`FK_CLIENTE_id_cliente`),
  ADD KEY `FK_AGENDAMENTO_3` (`FK_VEICULO_id_placa`);

--
-- Índices para tabela `cliente`
--
ALTER TABLE `cliente`
  ADD PRIMARY KEY (`id_cliente`);

--
-- Índices para tabela `fidelidade`
--
ALTER TABLE `fidelidade`
  ADD PRIMARY KEY (`id_fidelidade`),
  ADD KEY `FK_FIDELIDADE_2` (`FK_CLIENTE_id_cliente`);

--
-- Índices para tabela `tipos_veiculo`
--
ALTER TABLE `tipos_veiculo`
  ADD PRIMARY KEY (`id_tipo`);

--
-- Índices para tabela `veiculo`
--
ALTER TABLE `veiculo`
  ADD PRIMARY KEY (`id_placa`),
  ADD KEY `FK_VEICULO_2` (`FK_TIPOS_VEICULO_id_tipo`),
  ADD KEY `FK_VEICULO_3` (`FK_CLIENTE_id_cliente`);

--
-- AUTO_INCREMENT de tabelas despejadas
--

--
-- AUTO_INCREMENT de tabela `agendamento`
--
ALTER TABLE `agendamento`
  MODIFY `id_agendamento` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de tabela `fidelidade`
--
ALTER TABLE `fidelidade`
  MODIFY `id_fidelidade` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de tabela `tipos_veiculo`
--
ALTER TABLE `tipos_veiculo`
  MODIFY `id_tipo` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT de tabela `veiculo`
--
ALTER TABLE `veiculo`
  MODIFY `id_placa` int(11) NOT NULL AUTO_INCREMENT;

--
-- Restrições para despejos de tabelas
--

--
-- Limitadores para a tabela `agendamento`
--
ALTER TABLE `agendamento`
  ADD CONSTRAINT `FK_AGENDAMENTO_2` FOREIGN KEY (`FK_CLIENTE_id_cliente`) REFERENCES `cliente` (`id_cliente`) ON DELETE CASCADE,
  ADD CONSTRAINT `FK_AGENDAMENTO_3` FOREIGN KEY (`FK_VEICULO_id_placa`) REFERENCES `veiculo` (`id_placa`) ON DELETE CASCADE;

--
-- Limitadores para a tabela `fidelidade`
--
ALTER TABLE `fidelidade`
  ADD CONSTRAINT `FK_FIDELIDADE_2` FOREIGN KEY (`FK_CLIENTE_id_cliente`) REFERENCES `cliente` (`id_cliente`) ON DELETE CASCADE;

--
-- Limitadores para a tabela `veiculo`
--
ALTER TABLE `veiculo`
  ADD CONSTRAINT `FK_VEICULO_2` FOREIGN KEY (`FK_TIPOS_VEICULO_id_tipo`) REFERENCES `tipos_veiculo` (`id_tipo`) ON DELETE CASCADE,
  ADD CONSTRAINT `FK_VEICULO_3` FOREIGN KEY (`FK_CLIENTE_id_cliente`) REFERENCES `cliente` (`id_cliente`) ON DELETE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
