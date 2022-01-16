// Libraries
import express from "express";

// Database modal
import {MenuModel, ImageModel} from "../../database/allModels" ;


const Router = express.Router();

/**
 * Route        /
 * Des          GET all the restaurant details based on the city
 * Params       none
 * Access       Public
 * Method       GET
 */
Router.get("/", async (req, res) => {
  try {
    // await ValidateRestaurantCity(req.query);
    // http://localhost:4000/restaurant/?city=ncr
    const { city } = req.query;
    const restaurants = await RestaurantModel.find({ city });
    if (restaurants.length === 0) {
      return res.json({ error: "No restaurants found in this city" });
    }
    return res.json({ restaurants });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

/*
* Router    /image
* Des       GET all list of menu images with restaurant id
* Params    _id
* Access    Public
* Method    GET
*/
Router.get("/image/:_id", async(req,res) => {
    try{
        const {_id} = req.params;
        const menuImages = await ImageModel.findOne(_id);

        //TODO: validate if the images are present or not, throw error if not present:

        return res.json({menuImages});
    }catch(error){
        return res.status(500).json({error:error.message});
    }
})


export default Router;