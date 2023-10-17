import { Request, Response } from "express";
import { Product } from "../entities/product";
import { AppDataSource } from "../database/data-source";


export const cadastarProduto = async (req: Request, res: Response) => {
    if (!req.body.titulo || !req.body.preco || !req.body.cor || !req.body.tamanho) {
        return res.status(400).json({ ok: false, message: "Titulo, preço, cor e tamanho, são obrigatórios" });
}

try {
    
    const product = new Product(); // Cria uma nova instância da entidade Product.
    
    product.titulo = req.body.titulo; // Atribui os valores fornecidos no corpo da requisição às propriedades do produto.
    product.preco = req.body.preco;
    product.cor = req.body.cor;
    product.tamanho = req.body.tamanho;

    
    await AppDataSource.getRepository(Product).save(product); // Salva o produto no banco de dados usando a fonte de dados

    
    return res.status(201).json({ ok: true, message: "Produto cadastrado com sucesso" }); // Retorna uma resposta de sucesso
    
} catch (error) {
    console.log(error, "Erro ao cadastrar produto");
    return res.status(500).json({ ok: false, message: "Erro ao cadastrar produto"});
}
};



export const listarProdutos = async (req: Request, res: Response) => {
    try {
        const products = await AppDataSource.getRepository(Product).find();
        return res.status(200).json({ ok: true, products: products });
    } catch (error) {
        console.log(error, "Erro ao listar produtos");
        return res.status(500).json({ ok: false, message: "Erro ao listar produtos" });
    }
};

export const atualizarProduto = async (req: Request, res: Response) => {
    const id = req.params.product_id;

    try {
        const product = await AppDataSource.getRepository(Product).findOne({
            where: { id: parseInt(id) },
        });

        if (!product) {
            return res.status(404).json({ ok: false, message: "Não existe um produto com este ID" });
        } // Está verificando se a variável product é avaliada como "falsa". Se product for null ou undefined, o bloco de código dentro do if será executado.

        if (req.body.titulo) {
            product.titulo = req.body.titulo;  /* Verifica se req.body.titulo existe e não é undefined, null ou uma string vazia.
                                            Se a condição for verdadeira, atualiza a propriedade nome do objeto product com o valor de req.body.titulo */
        }

        if (req.body.preco) {
            product.preco = req.body.preco;
        }

        if (req.body.cor) {
            product.cor = req.body.cor;
        }

        if (req.body.tamanho) {
            product.tamanho = req.body.tamanho;
        }

        await AppDataSource.getRepository(Product).save(product); // Salva o produto no banco de dados usando a fonte de dados

        return res.status(200).json({ ok: true, message: "Produto atualizado com sucesso" }); // Retorna uma resposta de sucesso
    } catch (error) {
        console.log(error, "Erro ao atualizar produto");
        return res.status(500).json({ ok: false, message: "Erro ao atualizar produto" });
    }
};

export const deletarProduto = async (req: Request, res: Response) => {
    const id = req.params.product_id;

    try {
        const product = await AppDataSource.getRepository(Product).findOne({
            where: { id: parseInt(id) },
        });

        if (!product) {
            return res.status(404).json({ ok: false, message: "Não existe um produto com este ID" });
        }

        await AppDataSource.getRepository(Product).softRemove(product);

        return res.status(200).json({ ok: true, message: "Produto deletado com sucesso" });
    } catch (error) {
        console.log(error, "Erro ao deletar produto");
        return res.status(500).json({ ok: false, message: "Erro ao deletar produto" });
    }
};