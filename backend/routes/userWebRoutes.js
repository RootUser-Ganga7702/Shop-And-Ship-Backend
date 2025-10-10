const express = require('express');
const userWebRoutes = express.Router();

const { createHomeSlide, getAllHomeSlides, updateHomeSlide, deleteHomeSlide } = require('../controller/UserWebController/homeSlidesController')
const { createPlatForm, getAllPlatForms, updatePlatForm, deletePlatForm } = require('../controller/UserWebController/platformController')
const { createPaymentPartner, getAllPaymentPartners, updatePaymentPartner, deletePaymentPartner } = require('../controller/UserWebController/addPaymentController')
const { createTermsAndConditions, getAllTermsAndConditions, updateTermsAndConditions, deleteTermsAndConditions } = require('../controller/UserWebController/termsAndConditionsController')


userWebRoutes.route('/createHomeSlides').post(createHomeSlide)
userWebRoutes.route('/getAllHomeSlides').get(getAllHomeSlides)
userWebRoutes.route('/updateHomeSlides').post(updateHomeSlide)
userWebRoutes.route('/deleteHomeSlides').post(deleteHomeSlide)


userWebRoutes.route('/createPlatForm').post(createPlatForm)
userWebRoutes.route('/getAllPlatForms').get(getAllPlatForms)
userWebRoutes.route('/updatePlatForm').post(updatePlatForm)
userWebRoutes.route('/deletePlatForm').post(deletePlatForm)

userWebRoutes.route('/createPaymentPartner').post(createPaymentPartner)
userWebRoutes.route('/getAllPaymentPartners').get(getAllPaymentPartners)
userWebRoutes.route('/updatePaymentPartner').post(updatePaymentPartner)
userWebRoutes.route('/deletePaymentPartner').post(deletePaymentPartner)

userWebRoutes.route('/createTermsAndConditions').post(createTermsAndConditions)
userWebRoutes.route('/getAllTermsAndConditions').get(getAllTermsAndConditions)
userWebRoutes.route('/updateTermsAndConditions').post(updateTermsAndConditions)
userWebRoutes.route('/deleteTermsAndConditions').post(deleteTermsAndConditions)


module.exports = userWebRoutes;