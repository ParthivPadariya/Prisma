const prisma = require('../prisma/index')

exports.createPost = async (req,res,next) => {
    try {
        const {slug, title, body, authorId} = req.body;
        
        // validation
        const result = await prisma.post.create({
            data: {
                slug, 
                title, 
                body, 
                author:{connect:{id: authorId}},
            }
        })

        res.json(result)
    } catch (error) {
        throw new Error(error)
    }
}

exports.updatePost = async (req,res,next) => {
    const {id} = req.params;
    const {title, body} = req.body;

    try {
        const result = await prisma.post.update({
            where:{
                id:id
            },
            data:{
                title,
                body
            }
        })
        res.json(result);
    } catch (error) {
        throw new Error(error)
    }
}

exports.deletePost = async (req,res,next) => {
    const {id} = req.params;

    try {
        const result = await prisma.post.deleteMany({
            where:{
                id
            }
        })

        res.json(result);
    } catch (error) {
        throw new Error(error);
    }
}

exports.getAllPost = async (req,res,next) => {
    try {
        const result = await prisma.post.findMany();

        res.json({result});

    } catch (error) {
        throw new Error(error);
    }
}


/**
 * 
 * {
    "slug":"parthiv",
    "title":"as",
    "body":"123",
    "authorId":"660c2fc15e997cd7bba52fe1",
}
 */