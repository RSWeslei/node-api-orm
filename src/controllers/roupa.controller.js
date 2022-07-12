const db = require('../models');
const Roupa = db.rest.models.roupas;

exports.getRoupa = async (req, res) => {
  const { id } = req.params;

  try {
    const roupa = await Roupa.findOne({
      where: {
        id,
      },
    });

    if (!roupa) {
      return res.status(400).send({
        message: `Não foi encontrada nenhuma roupa com id ${id}`,
      });
    }

    return res.send(roupa);
  } catch (err) {
    return res.status(500).send({
      message: `Erro: ${err.message}`,
    });
  }
};

exports.createRoupa = async (req, res) => {
  const { nome, cor, tamanho, marca, preco_compra, lucro_porcentagem } = req.body;
  if (!nome || !cor || !tamanho || !marca || !preco_compra || !lucro_porcentagem ) {
    return res.status(400).send({
      message: 'Por favor, informe todos os dados para criar uma nova roupa!',
    });
  }

  let roupaExiste = await Roupa.findOne({
    where: {
      nome,
    },
  });

  if (roupaExiste) {
    return res.status(400).send({
      message: 'Já existe uma roupa com esse nome cadastrada!',
    });
  }

  try {
    let novaRoupa = await Roupa.create({
      nome, 
      cor, 
      tamanho, 
      marca, 
      preco_venda: preco_compra + preco_compra * (lucro_porcentagem / 100), 
      preco_compra, 
      lucro_porcentagem
    });
    return res.send(novaRoupa);
  } catch (err) {
    return res.status(500).send({
      message: `Erro: ${err.message}`,
    });
  }
};

exports.deleteRoupa = async (req, res) => {
  const { id } = req.body;
  if (!id) {
    return res.status(400).send({
      message: 'Por favor, informe o ID da roupa que você está tentando deletar!',
    });
  }

  const roupa = await Roupa.findOne({
    where: {
      id,
    },
  });

  if (!roupa) {
    return res.status(400).send({
      message: `Nenhuma roupa encontrada com o id ${id}`,
    });
  }

  try {
    await roupa.destroy();
    return res.send({
      message: `Roupa ${id} foi deletada!`,
    });
  } catch (err) {
    return res.status(500).send({
      message: `Erro: ${err.message}`,
    });
  }
};

exports.updateRoupa = async (req, res) => {
  const { nome, cor, tamanho, marca, preco_venda, preco_compra, lucro_porcentagem } = req.body;
  const { id } = req.params;

  const roupa = await Roupa.findOne({
    where: {
      id,
    },
  });

  if (!roupa) {
    return res.status(400).send({
      message: `Nenhuma roupa foi encontrada com o id ${id}`,
    });
  }

  try {
    if (nome) {
      roupa.nome = nome;
    }
    if (cor) {
      roupa.cor = cor;
    }
    if (tamanho) {
      roupa.tamanho = tamanho;
    }
    if (marca) {
      roupa.marca = marca;
    }
    if (preco_venda) {
      roupa.preco_venda = preco_venda;
    }
    if (preco_compra) {
      roupa.preco_compra = preco_compra;
    }
    if (lucro_porcentagem) {
      roupa.lucro_porcentagem = lucro_porcentagem;
    }

    roupa.save();
    return res.send({
      message: `Roupa ${id} atualizada com sucesso!`,
    });
  } catch (err) {
    return res.status(500).send({
      message: `Erro: ${err.message}`,
    });
  }
};

exports.getAllRoupas = async (req, res) => {
  
  try {
    let roupas = await Roupa.findAll()
    if (!roupas){
      return res.status(500).send('Não foi encontradas roupas!')
    }
    return res.send(roupas)
  } catch (error) {
    return res.status(500).send(error)
  }
};

exports.filterRoupas = async (req, res) => {
  try {
    const filter = req.body
    let field = Object.keys(req.body)[0]
    const roupas = await Roupa.findAll({
      where: {
        [field]: filter[field]
      },
    })
    if (!roupas || roupas[0] == undefined){
      return res.status(400).send({
        erro:`Não foi encontrada nenhuma roupa com o filtro '${field}'`
      })
    }
    return res.send(roupas)
    
  } catch (error) {
    return res.status(500).send(error)
  }
}
