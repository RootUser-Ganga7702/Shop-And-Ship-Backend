const express = require('express');
const userWebRoutes = express.Router();

const { createHomeSlide, getAllHomeSlides, updateHomeSlide, deleteHomeSlide } = require('../controller/UserWebController/homeSlidesController')
const { createPlatForm, getAllPlatForms, updatePlatForm, deletePlatForm } = require('../controller/UserWebController/platformController')
const { createPaymentPartner, getAllPaymentPartners, updatePaymentPartner, deletePaymentPartner } = require('../controller/UserWebController/addPaymentController')
const { createTermsAndConditions, getAllTermsAndConditions, updateTermsAndConditions, deleteTermsAndConditions } = require('../controller/UserWebController/termsAndConditionsController')
const { createReturnRefundPolicy, getAllReturnRefundPolicies, updateReturnRefundPolicy, deleteReturnRefundPolicy } = require('../controller/UserWebController/returnAndRefundController')
const { createHowToReturn, getAllHowToReturns, updateHowToReturn, deleteHowToReturn } = require('../controller/UserWebController/howToReturnController')
const { createDashboard, getAllDashboards, updateDashboard, deleteDashboard } = require('../controller/UserWebController/dashboardController')

userWebRoutes.route('/createDashboard').post(createDashboard)
userWebRoutes.route('/getAllDashboards').get(getAllDashboards)
userWebRoutes.route('/updateDashboard').post(updateDashboard)
userWebRoutes.route('/deleteDashboard').post(deleteDashboard)


userWebRoutes.route('/createHowToReturn').post(createHowToReturn)
userWebRoutes.route('/getAllHowToReturns').get(getAllHowToReturns)
userWebRoutes.route('/updateHowToReturn').post(updateHowToReturn)
userWebRoutes.route('/deleteHowToReturn').post(deleteHowToReturn)


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


userWebRoutes.route('/createReturnRefundPolicy').post(createReturnRefundPolicy)
userWebRoutes.route('/getAllReturnRefundPolicies').get(getAllReturnRefundPolicies)
userWebRoutes.route('/updateReturnRefundPolicy').post(updateReturnRefundPolicy)
userWebRoutes.route('/deleteReturnRefundPolicy').post(deleteReturnRefundPolicy)


module.exports = userWebRoutes;