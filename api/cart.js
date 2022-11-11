router.get('/', async (req, res) => {
    const users = await getAllCarts();

    res.send({
        cart
    });
});