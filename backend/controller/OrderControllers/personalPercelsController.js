const PersonalPercel = require("../../models/OrdersModels/personalPercelsModel");
const { sendParcelConfirmationEmail } = require("../../middelware/nodeMailer");

exports.createPersonalPercel = async (req, res) => {
  try {
    const { vendorId, customerName, customerPhone, customerEmail, reciverName, reciverPhone, reciverEmail, reciverAddress, reciverPincode, reciverCountry, reciverCity, typeOfPercel, weight, percelPrice } = req.body;
    if(!vendorId || !customerName || !customerPhone || !reciverName || !reciverPhone || !reciverAddress || !reciverPincode || !reciverCountry || !reciverCity || !typeOfPercel || !weight || !percelPrice) {
      return res.status(400).json({ message: "Please fill all the fields" });
    }
    const newPersonalPercel = new PersonalPercel({
      vendorId,
      customerName,
      customerPhone,
      customerEmail,
      reciverName,
      reciverPhone,
      reciverEmail,
      reciverAddress,
      reciverPincode,
      reciverCountry,
      reciverCity,
      typeOfPercel,
      weight,
      percelPrice
    })
    const savedPersonalPercel = await newPersonalPercel.save();
    const sendMail = await sendParcelConfirmationEmail(customerName,
    customerEmail,
    customerPhone,
    reciverName,
    reciverEmail,
    reciverPhone,
    reciverAddress,
    reciverPincode,
    reciverCity,
    reciverCountry,
    typeOfPercel,
    weight,
    percelPrice,
    savedPersonalPercel.customId,
    "Pending");
    if(!sendMail) {
      return res.status(500).json({ message: "Error sending email" });
    }
    res.status(201).json(savedPersonalPercel);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

exports.getPersonalPercels = async (req, res) => {
  try {
    const personalPercels = await PersonalPercel.find();
    res.status(200).json(personalPercels);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

exports.editPersonalPercel = async (req, res) => {
  try {
    const { id, customerName, customerPhone, customerEmail, reciverName, reciverPhone, reciverEmail, reciverAddress, reciverPincode, reciverCountry, reciverCity, typeOfPercel, weight, percelPrice } = req.body;
    if(!id || !customerName || !customerPhone || !reciverName || !reciverPhone || !reciverAddress || !reciverPincode || !reciverCountry || !reciverCity || !typeOfPercel || !weight || !percelPrice) {
      return res.status(400).json({ message: "Please fill all the fields" });
    }
    const updatedPersonalPercel = await PersonalPercel.findByIdAndUpdate(id, {
      customerName,
      customerPhone,
      customerEmail,
      reciverName,
      reciverPhone,
      reciverEmail,
      reciverAddress,
      reciverPincode,
      reciverCountry,
      reciverCity,
      typeOfPercel,
      weight,
      percelPrice
    }, { new: true });
    res.status(200).json(updatedPersonalPercel);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

exports.deletePersonalPercel = async (req, res) => {
  try {
    const { id } = req.body;
    if(!id) {
      return res.status(400).json({ message: "Please provide id" });
    }
    const deletedPersonalPercel = await PersonalPercel.findByIdAndDelete(id);
    res.status(200).json(deletedPersonalPercel);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}