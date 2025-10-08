const express = require('express');
const userWebRoutes = express.Router();

const { createHomeSlide, getAllHomeSlides, updateHomeSlide, deleteHomeSlide } = require('../controller/UserWebController/homeSlidesController')
const { createPlatForm, getAllPlatForms, updatePlatForm, deletePlatForm } = require('../controller/UserWebController/platformController')

userWebRoutes.route('/createHomeSlides').post(createHomeSlide)
userWebRoutes.route('/getAllHomeSlides').get(getAllHomeSlides)
userWebRoutes.route('/updateHomeSlides').post(updateHomeSlide)
userWebRoutes.route('/deleteHomeSlides').post(deleteHomeSlide)


userWebRoutes.route('/createPlatForm').post(createPlatForm)
userWebRoutes.route('/getAllPlatForms').get(getAllPlatForms)
userWebRoutes.route('/updatePlatForm').post(updatePlatForm)
userWebRoutes.route('/deletePlatForm').post(deletePlatForm)

module.exports = userWebRoutes;