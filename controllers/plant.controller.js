import Plant from "../models/plant.model.js";
import plant from "../models/plant.model.js";

export const viewOnePlants = async (req, res) => {

    try {
        const ID = req.params.id;
        const productData = await plant.findById(ID);
        res.json(productData);
        
    } catch (error) {
        res.status(404).json({
            error: 'No Listings Found'
        })
    }
}
 
// export const viewPlants = async(req,res)=>{
    
//     try {
//         let plants = plant.find({}, function(err, posts){
//             if(err){
//                 console.log(err);
//             }
//             else {
//                 res.json(plants);
//             }
//         });
//     } catch (error) {
//         res.status(404).json({
//             error: 'No Listings Found'
//         })
//     }
//  }


export const viewPlants = async (req, res) => {

    try {
        const productData = await plant.find();
        res.status(200).json(
            {status: 'succes',
            data: productData}
            );
        
    } catch (error) {
        res.status(404).json({
            error: 'No Listings Found'
        })
    }

}


export const addPlant = async (req, res) => {
    try {
        const {plantName, plantDescription, plantPrice, plantImages} = req.body;
        const product = new plant({
            plantName,
            plantDescription,
            plantPrice,
            plantImages
        }) 
        try {
            await product.save();
            res.status(200).json(product);
          } catch (error) {
            res.status(500).json({ message: error.message });
          }
    } catch (error) {
        res.status(404).json({
            message : error
        })
    }
}

export const updatePlant = async (req, res) => {
        const plant = new Plant({
            _id: req.params.id,
            plantName: req.body.plantName,
            plantDescription: req.body.plantDescription,
            plantImages: req.body.plantImages,
            plantPrice: Number(req.body.plantPrice),
          });
          Plant.updateOne({_id: req.params.id}, plant).then(
            () => {
              res.status(201).json({
                message: 'Plant updated successfully!'
              });
            }
          ).catch(
            (error) => {
              res.status(400).json({
                error: error
              });
            }
          );
}

export const deletePlant = async (req, res) => {
    try {
        const ID = req.params.id;
        await plant.findByIdAndDelete(ID);
        res.status(200).json({
            status : "Product Deleted"
        })
    } catch (error) {
        res.status(404).json({
            message : error
        })
    }
}


