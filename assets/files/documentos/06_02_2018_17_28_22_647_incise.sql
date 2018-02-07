-- phpMyAdmin SQL Dump
-- version 4.6.4
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: 05-Fev-2018 às 16:50
-- Versão do servidor: 5.7.14
-- PHP Version: 5.6.25

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `incise`
--

-- --------------------------------------------------------

--
-- Estrutura da tabela `documentos`
--

CREATE TABLE `documentos` (
  `id` int(11) NOT NULL,
  `id_empresa` int(11) NOT NULL,
  `id_doc_pai` int(11) DEFAULT '0',
  `arquivo` varchar(150) NOT NULL,
  `tipo` tinyint(4) NOT NULL DEFAULT '2' COMMENT '1 = Pasta, 2 = Documento',
  `deletado` tinyint(1) NOT NULL DEFAULT '0',
  `data_cadastro` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

--
-- Extraindo dados da tabela `documentos`
--

INSERT INTO `documentos` (`id`, `id_empresa`, `id_doc_pai`, `arquivo`, `tipo`, `deletado`, `data_cadastro`) VALUES
(1, 1, 0, 'Dia a Dia', 1, 0, '2018-02-02 13:13:07'),
(2, 1, 1, 'Pagamentos', 1, 0, '2018-02-02 13:13:07'),
(3, 1, 1, 'Documentos', 1, 0, '2018-02-02 13:13:07'),
(4, 1, 1, 'Comprovantes', 1, 0, '2018-02-02 13:13:07'),
(5, 1, 1, 'Recibos', 1, 0, '2018-02-02 13:13:07'),
(6, 2, 0, 'Michaengelo Pintura', 1, 0, '2018-02-02 13:13:25'),
(7, 2, 6, 'Pagamentos', 1, 0, '2018-02-02 13:13:25'),
(8, 2, 6, 'Documentos', 1, 0, '2018-02-02 13:13:25'),
(9, 2, 6, 'Comprovantes', 1, 0, '2018-02-02 13:13:25'),
(10, 2, 6, 'Recibos', 1, 0, '2018-02-02 13:13:25'),
(11, 3, 0, 'ACNO Ventiladores', 1, 0, '2018-02-02 13:13:36'),
(12, 3, 11, 'Pagamentos', 1, 0, '2018-02-02 13:13:36'),
(13, 3, 11, 'Documentos', 1, 0, '2018-02-02 13:13:36'),
(14, 3, 11, 'Comprovantes', 1, 0, '2018-02-02 13:13:36'),
(15, 3, 11, 'Recibos', 1, 0, '2018-02-02 13:13:36'),
(16, 4, 0, 'Renato LTDA', 1, 0, '2018-02-02 13:13:43'),
(17, 4, 16, 'Pagamentos', 1, 0, '2018-02-02 13:13:43'),
(18, 4, 16, 'Documentos', 1, 0, '2018-02-02 13:13:43'),
(19, 4, 16, 'Comprovantes', 1, 0, '2018-02-02 13:13:43'),
(20, 4, 16, 'Recibos', 1, 0, '2018-02-02 13:13:43'),
(21, 5, 0, 'GM LTDA', 1, 0, '2018-02-02 13:13:48'),
(22, 5, 21, 'Pagamentos', 1, 0, '2018-02-02 13:13:48'),
(23, 5, 21, 'Documentos', 1, 0, '2018-02-02 13:13:48'),
(24, 5, 21, 'Comprovantes', 1, 0, '2018-02-02 13:13:48'),
(25, 5, 21, 'Recibos', 1, 0, '2018-02-02 13:13:48'),
(26, 5, 22, '02_02_2018_11_16_32_638_Relatório Incise.docx', 2, 0, '2018-02-02 13:16:33'),
(27, 4, 17, '02_02_2018_11_16_57_88_Ebook Incise Fake.pdf', 2, 0, '2018-02-02 13:16:59'),
(28, 3, 12, '02_02_2018_11_17_15_633_Comprovante Transferencia Marcos Schneider Walltime .pdf', 2, 0, '2018-02-02 13:17:16'),
(29, 1, 2, '02_02_2018_11_17_32_918_ntas Cadeiras Unisinos.docx', 2, 0, '2018-02-02 13:17:34'),
(30, 1, 2, '02_02_2018_11_19_15_115_Paper 2.docx', 2, 0, '2018-02-02 13:19:16'),
(31, 2, 7, '02_02_2018_11_19_41_866_Política e Cultura v1.docx', 2, 0, '2018-02-02 13:19:42'),
(32, 4, 17, '02_02_2018_11_20_02_241_OF.CIRC_Nº_005_2017_-_IDENTIFICAÇÃO_DAS_CHAPAS_-_COMISSÃO_ELEITORAL_2017 (1) (1).pdf', 2, 0, '2018-02-02 13:20:17'),
(33, 3, 12, '02_02_2018_11_35_08_528_PCMSO.PDF', 2, 0, '2018-02-02 13:35:09'),
(34, 2, 7, '02_02_2018_11_35_32_789_OF.CIRC_Nº_005_2017_-_IDENTIFICAÇÃO_DAS_CHAPAS_-_COMISSÃO_ELEITORAL_2017 (1) (1).pdf', 2, 0, '2018-02-02 13:35:43'),
(35, 1, 2, '02_02_2018_11_36_10_424_PÁGINA-3-CONTRATO (1).docx', 2, 0, '2018-02-02 13:36:11'),
(36, 4, 17, '02_02_2018_11_37_25_805_Contrato Muron-ilovepdf-compressed.pdf', 2, 0, '2018-02-02 13:37:26'),
(37, 5, 22, '02_02_2018_11_37_45_385_MINUTA RUTERSON FINAL.pdf', 2, 0, '2018-02-02 13:37:46'),
(38, 3, 12, '02_02_2018_11_38_01_875_Contrato Muron-ilovepdf-compressed.pdf', 2, 0, '2018-02-02 13:38:02'),
(39, 2, 7, '02_02_2018_11_38_23_518_Paper 2.docx', 2, 0, '2018-02-02 13:38:24'),
(40, 4, 17, '02_02_2018_13_35_19_861_Comprovante Transferencia Marcos Schneider Walltime .pdf', 2, 0, '2018-02-02 15:35:20'),
(41, 3, 12, '02_02_2018_13_35_35_492_12_01_2018_09_24_04_918_Br Tronic Site.pdf', 2, 0, '2018-02-02 15:35:36'),
(42, 1, 2, '02_02_2018_13_35_59_653_PCMSO-2.pdf', 2, 0, '2018-02-02 15:36:00'),
(43, 2, 7, '02_02_2018_13_36_13_566_Curso de Análise e Desenvolvimento de Sistemas - Tecnólogo.pdf', 2, 0, '2018-02-02 15:36:15'),
(44, 5, 22, '02_02_2018_13_36_50_697_Curso de Análise e Desenvolvimento de Sistemas - Tecnólogo.pdf', 2, 0, '2018-02-02 15:36:51'),
(45, 4, 17, '02_02_2018_13_37_07_963_Contrato Muron-ilovepdf-compressed.pdf', 2, 0, '2018-02-02 15:37:08'),
(46, 1, 4, '02_02_2018_13_38_17_162_3-razoes-para-voce-nadar-amanha.png', 2, 0, '2018-02-02 15:38:18'),
(47, 2, 9, '02_02_2018_13_38_46_696_10_01_2018_13_14_00_627_Br_Tronic.png', 2, 0, '2018-02-02 15:38:47'),
(48, 4, 19, '02_02_2018_13_39_30_730_clientes-section.jpg', 2, 0, '2018-02-02 15:39:31'),
(49, 5, 24, '02_02_2018_13_39_59_342_30_01_2018_09_30_40_694_12_01_2018_09_45_35_333_Panfleto-Pazze pág4 (1).jpg', 2, 0, '2018-02-02 15:40:00'),
(50, 1, 2, '02_02_2018_13_40_38_704_Ebook Incise.pdf', 2, 0, '2018-02-02 15:40:39'),
(51, 3, 13, '02_02_2018_13_40_55_783_23_01_2018_10_28_50_502_1493169806_Brazil.png', 2, 0, '2018-02-02 15:41:00'),
(52, 3, 13, '02_02_2018_13_40_59_487_22_01_2018_16_27_02_551_candy-cane.svg', 2, 0, '2018-02-02 15:41:00'),
(53, 5, 22, '02_02_2018_13_41_11_113_10_01_2018_13_42_08_213_facebook-placeholder-for-locate-places-on-maps.svg', 2, 0, '2018-02-02 15:41:15'),
(54, 5, 22, '02_02_2018_13_41_14_6_12_01_2018_09_45_35_333_Panfleto-Pazze pág4.jpg', 2, 0, '2018-02-02 15:41:15'),
(55, 4, 18, '02_02_2018_13_41_22_58_29_01_2018_11_08_02_12_Letra da musica infantil.docx', 2, 0, '2018-02-02 15:41:25'),
(56, 4, 18, '02_02_2018_13_41_24_938_10_01_2018_13_42_08_213_facebook-placeholder-for-locate-places-on-maps.svg', 2, 0, '2018-02-02 15:41:25'),
(57, 3, 13, '02_02_2018_13_41_35_965_10_01_2018_18_26_16_418_Exegese_Logosófica_11_edicao_2012_Português_6_3_2014_18_40_16.pdf', 2, 0, '2018-02-02 15:41:40'),
(58, 3, 13, '02_02_2018_13_41_39_423_22_01_2018_14_37_42_101_Memorial Figueiras 2.doc', 2, 0, '2018-02-02 15:41:40'),
(59, 2, 10, '02_02_2018_13_41_49_578_22_01_2018_16_27_02_551_candy-cane.svg', 2, 0, '2018-02-02 15:41:50'),
(60, 1, 5, '02_02_2018_13_41_57_563_19047309_1456745144383804_523352850_o.jpg', 2, 0, '2018-02-02 15:41:58');

-- --------------------------------------------------------

--
-- Estrutura da tabela `empresas`
--

CREATE TABLE `empresas` (
  `id` int(11) NOT NULL,
  `nome_fantasia` varchar(150) NOT NULL,
  `deletado` tinyint(1) NOT NULL DEFAULT '0',
  `data_cadastro` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

--
-- Extraindo dados da tabela `empresas`
--

INSERT INTO `empresas` (`id`, `nome_fantasia`, `deletado`, `data_cadastro`) VALUES
(1, 'Dia a Dia', 0, '2018-02-02 13:13:07'),
(2, 'Michaengelo Pintura', 0, '2018-02-02 13:13:25'),
(3, 'ACNO Ventiladores', 0, '2018-02-02 13:13:36'),
(4, 'Renato LTDA', 0, '2018-02-02 13:13:43'),
(5, 'GM LTDA', 0, '2018-02-02 13:13:48');

-- --------------------------------------------------------

--
-- Estrutura da tabela `pagamentos`
--

CREATE TABLE `pagamentos` (
  `id` int(11) NOT NULL,
  `id_empresa` int(11) NOT NULL,
  `descricao` varchar(150) NOT NULL,
  `valor` decimal(10,2) NOT NULL,
  `arquivo` varchar(150) NOT NULL,
  `status` tinyint(4) NOT NULL DEFAULT '3' COMMENT '1 - Pago, 2 - Em análise , 3 - A pagar, 4 -  Recusado',
  `motivo_recusar` varchar(1000) DEFAULT NULL,
  `deletado` tinyint(1) NOT NULL DEFAULT '0',
  `data_cadastro` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

--
-- Extraindo dados da tabela `pagamentos`
--

INSERT INTO `pagamentos` (`id`, `id_empresa`, `descricao`, `valor`, `arquivo`, `status`, `motivo_recusar`, `deletado`, `data_cadastro`) VALUES
(1, 5, 'Compra de Carro', '774.17', '02_02_2018_11_16_32_638_Relatório Incise.docx', 1, NULL, 0, '2018-02-02 13:16:33'),
(2, 4, 'FGTS', '88.15', '02_02_2018_11_16_57_88_Ebook Incise Fake.pdf', 1, NULL, 0, '2018-02-02 13:16:59'),
(3, 3, 'ILLS', '714.29', '02_02_2018_11_17_15_633_Comprovante Transferencia Marcos Schneider Walltime .pdf', 2, NULL, 0, '2018-02-02 13:17:16'),
(4, 1, 'PPQD', '147.96', '02_02_2018_11_17_32_918_ntas Cadeiras Unisinos.docx', 3, NULL, 1, '2018-02-02 13:17:34'),
(5, 1, 'IPLQ', '748.11', '02_02_2018_11_19_15_115_Paper 2.docx', 2, NULL, 0, '2018-02-02 13:19:16'),
(6, 2, 'LOQS', '124.79', '02_02_2018_11_19_41_866_Política e Cultura v1.docx', 3, NULL, 0, '2018-02-02 13:19:42'),
(7, 4, 'Apartamento Parcela 5/24 ', '1111.85', '02_02_2018_11_20_02_241_OF.CIRC_Nº_005_2017_-_IDENTIFICAÇÃO_DAS_CHAPAS_-_COMISSÃO_ELEITORAL_2017 (1) (1).pdf', 2, NULL, 0, '2018-02-02 13:20:17'),
(8, 3, 'Motor de Ventilador', '888.71', '02_02_2018_11_35_08_528_PCMSO.PDF', 1, NULL, 0, '2018-02-02 13:35:09'),
(9, 2, 'Quadro Montagge', '14.74', '02_02_2018_11_35_32_789_OF.CIRC_Nº_005_2017_-_IDENTIFICAÇÃO_DAS_CHAPAS_-_COMISSÃO_ELEITORAL_2017 (1) (1).pdf', 4, 'Comprovante errado', 0, '2018-02-02 13:35:43'),
(10, 1, 'Ar-condicionado', '1887.00', '02_02_2018_11_36_10_424_PÁGINA-3-CONTRATO (1).docx', 1, NULL, 0, '2018-02-02 13:36:11'),
(11, 4, 'Estafeleno', '668.41', '02_02_2018_11_37_25_805_Contrato Muron-ilovepdf-compressed.pdf', 3, NULL, 0, '2018-02-02 13:37:26'),
(12, 5, 'Cambio x55', '7771.39', '02_02_2018_11_37_45_385_MINUTA RUTERSON FINAL.pdf', 3, NULL, 0, '2018-02-02 13:37:46'),
(13, 3, 'Broca', '547.98', '02_02_2018_11_38_01_875_Contrato Muron-ilovepdf-compressed.pdf', 1, NULL, 0, '2018-02-02 13:38:02'),
(14, 2, 'Pincéis', '5000.00', '02_02_2018_11_38_23_518_Paper 2.docx', 4, NULL, 0, '2018-02-02 13:38:24'),
(15, 4, 'Compra de Energéticos', '777.41', '02_02_2018_13_35_19_861_Comprovante Transferencia Marcos Schneider Walltime .pdf', 3, NULL, 0, '2018-02-02 15:35:20'),
(16, 3, 'Parafusos', '145.00', '02_02_2018_13_35_35_492_12_01_2018_09_24_04_918_Br Tronic Site.pdf', 3, NULL, 0, '2018-02-02 15:35:36'),
(17, 1, 'Calçada', '5641.00', '02_02_2018_13_35_59_653_PCMSO-2.pdf', 3, NULL, 0, '2018-02-02 15:36:00'),
(18, 2, 'Esquadro', '98.88', '02_02_2018_13_36_13_566_Curso de Análise e Desenvolvimento de Sistemas - Tecnólogo.pdf', 1, NULL, 0, '2018-02-02 15:36:15'),
(19, 5, 'Volante', '984.16', '02_02_2018_13_36_50_697_Curso de Análise e Desenvolvimento de Sistemas - Tecnólogo.pdf', 4, NULL, 0, '2018-02-02 15:36:51'),
(20, 4, 'Herbicida', '555.14', '02_02_2018_13_37_07_963_Contrato Muron-ilovepdf-compressed.pdf', 3, NULL, 0, '2018-02-02 15:37:08'),
(21, 1, 'Forro', '999.99', '02_02_2018_13_40_38_704_Ebook Incise.pdf', 3, NULL, 0, '2018-02-02 15:40:39');

-- --------------------------------------------------------

--
-- Estrutura da tabela `pagamentos_comprovantes`
--

CREATE TABLE `pagamentos_comprovantes` (
  `id` int(11) NOT NULL,
  `id_pagamento` int(11) NOT NULL,
  `arquivo` varchar(150) DEFAULT NULL,
  `deletado` tinyint(1) NOT NULL DEFAULT '0',
  `data_cadastro` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

--
-- Extraindo dados da tabela `pagamentos_comprovantes`
--

INSERT INTO `pagamentos_comprovantes` (`id`, `id_pagamento`, `arquivo`, `deletado`, `data_cadastro`) VALUES
(1, 5, '02_02_2018_13_38_17_162_3-razoes-para-voce-nadar-amanha.png', 0, '2018-02-02 15:38:18'),
(2, 9, '02_02_2018_13_38_46_696_10_01_2018_13_14_00_627_Br_Tronic.png', 0, '2018-02-02 15:38:47'),
(3, 3, NULL, 0, '2018-02-02 15:39:15'),
(4, 7, '02_02_2018_13_39_30_730_clientes-section.jpg', 0, '2018-02-02 15:39:31'),
(5, 19, '02_02_2018_13_39_59_342_30_01_2018_09_30_40_694_12_01_2018_09_45_35_333_Panfleto-Pazze pág4 (1).jpg', 0, '2018-02-02 15:40:00');

-- --------------------------------------------------------

--
-- Estrutura da tabela `pagamento_historico`
--

CREATE TABLE `pagamento_historico` (
  `id` int(11) NOT NULL,
  `id_pagamento` int(11) NOT NULL,
  `status` tinyint(1) NOT NULL COMMENT '1 - Pago, 2 - Em análise , 3 - A pagar, 4 -  Recusado',
  `motivo_recusar` varchar(1000) DEFAULT NULL,
  `deletado` tinyint(1) NOT NULL DEFAULT '0',
  `data_cadastro` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

--
-- Extraindo dados da tabela `pagamento_historico`
--

INSERT INTO `pagamento_historico` (`id`, `id_pagamento`, `status`, `motivo_recusar`, `deletado`, `data_cadastro`) VALUES
(1, 1, 3, NULL, 0, '2018-02-02 13:16:33'),
(2, 2, 3, NULL, 0, '2018-02-02 13:16:59'),
(3, 3, 3, NULL, 0, '2018-02-02 13:17:16'),
(4, 4, 3, NULL, 0, '2018-02-02 13:17:34'),
(5, 5, 3, NULL, 0, '2018-02-02 13:19:16'),
(6, 6, 3, NULL, 0, '2018-02-02 13:19:42'),
(7, 7, 3, NULL, 0, '2018-02-02 13:20:17'),
(8, 8, 3, NULL, 0, '2018-02-02 13:35:09'),
(9, 8, 1, NULL, 0, '2018-02-02 13:35:15'),
(10, 9, 3, NULL, 0, '2018-02-02 13:35:43'),
(11, 10, 3, NULL, 0, '2018-02-02 13:36:11'),
(12, 11, 3, NULL, 0, '2018-02-02 13:37:26'),
(13, 12, 3, NULL, 0, '2018-02-02 13:37:46'),
(14, 13, 3, NULL, 0, '2018-02-02 13:38:02'),
(15, 14, 3, NULL, 0, '2018-02-02 13:38:24'),
(16, 14, 4, NULL, 0, '2018-02-02 13:38:30'),
(17, 13, 1, NULL, 0, '2018-02-02 13:38:33'),
(18, 1, 1, NULL, 0, '2018-02-02 13:38:39'),
(19, 2, 1, NULL, 0, '2018-02-02 13:38:42'),
(20, 10, 1, NULL, 0, '2018-02-02 15:34:59'),
(21, 15, 3, NULL, 0, '2018-02-02 15:35:20'),
(22, 16, 3, NULL, 0, '2018-02-02 15:35:36'),
(23, 17, 3, NULL, 0, '2018-02-02 15:36:00'),
(24, 18, 3, NULL, 0, '2018-02-02 15:36:15'),
(25, 18, 1, NULL, 0, '2018-02-02 15:36:31'),
(26, 19, 3, NULL, 0, '2018-02-02 15:36:51'),
(27, 20, 3, NULL, 0, '2018-02-02 15:37:08'),
(28, 5, 2, NULL, 0, '2018-02-02 15:37:53'),
(29, 5, 2, NULL, 0, '2018-02-02 15:38:18'),
(30, 9, 2, NULL, 0, '2018-02-02 15:38:47'),
(31, 3, 2, NULL, 0, '2018-02-02 15:39:15'),
(32, 7, 2, NULL, 0, '2018-02-02 15:39:31'),
(33, 19, 2, NULL, 0, '2018-02-02 15:40:00'),
(34, 19, 4, NULL, 0, '2018-02-02 15:40:12'),
(35, 9, 4, 'Comprovante errado', 0, '2018-02-02 15:40:22'),
(36, 21, 3, NULL, 0, '2018-02-02 15:40:39');

-- --------------------------------------------------------

--
-- Estrutura da tabela `usuarios`
--

CREATE TABLE `usuarios` (
  `id` int(11) NOT NULL,
  `id_empresa` int(11) NOT NULL,
  `login` varchar(150) NOT NULL,
  `senha` varchar(150) NOT NULL,
  `imagem` varchar(150) NOT NULL DEFAULT 'user-padrao.jpg',
  `nome` varchar(150) NOT NULL DEFAULT '""',
  `email` varchar(150) NOT NULL,
  `telefone` varchar(150) DEFAULT '0',
  `nivel` tinyint(1) NOT NULL COMMENT '1 = admin, 2 = gerente, 3 = usuario',
  `hash_login` varchar(150) NOT NULL COMMENT 'hash de login, para verificacao mais segura via ajax alterado a cada login',
  `deletado` tinyint(1) NOT NULL DEFAULT '0',
  `data_cadastro` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

--
-- Extraindo dados da tabela `usuarios`
--

INSERT INTO `usuarios` (`id`, `id_empresa`, `login`, `senha`, `imagem`, `nome`, `email`, `telefone`, `nivel`, `hash_login`, `deletado`, `data_cadastro`) VALUES
(1, 0, 'admin', '745536f0652656dae49565e5fa26152b', 'user-padrao.jpg', 'Administrador', 'contato@optima.com.br', '00 00000 0000', 1, '1e778ca265348b815e6871fca365e095', 0, '2017-11-30 18:49:14'),
(33, 1, 'tt', '51e8ceb1dcbbfa689685a7d49206c9a3', 'user-padrao.jpg', '""', 'tt@tt.com.br', '0', 3, '75291c1c7a31998cc63ebfe14d0024e9', 0, '2018-02-02 13:18:45'),
(32, 2, 'michel', '3313414f7f3571bf16ab3bf89edbf8cd', 'user-padrao.jpg', '""', 'michel@gmail.com', '0', 3, 'aa2dddba2b2752b759b8c89bc5f1f24c', 0, '2018-02-02 13:15:52'),
(31, 3, 'acno', 'a291c8001bae6b4f12159f9e65275a95', 'user-padrao.jpg', '""', 'acno@acno.com.br', '0', 3, 'be38e16df20107ee429b38e61459fc54', 0, '2018-02-02 13:15:24'),
(30, 0, 'michelle', 'ab16de72e11cf46737c8c4f2e039c3a5', 'user-padrao.jpg', '""', 'michelle@gmail.com', '0', 2, '0', 0, '2018-02-02 13:15:09'),
(28, 5, 'gm', 'cb15cf899c82bf2f684fecd59f5b493f', 'user-padrao.jpg', '""', 'gm@gm.com.br', '0', 3, '405a38cf6672de44f718106550b9532a', 0, '2018-02-02 13:14:13'),
(29, 4, 'renato', '572014d9e4f56e894e133836b817a403', 'user-padrao.jpg', '""', 'renato@gmail.com', '0', 3, '560acad7a60207f9df3b8b4fb9553ae1', 0, '2018-02-02 13:14:42');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `documentos`
--
ALTER TABLE `documentos`
  ADD PRIMARY KEY (`id`),
  ADD KEY `id_usuario` (`id_empresa`),
  ADD KEY `id_doc_pai` (`id_doc_pai`);

--
-- Indexes for table `empresas`
--
ALTER TABLE `empresas`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `pagamentos`
--
ALTER TABLE `pagamentos`
  ADD PRIMARY KEY (`id`),
  ADD KEY `id_empresa` (`id_empresa`);

--
-- Indexes for table `pagamentos_comprovantes`
--
ALTER TABLE `pagamentos_comprovantes`
  ADD PRIMARY KEY (`id`),
  ADD KEY `id_pagamento` (`id_pagamento`);

--
-- Indexes for table `pagamento_historico`
--
ALTER TABLE `pagamento_historico`
  ADD PRIMARY KEY (`id`),
  ADD KEY `id_pagamento` (`id_pagamento`);

--
-- Indexes for table `usuarios`
--
ALTER TABLE `usuarios`
  ADD PRIMARY KEY (`id`),
  ADD KEY `id_setor` (`id_empresa`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `documentos`
--
ALTER TABLE `documentos`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=61;
--
-- AUTO_INCREMENT for table `empresas`
--
ALTER TABLE `empresas`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;
--
-- AUTO_INCREMENT for table `pagamentos`
--
ALTER TABLE `pagamentos`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=22;
--
-- AUTO_INCREMENT for table `pagamentos_comprovantes`
--
ALTER TABLE `pagamentos_comprovantes`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;
--
-- AUTO_INCREMENT for table `pagamento_historico`
--
ALTER TABLE `pagamento_historico`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=37;
--
-- AUTO_INCREMENT for table `usuarios`
--
ALTER TABLE `usuarios`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=34;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
