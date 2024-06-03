import AdModel from '../models/Ad.js'

export const getAll = async (req, res) => {
    try {
        const ads = await AdModel.find().populate({"path": "user", "select": "name"}).exec();

        res.json(ads)
    } catch (err) {
        console.log(err);
        res.status(500).json({
            message: "Не удалось получить объявление"
        })
    }
}

export const getOne = async (req, res) => {
    try {
        const adId = req.params.id;

        const ad = await AdModel.findOne({ _id: adId }).populate({"path": "user", "select": "name"}).exec();

        if (!ad) {
            return res.status(404).json({ message: "Объявление не найдено" });
        }

        res.json(ad);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Не удалось получить объявление" });
    }
};

export const remove = async (req, res) => {
    try {
        const adId = req.params.id;

        const doc = await AdModel.findOneAndDelete({ _id: adId }).exec();

        if (!doc) {
            return res.status(404).json({
                message: "Объявление не найдено"
            });
        }

        res.json({
            success: true
        });
    } catch (err) {
        console.log(err);
        res.status(500).json({
            message: "Не удалось удалить объявление"
        });
    }
};


export const create = async (req, res) => {
    try {
        const doc = new AdModel({
            title: req.body.title,
            text: req.body.text,
            category: req.body.category,
            type: req.body.type,
            price: req.body.price,
            phone: req.body.phone,
            location: req.body.location,
            imageUrl: req.body.imageUrl,
            verified: req.body.verified,
            user: req.userId,
        });

        const pin = await doc.save();

        res.json(pin)
    } catch (err) {
        console.log(err);
        res.status(500).json({
            message: "Не удалось создать объявление"
        });
    };
};

export const update = async (req, res) => {
    try {
        const adId = req.params.id;
        console.log(adId);

        await AdModel.updateOne(
            {
                _id: adId
            },
            {
                title: req.body.title,
                text: req.body.text,
                category: req.body.category,
                type: req.body.type,
                price: req.body.price,
                phone: req.body.phone,
                location: req.body.location,
                imageUrl: req.body.imageUrl,
                verified: req.body.verified,
                user: req.userId,
            },
        );

        res.json({
            success: true,
        });
    } catch (err) {
        console.log(err);
        res.status(500).json({
            message: "Не удалось обновить объявление"
        });
    };
}