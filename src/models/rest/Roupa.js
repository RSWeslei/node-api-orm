const roupa = (sequelize, DataTypes) => {
  const Roupa = sequelize.define(
    'roupas',
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      nome: {
        type: DataTypes.STRING,
      },
      cor: {
        type: DataTypes.STRING,
      },
      tamanho: {
        type: DataTypes.STRING,
      },
      marca: {
        type: DataTypes.STRING,
      },
      preco_venda: {
        type: DataTypes.FLOAT,
      },
      preco_compra: {
        type: DataTypes.FLOAT,
      },
      lucro_porcentagem: {
        type: DataTypes.FLOAT,
      }
    },
    {
      timestamps: true,
      freezeTableName: true,
    }
  );

  Roupa.sync();
  return Roupa;
};

export default roupa;
