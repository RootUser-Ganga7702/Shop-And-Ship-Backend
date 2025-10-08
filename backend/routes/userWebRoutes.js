const express = require('express');
const userWebRoutes = express.Router();

const { createHomeSlide, getAllHomeSlides, updateHomeSlide, deleteHomeSlide } = require('../controller/UserWebController/homeSlidesController')

userWebRoutes.route('/homeSlide').post(createHomeSlide)
userWebRoutes.route('/getAllHomeSlides').get(getAllHomeSlides)
userWebRoutes.route('/updateHomeSlide').post(updateHomeSlide)
userWebRoutes.route('/deleteHomeSlide').delete(deleteHomeSlide)




module.exports = userWebRoutes;